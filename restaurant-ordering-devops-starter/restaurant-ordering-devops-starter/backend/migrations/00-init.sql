CREATE DATABASE IF NOT EXISTS restaurantdb;
CREATE USER IF NOT EXISTS 'restaurant'@'%' IDENTIFIED BY 'restaurant_pass';
GRANT ALL PRIVILEGES ON restaurantdb.* TO 'restaurant'@'%';
FLUSH PRIVILEGES;
