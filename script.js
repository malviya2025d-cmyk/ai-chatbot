async function sendMessage() {
  const input = document.getElementById("input").value;
  const chat = document.getElementById("chat");

  chat.innerHTML += `<p><b>You:</b> ${input}</p>`;

  const res = await fetch("/api/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt: input })
  });

  const data = await res.json();

  if (data.error) {
    chat.innerHTML += `<p><b>Bot:</b> Error: ${data.error}</p>`;
  } else {
    chat.innerHTML += `<p><b>Bot:</b> ${data.reply}</p>`;
  }

  document.getElementById("input").value = "";
}
