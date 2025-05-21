import { useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Header from './Components/Header';
import HeroSection from './Components/HeroSection';
import BestSellers from './Components/PromotionsAccueil';

import Login from './Components/Login';
import Catalogue from './Components/Catalogue';
import 'bootstrap/dist/css/bootstrap.min.css';
import Categories   from './Components/Categories';
import BestSellings from './Components/BestSellings';

function App() {
  const [user, setUser] = useState(null); 

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <>
     

      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <Login onLogin={handleLogin} />
            ) : (
              <>
                <Header />
                <HeroSection />
                <BestSellers />
                <Categories />
                <BestSellings />
           
              
              </>
            )
          }
        />
        <Route
          path="/catalogue"
          element={
            user ? <Catalogue /> : <Navigate to="/" />
          }
        />
      </Routes>
    </>
  
  );
}

export default App;
