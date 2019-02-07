CREATE DATABASE bamazon_db
USE bamazon_db

CREATE TABLE products(
    item_id INT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(7,2) NOT NULL,
    stock_quantity INT(1000) default 0 NOT NULL,
    PRIMARY KEY (item_id)
)
