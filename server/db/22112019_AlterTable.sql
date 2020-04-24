ALTER TABLE `orders` ADD `ezidebit_uid` VARCHAR(20) NULL AFTER `order_id`;
INSERT INTO `order_status` (`id`, `order_status`) VALUES (NULL, 'Archived');