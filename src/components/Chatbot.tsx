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

const Chatbot = ({ initialQuestion, onSuggestedQuestionClick }: ChatbotProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<SuggestedQuestion[]>([]);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [conversationHistory, setConversationHistory] = useState<ChatbaseMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const processedInitialQuestionRef = useRef<string | null>(null);
  const isInitializingRef = useRef<boolean>(false);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
      <div className={`flex-1 space-y-6 mb-8 ${isLoading ? 'overflow-hidden' : 'overflow-y-auto'}`}>
        {messages.length === 0 && !initialQuestion && !isLoading && (
          <div className="text-center text-muted-foreground py-8">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-mint/50" />
            <p>Ask me anything about credit cards!</p>
          </div>
        )}
        
        {/* Show loading state when initialQuestion is set but no messages yet (before AnimatedCreditCard appears) */}
        {messages.length === 0 && initialQuestion && !isLoading && (
          <div className="text-center text-muted-foreground py-8">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-mint/50 animate-pulse" />
            <p>Preparing your question...</p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`w-full ${message.role === 'user' ? 'flex justify-end' : 'grid grid-cols-[auto_1fr] gap-4'}`}
          >
            {message.role === 'assistant' && (
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-mint to-coral flex items-center justify-center shadow-soft">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
            )}
            <div className={`min-w-0 ${message.role === 'user' ? 'max-w-md' : ''}`}>
              {message.role === 'user' ? (
                <div className="bg-mint/10 border border-mint/20 rounded-2xl rounded-br-md px-5 py-4">
                  <p className="text-foreground">{message.content}</p>
                </div>
              ) : (
                <div className="bg-card border border-border rounded-2xl rounded-tl-md p-6 shadow-soft">
                  {(() => {
                    try {
                      const parsed = parseStepResponse(message.content);
                      if (parsed.hasSteps && parsed.steps.length > 0) {
                      return (
                        <div className="space-y-6">
                          {parsed.intro && (
                            <p className="text-foreground leading-relaxed">{parsed.intro}</p>
                          )}
                          <div className="space-y-4">
                            {parsed.steps.map((step) => {
                              // Special rendering for Step 3
                              if (step.isStep3 && step.step3Data) {
                                return (
                                  <div key={step.number} className="space-y-5">
                                    {/* Title */}
                                    <h2 className="font-display font-semibold text-xl text-foreground">
                                      {step.step3Data.title}
                                    </h2>
                                    
                                    {/* Description */}
                                    <p className="text-foreground leading-relaxed">
                                      {step.step3Data.description}
                                    </p>
                                    
                                    {/* Key Things to Know */}
                                    <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
                                      <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                                        <BookOpen className="w-5 h-5 text-mint" />
                                        Key Things to Know
                                      </h3>
                                      <div className="space-y-4">
                                        {step.step3Data.keyThings.map((item, index) => (
                                          <div key={index}>
                                            <p className="font-medium text-foreground">{item.headline}</p>
                                            <p className="text-sm text-muted-foreground">{item.text}</p>
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
                                  <div key={step.number} className="space-y-4">
                                    {/* Main text */}
                                    <p className="text-foreground leading-relaxed">
                                      {step.step4Data.text}
                                    </p>
                                    
                                    {/* Apply Now button */}
                                    <Button 
                                      asChild
                                      className="bg-mint hover:bg-mint/90 text-white rounded-xl"
                                    >
                                      <a 
                                        href={step.step4Data.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                      >
                                        Apply Now
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                      </a>
                                    </Button>
                                  </div>
                                );
                              }
                              
                              // Special rendering for Step 5
                              if (step.isStep5 && step.step5Data) {
                                return (
                                  <div key={step.number} className="space-y-6">
                                    {/* Intro text */}
                                    <p className="text-foreground leading-relaxed">
                                      {step.step5Data.intro}
                                    </p>
                                    
                                    {/* Card List */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                      {step.step5Data.cards.map((card, cardIndex) => (
                                        <div 
                                          key={cardIndex}
                                          className="bg-card border border-border rounded-2xl p-5 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col"
                                        >
                                          {/* Credit Card Name */}
                                          <h3 className="font-display font-semibold text-base text-foreground mb-3">
                                            {card.name}
                                          </h3>
                                          
                                          {/* 1 sentence description */}
                                          <p className="text-foreground text-sm leading-relaxed mb-4 flex-1">
                                            {card.description}
                                          </p>
                                          
                                          {/* 2 highlights */}
                                          <div className="space-y-1.5 mb-4">
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
                                            className="w-full bg-mint hover:bg-mint/90 text-white mt-auto"
                                          >
                                            <a 
                                              href={card.url} 
                                              target="_blank" 
                                              rel="noopener noreferrer"
                                            >
                                              Apply Now
                                              <ChevronRight className="w-4 h-4 ml-1" />
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
                                  <p className="text-foreground leading-relaxed">{step.content}</p>
                                </div>
                              );
                            })}
                          </div>
                          {parsed.conclusion && (
                            <p className="text-foreground leading-relaxed pt-2">{parsed.conclusion}</p>
                          )}
                        </div>
                      );
                    }
                    return (
                      <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                        {message.content}
                      </p>
                    );
                    } catch (error) {
                      console.error('Error parsing message:', error);
                      return (
                        <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                          {message.content}
                        </p>
                      );
                    }
                  })()}
                  <p className="text-sm text-muted-foreground mt-6">
                    We do our best to keep credit card info current, but details can change quickly. Always check the issuer's terms before you apply.
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-center">
            <AnimatedCreditCard />
          </div>
        )}

        {/* Suggested Questions */}
        {suggestedQuestions.length > 0 && !isLoading && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-muted-foreground">You might also ask:</span>
            </div>
            <div className="flex flex-col gap-2">
              {suggestedQuestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestionClick(suggestion.question)}
                  className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-secondary-foreground bg-secondary hover:bg-secondary/80 rounded-full transition-all duration-200 cursor-pointer hover:shadow-sm w-fit"
                >
                  {suggestion.question}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4 max-w-2xl">
              Some of the credit cards on this site are from partners who pay us when you click or apply. This helps keep the site running, but it doesn't influence our recommendations.
            </p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      {!isLoading && (
        <form onSubmit={handleSubmit} className="sticky bottom-0 bg-background/80 backdrop-blur-xl pt-4 pb-6 border-t border-border">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask a question about credit cards..."
            className="w-full px-5 py-4 pr-24 rounded-2xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-mint/50 focus:border-mint shadow-soft"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-mint hover:bg-mint/90 text-white rounded-xl disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            Ask
          </Button>
        </div>
      </form>
      )}
    </div>
  );
};

export default Chatbot;

