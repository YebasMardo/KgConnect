import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { tripService } from '../services/trip.service';
import './Dashboard.css';

const MyShipments: React.FC = () => {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'trajets' | 'reservations'>('trajets');

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const data = await tripService.getAll();
        // Filtrer ou organiser si nécessaire. Pour l'instant, on suppose que tout est récupéré.
        setTrips(data['hydra:member'] || []);
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  return (
    <div className="dashboard-page flex flex-col min-h-screen bg-[#fafafa]">
      <Navbar />
      <main className="container main-content flex-grow">
        <header className="dashboard-header">
          <h1>Mes Envois & Trajets</h1>
          <p className="welcome-sub">Gérez vos propositions de transport et surveillez l'avancée de vos colis.</p>
        </header>

        <div className="flex gap-4 mb-6 border-b border-gray-200" style={{ borderColor: 'var(--border)' }}>
          <button 
            className={`pb-4 px-2 font-semibold text-lg transition-colors ${activeTab === 'trajets' ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]' : 'text-gray-500 hover:text-gray-700'}`}
            style={activeTab === 'trajets' ? { color: 'var(--primary)', borderBottom: '2px solid var(--primary)' } : { color: 'var(--text-muted)' }}
            onClick={() => setActiveTab('trajets')}
          >
            Mes annonces de trajets
          </button>
          <button 
            className={`pb-4 px-2 font-semibold text-lg transition-colors ${activeTab === 'reservations' ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]' : 'text-gray-500 hover:text-gray-700'}`}
            style={activeTab === 'reservations' ? { color: 'var(--primary)', borderBottom: '2px solid var(--primary)' } : { color: 'var(--text-muted)' }}
            onClick={() => setActiveTab('reservations')}
          >
            Mes réservations (colis)
          </button>
        </div>

        <section className="card p-6 rounded-2xl shadow-sm border border-gray-100" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="section-title text-xl font-bold">
              {activeTab === 'trajets' ? 'Trajets publiés' : 'Réservations en cours'}
            </h2>
            <div className="flex gap-2">
              <span className="text-sm px-3 py-1 bg-gray-100 rounded-full text-gray-600" style={{ background: 'var(--bg-subtle)' }}>Tout</span>
              <span className="text-sm px-3 py-1 rounded-full cursor-pointer hover:bg-gray-100" style={{ color: 'var(--text-muted)' }}>En cours</span>
              <span className="text-sm px-3 py-1 rounded-full cursor-pointer hover:bg-gray-100" style={{ color: 'var(--text-muted)' }}>Terminés</span>
            </div>
          </div>

          {loading ? (
            <div className="loading-state flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: 'var(--primary)' }}></div>
              <span className="ml-3 mt-1" style={{ color: 'var(--text-muted)' }}>Chargement en cours...</span>
            </div>
          ) : trips.length > 0 && activeTab === 'trajets' ? (
            <div className="shipment-list flex flex-col gap-6">
              {trips.map((trip: any) => (
                <div key={trip.id} className="shipment-item card hover:shadow-md transition-shadow p-5 border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4">
                      <div className="shipment-icon flex items-center justify-center bg-[rgba(91,194,166,0.1)] text-[var(--primary)] w-12 h-12 rounded-xl">
                        <i className="fa-solid fa-car text-xl"></i>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{trip.departureCity} <i className="fa-solid fa-arrow-right text-xs mx-1 text-gray-400"></i> {trip.arrivalCity}</h3>
                        <span className="id-text text-xs text-gray-500">Trajet #{trip.id.substring(0, 8)}</span>
                      </div>
                    </div>
                    <span className="badge px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}>
                      {trip.status === 'active' ? 'Planifié' : trip.status}
                    </span>
                  </div>
                  <div className="location-info grid grid-cols-3 gap-4 bg-gray-50 rounded-lg p-3 mt-4" style={{ background: 'var(--bg-subtle)' }}>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">Date de départ</span>
                      <span className="font-medium text-gray-800"><i className="fa-regular fa-calendar mr-2"></i>{new Date(trip.departureDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">Espace</span>
                      <span className="font-medium text-gray-800"><i className="fa-solid fa-weight-hanging mr-2"></i>{trip.availableWeight} kg dispo.</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">Tarif</span>
                      <span className="font-medium" style={{ color: 'var(--primary-dark)' }}><i className="fa-solid fa-tag mr-2"></i>{trip.pricePerKg}€ / kg</span>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                    <button className="text-sm px-4 py-2 text-gray-600 hover:text-gray-900 font-medium">Modifier</button>
                    <button className="text-sm px-4 py-2 bg-[var(--primary)] text-white rounded-lg font-medium hover:opacity-90 transition-opacity">Consulter factures</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state py-16 text-center">
              <div className="text-6xl mb-4 opacity-50">📂</div>
              <h3 className="text-xl font-bold mb-2">Aucun élément trouvé</h3>
              <p className="text-gray-500 mb-6">Vous n'avez pas encore de {activeTab === 'trajets' ? "trajets publiés" : "réservations en cours"}.</p>
              <button className="btn-primary inline-flex">
                <i className={`fa-solid ${activeTab === 'trajets' ? 'fa-car' : 'fa-box'} mr-2`}></i>
                {activeTab === 'trajets' ? "Proposer un trajet" : "Trouver un trajet"}
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default MyShipments;
