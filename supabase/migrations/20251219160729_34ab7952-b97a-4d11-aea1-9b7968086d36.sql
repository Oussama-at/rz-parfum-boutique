-- Add update policy for orders
CREATE POLICY "Anyone can update order status"
ON public.orders
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Enable realtime for orders
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;