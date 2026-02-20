import { useState } from 'react';
import CVForm from './components/CVForm';
import CVPreview from './components/CVPreview';

const BRAND_COLORS = {
  primary: '#0066cc',
  secondary: '#00d4ff',
  dark: '#1a1a2e',
  light: '#f0f4ff',
  accent: '#ff6b6b',
  success: '#06b6d4',
  text: '#2d3748',
};

export default function App() {
  const [cvData, setCvData] = useState(null);
  const [showForm, setShowForm] = useState(false);

  console.log('✅ App component mounted');

  const handleGenerateCV = async (formData) => {
    try {
      const response = await fetch('http://localhost:8000/api/cv/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setCvData(data);
      setShowForm(false);
    } catch (error) {
      console.error('Error generating CV:', error);
      alert('Error generating CV. Check console for details.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: BRAND_COLORS.light, fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 }}>
      {/* Header */}
      <header style={{ background: `linear-gradient(135deg, ${BRAND_COLORS.dark} 0%, ${BRAND_COLORS.primary} 100%)`, color: 'white', padding: '2rem', textAlign: 'center', boxShadow: `0 4px 20px ${BRAND_COLORS.primary}40` }}>
        <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2.5rem', fontWeight: 'bold' }}>
          Find<span style={{ color: BRAND_COLORS.secondary }}>Your</span>CV
        </h1>
        <p style={{ margin: 0, fontSize: '1rem', opacity: 0.9 }}>AI-Powered Professional CV Creator</p>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {!showForm && !cvData ? (
          // Landing Page
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <h2 style={{ fontSize: '2.2rem', color: BRAND_COLORS.dark, marginBottom: '1rem' }}>
              Create Your Professional CV in Minutes
            </h2>
            <p style={{ fontSize: '1.1rem', color: BRAND_COLORS.text, marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Get an AI-powered professional CV with beautiful designs. No experience needed.
            </p>
            <button
              onClick={() => setShowForm(true)}
              style={{
                padding: '1rem 3rem',
                fontSize: '1.1rem',
                background: `linear-gradient(135deg, ${BRAND_COLORS.primary} 0%, ${BRAND_COLORS.secondary} 100%)`,
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 'bold',
                boxShadow: `0 8px 25px ${BRAND_COLORS.primary}40`,
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = `0 12px 35px ${BRAND_COLORS.primary}50`;
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = `0 8px 25px ${BRAND_COLORS.primary}40`;
              }}
            >
              ✨ Create Your CV Now
            </button>

            {/* Features Grid */}
            <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              {[
                { icon: '⚡', title: 'Lightning Fast', desc: 'Create in under 2 minutes' },
                { icon: '🤖', title: 'AI-Powered', desc: 'Professional content generated' },
                { icon: '📥', title: 'Instant Download', desc: 'Get PDF immediately' }
              ].map((f, i) => (
                <div key={i} style={{ padding: '2rem', background: 'white', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{f.icon}</div>
                  <h3 style={{ fontSize: '1.1rem', color: BRAND_COLORS.primary, marginBottom: '0.5rem' }}>{f.title}</h3>
                  <p style={{ color: BRAND_COLORS.text, margin: 0, fontSize: '0.95rem' }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ) : cvData ? (
          // CV Preview
          <div>
            <button
              onClick={() => setCvData(null)}
              style={{
                marginBottom: '2rem',
                padding: '0.7rem 1.5rem',
                background: BRAND_COLORS.light,
                border: `2px solid ${BRAND_COLORS.primary}`,
                color: BRAND_COLORS.primary,
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              ← Back to Home
            </button>
            <CVPreview cv={cvData} onEdit={() => setCvData(null)} />
          </div>
        ) : (
          // Form
          <div>
            <button
              onClick={() => setShowForm(false)}
              style={{
                marginBottom: '2rem',
                padding: '0.7rem 1.5rem',
                background: BRAND_COLORS.light,
                border: `2px solid ${BRAND_COLORS.primary}`,
                color: BRAND_COLORS.primary,
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              ← Back
            </button>
            <CVForm onGenerateCV={handleGenerateCV} onCancel={() => setShowForm(false)} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ background: BRAND_COLORS.dark, color: 'white', padding: '2rem', textAlign: 'center', marginTop: '4rem', borderTop: `2px solid ${BRAND_COLORS.primary}20` }}>
        <p style={{ margin: 0, opacity: 0.8 }}>© 2026 FindYourCV. Free CV Builder Powered by AI.</p>
      </footer>
    </div>
  );
}
