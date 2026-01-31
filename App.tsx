
import React, { useState } from 'react';
import { AppView, SearchParams, Flight } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import FlightResults from './components/FlightResults';
import FlightDetails from './components/FlightDetails';
import Checkout from './components/Checkout';
import Blog from './components/Blog';
import UserArea from './components/UserArea';
import MyTrips from './components/MyTrips';
import Support from './components/Support';
import Footer from './components/Footer';
import Login from './components/Login';
import { fetchFlights } from './services/search';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = async (params: SearchParams) => {
    setSearchParams(params);
    setSelectedFlight(null);
    setSearchError(null);
    setIsSearching(true);
    setCurrentView(AppView.RESULTS);

    try {
      const results = await fetchFlights(params);
      setFlights(results);
    } catch (error) {
      setSearchError('Não foi possível completar a busca agora. Tente novamente em instantes.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectFlight = (flight: Flight) => {
    setSelectedFlight(flight);
    setCurrentView(AppView.DETAILS);
  };

  const navigateTo = (view: AppView) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (currentView) {
      case AppView.HOME:
        return <Hero onSearch={handleSearch} />;
      case AppView.RESULTS:
        return (
          <FlightResults 
            params={searchParams} 
            flights={flights}
            onSelect={handleSelectFlight} 
            loading={isSearching}
            error={searchError || undefined}
            onNewSearch={() => navigateTo(AppView.HOME)}
          />
        );
      case AppView.DETAILS:
        return (
          <FlightDetails 
            flight={selectedFlight} 
            onBack={() => setCurrentView(AppView.RESULTS)}
            onCheckout={() => setCurrentView(AppView.CHECKOUT)}
          />
        );
      case AppView.CHECKOUT:
        return <Checkout flight={selectedFlight} onComplete={() => navigateTo(AppView.HOME)} />;
      case AppView.BLOG:
        return <Blog />;
      case AppView.USER_AREA:
        return <UserArea onNavigate={navigateTo} />;
      case AppView.MY_TRIPS:
        return <MyTrips />;
      case AppView.SUPPORT:
        return <Support />;
      case AppView.LOGIN:
        return <Login onLoginSuccess={() => navigateTo(AppView.USER_AREA)} />;
      default:
        return <Hero onSearch={handleSearch} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Header onNavigate={navigateTo} currentView={currentView} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer onNavigate={navigateTo} />
    </div>
  );
};

export default App;
