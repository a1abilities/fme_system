ALTER TABLE enquiry ADD is_existing_customer TINYINT NULL AFTER enquiry_id, ADD customer_id INT NULL AFTER is_existing_customer;

ALTER TABLE task_assign ADD created_by_role INT NULL AFTER is_active;

ALTER TABLE task_assign CHANGE created_by_role created_by_role VARCHAR(20) NULL DEFAULT NULL;