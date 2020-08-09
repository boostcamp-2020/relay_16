const CHATLOG = {};
const db = require('../sequelize/models/index');
const exec = require('child_process').execSync;

module.exports = function(io) {
    io.sockets.on('connection', function(socket) {
        /* 새로운 유저가 접속했을 경우 다른 소켓에게도 알려줌 */
        socket.on('newUser', function(name) {
        console.log(name + ' 님이 접속하였습니다.')

        /* 소켓에 이름 저장해두기 */
        socket.name = name

        // 나중에 전송할 챗로그 엔트리 만들기
        CHATLOG[name] = {};
        CHATLOG[name].name = name;
        CHATLOG[name].line = [];
        

        /* 모든 소켓에게 전송 */
        io.sockets.emit('update', {type: 'connect', name: 'SERVER', message: name + '님이 접속하였습니다.'})
        })

        /* 전송한 메시지 받기 */
        socket.on('message', function(data) {
        /* 받은 데이터에 누가 보냈는지 이름을 추가 */
        data.name = socket.name

        // 챗로그 해당 이름 앞으로 메세지 추가
        CHATLOG[socket.name].line.push(data.message);

        //console.log(data)

        /* 보낸 사람을 제외한 나머지 유저에게 메시지 전송 */
        socket.broadcast.emit('update', data);

        })

        /* 접속 종료 */
        socket.on('disconnect', function() {
        console.log(socket.name + '님이 나가셨습니다.')

        // 나간 사람의 챗로그 데이터 출력
        console.log(CHATLOG[socket.name]);

        // * 수정 필요 !!!! *
        // 챗로그 자연어 처리 결과 db 저장 (자연어 처리 모듈과 연동 안돼서 임시 코드 저장)
        try {
            //let chatlog = "'" + JSON.stringify(CHATLOG[socket.name]) + "'";
            const result = save();
            console.log(result);

            db.userkeyword.create({id: 0, keyword : result})
            .then(res => {
                console.log(res);
                console.log('db 저장 완료');
            })

        } catch (err) {
            console.log(err);
        }
        
        /* 나가는 사람을 제외한 나머지 유저에게 메시지 전송 */
        socket.broadcast.emit('update', {type: 'disconnect', name: 'SERVER', message: socket.name + '님이 나가셨습니다.'});
        })
    })
}

function save(chatlog) {
    // 파이썬 자연어 처리 모듈 실행 (현재 연동안돼는 상황입니다...)
    //const py = exec('python3 ./NPL_modules/main.py ' + chatlog);
    const test = {
        "job": "프로그래머",
        "hobby": "게임",
        "character": "정서적",
        "region": "서울",
        "pn": [
                "주로 부정적 대화",
                85.71428571428571
        ]
    }
    //return py.toString("utf8");
    return JSON.stringify(test);
}