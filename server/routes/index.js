const path = require('path');
const router = require('express').Router();
const { env } = require("../lib/databaseMySQLNew");


router.get('*', (req, res) => {
  // console.log("path...",path.join(__dirname));
  // console.log("path...",path.join(__dirname, '..'));
  // console.log("path...",path.join(__dirname,'..', '..'));
  // console.log("path...",path.join(__dirname, '..', '..', 'dist'));

  // const route = path.join(__dirname, '..', 'dist', 'index.html');
  // Point static path to dist
  if (env === 'dev' || env === 'uat' || env === 'prod') {
    const route = path.join(__dirname, '..', 'dist', 'index.html');
    res.sendFile(route);
  } else {
    const route = path.join(__dirname, '..', '..', 'src', 'index.html');
    res.sendFile(route);
  }
});

module.exports = router;
