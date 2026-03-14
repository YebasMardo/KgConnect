import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Landing.css';

const Landing = () => {
    
  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="landing-container">
      <Navbar />
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
        
          <h1>Envoyez vos colis facilement grâce aux voyageurs.</h1>
          <p className="hero-subtitle">
            Une solution collaborative qui connecte les personnes qui envoient des colis avec celles qui voyagent sur le même trajet.
          </p>
          <div className="hero-cta-group">
            <Link to="/proposer-trajet" className="btn btn-primary">
              <i className="fa-solid fa-box-open"></i> Publier un colis
            </Link>
            <Link to="/connexion" className="btn btn-secondary">
              <i className="fa-solid fa-route"></i> Trouver un trajet
            </Link>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <strong>10 000+</strong>
              <span>Colis envoyés</span>
            </div>
            <div className="stat-separator"></div>
            <div className="stat-item">
              <strong>3 500+</strong>
              <span>Trajets</span>
            </div>
            <div className="stat-separator"></div>
            <div className="stat-item">
              <strong>2 000+</strong>
              <span>Utilisateurs</span>
            </div>
          </div>
        </div>
        
        <div className="hero-illustration">
            <div className="glass-mockup">
                <div className="mockup-header">
                   <div className="mockup-dots">
                      <span></span><span></span><span></span>
                   </div>
                </div>
                <div className="mockup-body">
                   <div className="trip-card-mockup">
                      <div className="trip-locations">
                         <div className="location">
                            <i className="fa-solid fa-location-dot gradient-text"></i> Casablanca
                         </div>
                         <div className="trip-line"></div>
                         <div className="location">
                            <i className="fa-solid fa-map-pin"></i> Rabat
                         </div>
                      </div>
                      <div className="trip-meta">
                         <span className="date">Aujourd'hui, 18:00</span>
                         <span className="price">À partir de 50 DH</span>
                      </div>
                   </div>
                   <div className="trip-card-mockup delay-1">
                      <div className="trip-locations">
                         <div className="location">
                            <i className="fa-solid fa-location-dot gradient-text"></i> Paris
                         </div>
                         <div className="trip-line"></div>
                         <div className="location">
                            <i className="fa-solid fa-map-pin"></i> Casablanca
                         </div>
                      </div>
                      <div className="trip-meta">
                         <span className="date">Demain, 14:30</span>
                         <span className="price">À partir de 150 DH / kg</span>
                      </div>
                   </div>
                </div>
            </div>
            <div className="hero-blob"></div>
        </div>
      </section>

      {/* 2. Comment ça marche */}
      <section className="how-it-works animate-on-scroll">
        <div className="section-header">
          <h2>Comment ça marche ?</h2>
          <p>L'envoi de colis n'a jamais été aussi simple, en 3 étapes rapides.</p>
        </div>
        
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-icon">
              <i className="fa-solid fa-box"></i>
            </div>
            <h3>Publiez votre colis</h3>
            <p>Indiquez le point de départ, la destination et les détails du colis à envoyer.</p>
          </div>
          
          <div className="step-connector"><i className="fa-solid fa-chevron-right"></i></div>
          
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-icon">
              <i className="fa-solid fa-magnifying-glass-location"></i>
            </div>
            <h3>Trouvez un voyageur</h3>
            <p>Parcourez les trajets proposés par des voyageurs qui passent par votre destination.</p>
          </div>
          
          <div className="step-connector"><i className="fa-solid fa-chevron-right"></i></div>
          
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-icon">
              <i className="fa-solid fa-handshake"></i>
            </div>
            <h3>Envoyez votre colis</h3>
            <p>Choisissez un transporteur, échangez via la messagerie et finalisez la livraison.</p>
          </div>
        </div>
      </section>

      {/* 3. Présentation rapide du projet */}
      <section className="about-project animate-on-scroll">
        <div className="about-grid">
          <div className="about-image-wrapper">
             <div className="image-decoration"></div>
             <img src="https://images.unsplash.com/photo-1551522435-a13afa10f103?auto=format&fit=crop&q=80&w=800" alt="Personnes qui s'échangent un colis" className="about-image" />
          </div>
          <div className="about-text">
            <h2>Une nouvelle manière d'envoyer des colis</h2>
            <p>
              Notre plateforme met en relation des particuliers qui souhaitent envoyer des colis avec des voyageurs ayant de l'espace disponible dans leurs bagages ou leur véhicule.
            </p>
            <p>
              Cette approche collaborative permet de réduire les coûts, optimiser les trajets et simplifier la logistique du transport entre particuliers. Finies les longues attentes et les tarifs exorbitants !
            </p>
            <ul className="feature-list">
              <li><i className="fa-solid fa-circle-check"></i> Moins de frais d'envoi</li>
              <li><i className="fa-solid fa-circle-check"></i> Moins d'émissions de CO2</li>
              <li><i className="fa-solid fa-circle-check"></i> Plus de flexibilité</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Exemples de trajets disponibles */}
      <section className="popular-routes animate-on-scroll">
        <div className="section-header">
          <h2>Trajets disponibles</h2>
          <p>Découvrez les itinéraires les plus populaires sur notre plateforme</p>
        </div>
        
        <div className="routes-grid">
          {[
            { from: 'Casablanca', to: 'Rabat', date: 'Aujourd\'hui', capacity: '10 kg disponibles', icon: 'fa-car' },
            { from: 'Marrakech', to: 'Tanger', date: 'Demain', capacity: '15 kg disponibles', icon: 'fa-car' },
            { from: 'Paris', to: 'Casablanca', date: 'Le 24 Octobre', capacity: '5 kg disponibles', icon: 'fa-plane' },
            { from: 'Agadir', to: 'Marrakech', date: 'Le 25 Octobre', capacity: '20 kg disponibles', icon: 'fa-van-shuttle' }
          ].map((route, idx) => (
            <div className="route-card" key={idx}>
              <div className="route-icon"><i className={`fa-solid ${route.icon}`}></i></div>
              <div className="route-details">
                <div className="route-path">
                  <span className="city">{route.from}</span>
                  <i className="fa-solid fa-arrow-right-long"></i>
                  <span className="city">{route.to}</span>
                </div>
                <div className="route-info">
                  <span className="route-date"><i className="fa-regular fa-calendar"></i> {route.date}</span>
                  <span className="route-capacity"><i className="fa-solid fa-weight-hanging"></i> {route.capacity}</span>
                </div>
              </div>
              <button className="btn-icon"><i className="fa-solid fa-chevron-right"></i></button>
            </div>
          ))}
        </div>
        
        <div className="center-action">
          <Link to="/connexion" className="btn btn-outline-primary">Voir tous les trajets</Link>
        </div>
      </section>

      {/* 5. Les avantages */}
      <section className="benefits-section animate-on-scroll">
        <div className="section-header">
          <h2>Pourquoi choisir KgConnect ?</h2>
          <p>Nous redéfinissons la manière de faire transporter vos biens.</p>
        </div>
        
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon fast"><i className="fa-solid fa-bolt"></i></div>
            <h3>Rapide</h3>
            <p>Trouvez un trajet disponible en quelques secondes et envoyez vos biens le jour même.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon cheap"><i className="fa-solid fa-wallet"></i></div>
            <h3>Économique</h3>
            <p>Envoyer un colis coûte souvent beaucoup moins cher qu'un service de livraison classique.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon eco"><i className="fa-solid fa-leaf"></i></div>
            <h3>Écologique</h3>
            <p>Optimisation des trajets déjà existants pour réduire notre empreinte carbone collective.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon comm"><i className="fa-solid fa-users"></i></div>
            <h3>Communautaire</h3>
            <p>Rejoignez un réseau de particuliers fiables, basés sur l'entraide et le partage.</p>
          </div>
        </div>
      </section>

      {/* 6. Foncionalités + 7. Confiance/Sécurité */}
      <section className="features-security animate-on-scroll">
        <div className="fs-grid">
          <div className="fs-card features-pane">
            <h3>Fonctionnalités Principales</h3>
            <ul className="fs-list">
              <li>
                <div className="fs-icon"><i className="fa-solid fa-pen-to-square"></i></div>
                <div className="fs-text"> Publication de colis simplifiée</div>
              </li>
               <li>
                <div className="fs-icon"><i className="fa-solid fa-magnifying-glass"></i></div>
                <div className="fs-text"> Recherche intelligente de trajets</div>
              </li>
               <li>
                <div className="fs-icon"><i className="fa-solid fa-comments"></i></div>
                <div className="fs-text"> Messagerie intégrée entre utilisateurs</div>
              </li>
               <li>
                <div className="fs-icon"><i className="fa-solid fa-map-location-dot"></i></div>
                <div className="fs-text"> Suivi des livraisons en temps réel</div>
              </li>
            </ul>
          </div>
          
          <div className="fs-card security-pane">
            <h3>Confiance et Sécurité</h3>
            <div className="shield-icon-large">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <ul className="fs-list secure">
              <li>
                <div className="fs-icon check"><i className="fa-solid fa-id-card"></i></div>
                <div className="fs-text"> Profils vérifiés avec pièce d'identité</div>
              </li>
               <li>
                <div className="fs-icon check"><i className="fa-solid fa-star"></i></div>
                <div className="fs-text"> Système d'avis complet et transparent</div>
              </li>
               <li>
                <div className="fs-icon check"><i className="fa-solid fa-credit-card"></i></div>
                <div className="fs-text"> Paiement sécurisé via la plateforme</div>
              </li>
               <li>
                <div className="fs-icon check"><i className="fa-solid fa-headset"></i></div>
                <div className="fs-text"> Support utilisateur réactif 7j/7</div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Bonus : Testimonials */}
      <section className="testimonials animate-on-scroll">
        <div className="section-header">
          <h2>Ce que disent nos utilisateurs</h2>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="stars">
              <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
            </div>
            <p className="testimonial-text">"J'ai pu envoyer des documents urgents de Casa à Rabat en 2 heures. Moins cher et plus rapide que n'importe quelle agence !"</p>
            <div className="testimonial-author">
              <div className="author-avatar">Y</div>
              <div className="author-info">
                <strong>Youssef B.</strong>
                <span>Expéditeur régulier</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="stars">
              <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star-half-stroke"></i>
            </div>
            <p className="testimonial-text">"Je fais souvent le trajet Paris-Marrakech. Grâce à KgConnect, je rentabilise mon billet en transportant des colis dans ma franchise bagage."</p>
            <div className="testimonial-author">
              <div className="author-avatar bg-purple">S</div>
              <div className="author-info">
                <strong>Sara M.</strong>
                <span>Voyageuse</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="stars">
              <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
            </div>
            <p className="testimonial-text">"L'interface est super fluide et l'application donne confiance avec les profils vérifiés. Je recommande à 100%."</p>
            <div className="testimonial-author">
              <div className="author-avatar bg-orange">K</div>
              <div className="author-info">
                <strong>Karim A.</strong>
                <span>Utilisateur vérifié</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Bottom CTA */}
      <section className="cta-section animate-on-scroll">
        <div className="cta-container">
          <div className="cta-bg-shape"></div>
          <h2>Commencez à envoyer vos colis dès aujourd'hui</h2>
          <p>Rejoignez des milliers d'utilisateurs qui ont déjà repensé leur logistique.</p>
          <div className="hero-cta-group justify-center">
            <Link to="/connexion" className="btn btn-primary btn-large">
              <i className="fa-solid fa-box"></i> Publier un colis
            </Link>
            <Link to="/proposer-trajet" className="btn btn-light btn-large">
              <i className="fa-solid fa-car"></i> Proposer un trajet
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3><i className="fa-solid fa-cube text-primary"></i> KgConnect</h3>
            <p>La solution collaborative pour l'envoi de colis entre particuliers. Rapide, économique et sécurisé.</p>
            <div className="social-links">
              <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#"><i className="fa-brands fa-instagram"></i></a>
              <a href="#"><i className="fa-brands fa-twitter"></i></a>
              <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="link-group">
              <h4>Plateforme</h4>
              <ul>
                <li><Link to="/connexion">Comment ça marche</Link></li>
                <li><Link to="/connexion">Trouver un trajet</Link></li>
                <li><Link to="/connexion">Publier un colis</Link></li>
                <li><Link to="/connexion">Trust & Sécurité</Link></li>
              </ul>
            </div>
            <div className="link-group">
              <h4>Entreprise</h4>
              <ul>
                <li><a href="#">À propos</a></li>
                <li><a href="#">Carrières</a></li>
                <li><a href="#">Presse</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
             <div className="link-group">
              <h4>Légal</h4>
              <ul>
                <li><a href="#">CGU</a></li>
                <li><a href="#">Politique de confidentialité</a></li>
                <li><a href="#">Cookies</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} KgConnect. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
