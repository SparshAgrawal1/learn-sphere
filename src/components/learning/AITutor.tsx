import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface AITutorProps {
  currentTopic: string;
  onAskQuestion: (question: string) => Promise<string>;
}

export const AITutor = ({ currentTopic, onAskQuestion }: AITutorProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hi! I'm your AI tutor for ${currentTopic}. I'm here to help you understand the concepts better. Feel free to ask me any questions!`,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await onAskQuestion(input.trim());
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Sorry, I encountered an error. Please try asking your question again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <Card className="h-full flex flex-col bg-chat-bg border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-foreground">AI Tutor</h3>
            <p className="text-xs text-muted-foreground">Chatting about: {currentTopic}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`
                max-w-[80%] rounded-2xl px-4 py-3 
                ${message.type === 'user'
                  ? 'chat-bubble-user'
                  : 'chat-bubble-ai'
                }
              `}
            >
              <div className="flex items-start gap-2">
                {message.type === 'ai' && (
                  <Bot className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                )}
                <div className="flex-1">
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className="text-xs opacity-60 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {message.type === 'user' && (
                  <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="chat-bubble-ai max-w-[80%]">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-primary" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about the topic..."
            className="flex-1 px-3 py-2 text-sm bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="sm"
            disabled={!input.trim() || isLoading}
            className="px-3 py-2 rounded-xl"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
};