import React, { useState } from 'react';

const BRAND_COLORS = {
  primary: '#0066cc',
  secondary: '#00d4ff',
  dark: '#1a1a2e',
  light: '#f0f4ff',
  accent: '#ff6b6b',
  success: '#06b6d4',
  text: '#2d3748',
};

export default function CVForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    profilePicture: null,
    jobTitle: '',
    experience: '',
    company: '',
    responsibilities: '',
    achievements: '',
    skills: '',
    languages: '',
    certifications: '',
    portfolio: '',
    cvTheme: 'modern',
    projectImages: [],
  });

  const [error, setError] = useState('');
  const [profilePreview, setProfilePreview] = useState(null);
  const [projectImagePreviews, setProjectImagePreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profilePicture: reader.result,
        }));
        setProfilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProjectImagesChange = (e) => {
    const files = Array.from(e.target.files);
    let loadedCount = 0;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        loadedCount++;
        setProjectImagePreviews((prev) => [...prev, reader.result]);
        setFormData((prev) => ({
          ...prev,
          projectImages: [...prev.projectImages, reader.result],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeProjectImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      projectImages: prev.projectImages.filter((_, i) => i !== index),
    }));
    setProjectImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.firstName || !formData.lastName || !formData.jobTitle || !formData.experience) {
      setError('Please fill in all required fields');
      return;
    }

    onSubmit(formData);
  };

  const inputStyle = {
    padding: '0.9rem 1.2rem',
    border: `2px solid ${BRAND_COLORS.light}`,
    borderRadius: '10px',
    fontSize: '0.95rem',
    transition: 'all 0.3s ease',
    backgroundColor: '#ffffff',
    fontFamily: 'inherit',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  };

  const textareaStyle = {
    ...inputStyle,
    fontFamily: 'inherit',
    resize: 'vertical'
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '3rem auto', padding: '0 2rem' }}>
      <div style={{ background: 'white', borderRadius: '20px', boxShadow: '0 15px 50px rgba(0,0,0,0.1)', padding: '3rem', position: 'relative', border: `2px solid ${BRAND_COLORS.light}` }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem', background: `linear-gradient(135deg, ${BRAND_COLORS.dark} 0%, ${BRAND_COLORS.primary} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: '1.2' }}>
            📋 Build Your FindYourCV Profile
          </h2>
          <p style={{ fontSize: '1rem', color: BRAND_COLORS.text, marginBottom: 0, opacity: 0.7 }}>
            Fill in your details below and our AI will craft a stunning professional CV.
          </p>
        </div>

        {error && (
          <div style={{ marginBottom: '1.5rem', padding: '1rem 1.5rem', background: '#fee2e2', border: `2px solid ${BRAND_COLORS.accent}`, color: '#991b1b', borderRadius: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span style={{ fontSize: '1.2rem' }}>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Personal Information Section */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ width: '5px', height: '28px', background: `linear-gradient(180deg, ${BRAND_COLORS.primary} 0%, ${BRAND_COLORS.secondary} 100%)`, borderRadius: '3px', marginRight: '1rem' }}></div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: BRAND_COLORS.primary, margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                👤 Personal Information
              </h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name *"
                value={formData.firstName}
                onChange={handleChange}
                required
                style={{...inputStyle, borderColor: formData.firstName ? BRAND_COLORS.success : BRAND_COLORS.light}}
                onFocus={(e) => (e.target.style.borderColor = BRAND_COLORS.primary, e.target.style.boxShadow = `0 0 0 3px ${BRAND_COLORS.primary}20`)}
                onBlur={(e) => (e.target.style.borderColor = formData.firstName ? BRAND_COLORS.success : BRAND_COLORS.light, e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)')}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name *"
                value={formData.lastName}
                onChange={handleChange}
                required
                style={{...inputStyle, borderColor: formData.lastName ? BRAND_COLORS.success : BRAND_COLORS.light}}
                onFocus={(e) => (e.target.style.borderColor = BRAND_COLORS.primary, e.target.style.boxShadow = `0 0 0 3px ${BRAND_COLORS.primary}20`)}
                onBlur={(e) => (e.target.style.borderColor = formData.lastName ? BRAND_COLORS.success : BRAND_COLORS.light, e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)')}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                style={{...inputStyle, borderColor: formData.email ? BRAND_COLORS.success : BRAND_COLORS.light}}
                onFocus={(e) => (e.target.style.borderColor = BRAND_COLORS.primary, e.target.style.boxShadow = `0 0 0 3px ${BRAND_COLORS.primary}20`)}
                onBlur={(e) => (e.target.style.borderColor = formData.email ? BRAND_COLORS.success : BRAND_COLORS.light, e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)')}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                style={{...inputStyle, borderColor: formData.phone ? BRAND_COLORS.success : BRAND_COLORS.light}}
                onFocus={(e) => (e.target.style.borderColor = BRAND_COLORS.primary, e.target.style.boxShadow = `0 0 0 3px ${BRAND_COLORS.primary}20`)}
                onBlur={(e) => (e.target.style.borderColor = formData.phone ? BRAND_COLORS.success : BRAND_COLORS.light, e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)')}
              />
              <input
                type="text"
                name="location"
                placeholder="Location/City"
                value={formData.location}
                onChange={handleChange}
                style={{...inputStyle, borderColor: formData.location ? BRAND_COLORS.success : BRAND_COLORS.light}}
                onFocus={(e) => (e.target.style.borderColor = BRAND_COLORS.primary, e.target.style.boxShadow = `0 0 0 3px ${BRAND_COLORS.primary}20`)}
                onBlur={(e) => (e.target.style.borderColor = formData.location ? BRAND_COLORS.success : BRAND_COLORS.light, e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)')}
              />
            </div>

            {/* Profile Picture Upload */}
            <div style={{ marginTop: '2rem', padding: '1.5rem', background: BRAND_COLORS.light, borderRadius: '12px', border: `2px dashed ${BRAND_COLORS.primary}50` }}>
              <label style={{ fontSize: '0.9rem', fontWeight: '600', color: BRAND_COLORS.primary, marginBottom: '1rem', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                📸 Profile Picture (Optional)
              </label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  style={{ flex: 1 }}
                />
                {profilePreview && (
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: `3px solid ${BRAND_COLORS.primary}`,
                    boxShadow: `0 4px 12px ${BRAND_COLORS.primary}25`
                  }}>
                    <img src={profilePreview} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information Section */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ width: '5px', height: '28px', background: `linear-gradient(180deg, ${BRAND_COLORS.primary} 0%, ${BRAND_COLORS.secondary} 100%)`, borderRadius: '3px', marginRight: '1rem' }}></div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: BRAND_COLORS.primary, margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                💼 Professional Details
              </h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <input
                type="text"
                name="jobTitle"
                placeholder="Job Title / Position *"
                value={formData.jobTitle}
                onChange={handleChange}
                required
                style={{...inputStyle, borderColor: formData.jobTitle ? BRAND_COLORS.success : BRAND_COLORS.light}}
                onFocus={(e) => (e.target.style.borderColor = BRAND_COLORS.primary, e.target.style.boxShadow = `0 0 0 3px ${BRAND_COLORS.primary}20`)}
                onBlur={(e) => (e.target.style.borderColor = formData.jobTitle ? BRAND_COLORS.success : BRAND_COLORS.light, e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)')}
              />
              <input
                type="number"
                name="experience"
                placeholder="Years of Experience *"
                value={formData.experience}
                onChange={handleChange}
                required
                style={{...inputStyle, borderColor: formData.experience ? BRAND_COLORS.success : BRAND_COLORS.light}}
                onFocus={(e) => (e.target.style.borderColor = BRAND_COLORS.primary, e.target.style.boxShadow = `0 0 0 3px ${BRAND_COLORS.primary}20`)}
                onBlur={(e) => (e.target.style.borderColor = formData.experience ? BRAND_COLORS.success : BRAND_COLORS.light, e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)')}
              />
            </div>

            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={formData.company}
              onChange={handleChange}
              style={{...inputStyle, width: '100%', boxSizing: 'border-box', marginBottom: '1.5rem', borderColor: formData.company ? BRAND_COLORS.success : BRAND_COLORS.light}}
              onFocus={(e) => (e.target.style.borderColor = BRAND_COLORS.primary, e.target.style.boxShadow = `0 0 0 3px ${BRAND_COLORS.primary}20`)}
              onBlur={(e) => (e.target.style.borderColor = formData.company ? BRAND_COLORS.success : BRAND_COLORS.light, e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)')}
            />

            <textarea
              name="responsibilities"
              placeholder="Main responsibilities (comma-separated)"
              value={formData.responsibilities}
              onChange={handleChange}
              style={{...textareaStyle, width: '100%', boxSizing: 'border-box', marginBottom: '1.5rem', height: '100px', borderColor: formData.responsibilities ? BRAND_COLORS.success : BRAND_COLORS.light}}
              onFocus={(e) => (e.target.style.borderColor = BRAND_COLORS.primary, e.target.style.boxShadow = `0 0 0 3px ${BRAND_COLORS.primary}20`)}
              onBlur={(e) => (e.target.style.borderColor = formData.responsibilities ? BRAND_COLORS.success : BRAND_COLORS.light, e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)')}
            />

            <textarea
              name="achievements"
              placeholder="Key achievements and accomplishments"
              value={formData.achievements}
              onChange={handleChange}
              style={{...textareaStyle, width: '100%', boxSizing: 'border-box', marginBottom: '1.5rem', height: '100px', borderColor: formData.achievements ? BRAND_COLORS.success : BRAND_COLORS.light}}
              onFocus={(e) => (e.target.style.borderColor = BRAND_COLORS.primary, e.target.style.boxShadow = `0 0 0 3px ${BRAND_COLORS.primary}20`)}
              onBlur={(e) => (e.target.style.borderColor = formData.achievements ? BRAND_COLORS.success : BRAND_COLORS.light, e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)')}
            />

            <input
              type="text"
              name="skills"
              placeholder="Your skills (comma-separated, e.g. JavaScript, React, Node.js)"
              value={formData.skills}
              onChange={handleChange}
              style={{...inputStyle, width: '100%', boxSizing: 'border-box', borderColor: formData.skills ? BRAND_COLORS.success : BRAND_COLORS.light}}
              onFocus={(e) => (e.target.style.borderColor = BRAND_COLORS.primary, e.target.style.boxShadow = `0 0 0 3px ${BRAND_COLORS.primary}20`)}
              onBlur={(e) => (e.target.style.borderColor = formData.skills ? BRAND_COLORS.success : BRAND_COLORS.light, e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)')}
            />
          </div>

          {/* Additional Information Section */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ width: '5px', height: '28px', background: `linear-gradient(180deg, ${BRAND_COLORS.primary} 0%, ${BRAND_COLORS.secondary} 100%)`, borderRadius: '3px', marginRight: '1rem' }}></div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: BRAND_COLORS.primary, margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                🎨 Project Gallery (Optional)
              </h3>
            </div>
            <div style={{ padding: '1.5rem', background: BRAND_COLORS.light, borderRadius: '12px', border: `2px dashed ${BRAND_COLORS.primary}50`, marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: '600', color: BRAND_COLORS.primary, marginBottom: '1rem', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                📸 Upload Project Images
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleProjectImagesChange}
                style={{ width: '100%', cursor: 'pointer' }}
              />
              <p style={{ fontSize: '0.8rem', color: BRAND_COLORS.text, marginTop: '0.5rem', opacity: 0.7 }}>
                You can upload multiple images of your projects
              </p>
            </div>

            {/* Project Images Preview */}
            {formData.projectImages.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '0.9rem', fontWeight: '600', color: BRAND_COLORS.primary, marginBottom: '1rem' }}>
                  Uploaded Project Images ({formData.projectImages.length})
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '1rem' }}>
                  {formData.projectImages.map((image, index) => (
                    <div key={index} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: `2px solid ${BRAND_COLORS.primary}`, boxShadow: `0 4px 12px ${BRAND_COLORS.primary}25` }}>
                      <img src={image} alt={`Project ${index + 1}`} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                      <button
                        type="button"
                        onClick={() => removeProjectImage(index)}
                        style={{
                          position: 'absolute',
                          top: '0.5rem',
                          right: '0.5rem',
                          background: BRAND_COLORS.accent,
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '28px',
                          height: '28px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          fontSize: '1rem',
                          transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => (e.target.style.transform = 'scale(1.1)', e.target.style.boxShadow = `0 4px 12px ${BRAND_COLORS.accent}50`)}
                        onMouseOut={(e) => (e.target.style.transform = 'scale(1)', e.target.style.boxShadow = 'none')}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Additional Information Section */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ width: '5px', height: '28px', background: `linear-gradient(180deg, ${BRAND_COLORS.primary} 0%, ${BRAND_COLORS.secondary} 100%)`, borderRadius: '3px', marginRight: '1rem' }}></div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: BRAND_COLORS.primary, margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                ✨ Additional Information
              </h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <textarea
                name="languages"
                placeholder="Languages (e.g. English - Fluent, Spanish - Intermediate)"
                value={formData.languages}
                onChange={handleChange}
                style={{...inputStyle, borderColor: formData.languages ? BRAND_COLORS.success : BRAND_COLORS.light, minHeight: '80px'}}
                onFocus={(e) => (e.target.style.borderColor = BRAND_COLORS.primary, e.target.style.boxShadow = `0 0 0 3px ${BRAND_COLORS.primary}20`)}
                onBlur={(e) => (e.target.style.borderColor = formData.languages ? BRAND_COLORS.success : BRAND_COLORS.light, e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)')}
              />
              <textarea
                name="certifications"
                placeholder="Certifications & Awards"
                value={formData.certifications}
                onChange={handleChange}
                style={{...inputStyle, borderColor: formData.certifications ? BRAND_COLORS.success : BRAND_COLORS.light, minHeight: '80px'}}
                onFocus={(e) => (e.target.style.borderColor = BRAND_COLORS.primary, e.target.style.boxShadow = `0 0 0 3px ${BRAND_COLORS.primary}20`)}
                onBlur={(e) => (e.target.style.borderColor = formData.certifications ? BRAND_COLORS.success : BRAND_COLORS.light, e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)')}
              />
            </div>
            <input
              type="text"
              name="portfolio"
              placeholder="Portfolio / Website Link (optional)"
              value={formData.portfolio}
              onChange={handleChange}
              style={{...inputStyle, width: '100%', boxSizing: 'border-box', marginTop: '1.5rem', borderColor: formData.portfolio ? BRAND_COLORS.success : BRAND_COLORS.light}}
              onFocus={(e) => (e.target.style.borderColor = BRAND_COLORS.primary, e.target.style.boxShadow = `0 0 0 3px ${BRAND_COLORS.primary}20`)}
              onBlur={(e) => (e.target.style.borderColor = formData.portfolio ? BRAND_COLORS.success : BRAND_COLORS.light, e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)')}
            />
          </div>

          {/* CV Theme Selection */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ width: '5px', height: '28px', background: `linear-gradient(180deg, ${BRAND_COLORS.primary} 0%, ${BRAND_COLORS.secondary} 100%)`, borderRadius: '3px', marginRight: '1rem' }}></div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: BRAND_COLORS.primary, margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                🎨 CV Theme Selection
              </h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
              {[
                { value: 'modern', label: 'Modern', icon: '✨' },
                { value: 'classic', label: 'Classic', icon: '📖' },
                { value: 'executive', label: 'Executive', icon: '👔' },
                { value: 'creative', label: 'Creative', icon: '🎯' }
              ].map(theme => (
                <label key={theme.value} style={{
                  padding: '1.2rem',
                  borderRadius: '12px',
                  border: `3px solid ${formData.cvTheme === theme.value ? BRAND_COLORS.primary : BRAND_COLORS.light}`,
                  background: formData.cvTheme === theme.value ? BRAND_COLORS.light : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  textAlign: 'center',
                  fontWeight: '600'
                }}
                onMouseOver={(e) => {
                  if (formData.cvTheme !== theme.value) {
                    e.currentTarget.style.borderColor = BRAND_COLORS.secondary;
                    e.currentTarget.style.background = `${BRAND_COLORS.light}80`;
                  }
                }}
                onMouseOut={(e) => {
                  if (formData.cvTheme !== theme.value) {
                    e.currentTarget.style.borderColor = BRAND_COLORS.light;
                    e.currentTarget.style.background = 'white';
                  }
                }}>
                  <input
                    type="radio"
                    name="cvTheme"
                    value={theme.value}
                    checked={formData.cvTheme === theme.value}
                    onChange={handleChange}
                    style={{ marginRight: '0.5rem' }}
                  />
                  <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>{theme.icon}</span>
                  <div>{theme.label}</div>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? '#d1d5db' : `linear-gradient(135deg, ${BRAND_COLORS.primary} 0%, ${BRAND_COLORS.secondary} 100%)`,
              color: 'white',
              fontWeight: '700',
              padding: '1.3rem',
              borderRadius: '12px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '1.05rem',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              boxShadow: `0 10px 30px ${BRAND_COLORS.primary}30`,
              marginTop: '1.5rem'
            }}
            onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-3px)', e.target.style.boxShadow = `0 15px 40px ${BRAND_COLORS.primary}40`)}
            onMouseOut={(e) => !loading && (e.target.style.transform = 'translateY(0)', e.target.style.boxShadow = `0 10px 30px ${BRAND_COLORS.primary}30`)}
          >
            {loading ? '⚡ Generating with AI...' : '✨ Generate Professional CV'}
          </button>
        </form>
      </div>
    </div>
  );
}
