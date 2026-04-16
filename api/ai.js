export default async function handler(req, res) {

if (req.method !== "POST") {
return res.status(405).json({ reply: "Only POST allowed" });
}

try {

const { prompt } = req.body;

if (!prompt) {
return res.status(400).json({ reply: "No prompt" });
}

/* 🔥 DEBUG */
console.log("PROMPT:", prompt);
console.log("API KEY:", process.env.GROQ_API_KEY ? "OK" : "MISSING");

const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
method: "POST",
headers: {
"Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
"Content-Type": "application/json"
},
body: JSON.stringify({
model: "llama3-8b-8192",
messages: [
{ role: "user", content: prompt }
]
})
});

const data = await response.json();

/* 🔥 FULL DEBUG */
console.log("FULL API RESPONSE:", JSON.stringify(data));

const reply = data?.choices?.[0]?.message?.content;

if (!reply) {
return res.status(500).json({
reply: "❌ No reply from AI",
debug: data
});
}

return res.status(200).json({ reply });

} catch (error) {

console.error("ERROR:", error);

return res.status(500).json({
reply: "❌ Server error",
error: error.message
});

}
}
