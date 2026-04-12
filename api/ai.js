export default async function handler(req, res) {
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
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    const text = await response.text(); // 👈 IMPORTANT

    try {
      const data = JSON.parse(text);

      res.status(200).json({
        result: data.choices?.[0]?.message?.content || "No response"
      });

    } catch {
      // 👇 agar HTML aaya to yaha dikhega
      res.status(200).json({
        result: "API Error: " + text
      });
    }

  } catch (error) {
    res.status(500).json({
      result: "Fetch Error: " + error.message
    });
  }
}
