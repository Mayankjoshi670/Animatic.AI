import React, { useState } from 'react';
import { Eye, EyeOff, Github, Mail, Lock, User, Chrome } from 'lucide-react';
import "./Auth.css";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider} login clicked`);
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

            <button type="button" onClick={handleSubmit} className="submitButton">
              {isLogin ? 'Sign In' : 'Create Account'}
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
