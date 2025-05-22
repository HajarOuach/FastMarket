import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        const client = await response.json();

        // 🔍 Afficher les données reçues pour vérification
        console.log("Données utilisateur reçues :", client);

        // 🧹 Enlever le mot de passe avant stockage
        delete client.motDePasse;

        // 💾 Stockage + appel fonction de connexion
        localStorage.setItem("client", JSON.stringify(client));
        if (onLogin) onLogin(client);

        // 🔁 Redirection selon le rôle de l'utilisateur
        switch (client.role) {
          case "client":
            navigate("/");
            break;
          case "preparateur":
            navigate("/preparateur");
            break;
          case "gerant":
            navigate("/gerant");
            break;
          default:
            navigate("/login"); // sécurité
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

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row border rounded-5 p-3 bg-white shadow box-area" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Connexion</h3>
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

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
