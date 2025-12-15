'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { MessageCircle, User, Send, Heart, AlertCircle } from 'lucide-react';

export interface Comment {
  id: string;
  blog_post_id: string;
  name: string;
  email: string;
  content: string;
  created_at: string;
  likes?: number;
}

interface CommentSectionProps {
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const { data, error: fetchError } = await supabase
          .from('blog_comments')
          .select('*')
          .eq('blog_post_id', postId)
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;

        // Add likes property to comments if not present
        const commentsWithLikes = (data || []).map(c => ({
          ...c,
          likes: c.likes || 0
        }));

        setComments(commentsWithLikes as Comment[]);
      } catch (err: any) {
        setError(err.message || 'Failed to load comments');
        console.error('Error fetching comments:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !content.trim()) {
      toast.error("Please fill out all fields to post a comment.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error: insertError } = await supabase
        .from('blog_comments')
        .insert([
          { blog_post_id: postId, name, email, content, likes: 0 }
        ])
        .select();

      if (insertError) throw insertError;

      if (data && data.length > 0) {
        setComments([{ ...data[0], likes: 0 } as Comment, ...comments]);
        setContent('');
        toast.success("Your comment has been published!");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.");
      console.error('Error posting comment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (commentId: string) => {
    // Prevent multiple likes from the same user (client-side check)
    if (likedComments.has(commentId)) {
      toast.info("You've already liked this comment");
      return;
    }

    // Optimistic update
    setComments(prev =>
      prev.map(c =>
        c.id === commentId ? { ...c, likes: (c.likes || 0) + 1 } : c
      )
    );
    setLikedComments(prev => new Set(prev).add(commentId));

    // TODO: Update likes in the database when you add a likes column to blog_comments table
    // For now, it's just a client-side feature
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-8">
      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="bg-gray-50 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <MessageCircle size={18} />
          <span className="text-sm font-gilroy-medium">Join the conversation</span>
        </div>

        <Input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white py-2 border-gray-300"
          required
        />

        <Input
          type="email"
          placeholder="Your email (not published)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white py-2 border-gray-300"
          required
        />

        <Textarea
          placeholder="Share your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="bg-white py-2 border-gray-300 resize-none"
          required
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting} className="bg-black hover:bg-black/90">
            {isSubmitting ? 'Posting...' : (
              <>
                Post Comment <Send size={14} className="ml-2" />
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        <p className="text-sm text-gray-600 font-gilroy-regular">
          {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
        </p>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-navy border-r-transparent align-[-0.125em]"></div>
            <p className="mt-2 text-gray-600">Loading comments...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-8 text-red-600">
            <AlertCircle className="mr-2" />
            {error}
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No comments yet. Be the first to share your thoughts!
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="group border-b border-gray-200 pb-6 last:border-0">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center shrink-0">
                  <User size={18} className="text-navy" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-gilroy-semibold text-navy">{comment.name}</span>
                    <span className="text-sm text-gray-500 font-gilroy-regular">{formatDate(comment.created_at)}</span>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-3 whitespace-pre-line font-gilroy-regular">{comment.content}</p>

                  <button
                    onClick={() => handleLike(comment.id)}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <Heart
                      size={14}
                      className={`${(comment.likes || 0) > 0 && likedComments.has(comment.id) ? 'fill-red-500 text-red-500' : ''}`}
                    />
                    {(comment.likes || 0) > 0 && <span>{comment.likes}</span>}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
