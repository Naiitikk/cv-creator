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

// Feature Card Component
function FeatureCard({ icon, title, description }) {
  return (
    <div style={{
      background: 'white',
      padding: '2rem',
      borderRadius: '12px',
      textAlign: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,102,204,0.2)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{icon}</div>
      <h3 style={{ margin: '0.5rem 0', fontSize: '1.2rem', fontWeight: 'bold', color: BRAND_COLORS.dark }}>{title}</h3>
      <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.95rem', color: '#666', lineHeight: '1.6' }}>{description}</p>
    </div>
  );
}

// Step Card Component
function StepCard({ icon, title, description }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ 
        fontSize: '2.5rem', 
        marginBottom: '1rem',
        background: 'white',
        width: '80px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1rem auto',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}>
        {icon}
      </div>
      <h3 style={{ margin: '0.5rem 0', fontSize: '1.1rem', fontWeight: 'bold', color: BRAND_COLORS.dark }}>{title}</h3>
      <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.95rem', color: '#666', lineHeight: '1.6' }}>{description}</p>
    </div>
  );
}

// FAQ Item Component
function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div style={{
      borderBottom: '1px solid #e0e0e0',
      padding: '1.5rem 0',
      cursor: 'pointer',
    }} onClick={onToggle}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        userSelect: 'none',
      }}>
        <h4 style={{
          margin: 0,
          fontSize: '1rem',
          fontWeight: isOpen ? 'bold' : 'normal',
          color: BRAND_COLORS.dark,
        }}>
          {question}
        </h4>
        <span style={{
          fontSize: '1.5rem',
          color: BRAND_COLORS.primary,
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease',
        }}>
          ▼
        </span>
      </div>
      {isOpen && (
        <p style={{
          margin: '1rem 0 0 0',
          fontSize: '0.95rem',
          color: '#666',
          lineHeight: '1.6',
        }}>
          {answer}
        </p>
      )}
    </div>
  );
}

