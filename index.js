const express = require("express");
const path = require('path');
const app = express();
const port = process.env.port || 5002;
const socket = require('socket.io')

app.use(express.static(path.join(__dirname,'public')))
app.get("/",(req,res)=>{
    res.send('Server is Setup');
})

const server = app.listen(port,()=>{
    try{
        console.log(`Server is live on port no. ${port}`)
    }
    catch(err){
        console.log(`server is not setup for port no. ${port} and due to this ${err}`)
    }
})
const io = socket(server,{
    cors :{
        origin:"*"
    }
 })

let socketsConnected = new Set()
io.on("connection",onConnected
// (socketClientID)=>{
    // console.log("user Connected",socketClientID.id);
    
    // socketClientID.on("disconnect",()=>{
    //   console.log("User Dissconnected",socketClientID.id)  

   
    // })}
 )
 function onConnected(socketClientID){
    console.log("user Connected",socketClientID.id)
    socketsConnected.add(socketClientID.id);

    io.emit('clients-total',socketsConnected.size)

    socketClientID.on("disconnect",()=>{
       console.log("User Dissconnected",socketClientID.id);
       socketsConnected.delete(socketClientID.id) 
       io.emit('clients-total',socketsConnected.size)
    })
    socketClientID.on('message',(data)=>{
        console.log(data);
        socketClientID.broadcast.emit('chat-message',data)
    })
   
}




