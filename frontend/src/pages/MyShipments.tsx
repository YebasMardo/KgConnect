import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { tripService } from '../services/trip.service';
import './Dashboard.css'; // Reuse dashboard styles for consistency

const MyShipments: React.FC = () => {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await tripService.getAll();
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
    <div className="dashboard-page">
      <Navbar />
      <main className="container main-content">
        <header className="dashboard-header">
          <h1>Mes Envois & Trajets</h1>
          <p className="welcome-sub">Gérez vos propositions de transport et vos réservations.</p>
        </header>

        <section className="card">
          <h2 className="section-title mb-6">Liste de vos activités</h2>
          {loading ? (
            <div className="loading-state">Chargement...</div>
          ) : trips.length > 0 ? (
            <div className="shipment-list flex flex-col gap-6">
              {trips.map((trip: any) => (
                <div key={trip.id} className="shipment-item">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4">
                      <div className="shipment-icon">📦</div>
                      <div>
                        <h3>{trip.departureCity} → {trip.arrivalCity}</h3>
                        <span className="id-text">ID: #{trip.id.substring(0, 8)}</span>
                      </div>
                    </div>
                    <span className="badge badge-transit">{trip.status}</span>
                  </div>
                  <div className="location-info flex justify-between">
                    <span>{new Date(trip.departureDate).toLocaleDateString()}</span>
                    <span>{trip.availableWeight} kg disponibles</span>
                    <span className="text-green">{trip.pricePerKg}€ / kg</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">Aucun envoi trouvé.</div>
          )}
        </section>
      </main>
    </div>
  );
};

export default MyShipments;
