CREATE DATABASE cook_at_home;
use cook_at_home;

CREATE TABLE user (
    user_id int not null auto_increment ,
    name varchar(100) not null,
    mobile numeric(10) not null ,
    email varchar(50) not null,
    password varchar(50) not null,
    primary key(user_id)
);

CREATE TABLE address(
    user_id int not null,
    address varchar(100) not null,
    foreign key(user_id) references user(user_id)
);

CREATE TABLE recipe(
    recipe_id int not null auto_increment,
    name varchar(100) not null,
    price int not null,
    prep_time time not null,
    primary key(recipe_id) 
);

CREATE TABLE stock(
    ingredient_id int not null auto_increment,
    ingredient_name varchar(100) not null,
    quantity_available int not null,
    rate int not null,
    primary key(ingredient_id)
);

CREATE TABLE ingredients(
    recipe_id int not null,
    ingredient_id int not null,
    quantity int not null,
    primary key(recipe_id),
    foreign key(recipe_id) references recipe(recipe_id),
    foreign key(ingredient_id) references stock(ingredient_id)
);

CREATE TABLE reviews(
    recipe_id INT NOT NULL, 
    user_id INT NOT NULL,
    rating INT NOT NULL,
    comment VARCHAR(250),
    PRIMARY KEY(recipe_id, user_id),
    FOREIGN KEY(recipe_id) REFERENCES recipe(recipe_id),
    FOREIGN KEY(user_id) REFERENCES user(user_id)
);

<<<<<<< HEAD
DROP TABLE recipe_orders;
CREATE TABLE recipe_orders(
    order_id INT NOT NULL,
    recipe_id INT NOT NULL,
    PRIMARY KEY(order_id, recipe_id),
    FOREIGN KEY(order_id) REFERENCES orders(order_id),
    FOREIGN KEY(recipe_id) REFERENCES recipe(recipe_id),
)

DROP TABLE orders;
=======
>>>>>>> 84aa4c6324b7ba2cba35eac3d186213571784b82
CREATE TABLE orders (
    order_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    order_time DATETIME NOT NULL,
    delivery_time DATETIME NOT NULL,
    remarks VARCHAR(250),
    bill INT NOT NULL,
    PRIMARY KEY(order_id),
    FOREIGN KEY(user_id) REFERENCES user(user_id)
<<<<<<< HEAD
)
=======
);

CREATE TABLE recipe_orders(
    order_id INT NOT NULL,
    recipe_id INT NOT NULL,
    PRIMARY KEY(order_id, recipe_id),
    FOREIGN KEY(order_id) REFERENCES orders(order_id),
    FOREIGN KEY(recipe_id) REFERENCES recipe(recipe_id)
);
>>>>>>> 84aa4c6324b7ba2cba35eac3d186213571784b82
