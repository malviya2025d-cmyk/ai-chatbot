async function sendMessage() {
  const input = document.getElementById("input").value;

  const res = await fetch("https://ai-chatbot-sw21-git-main-malviya2025d-9773s-projects.vercel.app/api/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      prompt: input
    })
  });

  const data = await res.json();

  document.getElementById("output").innerText = data.result;
}
