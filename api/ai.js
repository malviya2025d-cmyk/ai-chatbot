export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { prompt, lang } = req.body;

    let languageRule = "";

    switch (lang) {
      case "en":
        languageRule = "Reply only in English.";
        break;
      case "hi":
        languageRule = "Reply only in Hindi.";
        break;
      case "es":
        languageRule = "Reply only in Spanish.";
        break;
      case "fr":
        languageRule = "Reply only in French.";
        break;
      case "de":
        languageRule = "Reply only in German.";
        break;
      case "ar":
        languageRule = "Reply only in Arabic.";
        break;
      case "ru":
        languageRule = "Reply only in Russian.";
        break;
      case "zh":
        languageRule = "Reply only in Chinese.";
        break;
      default:
        languageRule = "Reply in the same language as user.";
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: `You are a helpful AI assistant. ${languageRule}`
          },
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();

    // 🔴 IMPORTANT DEBUG (error show karega)
    if (!response.ok) {
      console.error("Groq Error:", data);
      return res.status(500).json({
        reply: data?.error?.message || "AI Error"
      });
    }

    return res.status(200).json({
      reply: data?.choices?.[0]?.message?.content || "No reply"
    });

  } catch (err) {
    console.error("Server Error:", err);
    return res.status(500).json({
      reply: "Server Error"
    });
  }
}
