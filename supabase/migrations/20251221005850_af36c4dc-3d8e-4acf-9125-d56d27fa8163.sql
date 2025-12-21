-- Step 1: Create products table for server-side price validation
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL CHECK (price > 0),
  category TEXT NOT NULL CHECK (category IN ('homme', 'femme', 'unisex', 'pack')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Anyone can read active products
CREATE POLICY "Public can read active products"
ON public.products
FOR SELECT
USING (is_active = true);

-- Only admins can manage products
CREATE POLICY "Admins can manage products"
ON public.products
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Seed products with current catalog
INSERT INTO public.products (id, name, price, category) VALUES
('1', 'Aventus', 50, 'homme'),
('2', 'Eros', 50, 'homme'),
('3', 'Bleu de Chanel', 50, 'homme'),
('4', 'Sauvage', 50, 'homme'),
('22', '1 Million', 50, 'homme'),
('23', 'Dior Homme', 50, 'homme'),
('24', 'Dylan Blue', 50, 'homme'),
('25', 'Lacoste Blanc', 50, 'homme'),
('5', 'Nuit Trésor', 50, 'femme'),
('6', 'Prada Essence', 50, 'femme'),
('7', 'J''adore', 50, 'femme'),
('8', 'Libre', 50, 'femme'),
('17', 'Black Opium', 50, 'femme'),
('18', 'La Vie est Belle', 50, 'femme'),
('19', 'Coco Mademoiselle', 50, 'femme'),
('20', 'Escada Celebration', 50, 'femme'),
('21', 'Kayali Vanilla', 50, 'femme'),
('9', 'R&Z Ambre Royal', 50, 'unisex'),
('10', 'R&Z Bois Mystique', 50, 'unisex'),
('11', 'R&Z Essence Pure', 50, 'unisex'),
('12', 'R&Z Cuir Oriental', 50, 'unisex'),
('13', 'Pack Trio Découverte', 130, 'pack'),
('14', 'Pack Prestige', 160, 'pack'),
('15', 'Pack Couple', 90, 'pack'),
('16', 'Pack Collection Complète', 250, 'pack')
ON CONFLICT (id) DO NOTHING;

-- Step 2: Create validation and pricing function
CREATE OR REPLACE FUNCTION public.validate_and_price_order()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  valid_cities TEXT[] := ARRAY[
    'Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Meknès', 
    'Oujda', 'Kénitra', 'Tétouan', 'Safi', 'El Jadida', 'Nador', 'Mohammedia',
    'Béni Mellal', 'Khouribga', 'Taza', 'Settat', 'Berrechid', 'Khémisset',
    'Errachidia', 'Inezgane', 'Laâyoune', 'Salé', 'Temara', 'Guelmim',
    'Dakhla', 'Ouarzazate', 'Sidi Kacem', 'Larache', 'Ksar El Kébir',
    'Al Hoceima', 'Essaouira', 'Taourirt', 'Berkane', 'Sidi Slimane',
    'Tan-Tan', 'Tiznit', 'Taroudant', 'Azrou', 'Ifrane'
  ];
  item JSONB;
  item_id TEXT;
  item_quantity INT;
  product_row products%ROWTYPE;
  calculated_subtotal NUMERIC := 0;
  delivery_threshold NUMERIC := 300;
  delivery_cost NUMERIC := 15;
BEGIN
  -- Validate city
  IF NOT (NEW.customer_city = ANY(valid_cities)) THEN
    RAISE EXCEPTION 'Invalid city: %', NEW.customer_city;
  END IF;
  
  -- Validate and calculate items
  FOR item IN SELECT * FROM jsonb_array_elements(NEW.items)
  LOOP
    item_id := item->>'id';
    item_quantity := (item->>'quantity')::INT;
    
    -- Validate quantity
    IF item_quantity IS NULL OR item_quantity < 1 OR item_quantity > 100 THEN
      RAISE EXCEPTION 'Invalid quantity for item %: must be between 1 and 100', item_id;
    END IF;
    
    -- Get product from database
    SELECT * INTO product_row FROM products WHERE id = item_id AND is_active = true;
    
    IF NOT FOUND THEN
      RAISE EXCEPTION 'Product not found or inactive: %', item_id;
    END IF;
    
    -- Add to subtotal using server-side price
    calculated_subtotal := calculated_subtotal + (product_row.price * item_quantity);
  END LOOP;
  
  -- Enforce minimum order amount
  IF calculated_subtotal < 50 THEN
    RAISE EXCEPTION 'Minimum order amount is 50 DH';
  END IF;
  
  -- Set server-calculated values (overriding client values)
  NEW.subtotal := calculated_subtotal;
  NEW.delivery_fee := CASE 
    WHEN calculated_subtotal >= delivery_threshold THEN 0 
    ELSE delivery_cost 
  END;
  NEW.total := NEW.subtotal + NEW.delivery_fee;
  
  RETURN NEW;
END;
$$;

-- Step 3: Add constraints to orders table for server-side validation
ALTER TABLE public.orders 
ADD CONSTRAINT valid_phone CHECK (customer_phone ~ '^0[5-7][0-9]{8}$'),
ADD CONSTRAINT valid_name_length CHECK (length(customer_name) BETWEEN 2 AND 100),
ADD CONSTRAINT valid_address_length CHECK (length(customer_address) BETWEEN 5 AND 300),
ADD CONSTRAINT valid_items_count CHECK (jsonb_array_length(items) BETWEEN 1 AND 50),
ADD CONSTRAINT positive_totals CHECK (subtotal >= 0 AND total >= 0 AND delivery_fee >= 0);

-- Step 4: Create trigger for order validation and pricing
CREATE TRIGGER trg_validate_and_price_order
BEFORE INSERT ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.validate_and_price_order();