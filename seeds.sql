-- CREATE DATABASE meal_budgeter;

USE meal_budgeter;

-- User Sid
INSERT INTO users (username, password, createdAt, updatedAt) 
VALUES 
('Sid', '$2a$10$MtdGCk8X7B6dN.m21zmEoeK6AIqiHC0MwQxToCfKJcLK27P.UFwgi', NOW(), NOW()),
('Simone', '$2a$10$MtdGCk8X7B6dN.m21zmEoeK6AIqiHC0MwQxToCfKJcLK27P.UFwgi', NOW(), NOW()),
('Tom', '$2a$10$MtdGCk8X7B6dN.m21zmEoeK6AIqiHC0MwQxToCfKJcLK27P.UFwgi', NOW(), NOW()),
('Will', '$2a$10$MtdGCk8X7B6dN.m21zmEoeK6AIqiHC0MwQxToCfKJcLK27P.UFwgi', NOW(), NOW());

-- Ingredients
INSERT INTO ingredients (item, price, createdAt, updatedAt) 
VALUES
('egg', 0.50, NOW(), NOW()), 
('salt', 0, NOW(), NOW()), 
('sugar', 0, NOW(), NOW()), 
('chocolate', 2.00, NOW(), NOW()), 
('vanilla extract', 0, NOW(), NOW()), 
('flour', 0, NOW(), NOW()),
('onion', 0.25, NOW(), NOW()),
('garlic clove', 0.12, NOW(), NOW()),
('500g beef mince', 6, NOW(), NOW()),
('400g tinned tomatos', 0.8, NOW(), NOW()),
('tomato paste', 0.10, NOW(), NOW()),
('oregano', 0.2, NOW(), NOW()),
('beef stock cube', 0.15, NOW(), NOW()),
('pepper', 0, NOW(), NOW()),
('cheese', 0, NOW(), NOW()),
('bread slices', 0.12, NOW(), NOW());

