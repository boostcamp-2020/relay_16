const CHATLOG = {};

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

        // 나간 사람의 챗로그 데이터 출력(나중에 전송 및 DB저장으로 수정)
        console.log(CHATLOG[socket.name]);
        let chatlog = JSON.stringify(CHATLOG[socket.name]);

        const exec = require('child_process').execSync;

        function test() {
            const py = exec('python3 ./NPL_modules/main.py ' + chatlog);
            return py.toString("utf8");
        }

        console.log(test());
        
        /* 나가는 사람을 제외한 나머지 유저에게 메시지 전송 */
        socket.broadcast.emit('update', {type: 'disconnect', name: 'SERVER', message: socket.name + '님이 나가셨습니다.'});
        })
    })
}