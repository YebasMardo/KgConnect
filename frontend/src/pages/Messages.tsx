import React from 'react';
import Navbar from '../components/Navbar';
import './Dashboard.css';

const Messages: React.FC = () => {
  return (
    <div className="dashboard-page">
      <Navbar />
      <main className="container main-content">
        <header className="dashboard-header">
          <h1>Messages</h1>
          <p className="welcome-sub">Discutez avec les membres de la communauté KgConnect.</p>
        </header>

        <section className="card" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="empty-state">
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>💬</div>
            <h3>Votre messagerie est vide</h3>
            <p>Les messages associés à vos trajets et réservations apparaîtront ici.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Messages;
