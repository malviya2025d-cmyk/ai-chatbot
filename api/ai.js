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
        languageRule = "Detect user's language and reply in same language.";
    }

    const systemPrompt = `
You are a smart AI assistant.

${languageRule}

Rules:
- Keep answers clear and natural like ChatGPT
- Use emojis only when appropriate (😊, ⚠️, 💡 etc)
- Do NOT overuse emojis
- Avoid unnecessary symbols or prefixes
- Keep answers short (max 5-6 lines unless needed)
`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": \`Bearer \${process.env.GROQ_API_KEY}\`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: systemPrompt
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
        reply: data?.error?.message || "AI Error"
      });
    }

    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      "No response generated.";

    return res.status(200).json({ reply });

  } catch (err) {
    return res.status(500).json({
      reply: "Server Error: " + err.message
    });
  }
}
