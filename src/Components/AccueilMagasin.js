import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeroSection from "./HeroSection";
import Categories from "./Categories";
import PromotionsParMagasin from "./PromotionsParMagasin"; 
import Header from './Header';
import BestSellings from './BestSellings';



const AccueilMagasin = () => {
  const { id } = useParams(); // récupère l'id du magasin depuis l'URL
  const [magasin, setMagasin] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/magasins/${id}`)
      .then((res) => res.json())
      .then((data) => setMagasin(data))
      .catch((err) => console.error("Erreur :", err));
  }, [id]);

  if (!magasin) return <p className="text-center">Chargement du magasin...</p>;

 return (
  <>
    <Header />  {/* ✅ Affiche le Header */}
    <div className="container">
        <HeroSection nomMagasin={magasin.nom} />
      <PromotionsParMagasin magasinId={id} />
      
<BestSellings magasinId={id} />

    </div>
  </>
);
};

export default AccueilMagasin;
