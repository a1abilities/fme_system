ALTER TABLE orders ADD cancellation_charge DOUBLE(10,2) NULL AFTER refund_amt;
ALTER TABLE orders CHANGE refund_amt refund_amt DOUBLE(10,2) NULL DEFAULT NULL;
ALTER TABLE customer ADD dl_version_number INT NULL AFTER other_id_type;