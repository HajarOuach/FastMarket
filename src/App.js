import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import AccueilMagasin from './Components/AccueilMagasin';
import ChoixProfil from './Components/ChoixProfil';
import Header from './Components/Header';
import HeroSection from './Components/HeroSection';
import Login from './Components/Login';
import Catalogue from './Components/Catalogue';
import Categories from './Components/Categories';
import BestSellers from "./Components/PromotionsAccueil";
import Preparateur from './Components/Preparateur';
import ChoixMagasin from './Components/ChoixMagasin';
import PageGerant from './Components/PageGerant';
import BestSellings from './Components/BestSellings';
import Panier from './Components/Panier';
import ListeProduits from './Components/ListeProduits';

function App() {
  const [user, setUser] = useState(null);
  const [produits, setProduits] = useState([]);
  const [produitsLoaded, setProduitsLoaded] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/produits")
      .then((res) => res.json())
      .then((data) => {
        setProduits(Array.isArray(data) ? data : []);
        setProduitsLoaded(true);
      })
      .catch((err) => {
        console.error("Erreur chargement produits :", err);
        setProduitsLoaded(true);
      });
  }, []);

  const handleLogin = (userData) => setUser(userData);
  const handleLogout = () => {
    localStorage.removeItem("client");
    setUser(null);
  };

  return (
    <>
      <Routes>
        {/* Page de démarrage : Choix du profil uniquement si non connecté */}
        <Route path="/" element={
          user ? (
            user.role === "client" ? <Navigate to="/accueil" /> :
            user.role === "gerant" ? <Navigate to="/gerant" /> :
            user.role === "preparateur" ? <Navigate to="/preparateur" /> :
            <Navigate to="/login" />
          ) : <ChoixProfil />
        } />

        {/* Page de login */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Accueil classique du client */}
        <Route path="/accueil" element={
          user?.role === "client" ? (
            <>
              <Header user={user} onLogout={handleLogout} />
              <HeroSection />
              <BestSellers />
              <Categories />
            </>
          ) : <Navigate to="/login" />
        } />

        {/* Accueil du client selon magasin sélectionné (visiteur ou client) */}
        <Route path="/accueil-magasin/:id" element={
          <>
            <Header user={user} onLogout={handleLogout} />
            <AccueilMagasin />
          </>
        } />

        {/* Page du gérant */}
        <Route path="/gerant" element={
          user?.role === "gerant" ? (
            <>
              <Header user={user} onLogout={handleLogout} />
              <PageGerant />
            </>
          ) : <Navigate to="/login" />
        } />

        {/* Page du préparateur */}
        <Route path="/preparateur" element={
          user?.role === "preparateur" ? (
            <>
              <Header user={user} onLogout={handleLogout} />
              <Preparateur />
            </>
          ) : <Navigate to="/login" />
        } />

        {/* Catalogue accessible aux rôles connectés */}
        <Route path="/catalogue" element={
          user ? (
            <>
              <Header user={user} onLogout={handleLogout} />
              <Catalogue />
            </>
          ) : <Navigate to="/login" />
        } />

        {/* Liste de tous les produits */}
        <Route path="/produits" element={
          user ? (
            <>
              <Header user={user} onLogout={handleLogout} />
              <ListeProduits produits={produits} produitsLoaded={produitsLoaded} />
            </>
          ) : <Navigate to="/login" />
        } />

        {/* Panier */}
        <Route path="/panier" element={
          user ? (
            <>
              <Header user={user} onLogout={handleLogout} />
              <Panier />
            </>
          ) : <Navigate to="/login" />
        } />

        {/* Choix du magasin */}
        <Route path="/choix-magasin" element={<ChoixMagasin />} />
      </Routes>
    </>
  );
}

export default App;
