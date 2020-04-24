ALTER TABLE `orders` ADD `sales_person_id` INT NULL AFTER `product_related_to`;

INSERT INTO `role` (`id`, `name`, `state`, `created_by`, `created_at`) VALUES (NULL, 'S&M', '1', '1', CURRENT_TIMESTAMP);
