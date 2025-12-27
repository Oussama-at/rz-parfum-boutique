import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import StarRating from './StarRating';
import { toast } from 'sonner';
import { MessageCircle, Send, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Review {
  id: string;
  product_id: string;
  reviewer_name: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

interface ProductReviewsProps {
  productId: string;
}

const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    fetchReviews();
    
    // Subscribe to realtime changes
    const channel = supabase
      .channel(`reviews-${productId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'reviews',
          filter: `product_id=eq.${productId}`
        },
        (payload) => {
          setReviews(current => [payload.new as Review, ...current]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Veuillez entrer votre nom');
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('reviews')
        .insert({
          product_id: productId,
          reviewer_name: formData.name.trim(),
          rating: formData.rating,
          comment: formData.comment.trim() || null
        });

      if (error) throw error;

      toast.success('Avis ajouté avec succès!');
      setFormData({ name: '', rating: 5, comment: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Erreur lors de l\'ajout de l\'avis');
    } finally {
      setSubmitting(false);
    }
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="mt-12 pt-12 border-t border-border">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display text-2xl font-bold flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-primary" />
            Avis clients
          </h2>
          {reviews.length > 0 && (
            <div className="flex items-center gap-3 mt-2">
              <StarRating rating={Math.round(averageRating)} size="sm" />
              <span className="text-muted-foreground">
                {averageRating.toFixed(1)} / 5 ({reviews.length} avis)
              </span>
            </div>
          )}
        </div>
        <Button onClick={() => setShowForm(!showForm)} variant={showForm ? "outline" : "default"}>
          {showForm ? 'Annuler' : 'Laisser un avis'}
        </Button>
      </div>

      {/* Review Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-muted/30 rounded-xl p-6 mb-8 border border-border/50">
          <h3 className="font-semibold mb-4">Partagez votre avis</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Votre nom</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Entrez votre nom"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Note</label>
              <StarRating
                rating={formData.rating}
                interactive
                onRatingChange={(rating) => setFormData(prev => ({ ...prev, rating }))}
                size="lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Commentaire (optionnel)</label>
              <Textarea
                value={formData.comment}
                onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                placeholder="Partagez votre expérience avec ce parfum..."
                rows={3}
              />
            </div>
            <Button type="submit" disabled={submitting} className="gradient-gold">
              <Send className="h-4 w-4 mr-2" />
              {submitting ? 'Envoi...' : 'Envoyer'}
            </Button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Chargement des avis...</div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Aucun avis pour ce produit.</p>
          <p className="text-sm mt-1">Soyez le premier à donner votre avis!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-card rounded-xl p-5 border border-border/50">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{review.reviewer_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(review.created_at), { addSuffix: true, locale: fr })}
                    </p>
                  </div>
                </div>
                <StarRating rating={review.rating} size="sm" />
              </div>
              {review.comment && (
                <p className="mt-3 text-muted-foreground">{review.comment}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
