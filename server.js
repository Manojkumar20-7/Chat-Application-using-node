const http=require('http');
const path=require('path');
const fs=require('fs');
const WebSocket=require('ws');

const server=http.createServer((req,res)=>{
    let filePath=path.join(__dirname,"public",req.url==="/"?"index.html":req.url);
    const extName=path.extname(filePath);
    let contentType='text/html';
    switch(extName){
        case ".js":
            contentType='text/javascript';
            break;
        case ".css":
            contentType='text/css';
            break;
    }

    fs.readFile(filePath,(err,content)=>{
        if(err){    
            res.writeHead(500);
            res.end("Server Error...");
        }
        else{
            res.writeHead(200,{"Content-Type":contentType});
            res.end(content,"utf-8");
        }
    });
});

const wss=new WebSocket.Server({server});

const clients=[];
wss.on('connection',(ws)=>{
    console.log(`A user connected`);
    clients.push(ws);
    ws.on('message',(message)=>{
        const parsedMessage=JSON.parse(message);

        clients.forEach((client)=>{
            if(client.readyState===WebSocket.OPEN){
                // console.log(parsedMessage);
                client.send(JSON.stringify(parsedMessage));
            }
        });
    });
    
    ws.on('close',()=>{
        console.log('A user disconnected');
        let index=clients.indexOf(ws);
        if(index!==-1){
            clients.splice(index,1);
        }
    });
});

server.listen(3000,()=>{
    console.log(`Server is listening on http://127.0.0.1:3000`);
});