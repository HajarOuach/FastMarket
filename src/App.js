import { useState } from 'react';
import Header from './Components/Header';
import HeroSection from './Components/HeroSection';
import BestSellers from './Components/BestSellers';
import Login from './Components/Login'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Categories   from './Components/Categories';

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
          <Categories />
        </>
      )}
    </div>
  );
}

export default App;
