-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 06, 2020 at 10:59 AM
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
-- Database: `rentronicsnew_chea`
--

-- --------------------------------------------------------

--
-- Table structure for table `status_record`
--

CREATE TABLE `status_record` (
  `id` int(11) NOT NULL,
  `status_role` varchar(255) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `status_name` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `status_record`
--

INSERT INTO `status_record` (`id`, `status_role`, `status_id`, `status_name`, `is_active`, `created_by`, `created_at`) VALUES
(1, 'product_state', 1, 'Ordered', 1, 1, '2020-01-30 11:02:39'),
(2, 'product_state', 2, 'With Customer', 1, 1, '2020-01-30 11:02:39'),
(3, 'product_state', 3, 'Under Repair', 1, 1, '2020-01-30 11:02:39'),
(4, 'product_state', 4, 'Replaced', 1, 1, '2020-01-30 11:02:39'),
(5, 'product_state', 5, 'Faulty/With Customer', 1, 1, '2020-01-30 11:02:39'),
(6, 'product_state', 6, 'Faulty/Under Repair', 1, 1, '2020-01-30 11:02:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `status_record`
--
ALTER TABLE `status_record`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `status_record`
--
ALTER TABLE `status_record`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
