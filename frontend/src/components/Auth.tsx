import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Github, Mail, Lock, User, Chrome } from 'lucide-react';
import "./Auth.css";

interface AuthPageProps {
  onAuthSuccess: () => void;
  isSignup?: boolean;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess, isSignup = false }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(!isSignup);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const BACKEND_URL = import.meta.env.VITE_API_URL;

  // Handle social login redirect with token in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      onAuthSuccess();
      window.history.replaceState({}, document.title, window.location.pathname);
      navigate('/editor', { replace: true });
    }
  }, [onAuthSuccess, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      let url = isLogin ? `${BACKEND_URL}/api/auth/login` : `${BACKEND_URL}/api/auth/signup`;
      let body: any = {
        email: formData.email,
        password: formData.password,
      };
      if (!isLogin) {
        body.name = formData.name;
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
      }
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Authentication failed');
        setLoading(false);
        return;
      }
      localStorage.setItem('token', data.token);
      onAuthSuccess();
      navigate('/editor', { replace: true });
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    const temp = `${BACKEND_URL}/api/auth/${provider.toLowerCase()}`;
    window.location.href = temp;
  };

  return (
    <div className="container">
      <div className="background">
        <div className="purpleCircle"></div>
        <div className="blueCircle"></div>
      </div>

      <div className="formWrapper">
        <div className="glassContainer">
          <div className="header">
            <div className="iconWrapper">
              <Lock className="icon" />
            </div>
            <h1 className="title">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
            <p className="subtitle">
              {isLogin ? 'Sign in to your account' : 'Sign up to get started'}
            </p>
          </div>

          <div className="socialGroup">
            <button
              onClick={() => handleSocialLogin('GitHub')}
              className="socialBtn github"
            >
              <Github className="socialIcon" />
              Continue with GitHub
            </button>
            <button
              onClick={() => handleSocialLogin('Google')}
              className="socialBtn google"
            >
              <Chrome className="socialIcon googleIcon" />
              Continue with Google
            </button>
          </div>

          <div className="divider">
            <div className="line"></div>
            <span className="dividerText">Or continue with email</span>
          </div>

          <div className="inputGroup">
            {!isLogin && (
              <div className="inputWrapper">
                <User className="inputIcon" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  required
                  className="input"
                />
              </div>
            )}

            <div className="inputWrapper">
              <Mail className="inputIcon" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                required
                className="input"
              />
            </div>

            <div className="inputWrapper">
              <Lock className="inputIcon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
                className="input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="eyeButton"
              >
                {showPassword ? (
                  <EyeOff className="eyeIcon" />
                ) : (
                  <Eye className="eyeIcon" />
                )}
              </button>
            </div>

            {!isLogin && (
              <div className="inputWrapper">
                <Lock className="inputIcon" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  required
                  className="input"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="eyeButton"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="eyeIcon" />
                  ) : (
                    <Eye className="eyeIcon" />
                  )}
                </button>
              </div>
            )}

            {isLogin && (
              <div className="rememberRow">
                <label className="checkboxLabel">
                  <input type="checkbox" className="checkbox" />
                  <span className="checkboxText">Remember me</span>
                </label>
                <button type="button" className="forgot">
                  Forgot password?
                </button>
              </div>
            )}

            {error && <div className="error-message">{error}</div>}
            <button type="button" onClick={handleSubmit} className="submitButton" disabled={loading}>
              {loading ? (isLogin ? 'Signing In...' : 'Creating Account...') : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </div>

          <div className="toggle">
            <p className="subtitle">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button onClick={() => setIsLogin(!isLogin)} className="toggleLink">
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {!isLogin && (
            <div className="terms">
              <p>
                By signing up, you agree to our{' '}
                <a href="#" className="link">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="link">
                  Privacy Policy
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
