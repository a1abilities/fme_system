const express = require('express');
const Lead = require('../../controllers/lead/lead.js');
const multer = require('multer');
const validateToken = require('../../utils').validateToken;

const storage = multer.diskStorage({
  destination: function (req, file, callback) {

    // if (process.env.NODE_ENV === 'development') {
      callback(null, './files/leads');
    // } else {
    //   callback(null, './build/');
    // }
  },
  filename: function (req, file, callback) {

    // if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
      // console.log("file name ", file.originalname);
      // console.log("file name ", Date.now() );
      // console.log("file name ", file.originalname.split('.')[1]);
      callback(null, file.originalname.split('.')[0] + "_" + Date.now() + '.' + file.originalname.split('.')[1]);
    // }
  }
});
const upload = multer({ storage: storage });
const leadRouter = express.Router();

leadRouter.route('/add').post(validateToken, upload.array('avatar'),  Lead.add);
leadRouter.route('/list').get(validateToken, Lead.all);
leadRouter.route('/last').get(validateToken, Lead.last);
leadRouter.route('/addComment').post(validateToken, Lead.addComment);
leadRouter.route('/allComment').post(validateToken, Lead.allComment);
leadRouter.route('/franchiseList').get(validateToken, Lead.franchiseList);
leadRouter.route('/convertedList').get(validateToken, Lead.convertedList);
leadRouter.route('/filter').post(validateToken, Lead.filter);
leadRouter.route('/search').post(validateToken, Lead.search);
leadRouter.route('/fetchLeads').post(validateToken, Lead.fetchLeads);

module.exports = leadRouter;