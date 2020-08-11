// const env = process.env.NODE_ENV;
const env = 'prod';
// let DbName, domainName;
let DbName;
let domainName;
let mailPass = 'y&GFhE16U';
let mailService = 'organisation.connectivitysoftwaresolutions.com'

console.log('env db', env);

function getFromName(dbName, userName) {
  return dbName + "_" + userName.split('_')[1]
}
function getFullName(dbName, userName) {
  return dbName + "_" + userName
}

if (env === 'uat') {
  DbName = 'rentronic_uat'
  domainName = 'rentronicsuat.saimrc.com'
} else if (env === 'prod') {
  DbName = 'connectiv_fme';
  // domainName = 'http://organisation.connectivitysoftwaresolutions.com';
  // mailService = 'http://organisation.connectivitysoftwaresolutions.com';
  // mailPass = 'y&GFh$16U';
} else if (env === 'dev') {
  DbName = 'rentrodev_test';
  domainName = 'rentronicsdev.saimrc.com'
} else {  
  DbName = 'a1abiliti_fme'
  domainName = 'localhost:3002' 
}

module.exports = { 'prod': DbName, getFullName: getFullName, domainName: domainName, mailPass: mailPass, mailService: mailService, env: env };