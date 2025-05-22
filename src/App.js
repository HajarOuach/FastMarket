import { useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';

import Header from './Components/Header';
import HeroSection from './Components/HeroSection';
import BestSellers from './Components/BestSellers';
import Login from './Components/Login';
import Catalogue from './Components/Catalogue';
import Categories from './Components/Categories';
import Preparateur from './Components/Preparateur';
import ChoixMagasin from './Components/ChoixMagasin';
import PageClient from './Components/PageClient';
import PageGerant from './Components/PageGerant';
import PagePreparateur from './Components/PagePreparateur';
import BestSellings from './Components/BestSellings';
import Panier from './Components/Panier';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">Accueil</Link>
          <div className="ms-auto d-flex align-items-center gap-2">
            <Link className="btn btn-outline-primary" to="/">Home</Link>
            {user && (
              <>
                <Link className="btn btn-primary" to="/catalogue">Catalogue</Link>
                <Link className="btn btn-warning" to="/preparateur">Préparateur</Link>
                <Link className="btn btn-success" to="/choix-magasin">Choix magasin</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <Login onLogin={handleLogin} />
            ) : user?.role === "client" ? (
              <>
                <Header user={user} onLogout={handleLogout} />
                <HeroSection />
                <BestSellers />
                <Categories />
                <BestSellings />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        <Route
          path="/accueil"
          element={
            user?.role === "client" ? (
              <>
                <Header user={user} onLogout={handleLogout} />
                <PageClient />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/preparateur"
          element={
            user?.role === "preparateur" ? (
              <>
                <Header user={user} onLogout={handleLogout} />
                <PagePreparateur />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/gerant"
          element={
            user?.role === "gerant" ? (
              <>
                <Header user={user} onLogout={handleLogout} />
                <PageGerant />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/catalogue"
          element={
            user ? (
              <>
                <Header user={user} onLogout={handleLogout} />
                <Catalogue />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/panier"
          element={
            user ? (
              <>
                <Header user={user} onLogout={handleLogout} />
                <Panier />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/choix-magasin"
          element={
            user ? <ChoixMagasin /> : <Navigate to="/" />
          }
        />
      </Routes>
    </>
  );
}

export default App;
