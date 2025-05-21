import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './Components/Header';
import HeroSection from './Components/HeroSection';
import BestSellers from './Components/PromotionsAccueil';
import Login from './Components/Login';
import Catalogue from './Components/Catalogue';
import Categories from './Components/Categories';
import BestSellings from './Components/BestSellings';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState(null);

  // Charger l'utilisateur depuis localStorage au démarrage
  useEffect(() => {
    const storedUser = localStorage.getItem("client");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    
      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Navigate to="/accueil" />
            )
          }
        />

        <Route
          path="/accueil"
          element={
            user ? (
              <>
                <Header />
                <HeroSection />
                <BestSellers />
                <Categories />
                <BestSellings />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/catalogue"
          element={user ? <Catalogue /> : <Navigate to="/" />}
        />
      </Routes>
    
  );
}

export default App;
