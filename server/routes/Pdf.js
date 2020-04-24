const express = require('express');
const pdf = require('html-pdf');
const pdfTemplate = require('../../src/modules/documents');
const validateToken = require('../utils').validateToken;
const pdfRouter = express.Router();

// locationRouter.route('/').get(validateToken, Location.getAll);
// locationRouter.route('/create-pdf').post(validateToken, Location.selectedArea);

pdfRouter.post('/create-pdf', (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
      if(err) {
          res.send(Promise.reject());
      }
      res.send(Promise.resolve());
  });
});

// pdfRouter.get('/fetch-pdf', (req, res) => {
//   res.sendFile(`${__dirname}/result.pdf`)
// })

// pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
//   if(err) {
//       res.send(Promise.reject());
//   }
//   res.send(Promise.resolve());
// });


module.exports = pdfRouter;
