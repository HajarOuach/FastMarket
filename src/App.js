import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AccueilMagasin from "./Components/AccueilMagasin";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from "react-router-dom";

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
import ListeCourses from './Components/ListeCourses';
import ListeCourseDetails from "./Components/ListeCourseDetails";

function App() {
  const location = useLocation();
  const userState = location.state?.user;
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("client")) || userState || null);
  const [produits, setProduits] = useState([]);
  const [produitsLoaded, setProduitsLoaded] = useState(false);
  console.log(" App User state:", userState);
  console.log(" App User from localStorage:", user);
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

  if (user && !user.role) handleLogout(); // Si le user n'a pas de rôle, on le déconnecte

  return (
    <>
      <Routes>
        <Route path="/" element={
          user ? (
            user.role === "client" ? <Navigate to="/acceuil-magasin" /> :
            user.role === "gerant" ? <Navigate to="/gerant" /> :
            user.role === "preparateur" ? <Navigate to="/preparateur" /> :
            <ChoixProfil />
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
          ) : <Navigate to="/" />
        } />

        <Route path="/accueil-magasin/:id" element={
          <>
            <Header onLogout={handleLogout} />
            <AccueilMagasin />
          </>
        } />

        <Route path="/gerant" element={
          user?.role === "gerant" ? (
            <>
              <Header onLogout={handleLogout} />
              <PageGerant />
            </>
          ) : <Navigate to="/" />
        } />

        <Route path="/preparateur" element={
          user?.role === "preparateur" ? (
            <>
              <Header onLogout={handleLogout} />
              <Preparateur />
            </>
          ) : <Navigate to="/" />
        } />

        <Route path="/catalogue" element={
          user ? (
            <>
              <Header onLogout={handleLogout} />
              <Catalogue />
            </>
          ) : <Navigate to="/" />
        } />

        <Route path="/produits" element={
          user ? (
            <>
              <Header onLogout={handleLogout} />
              <ListeProduits produits={produits} produitsLoaded={produitsLoaded} />
            </>
          ) : <Navigate to="/" />
        } />

        <Route path="/panier" element={
          user ? (
            <>
              <Header onLogout={handleLogout} />
              <Panier />
            </>
          ) : <Navigate to={`/`} />
        } />

        <Route path="/liste-courses" element={
          user ? (
            <>
              <Header onLogout={handleLogout} />
              <ListeCourses produits={produits} produitsLoaded={produitsLoaded} />
            </>
          ) : <Navigate to={`/`} />
        } />

        <Route path="/liste-courses/:listeId/details/" element={
          <>
            <Header onLogout={handleLogout} />
            <ListeCourseDetails />
          </>
        } />

        <Route path="/choix-magasin" element={
          <>
            <ChoixMagasin />
          </>
        } />
      </Routes>
    </>
  );
}

export default App;
