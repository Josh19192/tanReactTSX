-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2024 at 12:45 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `child_vaccine`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_login`
--

CREATE TABLE `admin_login` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_login`
--

INSERT INTO `admin_login` (`id`, `username`, `password`) VALUES
(1, 'admin', 'BhsXkflnsm21232f297a57a5a743894a0e4a801fc3ls0a1L2');

-- --------------------------------------------------------

--
-- Table structure for table `child_info`
--

CREATE TABLE `child_info` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `sex` varchar(50) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `place_of_birth` varchar(100) DEFAULT NULL,
  `birth_method` varchar(50) DEFAULT NULL,
  `child_blood_type` varchar(5) DEFAULT NULL,
  `number` varchar(15) DEFAULT NULL,
  `mother_fname` varchar(50) DEFAULT NULL,
  `mother_mname` varchar(50) DEFAULT NULL,
  `mother_lname` varchar(50) DEFAULT NULL,
  `mother_blood_type` varchar(5) DEFAULT NULL,
  `mother_citizenship` varchar(50) DEFAULT NULL,
  `mother_occupation` varchar(50) DEFAULT NULL,
  `father_fname` varchar(50) DEFAULT NULL,
  `father_mname` varchar(50) DEFAULT NULL,
  `father_lname` varchar(50) DEFAULT NULL,
  `father_blood_type` varchar(5) DEFAULT NULL,
  `father_citizenship` varchar(50) DEFAULT NULL,
  `father_occupation` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `child_info`
--

INSERT INTO `child_info` (`id`, `first_name`, `middle_name`, `last_name`, `sex`, `birthdate`, `address`, `place_of_birth`, `birth_method`, `child_blood_type`, `number`, `mother_fname`, `mother_mname`, `mother_lname`, `mother_blood_type`, `mother_citizenship`, `mother_occupation`, `father_fname`, `father_mname`, `father_lname`, `father_blood_type`, `father_citizenship`, `father_occupation`) VALUES
(1, 'Joshua', 'Asilum', 'Tan', 'male', '2024-12-01', 'Lipanto Saint Bernard', 'La Union Medical Center', 'Normal', 'B-', '09323425324', '', '', '', '', '', '', '', '', '', '', '', ''),
(2, 'James', 'Kharl ', 'Vero', 'male', '2024-12-02', 'Minoyho San Juan', 'Libagon Center', 'CS', 'B-', '09235425455', '', '', '', '', '', '', '', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `shot_records`
--

CREATE TABLE `shot_records` (
  `id` int(11) NOT NULL,
  `child_id` int(11) NOT NULL,
  `vaccine_id` int(11) NOT NULL,
  `dose_no` int(50) NOT NULL,
  `shot_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shot_records`
--

INSERT INTO `shot_records` (`id`, `child_id`, `vaccine_id`, `dose_no`, `shot_date`) VALUES
(1, 1, 1, 1, '2024-12-10 09:03:45'),
(2, 1, 2, 1, '2024-12-10 09:04:08'),
(3, 2, 3, 1, '2024-12-10 09:06:17');

-- --------------------------------------------------------

--
-- Table structure for table `vaccine_tbl`
--

CREATE TABLE `vaccine_tbl` (
  `id` int(11) NOT NULL,
  `vaccine_name` varchar(50) NOT NULL,
  `vaccine_brand` varchar(50) NOT NULL,
  `dose` int(11) NOT NULL,
  `date_added` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vaccine_tbl`
--

INSERT INTO `vaccine_tbl` (`id`, `vaccine_name`, `vaccine_brand`, `dose`, `date_added`) VALUES
(1, 'Moderna', 'Nike', 4, '2024-12-10'),
(2, 'Lacena', 'Jordan', 3, '2024-12-10'),
(3, 'Fizer', 'Vanz', 2, '2024-12-10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_login`
--
ALTER TABLE `admin_login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `child_info`
--
ALTER TABLE `child_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shot_records`
--
ALTER TABLE `shot_records`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vaccine_tbl`
--
ALTER TABLE `vaccine_tbl`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_login`
--
ALTER TABLE `admin_login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `child_info`
--
ALTER TABLE `child_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `shot_records`
--
ALTER TABLE `shot_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `vaccine_tbl`
--
ALTER TABLE `vaccine_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
