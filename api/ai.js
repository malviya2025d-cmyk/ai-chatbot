export default async function handler(req, res) {
  // Only POST allowed
  if (req.method !== "POST") {
    return res.status(200).json({ result: "Only POST allowed" });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(200).json({ result: "No prompt provided" });
    }

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
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    console.log("FULL API RESPONSE:", JSON.stringify(data, null, 2));

    // Safe response handling
    if (data.choices && data.choices.length > 0) {
      return res.status(200).json({
        result: data.choices[0].message.content
      });
    } else {
      return res.status(200).json({
        result: "No response from AI"
      });
    }

  } catch (error) {
    console.error("ERROR:", error);
    return res.status(200).json({
      result: "Error: " + error.message
    });
  }
}
