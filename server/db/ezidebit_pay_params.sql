-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 07, 2020 at 08:15 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rentronicsnew`
--

-- --------------------------------------------------------

--
-- Table structure for table `ezidebit_pay_params`
--

CREATE TABLE `ezidebit_pay_params` (
  `id` int(11) NOT NULL,
  `type` varchar(100) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `is_active` int(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ezidebit_pay_params`
--

INSERT INTO `ezidebit_pay_params` (`id`, `type`, `value`, `is_active`, `created_by`, `created_at`) VALUES
(1, 'paymentType', 'ALL', 1, 1, '2020-03-07 06:12:46'),
(2, 'paymentType', 'PENDING', 1, 1, '2020-03-07 06:12:46'),
(3, 'paymentType', 'FAILED', 1, 1, '2020-03-07 06:12:46'),
(4, 'paymentType', 'SUCCESSFUL', 1, 1, '2020-03-07 06:12:46'),
(5, 'paymentMethod', 'ALL', 1, 1, '2020-03-07 06:12:46'),
(6, 'paymentMethod', 'BANK ACCOUNT', 1, 1, '2020-03-07 06:12:46'),
(7, 'paymentMethod', 'CREDIT CARD', 1, 1, '2020-03-07 06:12:46'),
(8, 'paymentSource', 'ALL', 1, 1, '2020-03-07 06:12:46'),
(9, 'paymentSource', 'SCHEDULED', 1, 1, '2020-03-07 06:12:46'),
(10, 'paymentSource', 'WEB', 1, 1, '2020-03-07 06:12:46'),
(11, 'paymentSource', 'PHONE', 1, 1, '2020-03-07 06:12:46'),
(12, 'paymentSource', 'BPAY', 1, 1, '2020-03-07 06:12:46'),
(13, 'paymentSource', 'ADJ', 1, 1, '2020-03-07 06:12:46'),
(14, 'dateField', 'PAYMENT', 1, 1, '2020-03-07 06:12:46'),
(15, 'dateField', 'SETTLEMENT', 1, 1, '2020-03-07 06:12:46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ezidebit_pay_params`
--
ALTER TABLE `ezidebit_pay_params`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ezidebit_pay_params`
--
ALTER TABLE `ezidebit_pay_params`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
