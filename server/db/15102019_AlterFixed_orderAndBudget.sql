ALTER TABLE fixed_order ADD discount DOUBLE(10,2) NULL AFTER ppsr_fee;
ALTER TABLE budget ADD vehicle_fuel DOUBLE(10,2) NULL AFTER vehicle_finance;
ALTER TABLE `flex_order` DROP `no_of_payment`, DROP `total_payment_amt`;
