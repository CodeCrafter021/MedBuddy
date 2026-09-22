import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    navigate('/dashboard');
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <header>
          <Link className="brand-mark" to="/" aria-label="Back to MedBuddy home">MB</Link>
          <h1>Welcome back</h1>
          <p>Sign in to access your personal MedBuddy workspace.</p>
        </header>
        <form className="form-stack" onSubmit={handleLogin}>
          <div className="field"><label htmlFor="login-identity">Email or phone</label><input id="login-identity" required placeholder="you@example.com" /></div>
          <div className="field"><label htmlFor="login-password">Password</label><input id="login-password" required type="password" placeholder="Enter your password" /></div>
          <button className="button button-primary button-full" type="submit">Sign in to dashboard</button>
        </form>
        <p className="auth-switch">New to MedBuddy? <Link to="/signup">Create an account</Link></p>
        <p className="auth-switch"><Link to="/"><ArrowLeft size={13} style={{ verticalAlign: 'middle' }} /> Back to home</Link></p>
      </section>
    </main>
  );
}
