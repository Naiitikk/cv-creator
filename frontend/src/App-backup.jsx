import { useState } from 'react';
import CVForm from './components/CVForm';
import CVPreview from './components/CVPreview';

export default function App() {
  const [cvData, setCvData] = useState(null);
  const [showForm, setShowForm] = useState(false);

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
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4ff', fontFamily: 'Arial, sans-serif' }}>
      {!showForm ? (
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h1 style={{ fontSize: '3rem', color: '#0066cc', marginBottom: '1rem' }}>
            FindYourCV
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>
            AI-Powered CV Creator
          </p>
          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: '1rem 2rem',
              fontSize: '1rem',
              background: '#0066cc',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Create Your CV
          </button>
        </div>
      ) : cvData ? (
        <CVPreview cv={cvData} onEdit={() => setShowForm(true)} />
      ) : (
        <CVForm onGenerateCV={handleGenerateCV} onCancel={() => setShowForm(false)} />
      )}
    </div>
  );
}
