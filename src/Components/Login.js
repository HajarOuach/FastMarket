import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Simulation : identifiants valides = test@mail.com / 1234
    if (email === "test@mail.com" && password === "1234") {
      const fakeUser = { name: "Jean Dupont", email };
      const fakeToken = "abc123xyz";

      localStorage.setItem("token", fakeToken);
      onLogin(fakeUser);
    } else {
      alert("Identifiants incorrects. Essayez test@mail.com / 1234");
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
