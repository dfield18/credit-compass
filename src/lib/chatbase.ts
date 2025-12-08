/**
 * Chatbase API integration
 * Documentation: https://www.chatbase.co/docs/developer-guides/api-integration
 */

export interface ChatbaseMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatbaseResponse {
  answer: string;
  conversationId?: string;
  sources?: Array<{
    title: string;
    url?: string;
  }>;
}

/**
 * Send a message to the Chatbase chatbot
 */
export async function sendMessageToChatbase(
  message: string,
  conversationId?: string,
  history?: ChatbaseMessage[]
): Promise<ChatbaseResponse> {
  const apiKey = import.meta.env.VITE_CHATBASE_API_KEY;
  const chatbotId = import.meta.env.VITE_CHATBASE_CHATBOT_ID;

  // Debug: Check if env vars are loaded
  console.log('Environment check:', {
    hasApiKey: !!apiKey,
    apiKeyLength: apiKey?.length || 0,
    hasChatbotId: !!chatbotId,
    chatbotIdLength: chatbotId?.length || 0,
  });

  if (!apiKey || !chatbotId) {
    throw new Error('Chatbase API key or Chatbot ID is not configured. Please check your environment variables.');
  }

  const url = `https://www.chatbase.co/api/v1/chat`;

  // Build messages array - Chatbase API expects messages array format
  const messagesArray: Array<{ role: string; content: string }> = [];
  
  // Add chat history first (previous messages)
  if (history && history.length > 0) {
    // Filter out the current message from history if it's already there
    const previousHistory = history.filter((msg, idx) => 
      idx < history.length - 1 || msg.content !== message
    );
    
    previousHistory.forEach(msg => {
      messagesArray.push({
        role: msg.role,
        content: msg.content,
      });
    });
  }
  
  // Add current message
  messagesArray.push({
    role: 'user',
    content: message,
  });

  // Build request body according to Chatbase API format
  const requestBody: any = {
    messages: messagesArray,
    chatbotId: chatbotId,
    stream: false,
  };

  // Add conversation ID if provided (or create one)
  const currentConversationId = conversationId || createConversationId();
  requestBody.conversationId = currentConversationId;
  
  // Add contactId (some Chatbase setups may require this)
  // Using a generated ID if not provided
  requestBody.contactId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  try {
    // Log request for debugging (without sensitive data)
    console.log('Sending to Chatbase API:', {
      url,
      hasApiKey: !!apiKey,
      apiKeyPrefix: apiKey ? apiKey.substring(0, 10) + '...' : 'missing',
      hasChatbotId: !!chatbotId,
      chatbotIdValue: chatbotId || 'missing',
      message: message.substring(0, 50) + (message.length > 50 ? '...' : ''),
      messageLength: message.length,
      hasConversationId: !!conversationId,
      historyLength: history?.length || 0,
      requestBody: {
        chatbotId: requestBody.chatbotId,
        messagesCount: requestBody.messages?.length || 0,
        messages: requestBody.messages?.map((m: any) => ({
          role: m.role,
          content: m.content.substring(0, 30) + (m.content.length > 30 ? '...' : ''),
        })) || [],
        stream: requestBody.stream,
        hasConversationId: !!requestBody.conversationId,
      },
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    // Log response status
    console.log('Chatbase API response status:', response.status, response.statusText);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        const text = await response.text();
        errorData = { message: text || `HTTP ${response.status}: ${response.statusText}` };
      }
      
      console.error('Chatbase API error response:', errorData);
      
      // Extract error message from various possible formats
      const errorMessage = 
        errorData.message || 
        errorData.error?.message || 
        errorData.error ||
        errorData.detail ||
        `Chatbase API error: ${response.status} ${response.statusText}`;
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('Chatbase API success response:', { 
      hasText: !!data.text, 
      hasAnswer: !!data.answer,
      hasMessage: !!data.message,
      keys: Object.keys(data)
    });
    
    // Handle different possible response formats
    const answer = data.text || data.answer || data.message || data.response || '';
    
    if (!answer) {
      console.warn('Chatbase API response (no answer found):', data);
      throw new Error('Received empty response from Chatbase API');
    }
    
    return {
      answer: answer,
      conversationId: currentConversationId,
      sources: data.sources || data.references || [],
    };
  } catch (error) {
    console.error('Chatbase API error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to send message to Chatbase');
  }
}

/**
 * Create a new conversation ID
 */
export function createConversationId(): string {
  return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

