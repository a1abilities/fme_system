SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
ALTER TABLE `exception_log`
CHANGE `message` `message` longtext COLLATE 'latin1_swedish_ci' NULL AFTER `code`;
ALTER TABLE `exception_log`
CHANGE `created_by` `created_by` varchar(500) NOT NULL AFTER `created_at`;