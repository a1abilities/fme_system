ALTER TABLE `fixed_order` ADD `bond_amt` DOUBLE(10,2) NULL DEFAULT NULL AFTER `minimum_payment_amt`;


CREATE TABLE `discount_rate_list` (
  `id` int(11) NOT NULL,
  `duration_in_year` int(11) DEFAULT NULL,
  `duration_period` varchar(100) DEFAULT NULL,
  `weekly_discount_rate` double DEFAULT NULL,
  `fortnightly_discount_rate` double DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



INSERT INTO `discount_rate_list` (`id`, `duration_in_year`, `duration_period`, `weekly_discount_rate`, `fortnightly_discount_rate`, `is_active`, `created_at`) VALUES
(1, 1, '1-12 Months', 47.05882, 23.4852, 1, '2019-12-09 04:07:42'),
(2, 2, '13-24 Months', 85.61643, 42.735042, 1, '2019-12-09 04:07:42'),
(3, 3, '25-36 Months', 117.09601, 58.51375, 1, '2019-12-09 04:07:42'),
(4, 4, '37-48 Months', 143.06151, 71.42857, 1, '2019-12-09 04:07:42'),
(5, 5, '49-60 Months', 164.20361, 82.03445, 1, '2019-12-09 04:07:42');


ALTER TABLE `discount_rate_list` ADD PRIMARY KEY (`id`);
ALTER TABLE `discount_rate_list` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
