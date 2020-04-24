// const env = process.env.NODE_ENV;
const env = 'local';
// let DbName, domainName;
let DbName;
let domainName;
let mailPass = 'y&GFhE16U';
let mailService = 'rentronics.saimrc.com'

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
  DbName = 'a1ability_rentronic_prod';
  domainName = 'rentronics.a1abilities.co.nz';
  mailService = 'rentronics.a1abilities.co.nz';
  mailPass = 'y&GFh$16U';
} else if (env === 'dev') {
  DbName = 'rentrodev_test';
  domainName = 'rentronicsdev.saimrc.com'
} else {  
  DbName = 'rentronicsnew'
  domainName = 'localhost:3000' 
}

module.exports = { 'prod': DbName, getFullName: getFullName, domainName: domainName, mailPass: mailPass, mailService: mailService, env: env };