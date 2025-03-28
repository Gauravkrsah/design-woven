
import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Send, X, Bot, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ChatPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hi there! I'm Gaurav's virtual assistant. How can I help you today?",
    sender: 'bot',
    timestamp: new Date()
  }
];

const ChatPopup: React.FC<ChatPopupProps> = ({ open, onOpenChange }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [messages, open]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "Thanks for your message! Gaurav will get back to you soon.",
        "I'll make sure Gaurav sees this.",
        "Great question! Let me find the best answer for you.",
        "I've noted your message and will pass it along to Gaurav.",
        "Thanks for reaching out! Is there anything else you'd like to know?",
        "Let me check my knowledge base for that information.",
        "That's an interesting question! Let me help you with that.",
        "I'm here to assist with any questions about Gaurav's work.",
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-xl max-h-[80vh] flex flex-col rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-4 border-b border-gray-700 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600/20">
              <Bot className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <h3 className="text-white font-medium">Chat with Gaurav</h3>
              <p className="text-gray-400 text-xs">Usually replies within an hour</p>
            </div>
          </div>
          <button 
            onClick={() => onOpenChange(false)}
            className="p-1.5 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900 to-gray-800">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div className="flex gap-2">
                {message.sender === 'bot' && (
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600/20 flex items-center justify-center self-end">
                    <Bot className="h-4 w-4 text-blue-400" />
                  </div>
                )}
                
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-tr-none' 
                      : 'bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-tl-none'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
                
                {message.sender === 'user' && (
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600/20 flex items-center justify-center self-end">
                    <User className="h-4 w-4 text-blue-400" />
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="flex gap-2">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600/20 flex items-center justify-center self-end">
                  <Bot className="h-4 w-4 text-blue-400" />
                </div>
                
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-3 rounded-lg rounded-tl-none max-w-[80%]">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSendMessage} className="border-t border-gray-700 p-4 bg-gray-800">
          <div className="flex space-x-2">
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 rounded-full border border-gray-700 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
            />
            <Button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white transition-colors disabled:opacity-70 disabled:bg-gray-700"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChatPopup;
