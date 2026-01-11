import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import './loginModal.css';

const AuthPage = () => {
  const { login, signup } = useAuth();
  const [activePanel, setActivePanel] = useState('login');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [isProcessing, setIsProcessing] = useState({ login: false, signup: false });

  const notify = ({ icon, title, text }) => {
    Swal.fire({
      icon,
      title,
      text,
      timer: icon === 'success' ? 1800 : undefined,
      showConfirmButton: icon !== 'success',
      confirmButtonColor: '#0ea5e9'
    });
  };

  const describeRole = (role) => (role === 'admin' ? 'Admin' : 'User');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginForm.email.trim() || !loginForm.password.trim()) {
      notify({ icon: 'warning', title: 'Missing fields', text: 'Please enter both email and password.' });
      return;
    }

    setIsProcessing(prev => ({ ...prev, login: true }));

    setTimeout(() => {
      const result = login(loginForm.email, loginForm.password);
      if (result.success) {
        notify({ icon: 'success', title: 'You are in!', text: `Welcome back, ${result.user.name}!` });
      } else {
        notify({ icon: 'error', title: 'Login failed', text: result.error });
      }
      setIsProcessing(prev => ({ ...prev, login: false }));
    }, 600);
  };

  const handleRoleChange = (role) => setSignupForm(prev => ({ ...prev, role }));

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!signupForm.name.trim() || !signupForm.email.trim() || !signupForm.password.trim()) {
      notify({ icon: 'warning', title: 'Missing details', text: 'Please complete every field to continue.' });
      return;
    }

    if (signupForm.password.trim().length < 6) {
      notify({ icon: 'info', title: 'Weak password', text: 'Use at least 6 characters for your password.' });
      return;
    }

    setIsProcessing(prev => ({ ...prev, signup: true }));

    try {
      const result = await signup(signupForm);
      if (result.success) {
        const signupEmail = signupForm.email;
        notify({
          icon: 'success',
          title: 'Account created',
          text: `${describeRole(result.user.role)} profile ready. Please log in to continue.`
        });
        setSignupForm({ name: '', email: '', password: '', role: 'user' });
        setLoginForm(prev => ({ ...prev, email: signupEmail, password: '' }));
        setActivePanel('login');
      } else {
        notify({ icon: 'error', title: 'Sign up failed', text: result.error });
      }
    } catch (error) {
      notify({ icon: 'error', title: 'Sign up failed', text: 'An error occurred. Please try again.' });
    } finally {
      setIsProcessing(prev => ({ ...prev, signup: false }));
    }
  };

  const handleDemoLogin = (role) => {
    const demoAccount = role === 'admin'
      ? { email: 'admin@example.com', password: 'admin123' }
      : { email: 'user@example.com', password: 'user123' };

    setLoginForm(demoAccount);
  };

  return (
    <div className="auth-container">
      <div className="auth-card simple">
        <header className="auth-header">
          <h1>Movie Review</h1>
          <p>Sign in or create an account to manage movies and reviews.</p>
        </header>

        <div className="auth-switch">
          <button
            type="button"
            className={activePanel === 'login' ? 'switch-btn active' : 'switch-btn'}
            onClick={() => setActivePanel('login')}
          >
            Login
          </button>
          <button
            type="button"
            className={activePanel === 'signup' ? 'switch-btn active' : 'switch-btn'}
            onClick={() => setActivePanel('signup')}
          >
            Sign Up
          </button>
        </div>

        {activePanel === 'login' ? (
          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label htmlFor="login-email">Email address</label>
              <input
                id="login-email"
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                placeholder="you@example.com"
                disabled={isProcessing.login}
              />
            </div>
            <div className="form-group">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                placeholder="••••••••"
                disabled={isProcessing.login}
              />
            </div>
            <button type="submit" className="btn-primary" disabled={isProcessing.login}>
              {isProcessing.login ? 'Checking credentials…' : 'Access Dashboard'}
            </button>

            <div className="demo-accounts">
              <p>Use a demo profile</p>
              <div className="demo-actions">
                <button type="button" onClick={() => handleDemoLogin('admin')}>
                  Admin · admin@example.com
                </button>
                <button type="button" onClick={() => handleDemoLogin('user')}>
                  User · user@example.com
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="auth-form">
            <div className="form-group">
              <label htmlFor="signup-name">First name</label>
              <input
                id="signup-name"
                type="text"
                value={signupForm.name}
                onChange={(e) => setSignupForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Alex"
                disabled={isProcessing.signup}
              />
            </div>
            <div className="form-group">
              <label htmlFor="signup-email">Email address</label>
              <input
                id="signup-email"
                type="email"
                value={signupForm.email}
                onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                placeholder="team@studio.com"
                disabled={isProcessing.signup}
              />
            </div>
            <div className="form-group">
              <label htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                type="password"
                value={signupForm.password}
                onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                placeholder="At least 6 characters"
                disabled={isProcessing.signup}
              />
            </div>

            <div className="role-selector compact">
              <p>Choose your role</p>
              <div className="role-options">
                <button
                  type="button"
                  className={signupForm.role === 'user' ? 'role-option active' : 'role-option'}
                  onClick={() => handleRoleChange('user')}
                  disabled={isProcessing.signup}
                >
                  User
                </button>
                <button
                  type="button"
                  className={signupForm.role === 'admin' ? 'role-option active' : 'role-option'}
                  onClick={() => handleRoleChange('admin')}
                  disabled={isProcessing.signup}
                >
                  Admin
                </button>
              </div>
            </div>

            <button type="submit" className="btn-secondary" disabled={isProcessing.signup}>
              {isProcessing.signup ? 'Creating profile…' : 'Create Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
