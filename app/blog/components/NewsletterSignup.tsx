'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: existingSubscribers, error: checkError } = await supabase
        .from('newsletter_subscribers')
        .select('id')
        .eq('email', email.toLowerCase().trim())
        .limit(1);

      if (checkError) throw checkError;

      if (existingSubscribers && existingSubscribers.length > 0) {
        toast.info("This email is already subscribed to our newsletter.");
        setEmail('');
        setIsSubscribed(true);
        return;
      }

      const { error: insertError } = await supabase
        .from('newsletter_subscribers')
        .insert([
          { email: email.toLowerCase().trim() }
        ]);

      if (insertError) throw insertError;

      toast.success("Welcome aboard! You've successfully subscribed to our newsletter.");
      setEmail('');
      setIsSubscribed(true);

    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.");
      console.error('Error submitting newsletter subscription:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="flex items-center justify-center gap-3 py-4 text-navy">
        <span className="font-gilroy-medium text-lg">✓ You're subscribed!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 h-12 px-4 py-2 bg-white border-gray-300"
      />
      <Button type="submit" disabled={isSubmitting} className="h-12 px-6 bg-black hover:bg-black/90">
        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
      </Button>
    </form>
  );
};

export default NewsletterSignup;
