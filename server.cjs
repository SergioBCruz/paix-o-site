const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8788;
const SKY_API_KEY = process.env.SKYSCANNER_API_KEY || '';
const SKY_HOST = 'flights-sky.p.rapidapi.com';
const SKY_BASE = 'https://flights-sky.p.rapidapi.com';
const BOOKING_BASE = 'https://booking-com15.p.rapidapi.com/api/v1';

const headers = (host) => ({
  'x-rapidapi-key': SKY_API_KEY,
  'x-rapidapi-host': host,
  'Content-Type': 'application/json',
});

const requireKey = (res) => {
  if (!SKY_API_KEY) {
    res.status(500).json({ error: 'Missing SKYSCANNER_API_KEY in .env' });
    return false;
  }
  return true;
};

app.get('/api/airports', async (req, res) => {
  if (!requireKey(res)) return;
  const query = (req.query.q || '').toString();
  if (!query.trim()) {
    return res.json([]);
  }
  try {
    // flights-sky airport search expects a query term
    const params = new URLSearchParams({ query });
    if (req.query.locale) params.set('locale', req.query.locale.toString());
    if (req.query.market) params.set('market', req.query.market.toString());
    if (req.query.countryCode) params.set('countryCode', req.query.countryCode.toString());

    const url = `${SKY_BASE}/flights/airports?${params.toString()}`;
    const response = await fetch(url, { headers: headers(SKY_HOST) });
    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: text || 'Upstream error' });
    }
    const data = await response.json();
    // Map to our shape
    const airports = (data.data || []).map((a) => ({
      code: a.iata_code || a.iata || a.skyId || a.presentation?.airportCode || a.presentation?.code || a.presentation?.iataCode || '',
      city: a.presentation?.suggestionTitle || a.presentation?.city || a.entity_id || a.presentation?.airport || a.country || '',
      name: a.presentation?.title || a.presentation?.airport || a.presentation?.suggestionTitle || a.name || '',
      country: a.presentation?.subtitle || a.country || '',
      region: a.context?.region || a.context?.country || a.presentation?.context || '',
      entityId: a.id || a.entity_id || '',
      skyId: a.skyId || a.sky_id || a.iata || '',
    })).filter((a) => a.code && a.code.length === 3);
    res.json(airports.slice(0, 12));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch airports', detail: err.message });
  }
});

app.post('/api/flights', async (req, res) => {
  if (!requireKey(res)) return;
  const body = req.body || {};
  const { origin, destination, originId, destinationId, departureDate, returnDate, adults = 1, currency = 'USD' } = body;
  if (!originId || !destinationId || !departureDate) {
    return res.status(400).json({ error: 'originId, destinationId, departureDate are required (use /api/airports to fetch entity IDs)' });
  }

  try {
    const searchParams = new URLSearchParams({
      fromEntityId: originId,
      toEntityId: destinationId,
      departDate: departureDate,
      adults: adults.toString(),
      currency,
    });

    if (returnDate) {
      searchParams.set('returnDate', returnDate);
    }

    // flights-sky flight search (roundtrip if returnDate provided, otherwise one-way)
    const endpoint = returnDate ? 'flights/search-roundtrip' : 'flights/search-one-way';
    const url = `${SKY_BASE}/${endpoint}?${searchParams.toString()}`;
    const response = await fetch(url, { headers: headers(SKY_HOST) });
    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: text || 'Upstream error' });
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch flights', detail: err.message });
  }
});

// Car rental destination lookup (booking-com15 searchDestination)
app.get('/api/car-destinations', async (req, res) => {
  if (!requireKey(res)) return;
  const query = (req.query.query || req.query.q || req.query.location || '').toString().trim();
  if (!query) {
    return res.status(400).json({ error: 'query/location is required' });
  }

  try {
    const searchParams = new URLSearchParams({ query });
    const url = `${BOOKING_BASE}/cars/searchDestination?${searchParams.toString()}`;
    const response = await fetch(url, { headers: headers('booking-com15.p.rapidapi.com') });
    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: text || 'Upstream error' });
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch car destinations', detail: err.message });
  }
});

app.get('/api/cars', async (req, res) => {
  if (!requireKey(res)) return;

  const requiredDates = ['pick_up_date', 'drop_off_date'];
  for (const field of requiredDates) {
    if (!req.query[field]) {
      return res.status(400).json({ error: `${field} is required (YYYY-MM-DD)` });
    }
  }

  try {
    const searchParams = new URLSearchParams();
    // Pass through all received query params to allow optional fields like locale/country_code/sort_by.
    Object.keys(req.query || {}).forEach((key) => {
      if (req.query[key] !== undefined) {
        searchParams.set(key, req.query[key].toString());
      }
    });

    const url = `${BOOKING_BASE}/cars/searchCarRentals?${searchParams.toString()}`;
    const response = await fetch(url, { headers: headers('booking-com15.p.rapidapi.com') });
    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: text || 'Upstream error' });
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch car rentals', detail: err.message });
  }
});

// flights-sky get-config endpoint for debugging/health check
app.get('/api/sky-config', async (req, res) => {
  if (!requireKey(res)) return;
  try {
    const url = `${SKY_BASE}/get-config`;
    const response = await fetch(url, { headers: headers(SKY_HOST) });
    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: text || 'Upstream error' });
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sky config', detail: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`[api] listening on http://localhost:${PORT}`);
});
