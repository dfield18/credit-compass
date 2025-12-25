/**
 * OpenAI API integration for generating suggested follow-up questions
 * 
 * NOTE: This function calls a server-side API route to keep the OpenAI API key secure.
 * The API key is never exposed to the browser.
 */

export interface SuggestedQuestion {
  question: string;
  icon: string;
}

/**
 * Generate suggested follow-up questions with icons based on the conversation context
 * 
 * This function calls a server-side API route (/api/generate-questions) which handles
 * the OpenAI API call securely. The OpenAI API key is stored server-side and never
 * exposed to the browser.
 */
export async function generateSuggestedQuestions(
  userQuestion: string,
  aiResponse: string,
  count: number = 3
): Promise<SuggestedQuestion[]> {
  try {
    // Call our server-side API route instead of OpenAI directly
    const response = await fetch('/api/generate-questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userQuestion,
        aiResponse,
        count,
      }),
    });

    if (!response.ok) {
      console.error('API route error:', response.status, response.statusText);
      return getDefaultSuggestedQuestions();
    }

    const data = await response.json();
    
    // The API route returns { questions: [...] }
    if (data.questions && Array.isArray(data.questions)) {
      return data.questions;
    }

    return getDefaultSuggestedQuestions();
  } catch (error) {
    console.error('Failed to generate suggested questions:', error);
    return getDefaultSuggestedQuestions();
  }
}

/**
 * Get icon for a question based on keywords
 */
function getIconForQuestion(question: string): string {
  const lowerQuestion = question.toLowerCase();
  if (lowerQuestion.includes('travel') || lowerQuestion.includes('flight') || lowerQuestion.includes('hotel')) {
    return '✈️';
  } else if (lowerQuestion.includes('cash back') || lowerQuestion.includes('cashback') || lowerQuestion.includes('money')) {
    return '💰';
  } else if (lowerQuestion.includes('reward') || lowerQuestion.includes('points') || lowerQuestion.includes('bonus')) {
    return '🎁';
  } else if (lowerQuestion.includes('fee') || lowerQuestion.includes('annual') || lowerQuestion.includes('cost')) {
    return '💳';
  } else if (lowerQuestion.includes('apply') || lowerQuestion.includes('application') || lowerQuestion.includes('qualify')) {
    return '📝';
  }
  return '💳'; // Default icon
}

/**
 * Get default suggested questions if OpenAI is not available
 */
function getDefaultSuggestedQuestions(): SuggestedQuestion[] {
  return [
    { question: 'Tell me more about this', icon: '💳' },
    { question: 'What are the benefits?', icon: '🎁' },
    { question: 'How do I apply?', icon: '📝' },
  ];
}

