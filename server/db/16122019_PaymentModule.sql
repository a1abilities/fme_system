CREATE TABLE IF NOT EXISTS `status_payment` ( `id` int(11) NOT NULL AUTO_INCREMENT, `status` varchar(100) DEFAULT NULL, `is_active` int(11) DEFAULT '1',  PRIMARY KEY (id));
CREATE TABLE IF NOT EXISTS `payment_schedules` ( `id` bigint(20) NOT NULL AUTO_INCREMENT, `order_id` int(11) DEFAULT NULL, `customer_id` int(11) DEFAULT NULL, `transaction_id` int(11) DEFAULT NULL, `installment_no` int(11) DEFAULT NULL, `payment_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00', `settlement_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00', `payment_amt` double DEFAULT NULL, `total_paid` double DEFAULT NULL, `remark` text, `status` int(11) DEFAULT NULL, `is_active` tinyint(1) DEFAULT NULL, `created_by` int(11) DEFAULT NULL, `updated_by` int(11) DEFAULT NULL, `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id));
CREATE TABLE IF NOT EXISTS `payment_transaction` ( `id` int(11) NOT NULL AUTO_INCREMENT, `customer_id` int(11) DEFAULT NULL, `order_id` int(11) DEFAULT NULL, `transaction_date` datetime DEFAULT NULL, `transaction_amt` double DEFAULT NULL, `is_active` tinyint(4) DEFAULT NULL, `created_by` int(11) DEFAULT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id));




INSERT INTO `status_payment` (`id`, `status`, `is_active`) VALUES
(1, 'Pending', 1),
(2, 'Paid', 1),
(3, 'Advance Paid', 1),
(4, 'Partial Paid', 1),
(5, 'Advance Partial Paid', 1),
(6, 'Dishonoured', 1),
(7, 'Past Due', 1),
(8, 'Partial Dishonoured', 1),
(9, 'Failed', 1),
(10, 'Fatal Dishonoured', 1),
(11, 'Late Paid', 1),
(12, 'Partial Late Paid', 1),
(13, 'Remaining Partial Paid', 1),
(14, 'Remaining Partial Paid in Advance', 1),
(15, 'Remaining Late Paid', 1),
(16, 'Partial Pending', 1),
(17, 'Partial Past Due', 1);