CREATE DATABASE IF NOT EXISTS cook_at_home;
USE cook_at_home;

CREATE TABLE user (
    user_id INT NOT NULL AUTO_INCREMENT ,
    name VARCHAR(100) NOT NULL,
    mobile NUMERIC(10) NOT NULL ,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY(user_id)
);

CREATE TABLE address(
    user_id INT NOT NULL,
    address VARCHAR(100) NOT NULL,
    FOREIGN KEY(user_id) references user(user_id)
    ON DELETE CASCADE
);

CREATE TABLE recipe(
    recipe_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price INT NOT NULL CHECK (price > 0),
    prep_time time NOT NULL,
    PRIMARY KEY(recipe_id) 
);

CREATE TABLE stock(
    ingredient_id INT NOT NULL AUTO_INCREMENT,
    ingredient_name VARCHAR(100) NOT NULL,
    quantity_available INT NOT NULL CHECK (quantity_available > 0),
    rate INT NOT NULL CHECK (rate > 0),
    PRIMARY KEY(ingredient_id)
);

CREATE TABLE ingredients(
    recipe_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    PRIMARY KEY(recipe_id, ingredient_id),
    FOREIGN KEY(recipe_id) references recipe(recipe_id)
    ON DELETE CASCADE,
    FOREIGN KEY(ingredient_id) references stock(ingredient_id)
    ON DELETE CASCADE
);

CREATE TABLE reviews(
    recipe_id INT NOT NULL, 
    user_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating > 0 AND rating < 6),
    comment VARCHAR(250),
    PRIMARY KEY(recipe_id, user_id),
    FOREIGN KEY(recipe_id) REFERENCES recipe(recipe_id)
    ON DELETE CASCADE,
    FOREIGN KEY(user_id) REFERENCES user(user_id)
    ON DELETE CASCADE
);

CREATE TABLE orders (
    order_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    order_time DATETIME NOT NULL,
    delivery_time DATETIME NOT NULL,
    remarks VARCHAR(250),
    bill INT NOT NULL CHECK (bill > 0),
    PRIMARY KEY(order_id),
    FOREIGN KEY(user_id) REFERENCES user(user_id)
    ON DELETE CASCADE
);

CREATE TABLE recipe_orders(
    order_id INT NOT NULL,
    recipe_id INT NOT NULL,
    PRIMARY KEY(order_id, recipe_id),
    FOREIGN KEY(order_id) REFERENCES orders(order_id)
    ON DELETE CASCADE,
    FOREIGN KEY(recipe_id) REFERENCES recipe(recipe_id)
    ON DELETE CASCADE
);
