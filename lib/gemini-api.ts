import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { RateLimiter } from 'limiter';
import NodeCache from 'node-cache';

// Initialize Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// Initialize rate limiter (60 requests per minute)
const limiter = new RateLimiter({
  tokensPerInterval: parseInt(process.env.GEMINI_REQUESTS_PER_MINUTE || '60'),
  interval: 'minute'
});

// Initialize cache with 5 minutes TTL
const cache = new NodeCache({ stdTTL: 300 });

// Safety settings
const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

// Helper function for rate limiting
async function waitForRateLimit() {
  const remainingRequests = await limiter.removeTokens(1);
  if (remainingRequests < 0) {
    throw new Error('Rate limit exceeded. Please try again later.');
  }
}

// Helper function for caching
function getCacheKey(functionName: string, params: any): string {
  return `${functionName}:${JSON.stringify(params)}`;
}

export async function analyzeTextForBias(text: string) {
  const cacheKey = getCacheKey('analyzeTextForBias', { text });
  const cachedResult = cache.get(cacheKey);
  if (cachedResult) return cachedResult;

  await waitForRateLimit();

  try {
    const prompt = `Analyze the following text for potential bias, including gender, age, cultural, or other forms of bias. 
Provide specific findings with suggestions for improvement. Format the response as a JSON object with 'findings' array and 'score' (0-100).

Text to analyze: ${text}`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      safetySettings,
      generationConfig: {
        temperature: parseFloat(process.env.GEMINI_TEMPERATURE || '0.7'),
        topK: parseInt(process.env.GEMINI_TOP_K || '40'),
        topP: parseFloat(process.env.GEMINI_TOP_P || '0.9'),
        maxTokens: parseInt(process.env.GEMINI_MAX_TOKENS || '2048'),
      }
    });

    const response = result.response;
    const analysis = JSON.parse(response.text());
    cache.set(cacheKey, analysis);
    return analysis;
  } catch (error) {
    console.error('Error analyzing text for bias:', error);
    throw new Error('Failed to analyze text for bias');
  }
}

export async function findMentorMatches(profile: any) {
  const cacheKey = getCacheKey('findMentorMatches', { profile });
  const cachedResult = cache.get(cacheKey);
  if (cachedResult) return cachedResult;

  await waitForRateLimit();

  try {
    const prompt = `Given the following mentee profile, suggest optimal mentor matches based on skills, interests, and goals. Format the response as a JSON array of mentor profiles with match scores.

Mentee Profile: ${JSON.stringify(profile)}`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      safetySettings,
      generationConfig: {
        temperature: 0.7,
        maxTokens: parseInt(process.env.GEMINI_MAX_TOKENS || '2048'),
      }
    });

    const response = result.response;
    const matches = JSON.parse(response.text());
    cache.set(cacheKey, matches);
    return matches;
  } catch (error) {
    console.error('Error finding mentor matches:', error);
    throw new Error('Failed to find mentor matches');
  }
}

export async function translateContent(content: string, targetLanguage: string) {
  const cacheKey = getCacheKey('translateContent', { content, targetLanguage });
  const cachedResult = cache.get(cacheKey);
  if (cachedResult) return cachedResult;

  await waitForRateLimit();

  try {
    const prompt = `Translate the following content to ${targetLanguage}. Maintain the original meaning and context while ensuring natural, fluent translation.

Content: ${content}`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      safetySettings,
      generationConfig: {
        temperature: 0.3,
        maxTokens: parseInt(process.env.GEMINI_MAX_TOKENS || '2048'),
      }
    });

    const response = result.response;
    const translation = response.text();
    cache.set(cacheKey, translation);
    return translation;
  } catch (error) {
    console.error('Error translating content:', error);
    throw new Error('Failed to translate content');
  }
}

export async function generatePolicyRecommendations(organization: string, focus: string) {
  const cacheKey = getCacheKey('generatePolicyRecommendations', { organization, focus });
  const cachedResult = cache.get(cacheKey);
  if (cachedResult) return cachedResult;

  await waitForRateLimit();

  try {
    const prompt = `Generate specific policy recommendations for ${organization} focusing on ${focus}. Consider industry best practices, legal requirements, and practical implementation steps.`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      safetySettings,
      generationConfig: {
        temperature: 0.7,
        maxTokens: parseInt(process.env.GEMINI_MAX_TOKENS || '2048'),
      }
    });

    const response = result.response;
    const recommendations = response.text().split('\n').filter(Boolean);
    cache.set(cacheKey, recommendations);
    return recommendations;
  } catch (error) {
    console.error('Error generating policy recommendations:', error);
    throw new Error('Failed to generate policy recommendations');
  }
}