-- Recipes
INSERT INTO recipes (title, method, image, createdAt, updatedAt, UserId) 
VALUES
('Boiled Egg', '<li>Add egg to cold water.</li><li>Bring water to boil.</li><li>Cook.</li>', 'https://cdn.pixabay.com/photo/2019/06/03/22/06/breakfast-4250077_960_720.jpg', NOW(), NOW(), 1),
('Chocolate Cake', '<li>Add eggs, flour, chocolate to pan.</li><li>Bake at 350 for 1 hour</li>', 'https://cdn.pixabay.com/photo/2016/11/22/18/52/cake-1850011_1280.jpg', NOW(), NOW(), 2),
('Bolognese', '<li>Fry onions and garlic</li><li>Add beef and brown</li><li>Add tinned tomatos, tomato paste, oregano, stock cube, salt and pepper</li><li>Bring to boil and simmer till sauce reduces, about 30 to 60 minutes</li>', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/the-best-spaghetti-bolognese-7e83155.jpg?quality=90&webp=true&resize=375,341', NOW(), NOW(), 3),
('Cheese on Toast', '<li>Toast bread slightly</li><li>Cut cheese into slices</li><li>When bread is slightly toasted, butter and place cheese slices on top of toast</li><li>Place under a high grill till the cheese is melted</li>', 'https://ukcdn.ar-cdn.com/recipes/originals/a90bb4c9-c1a9-4608-bea8-c829f442864a.jpg', NOW(), NOW(), 4);

-- Measures
INSERT INTO measures (measure_metric, createdAt, updatedAt) 
VALUES 
("unit", NOW(), NOW()), 
("cup", NOW(), NOW()), 
("tsp", NOW(), NOW()), 
("tbsp", NOW(), NOW()), 
("g", NOW(), NOW()), 
("kg", NOW(), NOW()), 
("ml", NOW(), NOW()), 
("litre", NOW(), NOW()), 
("unit", NOW(), NOW()),
("mg", NOW(), NOW()),
("lb", NOW(), NOW()),
("oz", NOW(), NOW()),
("fl oz", NOW(), NOW()),
("cm", NOW(), NOW());

-- Ratings
INSERT INTO ratings (rating, createdAt, updatedAt, recipe_id, user_id) 
VALUES 
-- Sid gave 2 stars to Boiled Egg
(2, NOW(), NOW(), 1, 1),
-- Simone gave 3 stars to Boiled Egg
(4, NOW(), NOW(), 1, 2),
-- Sid gave 4 stars to Chocolate Cake
(4, NOW(), NOW(), 2, 1),
-- Tom gave 4 stars to Bolognese
(4, NOW(), NOW(), 3, 3),
-- Simone gave 5 stars to Bolognese
(5, NOW(), NOW(), 3, 2),
-- Will gave 5 stars to Bolognese
(5, NOW(), NOW(), 3, 4),
-- Will gave 4 stars to Cheese on Toast
(4, NOW(), NOW(), 4, 4),
-- Tom gave 5 stars to Cheese on Toast
(5, NOW(), NOW(), 4, 3),
-- Sid gave 3 stars to Cheese on Toast
(3, NOW(), NOW(), 4, 1);

INSERT INTO comments (comment, createdAt, updatedAt, recipe_id, user_id) 
VALUES 
-- Simone commented on Boiled Egg
("Would boil for 8 minutes", NOW(), NOW(), 1, 2),
-- Sid commented on Chocolate Cake
("Very chocolatey, Yum!", NOW(), NOW(), 2, 1),
-- Simone commented on Chocolate Cake
("Everybody will love this recipe", NOW(), NOW(), 2, 2),
-- Will commented on Bolognese
("Absolutely delicious!", NOW(), NOW(), 3, 4),
-- Sid commented on Bolognese
("Very nice indeed, maybe a little less salt", NOW(), NOW(), 3, 1),
-- Tom commented on Bolognese
("Very Beefy, almost too much", NOW(), NOW(), 3, 3),
-- Simone commented on Cheese on Toast
("Very quick and delicious", NOW(), NOW(), 4, 2),
-- Will commented on Cheeese on Toast
("So satisfying", NOW(), NOW(), 4, 4),
-- Sid commented on Cheese on Toast
("Not bad, could be cheesier", NOW(), NOW(), 4, 1);

INSERT INTO favourites (createdAt, updatedAt, recipe_id, user_id) 
VALUES 
-- Simone favourited Boiled Egg
(NOW(), NOW(), 1, 2),
-- Simone favourited Chocoalte Cake
(NOW(), NOW(), 2, 2),
-- Tom favourited Chocolate Cake
(NOW(), NOW(), 2, 3),
-- Will favourited Bolognese
(NOW(), NOW(), 3, 4),
-- Simone favourited Bolognese
(NOW(), NOW(), 3, 2),
-- Will favourited Cheese on Toast
(NOW(), NOW(), 4, 4),
-- Simone favourited Cheese on Toast
(NOW(), NOW(), 4, 2),
-- Tom favourited Cheese on Toast
(NOW(), NOW(), 4, 3);

INSERT INTO recipe_ingredients (quantity, createdAt, updatedAt, measure_id, recipe_id, ingredient_id) 
VALUES 
-- 2 Units of Eggs for Boiled Eggs
(2, NOW(), NOW(), 1, 1, 1),
-- 2 Units of Eggs for Chocolate Cake
(2, NOW(), NOW(), 1, 2, 1),
-- 2 tsp of Salt for Chocolate Cake
(2, NOW(), NOW(), 3, 2, 2),
-- 5 Cups of Sugar for Chocolate Cake
(5, NOW(), NOW(), 2, 2, 3),
-- 100 Grams of Chocolate for Chocolate Cake
(100, NOW(), NOW(), 5, 2, 4),
-- 1 Unit of Onion for Bolognese
(1, NOW(), NOW(), 1, 3, 7),
-- 3 Unit Garlic Clove for Bolognese
(3, NOW(), NOW(), 1, 3, 8),
-- 500g Beef Mince for Bolognese
(1, NOW(), NOW(), 1, 3, 9),
-- 400g Tinned Tomatoes for Bolognese
(1, NOW(), NOW(), 1, 3, 10),
-- 1 tbsp Tomato Paste for Bolognese
(1, NOW(), NOW(), 4, 3, 11),
-- 1 tbsp Oregano for Bolognese
(1, NOW(), NOW(), 4, 3, 12),
-- 1 Unit Stock Cube for Bolognese
(1, NOW(), NOW(), 1, 3, 13),
-- 1/2 tsp Salt for Bolognese
(1, NOW(), NOW(), 3, 3, 2),
-- 1/2 tsp Pepper for Bolognese
(1, NOW(), NOW(), 3, 3, 14),
-- 2 Units Cheese for Cheese on Toast
(2, NOW(), NOW(), 1, 4, 15),
-- 2 Units Bread Slices for Cheese on Toast
(2, NOW(), NOW(), 1, 4, 16);

SELECT * FROM comments;
SELECT * FROM ratings;
SELECT * FROM favourites;
SELECT * FROM recipe_ingredients;
SELECT * FROM ingredients;
SELECT * FROM measures;
SELECT * FROM recipes;
SELECT * FROM users;