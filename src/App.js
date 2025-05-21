import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './Components/Header';
import HeroSection from './Components/HeroSection';
import Login from './Components/Login';
import Catalogue from './Components/Catalogue';
import Categories from './Components/Categories';
import BestSellings from './Components/BestSellings';
import Panier from './Components/Panier';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("client");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("client", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("client");
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/accueil" />} />

      <Route
        path="/accueil"
        element={
          <>
            <Header user={user} onLogout={handleLogout} />
            <HeroSection />
            <BestSellers />
            <Categories />
            <BestSellings />
          </>
        }
      />

      <Route path="/login" element={<Login onLogin={handleLogin} />} />

        <Route
          path="/catalogue"
          element={user ? <Catalogue /> : <Navigate to="/" />}
        />

         <Route
        path="/panier"
        element={
          user ? (
            <>
              <Header />
              <Panier />
            </>
          ) : (
            <Navigate to="/" />
          )
        }
        />
      </Routes>
    
  );
}

export default App;

