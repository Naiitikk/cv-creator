import Groq from 'groq-sdk';

let client;

function getClient() {
  if (!client) {
    client = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }
  return client;
}

export const generateSummary = async (jobTitle, experience, skills) => {
  try {
    const message = await getClient().chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Create a professional CV summary/objective for someone with the following details:
Job Title: ${jobTitle}
Experience: ${experience} years
Key Skills: ${skills.join(', ')}

Write a concise, impactful professional summary (2-3 sentences) that highlights their value proposition.`,
        },
      ],
    });

    return message.choices[0].message.content;
  } catch (error) {
    console.error('Error generating summary:', error);
    throw error;
  }
};

export const generateExperienceDescription = async (
  jobTitle,
  company,
  responsibilities,
  achievements
) => {
  try {
    const message = await getClient().chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Create bullet points for a CV experience entry:
Job Title: ${jobTitle}
Company: ${company}
Responsibilities: ${responsibilities}
Key Achievements: ${achievements}

Generate 4-5 bullet points that showcase accomplishments and impact (use action verbs, quantify results when possible).`,
        },
      ],
    });

    return message.choices[0].message.content;
  } catch (error) {
    console.error('Error generating experience description:', error);
    throw error;
  }
};

export const generateSkillsContent = async (jobTitle, experience) => {
  try {
    const message = await getClient().chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Generate relevant skills for a ${jobTitle} with ${experience} years of experience.
Return as a comma-separated list of 10-15 relevant technical and soft skills.`,
        },
      ],
    });

    return message.choices[0].message.content.split(',').map((skill) => skill.trim());
  } catch (error) {
    console.error('Error generating skills:', error);
    throw error;
  }
};

export const generateCoverLetter = async (jobTitle, company, experience) => {
  try {
    const message = await getClient().chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Create a brief professional cover letter opening paragraph for:
Position: ${jobTitle}
Company: ${company}
Experience: ${experience} years in the field

Make it compelling, professional, and personalized.`,
        },
      ],
    });

    return message.choices[0].message.content;
  } catch (error) {
    console.error('Error generating cover letter:', error);
    throw error;
  }
};
