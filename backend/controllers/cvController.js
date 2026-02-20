import {
  generateSummary,
  generateExperienceDescription,
  generateSkillsContent,
  generateCoverLetter,
} from '../utils/aiGenerator.js';

export const generateCVContent = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      jobTitle,
      experience,
      skills,
      company,
      responsibilities,
      achievements,
      location,
      profilePicture,
      cvTheme,
    } = req.body;

    // Validate input
    if (!firstName || !lastName || !jobTitle || !experience) {
      return res
        .status(400)
        .json({ error: 'Missing required fields' });
    }

    // Convert skills to array if it's a string
    const skillsArray = Array.isArray(skills) 
      ? skills 
      : (skills ? skills.split(',').map(s => s.trim()) : []);

    // Generate AI content
    const summary = await generateSummary(
      jobTitle,
      experience,
      skillsArray
    );
    const experienceDescription = await generateExperienceDescription(
      jobTitle,
      company || 'Previous Company',
      responsibilities || 'General responsibilities',
      achievements || 'Key achievements'
    );
    const generatedSkills = await generateSkillsContent(
      jobTitle,
      experience
    );
    
    res.json({
      success: true,
      cv: {
        firstName,
        lastName,
        email,
        phone,
        jobTitle,
        company: company || 'Previous Company',
        location: location || '',
        profilePicture: profilePicture || null,
        cvTheme: cvTheme || 'modern',
        summary,
        experienceDescription,
        skills: generatedSkills,
      },
    });
  } catch (error) {
    console.error('Error generating CV content:', error);
    res.status(500).json({
      error: 'Failed to generate CV content',
      details: error.message,
    });
  }
};

export const generateCoverLetterContent = async (req, res) => {
  try {
    const { jobTitle, company, experience } = req.body;

    if (!jobTitle || !company || !experience) {
      return res
        .status(400)
        .json({ error: 'Missing required fields' });
    }

    const coverLetter = await generateCoverLetter(
      jobTitle,
      company,
      experience
    );

    res.json({
      success: true,
      coverLetter,
    });
  } catch (error) {
    console.error('Error generating cover letter:', error);
    res.status(500).json({
      error: 'Failed to generate cover letter',
      details: error.message,
    });
  }
};
