import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./Components/Header";
import HeroSection from "./Components/HeroSection";
import BestSellers from "./Components/PromotionsAccueil";
import Login from "./Components/Login";
import Catalogue from "./Components/Catalogue";
import Categories from "./Components/Categories";
import BestSellings from "./Components/BestSellings";
import Panier from './Components/Panier';

import PageGerant from "./Components/PageGerant";
import PagePreparateur from "./Components/PagePreparateur";
import PageClient from "./Components/PageClient"; // facultatif, si tu veux une autre page que HeroSection

import "bootstrap/dist/css/bootstrap.min.css";

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
      
      <Route
        path="/"
        element={
          user?.role === "client" ? (
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

      {/* 🔐 Page de connexion */}
      <Route path="/login" element={<Login onLogin={handleLogin} />} />

      {/* 👤 Espace client redirigé après connexion */}
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

      {/* 👷‍♂️ Espace préparateur */}
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

      {/* 🧑‍💼 Espace gérant */}
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

      {/* 🛒 Catalogue visible uniquement après connexion */}
      <Route
        path="/catalogue"
        element={
          user?.role === "preparateur" ? (
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
    </Routes>
  );
}

export default App;
