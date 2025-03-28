
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { MessageCircle, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface MessagePopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MessagePopup: React.FC<MessagePopupProps> = ({ open, onOpenChange }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Message sent successfully!", {
        description: "I'll get back to you as soon as possible.",
      });
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-white flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-blue-400" />
            Send a Message
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Have a question or want to work together?
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
              className="w-full rounded-lg border border-gray-700 bg-gray-800/50 text-white focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
              className="w-full rounded-lg border border-gray-700 bg-gray-800/50 text-white focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
              Phone (optional)
            </label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your phone number"
              className="w-full rounded-lg border border-gray-700 bg-gray-800/50 text-white focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-gray-300">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Your message"
              className="w-full rounded-lg border border-gray-700 bg-gray-800/50 text-white focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 resize-none"
            />
          </div>
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-6 text-base bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium rounded-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isSubmitting ? "Sending..." : (
              <>
                <Send className="h-4 w-4" />
                <span>Send Message</span>
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MessagePopup;
