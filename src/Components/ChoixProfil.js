// src/Components/ChoixProfil.js
import { useNavigate } from "react-router-dom";


export default function ChoixProfil() {
  const navigate = useNavigate();

  const handleSelection = (role) => {
    // redirection selon le rôle choisi
    if (role === "client") navigate("/login?role=client");
    else if (role === "preparateur") navigate("/login?role=preparateur");
    else if (role === "gerant") navigate("/login?role=gerant");
  };

  return (
    <div className="container text-center mt-5">
        <img
              src="images/LogoMarket2 (2).png"
              alt="FastMarket Logo"
              className="img-fluid"
              style={{ maxHeight: 80 }}
            />
      <h2 className="mb-4">Bienvenue sur FastMarket</h2>
      <p className="lead mb-5">Veuillez choisir votre profil :</p>

      <div className="row justify-content-center">
        <div className="col-12 col-md-4 mb-3">
          <button
            className="btn btn-primary w-100 py-3"
            onClick={() => handleSelection("client")}
          >
            Je suis un Client
          </button>
        </div>
        <div className="col-12 col-md-4 mb-3">
          <button
            className="btn btn-warning w-100 py-3"
            onClick={() => handleSelection("preparateur")}
          >
            Préparateur de commande
          </button>
        </div>
        <div className="col-12 col-md-4 mb-3">
          <button
            className="btn btn-success w-100 py-3"
            onClick={() => handleSelection("gerant")}
          >
            Gérant
          </button>
        </div>
      </div>
    </div>
  );
}
