import { useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Header from './Components/Header';
import HeroSection from './Components/HeroSection';
import BestSellers from './Components/BestSellers';
import Login from './Components/Login';
import Catalogue from './Components/Catalogue';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">Accueil</Link>
          <div className="ms-auto">
            <Link className="btn btn-outline-primary me-2" to="/">Home</Link>
            <Link className="btn btn-primary" to="/catalogue">Catalogue</Link>
          </div>
        </div>
      </nav>

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
