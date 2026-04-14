export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(200).json({ result: "Only POST allowed" });
  }

  try {
    const { prompt } = req.body;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    // 👇 DEBUG RETURN
    return res.status(200).json({
      debug: data,   // 👈 पूरा response दिखेगा
      result: data.choices?.[0]?.message?.content || "No response"
    });

  } catch (err) {
    return res.status(500).json({
      result: "Error: " + err.message
    });
  }
}
