export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { prompt, lang } = req.body;

    let languageRule = "";

    switch (lang) {
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
      case "ja":
        languageRule = "Reply only in Japanese.";
        break;
      case "ko":
        languageRule = "Reply only in Korean.";
        break;
      case "pt":
        languageRule = "Reply only in Portuguese.";
        break;
      default:
        languageRule = "Detect language automatically and reply in same language.";
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
            content: `
You are a global AI assistant.
${languageRule}

Rules:
- Keep answers short (max 5 lines)
- Be helpful and clear
`
          },
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        error: data?.error?.message || "AI Error"
      });
    }

    return res.status(200).json({
      reply: data?.choices?.[0]?.message?.content || ""
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
