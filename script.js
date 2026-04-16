/* 🌍 TRANSLATE */
async function translate(){
let text=document.getElementById("transText").value;
let from=document.getElementById("fromLang").value;
let to=document.getElementById("toLang").value;

let prompt=`Translate from ${from} to ${to}: ${text}`;

let res=await fetch("/api/ai",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({prompt})
});

let data=await res.json();
document.getElementById("transResult").innerText=data.reply;
}

/* ✍️ BLOG */
async function blog(){
let topic=document.getElementById("blogTopic").value;
let lang=document.getElementById("blogLang").value;

let prompt=`Write a blog in ${lang} language on topic: ${topic}`;

let res=await fetch("/api/ai",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({prompt})
});

let data=await res.json();
document.getElementById("blogResult").innerText=data.reply;
}

/* 🤖 CHAT */
async function send(){
let input=document.getElementById("msg");
let msg=input.value.trim();
let lang=document.getElementById("chatLang").value;

if(!msg) return;

let box=document.getElementById("chatbox");

box.innerHTML+=`<div class="msg user">${msg}</div>`;
input.value="";

box.scrollTop=box.scrollHeight;

let prompt = lang==="auto" ? msg : `Reply in ${lang}: ${msg}`;

let res=await fetch("/api/ai",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({prompt})
});

let data=await res.json();

box.innerHTML+=`<div class="msg bot">🌍 ${data.reply}</div>`;
box.scrollTop=box.scrollHeight;
}
