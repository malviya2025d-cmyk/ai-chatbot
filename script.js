/* 🔊 GLOBAL SPEECH CONTROL */
let speech = new SpeechSynthesisUtterance();
let voices = [];
let speaking = false;

function loadVoices(){
voices = speechSynthesis.getVoices();
}
speechSynthesis.onvoiceschanged = loadVoices;

/* 🎯 SPEAK FUNCTION */
function speakText(text){
speechSynthesis.cancel(); // 🔥 old voice stop

speech = new SpeechSynthesisUtterance(text);
speech.lang = document.getElementById("chatLang")?.value || "en";

speech.onend = () => speaking = false;

speaking = true;
speechSynthesis.speak(speech);
}

/* 🛑 STOP SPEAK */
function stopSpeak(){
speechSynthesis.cancel();
speaking = false;
}

/* 🤖 CHAT */
async function send(){
let input=document.getElementById("msg");
let msg=input.value.trim();
let lang=document.getElementById("chatLang").value;

if(!msg) return;

let box=document.getElementById("chatbox");

box.innerHTML+=`<div class="msg user">${msg}</div>`;
input.value=""; // 🔥 auto clear

box.scrollTop=box.scrollHeight;

stopSpeak(); // 🔥 old voice stop

let prompt = lang==="auto" ? msg : `Reply only in ${lang} language, no symbols, no markdown: ${msg}`;

let res=await fetch("/api/ai",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({prompt})
});

let data=await res.json();

let reply = data.reply.replace(/[#*]/g,""); // 🔥 clean text

box.innerHTML+=`
<div class="msg bot">
${reply}
<br>
<button onclick="speakText(\`${reply}\`)">🔊 Speak</button>
</div>
`;

box.scrollTop=box.scrollHeight;

/* 🔊 AUTO SPEAK */
speakText(reply);
}

/* 🌍 TRANSLATE */
async function translate(){
let text=document.getElementById("transText").value;
let from=document.getElementById("fromLang").value;
let to=document.getElementById("toLang").value;

let prompt=`Translate from ${from} to ${to}. Only translated text: ${text}`;

let res=await fetch("/api/ai",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({prompt})
});

let data=await res.json();
let clean = data.reply.replace(/[#*]/g,"");

document.getElementById("transResult").innerText=clean;

/* 🔊 speak translate */
speakText(clean);
}

/* ✍️ BLOG */
async function blog(){
let topic=document.getElementById("blogTopic").value;
let lang=document.getElementById("blogLang").value;

let prompt=`Write a simple blog in ${lang} language without symbols on topic: ${topic}`;

let res=await fetch("/api/ai",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({prompt})
});

let data=await res.json();
let clean = data.reply.replace(/[#*]/g,"");

document.getElementById("blogResult").innerText=clean;

/* 🔊 speak blog */
speakText(clean);
}

/* 🖼️ IMAGE TOOL */
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let img = new Image();

function loadImage(event){
let file = event.target.files[0];
let reader = new FileReader();

reader.onload = function(){
img.onload = function(){
canvas.width = img.width;
canvas.height = img.height;
ctx.drawImage(img,0,0);
}
img.src = reader.result;
}
reader.readAsDataURL(file);
}

function rotateImage(){
ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.translate(canvas.width/2, canvas.height/2);
ctx.rotate(Math.PI/2);
ctx.drawImage(img,-img.width/2,-img.height/2);
}

function cropImage(){
ctx.drawImage(img,50,50,200,200,0,0,200,200);
}

function applyEffect(effect){
ctx.filter = effect==="grayscale" ? "grayscale(100%)" :
effect==="blur" ? "blur(5px)" :
effect==="brightness" ? "brightness(150%)" : "none";

ctx.drawImage(img,0,0);
}

/* 🔎 SEO */
function seo(){
let title=document.getElementById("title").value;
let desc=document.getElementById("desc").value;

let tags = title.split(" ").join(", ");
let hashtags = "#"+title.split(" ").join(" #");

document.getElementById("seoResult").innerText=
`Title: ${title}

Description: ${desc}

Tags: ${tags}

Hashtags: ${hashtags}`;
}

/* 🔄 TOOL SWITCH */
function showTool(id,btn){
document.querySelectorAll(".tool").forEach(t=>t.style.display="none");
document.getElementById(id).style.display="block";

document.querySelectorAll("header button").forEach(b=>b.classList.remove("active"));
btn.classList.add("active");
}

/* 🔗 SHARE */
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
alert("Link copied!");
}

/* ⌨️ ENTER KEY FIX */
document.addEventListener("DOMContentLoaded",()=>{
document.getElementById("msg").addEventListener("keypress",e=>{
if(e.key==="Enter") send();
});
document.getElementById("transText").addEventListener("keypress",e=>{
if(e.key==="Enter") translate();
});
document.getElementById("blogTopic").addEventListener("keypress",e=>{
if(e.key==="Enter") blog();
});
});
