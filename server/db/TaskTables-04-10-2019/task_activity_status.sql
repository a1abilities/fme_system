-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 04, 2019 at 02:59 PM
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
-- Database: `rentronicsnew_auce`
--

-- --------------------------------------------------------

--
-- Table structure for table `task_activity_status`
--

CREATE TABLE `task_activity_status` (
  `id` int(11) NOT NULL,
  `activity` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `task_activity_status`
--

INSERT INTO `task_activity_status` (`id`, `activity`) VALUES
(1, 'New Task Created'),
(2, 'Task Description Changed'),
(3, 'Task has been started by Assignee'),
(4, 'Task assigned to other person'),
(5, 'Due date changed by Task Creator'),
(6, 'New message or document added'),
(7, 'Request to Reschedule'),
(8, 'Task rescheduled'),
(9, 'Task completed');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `task_activity_status`
--
ALTER TABLE `task_activity_status`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `task_activity_status`
--
ALTER TABLE `task_activity_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
