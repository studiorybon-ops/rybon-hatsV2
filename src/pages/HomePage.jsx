import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SplashScreen from '../components/SplashScreen';

const HomePage = () => {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    sessionStorage.removeItem('hasSeenSplash');
    setShowSplash(true);
  }, []);

  const handleEnter = () => {
    sessionStorage.setItem('hasSeenSplash', 'true');
    setShowSplash(false);
    navigate('/catalogo', { replace: true });
  };

  if (showSplash) {
    return <SplashScreen onEnter={handleEnter} />;
  }

  return null;
};

export default HomePage;
