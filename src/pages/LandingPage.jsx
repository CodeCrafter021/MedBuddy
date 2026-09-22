import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, HeartPulse, ShieldCheck, WifiOff } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const languages = ['English', 'Hindi', 'Bengali', 'Tamil', 'Telugu'];

function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  return (
    <select aria-label="Choose language" className="language-select" value={language} onChange={(event) => setLanguage(event.target.value)}>
      {languages.map((item) => <option key={item}>{item}</option>)}
    </select>
  );
}

export default function LandingPage() {
  return (
    <div className="app-shell">
      <nav className="site-nav">
        <Link className="brand" to="/" aria-label="MedBuddy home"><span className="brand-mark">MB</span><span className="brand-name">MedBuddy</span></Link>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#safety">Safety</a>
          <LanguageSelector />
          <Link className="button button-dark" to="/login">Sign in</Link>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-content">
            <div className="eyebrow"><ShieldCheck size={17} /> Rural and urban health safety</div>
            <h1>Safer medicine. <em>Faster first aid.</em></h1>
            <p className="hero-copy">MedBuddy helps you check medicines without a QR code, follow clear first-aid steps offline, and keep your community informed about local medicine alerts.</p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/signup">Open MedBuddy <ArrowRight size={17} /></Link>
              <a className="button button-ghost" href="#features">See how it works</a>
            </div>
            <p className="hero-note"><WifiOff size={16} /> Core first-aid guidance stays available without internet.</p>
          </div>
        </section>

        <section className="section" id="features">
          <div className="section-heading">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>One calm place in an emergency</div>
            <h2>Three practical tools, built for real conditions.</h2>
            <p>Simple enough for a first-time user, useful when a doctor is far away, and careful about what health guidance can and cannot do.</p>
          </div>
          <div className="feature-grid">
            <article className="feature-card">
              <span className="feature-icon"><ShieldCheck size={22} /></span>
              <h3>Medicine verifier</h3>
              <p>Search by medicine name, check expiry, and get a clear safe, check again, or banned result. No QR code required.</p>
            </article>
            <article className="feature-card">
              <span className="feature-icon"><WifiOff size={22} /></span>
              <h3>Offline first aid</h3>
              <p>Choose a symptom visually and follow short steps for burns, cuts, fever, snake bites, fainting, and chest pain.</p>
            </article>
            <article className="feature-card">
              <span className="feature-icon"><HeartPulse size={22} /></span>
              <h3>Community alerts</h3>
              <p>Report a medicine concern anonymously so people in your city or district can spot patterns earlier.</p>
            </article>
          </div>
        </section>

        <section className="disclaimer" id="safety">
          <p><CheckCircle2 size={14} style={{ verticalAlign: 'middle', marginRight: 7 }} /> MedBuddy is a decision-support tool, not a replacement for a qualified doctor.</p>
        </section>
      </main>
      <footer className="footer">MedBuddy · Built for safer communities and better first response.</footer>
    </div>
  );
}
