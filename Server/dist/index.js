"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let userCount = 0;
let allsockets = [];
wss.on("connection", (socket) => {
    userCount += 1;
    console.log("User Connected" + "  #" + userCount);
    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type === "join") {
            allsockets.push({
                socket,
                room: parsedMessage.payload.roomId
            });
        }
        if (parsedMessage.type === "chat") {
            var currentUserRoom = null;
            for (let i = 0; i < allsockets.length; i++) {
                currentUserRoom = allsockets[i].room;
            }
        }
        for (let i = 0; i < allsockets.length; i++) {
            if (allsockets[i].room == currentUserRoom) {
                allsockets[i].socket.send(parsedMessage.payload.message);
            }
        }
    });
});
