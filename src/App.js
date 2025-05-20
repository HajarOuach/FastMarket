
import Header from './Components/Header';
import HeroSection from './Components/HeroSection';
import BestSellers from './Components/BestSellers';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    
    <div>
      <Header />
      <HeroSection />
            <BestSellers />
    </div>
  );
}
export default App;
