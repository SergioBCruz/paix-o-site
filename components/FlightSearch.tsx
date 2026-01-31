
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Calendar, Users, PlaneTakeoff, Search, Globe, AlertCircle, Plus, Trash2 } from 'lucide-react';
import { Airport, SearchParams, TripSegment } from '../types';
import { fetchAirports, formatAirportLabel } from '../services/search';

interface FlightSearchProps {
  onSearch: (params: SearchParams) => void;
}

const FlightSearch: React.FC<FlightSearchProps> = ({ onSearch }) => {
  const [params, setParams] = useState<SearchParams>({
    origin: '',
    destination: '',
    originCode: undefined,
    destinationCode: undefined,
    departureDate: '',
    returnDate: '',
    passengers: 1,
    class: 'Economy',
    tripType: 'roundtrip',
    segments: [
      {
        origin: '',
        destination: '',
        originCode: undefined,
        destinationCode: undefined,
        departureDate: '',
      },
      {
        origin: '',
        destination: '',
        originCode: undefined,
        destinationCode: undefined,
        departureDate: '',
      },
    ],
    currency: 'USD',
  });

  const [activeSearch, setActiveSearch] = useState<{ type: 'origin' | 'destination'; index: number } | null>(null);
  const [originOptions, setOriginOptions] = useState<Airport[][]>([[], []]);
  const [destinationOptions, setDestinationOptions] = useState<Airport[][]>([[], []]);
  const [loadingOptions, setLoadingOptions] = useState(false);

  const addSegment = () => {
    setParams((prev) => {
      const nextSegments = [...(prev.segments || [])];
      nextSegments.push({ origin: '', destination: '', departureDate: '' });
      setOriginOptions((opts) => [...opts, []]);
      setDestinationOptions((opts) => [...opts, []]);
      return { ...prev, segments: nextSegments };
    });
  };

  const removeSegment = (index: number) => {
    setParams((prev) => {
      const nextSegments = [...(prev.segments || [])];
      if (nextSegments.length <= 2) return prev; // manter pelo menos 2 no multicity
      nextSegments.splice(index, 1);
      setOriginOptions((opts) => opts.filter((_, i) => i !== index));
      setDestinationOptions((opts) => opts.filter((_, i) => i !== index));
      return { ...prev, segments: nextSegments };
    });
  };
  const [formError, setFormError] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setActiveSearch(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!activeSearch) return;
    if (activeSearch.type !== 'origin') return;
    const { index } = activeSearch;
    const term = params.segments?.[index]?.origin || '';
    if (!term.trim()) {
      setOriginOptions((prev) => {
        const next = [...prev];
        next[index] = [];
        return next;
      });
      return;
    }

    const timer = setTimeout(async () => {
      setLoadingOptions(true);
      try {
        const results = await fetchAirports(term);
        setOriginOptions((prev) => {
          const next = [...prev];
          next[index] = results;
          return next;
        });
      } finally {
        setLoadingOptions(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [params.segments, activeSearch]);

  useEffect(() => {
    if (!activeSearch) return;
    if (activeSearch.type !== 'destination') return;
    const { index } = activeSearch;
    const term = params.segments?.[index]?.destination || '';
    if (!term.trim()) {
      setDestinationOptions((prev) => {
        const next = [...prev];
        next[index] = [];
        return next;
      });
      return;
    }

    const timer = setTimeout(async () => {
      setLoadingOptions(true);
      try {
        const results = await fetchAirports(term);
        setDestinationOptions((prev) => {
          const next = [...prev];
          next[index] = results;
          return next;
        });
      } finally {
        setLoadingOptions(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [params.segments, activeSearch]);

  const updateSegment = (index: number, updater: (seg: TripSegment) => TripSegment) => {
    setParams((prev) => {
      const segments = prev.segments ? [...prev.segments] : [];
      segments[index] = updater(segments[index] || { origin: '', destination: '', departureDate: '' });
      return {
        ...prev,
        segments,
      };
    });
  };

  const selectAirport = (type: 'origin' | 'destination', airport: Airport, index: number) => {
    const label = formatAirportLabel(airport);
    updateSegment(index, (seg) => ({
      ...seg,
      [type]: label,
      [`${type}Code`]: airport.code,
      [`${type}Id`]: airport.entityId,
    } as TripSegment));

    if (type === 'origin') {
      setOriginOptions((prev) => {
        const next = [...prev];
        next[index] = [];
        return next;
      });
    } else {
      setDestinationOptions((prev) => {
        const next = [...prev];
        next[index] = [];
        return next;
      });
    }
    setActiveSearch(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const segments = params.segments || [];

    if (!segments.length) {
      setFormError('Adicione pelo menos um trecho.');
      return;
    }

    for (const [idx, seg] of segments.entries()) {
      if (!seg.originCode || !seg.destinationCode) {
        setFormError(`Selecione origem e destino válidos no trecho ${idx + 1}.`);
        return;
      }
      if (seg.originCode === seg.destinationCode) {
        setFormError(`Origem e destino precisam ser diferentes no trecho ${idx + 1}.`);
        return;
      }
      if (!seg.departureDate) {
        setFormError(`Escolha a data do trecho ${idx + 1}.`);
        return;
      }
    }

    if (params.tripType === 'roundtrip' && segments.length >= 2) {
      const ida = segments[0];
      const volta = segments[1];
      if (volta.departureDate < ida.departureDate) {
        setFormError('A data de volta precisa ser posterior à ida.');
        return;
      }
    }

    if (params.passengers < 1) {
      setFormError('Informe ao menos 1 passageiro.');
      return;
    }

    const first = segments[0];
    const last = segments[segments.length - 1];

    onSearch({
      ...params,
      origin: first.origin,
      destination: last.destination,
      originCode: first.originCode,
      destinationCode: last.destinationCode,
      originId: first.originId,
      destinationId: last.destinationId,
      departureDate: first.departureDate,
      returnDate: params.tripType === 'roundtrip' && segments[1] ? segments[1].departureDate : params.returnDate,
      segments,
    });
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <form 
        onSubmit={handleSubmit}
        className="bg-white p-5 md:p-10 rounded-[2.5rem] shadow-2xl border border-blue-50/50 flex flex-col gap-8"
      >
        <div className="flex space-x-8 border-b border-slate-50 pb-5">
          {[
            { key: 'roundtrip', label: 'Ida e Volta' },
            { key: 'oneway', label: 'Apenas Ida' },
            { key: 'multicity', label: 'Multitrecho' },
          ].map((item) => (
            <button
              type="button"
              key={item.key}
              onClick={() => {
                setFormError(null);
                setParams((prev) => {
                  const base = { ...prev, tripType: item.key as SearchParams['tripType'] };
                  if (item.key === 'oneway') {
                    return {
                      ...base,
                      returnDate: '',
                      segments: [
                        {
                          ...(prev.segments?.[0] || { origin: '', destination: '', departureDate: '' }),
                          destinationCode: prev.segments?.[0]?.destinationCode,
                          originCode: prev.segments?.[0]?.originCode,
                        },
                      ],
                    };
                  }
                  if (item.key === 'roundtrip') {
                    const ida = prev.segments?.[0] || { origin: '', destination: '', departureDate: '' };
                    const volta: TripSegment = {
                      origin: ida.destination,
                      destination: ida.origin,
                      originCode: ida.destinationCode,
                      destinationCode: ida.originCode,
                      departureDate: prev.returnDate || '',
                    };
                    return {
                      ...base,
                      segments: [ida, volta],
                    };
                  }
                  // multicity mantém os segmentos existentes; garante mínimo 2
                  const existing = prev.segments && prev.segments.length >= 2 ? prev.segments : [
                    prev.segments?.[0] || { origin: '', destination: '', departureDate: '' },
                    { origin: '', destination: '', departureDate: '' },
                  ];
                  return {
                    ...base,
                    segments: existing,
                  };
                });
              }}
              className={`relative pb-2 text-sm font-black uppercase tracking-widest transition-all ${
                params.tripType === item.key ? 'text-blue-600 after:absolute after:left-0 after:-bottom-0.5 after:w-full after:h-0.5 after:bg-blue-600' : 'text-slate-400 hover:text-blue-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="space-y-6">
          {params.tripType === 'roundtrip' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50/60 p-4 rounded-2xl border border-slate-100 relative">
              {/* Origem */}
              <div className="lg:col-span-4 relative">
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 ml-1 tracking-[0.2em]">Origem</label>
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 bg-blue-50 p-1.5 rounded-lg">
                    <MapPin className="h-4 w-4 text-blue-600" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Qual sua cidade?"
                    className="w-full pl-14 pr-4 py-5 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-bold placeholder:text-slate-300 shadow-inner"
                    value={params.segments?.[0]?.origin || ''}
                    onChange={e => updateSegment(0, (seg) => ({ ...seg, origin: e.target.value }))}
                    onFocus={() => setActiveSearch({ type: 'origin', index: 0 })}
                    required
                  />
                  {activeSearch && activeSearch.type === 'origin' && activeSearch.index === 0 && ((originOptions[0] || []).length > 0 || loadingOptions) && (
                    <div className="absolute top-full left-0 w-full mt-3 bg-white rounded-[1.5rem] shadow-2xl border border-slate-100 z-[120] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                      <div className="p-3 bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                        <Globe className="h-3 w-3 mr-2" /> Principais Destinos
                      </div>
                      {loadingOptions ? (
                        <div className="p-5 text-sm text-slate-500 font-semibold">Buscando aeroportos...</div>
                      ) : (
                        (originOptions[0] || []).map(a => (
                          <button
                            key={a.code}
                            type="button"
                            onClick={() => selectAirport('origin', a, 0)}
                            className="w-full flex items-center justify-between p-5 hover:bg-blue-50 transition-colors text-left group"
                          >
                            <div className="flex items-center">
                              <div className="bg-slate-100 p-2 rounded-lg mr-4 group-hover:bg-blue-100 transition-colors">
                                <PlaneTakeoff className="h-4 w-4 text-slate-500 group-hover:text-blue-600" />
                              </div>
                              <div>
                                <p className="font-black text-slate-900 leading-none">{a.city} <span className="text-blue-600">({a.code})</span></p>
                                <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tighter">{a.name}, {a.country}</p>
                              </div>
                            </div>
                            <span className="text-[10px] font-black text-slate-300 uppercase group-hover:text-blue-400">{a.region}</span>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Destino */}
              <div className="lg:col-span-4 relative">
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 ml-1 tracking-[0.2em]">Destino</label>
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 bg-blue-50 p-1.5 rounded-lg">
                    <Globe className="h-4 w-4 text-blue-600" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Para onde vamos?"
                    className="w-full pl-14 pr-4 py-5 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-bold placeholder:text-slate-300 shadow-inner"
                    value={params.segments?.[0]?.destination || ''}
                    onChange={e => updateSegment(0, (seg) => ({ ...seg, destination: e.target.value }))}
                    onFocus={() => setActiveSearch({ type: 'destination', index: 0 })}
                    required
                  />
                  {activeSearch && activeSearch.type === 'destination' && activeSearch.index === 0 && ((destinationOptions[0] || []).length > 0 || loadingOptions) && (
                    <div className="absolute top-full left-0 w-full mt-3 bg-white rounded-[1.5rem] shadow-2xl border border-slate-100 z-[120] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                       <div className="p-3 bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                        <Search className="h-3 w-3 mr-2" /> Resultados de Busca Global
                      </div>
                      {loadingOptions ? (
                        <div className="p-5 text-sm text-slate-500 font-semibold">Buscando aeroportos...</div>
                      ) : (
                        (destinationOptions[0] || []).map(a => (
                          <button
                            key={a.code}
                            type="button"
                            onClick={() => selectAirport('destination', a, 0)}
                            className="w-full flex items-center justify-between p-5 hover:bg-blue-50 transition-colors text-left group"
                          >
                            <div className="flex items-center">
                              <div className="bg-slate-100 p-2 rounded-lg mr-4 group-hover:bg-blue-100 transition-colors">
                                <MapPin className="h-4 w-4 text-slate-500 group-hover:text-blue-600" />
                              </div>
                              <div>
                                <p className="font-black text-slate-900 leading-none">{a.city} <span className="text-blue-600">({a.code})</span></p>
                                <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tighter">{a.name}, {a.country}</p>
                              </div>
                            </div>
                            <span className="text-[10px] font-black text-slate-300 uppercase group-hover:text-blue-400">{a.region}</span>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Datas Ida e Volta lado a lado */}
              <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 ml-1 tracking-[0.2em]">Ida</label>
                  <div className="relative">
                    <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400" />
                    <input 
                      type="date" 
                      className="w-full pl-14 pr-4 py-5 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-600 shadow-inner"
                      value={params.segments?.[0]?.departureDate || ''}
                      onChange={e => updateSegment(0, (seg) => ({ ...seg, departureDate: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 ml-1 tracking-[0.2em]">Volta</label>
                  <div className="relative">
                    <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400" />
                    <input 
                      type="date" 
                      className="w-full pl-14 pr-4 py-5 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-600 shadow-inner"
                      value={params.segments?.[1]?.departureDate || ''}
                      onChange={e => {
                        const value = e.target.value;
                        updateSegment(1, (seg) => ({ ...seg, departureDate: value }));
                        setParams((prev) => ({ ...prev, returnDate: value }));
                      }}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {(params.segments || []).map((segment, index) => (
                <div key={index} className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50/60 p-4 rounded-2xl border border-slate-100 relative">
                  {params.tripType === 'multicity' && (
                    <button
                      type="button"
                      className="absolute -top-3 -right-3 bg-white border border-slate-200 rounded-full p-2 shadow-sm hover:bg-red-50"
                      onClick={() => removeSegment(index)}
                      disabled={(params.segments?.length || 0) <= 2}
                    >
                      <Trash2 className="h-4 w-4 text-slate-400" />
                    </button>
                  )}

                  {/* Origem */}
                  <div className="lg:col-span-4 relative">
                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 ml-1 tracking-[0.2em]">Origem</label>
                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 bg-blue-50 p-1.5 rounded-lg">
                        <MapPin className="h-4 w-4 text-blue-600" />
                      </div>
                      <input 
                        type="text" 
                        placeholder="Qual sua cidade?"
                        className="w-full pl-14 pr-4 py-5 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-bold placeholder:text-slate-300 shadow-inner"
                        value={segment.origin}
                        onChange={e => updateSegment(index, (seg) => ({ ...seg, origin: e.target.value }))}
                        onFocus={() => setActiveSearch({ type: 'origin', index })}
                        required
                      />
                      {activeSearch && activeSearch.type === 'origin' && activeSearch.index === index && ((originOptions[index] || []).length > 0 || loadingOptions) && (
                        <div className="absolute top-full left-0 w-full mt-3 bg-white rounded-[1.5rem] shadow-2xl border border-slate-100 z-[120] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                          <div className="p-3 bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                            <Globe className="h-3 w-3 mr-2" /> Principais Destinos
                          </div>
                          {loadingOptions ? (
                            <div className="p-5 text-sm text-slate-500 font-semibold">Buscando aeroportos...</div>
                          ) : (
                            (originOptions[index] || []).map(a => (
                              <button
                                key={a.code}
                                type="button"
                                onClick={() => selectAirport('origin', a, index)}
                                className="w-full flex items-center justify-between p-5 hover:bg-blue-50 transition-colors text-left group"
                              >
                                <div className="flex items-center">
                                  <div className="bg-slate-100 p-2 rounded-lg mr-4 group-hover:bg-blue-100 transition-colors">
                                    <PlaneTakeoff className="h-4 w-4 text-slate-500 group-hover:text-blue-600" />
                                  </div>
                                  <div>
                                    <p className="font-black text-slate-900 leading-none">{a.city} <span className="text-blue-600">({a.code})</span></p>
                                    <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tighter">{a.name}, {a.country}</p>
                                  </div>
                                </div>
                                <span className="text-[10px] font-black text-slate-300 uppercase group-hover:text-blue-400">{a.region}</span>
                              </button>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Destino */}
                  <div className="lg:col-span-4 relative">
                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 ml-1 tracking-[0.2em]">Destino</label>
                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 bg-blue-50 p-1.5 rounded-lg">
                        <Globe className="h-4 w-4 text-blue-600" />
                      </div>
                      <input 
                        type="text" 
                        placeholder="Para onde vamos?"
                        className="w-full pl-14 pr-4 py-5 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-bold placeholder:text-slate-300 shadow-inner"
                        value={segment.destination}
                        onChange={e => updateSegment(index, (seg) => ({ ...seg, destination: e.target.value }))}
                        onFocus={() => setActiveSearch({ type: 'destination', index })}
                        required
                      />
                      {activeSearch && activeSearch.type === 'destination' && activeSearch.index === index && ((destinationOptions[index] || []).length > 0 || loadingOptions) && (
                        <div className="absolute top-full left-0 w-full mt-3 bg-white rounded-[1.5rem] shadow-2xl border border-slate-100 z-[120] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                           <div className="p-3 bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                            <Search className="h-3 w-3 mr-2" /> Resultados de Busca Global
                          </div>
                          {loadingOptions ? (
                            <div className="p-5 text-sm text-slate-500 font-semibold">Buscando aeroportos...</div>
                          ) : (
                            (destinationOptions[index] || []).map(a => (
                              <button
                                key={a.code}
                                type="button"
                                onClick={() => selectAirport('destination', a, index)}
                                className="w-full flex items-center justify-between p-5 hover:bg-blue-50 transition-colors text-left group"
                              >
                                <div className="flex items-center">
                                  <div className="bg-slate-100 p-2 rounded-lg mr-4 group-hover:bg-blue-100 transition-colors">
                                    <MapPin className="h-4 w-4 text-slate-500 group-hover:text-blue-600" />
                                  </div>
                                  <div>
                                    <p className="font-black text-slate-900 leading-none">{a.city} <span className="text-blue-600">({a.code})</span></p>
                                    <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tighter">{a.name}, {a.country}</p>
                                  </div>
                                </div>
                                <span className="text-[10px] font-black text-slate-300 uppercase group-hover:text-blue-400">{a.region}</span>
                              </button>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Data */}
                  <div className="lg:col-span-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 ml-1 tracking-[0.2em]">Data</label>
                    <div className="relative">
                      <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400" />
                      <input 
                        type="date" 
                        className="w-full pl-14 pr-4 py-5 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-600 shadow-inner"
                        value={segment.departureDate}
                        onChange={e => updateSegment(index, (seg) => ({ ...seg, departureDate: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}

              {params.tripType === 'multicity' && (
                <button
                  type="button"
                  className="flex items-center space-x-2 text-blue-600 font-bold text-sm"
                  onClick={() => addSegment()}
                >
                  <Plus className="h-4 w-4" />
                  <span>Adicionar trecho</span>
                </button>
              )}
            </>
          )}
        </div>
          {/* Passageiros e Moeda */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 ml-1 tracking-[0.2em]">Viajantes</label>
              <div className="relative">
                <Users className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400" />
                <input 
                  type="number" 
                  min="1"
                  className="w-full pl-14 pr-4 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold shadow-inner"
                  value={params.passengers}
                  onChange={e => setParams({...params, passengers: parseInt(e.target.value, 10) || 1})}
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 ml-1 tracking-[0.2em]">Moeda</label>
              <select
                className="w-full px-4 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-700"
                value={params.currency || 'USD'}
                onChange={(e) => setParams({ ...params, currency: e.target.value })}
              >
                {['USD','EUR','BRL','GBP','CAD','AUD'].map((cur) => (
                  <option key={cur} value={cur}>{cur}</option>
                ))}
              </select>
            </div>
          </div>

        {formError && (
          <div className="flex items-center space-x-2 text-red-700 bg-red-50 border border-red-100 px-4 py-3 rounded-xl text-sm font-semibold">
            <AlertCircle className="h-4 w-4" />
            <span>{formError}</span>
          </div>
        )}

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white font-black py-6 rounded-[1.5rem] hover:bg-slate-950 active:scale-[0.98] transition-all shadow-2xl shadow-blue-500/40 flex items-center justify-center text-lg uppercase tracking-[0.1em] disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={!(params.segments && params.segments[0]?.originCode && params.segments[0]?.destinationCode && params.segments[0]?.departureDate)}
        >
          <Search className="h-6 w-6 mr-4" />
          Explorar Tarifas Agora
        </button>
      </form>
    </div>
  );
};

export default FlightSearch;
