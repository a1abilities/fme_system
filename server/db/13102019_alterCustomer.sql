ALTER TABLE `customer`
ADD `is_verified` TINYINT
(1) NOT NULL DEFAULT '0' AFTER `state`;
