import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar({ magasinId }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Redirection vers la page de résultats avec paramètres
    navigate(`/produits?motcle=${encodeURIComponent(query)}&magasinId=${magasinId}`);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex align-items-center">
      <input
        type="text"
        className="form-control border-0 bg-transparent"
        placeholder="Rechercher un produit..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="btn btn-link text-dark">
        <i className="bi bi-search"></i>
      </button>
    </form>
  );
}

export default SearchBar;
