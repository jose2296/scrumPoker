// const WebSocket = require('ws');

// const wss = new WebSocket.Server({ port: 8888 });

// wss.on('connection', (ws) => {
//     console.log('New connection');
//     // ws.send('something');


//     ws.on('message', data => {
//         console.log(data);
//     });


//     ws.on('close', (e) => {
//         console.log('Connection close', e);
//     });
// });


// const server = require('http').createServer();
// const io = require('socket.io')(server);

// io.on('connection', client => {

//     console.log('Connection');

//     client.on('event', data => {
//         console.log(data);
//     });
//     client.on('disconnect', () => {
//         console.log('Disconnect');
//     });
// });
// server.listen(8888);

const io = require('socket.io')();

const usersByRoom = {}

const updateCount = roomName => {
    console.log(io.sockets);
    // const userCount = io.sockets.clients(roomName).length
    // // we do not update if the count did not change
    // if (userCount === usersByRoom[roomName]) { return }
    // usersByRoom[roomName] = userCount
    // io.emit('updateCount', { roomName, userCount })
  }


let rooms = [
    {
        name: 'Platform',
        users: []
    },
    {
        name: 'Api',
        users: []
    },
    {
        name: 'Layout',
        users: []
    }
];
const activeUsers = {};

const create_UUID = () => {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

const leaveRoom = (socket, socketRoom) => {
    rooms = rooms.map(room => {
        let users = room.users;
        if (room.name === socketRoom) {
            users = room.users.filter(user => user.userName !== socket.userName);
        }

        return {
            ...room,
            users
        }
    });
    socket.leave(socketRoom);
}

io.on('connection', socket => {

    // socket.emit('rooms', io.sockets.adapter.rooms)
    socket.on('hello', (data) => {
        console.log(data);
    });

    socket.on('disconnect', () => {
        io.emit("user-disconnected", socket.userName);
        if (activeUsers[socket.userName] && activeUsers[socket.userName].room) {
            leaveRoom(socket, activeUsers[socket.userName].room);
            io.emit('send-rooms', rooms);
        }
        delete activeUsers[socket.userName];
    });

    socket.on("send-message", function (data) {
        console.log(data);
        io.emit("send-message", data);
    });


    // ScrumPoker api

    socket.on('new-user', function (data) {
        socket.userName = create_UUID();
        activeUsers[socket.userName] = {
            userName: data,
            room: null
        };
        io.emit('new-user', activeUsers);
    });

    socket.on('update-user', function (data) {
        activeUsers[socket.userName] = {
            userName: data,
            room: null
        };
    });

    socket.on("get-rooms", function () {
        io.emit("send-rooms", rooms);
    });

    socket.on("get-users-in-room", function (roomName) {
        const users = rooms.find(room => room.name === roomName).users.map(userName => activeUsers[userName]);
        io.sockets.in(roomName).emit("send-users-in-room", users);
    });

    socket.on("join-room", function (data) {
        if (activeUsers[data.userName] && activeUsers[data.userName].room) {
            leaveRoom(socket, activeUsers[socket.userName].room);
        }
        socket.userName = data.userName;
        activeUsers[data.userName] = {
            userName: data.userName,
            room: data.roomName
        }
        socket.join(data.roomName);
        rooms = rooms.map(room => ({
            ...room,
            users: (room.name === data.roomName && !room.users.find(user => user === data.userName)) ? [...room.users, socket.userName] : room.users
        }));
        io.emit('send-rooms', rooms);
    });


    // socket.on('join room', function (room) {
    //     socket.join(room);
    //     updateCount(room);

    //     io.sockets.in(room).emit('send-message', {
    //         room,
    //         message: 'New user'
    //     });

    //     // console.log(io.sockets.adapter.rooms);
    // })

    // socket.on('send-message', function(data) {
    //     console.log("Client data: " + data);
    //     io.sockets.in(data.room).emit(data.message);
    // });

});

io.listen(8888);
