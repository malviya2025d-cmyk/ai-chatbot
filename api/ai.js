export default async function handler(req, res) {

try {

const { prompt } = req.body;

const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
method: "POST",
headers: {
"Authorization": "Bearer YOUR_API_KEY",
"Content-Type": "application/json"
},
body: JSON.stringify({
model: "llama3-8b-8192",
messages: [{ role: "user", content: prompt }]
})
});

const data = await response.json();

const reply = data.choices?.[0]?.message?.content || "No reply";

res.status(200).json({ reply });

} catch (error) {
res.status(500).json({ reply: "API Error" });
}

}
