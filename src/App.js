import { useState } from 'react';
import Header from './Components/Header';
import HeroSection from './Components/HeroSection';
import BestSellers from './Components/BestSellers';
import Login from './Components/Login'; // 👈 ajoute ce fichier
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState(null); // 👈 état utilisateur

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    
    <div>
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Header />
          <HeroSection />
          <BestSellers />
        </>
      )}
    </div>
  );
}

export default App;
