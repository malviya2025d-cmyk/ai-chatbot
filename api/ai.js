export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    const response = await fetch("https://api.hypereal.tech/api/v1/generate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HYPEREAL_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "flux-1-dev", // model required
        prompt: prompt
      })
    });

    const data = await response.json();

    res.status(200).json({
      result: JSON.stringify(data) // pehle raw dekh lo
    });

  } catch (error) {
    res.status(500).json({
      result: "Error: " + error.message
    });
  }
}
