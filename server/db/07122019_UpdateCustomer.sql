ALTER TABLE `customer` ADD `first_name` VARCHAR(50) NULL DEFAULT NULL AFTER `customer_name`;
ALTER TABLE `customer` ADD `last_name` VARCHAR(50) NULL DEFAULT NULL AFTER `first_name`;
ALTER TABLE `customer` ADD `suburb` VARCHAR(100) NULL DEFAULT NULL AFTER `city`;

UPDATE customer SET first_name = SUBSTRING_INDEX(customer_name, ' ', 1), last_name = SUBSTRING_INDEX(customer_name, ' ', - (CHAR_LENGTH(customer_name) - CHAR_LENGTH(REPLACE(customer_name, ' ', ''))))