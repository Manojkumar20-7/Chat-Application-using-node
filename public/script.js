const ws=new WebSocket('ws://localhost:3000');

const uname=document.getElementById('username');
const messageBox=document.getElementById('message-input');
const chatbox=document.getElementById('chatbox');
const sendBtn=document.getElementById('send-btn');

sendBtn.addEventListener('click',()=>{
    const username=uname.value;
    const message=messageBox.value;
    ws.send(JSON.stringify({username,message}));
    messageBox.value='';
});
// let count=0;
// setInterval(()=>{
//     const username="username";
//     const message="message";
//     ws.send(JSON.stringify({count,username,message}));
//     console.log({count,username,message});
//     count++;
// },10);

ws.onmessage = (e)=>{
    const {username,message}=JSON.parse(e.data);
    console.log(e.data);
    const messageElement=document.createElement("p");
    messageElement.textContent=`${count}:${username}:${message}`;
    count+=1;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop=chatbox.scrollHeight;
};