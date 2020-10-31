DROP TABLE reviews;
CREATE TABLE reviews(
    recipe_id INT NOT NULL, 
    user_id INT NOT NULL,
    rating INT NOT NULL,
    comment VARCHAR(250),
    PRIMARY KEY(recipe_id, user_id),
    FOREIGN KEY(recipe_id) REFERENCES recipe(recipe_id),
    FOREIGN KEY(user_id) REFERENCES user(user_id)
);

DROP TABLE recipe_orders;
CREATE TABLE recipe_orders(
    order_id INT NOT NULL,
    recipe_id INT NOT NULL,
    PRIMARY KEY(order_id, recipe_id),
    FOREIGN KEY(order_id) REFERENCES orders(order_id),
    FOREIGN KEY(recipe_id) REFERENCES recipe(recipe_id),
)

DROP TABLE orders;
CREATE TABLE orders (
    order_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    order_time DATETIME NOT NULL,
    delivery_time DATETIME NOT NULL,
    remarks VARCHAR(250),
    bill INT NOT NULL,
    PRIMARY KEY(order_id),
    FOREIGN KEY(user_id) REFERENCES user(user_id)
)