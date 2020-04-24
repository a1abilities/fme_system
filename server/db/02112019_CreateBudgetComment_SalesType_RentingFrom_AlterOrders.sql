ALTER TABLE `orders` ADD `sales_type_id` INT NULL DEFAULT NULL AFTER `product_related_to`, ADD `renting_for_id` INT NULL DEFAULT NULL AFTER `sales_type_id`;


CREATE TABLE `budget_comment` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `budget_id` int(11) DEFAULT NULL,
  `comment` varchar(1000) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `budget_comment`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `budget_comment` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;







CREATE TABLE `renting_for_list` (
  `id` int(11) NOT NULL,
  `renting_for_name` varchar(100) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `renting_for_list`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `renting_for_list` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;


INSERT INTO `renting_for_list` (`id`, `renting_for_name`, `is_active`, `created_by`, `created_at`) VALUES
(1, 'Personal Use', 1, NULL, '2019-11-02 09:57:53'),
(2, 'Liesure', 1, NULL, '2019-11-02 09:57:53'),
(3, 'Family', 1, NULL, '2019-11-02 09:57:53'),
(4, 'Gift', 1, NULL, '2019-11-02 09:57:53'),
(5, 'Essential', 1, NULL, '2019-11-02 09:57:53'),
(6, 'Other', 1, NULL, '2019-11-02 09:57:53');







CREATE TABLE `sales_type_list` (
  `id` int(11) NOT NULL,
  `sales_type_name` varchar(100) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `sales_type_list`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `sales_type_list` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;


INSERT INTO `sales_type_list` (`id`, `sales_type_name`, `is_active`, `created_by`, `created_at`) VALUES
(1, 'Internet', 1, NULL, '2019-11-02 09:49:36'),
(2, 'Walk-in', 1, NULL, '2019-11-02 09:49:36'),
(3, 'Reference', 1, NULL, '2019-11-02 09:49:36'),
(4, 'Existing', 1, NULL, '2019-11-02 09:49:36'),
(5, 'Phone Sales', 1, NULL, '2019-11-02 09:49:36'),
(6, 'Door 2 Door (D2D)', 1, NULL, '2019-11-02 09:49:36'),
(7, 'Paid Leads', 1, NULL, '2019-11-02 09:49:36');

