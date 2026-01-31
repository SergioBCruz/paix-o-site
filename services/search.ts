import { Airport, Flight, SearchParams, TripSegment } from '../types';

// Feature flag: set VITE_USE_REAL_API=true to hit RapidAPI; defaults to false (mock/local only)
const USE_REAL_API = import.meta.env.VITE_USE_REAL_API === 'true';

const LOCAL_AIRPORTS: Airport[] = [
  { code: 'GRU', city: 'São Paulo', name: 'Guarulhos Intl', country: 'Brasil', region: 'South America' },
  { code: 'GIG', city: 'Rio de Janeiro', name: 'Galeão Intl', country: 'Brasil', region: 'South America' },
  { code: 'BSB', city: 'Brasília', name: 'Pres. Juscelino Kubitschek', country: 'Brasil', region: 'South America' },
  { code: 'VCP', city: 'Campinas', name: 'Viracopos Intl', country: 'Brasil', region: 'South America' },
  { code: 'LIS', city: 'Lisboa', name: 'Humberto Delgado', country: 'Portugal', region: 'Europe' },
  { code: 'OPO', city: 'Porto', name: 'Francisco Sá Carneiro', country: 'Portugal', region: 'Europe' },
  { code: 'MAD', city: 'Madrid', name: 'Barajas', country: 'Espanha', region: 'Europe' },
  { code: 'BCN', city: 'Barcelona', name: 'El Prat', country: 'Espanha', region: 'Europe' },
  { code: 'JFK', city: 'Nova York', name: 'John F. Kennedy', country: 'EUA', region: 'North America' },
  { code: 'MIA', city: 'Miami', name: 'Miami Intl', country: 'EUA', region: 'North America' },
  { code: 'ORL', city: 'Orlando', name: 'Orlando Intl', country: 'EUA', region: 'North America' },
  { code: 'CDG', city: 'Paris', name: 'Charles de Gaulle', country: 'França', region: 'Europe' },
  { code: 'LHR', city: 'Londres', name: 'Heathrow', country: 'Reino Unido', region: 'Europe' },
  { code: 'DXB', city: 'Dubai', name: 'Dubai Intl', country: 'EAU', region: 'Middle East' },
  { code: 'HND', city: 'Tóquio', name: 'Haneda Airport', country: 'Japão', region: 'Asia' },
  { code: 'SYD', city: 'Sydney', name: 'Kingsford Smith', country: 'Austrália', region: 'Oceania' },
  { code: 'EZE', city: 'Buenos Aires', name: 'Ministro Pistarini', country: 'Argentina', region: 'South America' },
  { code: 'SCL', city: 'Santiago', name: 'Arturo Merino Benítez', country: 'Chile', region: 'South America' },
];

// Fonte global (IATA) pública. Se falhar, usamos a lista local acima como fallback.
const REMOTE_AIRPORTS_URL = 'https://raw.githubusercontent.com/mwgg/Airports/master/airports.json';
let remoteAirports: Airport[] | null = null;
let remoteLoadFailed = false;

