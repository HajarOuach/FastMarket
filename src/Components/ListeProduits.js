import { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

export default function ListeProduits() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduit, setSelectedProduit] = useState(null);
  const [quantities, setQuantities] = useState({});

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

  const handleDetail = (produit) => setSelectedProduit(produit);
  const handleClose = () => setSelectedProduit(null);

  const increaseQuantity = (id) =>
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  const decreaseQuantity = (id) =>
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1),
    }));

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Nos produits disponibles</h2>

      {loading ? (
        <p className="text-center">Chargement en cours...</p>
      ) : (
        <div className="row">
          {produits
            .filter((p) => p && p.libelle && p.prixUnitaire && p.image?.trim() !== "")
            .map((produit) => (
              <div key={produit.id} className="col-md-3 mb-3">
                <div
                  className="card border-0 shadow-sm text-center p-2 position-relative"
                  style={{
                    minHeight: "auto",
                    height: "100%",
                    backgroundColor: "#ffffff",
                  }}
                >
                  {/* ✅ Bloc image avec fond blanc solide sous l'image transparente */}
                  <div
                    style={{
                      backgroundColor: "#fff",
                      padding: "10px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      height: "140px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#fff",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 0,
                      }}
                    />
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

                  <h6 className="fw-bold text-dark mb-1" style={{ fontSize: "0.9rem" }}>
                    {produit.libelle}
                  </h6>
                  <div className="fw-bold mb-1" style={{ color: "#000", fontSize: "1rem" }}>
                    {produit.prixUnitaire.toFixed(2)} €
                  </div>

                  <div className="d-flex justify-content-center align-items-center mt-1 mb-1 gap-2">
                    <button
                      className="btn btn-warning btn-sm px-2 py-1"
                      style={{ fontSize: "0.75rem" }}
                      onClick={() => decreaseQuantity(produit.id)}
                    >
                      –
                    </button>
                    <span style={{ minWidth: "20px" }}>{quantities[produit.id] || 1}</span>
                    <button
                      className="btn btn-warning btn-sm px-2 py-1"
                      style={{ fontSize: "0.75rem" }}
                      onClick={() => increaseQuantity(produit.id)}
                    >
                      +
                    </button>
                  </div>

                  <div className="d-flex justify-content-center gap-2 mt-1">
                    <button
                      className="btn px-2 py-1 rounded-pill d-flex align-items-center gap-1"
                      style={{
                        fontSize: "0.75rem",
                        backgroundColor: "#3cb371",
                        color: "#fff",
                        border: "none",
                      }}
                    >
                      <i className="bi bi-cart-plus" style={{ fontSize: "0.8rem" }}></i> Ajouter
                    </button>

                    <button
                      className="btn btn-outline-secondary px-2 py-1 rounded-pill d-flex align-items-center gap-1"
                      style={{ fontSize: "0.75rem" }}
                      onClick={() => handleDetail(produit)}
                    >
                      <i className="bi bi-info-circle" style={{ fontSize: "0.8rem" }}></i> Détail
                    </button>
                  </div>

                  {produit.enPromotion && produit.typePromotion && (
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
      )}

      {selectedProduit && (
        <Modal show onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduit.libelle}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                padding: "10px",
                display: "inline-block",
                position: "relative",
              }}
            >
              <div
                style={{
                  backgroundColor: "#fff",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 0,
                }}
              />
              <img
                src={selectedProduit.image}
                alt={selectedProduit.libelle}
                className="img-fluid"
                style={{
                  maxHeight: "200px",
                  objectFit: "contain",
                  position: "relative",
                  zIndex: 1,
                }}
              />
            </div>
            <p className="mt-3">
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
