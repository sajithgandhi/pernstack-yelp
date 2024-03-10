
-- Create a new database for restaurants
CREATE TABLE pernyelp_restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    price_range INT NOT NULL check(price_range >= 1 and price_range <= 5)
);


-- Dummy data
INSERT INTO pernyelp_restaurants (name, location, price_range) VALUES ('McDonalds', 'New York', 1);
INSERT INTO pernyelp_restaurants (name, location, price_range) VALUES ('Burger King', 'New York', 2);
INSERT INTO pernyelp_restaurants (name, location, price_range) VALUES ('Wendys', 'New York', 2);
INSERT INTO pernyelp_restaurants (name, location, price_range) VALUES ('Taco Bell', 'New York', 2);
INSERT INTO pernyelp_restaurants (name, location, price_range) VALUES ('KFC', 'New York', 1);