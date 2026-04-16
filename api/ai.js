export default async function handler(req, res){

if(req.method!=="POST"){
return res.status(405).json({error:"Only POST allowed"});
}

try{

const {prompt,lang}=req.body;

const response=await fetch("https://api.groq.com/openai/v1/chat/completions",{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${process.env.GROQ_API_KEY}`
},
body:JSON.stringify({
model:"llama-3.1-8b-instant",
messages:[
{role:"system",content:`You are helpful AI. Reply in ${lang||"user language"}`},
{role:"user",content:prompt}
]
})
});

const data=await response.json();

return res.status(200).json({
reply:data?.choices?.[0]?.message?.content || "No reply"
});

}catch(err){
return res.status(500).json({reply:"Server Error"});
}

}
