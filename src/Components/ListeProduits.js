import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

export default function ListeProduits() {
  const [produits, setProduits] = useState([]);
  const [produitsLoaded, setProduitsLoaded] = useState(false);
  const [selectedProduit, setSelectedProduit] = useState(null);
  const [quantities, setQuantities] = useState({});
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedCategorie = params.get("categorie");
  const magasinId = params.get("magasinId");

  const client = JSON.parse(localStorage.getItem("client"));
  const clientId = client?.id;

  useEffect(() => {
    if (!magasinId) return;

    axios
      .get(`http://localhost:8080/produits/magasin/${magasinId}`)
      .then((res) => {
        const allProduits = res.data;
        const filtered = selectedCategorie
          ? allProduits.filter(
              (p) =>
                p.categorie?.nom?.toLowerCase() ===
                selectedCategorie.toLowerCase()
            )
          : allProduits;

        setProduits(filtered);
        setProduitsLoaded(true);
      })
      .catch((err) => {
        console.error("Erreur chargement produits :", err);
        setProduitsLoaded(true);
      });
  }, [selectedCategorie, magasinId]);

  const handleDetail = async (produit) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/produits/${produit.id}/recommandes`
      );
      const produitsRecommandes = res.data;
      setSelectedProduit({ ...produit, produitsRecommandes });
    } catch (err) {
      console.error("Erreur chargement recommandations :", err);
      setSelectedProduit({ ...produit, produitsRecommandes: [] });
    }
  };

  const handleClose = () => setSelectedProduit(null);

  const increaseQuantity = (id) =>
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));

  const decreaseQuantity = (id) =>
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1),
    }));

  const handleAjouter = async (produitId) => {
    if (!clientId) {
      alert("Veuillez vous connecter pour ajouter un produit.");
      return;
    }

    const quantite = quantities[produitId] || 1;

    try {
      const res = await fetch("http://localhost:8080/panier/ajouter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId, produitId, quantite }),
      });

      if (res.ok) {
        alert("Produit ajouté au panier !");
      } else {
        alert("Erreur lors de l'ajout au panier.");
      }
    } catch (err) {
      console.error("Erreur de connexion :", err);
      alert("Erreur serveur.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        {selectedCategorie
          ? `Produits – ${selectedCategorie}`
          : "Nos produits disponibles"}
      </h2>

      {!produitsLoaded ? (
        <p className="text-center">Chargement...</p>
      ) : produits.length === 0 ? (
        <div className="col-12 text-center text-muted">
          <p>😕 Aucun produit disponible pour cette catégorie ou ce magasin.</p>
        </div>
      ) : (
        <div className="row">
          {produits
            .filter((p) => p && p.libelle && p.prixUnitaire && p.image?.trim() !== "")
            .map((produit) => (
              <div key={produit.id} className="col-md-3 mb-3">
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
                    <span style={{ minWidth: "20px" }}>
                      {quantities[produit.id] || 1}
                    </span>
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
                      onClick={() => handleAjouter(produit.id)}
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
        <Modal show onHide={handleClose} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduit.libelle}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <img
              src={selectedProduit.image}
              alt={selectedProduit.libelle}
              className="img-fluid mb-3"
              style={{ maxHeight: "200px", objectFit: "contain" }}
            />
            <p className="mt-3">
              <strong>Prix :</strong> {selectedProduit.prixUnitaire.toFixed(2)} €<br />
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

            {selectedProduit.produitsRecommandes?.length > 0 && (
              <div className="mt-4">
                <h5 className="fw-bold text-center mt-4 mb-3">Produits recommandés :</h5>
                <div className="row">
                  {selectedProduit.produitsRecommandes.map((rec) => (
                    <div key={rec.id} className="col-md-4 mb-3">
                      <div className="card shadow-sm p-2 text-center">
                        <img
                          src={rec.image}
                          alt={rec.libelle}
                          style={{ maxHeight: "120px", objectFit: "contain" }}
                          className="mb-2"
                        />
                        <h6 className="fw-bold" style={{ fontSize: "0.9rem" }}>
                          {rec.libelle}
                        </h6>
                        <div className="fw-bold mb-1">{rec.prixUnitaire.toFixed(2)} €</div>

                        <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() =>
                              setQuantities((prev) => ({
                                ...prev,
                                [rec.id]: Math.max(1, (prev[rec.id] || 1) - 1),
                              }))
                            }
                          >
                            –
                          </button>
                          <span>{quantities[rec.id] || 1}</span>
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() =>
                              setQuantities((prev) => ({
                                ...prev,
                                [rec.id]: (prev[rec.id] || 1) + 1,
                              }))
                            }
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="btn btn-success btn-sm w-100"
                          onClick={() => handleAjouter(rec.id)}
                        >
                          <i className="bi bi-cart-plus me-1"></i> Ajouter au panier
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
