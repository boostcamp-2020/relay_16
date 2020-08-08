const {
    userkeyword,
    user //사용할 테이블 명
} = require('./sequelize/models') // relay16/src/sequelize/model/index.js 


// 유저 삽입
// user.create({
//     id: "jk",
//     nickname: "김정",
//     password: "relay16"
// }).then(results => {
//     console.dir("RESULT =" + results) //결과 받아와서 동작
// }).catch(err => {
//     console.log("ERR = " + err)
// })

// user.update({
//     //바꿀 데이터,
//     job: "가수",
//     hobby: "테니스",
//     character: "외향"
// }, {
//     where: {
//         id: "jk", // 업데이트할 유저 id!, nickname아니고 유저id 
//     }
// }).then(results => {
//     console.log("RESULT =" + results) //결과 받아와서 동작
// }).catch(err => {
//     console.log("ERR = " + err)
// })

// // 삽입
// userkeyword.create({
//     userid: "jk",
//     keyword: "테니스"
// }).then(results => {
//     console.log("RESULT =" + results) //결과 받아와서 동작
// }).catch(err => {
//     console.log("ERR = " + err)
// })


// //조회 하나만
// user.findOne({
//     where: {
//         id: "jk"
//     }
// }).then(results => {
//     console.dir(results.dataValues) //결과 받아와서 동작
// }).catch(err => {
//     console.log("ERR = " + err)
// })

// //조회 all
// userkeyword.findAll({
//     where: {
//         id: "jk"
//     }
// }).then(results => {
//     console.dir(results) //결과 받아와서 동작
// }).catch(err => {
//     console.log("ERR = " + err)
// })
