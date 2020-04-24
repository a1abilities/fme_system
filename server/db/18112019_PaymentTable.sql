
CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `bankFailedReason` text NOT NULL,
  `bankReceiptID` varchar(50) NOT NULL,
  `bankReturnCode` varchar(5) NOT NULL,
  `customerName` varchar(100) NOT NULL,
  `debitDate` datetime NOT NULL,
  `eziDebitCustomerID` varchar(10) NOT NULL,
  `invoiceID` varchar(10) NOT NULL,
  `paymentAmount` double NOT NULL,
  `paymentID` varchar(10) NOT NULL,
  `paymentMethod` varchar(3) NOT NULL,
  `paymentReference` varchar(50) NOT NULL,
  `paymentSource` varchar(10) NOT NULL,
  `paymentStatus` varchar(2) NOT NULL,
  `settlementDate` datetime NOT NULL,
  `scheduledAmount` double NOT NULL,
  `transactionFeeClient` double NOT NULL,
  `transactionFeeCustomer` double NOT NULL,
  `transactionTime` time NOT NULL,
  `yourGeneralReference` varchar(50) NOT NULL,
  `yourSystemReference` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;


CREATE TABLE `paymentstatus` (
  `id` int(11) NOT NULL,
  `paymentReference` varchar(50) NOT NULL,
  `data` varchar(2) NOT NULL,
  `error` varchar(500) NOT NULL,
  `errorMessage` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `paymentstatus`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `paymentstatus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;