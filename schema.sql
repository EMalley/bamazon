CREATE DATABASE bamazon_db
USE bamazon_db

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(7,2) NOT NULL,
    stock_quantity INT(1000) default 0 NOT NULL,
    PRIMARY KEY (item_id)
);
	INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("50inch Tv", "electronics", 700.00, 25), ("Iphone 7", "electronics", 800.00, 50),
    ("chocolate bar", "food", 2.50, 500), ("Red Sweatshirt", "clothing", 15.25, 200),
    ("dog food", "pets", 10.77, 250), ("32oz Water Bottle", "sports/fitness", 27.80, 80),
    ("bluetooth speaker", "electronics", 150.00, 10), ("Blue Suade Shoes", "clothing", 65.88, 10),
    ("computer monitor", "electronics", 200.00, 33), ("Acoustic Guitar", "Music", 499.99, 3);
