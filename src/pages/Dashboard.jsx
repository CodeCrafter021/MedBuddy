import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, CheckCircle2, FileText, HeartPulse, Home, LockKeyhole, Search, ShieldAlert, ShieldCheck, Stethoscope, UserRound, Users, WifiOff, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const languages = ['English', 'Hindi', 'Bengali', 'Tamil', 'Telugu'];
const medicines = {
  paracetamol: { name: 'Paracetamol', state: 'safe', title: 'Safe to review', message: 'This medicine is in the demo CDSCO-approved list. Always check the pack, dosage, and expiry date.' },
  'dolo 650': { name: 'Dolo 650', state: 'safe', title: 'Safe to review', message: 'This medicine is recognised in the demo approved list. Verify the expiry date on your pack before use.' },
  amoxicillin: { name: 'Amoxicillin 500 mg', state: 'warning', title: 'Check again', message: 'A prescription medicine. Confirm the manufacturer, prescription, and expiry date with a pharmacist or doctor.' },
  nimesulide: { name: 'Nimesulide', state: 'danger', title: 'Banned / restricted match', message: 'This name matches a restricted medicine record in the demo database. Do not take it without professional advice.' },
};
const scenarios = [
  { id: 'burn', emoji: '🔥', name: 'Burn', steps: ['Cool the burn under clean running water for 20 minutes.', 'Remove rings or tight items before swelling starts.', 'Cover loosely with a clean, non-stick dressing.'], doctor: 'Seek urgent help for a large, deep, electrical, chemical, or facial burn.' },
  { id: 'cut', emoji: '🩹', name: 'Cut', steps: ['Wash your hands and apply gentle pressure with clean cloth.', 'Rinse the wound with clean running water.', 'Cover with a sterile dressing once bleeding stops.'], doctor: 'Get medical help if bleeding does not stop, the wound is deep, or a tetanus shot may be needed.' },
  { id: 'fever', emoji: '🌡️', name: 'Fever', steps: ['Rest and drink small amounts of water frequently.', 'Keep clothing light and check temperature regularly.', 'Do not give aspirin to children without medical advice.'], doctor: 'Seek help for breathing trouble, confusion, dehydration, or fever in a baby under three months.' },
  { id: 'snake', emoji: '🐍', name: 'Snake bite', steps: ['Move away from the snake and keep the person still and calm.', 'Keep the bitten limb below heart level if possible.', 'Call emergency services and note the snake appearance from a safe distance.'], doctor: 'This is an emergency. Do not cut, suck, ice, or apply a tight tourniquet to the bite.' },
  { id: 'faint', emoji: '💫', name: 'Fainting', steps: ['Lay the person on their back and raise their legs.', 'Loosen tight clothing and check for normal breathing.', 'Turn them on their side if they are vomiting or unconscious.'], doctor: 'Call emergency services if they do not wake quickly, have chest pain, or are injured.' },
  { id: 'chest', emoji: '🫀', name: 'Chest pain', steps: ['Stop activity and help the person sit in a comfortable position.', 'Call emergency services immediately if pain is severe or persistent.', 'Stay with them and follow the dispatcher instructions.'], doctor: 'Treat new, severe, or spreading chest pain as an emergency. Do not drive yourself.' },
];

function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  return <select aria-label="Choose language" className="language-select" value={language} onChange={(event) => setLanguage(event.target.value)}>{languages.map((item) => <option key={item}>{item}</option>)}</select>;
}

function VerifyMedicine() {
  const [query, setQuery] = useState('');
  const [expiry, setExpiry] = useState('');
  const [result, setResult] = useState(null);
  const checkMedicine = (event) => {
    event.preventDefault();
    const dateExpired = expiry && new Date(`${expiry}-01`) < new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const match = medicines[query.trim().toLowerCase()];
    setResult(dateExpired ? { state: 'danger', title: 'Expired medicine', message: 'The expiry date entered is in the past. Do not use this medicine; ask a pharmacist for safe disposal.' } : match || { state: 'warning', title: 'Check again', message: 'We could not find an exact demo match. Check the spelling, manufacturer, and pack details with a pharmacist.' });
  };
  return <section className="panel"><div className="panel-heading"><div><h2>Medicine name verifier</h2><p className="muted">No QR code needed. This demo uses a local approved-medicine sample.</p></div><ShieldCheck color="var(--teal)" /></div><form onSubmit={checkMedicine}><div className="form-row"><div className="search-wrap"><label htmlFor="medicine-name">Medicine name</label><input id="medicine-name" className="search-input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Paracetamol or Dolo 650" required /></div><button className="button button-primary" type="submit"><Search size={16} /> Check medicine</button></div><div className="field" style={{ marginTop: 14, maxWidth: 230 }}><label htmlFor="expiry-date">Expiry date (optional)</label><input id="expiry-date" type="month" value={expiry} onChange={(event) => setExpiry(event.target.value)} /></div></form>{result && <div className={`result ${result.state}`}><h3>{result.title}</h3><p>{result.name ? `${result.name}: ` : ''}{result.message}</p></div>}</section>;
}

