import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Lire le rôle attendu depuis l'URL
  
  const expectedRole = new URLSearchParams(location.search).get("role");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:8080/utilisateurs/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          motDePasse: password,
        }),
      });

      if (response.ok) {
        const user = await response.json();
        delete user.motDePasse;

        // ❌ Refuser la connexion si le rôle ne correspond pas
        if (user.role !== expectedRole) {
          setErrorMessage(`Ce compte est un ${user.role}. Veuillez utiliser la page de connexion dédiée.`);
          return;
        }

        // ✅ Connexion valide
        localStorage.setItem("client", JSON.stringify(user));
        if (onLogin) onLogin(user);

        switch (user.role) {
          case "client":
            navigate("/"); // ✅ Page d’accueil publique
            break;
          case "preparateur":
            navigate("/preparateur");
            break;
          case "gerant":
            navigate("/gerant");
            break;
          default:
            navigate("/");
        }
      } else if (response.status === 401) {
        setErrorMessage("Email ou mot de passe incorrect.");
      } else {
        setErrorMessage("Erreur inconnue du serveur.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setErrorMessage("Impossible de contacter le serveur.");
    }
  };

  // ✅ Continuer en tant que visiteur
  const handleVisiteur = () => {
    const visiteur = {
      nom: "Visiteur",
      role: expectedRole,
    };
    localStorage.setItem("client", JSON.stringify(visiteur));
    if (onLogin) onLogin(visiteur);
    navigate("/choix-magasin");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row border rounded-5 p-3 bg-white shadow box-area" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">
          Connexion {expectedRole ? `(${expectedRole})` : ""}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Adresse Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="test@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              placeholder="1234"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          <div className="d-grid mb-2">
            <button type="submit" className="btn btn-primary">
              Se connecter
            </button>
          </div>
        </form>

        <div className="d-grid">
          <button onClick={handleVisiteur} className="btn btn-outline-secondary">
            Continuer en tant que visiteur
          </button>
        </div>
      </div>
    </div>
  );
}
