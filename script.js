async function send() {
  const inputField = document.getElementById("input");
  const chatbox = document.getElementById("chatbox");

  const message = inputField.value;

  if (!message) return;

  chatbox.innerHTML += `<p style="color:green;"><b>You:</b> ${message}</p>`;
  inputField.value = "";

  try {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: message })
    });

    const data = await res.json();

    chatbox.innerHTML += `<p style="color:blue;"><b>AI:</b> ${data.result}</p>`;
  } catch (error) {
    chatbox.innerHTML += `<p style="color:red;">Error: ${error.message}</p>`;
  }

  chatbox.scrollTop = chatbox.scrollHeight;
}
