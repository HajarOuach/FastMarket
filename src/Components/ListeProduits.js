import { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

export default function ListeProduits() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduit, setSelectedProduit] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/produits")
      .then((res) => {
        setProduits(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Erreur :", err);
        setLoading(false);
      });
  }, []);

  const handleDetail = (produit) => {
    setSelectedProduit(produit);
  };

  const handleClose = () => {
    setSelectedProduit(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Nos produits</h2>

      {loading ? (
        <p className="text-center">Chargement en cours...</p>
      ) : (
        <div className="row">
          {produits
            .filter(p =>
              p && p.libelle && p.prixUnitaire && p.image && p.image.trim() !== ""
            )
            .map((produit) => (
              <div key={produit.id} className="col-md-4 mb-4">
                <div className="product-card card border-0 shadow-sm h-100 text-center p-3">
                  <img
                    src={produit.image}
                    alt={produit.libelle}
                    className="img-fluid"
                    style={{
                      height: "180px",
                      objectFit: "contain",
                      marginBottom: "10px",
                      backgroundColor: "#fff"
                    }}
                  />

                  <h6 className="text-dark fw-semibold mb-1">{produit.libelle}</h6>

                  <div className="text-primary fs-5 fw-bold mb-2">
                    {produit.prixUnitaire.toFixed(2)} €
                  </div>

                  {produit.enPromotion && produit.typePromotion && (
                    <div className="badge bg-success text-white mb-3 px-3 py-2 rounded-pill">
                      {produit.typePromotion}
                    </div>
                  )}

                  <div className="d-flex justify-content-center gap-2">
                    <button className="btn btn-primary rounded-pill px-3 d-flex align-items-center gap-2">
                      <i className="bi bi-cart-plus"></i> Ajouter
                    </button>
                    <button
                      className="btn btn-outline-secondary rounded-pill px-3 d-flex align-items-center gap-2"
                      onClick={() => handleDetail(produit)}
                    >
                      <i className="bi bi-info-circle"></i> Détail
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* ✅ Popup Détail */}
      {selectedProduit && (
        <Modal show={true} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduit.libelle}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <img
              src={selectedProduit.image}
              alt={selectedProduit.libelle}
              className="img-fluid"
              style={{ maxHeight: "200px", objectFit: "contain" }}
            />
            <p className="mt-3">
              <strong>Prix :</strong> {selectedProduit.prixUnitaire.toFixed(2)} €<br />
              {selectedProduit.enPromotion && selectedProduit.typePromotion && (
                <>
                  <strong>Promo :</strong> {selectedProduit.typePromotion}
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
}
