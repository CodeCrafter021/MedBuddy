import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const languages = ['English', 'Hindi', 'Bengali', 'Tamil', 'Telugu'];

export default function SignupPage() {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  const handleSignup = (event) => {
    event.preventDefault();
    navigate('/dashboard');
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="top-language">
          <select aria-label="Choose language" className="language-select" value={language} onChange={(event) => setLanguage(event.target.value)}>
            {languages.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
        <header>
          <Link className="brand-mark" to="/" aria-label="Back to MedBuddy home">MB</Link>
          <h1>Create your account</h1>
          <p>Get a safer, simpler way to handle everyday health moments.</p>
        </header>
        <form className="form-stack" onSubmit={handleSignup}>
          <div className="field"><label htmlFor="signup-name">Full name</label><input id="signup-name" required placeholder="Your full name" /></div>
          <div className="field"><label htmlFor="signup-identity">Email or phone</label><input id="signup-identity" required placeholder="you@example.com" /></div>
          <div className="field"><label htmlFor="signup-password">Create password</label><input id="signup-password" required minLength="6" type="password" placeholder="At least 6 characters" /></div>
          <button className="button button-primary button-full" type="submit">Create account</button>
        </form>
        <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
        <p className="auth-switch"><Link to="/"><ArrowLeft size={13} style={{ verticalAlign: 'middle' }} /> Back to home</Link></p>
      </section>
    </main>
  );
}
