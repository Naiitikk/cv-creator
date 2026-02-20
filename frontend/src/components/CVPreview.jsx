import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const BRAND_COLORS = {
  primary: '#0066cc',
  secondary: '#00d4ff',
  dark: '#1a1a2e',
  light: '#f0f4ff',
  accent: '#ff6b6b',
  success: '#06b6d4',
  text: '#2d3748',
};

export default function CVPreview({ cv, onEdit }) {
  // Theme configurations
  const themes = {
    modern: {
      headerBg: `linear-gradient(135deg, ${BRAND_COLORS.dark} 0%, ${BRAND_COLORS.primary} 100%)`,
      headerColor: 'white',
      accentColor: BRAND_COLORS.primary,
      borderColor: BRAND_COLORS.secondary,
      sectionBorder: `3px solid ${BRAND_COLORS.secondary}`,
    },
    classic: {
      headerBg: 'white',
      headerColor: BRAND_COLORS.dark,
      accentColor: BRAND_COLORS.dark,
      borderColor: '#000',
      sectionBorder: `2px solid #000`,
    },
    executive: {
      headerBg: `linear-gradient(135deg, ${BRAND_COLORS.dark} 0%, #1a3a52 100%)`,
      headerColor: 'white',
      accentColor: '#d4af37',
      borderColor: '#d4af37',
      sectionBorder: `3px solid #d4af37`,
    },
    creative: {
      headerBg: `linear-gradient(135deg, ${BRAND_COLORS.secondary} 0%, ${BRAND_COLORS.accent} 100%)`,
      headerColor: 'white',
      accentColor: BRAND_COLORS.accent,
      borderColor: BRAND_COLORS.secondary,
      sectionBorder: `3px dashed ${BRAND_COLORS.secondary}`,
    },
  };

  const theme = themes[cv.cvTheme] || themes.modern;
  const downloadPDF = async () => {
    try {
      const element = document.getElementById('cv-content');
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${cv.firstName}_${cv.lastName}_CV.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '3rem auto', padding: '0 2rem' }}>
      {/* CV Content */}
      <div
        id="cv-content"
        style={{
          background: 'white',
          padding: '3rem',
          borderRadius: '16px',
          boxShadow: '0 15px 50px rgba(0,0,0,0.1)',
          fontFamily: "'Inter', 'Segoe UI', 'Helvetica Neue', sans-serif",
          color: BRAND_COLORS.text,
          lineHeight: '1.6',
        }}
      >
        {/* Header */}
        <div style={{ background: theme.headerBg, paddingBottom: '2rem', marginBottom: '2.5rem', padding: '2rem', borderRadius: '12px', display: 'flex', gap: '2rem', alignItems: 'center', color: theme.headerColor }}>
          {cv.profilePicture && (
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '12px',
              overflow: 'hidden',
              border: `4px solid ${theme.headerColor || 'white'}`,
              flexShrink: 0,
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}>
              <img src={cv.profilePicture} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '2.8rem', fontWeight: '800', color: theme.headerColor, margin: 0, marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>
              {cv.firstName} {cv.lastName}
            </h1>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '600', color: theme.headerColor, margin: '0.5rem 0 0 0', opacity: 0.9 }}>
              {cv.jobTitle} {cv.company && `• ${cv.company}`}
            </h2>
            <div style={{ display: 'flex', gap: '2rem', marginTop: '1.2rem', fontSize: '0.95rem', color: theme.headerColor, flexWrap: 'wrap', opacity: 0.85 }}>
              {cv.email && <span>📧 {cv.email}</span>}
              {cv.phone && <span>📱 {cv.phone}</span>}
              {cv.location && <span>📍 {cv.location}</span>}
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        {cv.summary && (
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: '700', color: theme.accentColor, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1.5px', borderLeft: theme.sectionBorder, paddingLeft: '1rem' }}>
              Professional Summary
            </h2>
            <p style={{ color: BRAND_COLORS.text, fontSize: '0.95rem', lineHeight: '1.8', margin: 0, marginLeft: '0.8rem' }}>
              {cv.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {cv.experienceDescription && (
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: '700', color: theme.accentColor, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1.5px', borderLeft: theme.sectionBorder, paddingLeft: '1rem' }}>
              Professional Experience
            </h2>
            <div style={{ marginLeft: '0.8rem', paddingLeft: '1.2rem', borderLeft: theme.sectionBorder }}>
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontWeight: '700', color: BRAND_COLORS.dark, margin: '0 0 0.3rem 0', fontSize: '1.1rem' }}>
                  {cv.jobTitle}
                </h3>
                {cv.company && (
                  <p style={{ fontSize: '0.95rem', color: theme.accentColor, margin: 0, fontWeight: '600' }}>
                    {cv.company}
                  </p>
                )}
                <div style={{ marginTop: '1rem', fontSize: '0.95rem', color: BRAND_COLORS.text, whiteSpace: 'pre-wrap', lineHeight: '1.7' }}>
                  {cv.experienceDescription}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skills */}
        {cv.skills && (
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: '700', color: theme.accentColor, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1.5px', borderLeft: theme.sectionBorder, paddingLeft: '1rem' }}>
              Skills & Expertise
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginLeft: '0.8rem' }}>
              {cv.skills &&
                (Array.isArray(cv.skills) ? cv.skills : cv.skills.split(',')).map((skill, index) => (
                  <span
                    key={index}
                    style={{
                      background: `linear-gradient(135deg, ${theme.accentColor} 0%, ${theme.borderColor} 100%)`,
                      color: 'white',
                      padding: '0.6rem 1.2rem',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      boxShadow: `0 4px 12px ${BRAND_COLORS.primary}25`
                    }}
                  >
                    {skill.trim()}
                  </span>
                ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {cv.languages && (
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: '700', color: theme.accentColor, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1.5px', borderLeft: theme.sectionBorder, paddingLeft: '1rem' }}>
              Languages
            </h2>
            <p style={{ marginLeft: '0.8rem', color: BRAND_COLORS.text, fontSize: '0.95rem', whiteSpace: 'pre-wrap', lineHeight: '1.7' }}>
              {cv.languages}
            </p>
          </div>
        )}

        {/* Certifications */}
        {cv.certifications && (
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: '700', color: theme.accentColor, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1.5px', borderLeft: theme.sectionBorder, paddingLeft: '1rem' }}>
              Certifications & Awards
            </h2>
            <p style={{ marginLeft: '0.8rem', color: BRAND_COLORS.text, fontSize: '0.95rem', whiteSpace: 'pre-wrap', lineHeight: '1.7' }}>
              {cv.certifications}
            </p>
          </div>
        )}

        {/* Portfolio */}
        {cv.portfolio && (
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: '700', color: theme.accentColor, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1.5px', borderLeft: theme.sectionBorder, paddingLeft: '1rem' }}>
              Portfolio
            </h2>
            <p style={{ marginLeft: '0.8rem', marginBottom: 0 }}>
              <a href={cv.portfolio} target="_blank" rel="noopener noreferrer" style={{ color: theme.accentColor, textDecoration: 'none', fontWeight: '600' }}>
                {cv.portfolio}
              </a>
            </p>
          </div>
        )}

        {/* Project Gallery */}
        {cv.projectImages && cv.projectImages.length > 0 && (
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: '700', color: theme.accentColor, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1.5px', borderLeft: theme.sectionBorder, paddingLeft: '1rem' }}>
              Project Gallery
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1.5rem', marginLeft: '0.8rem' }}>
              {cv.projectImages.map((image, index) => (
                <div
                  key={index}
                  style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: `3px solid ${theme.borderColor}`,
                    boxShadow: `0 8px 20px ${BRAND_COLORS.primary}20`,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <img
                    src={image}
                    alt={`Project ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={downloadPDF}
          style={{
            background: `linear-gradient(135deg, ${BRAND_COLORS.primary} 0%, ${BRAND_COLORS.secondary} 100%)`,
            color: 'white',
            fontWeight: '700',
            padding: '1.1rem 2.5rem',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'all 0.3s',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            boxShadow: `0 10px 30px ${BRAND_COLORS.primary}30`
          }}
          onMouseOver={(e) => (e.target.style.transform = 'translateY(-4px)', e.target.style.boxShadow = `0 15px 40px ${BRAND_COLORS.primary}40`)}
          onMouseOut={(e) => (e.target.style.transform = 'translateY(0)', e.target.style.boxShadow = `0 10px 30px ${BRAND_COLORS.primary}30`)}
        >
          📥 Download PDF
        </button>
        <button
          onClick={() => window.print()}
          style={{
            background: BRAND_COLORS.light,
            color: BRAND_COLORS.primary,
            fontWeight: '700',
            padding: '1.1rem 2.5rem',
            borderRadius: '12px',
            border: `2px solid ${BRAND_COLORS.primary}`,
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'all 0.3s',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
          onMouseOver={(e) => (e.target.style.background = BRAND_COLORS.primary, e.target.style.color = 'white', e.target.style.boxShadow = `0 10px 30px ${BRAND_COLORS.primary}30`)}
          onMouseOut={(e) => (e.target.style.background = BRAND_COLORS.light, e.target.style.color = BRAND_COLORS.primary, e.target.style.boxShadow = 'none')}
        >
          🖨️ Print CV
        </button>
        <button
          onClick={onEdit}
          style={{
            background: BRAND_COLORS.success,
            color: 'white',
            fontWeight: '700',
            padding: '1.1rem 2.5rem',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'all 0.3s',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            boxShadow: `0 10px 30px ${BRAND_COLORS.success}30`
          }}
          onMouseOver={(e) => (e.target.style.transform = 'translateY(-4px)', e.target.style.boxShadow = `0 15px 40px ${BRAND_COLORS.success}40`)}
          onMouseOut={(e) => (e.target.style.transform = 'translateY(0)', e.target.style.boxShadow = `0 10px 30px ${BRAND_COLORS.success}30`)}
        >
          ✏️ Edit CV
        </button>
      </div>
    </div>
  );
}
