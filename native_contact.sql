-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2024 at 01:34 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `native_contact`
--

-- --------------------------------------------------------

--
-- Table structure for table `contact_master`
--

CREATE TABLE `contact_master` (
  `id` int(11) NOT NULL,
  `cname` tinytext NOT NULL,
  `domain` tinytext NOT NULL,
  `mobile_no` bigint(11) NOT NULL,
  `email` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_master`
--

INSERT INTO `contact_master` (`id`, `cname`, `domain`, `mobile_no`, `email`) VALUES
(24, 'Hh', 'Gg', 7383294925, ''),
(25, 'Jjbbb', 'Hbvv', 9855, ''),
(26, 'Forollyfood', 'Domain name', 7383294949, 'ahmadpadarwala4@gmail.com'),
(27, 'Hiii', 'Fonvf', 3698521470, ''),
(28, 'Amannsn', 'Snnsnsjsj', 4964646, 'Jajshhajssn@gmail.com'),
(29, 'Wjjssbsh', 'Nsnsjsh', 7664679, 'ahmadpadarwala4@gmail.com'),
(30, 'Iviv', 'Bhn', 66666, ''),
(31, 'Jjkjjjjjjj', 'Njnnn', 666, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact_master`
--
ALTER TABLE `contact_master`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact_master`
--
ALTER TABLE `contact_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