function FirstAid() {
  const [selected, setSelected] = useState(scenarios[0]);
  return <section className="panel"><div className="panel-heading"><div><h2>Offline first-aid guide</h2><p className="muted">These core steps are available from the app cache without internet.</p></div><WifiOff color="var(--teal)" /></div><div className="scenario-grid">{scenarios.map((scenario) => <button className={`scenario-button ${selected.id === scenario.id ? 'selected' : ''}`} key={scenario.id} onClick={() => setSelected(scenario)}><span className="scenario-emoji">{scenario.emoji}</span><span>{scenario.name}</span></button>)}</div><div className="panel" style={{ background: '#f7faf8', marginTop: 18 }}><h3 style={{ marginTop: 0 }}>{selected.emoji} {selected.name}: first steps</h3><ol className="aid-steps">{selected.steps.map((step) => <li key={step}>{step}</li>)}</ol><div className="doctor-alert"><strong>When to get help:</strong> {selected.doctor}</div></div></section>;
}

function CommunityAlerts({ onReport }) {
  return <section className="panel"><div className="panel-heading"><div><h2>Community medicine alerts</h2><p className="muted">Recent anonymous reports from your selected area.</p></div><button className="button button-danger" onClick={onReport}><ShieldAlert size={16} /> Report concern</button></div><div className="alert-list"><article className="alert-item"><ShieldAlert color="var(--coral)" size={19} /><div><h3>Counterfeit packaging reported</h3><p>Dolo 650 · Central district · 2 reports in the last 7 days</p></div></article><article className="alert-item"><ShieldAlert color="var(--coral)" size={19} /><div><h3>Unexpected reaction reported</h3><p>Amoxicillin 500 mg · North district · 1 report in the last 30 days</p></div></article></div></section>;
}

