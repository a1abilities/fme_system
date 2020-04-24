ALTER TABLE budget ADD paid_day VARCHAR(20) NULL AFTER afford_amt, ADD debited_day VARCHAR(20) NULL AFTER paid_day;
ALTER TABLE flex_order DROP duration;
ALTER TABLE enquiry ADD reason_to_delete VARCHAR(500) NULL AFTER converted_to;