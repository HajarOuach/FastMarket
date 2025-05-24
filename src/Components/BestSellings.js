import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

const BestSellings = ({ magasinId }) => {
  const [produits, setProduits] = useState([]);
  const [selectedProduit, setSelectedProduit] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!magasinId) return;

    axios
      .get(`http://localhost:8080/produits/magasin/${magasinId}`)
      .then((res) => {
        const enPromo = res.data.filter((p) => p.enPromotion);
        setProduits(enPromo.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement produits :", err);
        setLoading(false);
      });
  }, [magasinId]);

  const handleDetail = (produit) => setSelectedProduit(produit);
  const handleClose = () => setSelectedProduit(null);

  const increaseQuantity = (id) =>
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));

  const decreaseQuantity = (id) =>
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1),
    }));

  if (loading || !produits.length) return null;

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Meilleures ventes pour vous</h3>
      <div className="row">
        {produits.map((produit) => (
          <div key={produit.id} className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm text-center p-2 position-relative">
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "10px",
                  borderRadius: "12px",
                  height: "140px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <img
                  src={produit.image}
                  alt={produit.libelle}
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                    zIndex: 1,
                    position: "relative",
                  }}
                />
              </div>

              <h6 className="fw-bold text-dark mt-2" style={{ fontSize: "1rem" }}>
                {produit.libelle}
              </h6>
              <div className="fw-bold text-dark mb-2" style={{ fontSize: "1.1rem" }}>
                {produit.prixUnitaire.toFixed(2)} €
              </div>

              <div className="d-flex justify-content-center align-items-center mb-2 gap-2">
                <button
                  className="btn btn-warning btn-sm px-2 py-1"
                  onClick={() => decreaseQuantity(produit.id)}
                >
                  –
                </button>
                <span style={{ minWidth: "20px" }}>
                  {quantities[produit.id] || 1}
                </span>
                <button
                  className="btn btn-warning btn-sm px-2 py-1"
                  onClick={() => increaseQuantity(produit.id)}
                >
                  +
                </button>
              </div>

              <div className="d-flex justify-content-center gap-2 mt-1">
                <button
                  className="btn px-2 py-1 rounded-pill d-flex align-items-center gap-1"
                  style={{
                    fontSize: "0.8rem",
                    backgroundColor: "#3cb371",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  <i className="bi bi-cart-plus" style={{ fontSize: "0.9rem" }}></i> Ajouter
                </button>

                <button
                  className="btn btn-outline-secondary px-2 py-1 rounded-pill d-flex align-items-center gap-1"
                  style={{ fontSize: "0.8rem" }}
                  onClick={() => handleDetail(produit)}
                >
                  <i className="bi bi-info-circle" style={{ fontSize: "0.9rem" }}></i> Détail
                </button>
              </div>

              {produit.typePromotion && (
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    fontSize: "0.7rem",
                    fontWeight: "bold",
                    padding: "3px 10px",
                    borderRadius: "50px",
                    whiteSpace: "nowrap",
                    zIndex: 10,
                  }}
                >
                  {produit.typePromotion}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedProduit && (
        <Modal show onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduit.libelle}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <img
              src={selectedProduit.image}
              alt={selectedProduit.libelle}
              className="img-fluid mb-3"
              style={{
                maxHeight: "200px",
                objectFit: "contain",
                position: "relative",
                zIndex: 1,
              }}
            />
            <p>
              <strong>Prix :</strong> {selectedProduit.prixUnitaire.toFixed(2)} €
              <br />
              {selectedProduit.marque && (
                <>
                  <strong>Marque :</strong> {selectedProduit.marque}
                  <br />
                </>
              )}
              {selectedProduit.enPromotion && selectedProduit.typePromotion && (
                <>
                  <strong>Promotion :</strong> {selectedProduit.typePromotion}
                </>
              )}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default BestSellings;
