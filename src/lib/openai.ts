/**
 * OpenAI API integration for generating suggested follow-up questions
 */

export interface SuggestedQuestion {
  question: string;
}

/**
 * Generate suggested follow-up questions based on the conversation context
 */
export async function generateSuggestedQuestions(
  userQuestion: string,
  aiResponse: string,
  count: number = 3
): Promise<string[]> {
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
4. Each on a separate line

Return only the questions, one per line, without numbering or bullets.`;

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
            content: 'You are a helpful assistant that generates relevant follow-up questions for credit card conversations.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API error:', errorData);
      return getDefaultSuggestedQuestions();
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';
    
    // Parse the questions from the response
    const questions = content
      .split('\n')
      .map((q: string) => q.trim())
      .filter((q: string) => q.length > 0 && !q.match(/^\d+[\.\)]/))
      .slice(0, count);

    return questions.length > 0 ? questions : getDefaultSuggestedQuestions();
  } catch (error) {
    console.error('Failed to generate suggested questions:', error);
    return getDefaultSuggestedQuestions();
  }
}

/**
 * Get default suggested questions if OpenAI is not available
 */
function getDefaultSuggestedQuestions(): string[] {
  return [
    'Tell me more about this',
    'What are the benefits?',
    'How do I apply?',
  ];
}

