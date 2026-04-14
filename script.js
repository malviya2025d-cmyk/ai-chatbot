async function sendMessage() {
  const input = document.getElementById("input").value;

  try {
    const res = await fetch("https://ai-chatbot-sw21-b3tzrz019-malviya2025d-9773s-projects.vercel.app/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: input })
    });

    // 👇 ये IMPORTANT है
    if (!res.ok) {
      throw new Error("Server error");
    }

    const data = await res.json();

    document.getElementById("output").innerText = data.result;

  } catch (err) {
    document.getElementById("output").innerText = "Error: " + err.message;
    console.error(err);
  }
}
