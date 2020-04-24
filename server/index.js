
/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const http = require('http');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const { env } = require("./lib/databaseMySQLNew");

// Point static path to dist
if (env === 'dev' || env === 'uat' || env === 'prod') {
  app.use('/', express.static(path.join(__dirname, 'dist')));
  app.use('/dist', express.static(path.join(__dirname, 'dist')));
} else {
  app.use('/', express.static(path.join(__dirname, '..', 'src')));
  app.use('/src', express.static(path.join(__dirname, '..', 'src')));
}


const ExceptionLog = require('./controllers/exceptionLog');
const productManager = require('./routes/productManager');
const appointmentRouter = require('./routes/appointment');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const staffMaster = require('./routes/staffMaster');
const categoryRouter = require('./routes/category');
const staffPosition = require('./routes/staffPosition');
const brandRouter = require('./routes/product/brand');
const colorRouter = require('./routes/product/color');
const statusRouter = require('./routes/product/status');
const locationRouter = require('./routes/location');
const taskRouter = require('./routes/task');
const leadRouter = require('./routes/lead/lead');
const profileRouter = require('./routes/setting/profile');
const passwordRouter = require('./routes/setting/password');
const ReportRouter = require('./routes/Report');
const EzidebitRouter = require('./routes/Ezidebit');
const HistoryRouter = require('./routes/history');

// const PDFRouter = require('./routes/Pdf');

// Franchise

const franchiseStaff = require('./routes/franchise/staff');
const roleRouter = require('./routes/franchise/role');
const enquiryRouter = require('./routes/franchise/enquiry');
const orderRouter = require('./routes/franchise/order');
const StaticContentRouter = require('./routes/staticContent');

//Staff
const franchiseuser = require('./routes/franchiseuser');
const customerRouter = require('./routes/franchise/customer');

//EziDebit


const routes = require('./routes');

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/category', categoryRouter);

app.use('/api/brand', brandRouter);
app.use('/api/color', colorRouter);
app.use('/api/status', statusRouter);

app.use('/api/location', locationRouter);
app.use('/api/task', taskRouter);
app.use('/api/lead', leadRouter);
app.use('/api/user/staff', staffMaster);
app.use('/api/user/position', staffPosition);

app.use('/api/franchiseuser', franchiseuser);

app.use('/api/profile', profileRouter);
app.use('/api/changepassword', passwordRouter);
app.use('/api/productmanager', productManager);
app.use('/api/appointment', appointmentRouter);
app.use('/api/franchise/staff', franchiseStaff);
app.use('/api/franchise/customer', customerRouter);
app.use('/api/franchise/role', roleRouter);
app.use('/api/franchise/enquiry', enquiryRouter);
app.use('/api/franchise/order', orderRouter);
app.use('/api/report', ReportRouter);
app.use('/api/staticcontent', StaticContentRouter);
app.use('/api/run', require('./utils/run'));
app.use('/api/ezidebit', EzidebitRouter);
app.use('/api/history', HistoryRouter);

app.use('/api/download', function (req, res, nex) {
  try {
    const file = `${__dirname}/files/${req.query.path}`;
    res.download(file); // Set disposition and send it.
  } catch (error) {
    next(error);
  }
});

app.use('/', routes);

app.use(function (error, req, res, next) {
  // Any request to this server will get here, and will send an HTTP
  // response with the error message 'woops'
  console.log("Server Error....", error);
  const result = {
    error: `Server Error, Please contact administrator`
  };
  // if(error){res.status(error.statusCode).send(result.message);}else
  if (!error.statusCode) error.statusCode = 500;

  ExceptionLog.add({
    code: error.code,
    message: error.message,
    franchise_id: req.decoded ? req.decoded.franchise_id : 0,
    stack: error.stack,
    created_by: req.decoded ? req.decoded.created_by : 'System'
  });

  res.status(error.statusCode).send(result.message);
});


/** Get port from environment and store in Express. */
// const port = process.env.PORT || '3006'; // DEV
// const port = process.env.PORT || '3000'; // Local
// const port = process.env.PORT || '3005'; // UAT
// const port = process.env.PORT || '3007'; // PROD

let port;

if (env === 'dev') {
  port = 3006;
} else if (env === 'uat') {
  port = 3005;
} else if (env === 'prod') {
  port = 3007;
} else {
  port = 3000;
}

app.set('port', port);

/** Create HTTP server. */
const server = http.createServer(app);
/** Listen on provided port, on all network interfaces. */
server.listen(port, () => console.log(`Server Running on port ${port}`));
