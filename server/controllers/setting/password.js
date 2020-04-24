const Password = require('../../models/setting/password.js');

const pwd = async function(req, res, next) {
  try {
    const user = await new Password({user_id : req.decoded.user_id}).pwd();
    const password = user[0].password.toString('utf8');
    
    res.send({ password });
  } catch (err) {
    next(err);
  }
};

const change = async function(req, res, next) {
  const passwordParam = {
    current_password : req.body.current_password,
    new_password : req.body.new_password,
    user_id : req.decoded.user_id,   
    id : req.decoded.id,         
  };
  // console.log('params', passwordParam);
  try {
    const changePassword = new Password(passwordParam);    
    const selectedPassword = await changePassword.passwordSelection();
    if(selectedPassword[0].password.toString('utf8') === passwordParam.current_password) {
      const response = await changePassword.update();
      
      res.send({isChanged: response.changedRows});
    }
    else{
      res.send({isChanged: 0});          
    }
          // res.send( result );
        // new Password({ user_id: req.decoded.user_id }).pwd().then(user => {
        //   const password = user[0].password.toString('utf8');
        //   res.send({ password });
        // });
  } catch (err) {
    next(err);
  }
};

module.exports = {change, pwd};