-- SQL to update Pookies in products table and insert into product_details

-- 01 Avocado
UPDATE products SET name = 'Avocado Pookie', description = 'A creamy, buttery, and incredibly smooth mini popsicle made from fresh, premium avocados.', variants = ARRAY['Standard'] WHERE slug = 'pookie-1';

-- 02 Papaya & Carrot
UPDATE products SET name = 'Papaya & Carrot Pookie', description = 'A vibrant blend of sweet papaya and earthy carrot, packed with tropical flavor and natural goodness.', variants = ARRAY['Standard'] WHERE slug = 'pookie-2';

-- 03 Custard Apple
UPDATE products SET name = 'Custard Apple Pookie', description = 'The exotic, sweet, and granular texture of authentic custard apple captured in a bite-sized treat.', variants = ARRAY['Standard'] WHERE slug = 'pookie-3';

-- 04 Strawberry
UPDATE products SET name = 'Strawberry Pookie', description = 'Refreshing, fruity, and bursting with the natural sweetness of sun-ripened strawberries.', variants = ARRAY['Standard'] WHERE slug = 'pookie-4';

-- 05 Almond
UPDATE products SET name = 'Almond Pookie', description = 'A rich, nutty, and subtly sweet almond experience, crafted with real roasted almonds.', variants = ARRAY['Standard'] WHERE slug = 'pookie-5';

-- 06 Pineapple
UPDATE products SET name = 'Pineapple Pookie', description = 'Zesty, tropical, and wonderfully refreshing. The perfect sweet-tart balance of pure pineapple.', variants = ARRAY['Standard'] WHERE slug = 'pookie-6';

-- 07 Tender Coconut
UPDATE products SET name = 'Tender Coconut Pookie', description = 'The delicate, refreshing taste of natural tender coconut, packed with real coconut bits.', variants = ARRAY['Standard'] WHERE slug = 'pookie-7';

-- 08 Watermelon
UPDATE products SET name = 'Watermelon Pookie', description = 'An incredibly juicy and cooling watermelon treat, perfect for beating the heat.', variants = ARRAY['Standard'] WHERE slug = 'pookie-8';

-- 09 Chocolate
UPDATE products SET name = 'Chocolate Pookie', description = 'Decadent, rich, and intensely chocolatey. A luxurious bite-sized craving satisfier.', variants = ARRAY['Standard'] WHERE slug = 'pookie-9';

-- 10 Mango
UPDATE products SET name = 'Mango Pookie', description = 'The king of fruits in a mini popsicle. Sweet, luscious, and full of pure mango flavor.', variants = ARRAY['Standard'] WHERE slug = 'pookie-10';

-- 11 Pistachio
UPDATE products SET name = 'Pistachio Pookie', description = 'Premium roasted pistachios blended into a creamy, nutty perfection.', variants = ARRAY['Standard'] WHERE slug = 'pookie-11';

-- Now insert product_details
-- Clean up existing details for pookies if any
DELETE FROM product_details WHERE product_id IN (SELECT id FROM products WHERE category = 'pookies');

INSERT INTO product_details (product_id, subtitle, label, accent_color, bg_gradient, text_color, long_desc, highlight, ingredients, stats, tags)
SELECT id, 'Creamy & Rich', 'Best Seller', '#899a63', 'linear-gradient(135deg, #e3eed4 0%, #c1df99 100%)', '#1a3210', 'Experience the unique, buttery richness of our Avocado Pookie. Made from perfectly ripe Hass avocados, this mini treat offers a shockingly smooth texture and a subtle sweetness that makes it an instant favorite.', 'Rich in healthy fats', ARRAY['Fresh Avocado', 'Organic Milk', 'Cane Sugar', 'Natural Cream'], '[{"label": "Calories", "value": "95"}, {"label": "Creaminess", "value": "10/10"}]'::jsonb, ARRAY['Creamy', 'Exotic', 'Premium']
FROM products WHERE slug = 'pookie-1';

