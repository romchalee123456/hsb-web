-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 12, 2024 at 09:26 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hugsangb_projects`
--

-- --------------------------------------------------------

--
-- Table structure for table `file`
--

CREATE TABLE `file` (
  `fileid` int(10) NOT NULL,
  `fileName` varchar(500) NOT NULL,
  `filePath` varchar(500) NOT NULL,
  `statusId` int(10) NOT NULL,
  `createOn` date NOT NULL DEFAULT current_timestamp(),
  `houseDetailid` int(10) NOT NULL,
  `backUpStatus` int(10) NOT NULL,
  `fileBackupPath` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `housedetail`
--

CREATE TABLE `housedetail` (
  `houseDetailid` int(10) NOT NULL,
  `createOn` date NOT NULL DEFAULT current_timestamp(),
  `houseDetailNameId` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `housedetailname`
--

CREATE TABLE `housedetailname` (
  `houseDetailNameid` int(10) NOT NULL,
  `createOn` date NOT NULL DEFAULT current_timestamp(),
  `houseDetailName` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `period`
--

CREATE TABLE `period` (
  `periodid` int(10) NOT NULL,
  `projectid` int(10) NOT NULL,
  `description` varchar(500) NOT NULL,
  `createOn` date NOT NULL,
  `periodStatusId` int(10) NOT NULL,
  `periodnameid` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `periodname`
--

CREATE TABLE `periodname` (
  `periodNameid` int(10) NOT NULL,
  `createOn` date NOT NULL,
  `periodName` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `projectid` int(10) NOT NULL,
  `projectName` varchar(500) DEFAULT NULL,
  `projectCode` varchar(500) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `createOn` datetime DEFAULT NULL,
  `amount` decimal(10,0) DEFAULT NULL,
  `userid` int(10) DEFAULT NULL,
  `projectStatusid` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_on` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `role` int(10) DEFAULT NULL,
  `TameName` varchar(100) DEFAULT NULL,
  `PhoneNumber` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `created_on`, `role`, `TameName`, `PhoneNumber`) VALUES
(1, 'John', 'Doe', 'john.doe@example.com', '$2a$10$FVtM8B8dLQUilVnwMiQykuCYoIdCcPxpvj8xZ0AwKbfcnLVkmLB6.', '2024-08-06 14:59:47.000000', 1, 'admin', 837012179);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `housedetail`
--
ALTER TABLE `housedetail`
  ADD PRIMARY KEY (`houseDetailid`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`projectid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `housedetail`
--
ALTER TABLE `housedetail`
  MODIFY `houseDetailid` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `projectid` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
