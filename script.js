/* TOOL SWITCH */
function showTool(id,btn){
document.querySelectorAll(".tool").forEach(t=>t.classList.remove("active"));
document.getElementById(id).classList.add("active");

document.querySelectorAll("header button").forEach(b=>b.classList.remove("active"));
btn.classList.add("active");
}

/* ENTER KEY */
document.getElementById("msg").addEventListener("keypress",function(e){
if(e.key==="Enter") send();
});

/* CHAT */
async function send(){
let input=document.getElementById("msg");
let msg=input.value.trim();
if(!msg) return;

let box=document.getElementById("chatbox");

box.innerHTML+=`<div class="msg user">${msg}</div>`;
input.value="";

box.scrollTop=box.scrollHeight;

let res=await fetch("/api/ai",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({prompt:msg})
});

let data=await res.json();

box.innerHTML+=`<div class="msg bot">😊 ${data.reply}</div>`;
box.scrollTop=box.scrollHeight;
}

/* TRANSLATE */
async function translate(){
let t=document.getElementById("transText").value;

let res=await fetch("/api/ai",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({prompt:`Translate: ${t}`})
});

let data=await res.json();
document.getElementById("transResult").innerText=data.reply;
}

/* BLOG */
async function blog(){
let t=document.getElementById("blogTopic").value;

let res=await fetch("/api/ai",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({prompt:`Write blog on: ${t}`})
});

let data=await res.json();
document.getElementById("blogResult").innerText=data.reply;
}

/* SEO */
function seo(){
let t=document.getElementById("title").value;

document.getElementById("seoResult").innerText=
`Title: ${t}

#${t.replaceAll(" ","")} #viral #trending`;
}

/* IMAGE TOOL */
let canvas=document.getElementById("canvas");
let ctx=canvas.getContext("2d");
let image=new Image();

function loadImage(e){
image.src=URL.createObjectURL(e.target.files[0]);
image.onload=function(){
canvas.width=image.width;
canvas.height=image.height;
ctx.drawImage(image,0,0);
}
}

function rotateImage(){
canvas.width=image.height;
canvas.height=image.width;

ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.translate(canvas.width/2,canvas.height/2);
ctx.rotate(Math.PI/2);
ctx.drawImage(image,-image.width/2,-image.height/2);
}

function cropImage(){
let w=canvas.width/2;
let h=canvas.height/2;

let data=ctx.getImageData(w/2,h/2,w,h);

canvas.width=w;
canvas.height=h;

ctx.putImageData(data,0,0);
}

function applyEffect(type){
if(type==="grayscale") ctx.filter="grayscale(100%)";
if(type==="blur") ctx.filter="blur(5px)";
if(type==="brightness") ctx.filter="brightness(150%)";

ctx.drawImage(image,0,0,canvas.width,canvas.height);
}

/* SHARE */
function shareWhatsApp(){
window.open(`https://wa.me/?text=${location.href}`);
}

function shareFacebook(){
window.open(`https://www.facebook.com/sharer/sharer.php?u=${location.href}`);
}

function shareTwitter(){
window.open(`https://twitter.com/intent/tweet?url=${location.href}`);
}

function copyLink(){
navigator.clipboard.writeText(location.href);
alert("Copied!");
}