INSERT INTO product_details (product_id, subtitle, label, accent_color, bg_gradient, text_color, long_desc, highlight, ingredients, stats, tags)
SELECT id, 'Tropical & Earthy', 'New Flavor', '#f18b52', 'linear-gradient(135deg, #fce1d4 0%, #f7b28d 100%)', '#4a2210', 'A refreshing and unique combination of sweet tropical papaya and earthy, nutrient-rich carrots. This vibrant mini popsicle is as healthy as it is delicious.', 'Vitamin packed', ARRAY['Papaya', 'Carrot Juice', 'Cane Sugar', 'Hint of Lemon'], '[{"label": "Calories", "value": "65"}, {"label": "Fruity", "value": "9/10"}]'::jsonb, ARRAY['Tropical', 'Wellness', 'Fruity']
FROM products WHERE slug = 'pookie-2';

INSERT INTO product_details (product_id, subtitle, label, accent_color, bg_gradient, text_color, long_desc, highlight, ingredients, stats, tags)
SELECT id, 'Exotic Sweetness', 'Must Try', '#d6dca4', 'linear-gradient(135deg, #f3f5e5 0%, #d6dca4 100%)', '#333b1c', 'Capture the essence of the tropics with our Custard Apple Pookie. Featuring the authentic, granular texture and perfumed sweetness of real custard apple.', 'Authentic texture', ARRAY['Custard Apple Pulp', 'Organic Milk', 'Cane Sugar'], '[{"label": "Calories", "value": "85"}, {"label": "Sweetness", "value": "9/10"}]'::jsonb, ARRAY['Exotic', 'Rich', 'Premium']
FROM products WHERE slug = 'pookie-3';

INSERT INTO product_details (product_id, subtitle, label, accent_color, bg_gradient, text_color, long_desc, highlight, ingredients, stats, tags)
SELECT id, 'Classic & Fruity', 'Kids Favorite', '#e76f7f', 'linear-gradient(135deg, #fadbe0 0%, #e76f7f 100%)', '#4d151c', 'Bursting with the juicy sweetness of sun-ripened strawberries. A classic flavor, elevated with pure ingredients and absolute freshness in every bite.', 'Real fruit chunks', ARRAY['Strawberries', 'Cane Sugar', 'Purified Water'], '[{"label": "Calories", "value": "55"}, {"label": "Refresh", "value": "9/10"}]'::jsonb, ARRAY['Fruity', 'Refreshing', 'Classic']
FROM products WHERE slug = 'pookie-4';

INSERT INTO product_details (product_id, subtitle, label, accent_color, bg_gradient, text_color, long_desc, highlight, ingredients, stats, tags)
SELECT id, 'Nutty Indulgence', 'Premium', '#d8a476', 'linear-gradient(135deg, #f3e6db 0%, #d8a476 100%)', '#452a14', 'A sophisticated treat for nut lovers. Made with slow-roasted almonds blended into a creamy, milky base that delivers comfort in every bite.', 'Real roasted almonds', ARRAY['Roasted Almonds', 'Organic Milk', 'Cane Sugar', 'Cream'], '[{"label": "Calories", "value": "110"}, {"label": "Nutty", "value": "10/10"}]'::jsonb, ARRAY['Nutty', 'Rich', 'Gourmet']
FROM products WHERE slug = 'pookie-5';

INSERT INTO product_details (product_id, subtitle, label, accent_color, bg_gradient, text_color, long_desc, highlight, ingredients, stats, tags)
SELECT id, 'Tropical Zing', 'Refreshing', '#f4ce5a', 'linear-gradient(135deg, #fbf2d3 0%, #f4ce5a 100%)', '#5a460b', 'The ultimate palate cleanser. Our Pineapple Pookie offers a sweet and tangy zing, bringing you the pure, unadulterated flavor of tropical pineapples.', '100% Real Juice', ARRAY['Fresh Pineapple', 'Cane Sugar', 'Purified Water'], '[{"label": "Calories", "value": "60"}, {"label": "Tangy", "value": "8/10"}]'::jsonb, ARRAY['Tropical', 'Refreshing', 'Fruity']
FROM products WHERE slug = 'pookie-6';

