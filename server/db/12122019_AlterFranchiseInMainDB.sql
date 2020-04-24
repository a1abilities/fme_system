ALTER TABLE `franchise`
CHANGE `created_by` `created_by` int NULL AFTER `created_at`,
CHANGE `modified_by` `modified_by` int NULL AFTER `created_by`;