// Simulação de inventário de voos; substitua por respostas de API reais.
const INVENTORY: Flight[] = [
  { id: '1', airline: 'LATAM Airlines', logo: 'https://logo.clearbit.com/latam.com', departureTime: '08:30', arrivalTime: '21:45', origin: 'GRU', destination: 'LIS', price: 2450.4, stops: 0, duration: '11h 15m', seatsLeft: 4, cabin: 'Economy' },
  { id: '2', airline: 'Azul Linhas Aéreas', logo: 'https://logo.clearbit.com/voeazul.com.br', departureTime: '10:15', arrivalTime: '14:20', origin: 'VCP', destination: 'LIS', price: 2120.99, stops: 1, duration: '13h 05m', seatsLeft: 2, cabin: 'Economy' },
  { id: '3', airline: 'TAP Air Portugal', logo: 'https://logo.clearbit.com/flytap.com', departureTime: '22:45', arrivalTime: '10:00', origin: 'GRU', destination: 'LIS', price: 3100.0, stops: 0, duration: '10h 15m', seatsLeft: 12, cabin: 'Economy' },
  { id: '4', airline: 'Emirates', logo: 'https://logo.clearbit.com/emirates.com', departureTime: '18:00', arrivalTime: '12:00', origin: 'GRU', destination: 'LIS', price: 4200.5, stops: 1, duration: '18h 00m', seatsLeft: 8, cabin: 'Premium Economy' },
  { id: '5', airline: 'GOL Linhas Aéreas', logo: 'https://logo.clearbit.com/voegol.com.br', departureTime: '06:10', arrivalTime: '09:30', origin: 'GIG', destination: 'EZE', price: 1200.0, stops: 0, duration: '3h 20m', seatsLeft: 6, cabin: 'Economy' },
  { id: '6', airline: 'Air France', logo: 'https://logo.clearbit.com/airfrance.com', departureTime: '17:15', arrivalTime: '07:00', origin: 'GRU', destination: 'CDG', price: 3800.0, stops: 0, duration: '11h 45m', seatsLeft: 3, cabin: 'Premium Economy' },
  { id: '7', airline: 'Iberia', logo: 'https://logo.clearbit.com/iberia.com', departureTime: '23:00', arrivalTime: '11:20', origin: 'GRU', destination: 'MAD', price: 2750.0, stops: 0, duration: '10h 20m', seatsLeft: 5, cabin: 'Economy' },
  { id: '8', airline: 'LATAM Airlines', logo: 'https://logo.clearbit.com/latam.com', departureTime: '09:40', arrivalTime: '22:10', origin: 'GRU', destination: 'BCN', price: 2890.0, stops: 1, duration: '14h 30m', seatsLeft: 7, cabin: 'Economy' },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const loadRemoteAirports = async (): Promise<Airport[] | null> => {
  if (remoteAirports) return remoteAirports;
  if (remoteLoadFailed) return null;

  try {
    const res = await fetch(REMOTE_AIRPORTS_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const raw = await res.json();

    // Estrutura do dataset: objeto com ICAO como chave; filtramos apenas os que têm IATA.
    const mapped: Airport[] = Object.values(raw)
      .map((entry: any) => ({
        code: (entry.iata || '').toString().trim(),
        city: entry.city || entry.municipality || 'N/A',
        name: entry.name || 'Aeroporto',
        country: entry.country || entry.iso || 'N/A',
        region: entry.region || entry.state || 'N/A',
      }))
      .filter((a) => a.code.length === 3);

    // Remover duplicados mantendo primeiro
    const seen = new Set<string>();
    remoteAirports = mapped.filter((a) => {
      if (seen.has(a.code)) return false;
      seen.add(a.code);
      return true;
    });

    return remoteAirports;
  } catch (err) {
    remoteLoadFailed = true;
    console.warn('[airports] fallback to local list:', err);
    return null;
  }
};

const getAirportsSource = async (): Promise<Airport[]> => {
  const remote = await loadRemoteAirports();
  if (remote && remote.length) return remote;
  return LOCAL_AIRPORTS;
};

export const fetchAirports = async (query: string): Promise<Airport[]> => {
  const term = query.trim().toLowerCase();
  if (!term) return [];
  await delay(120);

  // Tenta API local (proxy) só se o flag permitir
  if (USE_REAL_API) {
    try {
      const res = await fetch(`/api/airports?q=${encodeURIComponent(term)}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length) return data as Airport[];
      }
    } catch (err) {
      console.warn('[airports] proxy failed, falling back', err);
    }
  }

  const source = await getAirportsSource();
  return source
    .filter((a) =>
      a.city.toLowerCase().includes(term) ||
      a.code.toLowerCase().includes(term) ||
      a.name.toLowerCase().includes(term) ||
      a.country.toLowerCase().includes(term)
    )
    .slice(0, 12);
};

export const fetchFlights = async (params: SearchParams): Promise<Flight[]> => {
  const segments = (params.segments && params.segments.length ? params.segments : undefined) || buildSegmentsFromParams(params);
  const first = segments[0];
  const originCode = (first.originCode || first.origin).toUpperCase();
  const destinationCode = (first.destinationCode || first.destination).toUpperCase();
  const originId = first.originId || params.originId;
  const destinationId = first.destinationId || params.destinationId;

  const canUseRealApi = Boolean(originId && destinationId);

  // Tenta proxy real apenas se tivermos entityId e o flag permitir
  if (canUseRealApi && USE_REAL_API) {
    try {
      const res = await fetch('/api/flights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin: originCode,
          destination: destinationCode,
          originId,
          destinationId,
          departureDate: first.departureDate,
          returnDate: params.tripType === 'roundtrip' && segments[1] ? segments[1].departureDate : undefined,
          adults: params.passengers,
          currency: params.currency || 'USD',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const mapped = mapSkyscannerToFlights(data, params);
        if (mapped.length) return mapped;
      } else {
        console.warn('[flights] proxy error', await res.text());
      }
    } catch (err) {
      console.warn('[flights] proxy failed, falling back', err);
    }
  }

  // Fallback mock
  await delay(320);
  const filtered = INVENTORY.filter((flight) => {
    const matchesOrigin = flight.origin.toLowerCase() === originCode.toLowerCase();
    const matchesDestination = flight.destination.toLowerCase() === destinationCode.toLowerCase();
    return matchesOrigin && matchesDestination;
  });

  if (!filtered.length) {
    return [];
  }

  return filtered.map((flight) => ({ ...flight, id: `${flight.id}-${first.departureDate}` }));
};

const mapSkyscannerToFlights = (data: any, params: SearchParams): Flight[] => {
  const legs = data?.data?.itineraries || data?.itineraries || data?.data || [];
  if (!Array.isArray(legs)) return [];

  return legs.slice(0, 30).map((it: any, idx: number) => {
    const pricing = it.pricing_options?.[0] || it.price || {};
    const firstSegment = it.legs?.[0] || it.legs || it.segments?.[0] || {};
    const lastSegment = it.legs?.[it.legs.length - 1] || it.legs || it.segments?.[it.segments.length - 1] || {};
    const price = pricing.totalPrice || pricing.price || pricing.amount || 0;
    const airline = (firstSegment?.carriers?.marketing?.[0]?.name) || firstSegment?.carrierName || 'Companhia Aérea';
    const airlineCode = (firstSegment?.carriers?.marketing?.[0]?.alternate_id) || firstSegment?.carrierCode || '';

    return {
      id: it.id || `it-${idx}`,
      airline,
      logo: airlineCode ? `https://logo.clearbit.com/${airlineCode.toLowerCase()}.com` : 'https://placehold.co/80x80?text=Air',
      departureTime: firstSegment?.departure || firstSegment?.departure_time || params.departureDate,
      arrivalTime: lastSegment?.arrival || lastSegment?.arrival_time || firstSegment?.arrival || params.returnDate || params.departureDate,
      origin: firstSegment?.origin?.id || firstSegment?.origin?.iata || params.originCode || params.origin,
      destination: lastSegment?.destination?.id || lastSegment?.destination?.iata || params.destinationCode || params.destination,
      price: Number(price) || 0,
      stops: Math.max(0, (firstSegment?.stopCount ?? firstSegment?.stops?.length ?? 0)),
      duration: firstSegment?.duration || firstSegment?.durationInMinutes ? `${firstSegment.durationInMinutes}m` : '—',
      seatsLeft: it.seats || it.available_seats || 9,
      cabin: it.cabinClass || firstSegment?.cabinClass || params.class || 'Economy',
    } as Flight;
  });
};

const buildSegmentsFromParams = (params: SearchParams): TripSegment[] => {
  // Compatibilidade com versões anteriores: deriva segmentos do par origem/destino.
  return [
    {
      origin: params.origin,
      destination: params.destination,
      originCode: params.originCode,
      destinationCode: params.destinationCode,
      departureDate: params.departureDate,
    },
  ];
};

export const formatAirportLabel = (airport: Airport) => `${airport.city} (${airport.code})`;
