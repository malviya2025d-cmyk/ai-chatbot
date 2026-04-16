/* 🔊 SPEECH */
let speech;

function speakText(text){
speechSynthesis.cancel();
speech = new SpeechSynthesisUtterance(text);
speech.lang = "en";
speechSynthesis.speak(speech);
}

function stopSpeak(){
speechSynthesis.cancel();
}

/* 🤖 CHAT */
async function send(){
let input = document.getElementById("msg");
let msg = input.value.trim();

if(!msg) return;

let box = document.getElementById("chatbox");

box.innerHTML += `<div class="msg user">${msg}</div>`;
input.value = "";

box.scrollTop = box.scrollHeight;

stopSpeak();

/* ⏳ loading */
box.innerHTML += `<div class="msg bot" id="loading">Typing...</div>`;

try{

let res = await fetch("/api/ai", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ prompt: msg })
});

let data = await res.json();

/* remove loading */
document.getElementById("loading").remove();

if(!data || !data.reply){
throw new Error("No reply from API");
}

let reply = data.reply.replace(/[#*]/g,"");

box.innerHTML += `
<div class="msg bot">
${reply}
<br>
<button onclick="speakText(\`${reply}\`)">🔊 Speak</button>
</div>
`;

speakText(reply);

}catch(err){

document.getElementById("loading").remove();

box.innerHTML += `
<div class="msg bot">
❌ Error: AI not responding  
<br>
Check API or internet
</div>
`;

console.error("AI ERROR:", err);
}

box.scrollTop = box.scrollHeight;
}

/* 🌍 TRANSLATE */
async function translate(){
let text = document.getElementById("transText").value;

try{
let res = await fetch("/api/ai", {
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({prompt:`Translate: ${text}`})
});

let data = await res.json();
let clean = data.reply || "Error";

document.getElementById("transResult").innerText = clean;
speakText(clean);

}catch{
document.getElementById("transResult").innerText = "❌ Error";
}
}

/* ✍️ BLOG */
async function blog(){
let topic = document.getElementById("blogTopic").value;

try{
let res = await fetch("/api/ai", {
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({prompt:`Write blog on: ${topic}`})
});

let data = await res.json();
let clean = data.reply || "Error";

document.getElementById("blogResult").innerText = clean;
speakText(clean);

}catch{
document.getElementById("blogResult").innerText = "❌ Error";
}
}

/* 🔎 SEO */
function seo(){
let title=document.getElementById("title").value;
let desc=document.getElementById("desc").value;

document.getElementById("seoResult").innerText =
`Title: ${title}

Description: ${desc}`;
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
alert("Copied!");
}

/* ⌨️ ENTER KEY */
document.addEventListener("DOMContentLoaded",()=>{
document.getElementById("msg").addEventListener("keypress",e=>{
if(e.key==="Enter") send();
});
});
