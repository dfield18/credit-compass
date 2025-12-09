import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Loader2, BookOpen, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { sendMessageToChatbase, createConversationId, type ChatbaseMessage } from "@/lib/chatbase";
import { generateSuggestedQuestions } from "@/lib/openai";

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
  
  // Extract intro from "Response:"
  const responseMatch = content.match(/Response:\s*(.+?)(?:\n\s*Credit Card Name:|$)/is);
  const intro = responseMatch?.[1]?.trim() || '';
  
  if (!intro) {
    return null;
  }
  
  // Split content by "Credit Card Name:" to get individual cards
  const cardSections = content.split(/Credit Card Name:/i).filter(section => section.trim());
  
  // Remove the first section if it's just the Response intro
  const cards: CreditCard[] = [];
  
  for (let i = 0; i < cardSections.length; i++) {
    const section = cardSections[i].trim();
    if (!section) continue;
    
    // Extract card name (first line or until URL:)
    const nameMatch = section.match(/^(.+?)(?:\n\s*URL:|$)/is);
    const name = nameMatch?.[1]?.trim() || '';
    
    // Extract URL
    const urlMatch = section.match(/URL:\s*(https?:\/\/[^\s]+)/i);
    const url = urlMatch?.[1]?.trim() || '';
    
    // Extract 1 sentence description
    const descMatch = section.match(/1 sentence description:\s*(.+?)(?:\n\s*(?:2 highlights|5 highlights|Credit Card Name):|$)/is);
    const description = descMatch?.[1]?.trim() || '';
    
    // Extract 2 highlights
    const highlights2Match = section.match(/2 highlights:\s*(.+?)(?:\n\s*(?:5 highlights|Credit Card Name):|$)/is);
    let highlights2: string[] = [];
    if (highlights2Match) {
      const highlightsText = highlights2Match[1]?.trim() || '';
      // Split by comma or newline
      highlights2 = highlightsText.split(/[,\n]/).map(h => h.trim()).filter(h => h.length > 0);
    }
    
    // Extract 5 highlights (optional)
    const highlights5Match = section.match(/5 highlights:\s*(.+?)(?:\n\s*Credit Card Name:|$)/is);
    let highlights5: string[] = [];
    if (highlights5Match) {
      const highlightsText = highlights5Match[1]?.trim() || '';
      highlights5 = highlightsText.split(/[,\n]/).map(h => h.trim()).filter(h => h.length > 0);
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
};

const Chatbot = ({ initialQuestion, onSuggestedQuestionClick }: ChatbotProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
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
    if (initialQuestion && initialQuestion !== processedInitialQuestionRef.current && messages.length === 0) {
      // Only process if we haven't processed this question and there are no messages
      isInitializingRef.current = true;
      processedInitialQuestionRef.current = initialQuestion;
      // Use a small delay to ensure component is fully mounted, then send message
      // handleSendMessage will set loading state internally
      const timer = setTimeout(() => {
        handleSendMessage(initialQuestion);
      }, 0);
      return () => clearTimeout(timer);
    } else if (initialQuestion && initialQuestion !== processedInitialQuestionRef.current && messages.length > 0) {
      // Reset conversation if a new initial question is provided
      isInitializingRef.current = true;
      processedInitialQuestionRef.current = initialQuestion;
      setMessages([]);
      setConversationHistory([]);
      setConversationId(undefined);
      setSuggestedQuestions([]);
      // Use setTimeout to ensure state is reset before sending new message
      // handleSendMessage will set loading state internally
      const timer = setTimeout(() => {
        handleSendMessage(initialQuestion);
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

      // Update conversation ID if returned from API
      if (response.conversationId && response.conversationId !== currentConversationId) {
        setConversationId(response.conversationId);
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.answer,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      
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

  return (
    <div className="w-full flex flex-col h-full">
      {/* Messages Container */}
      <div className="w-full flex-1 overflow-y-auto space-y-6 mb-8">
        {messages.length === 0 && !initialQuestion && !isLoading && !isInitializingRef.current && (
          <div className="text-center text-muted-foreground py-8">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-mint/50" />
            <p>Ask me anything about credit cards!</p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`w-full flex gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}
          >
            {message.role === 'assistant' && (
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-mint to-coral flex items-center justify-center shadow-soft">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
            )}
            <div className={`flex-1 min-w-0 ${message.role === 'user' ? 'max-w-md' : ''}`}>
              {message.role === 'user' ? (
                <div className="bg-mint/10 border border-mint/20 rounded-2xl rounded-br-md px-5 py-4">
                  <p className="text-foreground">{message.content}</p>
                </div>
              ) : (
                <div className="w-full bg-card border border-border rounded-2xl rounded-tl-md p-6 shadow-soft">
                  {(() => {
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
                  })()}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="w-full flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-mint to-coral flex items-center justify-center shadow-soft">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="w-full bg-card border border-border rounded-2xl rounded-tl-md p-6 shadow-soft">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 text-mint animate-spin" />
                  <span className="text-muted-foreground">Thinking...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Suggested Questions */}
        {suggestedQuestions.length > 0 && !isLoading && (
          <div className="w-full bg-card border border-border rounded-2xl p-6 shadow-soft">
            <p className="text-foreground mb-4">You might also want to ask:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => handleSuggestedQuestionClick(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
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
    </div>
  );
};

export default Chatbot;

