const nodemailer = require('nodemailer');

const Auth = require("../models/auth.js")
const User = require("../models/user.js")
const Customer = require("../models/franchise/customer.js")

const jwt = require('jsonwebtoken');
const { trans } = require("../lib/mailtransporter");
const { domainName } = require("../lib/databaseMySQLNew");

var encryptionHelper = require("../lib/simple-nodejs-iv-encrypt-decrypt.js")
var algorithm = encryptionHelper.CIPHERS.AES_256;

const login = async function (req, res, next) {
  let params = {
    name: req.body.username,
    password: req.body.password
  };
  const auth = new Auth(params);
  let result = {};
  let status = 201;
  
  try {
    const user = await auth.login();

    console.log("user....************.", user)
  
    if (user && user.length > 0) {
      if (user[0].status === 0) {
        status = 401;
        result.errorCode = status;
        result.message = `Account is not verified`;
      } else if (user[0].franchise_status !== 2) {
        status = 401;
        result.errorCode = status;
        result.message = 'Franchise is not active, contact to your administrator.';
      } else if (user[0].password.toString('utf8') === params.password) {
        status = 200;
        const payload = { id: user[0].id, user: params.name, user_id: user[0].user_id, franchise_id: user[0].franchise_id, role: user[0].role_id };
        const options = { expiresIn: '12h', issuer: 'https://sargatechnology.com' };
        const secret = process.env.JWT_SECRET || 'secret';
        const token = jwt.sign(payload, secret, options);

        result.token = token;
        result.status = status;
        result.result = params.name;
        result.role_name = user[0].role_name;
        result.role_id = user[0].role_id;
        result.user_name = user[0].user_name;
        result.franchise_id = user[0].franchise_id || '';
        result.user_id = user[0].id;
        result.uid = user[0].user_id;
      } else {
        status = 401;
        result.errorCode = status;
        result.message = `Incorrect Password`;
      }
      res.status(status).send(result);
    } else {
      status = 401;
      result.errorCode = status;
      result.message = 'Invalid account.';
      res.status(status).send(result);
    }
  } catch (err) {
    next(err);
  }
};

const verifyEmail = async function (req, res, next) {
  let params = {};
  let isCustomer = req.query.customer

  console.log(".....Customer query...", req.query);
  try {

    if (isCustomer == "true") {
      const customer = new Customer({});
      const email = req.query.email;
      const id = req.query.id;
      const createdBy = req.query.createdBy;

      const customerData = await customer.verifyEmail(email, id, createdBy);
      console.log('............. customer .........', customerData);

      if (customerData && customerData.length > 0 && customerData[0].email === email) {
        await customer.updateStatus(id, createdBy);
        res.status(200).json({ message: "You account successfully verified." });
      } else {
        res.status(404).json({ message: "Invalid token" })
      }
    } else {
      let accountId = req.query.accountId;
      let token = req.query.token;
      let name = req.query.name;

      params = {
        accountId: accountId,
        token: 1,
        name: name
      };

      const auth = new Auth(params);

      const user = await auth.verifyEmail(accountId);
      console.log('............. user .........', user);
      let userToken = user[0].token
      if (token && token.length > 10 && token === userToken) {
        await new User({}).updateStatus(params.name);
        // if (userSaveError) {
        console.log("could not clear the token");
        res.status(200).json({ message: "You account successfully verified. Now you can login into application." });
        // } else {
        //   console.log("token cleared")
        //   res.status(200).json({ message: "verified" })
        // }
      } else {
        res.status(404).json({ message: "Invalid token" })
      }

    }

    // }).catch(err => {
    //   console.log("Error", err)
    //   status = 500;
    //   result.errorCode = status;
    //   result.message = 'Application Error, Please contact the administrator.';
    //   res.status(status).send(result);
    // });
  } catch (error) {
    next(error);
  }
}

const forgotPassword = async function (req, res, next) {
  let params = {
    name: req.body.username,
  };

  const auth = new Auth(params);
  let result = {};
  let status = 201;

  try {
    if (params.name.toLowerCase() === "admin") {
      status = 500;
      result.errorCode = status;
      result.message = 'Please contact system administrator to reset password.';
      res.status(status).send(result);
    } else {

      const user = await auth.forgotPassword();
      // encryptionHelper.getKeyAndIV("1234567890abcdefghijklmnopqrstuv", function (data) { //using 32 byte key

      console.log("user....************.", user)
      // var decText = encryptionHelper.decryptText(algorithm, user[0].key, user[0].iv, user[0].password, "base64");
      // console.log("decText....************.", decText)

      if (user && user.length > 0) {

        // if(user[0].status === 0) {
        //   status = 401;
        //   result.errorCode = status;
        //   result.message = `Account is not verified`;
        // } else {
        status = 200;
        // Create a token
        const mail = {
          from: 'admin@' + domainName,
          to: user[0].email,
          subject: 'Forgot Password',
          text: 'forgot password ',
          html: '<strong> password: </strong>' + user[0].password
        }

        trans.sendMail(mail, (err, info) => {
          if (err) {
            return console.log(err);
          }

          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });

        result.status = status;
        result.message = `Email send successfully`;

        // }

        res.status(status).send(result);
      } else {
        status = 401;
        result.errorCode = status;
        result.message = 'Given User Name is not valid.';
        res.status(status).send(result);
      }
      // });
      // }).catch(err => {
      //   console.log("Error", err)
      //   status = 500;
      //   result.errorCode = status;
      //   result.message = 'Application Error, Please contact the administrator.';
      //   res.status(status).send(result);
      // });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { login: login, verifyEmail: verifyEmail, forgotPassword: forgotPassword };