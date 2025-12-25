-- Add DELETE policy for orders (admin-only)
CREATE POLICY "Only admins can delete orders"
ON public.orders
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));