export default function App() {
  const [cvData, setCvData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  console.log('✅ App component mounted');

  const handleGenerateCV = async (formData) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_URL}/api/cv/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success && data.cv) {
        // Merge the form data (which includes location, profilePicture, cvTheme) with the generated CV content
        const cvDataMerged = {
          ...formData,
          ...data.cv,
        };
        setCvData(cvDataMerged);
        setShowForm(false);
      } else {
        alert('Error: Invalid response from server');
      }
    } catch (error) {
      console.error('Error generating CV:', error);
      alert('Error generating CV. Check console for details.');
    }
  };

  if (showForm) {
    return (
      <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
        <button
          onClick={() => setShowForm(false)}
          style={{
            padding: '0.75rem 1.5rem',
            background: BRAND_COLORS.primary,
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            margin: '1rem',
            fontWeight: 'bold',
            transition: 'background 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.background = '#0052a3'}
          onMouseLeave={(e) => e.target.style.background = BRAND_COLORS.primary}
        >
          ← Back to Home
        </button>
        <CVForm onSubmit={handleGenerateCV} />
      </div>
    );
  }

  if (cvData) {
    return (
      <div style={{ background: '#f8f9fa', minHeight: '100vh', padding: '2rem' }}>
        <button
          onClick={() => setCvData(null)}
          style={{
            padding: '0.75rem 1.5rem',
            background: BRAND_COLORS.primary,
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginBottom: '2rem',
            fontWeight: 'bold',
            transition: 'background 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.background = '#0052a3'}
          onMouseLeave={(e) => e.target.style.background = BRAND_COLORS.primary}
        >
          ← Back to Home
        </button>
        <CVPreview cv={cvData} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif', margin: 0, padding: 0 }}>
      {/* Header */}
      <header style={{
        background: '#f8f9fa',
        padding: '1.5rem 2rem',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <h1 style={{
          margin: 0,
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: BRAND_COLORS.dark,
        }}>
          Find<span style={{ color: BRAND_COLORS.primary }}>Your</span>CV
        </h1>
        <button
          onClick={() => setShowForm(true)}
          style={{
            padding: '0.75rem 1.5rem',
            background: BRAND_COLORS.primary,
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '0.95rem',
            cursor: 'pointer',
            transition: 'background 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.background = '#0052a3'}
          onMouseLeave={(e) => e.target.style.background = BRAND_COLORS.primary}
        >
          Create Your CV
        </button>
      </header>

      {/* Hero Section */}
      <section style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '4rem 2rem',
        gap: '3rem',
      }}>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: BRAND_COLORS.dark,
            lineHeight: '1.2',
            margin: '0 0 1.5rem 0',
          }}>
            Free CV Maker: Create a CV and Download It as a PDF
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            lineHeight: '1.8',
            margin: '0 0 2rem 0',
          }}>
            Create Your CV Online for Free and Download It Instantly as a PDF.
          </p>
          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: '1rem 2.5rem',
              background: BRAND_COLORS.primary,
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: `0 4px 15px ${BRAND_COLORS.primary}40`,
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#0052a3';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = `0 6px 20px ${BRAND_COLORS.primary}60`;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = BRAND_COLORS.primary;
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = `0 4px 15px ${BRAND_COLORS.primary}40`;
            }}
          >
            Create Your CV
          </button>
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{
            background: 'linear-gradient(135deg, #1a3a52 0%, #2d5a7b 100%)',
            padding: '2rem',
            borderRadius: '8px',
            color: 'white',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            minHeight: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>👤</div>
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.3rem' }}>Sample CV Preview</h3>
              <p style={{ margin: '0 0 1rem 0', opacity: 0.9, fontSize: '0.9rem' }}>Your CV will look professional and polished</p>
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '1rem',
                borderRadius: '4px',
                marginTop: '1rem',
                fontSize: '0.85rem',
              }}>
                <p style={{ margin: '0.5rem 0' }}>✓ ATS-Friendly Design</p>
                <p style={{ margin: '0.5rem 0' }}>✓ Professional Formatting</p>
                <p style={{ margin: '0.5rem 0' }}>✓ Instant PDF Export</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        background: '#f8f9fa',
        padding: '4rem 2rem',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.2rem',
            fontWeight: 'bold',
            color: BRAND_COLORS.dark,
            textAlign: 'center',
            margin: '0 0 3rem 0',
          }}>
            Why Choose FindYourCV?
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
          }}>
            <FeatureCard
              icon="💰"
              title="Completely Free CV Maker"
              description="NO Hidden Fees. FindYourCV is a completely free CV maker. Once you've finished creating your CV, you can download it in PDF format for free. You don't need to pay or create an account."
            />
            <FeatureCard
              icon="🌍"
              title="Multilingual Support"
              description="FindYourCV supports over 15 languages, so you can make a CV in the language of your choice. Whether you're applying for a job in the US, Canada, the UK, or elsewhere."
            />
            <FeatureCard
              icon="🤖"
              title="ATS-friendly"
              description="With our CV Maker, you can create a CV that is formatted and optimized for Applicant Tracking Systems (ATS). This will make your CV more likely to be seen by hiring managers."
            />
            <FeatureCard
              icon="📄"
              title="CV in PDF"
              description="Once completed, you can instantly download your CV as a PDF, allowing you to quickly share it with employers and companies."
            />
            <FeatureCard
              icon="✨"
              title="Ease of use"
              description="Without the need for any previous experience in writing a CV, the application will guide you step by step to create a CV easily."
            />
            <FeatureCard
              icon="👥"
              title="Without creating an account"
              description="Enjoy instant and quick access to all the app's features without having to create an account."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{
        padding: '4rem 2rem',
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        <h2 style={{
          fontSize: '2.2rem',
          fontWeight: 'bold',
          color: BRAND_COLORS.dark,
          textAlign: 'center',
          margin: '0 0 3rem 0',
        }}>
          Create Your CV in 3 Simple Steps
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}>
          <StepCard
            icon="📋"
            title="Choose a CV template"
            description="Choose the template that suits your taste from among the best ready-made CV templates."
          />
          <StepCard
            icon="📝"
            title="Add your information"
            description="Add the necessary information to create your CV by filling out an easy and simple form."
          />
          <StepCard
            icon="📥"
            title="Print it for free"
            description="Download or print your CV in PDF for free."
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: '1rem 3rem',
              background: BRAND_COLORS.primary,
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              fontWeight: 'bold',
              fontSize: '1.05rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: `0 4px 15px ${BRAND_COLORS.primary}40`,
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#0052a3';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = `0 6px 20px ${BRAND_COLORS.primary}60`;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = BRAND_COLORS.primary;
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = `0 4px 15px ${BRAND_COLORS.primary}40`;
            }}
          >
            Create Your CV Now
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{
        background: '#f8f9fa',
        padding: '4rem 2rem',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.2rem',
            fontWeight: 'bold',
            color: BRAND_COLORS.dark,
            textAlign: 'center',
            margin: '0 0 3rem 0',
          }}>
            Frequently Asked Questions
          </h2>
          <div>
            <FAQItem
              question="What is a CV?"
              answer="A CV (Curriculum Vitae) is a detailed document that outlines your professional history, education, skills, and achievements. It's commonly used when applying for jobs and academic positions."
              isOpen={expandedFAQ === 0}
              onToggle={() => setExpandedFAQ(expandedFAQ === 0 ? null : 0)}
            />
            <FAQItem
              question="What should you include in your CV?"
              answer="Your CV should include: Contact information, Professional summary, Work experience, Education, Skills, Certifications, Languages, and any relevant achievements or projects."
              isOpen={expandedFAQ === 1}
              onToggle={() => setExpandedFAQ(expandedFAQ === 1 ? null : 1)}
            />
            <FAQItem
              question="How to make a CV online?"
              answer="Simply use our CV maker! Choose a template, fill in your information using our easy form, select your preferred CV theme, and download it as a PDF instantly."
              isOpen={expandedFAQ === 2}
              onToggle={() => setExpandedFAQ(expandedFAQ === 2 ? null : 2)}
            />
            <FAQItem
              question="What is a CV Maker?"
              answer="A CV Maker is an online tool that helps you create a professional CV without requiring design or formatting skills. It provides templates and guides you through the process step by step."
              isOpen={expandedFAQ === 3}
              onToggle={() => setExpandedFAQ(expandedFAQ === 3 ? null : 3)}
            />
            <FAQItem
              question="Can I create a CV on mobile?"
              answer="Yes! Our CV maker is fully responsive and works on desktop, tablet, and mobile devices, so you can create your CV anytime, anywhere."
              isOpen={expandedFAQ === 4}
              onToggle={() => setExpandedFAQ(expandedFAQ === 4 ? null : 4)}
            />
            <FAQItem
              question="Is FindYourCV really free?"
              answer="Yes! FindYourCV is completely free. No hidden fees, no premium plans, no account required. Create, customize, and download your CV at no cost."
              isOpen={expandedFAQ === 5}
              onToggle={() => setExpandedFAQ(expandedFAQ === 5 ? null : 5)}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: BRAND_COLORS.dark,
        color: 'white',
        padding: '2rem',
        textAlign: 'center',
      }}>
        <p style={{ margin: '0.5rem 0', fontSize: '0.95rem' }}>
          © 2025 FindYourCV. All rights reserved.
        </p>
        <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', opacity: 0.8 }}>
          Create your professional CV for free with AI-powered assistance
        </p>
      </footer>
    </div>
  );
}
