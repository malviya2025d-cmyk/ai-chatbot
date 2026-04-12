export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { prompt } = req.body;

    const API_KEY = process.env.HYPEREAL_API_KEY;

    const response = await fetch("https://api.hypereal.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "hypereal-chat",
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();

    const reply =
      data?.choices?.[0]?.message?.content ||
      data?.error?.message ||
      "No response";

    res.status(200).json({ result: reply });

  } catch (error) {
    res.status(500).json({ result: error.message });
  }
}
