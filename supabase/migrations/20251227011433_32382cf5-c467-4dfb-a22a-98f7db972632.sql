-- Create reviews table for product ratings
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id TEXT NOT NULL,
  reviewer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can read reviews (public display)
CREATE POLICY "Anyone can read reviews" 
ON public.reviews 
FOR SELECT 
USING (true);

-- Anyone can create reviews (no auth required for simple store)
CREATE POLICY "Anyone can create reviews" 
ON public.reviews 
FOR INSERT 
WITH CHECK (true);

-- Create index for faster product lookups
CREATE INDEX idx_reviews_product_id ON public.reviews(product_id);

-- Add realtime for reviews
ALTER PUBLICATION supabase_realtime ADD TABLE public.reviews;