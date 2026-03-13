import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { tripService } from '../services/trip.service';
import './Dashboard.css';

const CreateTrip: React.FC = () => {
  const [formData, setFormData] = useState({
    departureCountry: '',
    departureCity: '',
    arrivalCountry: '',
    arrivalCity: '',
    departureDate: '',
    availableWeight: 20,
    pricePerKg: 2,
    description: '',
    status: 'active'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [id]: id === 'availableWeight' || id === 'pricePerKg' ? parseFloat(value) : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Note: In a real app, we'd get the user IRI from auth state
      const tripData = {
        ...formData,
        sender: "/api/users/current", // This is a placeholder, handle real user IRI in real scenario
        departureDate: new Date(formData.departureDate).toISOString()
      };
      await tripService.create(tripData);
      navigate('/dashboard');
    } catch (error) {
      console.error("Error creating trip:", error);
      alert("Erreur lors de la création du trajet. Vérifiez votre connexion au backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <Navbar />
      <main className="container main-content">
        <header className="dashboard-header">
          <h1>Proposer un trajet</h1>
          <p className="welcome-sub">Remplissez les détails pour partager votre espace disponible.</p>
        </header>

        <section className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <form onSubmit={handleSubmit} className="auth-form flex flex-col gap-6">
            <div className="flex gap-4">
              <div className="form-group flex flex-col gap-2 flex-grow">
                <label htmlFor="departureCity">Ville de départ</label>
                <input type="text" id="departureCity" value={formData.departureCity} onChange={handleChange} required />
              </div>
              <div className="form-group flex flex-col gap-2 flex-grow">
                <label htmlFor="departureCountry">Pays</label>
                <input type="text" id="departureCountry" value={formData.departureCountry} onChange={handleChange} required />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="form-group flex flex-col gap-2 flex-grow">
                <label htmlFor="arrivalCity">Ville d'arrivée</label>
                <input type="text" id="arrivalCity" value={formData.arrivalCity} onChange={handleChange} required />
              </div>
              <div className="form-group flex flex-col gap-2 flex-grow">
                <label htmlFor="arrivalCountry">Pays</label>
                <input type="text" id="arrivalCountry" value={formData.arrivalCountry} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group flex flex-col gap-2">
              <label htmlFor="departureDate">Date de départ</label>
              <input type="datetime-local" id="departureDate" value={formData.departureDate} onChange={handleChange} required />
            </div>

            <div className="flex gap-4">
              <div className="form-group flex flex-col gap-2 flex-grow">
                <label htmlFor="availableWeight">Poids disponible (kg)</label>
                <input type="number" id="availableWeight" value={formData.availableWeight} onChange={handleChange} required />
              </div>
              <div className="form-group flex flex-col gap-2 flex-grow">
                <label htmlFor="pricePerKg">Prix par kg (€)</label>
                <input type="number" id="pricePerKg" value={formData.pricePerKg} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group flex flex-col gap-2">
              <label htmlFor="description">Description (optionnel)</label>
              <textarea id="description" rows={3} value={formData.description} onChange={handleChange}></textarea>
            </div>

            <button type="submit" className="btn-primary w-full" disabled={loading} style={{ justifyContent: 'center' }}>
              {loading ? 'Création...' : 'Publier le trajet'}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default CreateTrip;
