import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import './Auth.css';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.register(formData);
      // Après inscription, on redirige vers la connexion
      navigate('/connexion');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Une erreur est survenue lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card card">
        <header className="auth-header">
          <div className="auth-logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </div>
          <h1>S'inscrire</h1>
          <p>Rejoignez la communauté KgConnect</p>
        </header>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="form-group flex flex-col gap-2 flex-grow">
              <label htmlFor="firstname">Prénom</label>
              <input 
                type="text" 
                id="firstname" 
                placeholder="Jean"
                value={formData.firstname}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group flex flex-col gap-2 flex-grow">
              <label htmlFor="lastname">Nom</label>
              <input 
                type="text" 
                id="lastname" 
                placeholder="Dupont"
                value={formData.lastname}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="votre@email.fr"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group flex flex-col gap-2">
            <label htmlFor="password">Mot de passe</label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn-primary w-full" style={{ justifyContent: 'center', marginTop: '12px' }} disabled={loading}>
            {loading ? 'Création...' : 'Créer un compte'}
          </button>
        </form>

        <footer className="auth-footer">
          <p>Déjà un compte ? <Link to="/connexion">Se connecter</Link></p>
        </footer>
      </div>
    </div>
  );
};

export default Register;
