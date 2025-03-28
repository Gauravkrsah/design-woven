
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Mail, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SubscribePopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SubscribePopup: React.FC<SubscribePopupProps> = ({ open, onOpenChange }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Thanks for subscribing!", {
        description: "You'll receive our newsletter updates soon.",
      });
      setIsSubmitting(false);
      setEmail('');
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-400" />
            Subscribe to Our Newsletter
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Get exclusive updates on new projects and content
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center justify-center py-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center">
            <Mail className="h-8 w-8 text-blue-400" />
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800/50 text-white focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
            />
          </div>
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-6 text-base bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium rounded-lg transition-all disabled:opacity-70"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
          
          <p className="text-center text-xs text-gray-500 mt-3">
            We respect your privacy. You can unsubscribe at any time.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SubscribePopup;
