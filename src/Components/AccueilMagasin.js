import { useParams } from 'react-router-dom';
import PromotionsParMagasin from './PromotionsParMagasin';
import ListeProduits from './ListeProduits';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AccueilMagasin() {
  const { id } = useParams();
  const magasinId = parseInt(id);
  const [produits, setProduits] = useState([]);
  const [produitsLoaded, setProduitsLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/produits/magasin/${magasinId}`)
      .then((res) => {
        setProduits(res.data);
        setProduitsLoaded(true);
      })
      .catch((err) => {
        console.error("Erreur chargement produits :", err);
        setProduits([]);
        setProduitsLoaded(true);
      });
  }, [magasinId]);

  return (
    <>
      <PromotionsParMagasin magasinId={magasinId} />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Produits disponibles dans ce magasin</h2>
        <ListeProduits produits={produits} produitsLoaded={produitsLoaded} />
      </div>
    </>
  );
}
