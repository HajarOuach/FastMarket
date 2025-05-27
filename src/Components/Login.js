import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

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
        body: JSON.stringify({ email, motDePasse: password }),
      });

      if (!response.ok) {
        setErrorMessage("Email ou mot de passe incorrect.");
        return;
      }

      const utilisateur = await response.json();
      if (utilisateur.role !== expectedRole) {
        setErrorMessage(`Ce compte est un ${utilisateur.role}. Veuillez utiliser la bonne page de connexion.`);
        return;
      }

      // Récupération des détails en fonction du rôle
      let apiUrl = "";
      switch (utilisateur.role) {
        case "client":
          apiUrl = `http://localhost:8080/clients/email/${encodeURIComponent(utilisateur.email)}`;
          break;
        case "preparateur":
          apiUrl = `http://localhost:8080/preparateurs/email/${encodeURIComponent(utilisateur.email)}`;
          break;
        case "gerant":
          apiUrl = `http://localhost:8080/gerants/email/${encodeURIComponent(utilisateur.email)}`;
          break;
        default:
          setErrorMessage("Rôle non pris en charge.");
          return;
      }

      const userDetailsRes = await fetch(apiUrl);
      if (!userDetailsRes.ok) {
        setErrorMessage("Impossible de récupérer les informations détaillées.");
        return;
      }

      const details = await userDetailsRes.json();
      const userWithId = { ...utilisateur, id: details.id };
      localStorage.setItem("client", JSON.stringify(userWithId));
      if (onLogin) onLogin(userWithId);

      // Stockage du magasinId selon le rôle
      switch (utilisateur.role) {
        case "client":
          const magasinIdClient = details.magasin?.id;
          console.log("Login client – magasin ID :", magasinIdClient);
          localStorage.setItem("magasinId", magasinIdClient ? magasinIdClient.toString() : "");
          if (magasinIdClient) {
            navigate(`/accueil-magasin/${magasinIdClient}`);
          } else {
            navigate("/accueil-magasin");
          }
          break;

          case "preparateur":
            const magasinPrepId = details.magasin?.id;
            if (magasinPrepId) {
              localStorage.setItem("magasinId", magasinPrepId.toString());
            }
            
            localStorage.setItem("preparateurId", details.id.toString());
            navigate("/preparateur");
            break;

        case "gerant":
          navigate("/gerant");
          break;

        default:
          navigate("/");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setErrorMessage("Erreur réseau ou serveur.");
    }
  };

  const handleVisiteur = () => {
    const visiteur = { nom: "Visiteur", role: expectedRole };
    localStorage.setItem("client", JSON.stringify(visiteur));
    if (onLogin) onLogin(visiteur);
    navigate("/choix-magasin");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row border rounded-5 p-3 bg-white shadow box-area" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Connexion {expectedRole ? `(${expectedRole})` : ""}</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Adresse Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Entrez votre email"
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
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

          <div className="d-grid mb-2">
            <button type="submit" className="btn btn-primary">Se connecter</button>
          </div>
        </form>

      {expectedRole === "client" && (
  <div className="d-grid">
    <button onClick={handleVisiteur} className="btn btn-outline-secondary">
      Continuer en tant que visiteur
    </button>
  </div>
)}

      </div>
    </div>
  );
}
