import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthHandler = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    navigate('/editor', { replace: true });
  }, [navigate]);
  return null;
};

export default OAuthHandler; 