export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { prompt } = req.body;

    const response = await fetch("https://api.hypereal.ai/v1/chat", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HYPEREAL_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: prompt
      })
    });

    const data = await response.json();

    res.status(200).json({
      result: data.reply || data.response || "No response"
    });

  } catch (error) {
    res.status(500).json({
      result: "Error: " + error.message
    });
  }
}
