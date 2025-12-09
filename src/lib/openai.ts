/**
 * OpenAI API integration for generating suggested follow-up questions
 */

export interface SuggestedQuestion {
  question: string;
  icon: string;
}

/**
 * Generate suggested follow-up questions with icons based on the conversation context
 */
export async function generateSuggestedQuestions(
  userQuestion: string,
  aiResponse: string,
  count: number = 3
): Promise<SuggestedQuestion[]> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    // If OpenAI API key is not configured, return default questions
    return getDefaultSuggestedQuestions();
  }

  const url = 'https://api.openai.com/v1/chat/completions';

  const prompt = `Based on the following conversation about credit cards, generate ${count} concise, relevant follow-up questions that a user might want to ask. Each question should be a single sentence and should be specific to the context.

User Question: "${userQuestion}"

AI Response: "${aiResponse}"

Generate ${count} follow-up questions that are:
1. Relevant to the conversation
2. Specific and actionable
3. Natural and conversational

For each question, also suggest a single emoji icon that best represents the question topic (e.g., ✈️ for travel, 💳 for credit cards, 💰 for cash back, 🎁 for rewards, etc.).

Return the response as a JSON object with a "questions" array. Each item in the array should have "question" and "icon" fields. Example:
{
  "questions": [
    {"question": "Which credit card offers the best travel rewards program?", "icon": "✈️"},
    {"question": "What are the top no-annual-fee credit cards available?", "icon": "💳"},
    {"question": "What cards offer the best cash back?", "icon": "💰"}
  ]
}

Return ONLY valid JSON, no other text.`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that generates relevant follow-up questions for credit card conversations. Always return valid JSON with a "questions" array.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 300,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API error:', errorData);
      return getDefaultSuggestedQuestions();
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';
    
    try {
      // Parse as JSON object
      const parsed = JSON.parse(content);
      const questions = parsed.questions || parsed.results || [];
      
      // Validate and format the questions
      const formatted = questions
        .filter((q: any) => q && q.question && q.icon)
        .map((q: any) => ({
          question: q.question.trim(),
          icon: q.icon.trim(),
        }))
        .slice(0, count);

      return formatted.length > 0 ? formatted : getDefaultSuggestedQuestions();
    } catch (parseError) {
      // Fallback: try to extract questions from text format or use keyword matching
      console.error('Failed to parse JSON response:', parseError);
      // Try to extract questions and generate icons based on keywords
      const textQuestions = content
        .split('\n')
        .map((q: string) => q.trim())
        .filter((q: string) => q.length > 0 && !q.match(/^\d+[\.\)]/))
        .slice(0, count);
      
      if (textQuestions.length > 0) {
        return textQuestions.map((q: string) => ({
          question: q,
          icon: getIconForQuestion(q),
        }));
      }
      
      return getDefaultSuggestedQuestions();
    }
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

