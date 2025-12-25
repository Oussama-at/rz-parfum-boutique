-- Drop the overly permissive policies
DROP POLICY IF EXISTS "Public can view their own orders by phone" ON public.orders;
DROP POLICY IF EXISTS "Anyone can update order status" ON public.orders;

-- Create admin-only SELECT policy
CREATE POLICY "Only admins can view orders"
ON public.orders
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create admin-only UPDATE policy
CREATE POLICY "Only admins can update orders"
ON public.orders
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));