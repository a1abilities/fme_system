-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 03, 2019 at 01:30 PM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.1.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rentronics`
--

-- --------------------------------------------------------

--
-- Table structure for table `accountant`
--

CREATE TABLE `accountant` (
  `id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `contact` varchar(10) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` timestamp NULL DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL,
  `modified_by` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accountant`
--

INSERT INTO `accountant` (`id`, `name`, `email`, `contact`, `created_at`, `created_by`, `modified_at`, `modified_by`) VALUES
(1, 'AV', 'av@gmail.com', '988803342', NULL, NULL, NULL, NULL),
(2, 'Pintu', 'pv@yahoo.com', '8099933344', NULL, NULL, NULL, NULL),
(3, 'Manish', 'ma@jiet.com', '9443267231', NULL, NULL, NULL, NULL),
(4, 'Nitin', 'ni@tam.com', '8333466788', NULL, NULL, NULL, NULL),
(5, 'Ashutoshvyas', 'avv@gmail.com', '9844589902', NULL, NULL, NULL, NULL),
(6, 'Tester', 'tst@gmail.com', '9462280992', NULL, NULL, NULL, NULL),
(7, 'test kumar', 'tku@tst1.com', '9222220000', NULL, NULL, NULL, NULL),
(8, 'Test', 'esha@test.com', '9999900022', NULL, NULL, NULL, NULL),
(9, 'TKumar', 'aqqqq@test.com', '9333333000', NULL, NULL, NULL, NULL),
(10, 'MSB', 'test@tst1.com', '4555555555', NULL, NULL, NULL, NULL),
(11, 'Tku', 'tku@tst2.com', '9333340000', NULL, NULL, NULL, NULL),
(12, 'AVyas', 'avyas@none.com', '9455500033', NULL, NULL, NULL, NULL),
(13, 'AVyas', 'avyas@none.com', '9455500033', NULL, NULL, NULL, NULL),
(14, 'AVyas', 'avyas@none.com', '9455500033', NULL, NULL, NULL, NULL),
(15, 'Shyam Das', 'sd@tst9.com', '9333400022', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `area`
--

CREATE TABLE `area` (
  `id` int(11) NOT NULL,
  `area_name` varchar(200) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `area`
--

INSERT INTO `area` (`id`, `area_name`, `city_id`, `is_active`) VALUES
(1, 'East', 1, 1),
(2, 'West', 1, 1),
(3, 'North', 1, 1),
(4, 'South', 1, 1),
(5, 'Central', 1, 1),
(6, 'East', 2, 1),
(7, 'West', 2, 1),
(8, 'North', 2, 1),
(9, 'South', 2, 1),
(10, 'Central', 2, 1),
(11, 'East', 3, 1),
(12, 'West', 3, 1),
(13, 'North', 3, 1),
(14, 'South', 3, 1),
(15, 'Central', 3, 1),
(16, 'East', 4, 1),
(17, 'West', 4, 1),
(18, 'North', 4, 1),
(19, 'South', 4, 1),
(20, 'Central', 4, 1),
(21, 'East', 5, 1),
(22, 'West', 5, 1),
(23, 'North', 5, 1),
(24, 'South', 5, 1),
(25, 'Central', 5, 1),
(28, 'East', 7, 1),
(29, 'West', 7, 1),
(30, 'North', 7, 1),
(31, 'South', 7, 1),
(32, 'Central', 7, 1),
(33, 'East', 6, 1),
(34, 'West', 6, 1),
(35, 'North', 6, 1),
(36, 'South', 6, 1),
(37, 'Central', 6, 1),
(43, 'East', 8, 1),
(44, 'West', 8, 1),
(45, 'North', 8, 1),
(46, 'South', 8, 1),
(47, 'Central', 8, 1);

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

CREATE TABLE `brand` (
  `id` int(3) NOT NULL,
  `brand_name` varchar(25) DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`id`, `brand_name`, `modified_at`, `created_at`) VALUES
(1, 'APPLE', NULL, NULL),
(2, 'HP', NULL, NULL),
(3, 'HUAWEI', NULL, NULL),
(4, 'UE BOOM', NULL, NULL),
(5, 'VIVIN Imports', NULL, NULL),
(6, 'KOGAN', NULL, NULL),
(7, 'LENOVO', NULL, NULL),
(8, 'LG', NULL, NULL),
(9, 'MICROSOFT', NULL, NULL),
(10, 'Midea', NULL, NULL),
(11, 'Mitsubishi', NULL, NULL),
(12, 'OPPO Phone', NULL, NULL),
(13, 'RENTRONICS', NULL, NULL),
(14, 'SAMSUNG', NULL, NULL),
(15, 'SONY', NULL, NULL),
(16, 'TCL', NULL, NULL),
(17, 'TSB Living', NULL, NULL),
(18, '@@@####$$$%%%', NULL, NULL),
(19, 'Tata', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `category` varchar(100) NOT NULL,
  `type` tinyint(11) DEFAULT NULL,
  `related_to` int(11) DEFAULT NULL,
  `modified_by` tinyint(4) DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL,
  `created_by` tinyint(4) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `category`, `type`, `related_to`, `modified_by`, `modified_at`, `created_by`, `created_at`) VALUES
(1, 'Appliances ', 1, NULL, NULL, NULL, 0, NULL),
(2, 'Furniture', 2, NULL, NULL, NULL, 0, NULL),
(3, 'Bed', 3, NULL, NULL, NULL, 0, NULL),
(4, 'TV', 2, NULL, NULL, NULL, 0, NULL),
(5, 'LED', 3, NULL, NULL, NULL, 0, NULL),
(6, 'Computing ', 1, NULL, NULL, NULL, 0, NULL),
(7, 'Laptop', 2, NULL, NULL, NULL, 0, NULL),
(8, 'Think', 3, NULL, NULL, NULL, 0, NULL),
(9, 'Business', 3, NULL, NULL, NULL, 0, NULL),
(10, 'Gaming', 3, NULL, NULL, NULL, 0, NULL),
(11, 'Convertible', 3, NULL, NULL, NULL, 0, NULL),
(12, 'Dektop', 2, NULL, NULL, NULL, 0, NULL),
(13, 'All in One', 3, NULL, NULL, NULL, 0, NULL),
(15, 'Television', 2, NULL, NULL, NULL, 0, NULL),
(16, 'LED', 3, NULL, NULL, NULL, 0, NULL),
(18, '11112@@@@@@@@@@@@@@', 2, NULL, NULL, NULL, 0, NULL),
(19, '1111111111############', 3, NULL, NULL, NULL, 0, NULL),
(21, 'Furniture', 2, NULL, NULL, NULL, 0, NULL),
(22, 'Beds', 3, NULL, NULL, NULL, 0, NULL),
(23, 'Laptop', 2, 6, NULL, NULL, 1, NULL),
(24, 'Business', 3, 23, NULL, NULL, 1, NULL),
(25, 'Desktop', 2, 6, NULL, NULL, 1, NULL),
(26, 'Business', 3, 25, NULL, NULL, 1, NULL),
(27, 'Server', 2, 6, NULL, NULL, 1, NULL),
(28, 'Office', 3, 27, NULL, NULL, 1, NULL),
(29, 'Personal', 3, 23, NULL, NULL, 1, NULL),
(30, 'Gaming', 3, 23, NULL, NULL, 1, NULL),
(31, 'Home ', 2, 1, NULL, NULL, 1, NULL),
(32, 'Washing Machine', 3, 31, NULL, NULL, 1, NULL),
(33, 'Refregirator', 3, 31, NULL, NULL, 1, NULL),
(34, 'OTG', 3, 31, NULL, NULL, 1, NULL),
(35, 'Dryers (Clothes)', 3, 31, NULL, NULL, 1, NULL),
(36, 'Microwave Oven', 3, 31, NULL, NULL, 1, NULL),
(37, 'Dish Washer', 3, 31, NULL, NULL, 1, NULL),
(38, 'Toaster', 3, 31, NULL, NULL, 1, NULL),
(39, 'Sandwitch Maker', 3, 31, NULL, NULL, 1, NULL),
(40, 'Irons', 3, 31, NULL, NULL, 1, NULL),
(41, 'Mixer Grinders', 3, 31, NULL, NULL, 1, NULL),
(42, 'Commercial', 2, 1, NULL, NULL, 1, NULL),
(43, 'Commercial', 2, 1, NULL, NULL, 1, NULL),
(44, 'Commercial', 2, 1, NULL, NULL, 1, NULL),
(45, 'Dish Washers', 3, 44, NULL, NULL, 1, NULL),
(46, 'Commercial', 2, 1, NULL, NULL, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `color`
--

CREATE TABLE `color` (
  `id` int(25) NOT NULL,
  `color` varchar(244) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `color`
--

INSERT INTO `color` (`id`, `color`, `created_at`, `created_by`) VALUES
(1, 'Black', NULL, NULL),
(2, 'Blue', NULL, NULL),
(3, 'Brown', NULL, NULL),
(4, 'Green', NULL, NULL),
(5, 'Grey', NULL, NULL),
(6, 'White', NULL, NULL),
(7, 'Yellow', NULL, NULL),
(8, 'Magenta', NULL, NULL),
(9, '@@@@@@@@', NULL, NULL),
(10, 'Navy Blue', NULL, NULL),
(11, 'Violet', NULL, NULL),
(12, 'Test Color', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `nbzn` varchar(20) DEFAULT NULL,
  `location` varchar(150) DEFAULT NULL,
  `director` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `contact` varchar(10) DEFAULT NULL,
  `alt_contact` varchar(10) DEFAULT NULL,
  `website` varchar(40) DEFAULT NULL,
  `accountant_id` int(11) DEFAULT NULL,
  `modified_by` timestamp NULL DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL,
  `created_by` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `company_id`, `name`, `nbzn`, `location`, `director`, `email`, `contact`, `alt_contact`, `website`, `accountant_id`, `modified_by`, `modified_at`, `created_by`, `created_at`) VALUES
(1, 1, 'Sarga Tech', 'NBZN234', '1/10 Elizabeth Street', 'Ashutosh Vyas', 'av@yahoo.com', '9462280992', '0291271167', 'www.st.com', 1, NULL, NULL, NULL, NULL),
(2, 1, 'Sarga Tech', 'NBZN234', '1/10 Elizabeth Street', 'Ravindra', 'rs@yahoo.com', '9462180991', '0291281177', 'www.st.com', 1, NULL, NULL, NULL, NULL),
(3, 2, 'Fudbocs Pvt Ltd', 'NZB2345', '1/233 Church Street', 'Ravi', 'ravish@gmail.com', '9455567700', '0291271167', 'www.fudbocs.com', 2, NULL, NULL, NULL, NULL),
(4, 2, 'Fudbocs Pvt Ltd', 'NZB2345', '1/233 Church Street', 'Antima', 'an@yahoo.com', '9999344445', '0291263790', 'www.fudbocs.com', 2, NULL, NULL, NULL, NULL),
(5, 3, 'JIET Pvt Ltd', 'NBN2311', '80/340 Malvern', 'Navneet', 'nv@jiet.com', '9833345567', '0291286815', 'www.jiet.com', 3, NULL, NULL, NULL, NULL),
(6, 3, 'JIET Pvt Ltd', 'NBN2311', '80/340 Malvern', 'Rakesh', 'ra@jiet.com', '9888600034', '0291286813', 'www.jiet.com', 3, NULL, NULL, NULL, NULL),
(7, 4, 'TAM Pvt Ltd', 'NBZ341', 'Brunswick', 'Ajay', 'aj@tam.com', '9555673321', '0291263970', 'www.tam.com', 4, NULL, NULL, NULL, NULL),
(8, 4, 'TAM Pvt Ltd', 'NBZ341', 'Brunswick', 'Anil', 'an@tam.com', '9556677880', '0291245789', 'www.tam.com', 4, NULL, NULL, NULL, NULL),
(9, 5, 'ThursDemo Pvt Ltd', 'NBN3421', 'Jodhpur', 'Praveen S', 'ps@outlook.com', '9461180993', '0291271167', 'www.thurs.com', 5, NULL, NULL, NULL, NULL),
(10, 5, 'ThursDemo Pvt Ltd', 'NBN3421', 'Jodhpur', 'Shrinivas', 'sn@gmail.com', '9414342820', '0291286817', 'www.thurs.com', 5, NULL, NULL, NULL, NULL),
(11, 6, 'Wed Pvt Ltd', 'NBN2310', 'Auckland', 'A Vyas', 'av@outlook.com', '9462280992', '0291271167', 'www.wed.com', 6, NULL, NULL, NULL, NULL),
(12, 7, 'TST1 Pvt Ltd', 'NBZN2311100', 'Auckland', 'HV Vyas', 'hv@tst1.com', '9322201111', '9333422201', '', 7, NULL, NULL, NULL, NULL),
(13, 8, 'TST1 Pvt Ltd', 'NBZN@@@@@@@', '@@@@@@', '!!!!!!!!!!!!!!!!!!!!!!!!!!!', 'ashutoshvyas78@outlook.com', '9462280992', '', 'www.####.com', 8, NULL, NULL, NULL, NULL),
(14, 9, 'TST Pvt Ltd', 'NBZN234111', 'Auckland', 'Ashutosh', 'ashu@tst1.com', '9462280992', '', '', 9, NULL, NULL, NULL, NULL),
(15, 10, 'TST1 Pt Ltd', 'NBZN11111', 'Auckland', 'BSM', 'bsm@tst1.com', '9333333300', '', '', 10, NULL, NULL, NULL, NULL),
(16, 11, 'TST2 Pvt Ltd', 'NBZN2222', 'Auckland', 'BSM', 'bsm@tst2.com', '99933333', '', '', 11, NULL, NULL, NULL, NULL),
(17, 12, 'TST3 Pvt Ltd', 'NBZN32221', 'Auckland', 'SRK', 'srk@none.com', '9003333000', '', 'www.tst3.com', 12, NULL, NULL, NULL, NULL),
(18, 13, 'TST3 Pvt Ltd', 'NBZN32221', 'Auckland', 'SRK', 'srk@none.com', '9003333000', '', 'www.tst3.com', 13, NULL, NULL, NULL, NULL),
(19, 14, 'TST3 Pvt Ltd', 'NBZN32221', 'Auckland', 'SRK', 'srk@none.com', '9003333000', '', 'www.tst3.com', 14, NULL, NULL, NULL, NULL),
(20, 15, 'TST9 ', 'NBZN30000', 'Christ', 'Test Singh', 'tsin@tst9.com', '9003330000', '', '', 15, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `franchise`
--

CREATE TABLE `franchise` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `fdbname` varchar(255) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `city_code` varchar(5) DEFAULT NULL,
  `suburb` varchar(20) DEFAULT NULL,
  `abn` varchar(150) DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` timestamp NULL DEFAULT NULL,
  `modified_by` timestamp NULL DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `franchise`
--

INSERT INTO `franchise` (`id`, `name`, `fdbname`, `city`, `city_code`, `suburb`, `abn`, `state`, `company_id`, `created_at`, `created_by`, `modified_by`, `modified_at`) VALUES
(1, 'ST', 'rentronics_auce', 'Auckland', 'AKL', 'Central', '1234', 2, 1, '2019-07-30 08:23:58', '0000-00-00 00:00:00', NULL, NULL),
(2, 'Fudbocs', 'rentronics_auea', 'Auckland', 'AKL', 'East', '1234', 2, 2, '2019-07-30 08:41:13', '0000-00-00 00:00:00', NULL, NULL),
(3, 'JIET', 'rentronics_chea', 'Christchurch', 'CHC', 'East', '1234', 4, 3, '2019-07-30 13:57:12', '0000-00-00 00:00:00', NULL, NULL),
(4, 'TAM', 'rentronics_chce', 'Christchurch', 'CHC', 'Central', '1234', 2, 4, '2019-07-30 14:06:06', '0000-00-00 00:00:00', NULL, NULL),
(5, 'ThurdayDemo', 'rentronics_auno', 'Auckland', 'AKL', 'North', '1234', 4, 5, '2019-08-01 11:57:57', '0000-00-00 00:00:00', NULL, NULL),
(6, 'Wed Testing ', 'rentronics_chno', 'Christchurch', 'CHC', 'North', '1234', 4, 6, '2019-08-07 06:37:23', '0000-00-00 00:00:00', NULL, NULL),
(7, 'Testing ST2', 'rentronics_auso', 'Auckland', 'AKL', 'South', '1234', 1, 11, '2019-08-28 12:58:03', '0000-00-00 00:00:00', NULL, NULL),
(8, 'Testing ST3', 'rentronics_auwe', 'Auckland', 'AKL', 'West', '1234', 1, 12, '2019-08-29 13:06:05', '0000-00-00 00:00:00', NULL, NULL),
(9, 'Testing ST9', 'rentronics_chso', 'Christchurch', 'CHC', 'South', '1234', 1, 15, '2019-08-29 13:16:16', '0000-00-00 00:00:00', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `franchise_state`
--

CREATE TABLE `franchise_state` (
  `id` tinyint(4) NOT NULL,
  `status` varchar(10) NOT NULL,
  `is_active` tinyint(4) NOT NULL,
  `created_by` tinyint(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modified_by` timestamp NULL DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `franchise_state`
--

INSERT INTO `franchise_state` (`id`, `status`, `is_active`, `created_by`, `created_at`, `modified_by`, `modified_at`) VALUES
(1, 'open', 1, 1, '2019-07-03 06:20:08', NULL, NULL),
(2, 'active', 1, 1, '2019-07-03 06:20:08', NULL, NULL),
(3, 'inactive', 1, 1, '2019-07-03 06:20:08', NULL, NULL),
(4, 'close', 1, 1, '2019-07-03 06:20:08', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `leads`
--

CREATE TABLE `leads` (
  `id` int(10) NOT NULL,
  `lead_id` varchar(255) DEFAULT NULL,
  `is_franchise_exist` tinyint(1) DEFAULT NULL,
  `franchise_id` int(10) NOT NULL,
  `franchise_name` varchar(255) DEFAULT NULL,
  `message` text,
  `document` text,
  `is_active` tinyint(4) DEFAULT NULL,
  `converted_to` tinyint(1) NOT NULL DEFAULT '0',
  `converted_by` int(10) NOT NULL DEFAULT '0',
  `converted_by_f_id` int(10) NOT NULL DEFAULT '0',
  `f_id` int(10) DEFAULT NULL,
  `created_by` tinyint(4) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `leads`
--

INSERT INTO `leads` (`id`, `lead_id`, `is_franchise_exist`, `franchise_id`, `franchise_name`, `message`, `document`, `is_active`, `converted_to`, `converted_by`, `converted_by_f_id`, `f_id`, `created_by`, `created_at`) VALUES
(1, 'l_1', NULL, 4, '', 'hello testing', 'accessory-burnt-ceremony-326627_1564655398893.jpg', 1, 1, 0, 0, 1, 2, '2019-08-01 10:29:59'),
(2, 'l_2', NULL, 0, NULL, 'hello test', 'DailyPrayer_1564655446703.jpg', 1, 1, 0, 0, 1, 2, '2019-08-01 10:30:47'),
(3, 'l_3', NULL, 0, 'All', 'For All Franchise', 'accessory-burnt-ceremony-326627_1564735984547.jpg', 1, 1, 0, 0, 0, 1, '2019-08-02 08:53:04'),
(4, 'l_4', NULL, 0, 'All ', 'Testing Lead Created by CSR JIET', '', 1, 1, 0, 0, 3, 5, '2019-08-02 09:06:09'),
(5, 'l_5', NULL, 2, '', 'In this area a person named Harshit need Mobile contact him in evening 9876543210', 'accessory-burnt-ceremony-326627_1564747338659.jpg', 1, 1, 0, 0, 4, 9, '2019-08-02 12:02:18'),
(6, 'l_6', 1, 0, NULL, 'A customer is looking for this product.', 'WhatsApp Image 2019-08-06 at 12_1565159419452.15', 1, 0, 0, 0, 0, 1, '2019-08-07 06:30:20'),
(7, 'l_7', 1, 0, NULL, 'Person is looking for this product', 'WhatsApp Image 2019-08-06 at 12_1565167934161.15', 1, 1, 3, 1, 1, 1, '2019-08-07 08:52:14'),
(8, 'l_8', 1, 0, NULL, '', '', 1, 0, 0, 0, 0, 1, '2019-08-14 12:09:52'),
(9, 'l_9', 1, 0, NULL, 'Customer is looking for Praveen', 'accessory-burnt-ceremony-326627_1565785608100.jpg', 1, 0, 0, 0, 2, 3, '2019-08-14 12:26:48'),
(10, 'L0000010', 0, 0, NULL, 'Testing Lead Allocation for All Franchise. Whether its available or not???', '', 1, 0, 0, 0, 0, 1, '2019-08-29 06:55:35'),
(11, 'L000011', 1, 2, NULL, 'tesa', 'business-people-calendar-cellphone-1187439_1567415768643.jpg', 1, 0, 0, 0, 1, 4, '2019-09-02 09:16:08');

-- --------------------------------------------------------

--
-- Table structure for table `lead_comment`
--

CREATE TABLE `lead_comment` (
  `id` int(10) NOT NULL,
  `l_id` int(10) NOT NULL,
  `comment` text NOT NULL,
  `comment_by` varchar(255) NOT NULL,
  `comment_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lead_comment`
--

INSERT INTO `lead_comment` (`id`, `l_id`, `comment`, `comment_by`, `comment_at`) VALUES
(1, 1, 'Check fast', 'Ravindra', '2019-08-01 10:30:28'),
(2, 2, 'call them in evening', 'Ravindra', '2019-08-01 10:32:30'),
(3, 4, 'Testing Kindly all check the leads', 'Master Admin', '2019-08-02 09:06:55'),
(4, 4, 'Testing Checked by Bhaira Ram, not for us', 'Bhaira Ram CSR TAM', '2019-08-02 09:07:59'),
(5, 5, 'Comment 1', 'Bhagyashree', '2019-08-02 12:06:39'),
(6, 5, 'Comment 2', 'Bhagyashree', '2019-08-02 12:06:53'),
(7, 5, 'Comment 3', 'Bhagyashree', '2019-08-02 12:07:10'),
(8, 5, 'Comment 4', 'Bhagyashree', '2019-08-02 12:07:43'),
(9, 5, 'Comment 5', 'Master Admin', '2019-08-02 12:08:23'),
(10, 3, 'This is for JIET Christchurch', 'CSR TAM', '2019-08-02 13:04:51'),
(11, 3, 'This is not for JIET Christchurch, it is for Fudbocs', '', '2019-08-02 13:06:10'),
(12, 4, 'This is for Fudbocs', 'Jitendra CSR JIET', '2019-08-02 13:17:14'),
(13, 4, 'Sorry this is for Sarga Tech', 'Jitendra CSR JIET', '2019-08-02 13:17:37'),
(14, 4, 'This may be for Fudbocs', 'CSR JIET', '2019-08-02 13:18:04'),
(15, 4, 'This is for ST', 'Anmol CSR ST', '2019-08-02 13:18:47'),
(16, 4, 'This is for Bhaira ram', 'CSR TAM', '2019-08-02 13:20:38'),
(17, 4, 'Testing Kindly all check the leads', 'CSR TAM', '2019-08-02 13:20:57'),
(18, 4, 'Fudbocs ', 'CSR TAM', '2019-08-02 13:21:14'),
(19, 4, 'Testing Kindly all check the leads', 'CSR TAM', '2019-08-02 13:21:33'),
(20, 4, 'Sorry this is for Sarga Tech', 'CSR TAM', '2019-08-02 13:21:57'),
(21, 6, 'This customer is also looking for more products', 'Master Admin', '2019-08-07 06:31:19'),
(22, 7, 'Not for ST Aukland', 'Franchise Admin ', '2019-08-07 08:55:24'),
(23, 7, 'Looking for proper Franchise', 'Anmol Vyas', '2019-08-13 02:15:01'),
(24, 7, 'Testing is going with Boss', 'Ashutosh', '2019-08-14 12:10:24'),
(25, 9, 'Viewed By Jitendra Choudhary', 'Jitu', '2019-08-14 12:28:50'),
(26, 9, 'Viewed by Bhom Singh', 'Bhom Singh', '2019-08-14 12:29:51'),
(27, 0, 'testing', 'Aneesh Jain ( ST  )', '2019-09-02 09:09:53'),
(28, 0, 'test', 'Aneesh Jain ( ST  )', '2019-09-02 09:10:05'),
(29, 0, 'terer', 'Aneesh Jain ( ST )', '2019-09-02 09:18:47'),
(30, 11, 'test', 'Aneesh Jain ( ST )', '2019-09-02 10:05:46');

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `id` smallint(6) NOT NULL,
  `city` varchar(50) NOT NULL,
  `city_code` varchar(5) NOT NULL,
  `modified_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`id`, `city`, `city_code`, `modified_at`, `created_at`) VALUES
(1, 'Auckland', 'AKL', NULL, NULL),
(2, 'Rotorua', 'ROT', NULL, NULL),
(3, 'Hamilton', 'HLZ', NULL, NULL),
(4, 'Wellington', 'WLG', NULL, NULL),
(5, 'Whangarei', 'WRE', NULL, NULL),
(6, 'Christchurch', 'CHC', NULL, NULL),
(7, 'Dunedin', 'DUD', NULL, NULL),
(8, 'Invercargill', 'IVC', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `master_staff`
--

CREATE TABLE `master_staff` (
  `id` int(11) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `user_id` varchar(20) NOT NULL,
  `password` blob NOT NULL,
  `location` varchar(200) NOT NULL,
  `contact` varchar(10) NOT NULL,
  `email` varchar(30) NOT NULL,
  `position` tinyint(4) NOT NULL,
  `created_by` tinyint(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modified_by` timestamp NULL DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `master_staff`
--

INSERT INTO `master_staff` (`id`, `first_name`, `last_name`, `user_id`, `password`, `location`, `contact`, `email`, `position`, `created_by`, `created_at`, `modified_by`, `modified_at`) VALUES
(1, 'shradha', 'Mathur', 'adha_7880', 0x8f87062ea3f247ebf1435932215f7dd0, 'Jodhpur', '32', 'bs2athur@gmail.com', 3, 1, '2019-09-02 13:55:11', NULL, NULL),
(2, 'shradha', 'Mathur', 'adha_5044', 0x8f87062ea3f247ebf1435932215f7dd0, 'Jodhpur', '1098', 'bsh66r@gmail.com', 1, 1, '2019-09-02 13:55:11', NULL, NULL),
(3, 'shradha', 'malani', 'adha_0066', 0x8f87062ea3f247ebf1435932215f7dd0, 'ju', '3246564454', '55athur@gmail.com', 4, 1, '2019-09-02 13:55:11', NULL, NULL),
(4, 'shradha', 'Mathur', 'adha_7775', 0xcc59f2913e168a1159da0855090a4e2e, 'Jodhpur', '5987878878', 'shrad@gj.com', 5, 1, '2019-09-02 13:56:03', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(10) NOT NULL,
  `maincat` int(10) DEFAULT NULL,
  `category` int(10) DEFAULT NULL,
  `subcat` int(10) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `color_id` int(2) DEFAULT NULL,
  `brand_id` int(2) DEFAULT NULL,
  `buying_price` varchar(255) DEFAULT NULL,
  `description` text,
  `specification` text,
  `brought` varchar(255) DEFAULT NULL,
  `invoice` varchar(255) DEFAULT NULL,
  `rental` varchar(255) DEFAULT NULL,
  `meta_keywords` varchar(255) DEFAULT NULL,
  `meta_description` text,
  `status` tinyint(3) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` timestamp NULL DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL,
  `modified_by` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `maincat`, `category`, `subcat`, `name`, `color_id`, `brand_id`, `buying_price`, `description`, `specification`, `brought`, `invoice`, `rental`, `meta_keywords`, `meta_description`, `status`, `created_at`, `created_by`, `modified_at`, `modified_by`) VALUES
(1, 1, 2, 3, 'Macho', 5, 7, '12000', 'ABC', 'XYZ', 'Bhagyashree Mathur Traders ', '1234/abcd', '15000', 'abc', 'abc', 3, '2019-07-18 12:54:52', '0000-00-00 00:00:00', NULL, '0000-00-00 00:00:00'),
(2, 1, 4, 5, 'LED TV', 1, 8, '1200', 'LED TV 32 Inch', 'LED TV', 'Auckland LG', '233', '10', 'none', 'none', 3, '2019-07-26 10:48:35', '0000-00-00 00:00:00', NULL, '0000-00-00 00:00:00'),
(3, 6, 7, 9, 'ThinkPad', 1, 7, '4000', 'ThinkPad X1', '20KHS0KV00 Ultralight, carbon-tough 14\" business Ultrabook Premium HDR display option with 100% color gamut Robust security to safeguard your data', 'Auckland Lenovo', 'INV345', '250', 'None', 'None', 3, '2019-07-30 09:10:31', '0000-00-00 00:00:00', NULL, '0000-00-00 00:00:00'),
(4, 6, 7, 9, 'ThinkPad E480', 5, 7, '3500', 'ThinkPad E480 35.5cms - Black', '14-inch essential laptop for SMB Powerful Intel® technology Impressive security features', 'Auckland Lenovo', 'INV342', '320', 'None', 'None', 3, '2019-07-30 09:11:53', '0000-00-00 00:00:00', NULL, '0000-00-00 00:00:00'),
(5, 6, 7, 9, 'ThinkPad X1', 1, 7, '3700', 'ThinkPad X1 Carbon 35.5cms', 'Ultralight, carbon-tough 14\" business Ultrabook, Premium HDR display option with 100% color gamut,Robust security to safeguard your data', 'Auckland Lenovo', 'INV322', '210', 'None', 'None', 3, '2019-07-30 09:21:18', '0000-00-00 00:00:00', NULL, '0000-00-00 00:00:00'),
(6, 6, 7, 10, 'Legion Y530', 1, 7, '6000', 'Legion Y530 Laptop 39.6cms - Black', '15-inch gaming  laptop Immersive graphics and sound White-backlit keyboard', 'Lenovo Auckland', 'INV880', '60', 'None', 'None', 3, '2019-07-30 12:23:12', '0000-00-00 00:00:00', NULL, '0000-00-00 00:00:00'),
(7, 6, 7, 10, 'ThinkPad X1 Extreme ', 5, 7, '6400', 'ThinkPad X1 Extreme 39.6cms - Black', '15.6\" VR/MR ready laptop Powerful Intel® CPU & NVIDIA® GeForce® graphics\nRobust biometric & encryption security', 'Lenovo Auckland', 'INV554', '45', 'None', 'None', 3, '2019-07-30 12:24:41', '0000-00-00 00:00:00', NULL, '0000-00-00 00:00:00'),
(8, 6, 12, 13, 'AIO 730s', 2, 7, '7800', 'Ideacentre AIO 730s', 'Up to 8th Gen Intel® Core™ i7-8550U Intel® integrated graphics Optional AMD Radeon™ 530 discrete graphics', 'Lenovo Auckland', 'INV450', '345', 'None', 'None', 3, '2019-07-30 12:32:44', '0000-00-00 00:00:00', NULL, '0000-00-00 00:00:00'),
(9, 6, 12, 13, 'AIO 520', 3, 7, '5900', 'Ideacentre AIO 520 (24, Intel)', '8th Gen Intel® Core™ i7-8700T Intel® Pentium® Gold G5400T AMD Radeon™ 530, 2 GB memory Up to 12 GB DDR4 with optional 16 GB Intel® Optane™ memory', 'Lenovo Auckland', 'INV776', '230', 'None', 'None', 3, '2019-07-30 12:35:23', '0000-00-00 00:00:00', NULL, '0000-00-00 00:00:00'),
(10, 6, 12, 13, 'AIO 520 (22, Intel)', 6, 7, '25000', 'Ideacentre AIO 520 (22, Intel)', '8th Gen Intel® Core™ i5-8400T Intel® Pentium® Gold G5400T AMD Radeon™ 530, 2 GB memory', 'Lenovo Auckland', 'INV667', '213', 'None', 'Noen', 3, '2019-07-30 12:37:13', '0000-00-00 00:00:00', NULL, '0000-00-00 00:00:00'),
(11, 6, 12, 13, 'AIO 330 (20)', 6, 7, '3600', 'Ideacentre AIO 330 (20)', 'Intel® Celeron®  Windows 10 Home Up to 8 GB DDR4 Up to 1 TB HDD Integrated graphics', 'Lenovo Auckland', 'INV552', '120', 'None', 'None', 3, '2019-07-30 12:45:11', '0000-00-00 00:00:00', NULL, '0000-00-00 00:00:00'),
(12, 6, 12, 13, 'A340', 1, 7, '6000', 'Ideacentre A340 (22)', 'Up to 8th Gen Intel® Core™ i5-8400T Windows 10 Home Intel® integrated graphics', 'Lenovo Auckland', 'INV667', '321', 'None', 'None', 3, '2019-07-30 12:46:53', '0000-00-00 00:00:00', NULL, '0000-00-00 00:00:00'),
(13, 14, 15, 5, 'QLED', 1, 14, '4000', 'QLED 8K Q900R ', 'Real 8K Resolution (7680 X 4320),8K AI Upscaling,100% Color Volume,Direct Full Array,Quantum Processor 8K,Ultra Viewing Angle,Quantum HDR 40x/32x/16x\nAmbient Mode,Bixby on TV,One Remote Control,SmartThing', 'Samung Auckland', 'INV34520', '0', 'None', 'None', 3, '2019-08-07 06:23:20', '0000-00-00 00:00:00', NULL, '0000-00-00 00:00:00'),
(14, 20, 21, 22, '@@@@@@', 1, 17, '1111', '@@@@aaaaaa', '', '11111111AAAAAAA', '', '111111', '1111WWWWW', 'WWWWW', 2, '2019-08-12 04:29:32', '0000-00-00 00:00:00', NULL, NULL),
(15, 1, 4, 5, 'LED 24 Inch', 2, 3, '23444', 'LED cccccc', '24 Inch Digital Setupbox, network card', 'Auckland', 'INV2345', '23', 'None', 'None', 2, '2019-08-14 11:25:39', '0000-00-00 00:00:00', NULL, '0000-00-00 00:00:00'),
(16, 6, 23, 24, 'ThinkPad X1 Yoga Gen 4', 1, 7, '23000', 'The ThinkPad X1 Yoga Gen 4 features the renowned 360-degree hinge to accommodate your style. This 14\" 2-in-1 laptop features a built-in suite of ThinkShield security features to protect all your critical data. And with the choice of a 4K display with Dolby Vision™ and Dolby Atmos™ Speaker  System', 'The ThinkPad X1 Yoga Gen 4 features the renowned 360-degree hinge to accommodate your style. This 14\" 2-in-1 laptop features a built-in suite of ThinkShield security features to protect all your critical data. And with the choice of a 4K display with Dolby Vision™ and Dolby Atmos™ Speaker  System', 'Lenovo Auckland', 'INV23400', '123', 'None', 'None', 1, '2019-08-17 12:38:08', '0000-00-00 00:00:00', NULL, NULL),
(17, 6, 23, 29, 'ThinkPad E490', 3, 7, '235767', 'Up to 8th Gen Intel® Core™ i7-8565U', 'Up to 8th Gen Intel® Core™ i7-8565U Windows 10 Pro 14” FHD IPS antiglare (1920 x 1080) 32GB (2 DIMM) Integrated Intel® graphics Dolby® Audio™', 'Lenovo Auckland', 'INV34009', '230', 'None', 'None', 1, '2019-08-17 12:46:36', '0000-00-00 00:00:00', NULL, NULL),
(18, 6, 23, 29, 'ThinkPad T490s', 5, 7, '12000', 'With lightweight portability and heavyweight performance, the ThinkPad T490s might just be our best T-Series model ever. ', '8th Gen Intel® Core™ i5/i7 vPro™ FHD IPS (1920 x 1080, 250 nit) WQHD IPS with Dolby Vision® (2560 x 1440, 500 nit, 100% Adobe color gamut) Up to 32GB', 'Lenovo Sydney', 'INV3001', '210', 'None', 'None', 1, '2019-08-17 12:48:59', '0000-00-00 00:00:00', NULL, NULL),
(19, 6, 25, 26, 'V530 Tower', 1, 7, '2900', 'Intel®-powered business productivity desktop\nEasy to manage and to use\nEnergy efficient', '8th Gen Intel® Core™ i7 processor Windows 10 Pro 32 GB DDR4 2666 MHz', 'Christchurch', 'INV4500', '300', 'None', 'None', 1, '2019-08-17 12:51:17', '0000-00-00 00:00:00', NULL, NULL),
(20, 6, 25, 26, 'V530s Tower', 1, 7, '35000', '7.4 L small form factor desktop\nEnhanced security features\nFor business productivity', ' 7th Gen Intel® Core™ i7 processor  Windows 10 Pro 32 GB DDR4 2666 MHz', 'Lenovo Melbourne', 'INC5670', '450', 'None', 'None', 1, '2019-08-17 12:54:37', '0000-00-00 00:00:00', NULL, NULL),
(21, 6, 27, 28, 'P330 Tower Gen 2', 3, 7, '120000', 'Powerhouse performance in a 18L tower workstation\nVR-ready & ISV-certified\nOn-board M.2 storage support', '9th Gen Intel® Core™ i7 or Intel® Xeon® E-series (up to 6 cores at 3.4GHz, up to 4.8GHz) Windows 10 Pro for Workstation 32 GB Intel® Optane™ NVMe M.2 or up to 64 GB 2666MHz UDIMMs (for ECC & non-ECC)', 'Lenovo', 'INV9002', '240', 'None', 'None', 1, '2019-08-17 12:57:04', '0000-00-00 00:00:00', NULL, '0000-00-00 00:00:00'),
(22, 6, 27, 28, 'P330 Tiny', 2, 7, '45009', '1L footprint, ISV-certified workstation\nPowerful, blazing-fast technology\nSupports up to 6 independent displays', '8th Generation Intel® Core™ vPro (with up to 6 cores) Windows 10 Pro, Ubuntu Linux (preload), or Redhat Linux (certified) 32GB with 16GB Intel® Optane™', 'LMJ', 'INV4320', '650', 'None', 'None', 1, '2019-08-17 12:59:40', '0000-00-00 00:00:00', NULL, NULL),
(23, 1, 31, 32, 'FHT1408SWL', 5, 8, '4000', '8.0 kg Washing Machine with Steam™ & TurboWash™ Technology', 'Combat germs with the power of Steam™\nFast & Clean Wash with TurboWash™\nOPTIMAL WASH for fabrics with 6 Motion DD\nLess vibration, Less noise\nSmartThinQ™ with Wi-Fi\nColor: Luxury Silver', 'LG NZ', 'INV5790', '120', 'None', 'None', 1, '2019-08-17 13:03:19', '0000-00-00 00:00:00', NULL, NULL),
(24, 1, 31, 33, 'GR-Q31FGNGL', 5, 8, '23899', 'LG SIGNATURE 984 Litre InstaView Door-in-Door™ Counter-Depth Refrigerator', 'LG SIGNATURE\nInstaView Door-in-Door™\nAUTO OPEN DOOR\nAUTO OPEN DRAWER\nTEXTURED STEEL FINISH', 'LG Auckland', 'INV4522', '320', 'None', 'None', 1, '2019-08-17 13:16:55', '0000-00-00 00:00:00', NULL, NULL),
(25, 1, 31, 34, 'MS2043DB', 5, 8, '4500', '20 L Solo with Glass Door', 'Healthy & Tasty Cooking\ni-wave\nEven Reheat & Defrost', 'LG Prav', 'INV21220', '290', 'None', 'None', 1, '2019-08-17 13:22:42', '0000-00-00 00:00:00', NULL, NULL),
(26, 1, 31, 32, 'TestPrd', 10, 19, '11', '@@@@@#$$$$!!!!!!', '#@@@@@@@@@@@@@@', '@ASS######', '@@@#####', '11', '', '', 1, '2019-08-29 08:35:28', '0000-00-00 00:00:00', NULL, '0000-00-00 00:00:00'),
(27, 1, 31, 36, 'None Only Testing', 3, 3, '6489', 'hghgjh', 'ygjhgjg', 'gghjgjg', 'hgjg776', '76767', 'bfdbdhg', 'hvnghug', 1, '2019-08-29 08:48:19', '0000-00-00 00:00:00', NULL, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `product_status`
--

CREATE TABLE `product_status` (
  `id` int(10) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_status`
--

INSERT INTO `product_status` (`id`, `status`, `created_at`, `modified_at`) VALUES
(1, 'Active', NULL, NULL),
(2, 'OnHold', NULL, NULL),
(3, 'Discontinued', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `name`, `is_active`, `created_by`, `created_at`) VALUES
(1, 'Super Admin', 1, 1, '2019-06-24 06:48:50'),
(2, 'Admin', 1, 1, '2019-06-24 06:48:50'),
(3, 'CSR', 1, 1, '2019-06-24 06:48:50'),
(4, 'Finance', 1, 1, '2019-06-24 06:48:50'),
(5, 'Delivery', 1, 1, '2019-06-24 06:48:50'),
(6, 'HR', 1, 1, '2019-06-24 06:48:50');

-- --------------------------------------------------------

--
-- Table structure for table `staff_position`
--

CREATE TABLE `staff_position` (
  `id` tinyint(4) NOT NULL,
  `position` varchar(60) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `staff_position`
--

INSERT INTO `staff_position` (`id`, `position`, `created_at`) VALUES
(1, 'Territory Manager', '2019-07-04 06:00:02'),
(2, 'Marketing Manager', '2019-07-04 06:00:02'),
(3, 'IT Specialist', '2019-07-04 06:00:02'),
(4, 'BDM ', '2019-08-14 11:28:14'),
(5, 'Accountant', '2019-07-04 06:00:02'),
(6, 'Sales Specialist', '2019-07-04 06:00:02');

-- --------------------------------------------------------

--
-- Table structure for table `task_status`
--

CREATE TABLE `task_status` (
  `id` int(6) UNSIGNED NOT NULL,
  `status` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `task_status`
--

INSERT INTO `task_status` (`id`, `status`) VALUES
(1, 'Scheduled'),
(2, 'In-Progress'),
(3, 'Reschedule'),
(4, 'Completed');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `franchise_id` int(11) DEFAULT NULL,
  `director_id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  `password` blob,
  `token` varchar(100) NOT NULL,
  `account_id` varchar(100) NOT NULL,
  `key` blob NOT NULL,
  `iv` blob NOT NULL,
  `designation` varchar(50) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_by` timestamp NULL DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `franchise_id`, `director_id`, `name`, `user_id`, `password`, `token`, `account_id`, `key`, `iv`, `designation`, `role_id`, `is_active`, `created_by`, `created_at`, `modified_by`, `modified_at`, `status`) VALUES
(1, NULL, 0, 'Master Admin', 'admin', 0x2271f2bbc9a0956b34271c56e694b598, '', '', '', '', '1', 1, 1, 0, '2019-07-30 07:42:09', NULL, NULL, 1),
(2, 1, 1, 'Ashutosh Vyas', 'ashu_auce_9530', 0x01d9d099a1972eec8f07185b1b3ccf32, '', '', '', '', '2', 2, 1, 1, '2019-07-30 08:23:58', NULL, NULL, 1),
(3, 1, 2, 'Ravindra', 'ravi_auce_0770', 0xa9ccf76787fbeef82b9965436b8c60db, '', '', '', '', '2', 2, 1, 1, '2019-07-30 08:23:58', NULL, NULL, 1),
(4, 2, 3, 'Ravi', 'ravi_auea_7270', 0x1790519307b505cf87dc8cf6cc52ae24, '', '', '', '', '2', 2, 1, 1, '2019-07-30 08:41:13', NULL, NULL, 1),
(5, 2, 4, 'Antima', 'anti_auea_0000', 0x59d080e574c909371fd443d0e3b6d4ea, '', '', '', '', '2', 2, 1, 1, '2019-07-30 08:41:13', NULL, NULL, 1),
(6, 3, 5, 'Navneet', 'navn_chea_2133', 0xd426a388cabe8f664ed4b4fa5fc5e200, '', '', '', '', '2', 2, 1, 1, '2019-07-30 13:57:12', NULL, NULL, 1),
(7, 3, 6, 'Rakesh', 'rake_chea_0000', 0x0b1baa2e00665b49459cb813e1eba2c8, '', '', '', '', '2', 2, 1, 1, '2019-07-30 13:57:12', NULL, NULL, 1),
(8, 4, 7, 'Ajay', 'ajay_chce_6881', 0xfcc18c0a558d7ae74fec440f0901f3be, '', '', '', '', '2', 2, 1, 1, '2019-07-30 14:06:06', NULL, NULL, 1),
(9, 4, 8, 'Anil', 'anil_chce_9538', 0xd8f1086325acd6837eae9fdb5532ad43, '', '', '', '', '2', 2, 1, 1, '2019-07-30 14:06:06', NULL, NULL, 1),
(10, 5, 9, 'Praveen S', 'prav_auno_5814', 0xfea714c90122eada258be70dc6f7a61b, 'OuJwkklgDH04PIQEVungnDf4m1Di1CUJwE4M1564660678', 'cVZUsPvuPl1564660678', '', '', '2', 2, 1, 1, '2019-08-01 11:57:57', NULL, NULL, 0),
(11, 5, 10, 'Shrinivas', 'shri_auno_2161', 0xc63b00964fcfe8f04d43aa8f9189843b, 'OuJwkklgDH04PIQEVungnDf4m1Di1CUJwE4M1564660678', 'cVZUsPvuPl1564660678', '', '', '2', 2, 1, 1, '2019-08-01 11:57:57', NULL, NULL, 0),
(12, 6, 11, 'A Vyas', 'a vy_chno_3173', 0x4811f2663cdaf3cdda88a79e0a9cd2da, 'A0xpIrKMeZmcd8qwWxU1BQZF3vhictwDx0YA1565159844', 'KgJSlmgsCv1565159844', '', '', '2', 2, 1, 1, '2019-08-07 06:37:24', NULL, NULL, 0),
(13, 5, 12, 'HV Vyas', 'hv v_auno_7717', 0xab64d069d73a1764237c90081b72fe67, 'IG4OQQwwsb9Xjy8yW9Ns83NIGETDVLoWsZ7l1566979100', 'VCsHgQkhsW1566979100', '', '', '2', 2, 1, 1, '2019-08-28 07:58:20', NULL, NULL, 0),
(14, 5, 13, '!!!!!!!!!!!!!!!!!!!!!!!!!!!', '!!!!_auno_9919', 0xf09d3317ce1ac1c4bdd01dc38013f7fc, '0ngnxJNPqUoIxtFxCkqCK1DfZY9YjoRjtezk1566980010', 'ZZrEALGdgU1566980010', '', '', '2', 2, 1, 1, '2019-08-28 08:13:30', NULL, NULL, 0),
(15, 5, 15, 'BSM', 'bsm_auno_3554', 0x51526433bdeff2f877bef1739d5443c9, '1m8OF1x4RDpslxiVzmsbhqCUQKSrZ1VKOaTb1566996802', 'CpQRlclZgY1566996802', '', '', '2', 2, 1, 1, '2019-08-28 12:53:22', NULL, NULL, 0),
(16, 7, 16, 'BSM', 'bsm_auso_3344', 0xb456567594cedff5bd7101383463796e, 'htzZQ6moe3fpYvkEniL3qewLMD3vY8ewhALz1566997083', 'vvowUQqIvH1566997083', '', '', '2', 2, 1, 1, '2019-08-28 12:58:03', NULL, NULL, 0),
(17, 8, 17, 'SRK', 'srk_auwe_1787', 0x06e1e66b593bec8eaad4b25ab34aa348, 'EIWVvWL3gMx8XIN6JSFlDXvKwqqux406b9XJ1567083966', 'TluYiXjIdJ1567083966', '', '', '2', 2, 1, 1, '2019-08-29 13:06:05', NULL, NULL, 0),
(18, 3, 18, 'SRK', 'srk_auwe_1787', 0x06e1e66b593bec8eaad4b25ab34aa348, 'SsBTQiptzY3YhScbbzy8EkMkqKQVR23wkQub1567084034', 'XJrIfXyQFj1567084034', '', '', '2', 2, 1, 1, '2019-08-29 13:07:13', NULL, NULL, 0),
(19, 9, 20, 'Test Singh', 'test_chso_8638', 0xa7e75e9baab72ac3dd3e6fd8836251b6, 'frU7wHIb3WhfmzmgKbD1yfGliDitKNDdYhbX1567084577', 'dExNqaXHhe1567084577', '', '', '2', 2, 1, 1, '2019-08-29 13:16:16', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`id`, `user_id`, `role_id`, `is_active`, `created_by`, `created_at`) VALUES
(1, 43, 2, 1, 1, '2019-07-17 09:45:27'),
(2, 44, 2, 1, 1, '2019-07-17 09:45:27'),
(3, 45, 2, 1, 1, '2019-07-17 09:58:51'),
(4, 46, 2, 1, 1, '2019-07-17 09:58:51'),
(5, 47, 2, 1, 1, '2019-07-17 14:01:02'),
(6, 2, 2, 1, 1, '2019-07-18 12:53:13'),
(7, 3, 2, 1, 1, '2019-07-18 12:53:13'),
(8, 4, 2, 1, 1, '2019-07-19 06:17:35'),
(9, 5, 2, 1, 1, '2019-07-19 11:48:12'),
(10, 6, 2, 1, 1, '2019-07-19 11:48:12'),
(11, 2, 2, 1, 1, '2019-07-30 08:23:58'),
(12, 3, 2, 1, 1, '2019-07-30 08:23:58'),
(13, 4, 2, 1, 1, '2019-07-30 08:41:14'),
(14, 5, 2, 1, 1, '2019-07-30 08:41:14'),
(15, 6, 2, 1, 1, '2019-07-30 13:57:12'),
(16, 7, 2, 1, 1, '2019-07-30 13:57:13'),
(17, 8, 2, 1, 1, '2019-07-30 14:06:06'),
(18, 9, 2, 1, 1, '2019-07-30 14:06:07'),
(19, 10, 2, 1, 1, '2019-08-01 11:57:58'),
(20, 11, 2, 1, 1, '2019-08-01 11:57:58'),
(21, 12, 2, 1, 1, '2019-08-07 06:37:24'),
(22, 10, 2, 1, 1, '2019-08-28 07:58:20'),
(23, 11, 2, 1, 1, '2019-08-28 07:58:20'),
(24, 13, 2, 1, 1, '2019-08-28 07:58:20'),
(25, 10, 2, 1, 1, '2019-08-28 08:13:30'),
(26, 11, 2, 1, 1, '2019-08-28 08:13:30'),
(27, 13, 2, 1, 1, '2019-08-28 08:13:30'),
(28, 14, 2, 1, 1, '2019-08-28 08:13:30'),
(29, 10, 2, 1, 1, '2019-08-28 12:53:22'),
(30, 11, 2, 1, 1, '2019-08-28 12:53:22'),
(31, 13, 2, 1, 1, '2019-08-28 12:53:22'),
(32, 14, 2, 1, 1, '2019-08-28 12:53:22'),
(33, 15, 2, 1, 1, '2019-08-28 12:53:22'),
(34, 16, 2, 1, 1, '2019-08-28 12:58:03'),
(35, 17, 2, 1, 1, '2019-08-29 13:06:05'),
(36, 6, 2, 1, 1, '2019-08-29 13:07:13'),
(37, 7, 2, 1, 1, '2019-08-29 13:07:13'),
(38, 18, 2, 1, 1, '2019-08-29 13:07:13'),
(39, 19, 2, 1, 1, '2019-08-29 13:16:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accountant`
--
ALTER TABLE `accountant`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `color`
--
ALTER TABLE `color`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `franchise`
--
ALTER TABLE `franchise`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `franchise_state`
--
ALTER TABLE `franchise_state`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lead_comment`
--
ALTER TABLE `lead_comment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_staff`
--
ALTER TABLE `master_staff`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `product_status`
--
ALTER TABLE `product_status`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `staff_position`
--
ALTER TABLE `staff_position`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `task_status`
--
ALTER TABLE `task_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accountant`
--
ALTER TABLE `accountant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `area`
--
ALTER TABLE `area`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `brand`
--
ALTER TABLE `brand`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `color`
--
ALTER TABLE `color`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `franchise`
--
ALTER TABLE `franchise`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `franchise_state`
--
ALTER TABLE `franchise_state`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `leads`
--
ALTER TABLE `leads`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `lead_comment`
--
ALTER TABLE `lead_comment`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `id` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `master_staff`
--
ALTER TABLE `master_staff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `product_status`
--
ALTER TABLE `product_status`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `staff_position`
--
ALTER TABLE `staff_position`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `task_status`
--
ALTER TABLE `task_status`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
