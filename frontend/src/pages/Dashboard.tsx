import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { tripService } from '../services/trip.service';
import { authService } from '../services/auth.service';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // On essaye de récupérer l'utilisateur et ses trajets
        const userData = await authService.getCurrentUser();
        setUser(userData);
        
        const tripsData = await tripService.getAll();
        // API Platform renvoie les données dans hydra:member
        setTrips(tripsData['hydra:member'] || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        // Si erreur (ex: pas de backend), on vide la liste pour montrer l'état vide
        setTrips([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-page">
      <Navbar />
      
      <main className="container main-content">
        <header className="dashboard-header flex justify-between items-center">
          <div className="welcome-section">
            <h1>Bonjour{user ? `, ${user.firstname}` : ''} 👋</h1>
            <p className="welcome-sub">Bienvenue sur votre tableau de bord KgConnect.</p>
          </div>
          <Link to="/proposer-trajet" className="btn-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Proposer un trajet
          </Link>
        </header>

        <div className="dashboard-grid">
          <div className="main-stats-section flex flex-col gap-8">
            <section className="card shipments-section">
              <div className="flex justify-between items-center mb-6">
                <h2 className="section-title">Mes trajets et envois</h2>
                <button className="link-btn">Voir tout</button>
              </div>

              {loading ? (
                <div className="loading-state">Chargement de vos données...</div>
              ) : trips.length > 0 ? (
                <div className="shipment-list flex flex-col gap-6">
                  {trips.map((trip: any) => (
                    <div key={trip.id} className="shipment-item">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-4">
                          <div className="shipment-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3"></path><path d="M21 12v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6"></path><path d="M3 10h18"></path></svg>
                          </div>
                          <div>
                            <h3>{trip.departureCity} → {trip.arrivalCity}</h3>
                            <span className="id-text">ID: #{trip.id.substring(0, 8)}</span>
                          </div>
                        </div>
                        <span className={`badge ${trip.status === 'active' ? 'badge-transit' : 'badge-pickup'}`}>
                          {trip.status}
                        </span>
                      </div>
                      <div className="location-info flex justify-between mb-2">
                        <span>{trip.departureCountry}</span>
                        <span>{trip.arrivalCountry}</span>
                        <span className="progress-percent">{trip.availableWeight} kg libres</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: '100%' }}></div>
                      </div>
                      <footer className="shipment-footer flex justify-between mt-4">
                        <span className="courier-info">💰 {trip.pricePerKg}€ / kg</span>
                        <span className="arrival-info">📅 {new Date(trip.departureDate).toLocaleDateString()}</span>
                      </footer>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>Vous n'avez pas encore de trajets ou d'envois en cours.</p>
                  <p className="hint">Commencez par proposer un trajet ou réserver un espace de livraison !</p>
                </div>
              )}
            </section>

            <section className="card map-section">
              <h2 className="section-title mb-6">Suivi du réseau</h2>
              <div className="map-placeholder">
                <div className="map-inner">
                   <div className="map-path"></div>
                </div>
                <div className="map-overlay">
                  Connectez-vous au backend pour voir le suivi en direct
                </div>
              </div>
            </section>
          </div>

          <div className="sidebar-section flex flex-col gap-8">
            <div className="flex gap-4">
              <div className="card stat-mini flex-grow">
                <span className="stat-label">Trajets</span>
                <span className="stat-value">{trips.length}</span>
              </div>
              <div className="card stat-mini flex-grow">
                <span className="stat-label">Total Poids</span>
                <span className="stat-value text-green">
                  {trips.reduce((acc, curr) => acc + curr.availableWeight, 0)} kg
                </span>
              </div>
            </div>

            <section className="card activity-section">
              <h2 className="section-title mb-6">Activité récente</h2>
              <div className="activity-list flex flex-col gap-4">
                <div className="empty-state-mini">Aucune activité récente.</div>
              </div>
            </section>

            <section className="card insurance-card">
              <div className="flex gap-4 mb-4">
                <div className="insurance-icon">🛡️</div>
                <h3>Protection Colis</h3>
              </div>
              <p className="mb-6">Tous vos échanges sont sécurisés par notre système de vérification.</p>
              <button className="btn-secondary w-full">En savoir plus</button>
            </section>
          </div>
        </div>

        <footer className="page-footer">
          © {new Date().getFullYear()} KgConnect — Votre réseau de confiance.
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;