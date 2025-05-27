import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ListeCourseDetails() {
  const { listeId } = useParams();
  const [listeDetails, setListeDetails] = useState(null);
  const [nouveauPostIt, setNouveauPostIt] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!listeId) return;

    axios
      .get(`http://localhost:8080/listesCourses/${listeId}/details`)
      .then((res) => {
        setListeDetails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement détails :", err);
        setLoading(false);
      });
  }, [listeId]);

  const handleAddPostIt = async () => {
    if (!nouveauPostIt.trim()) return;

    try {
      await axios.post(`http://localhost:8080/listesCourses/${listeId}/postits`, {
        contenu: nouveauPostIt,
      });
      const updated = await axios.get(
        `http://localhost:8080/listesCourses/${listeId}/details`
      );
      setListeDetails(updated.data);
      setNouveauPostIt("");
    } catch (err) {
      console.error("Erreur ajout post-it :", err);
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Chargement...</div>;
  }

  if (!listeDetails) {
    return <div className="text-center mt-5 text-danger">Aucune donnée trouvée.</div>;
  }

  // Éliminer les doublons de produits par leur ID
  const produitsUniques = listeDetails.produits.filter(
    (p, index, self) => index === self.findIndex((t) => t.id === p.id)
  );

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">{listeDetails.nom}</h3>

      <h5>Produits dans la liste</h5>
      <div className="row mb-4">
        {produitsUniques.length === 0 ? (
          <p className="text-muted">Aucun produit.</p>
        ) : (
          produitsUniques.map((produit) => (
            <div key={produit.id} className="col-md-3 mb-3">
              <div className="card h-100 text-center shadow-sm">
                <img
                  src={produit.image}
                  alt={produit.libelle}
                  className="card-img-top p-3"
                  style={{ height: "140px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h6 className="card-title">{produit.libelle}</h6>
                  {produit.marque && (
                    <p className="mb-1 text-muted" style={{ fontSize: "0.85rem" }}>
                      Marque : {produit.marque}
                    </p>
                  )}
                  <p className="fw-bold">{produit.prixUnitaire.toFixed(2)} €</p>
                  {produit.enPromotion && (
                    <span className="badge bg-success">Promo</span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <h5>Post-its</h5>
      <ul className="list-group mb-3">
        {listeDetails.postIts.length === 0 ? (
          <p className="text-muted">Aucun post-it.</p>
        ) : (
          listeDetails.postIts.map((p) => (
            <li key={p.id} className="list-group-item">
              {p.contenu}
            </li>
          ))
        )}
      </ul>

      <div className="d-flex gap-2">
        <input
          type="text"
          placeholder="Ajouter un post-it..."
          className="form-control"
          value={nouveauPostIt}
          onChange={(e) => setNouveauPostIt(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddPostIt}>
          Ajouter
        </button>
      </div>
    </div>
  );
}