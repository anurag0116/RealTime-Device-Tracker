const express=require('express');
const app=express();
const http=require('http');
const path = require('path');
const socketio=require('socket.io');

const server=http.createServer(app);
const io=socketio(server); 
 
// tells your express app to use EJS as default engine
app.set("view engine","ejs"); 

// allows to access file like CSS JS and images in public directory 
app.use(express.static(path.join(__dirname,"public"))); 

io.on("connection",function(socket){
    socket.on("send-location",function(data){
    io.emit("receive-location",{id:socket.id,...data});

    });
    socket.on("disconnect",function(){
        io.emit("user-disconnected",socket.id);
    });
});


app.get("/", function(req,res){
    res.render("index");
});

app.listen(5000);