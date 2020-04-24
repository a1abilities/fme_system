ALTER TABLE `budget` ADD `other_income` TEXT NULL AFTER `other_expenditure`;
ALTER TABLE `budget` CHANGE `other_expenditure` `other_expenditure` TEXT NULL DEFAULT NULL;