CREATE TABLE `exception_log`
(
  `id` int(11) NOT NULL,
  `code` varchar(50) DEFAULT NULL,
  `message` varchar(200) DEFAULT NULL,
  `franchise_id` int(11) DEFAULT NULL,
  `stack` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` tinyint(4) NOT NULL
);

ALTER TABLE `exception_log`
ADD PRIMARY KEY
(`id`);

-- AUTO_INCREMENT for table `exception_log`
--
ALTER TABLE `exception_log`
 MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
