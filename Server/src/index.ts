import { createSourceFile } from "typescript";
import { WebSocketServer,WebSocket } from "ws";


interface User{
    socket:WebSocket
    room:string
}
const wss = new WebSocketServer({port : 8080})
let userCount = 0
let allsockets:User[]=[]
wss.on("connection",(socket)=>{
    
    userCount += 1
    console.log("User Connected" + "  #" + userCount);

    socket.on("message",(message)=>{
        const parsedMessage = JSON.parse(message as unknown as string);
        if (parsedMessage.type === "join"){
            allsockets.push({
                socket,
                room : parsedMessage.payload.roomId 
            })
        }
        if (parsedMessage.type === "chat"){
            var currentUserRoom = null;
            for (let i =0; i<allsockets.length;i++){
                currentUserRoom = allsockets[i].room
            }
        }
        for (let i =0 ; i<allsockets.length;i++){
            if (allsockets[i].room == currentUserRoom){
                allsockets[i].socket.send(parsedMessage.payload.message)
            }
        }
    })
    
})