function Settings() {
  const [saved, setSaved] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const saveSettings = (event) => {
    event.preventDefault();
    setSaved(true);
  };
  return <section className="settings-layout">
    <div className="settings-intro"><span className="settings-icon"><UserRound size={22} /></span><div><h2>Account settings</h2><p>Manage your profile, account security, and privacy preferences.</p></div></div>
    <form className="settings-form" onSubmit={saveSettings}>
      <div className="settings-section"><div className="settings-section-title"><UserRound size={18} /><div><h3>Profile</h3><p>Your basic account information</p></div></div><div className="settings-fields"><div className="field"><label htmlFor="profile-name">Full name</label><input id="profile-name" defaultValue="Account holder" /></div><div className="field"><label htmlFor="profile-contact">Email or phone</label><input id="profile-contact" defaultValue="user@medbuddy.com" /></div><div className="field"><label htmlFor="profile-area">City or district</label><input id="profile-area" placeholder="Your area for local alerts" /></div></div></div>
      <div className="settings-section"><div className="settings-section-title"><LockKeyhole size={18} /><div><h3>Security</h3><p>Protect access to your MedBuddy account</p></div></div><div className="security-row"><div><strong>Two-step verification</strong><span>Require an extra verification step when signing in.</span></div><button type="button" className={`toggle ${twoFactor ? 'on' : ''}`} aria-pressed={twoFactor} onClick={() => setTwoFactor(!twoFactor)}><span /></button></div><div className="security-row"><div><strong>Password</strong><span>Last changed 30 days ago.</span></div><button type="button" className="button button-ghost small-button">Change password</button></div></div>
      <div className="settings-section"><div className="settings-section-title"><Bell size={18} /><div><h3>Notifications and privacy</h3><p>Choose how MedBuddy keeps you informed</p></div></div><label className="check-row"><input type="checkbox" defaultChecked /> <span>Send local medicine safety alerts</span></label><label className="check-row"><input type="checkbox" defaultChecked /> <span>Keep reports anonymous by default</span></label><p className="settings-note">MedBuddy does not store personal details with community medicine reports.</p></div>
      <div className="settings-actions"><button className="button button-primary" type="submit">Save settings</button>{saved && <span className="saved-message"><CheckCircle2 size={15} /> Settings saved</span>}</div>
    </form>
  </section>;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [notifications, setNotifications] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportSent, setReportSent] = useState(false);
  const navigation = [{ name: 'Overview', icon: Home }, { name: 'Verify medicine', icon: Search }, { name: 'First aid guide', icon: Stethoscope }, { name: 'Community alerts', icon: Users }, { name: 'Offline data', icon: FileText }, { name: 'Settings', icon: LockKeyhole }];
  const title = activeTab === 'Overview' ? 'Good to see you' : activeTab;
  const showReport = () => { setReportSent(false); setReportOpen(true); };
  const submitReport = (event) => { event.preventDefault(); setReportSent(true); };
  return <div className="dashboard-layout">
    <aside className="sidebar"><Link className="brand" to="/"><span className="brand-mark">MB</span><span className="brand-name">MedBuddy</span></Link><div className="sidebar-label">Workspace</div><nav className="dashboard-nav">{navigation.map(({ name, icon: Icon }) => <button className={activeTab === name ? 'active' : ''} key={name} onClick={() => setActiveTab(name)}><Icon size={18} /><span className="nav-label">{name}</span></button>)}</nav><div className="profile"><span className="avatar">A</span><div className="profile-copy"><strong>Account holder</strong><span>user@medbuddy.com</span><Link to="/">Log out</Link></div></div></aside>
    <div className="dashboard-main"><header className="dashboard-header"><div className="breadcrumb">MedBuddy <span>/</span> <strong>{activeTab}</strong></div><div className="header-actions"><LanguageSelector /><div className="notification-wrap"><button className="icon-button" aria-label="Show notifications" onClick={() => setNotifications(!notifications)}><Bell size={18} /><span className="notification-dot" /></button>{notifications && <div className="notification-panel"><strong>Notifications</strong><p>Local alert: counterfeit Dolo 650 reported in Central district.</p><p>Offline first-aid content is ready on this device.</p></div>}</div></div></header>
      <main className="dashboard-content"><div className="page-title"><div><h1>{title}</h1><p>{activeTab === 'Overview' ? 'Your health-safety toolkit, ready when you need it.' : 'Clear guidance and practical next steps.'}</p></div><span className="status-pill"><span className="status-dot" /> Offline content ready</span></div>
        {activeTab === 'Overview' && <><div className="dashboard-grid"><button className="dashboard-card" onClick={() => setActiveTab('Verify medicine')}><span className="card-icon"><ShieldCheck size={20} /></span><h2>Verify a medicine</h2><p>Search approved sample records and check expiry without a QR code.</p></button><button className="dashboard-card" onClick={() => setActiveTab('First aid guide')}><span className="card-icon"><HeartPulse size={20} /></span><h2>Get first aid</h2><p>Choose a symptom and follow short, offline-ready emergency steps.</p></button><button className="dashboard-card" onClick={() => setActiveTab('Community alerts')}><span className="card-icon"><Users size={20} /></span><h2>See local alerts</h2><p>Review anonymous medicine concerns from your area.</p></button></div><section className="panel"><div className="panel-heading"><h2>Recent activity</h2><span className="muted">Today</span></div><div className="activity-list"><div className="activity-item"><span className="activity-badge badge-safe"><CheckCircle2 size={13} /> Verified</span><span className="muted">Paracetamol · 10:45</span></div><div className="activity-item"><span className="activity-badge badge-alert"><ShieldAlert size={13} /> Alert</span><span className="muted">Dolo 650 concern added · 09:20</span></div></div></section></>}
        {activeTab === 'Verify medicine' && <VerifyMedicine />}
        {activeTab === 'First aid guide' && <FirstAid />}
        {activeTab === 'Community alerts' && <CommunityAlerts onReport={showReport} />}
        {activeTab === 'Offline data' && <section className="panel"><div className="panel-heading"><div><h2>Offline data</h2><p className="muted">The content below is stored on this device for quick access.</p></div><WifiOff color="var(--teal)" /></div><div className="result safe"><h3>Available offline</h3><p>Six first-aid scenarios, medicine search samples, and the emergency guidance disclaimer are ready without an internet connection.</p></div></section>}
        {activeTab === 'Settings' && <Settings />}
      </main>
    </div>
    {reportOpen && <div className="modal-backdrop" role="presentation"><section className="modal" role="dialog" aria-modal="true" aria-labelledby="report-title"><div className="modal-heading"><div><h2 id="report-title">Report a medicine concern</h2><p>No name, phone number, or personal details are collected.</p></div><button className="close-button" aria-label="Close report form" onClick={() => setReportOpen(false)}><X /></button></div>{reportSent ? <div className="result safe"><h3>Report received</h3><p>Thank you. Your anonymous report will help your community spot medicine safety patterns.</p><button className="button button-primary" style={{ marginTop: 14 }} onClick={() => setReportOpen(false)}>Done</button></div> : <form className="form-stack" onSubmit={submitReport}><div className="field"><label htmlFor="report-medicine">Medicine name</label><input id="report-medicine" required placeholder="Enter the name on the pack" /></div><div className="field"><label htmlFor="report-type">Concern type</label><select id="report-type" required defaultValue=""><option value="" disabled>Select a concern</option><option>Unexpected reaction</option><option>Suspicious packaging</option><option>Expired medicine</option><option>Other</option></select></div><div className="field"><label htmlFor="report-area">City or district</label><input id="report-area" required placeholder="For example, Pune district" /></div><button className="button button-danger button-full" type="submit">Submit anonymous report</button></form>}</section></div>}
  </div>;
}
