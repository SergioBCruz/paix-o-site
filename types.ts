
export enum AppView {
  HOME = 'home',
  RESULTS = 'results',
  DETAILS = 'details',
  CHECKOUT = 'checkout',
  USER_AREA = 'user_area',
  MY_TRIPS = 'my_trips',
  SUPPORT = 'support',
  BLOG = 'blog',
  LOGIN = 'login'
}

export interface Flight {
  id: string;
  airline: string;
  logo: string;
  departureTime: string;
  arrivalTime: string;
  origin: string;
  destination: string;
  price: number;
  stops: number;
  duration: string;
  seatsLeft: number;
  cabin: string;
}

export interface SearchParams {
  origin: string;
  destination: string;
  originCode?: string;
  destinationCode?: string;
  originId?: string;
  destinationId?: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  class: string;
  tripType?: 'roundtrip' | 'oneway' | 'multicity';
  segments?: TripSegment[];
  currency?: string;
}

export interface FilterState {
  maxPrice: number;
  stops: number | null;
  airlines: string[];
  times: string[];
}

export interface Airport {
  code: string;
  city: string;
  name: string;
  country: string;
  region: string;
  entityId?: string;
  skyId?: string;
}

export interface TripSegment {
  origin: string;
  destination: string;
  originCode?: string;
  destinationCode?: string;
  originId?: string;
  destinationId?: string;
  departureDate: string;
}
