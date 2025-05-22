import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ListeProduits() {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/produits")

      .then((res) => {
        console.log("✅ Données reçues :", res.data);
        setProduits(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("❌ Erreur lors du chargement des produits :", err);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Nos produits</h2>

      {produits.length === 0 ? (
        <p className="text-center">Aucun produit disponible pour le moment.</p>
      ) : (
        <div className="row">
          {produits.map((produit) => (
            <div key={produit.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow">
                <img
                  src={produit.image}
                  className="card-img-top"
                  alt={produit.libelle}
                  style={{ height: "200px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{produit.libelle}</h5>
                  <p className="card-text">
                    <strong>Prix unitaire :</strong> {produit.prixUnitaire ?? "N/A"} €<br />
                    <strong>Poids :</strong> {produit.poids ?? "N/A"} kg<br />
                    <strong>Nutriscore :</strong> {produit.nutriscore ?? "N/A"}<br />
                    <strong>Marque :</strong> {produit.marque ?? "N/A"}<br />
                    {produit.enPromotion && (
                      <span className="badge bg-success mt-2">
                        Promo : {produit.typePromotion}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
