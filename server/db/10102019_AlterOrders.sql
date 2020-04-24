INSERT INTO order_status (id, order_status) VALUES (NULL, 'Cancelled by Rentronics'), (NULL, 'Cancelled by Customer');
ALTER TABLE orders ADD refund_amt INT NULL AFTER delivered_time, ADD cancel_reason VARCHAR(500) NULL AFTER refund_amt;
