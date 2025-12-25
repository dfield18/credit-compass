import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userQuestion, aiResponse, count = 3 } = request.body;

    if (!userQuestion || !aiResponse) {
      return response.status(400).json({ error: 'userQuestion and aiResponse are required' });
    }

    // Get OpenAI API key from server-side environment variable (NOT VITE_ prefixed)
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // If OpenAI API key is not configured, return default questions
      return response.status(200).json({
        questions: [
          { question: 'Tell me more about this', icon: '💳' },
          { question: 'What are the benefits?', icon: '🎁' },
          { question: 'How do I apply?', icon: '📝' },
        ],
      });
    }

    const url = 'https://api.openai.com/v1/chat/completions';

    const prompt = `Based on the following conversation about credit cards, generate ${count} concise, relevant follow-up questions that a user might want to ask. Each question should be a single sentence and should be specific to the context.

User Question: "${userQuestion}"

AI Response: "${aiResponse}"

Generate ${count} follow-up questions that are:
1. Relevant to the conversation
2. Specific and actionable
3. Natural and conversational
4. Maximum 18 words each

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

    const openaiResponse = await fetch(url, {
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

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json().catch(() => ({}));
      console.error('OpenAI API error:', errorData);
      // Return default questions on error
      return response.status(200).json({
        questions: [
          { question: 'Tell me more about this', icon: '💳' },
          { question: 'What are the benefits?', icon: '🎁' },
          { question: 'How do I apply?', icon: '📝' },
        ],
      });
    }

    const data = await openaiResponse.json();
    const content = data.choices?.[0]?.message?.content || '';

    try {
      // Parse as JSON object
      const parsed = JSON.parse(content);
      const questions = parsed.questions || parsed.results || [];

      // Helper function to count words
      const countWords = (text: string): number => {
        return text.trim().split(/\s+/).filter(word => word.length > 0).length;
      };

      // Helper function to truncate to 18 words
      const truncateTo18Words = (text: string): string => {
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        if (words.length <= 18) return text.trim();
        return words.slice(0, 18).join(' ') + '...';
      };

      // Helper function to get icon for a question based on keywords
      const getIconForQuestion = (question: string): string => {
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
      };

      // Validate and format the questions
      const formatted = questions
        .filter((q: any) => q && q.question && q.icon)
        .map((q: any) => {
          const question = q.question.trim();
          // Truncate to 18 words if needed
          const truncatedQuestion = countWords(question) > 18
            ? truncateTo18Words(question)
            : question;
          return {
            question: truncatedQuestion,
            icon: q.icon.trim(),
          };
        })
        .slice(0, count);

      if (formatted.length > 0) {
        return response.status(200).json({ questions: formatted });
      }

      // Fallback: try to extract questions from text format or use keyword matching
      const textQuestions = content
        .split('\n')
        .map((q: string) => q.trim())
        .filter((q: string) => q.length > 0 && !q.match(/^\d+[\.\)]/))
        .slice(0, count);

      if (textQuestions.length > 0) {
        return response.status(200).json({
          questions: textQuestions.map((q: string) => ({
            question: q,
            icon: getIconForQuestion(q),
          })),
        });
      }

      // Return default questions if parsing fails
      return response.status(200).json({
        questions: [
          { question: 'Tell me more about this', icon: '💳' },
          { question: 'What are the benefits?', icon: '🎁' },
          { question: 'How do I apply?', icon: '📝' },
        ],
      });
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      // Return default questions on parse error
      return response.status(200).json({
        questions: [
          { question: 'Tell me more about this', icon: '💳' },
          { question: 'What are the benefits?', icon: '🎁' },
          { question: 'How do I apply?', icon: '📝' },
        ],
      });
    }
  } catch (error) {
    console.error('Failed to generate suggested questions:', error);
    // Return default questions on any error
    return response.status(200).json({
      questions: [
        { question: 'Tell me more about this', icon: '💳' },
        { question: 'What are the benefits?', icon: '🎁' },
        { question: 'How do I apply?', icon: '📝' },
      ],
    });
  }
}

