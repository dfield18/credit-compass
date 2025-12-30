import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Loader2, BookOpen, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { sendMessageToChatbase, createConversationId, type ChatbaseMessage } from "@/lib/chatbase";
import { generateSuggestedQuestions, type SuggestedQuestion } from "@/lib/openai";
import AnimatedCreditCard from "./AnimatedCreditCard";

interface ChatbotProps {
  initialQuestion?: string;
  onSuggestedQuestionClick?: (question: string) => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

/**
 * Parse step-based responses into structured format
 */
interface Step3Data {
  title: string;
  description: string;
  keyThings: Array<{
    headline: string;
    text: string;
  }>;
}

interface Step4Data {
  url: string;
  text: string;
}

interface CreditCard {
  name: string;
  url: string;
  description: string;
  highlights2: string[];
  highlights5?: string[];
}

interface Step5Data {
  intro: string;
  cards: CreditCard[];
}

interface ParsedStep {
  number: number;
  content: string;
  isStep3?: boolean;
  step3Data?: Step3Data;
  isStep4?: boolean;
  step4Data?: Step4Data;
  isStep5?: boolean;
  step5Data?: Step5Data;
}

interface ParsedResponse {
  hasSteps: boolean;
  intro?: string;
  steps: ParsedStep[];
  conclusion?: string;
}

/**
 * Parse Step 3 structured format
 */
const parseStep3 = (content: string): Step3Data | null => {
  // The format can be:
  // "TITLE Description: ... Key Things to Know: headline: ... text: ..."
  // OR
  // "Title: TITLE Description: ... Key Things to Know: headline: ... text: ..."
  
  let title = '';
  let description = '';
  
  // Try to find Title: first (if present)
  const titleWithLabelMatch = content.match(/Title:\s*(.+?)(?:\s*Description:|$)/is);
  if (titleWithLabelMatch) {
    title = titleWithLabelMatch[1]?.trim() || '';
  } else {
    // If no "Title:" label, extract text before "Description:"
    // This handles cases like "APR Description: ..."
    const beforeDescriptionMatch = content.match(/^(.+?)\s+Description:/is);
    if (beforeDescriptionMatch) {
      title = beforeDescriptionMatch[1]?.trim() || '';
    }
  }
  
  // Extract Description - look for "Description:" followed by text until "Key Things to Know:" or "headline:"
  // Use non-greedy match to stop at the first occurrence
  const descriptionMatch = content.match(/Description:\s*(.+?)(?:\s*(?:Key Things to Know:|headline:))/is);
  if (descriptionMatch && descriptionMatch[1]) {
    description = descriptionMatch[1].trim();
  }
  
  // Debug logging
  if (!title || !description) {
    console.log('parseStep3 - Title:', title, 'Description:', description);
  }

  // Extract Key Things to Know items
  // Look for "headline:" followed by text, then "text:" followed by text
  // Continue until next "headline:" or end
  // Handle both with and without "Key Things to Know:" prefix
  const keyThingsStartIndex = content.search(/(?:Key Things to Know:|headline:)/i);
  const keyThingsSection = keyThingsStartIndex >= 0 ? content.substring(keyThingsStartIndex) : content;
  
  // Match headline: ... text: ... pattern
  // The format is: "headline: Includes Fees text: Reflects interest..."
  // Try with space requirement first, then without
  let keyThingsPattern = /headline:\s*(.+?)\s+text:\s*(.+?)(?=\s+headline:|$)/gis;
  let keyThingsMatches = Array.from(keyThingsSection.matchAll(keyThingsPattern));
  
  // If no matches, try without requiring space between headline value and "text:"
  if (keyThingsMatches.length === 0) {
    keyThingsPattern = /headline:\s*(.+?)\s*text:\s*(.+?)(?=\s*headline:|$)/gis;
    keyThingsMatches = Array.from(keyThingsSection.matchAll(keyThingsPattern));
  }
  
  const keyThings = keyThingsMatches
    .map((match) => ({
      headline: match[1]?.trim() || '',
      text: match[2]?.trim() || '',
    }))
    .filter((item) => item.headline && item.text);

  if (title && description && keyThings.length > 0) {
    return { title, description, keyThings };
  }

  return null;
};

/**
 * Parse Step 4 structured format
 */
const parseStep4 = (content: string): Step4Data | null => {
  // Format: "URL: <URL> <text>" or "url: <URL> <text>"
  // The URL comes first, then the text follows immediately after
  
  let url = '';
  let text = '';
  
  // Try to extract URL - look for "URL:" or "url:" followed by URL
  // URL pattern: http:// or https:// followed by non-whitespace characters
  const urlMatch1 = content.match(/(?:URL|url):\s*(https?:\/\/[^\s]+)/i);
  if (urlMatch1) {
    url = urlMatch1[1]?.trim() || '';
    // Extract text after the URL (everything after the URL)
    const urlEndIndex = urlMatch1.index! + urlMatch1[0].length;
    text = content.substring(urlEndIndex).trim();
  } else {
    // Try without colon: "URL <URL>" or "url <URL>"
    const urlMatch2 = content.match(/(?:URL|url)\s+(https?:\/\/[^\s]+)/i);
    if (urlMatch2) {
      url = urlMatch2[1]?.trim() || '';
      // Extract text after the URL
      const urlEndIndex = urlMatch2.index! + urlMatch2[0].length;
      text = content.substring(urlEndIndex).trim();
    } else {
      // Fallback: look for any URL in the content
      const urlPattern = /(https?:\/\/[^\s]+)/i;
      const urlMatch3 = content.match(urlPattern);
      if (urlMatch3) {
        url = urlMatch3[1]?.trim() || '';
        // Extract text after the URL
        const urlEndIndex = urlMatch3.index! + urlMatch3[0].length;
        text = content.substring(urlEndIndex).trim();
      }
    }
  }
  
  // Clean up text - remove any remaining "Step 4:" or "STEP 4:" markers
  if (text) {
    text = text.replace(/^(?:Step\s*4|STEP\s*4):\s*/i, '').trim();
  }
  
  if (url && text) {
    return { url, text };
  }
  
  return null;
};

/**
 * Parse Step 5 structured format
 */
const parseStep5 = (content: string): Step5Data | null => {
  // Format:
  // Response: <intro sentence>
  // Credit Card Name: <name>
  // URL: <url>
  // 1 sentence description: <description>
  // 2 highlights: <highlight1>, <highlight2>
  // 5 highlights: <h1>, <h2>, <h3>, <h4>, <h5>
  // (repeated 3 times)
  
  // Handle both formatted (with newlines) and unformatted (all text together) responses
  // First, try to normalize by adding spaces before field labels if they're missing
  // This helps when text runs together like "description: text URL: http://..."
  
  // Extract intro from "Response:" - handle both newline and space-separated formats
  const responseMatch = content.match(/Response:\s*(.+?)(?:\s+Credit Card Name:|$)/is);
  const intro = responseMatch?.[1]?.trim() || '';
  
  if (!intro) {
    return null;
  }
  
  // Split content by "Credit Card Name:" to get individual cards
  // Handle both newline and space-separated formats
  const cardSections = content.split(/Credit Card Name:/i).filter(section => section.trim());
  
  // Skip the first section as it contains the "Response:" intro
  // Process only sections that contain card data (starting from index 1)
  const cards: CreditCard[] = [];
  
  for (let i = 1; i < cardSections.length; i++) {
    const section = cardSections[i].trim();
    if (!section) continue;
    
    // Extract card name - handle both newline and space-separated formats
    // Name is everything until "URL:" (with optional newline or space before URL:)
    const nameMatch = section.match(/^(.+?)(?:\s+URL:|$)/is);
    const name = nameMatch?.[1]?.trim() || '';
    
    // Extract URL - handle both newline and space-separated formats
    const urlMatch = section.match(/URL:\s*(https?:\/\/[^\s]+)/i);
    const url = urlMatch?.[1]?.trim() || '';
    
    // Extract 1 sentence description - handle both newline and space-separated formats
    // Look for "1 sentence description:" followed by text until "2 highlights", "5 highlights", or "Credit Card Name"
    const descMatch = section.match(/1 sentence description:\s*(.+?)(?:\s+(?:2 highlights|5 highlights|Credit Card Name):|$)/is);
    const description = descMatch?.[1]?.trim() || '';
    
    // Extract 2 highlights - handle both newline and space-separated formats
    // Look for "2 highlights:" followed by text until "5 highlights" or "Credit Card Name"
    const highlights2Match = section.match(/2 highlights:\s*(.+?)(?:\s+(?:5 highlights|Credit Card Name):|$)/is);
    let highlights2: string[] = [];
    if (highlights2Match) {
      const highlightsText = highlights2Match[1]?.trim() || '';
      // Split by semicolon, comma, or newline - semicolons are common in the unformatted version
      highlights2 = highlightsText.split(/[;,\n]/).map(h => h.trim()).filter(h => h.length > 0);
    }
    
    // Extract 5 highlights (optional) - handle both newline and space-separated formats
    // Look for "5 highlights:" followed by text until "Credit Card Name" or end
    const highlights5Match = section.match(/5 highlights:\s*(.+?)(?:\s+Credit Card Name:|$)/is);
    let highlights5: string[] = [];
    if (highlights5Match) {
      const highlightsText = highlights5Match[1]?.trim() || '';
      // Split by semicolon, comma, or newline - semicolons are common in the unformatted version
      highlights5 = highlightsText.split(/[;,\n]/).map(h => h.trim()).filter(h => h.length > 0);
      // Limit to 5 highlights max to avoid capturing conclusion text that might be mixed in
      // Conclusion text typically doesn't follow the semicolon pattern
      if (highlights5.length > 5) {
        highlights5 = highlights5.slice(0, 5);
      }
    }
    
    if (name && url && description && highlights2.length >= 2) {
      cards.push({
        name,
        url,
        description,
        highlights2,
        highlights5: highlights5.length > 0 ? highlights5 : undefined,
      });
    }
  }
  
  if (cards.length >= 3) {
    return { intro, cards: cards.slice(0, 3) };
  }
  
  return null;
};

const parseStepResponse = (response: string): ParsedResponse => {
  try {
    if (!response || typeof response !== 'string') {
      return { hasSteps: false, steps: [] };
    }
    
    // Check if response contains step patterns (Step 1, Step 2, STEP 1, STEP 2, etc.)
    // Match "Step X" or "STEP X" followed by optional separator and content
    // Pattern: Match Step/STEP at start of string or after newline, followed by number, then separator, then content
    let stepPattern = /(?:^|\n)(Step\s*(\d+)|STEP\s*(\d+))[:\s\-\.]+\s*(.+?)(?=\n(?:Step\s*\d+|STEP\s*\d+)|$)/gis;
    
    let matches = Array.from(response.matchAll(stepPattern));
  
  // If no matches, try a more flexible pattern (without requiring newline before next step)
  if (matches.length === 0) {
    stepPattern = /(?:^|\n)(Step\s*(\d+)|STEP\s*(\d+))[:\s\-\.]+\s*(.+?)(?=(?:Step\s*\d+|STEP\s*\d+)|$)/gis;
    matches = Array.from(response.matchAll(stepPattern));
  }
  
  // If still no matches and response starts with Step, try matching the entire response as a single step
  if (matches.length === 0) {
    const startsWithStep = /^(Step\s*(\d+)|STEP\s*(\d+))[:\s\-\.]+\s*(.+)$/is.exec(response);
    if (startsWithStep) {
      matches = [startsWithStep];
      console.log('Matched single step at start using fallback pattern');
    }
  }
  
  if (matches.length === 0) {
    return { hasSteps: false, steps: [] };
  }
  
  console.log('Found', matches.length, 'steps in response');

  const steps: ParsedStep[] = matches.map((match, index) => {
    const stepNumber = parseInt(match[2] || match[3] || '1', 10);
    let content = match[4]?.trim() || '';
    
    console.log(`Step ${stepNumber} detected. Content preview:`, content.substring(0, 100));
    
    // Remove any remaining step number references from the content
    content = content.replace(/^(Step\s*\d+|STEP\s*\d+)[:\s\-\.]+\s*/i, '').trim();
    
    // Check if this is Step 3 and parse it
    if (stepNumber === 3) {
      const step3Data = parseStep3(content);
      if (step3Data) {
        console.log('Step 3 parsed successfully');
        return { number: stepNumber, content, isStep3: true, step3Data };
      }
      // If parsing failed, log for debugging
      console.log('Step 3 parsing failed. Content:', content.substring(0, 200));
    }
    
    // Check if this is Step 4 and parse it
    if (stepNumber === 4) {
      const step4Data = parseStep4(content);
      if (step4Data) {
        console.log('Step 4 parsed successfully');
        return { number: stepNumber, content, isStep4: true, step4Data };
      }
      // If parsing failed, log for debugging
      console.log('Step 4 parsing failed. Content:', content.substring(0, 200));
    }
    
    // Check if this is Step 5 and parse it
    if (stepNumber === 5) {
      const step5Data = parseStep5(content);
      if (step5Data) {
        console.log('Step 5 parsed successfully');
        return { number: stepNumber, content, isStep5: true, step5Data };
      }
      // If parsing failed, log for debugging
      console.log('Step 5 parsing failed. Content:', content.substring(0, 200));
    }
    
    // For Step 1 and Step 2, just return the content without step number
    return { number: stepNumber, content };
  });

  // Extract intro (text before first step)
  const firstStepMatch = response.match(/(?:^|\n)(Step\s*\d+|STEP\s*\d+)/i);
  const firstStepIndex = firstStepMatch?.index ?? -1;
  const intro = firstStepIndex > 0 ? response.substring(0, firstStepIndex).trim() : undefined;

  // Extract conclusion (text after last step)
  if (matches.length > 0) {
    const lastMatch = matches[matches.length - 1];
    const lastStepEnd = (lastMatch.index ?? 0) + (lastMatch[0]?.length ?? 0);
    const remainingText = response.substring(lastStepEnd).trim();
    const conclusion = remainingText.length > 0 ? remainingText : undefined;
    
    return {
      hasSteps: true,
      intro,
      steps,
      conclusion,
    };
  }

    return {
      hasSteps: true,
      intro,
      steps,
    };
  } catch (error) {
    console.error('Error in parseStepResponse:', error);
    return { hasSteps: false, steps: [] };
  }
};

/**
 * Generate cartoon URLs (cartoons are numbered 1-10)
 */
const generateCartoonUrls = (): string[] => {
  const urls: string[] = [];
  for (let i = 1; i <= 10; i++) {
    urls.push(`https://raw.githubusercontent.com/dfield18/cartoons/main/mobile/cartoon${i}.png`);
  }
  // Use Fisher-Yates shuffle for better randomness
  for (let i = urls.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [urls[i], urls[j]] = [urls[j], urls[i]];
  }
  console.log('Generated and shuffled cartoon URLs. First 5:', urls.slice(0, 5));
  return urls;
};

const Chatbot = ({ initialQuestion, onSuggestedQuestionClick }: ChatbotProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<SuggestedQuestion[]>([]);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [conversationHistory, setConversationHistory] = useState<ChatbaseMessage[]>([]);
  const [currentCartoon, setCurrentCartoon] = useState<string | null>(null);
  const availableCartoonsRef = useRef<string[]>(generateCartoonUrls());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const userMessageRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const inputRef = useRef<HTMLInputElement>(null);
  const processedInitialQuestionRef = useRef<string | null>(null);
  const isInitializingRef = useRef<boolean>(false);

  /**
   * Get a random cartoon that hasn't been shown yet
   * Ensures no repeats until all cartoons have been shown, then resets
   * Uses Math.random() for true randomness each time
   */
  const getRandomCartoon = (): string => {
    console.log('=== getRandomCartoon called ===');
    console.log('Current available count:', availableCartoonsRef.current.length);
    console.log('First 5 available:', availableCartoonsRef.current.slice(0, 5));
    
    // If all cartoons have been shown, reset the available list (shuffled)
    if (availableCartoonsRef.current.length === 0) {
      console.log('All cartoons shown, resetting...');
      availableCartoonsRef.current = generateCartoonUrls();
      console.log('After reset, count:', availableCartoonsRef.current.length);
      console.log('First 5 after reset:', availableCartoonsRef.current.slice(0, 5));
    }

    // Pick a truly random index from available cartoons
    const randomValue = Math.random();
    const randomIndex = Math.floor(randomValue * availableCartoonsRef.current.length);
    const selected = availableCartoonsRef.current[randomIndex];
    
    console.log('Random value:', randomValue);
    console.log('Random index:', randomIndex, 'out of', availableCartoonsRef.current.length);
    console.log('Selected cartoon:', selected);
    
    // Remove the selected cartoon from available list
    const beforeLength = availableCartoonsRef.current.length;
    availableCartoonsRef.current = availableCartoonsRef.current.filter((_, idx) => idx !== randomIndex);
    const afterLength = availableCartoonsRef.current.length;
    
    console.log('Removed from list. Before:', beforeLength, 'After:', afterLength);
    console.log('Remaining first 3:', availableCartoonsRef.current.slice(0, 3));
    console.log('=== End getRandomCartoon ===');
    
    return selected;
  };

  // Scroll behavior: scroll to user's most recent question when assistant responds (both desktop and mobile)
  useEffect(() => {
    if (messages.length > 0) {
      // Find the last user message index
      let lastUserMessageIndex = -1;
      for (let i = messages.length - 1; i >= 0; i--) {
        if (messages[i].role === 'user') {
          lastUserMessageIndex = i;
          break;
        }
      }
      
      // If we have a user message and the last message is from assistant, scroll page so entire user question is visible
      if (lastUserMessageIndex >= 0 && messages[messages.length - 1].role === 'assistant') {
        const userMessageElement = userMessageRefs.current.get(lastUserMessageIndex);
        if (userMessageElement) {
          // Use setTimeout to ensure DOM is updated
          setTimeout(() => {
            if (userMessageElement) {
              // Get the header height (sticky header)
              const header = document.querySelector('header');
              const headerHeight = header ? header.getBoundingClientRect().height : 64;
              
              // Calculate position to ensure entire user message is visible
              const elementRect = userMessageElement.getBoundingClientRect();
              const elementTop = elementRect.top + window.pageYOffset;
              const padding = 16; // Extra padding for spacing
              
              // Scroll so the user message starts just below the header with padding
              window.scrollTo({ 
                top: elementTop - headerHeight - padding, 
                behavior: "smooth" 
              });
            }
          }, 150);
        }
      }
    }
  }, [messages]);

  // Initialize with initial question if provided
  useEffect(() => {
    // Skip if no initial question or if we've already processed this question
    if (!initialQuestion || initialQuestion === processedInitialQuestionRef.current) {
      return;
    }

    // Mark that we're processing this question
    const questionToProcess = initialQuestion;
    processedInitialQuestionRef.current = questionToProcess;
    isInitializingRef.current = true;

    // Check if we need to reset (if there are existing messages)
    const needsReset = messages.length > 0;
    
    if (needsReset) {
      // Reset conversation state first
      setMessages([]);
      setConversationHistory([]);
      setConversationId(undefined);
      setSuggestedQuestions([]);
      
      // Wait a bit for state to reset, then send message
      const resetTimer = setTimeout(() => {
        isInitializingRef.current = true;
        handleSendMessage(questionToProcess);
      }, 50);
      return () => clearTimeout(resetTimer);
    } else {
      // No existing messages, send immediately
      const timer = setTimeout(() => {
        handleSendMessage(questionToProcess);
      }, 0);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuestion]);

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    // Navigate to recommendations page if not already there
    if (location.pathname !== '/recommendations') {
      navigate(`/recommendations?q=${encodeURIComponent(messageText.trim())}`);
      return; // The navigation will cause a re-render with the new initialQuestion
    }

    // If already on recommendations page, just send the message
    const userMessage: Message = {
      role: 'user',
      content: messageText.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setSuggestedQuestions([]);
    
    // Clear previous cartoon first, then set a NEW random cartoon for THIS question
    // This ensures each question gets a unique random cartoon
    setCurrentCartoon(null);
    const cartoonUrl = getRandomCartoon();
    console.log('Setting new random cartoon for question:', messageText.trim(), 'Cartoon URL:', cartoonUrl);
    console.log('Available cartoons remaining:', availableCartoonsRef.current.length);
    console.log('Available cartoons:', availableCartoonsRef.current.slice(0, 5), '...');
    setCurrentCartoon(cartoonUrl);

    // Create conversation ID if it doesn't exist
    const currentConversationId = conversationId || createConversationId();
    if (!conversationId) {
      setConversationId(currentConversationId);
    }

    // Update conversation history
    const updatedHistory: ChatbaseMessage[] = [
      ...conversationHistory,
      { role: 'user', content: messageText.trim() },
    ];
    setConversationHistory(updatedHistory);

    try {
      // Send message to Chatbase
      const response = await sendMessageToChatbase(
        messageText.trim(),
        currentConversationId,
        updatedHistory
      );

      console.log('Chatbase response received:', response);

      // Update conversation ID if returned from API
      if (response.conversationId && response.conversationId !== currentConversationId) {
        setConversationId(response.conversationId);
      }

      if (!response.answer) {
        console.error('No answer in response:', response);
        throw new Error('No answer received from API');
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.answer,
        timestamp: new Date(),
      };

      console.log('Adding assistant message:', assistantMessage);
      setMessages((prev) => {
        const newMessages = [...prev, assistantMessage];
        console.log('Updated messages:', newMessages);
        return newMessages;
      });
      
      // Update conversation history with assistant response
      const finalHistory: ChatbaseMessage[] = [
        ...updatedHistory,
        { role: 'assistant', content: response.answer },
      ];
      setConversationHistory(finalHistory);

      // Generate suggested follow-up questions (use original answer for context)
      try {
        const suggestions = await generateSuggestedQuestions(
          messageText.trim(),
          response.answer,
          3
        );
        setSuggestedQuestions(suggestions);
      } catch (error) {
        console.error('Failed to generate suggested questions:', error);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: error instanceof Error 
          ? `Sorry, I encountered an error: ${error.message}` 
          : 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      isInitializingRef.current = false;
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleSuggestedQuestionClick = (question: string) => {
    // Always navigate to recommendations page with the question
    navigate(`/recommendations?q=${encodeURIComponent(question)}`);
  };
  
  // Helper function to get icon background color based on icon
  const getIconBgColor = (icon: string): string => {
    // Different background colors for different icon types
    if (icon.includes('✈️') || icon.includes('🌍') || icon.includes('🏖️')) {
      return 'bg-blue-100 dark:bg-blue-900/30'; // Light blue for travel
    } else if (icon.includes('💰') || icon.includes('💵') || icon.includes('💸')) {
      return 'bg-yellow-100 dark:bg-yellow-900/30'; // Light yellow/gold for money
    } else if (icon.includes('💳') || icon.includes('💎')) {
      return 'bg-purple-100 dark:bg-purple-900/30'; // Light purple for cards
    } else if (icon.includes('🎁') || icon.includes('⭐') || icon.includes('🏆')) {
      return 'bg-pink-100 dark:bg-pink-900/30'; // Light pink for rewards
    }
    return 'bg-mint-light dark:bg-mint/20'; // Default mint color
  };

  return (
    <div className="w-full flex flex-col h-full">
      {/* Messages Container */}
      <div ref={messagesContainerRef} className={`flex-1 space-y-4 md:space-y-6 mb-6 md:mb-8 ${isLoading ? 'overflow-hidden' : 'overflow-y-auto'}`}>
        {messages.length === 0 && !initialQuestion && !isLoading && (
          <div className="text-center text-muted-foreground py-6 md:py-8">
            <Sparkles className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 text-mint/50" />
            <p className="text-sm md:text-base">Ask me anything about credit cards!</p>
          </div>
        )}
        
        {/* Show loading state when initialQuestion is set but no messages yet (before AnimatedCreditCard appears) */}
        {messages.length === 0 && initialQuestion && !isLoading && (
          <div className="text-center text-muted-foreground py-6 md:py-8">
            <Sparkles className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 text-mint/50 animate-pulse" />
            <p className="text-sm md:text-base">Preparing your question...</p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            ref={message.role === 'user' ? (el) => {
              if (el) userMessageRefs.current.set(index, el);
              else userMessageRefs.current.delete(index);
            } : undefined}
            className={`w-full ${message.role === 'user' ? 'flex justify-end' : 'grid grid-cols-[auto_1fr] gap-2 md:gap-4'}`}
          >
            {message.role === 'assistant' && (
              <div className="flex-shrink-0">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-mint to-coral flex items-center justify-center shadow-soft">
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
              </div>
            )}
            <div className={`min-w-0 ${message.role === 'user' ? 'max-w-[85%] md:max-w-md' : ''}`}>
              {message.role === 'user' ? (
                <div className="bg-mint/10 border border-mint/20 rounded-xl md:rounded-2xl rounded-br-md px-4 py-3 md:px-5 md:py-4">
                  <p className="text-sm md:text-base text-foreground">{message.content}</p>
                </div>
              ) : (
                <div className="bg-card border border-border rounded-xl md:rounded-2xl rounded-tl-md p-4 md:p-6 shadow-soft">
                  {(() => {
                    try {
                      const parsed = parseStepResponse(message.content);
                      if (parsed.hasSteps && parsed.steps.length > 0) {
                      return (
                        <div className="space-y-6">
                          {parsed.intro && (
                            <p className="text-sm md:text-base text-foreground leading-relaxed">{parsed.intro}</p>
                          )}
                          <div className="space-y-3 md:space-y-4">
                            {parsed.steps.map((step) => {
                              // Special rendering for Step 3
                              if (step.isStep3 && step.step3Data) {
                                return (
                                  <div key={step.number} className="space-y-4 md:space-y-5">
                                    {/* Title */}
                                    <h2 className="font-display font-semibold text-lg md:text-xl text-foreground">
                                      {step.step3Data.title}
                                    </h2>
                                    
                                    {/* Description */}
                                    <p className="text-sm md:text-base text-foreground leading-relaxed">
                                      {step.step3Data.description}
                                    </p>
                                    
                                    {/* Key Things to Know */}
                                    <div className="bg-card border border-border rounded-xl md:rounded-2xl p-4 md:p-6 shadow-soft">
                                      <h3 className="font-display font-semibold text-base md:text-lg text-foreground mb-3 md:mb-4 flex items-center gap-2">
                                        <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-mint" />
                                        Key Things to Know
                                      </h3>
                                      <div className="space-y-3 md:space-y-4">
                                        {step.step3Data.keyThings.map((item, index) => (
                                          <div key={index}>
                                            <p className="font-medium text-sm md:text-base text-foreground">{item.headline}</p>
                                            <p className="text-xs md:text-sm text-muted-foreground">{item.text}</p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                              
                              // Special rendering for Step 4
                              if (step.isStep4 && step.step4Data) {
                                return (
                                  <div key={step.number} className="space-y-3 md:space-y-4">
                                    {/* Main text */}
                                    <p className="text-sm md:text-base text-foreground leading-relaxed">
                                      {step.step4Data.text}
                                    </p>
                                    
                                    {/* Apply Now button */}
                                    <Button 
                                      asChild
                                      className="bg-mint hover:bg-mint/90 text-white rounded-lg md:rounded-xl text-sm md:text-base px-4 md:px-6 py-2 md:py-2.5 w-full sm:w-auto"
                                    >
                                      <a 
                                        href={step.step4Data.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                      >
                                        Apply Now
                                        <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
                                      </a>
                                    </Button>
                                  </div>
                                );
                              }
                              
                              // Special rendering for Step 5
                              if (step.isStep5 && step.step5Data) {
                                return (
                                  <div key={step.number} className="space-y-4 md:space-y-6">
                                    {/* Intro text */}
                                    <p className="text-sm md:text-base text-foreground leading-relaxed">
                                      {step.step5Data.intro}
                                    </p>
                                    
                                    {/* Card List */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                                      {step.step5Data.cards.map((card, cardIndex) => (
                                        <div 
                                          key={cardIndex}
                                          className="bg-card border border-border rounded-xl md:rounded-2xl p-4 md:p-5 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col"
                                        >
                                          {/* Credit Card Name */}
                                          <h3 className="font-display font-semibold text-sm md:text-base text-foreground mb-2 md:mb-3">
                                            {card.name}
                                          </h3>
                                          
                                          {/* 1 sentence description */}
                                          <p className="text-xs md:text-sm text-foreground leading-relaxed mb-3 md:mb-4 flex-1">
                                            {card.description}
                                          </p>
                                          
                                          {/* 2 highlights */}
                                          <div className="space-y-1 md:space-y-1.5 mb-3 md:mb-4">
                                            {card.highlights2.map((highlight, idx) => (
                                              <div key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                                                <span className="text-mint">•</span>
                                                <span>{highlight}</span>
                                              </div>
                                            ))}
                                          </div>
                                          
                                          {/* Apply Now button */}
                                          <Button 
                                            asChild
                                            className="w-full bg-mint hover:bg-mint/90 text-white mt-auto text-xs md:text-sm px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl touch-manipulation"
                                          >
                                            <a 
                                              href={card.url} 
                                              target="_blank" 
                                              rel="noopener noreferrer"
                                            >
                                              Apply Now
                                              <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
                                            </a>
                                          </Button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                );
                              }
                              
                              // Regular step rendering
                              return (
                                <div key={step.number}>
                                  <p className="text-sm md:text-base text-foreground leading-relaxed">{step.content}</p>
                                </div>
                              );
                            })}
                          </div>
                          {parsed.conclusion && (
                            <p className="text-sm md:text-base text-foreground leading-relaxed pt-2">{parsed.conclusion}</p>
                          )}
                        </div>
                      );
                    }
                    return (
                      <p className="text-sm md:text-base text-foreground whitespace-pre-wrap leading-relaxed">
                        {message.content}
                      </p>
                    );
                    } catch (error) {
                      console.error('Error parsing message:', error);
                      return (
                        <p className="text-sm md:text-base text-foreground whitespace-pre-wrap leading-relaxed">
                          {message.content}
                        </p>
                      );
                    }
                  })()}
                  <p className="text-xs md:text-sm text-muted-foreground mt-4 md:mt-6">
                    We do our best to keep credit card info current, but details can change quickly. Always check the issuer's terms before you apply.
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex flex-col items-center gap-4">
            <AnimatedCreditCard />
            {currentCartoon && (
              <img 
                src={currentCartoon} 
                alt="Cartoon" 
                className="max-w-full h-auto rounded-lg shadow-sm"
                style={{ maxWidth: '394px' }}
                onError={(e) => {
                  // Fallback if image doesn't exist - try a different number (1-10)
                  const target = e.target as HTMLImageElement;
                  const randomNum = Math.floor(Math.random() * 10) + 1;
                  target.src = `https://raw.githubusercontent.com/dfield18/cartoons/main/mobile/cartoon${randomNum}.png`;
                }}
              />
            )}
          </div>
        )}

        {/* Suggested Questions */}
        {suggestedQuestions.length > 0 && !isLoading && (
          <div className="space-y-2 md:space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs md:text-sm font-medium text-muted-foreground">You might also ask:</span>
            </div>
            <div className="flex flex-col gap-2">
              {suggestedQuestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestionClick(suggestion.question)}
                  className="inline-flex items-center px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm font-medium text-secondary-foreground bg-secondary hover:bg-secondary/80 rounded-full transition-all duration-200 cursor-pointer hover:shadow-sm w-full sm:w-fit touch-manipulation text-left"
                >
                  {suggestion.question}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3 md:mt-4 max-w-2xl">
              Some of the credit cards on this site are from partners who pay us when you click or apply. This helps keep the site running, but it does not influence our recommendations.
            </p>
            {currentCartoon && (
              <div className="flex justify-center mt-4">
                <img 
                  src={currentCartoon} 
                  alt="Cartoon" 
                  className="max-w-full h-auto rounded-lg shadow-sm"
                  style={{ maxWidth: '394px' }}
                  onError={(e) => {
                    // Fallback if image doesn't exist - try a different number (1-10)
                    const target = e.target as HTMLImageElement;
                    const randomNum = Math.floor(Math.random() * 10) + 1;
                    target.src = `https://raw.githubusercontent.com/dfield18/cartoons/main/mobile/cartoon${randomNum}.png`;
                  }}
                />
              </div>
            )}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      {!isLoading && (
        <form onSubmit={handleSubmit} className="sticky bottom-0 bg-background/80 backdrop-blur-xl pt-3 md:pt-4 pb-4 md:pb-6 border-t border-border">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask a question about credit cards..."
            className="w-full px-4 md:px-5 py-3 md:py-4 pr-20 md:pr-24 rounded-xl md:rounded-2xl border border-border bg-card text-sm md:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-mint/50 focus:border-mint shadow-soft"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="absolute right-1.5 md:right-2 top-1/2 -translate-y-1/2 bg-mint hover:bg-mint/90 text-white rounded-lg md:rounded-xl disabled:opacity-50 text-xs md:text-sm px-3 md:px-4 py-2 md:py-2.5 touch-manipulation"
          >
            {isLoading ? (
              <Loader2 className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 animate-spin" />
            ) : (
              <Send className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
            )}
            <span className="hidden sm:inline">Ask</span>
          </Button>
        </div>
      </form>
      )}
    </div>
  );
};

export default Chatbot;