INSERT INTO product_details (product_id, subtitle, label, accent_color, bg_gradient, text_color, long_desc, highlight, ingredients, stats, tags)
SELECT id, 'Pure & Refreshing', 'Signature', '#dcd8d0', 'linear-gradient(135deg, #f5f4f2 0%, #dcd8d0 100%)', '#3c3a37', 'A taste of coastal heritage. This Pookie captures the delicate, refreshing essence of tender coconut water and soft coconut meat.', 'Natural cooling', ARRAY['Tender Coconut Water', 'Coconut Meat', 'Organic Milk', 'Cane Sugar'], '[{"label": "Calories", "value": "70"}, {"label": "Refresh", "value": "10/10"}]'::jsonb, ARRAY['Refreshing', 'Nostalgic', 'Premium']
FROM products WHERE slug = 'pookie-7';

INSERT INTO product_details (product_id, subtitle, label, accent_color, bg_gradient, text_color, long_desc, highlight, ingredients, stats, tags)
SELECT id, 'Summer Refresh', 'Seasonal', '#e85d68', 'linear-gradient(135deg, #f9d2d6 0%, #e85d68 100%)', '#4e141a', 'Beat the heat with this incredibly hydrating and naturally sweet watermelon mini popsicle. It''s like biting into a chilled slice of fresh watermelon.', 'Hydrating', ARRAY['Fresh Watermelon', 'Cane Sugar', 'Purified Water'], '[{"label": "Calories", "value": "50"}, {"label": "Refresh", "value": "10/10"}]'::jsonb, ARRAY['Refreshing', 'Fruity', 'Light']
FROM products WHERE slug = 'pookie-8';

INSERT INTO product_details (product_id, subtitle, label, accent_color, bg_gradient, text_color, long_desc, highlight, ingredients, stats, tags)
SELECT id, 'Decadent Cocoa', 'Best Seller', '#623d2f', 'linear-gradient(135deg, #cfbeb8 0%, #623d2f 100%)', '#fff', 'Rich, intense, and deeply satisfying. Crafted with premium cocoa for a luxurious chocolate experience in a bite-sized format.', 'Premium Cocoa', ARRAY['Premium Cocoa', 'Organic Milk', 'Cream', 'Cane Sugar'], '[{"label": "Calories", "value": "120"}, {"label": "Richness", "value": "10/10"}]'::jsonb, ARRAY['Decadent', 'Rich', 'Classic']
FROM products WHERE slug = 'pookie-9';

INSERT INTO product_details (product_id, subtitle, label, accent_color, bg_gradient, text_color, long_desc, highlight, ingredients, stats, tags)
SELECT id, 'Luscious Mango', 'Tropical King', '#f9bc30', 'linear-gradient(135deg, #fdeec2 0%, #f9bc30 100%)', '#5c4103', 'Experience the rich, vibrant sweetness of Alphonso mangoes. A dense and luscious treat that celebrates the king of fruits.', 'Real Alphonso', ARRAY['Mango Pulp', 'Organic Milk', 'Cane Sugar'], '[{"label": "Calories", "value": "80"}, {"label": "Fruity", "value": "10/10"}]'::jsonb, ARRAY['Tropical', 'Rich', 'Fruity']
FROM products WHERE slug = 'pookie-10';

INSERT INTO product_details (product_id, subtitle, label, accent_color, bg_gradient, text_color, long_desc, highlight, ingredients, stats, tags)
SELECT id, 'Premium Nutty', 'Gourmet', '#a9c176', 'linear-gradient(135deg, #e3eed4 0%, #a9c176 100%)', '#2c361a', 'A luxurious blend of creamy milk and finely ground premium pistachios. Distinctively nutty, vibrant green, and absolutely delicious.', 'Real Pistachios', ARRAY['Roasted Pistachios', 'Organic Milk', 'Cream', 'Cane Sugar'], '[{"label": "Calories", "value": "115"}, {"label": "Nutty", "value": "10/10"}]'::jsonb, ARRAY['Nutty', 'Gourmet', 'Premium']
FROM products WHERE slug = 'pookie-11';
