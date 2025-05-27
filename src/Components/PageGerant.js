import React, { useEffect, useState } from "react";
import PromotionsParMagasin from "./PromotionsParMagasin";
import HeroSection from "./HeroSection";
import BestSellings from "./BestSellings";

export default function PageGerant() {
  const [magasin, setMagasin] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("client"));
    if (storedUser && storedUser.id) {
      fetch(`http://localhost:8080/gerants/${storedUser.id}/magasin`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.id) setMagasin(data);
        })
        .catch((err) => console.error("Erreur récupération magasin :", err));
    }
  }, []);

  return (
    <div className="container mt-5">
      {/* ✅ Ajout de la prop role ici */}
      <HeroSection nomMagasin={magasin?.nom} role="gerant" />

      {magasin?.id ? (
        <>
          <PromotionsParMagasin magasinId={magasin.id} />
          <BestSellings magasinId={magasin.id} /> 
        </>
      ) : (
        <p>Chargement des promotions...</p>
      )}
    </div>
  );
}
