import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AccueilMagasin from "./Components/AccueilMagasin";

import ChoixProfil from './Components/ChoixProfil';
import Header from './Components/Header';
import HeroSection from './Components/HeroSection';
import Login from './Components/Login';
import Catalogue from './Components/Catalogue';
import Categories from './Components/Categories';

import Preparateur from './Components/Preparateur';
import ChoixMagasin from './Components/ChoixMagasin';
import PageGerant from './Components/PageGerant';

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
        <Route path="/" element={
          user ? (
            user.role === "client" ? <Navigate to="/login" /> :
            user.role === "gerant" ? <Navigate to="/gerant" /> :
            user.role === "preparateur" ? <Navigate to="/preparateur" /> :
            <Navigate to="/login" />
          ) : <ChoixProfil />
        } />

        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        <Route path="/accueil" element={
          user?.role === "client" ? (
            <>
              <Header onLogout={handleLogout} />
              <HeroSection />
              <Categories />
            </>
          ) : <Navigate to="/login" />
        } />

        <Route path="/accueil-magasin/:id" element={<AccueilMagasin />} />

        <Route path="/gerant" element={
          user?.role === "gerant" ? (
            <>
              <Header onLogout={handleLogout} />
              <PageGerant />
            </>
          ) : <Navigate to="/login" />
        } />

        <Route path="/preparateur" element={
          user?.role === "preparateur" ? (
            <>
              <Header onLogout={handleLogout} />
              <Preparateur />
            </>
          ) : <Navigate to="/login" />
        } />

        <Route path="/catalogue" element={
          user ? (
            <>
              <Header onLogout={handleLogout} />
              <Catalogue />
            </>
          ) : <Navigate to="/login" />
        } />

        <Route path="/produits" element={
          user ? (
            <>
              <Header onLogout={handleLogout} />
              <ListeProduits produits={produits} produitsLoaded={produitsLoaded} />
            </>
          ) : <Navigate to="/login" />
        } />

        <Route path="/panier" element={
          user ? (
            <>
              <Header onLogout={handleLogout} />
              <Panier />
            </>
          ) : <Navigate to="/login" />
        } />

        <Route path="/choix-magasin" element={<ChoixMagasin />} />
      </Routes>
    </>
  );
}

export default App;
