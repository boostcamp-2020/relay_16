'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config.js');
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


//table 재생성 및 초기화 할때만 주석 풀어주세요
//!!!!!주의 내부 데이터 다 날라갑니다!! 조심하세요!!!!!!

// db.sequelize.sync({
//   force: true
// }).then(() => {
//   console.log(' Sync 성공')
//   console.log(' \n\n')
// }).catch((err) => {
//   console.log(' Sync 실패')
//   console.error(err);
//   console.log(' \n\n')
//   process.exit();
// })


module.exports = db;
