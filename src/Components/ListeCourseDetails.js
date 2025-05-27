import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toast, ToastContainer, Button, Form, Card } from 'react-bootstrap';
import Header from './Header';

export default function ListeCourseDetails() {
  const { listeId } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [postItInput, setPostItInput] = useState('');
  const [editingPostItId, setEditingPostItId] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', bg: 'success' });

  const client = JSON.parse(localStorage.getItem("client"));
  const clientId = client?.id;

  const fetchDetails = () => {
    axios
      .get(`http://localhost:8080/listesCourses/${listeId}/details`)
      .then((res) => setDetails(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchDetails();
  }, [listeId]);

  const showToast = (message, bg = 'success') => {
    setToast({ show: true, message, bg });
    setTimeout(() => setToast({ show: false, message: '', bg: 'success' }), 3000);
  };

  const handleAddPostIt = () => {
    if (!postItInput.trim()) return;
    axios
      .post(`http://localhost:8080/listesCourses/${listeId}/postits`, { contenu: postItInput })
      .then(() => {
        showToast('Post-it ajouté');
        setPostItInput('');
        fetchDetails();
      })
      .catch(() => showToast("Erreur d'ajout", 'danger'));
  };

  const handleDeletePostIt = (postItId) => {
    axios
      .delete(`http://localhost:8080/listesCourses/${listeId}/postits/${postItId}`)
      .then(() => {
        showToast('Post-it supprimé');
        fetchDetails();
      })
      .catch(() => showToast("Erreur suppression", 'danger'));
  };

  const handleEditPostIt = (postItId, contenu) => {
    setEditingPostItId(postItId);
    setEditingContent(contenu);
  };

  const handleUpdatePostIt = () => {
    if (!editingPostItId) return;
    axios
      .put(`http://localhost:8080/listesCourses/${listeId}/postits/${editingPostItId}`, {
        contenu: editingContent
      })
      .then(() => {
        showToast('Post-it modifié');
        setEditingPostItId(null);
        setEditingContent('');
        fetchDetails();
      })
      .catch(() => showToast("Erreur modification", 'danger'));
  };

  const handleDeleteProduit = (produitId) => {
    axios
      .delete(`http://localhost:8080/listesCourses/${listeId}/produits/${produitId}`)
      .then(() => {
        showToast('Produit supprimé');
        fetchDetails();
      })
      .catch(() => showToast("Erreur suppression produit", 'danger'));
  };

  const handleAjouterTousAuPanier = async () => {
    if (!clientId || !details || !details.produits.length) return;
    try {
      await Promise.all(
        details.produits.map((produit) =>
          axios.post("http://localhost:8080/panier/ajouter", {
            clientId,
            produitId: produit.id,
            quantite: 1,
          })
        )
      );
      showToast('Tous les produits ont été ajoutés au panier');
    } catch (error) {
      console.error(error);
      showToast('Erreur lors de l’ajout au panier', 'danger');
    }
  };

  if (!details) return <p className="text-center mt-5">Chargement...</p>;

  return (
    <>
      <Header />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Liste : {details.nom}</h2>
          <Button variant="outline-primary" onClick={() => navigate('/liste-courses')}>
            Retour aux listes
          </Button>
        </div>

        {/* Post-Its */}
        <div className="mb-5">
          <h4>Post-its</h4>
          <div className="row">
            <div className="col-md-3 mb-3">
              <Card className="bg-light p-2 shadow-sm">
                <Form.Control
                  type="text"
                  placeholder="Contenu du post-it"
                  value={postItInput}
                  onChange={(e) => setPostItInput(e.target.value)}
                  className="mb-2"
                />
                <Button variant="success" onClick={handleAddPostIt}>
                  Ajouter
                </Button>
              </Card>
            </div>
            {details.postIts.map((p) => (
              <div key={p.id} className="col-md-3 mb-3">
                <Card className="bg-warning-subtle p-2 shadow-sm">
                  {editingPostItId === p.id ? (
                    <>
                      <Form.Control
                        type="text"
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        className="mb-2"
                      />
                      <div className="d-flex justify-content-between">
                        <Button size="sm" variant="success" onClick={handleUpdatePostIt}>
                          Sauvegarder
                        </Button>
                        <Button size="sm" variant="secondary" onClick={() => setEditingPostItId(null)}>
                          Annuler
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Card.Text className="mb-2">{p.contenu}</Card.Text>
                      <div className="d-flex justify-content-between">
                        <Button
                          size="sm"
                          variant="outline-primary"
                          onClick={() => handleEditPostIt(p.id, p.contenu)}
                        >
                          Modifier
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => handleDeletePostIt(p.id)}
                        >
                          Supprimer
                        </Button>
                      </div>
                    </>
                  )}
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Produits */}
        <h4 className="mb-3">Produits</h4>
        <div className="row">
          {details.produits.length === 0 ? (
            <p className="text-center text-muted">Aucun produit dans cette liste.</p>
          ) : (
            details.produits.map((produit) => (
              <div key={produit.id} className="col-md-3 mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={produit.image}
                    alt={produit.libelle}
                    style={{ objectFit: 'contain', height: '180px' }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{produit.libelle}</Card.Title>
                    <Card.Text>{produit.prixUnitaire.toFixed(2)} €</Card.Text>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="mt-auto"
                      onClick={() => handleDeleteProduit(produit.id)}
                    >
                      Supprimer
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))
          )}
        </div>

        {details.produits.length > 0 && (
          <div className="text-end mt-4 mb-5">
            <Button variant="success" onClick={handleAjouterTousAuPanier}>
              Ajouter tous les produits au panier
            </Button>
          </div>
        )}

        <ToastContainer position="top-center">
          <Toast bg={toast.bg} show={toast.show} onClose={() => setToast({ ...toast, show: false })}>
            <Toast.Body>{toast.message}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </>
  );
}