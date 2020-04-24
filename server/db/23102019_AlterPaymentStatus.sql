ALTER TABLE fixed_order CHANGE discount liability_wavier_fee DOUBLE(10,2) NULL DEFAULT NULL;
ALTER TABLE payment_status ADD sub_installment_no TINYINT NULL DEFAULT '0' AFTER installment_no;
ALTER TABLE payment_status ADD due_installment_amt DOUBLE(10,2) NULL AFTER total_paid;