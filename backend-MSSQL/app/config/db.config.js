module.exports = {
  HOST: "localhost",
  PORT: "1433",//edit
  USER: "Eli1",//edit
  PASSWORD: "eli123456",//edit
  DB: "coupainder",//TODO: edit //#name
  dialect: "mssql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

// #live on aws
// module.exports = {
//   HOST: "database-coupinder.cql4jschedpv.eu-west-3.rds.amazonaws.com",
//   PORT: "1433",
//   USER: "admin",
//   PASSWORD: "eli123456",
//   DB: "Coupainder",
//   dialect: "mssql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// };
