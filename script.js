async function send() {
  const input = document.getElementById("input");
  const chatbox = document.getElementById("chatbox");

  const text = input.value;
  input.value = "";

  chatbox.innerHTML += `<p><b>You:</b> ${text}</p>`;

  const res = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: text })
  });

  const data = await res.json();

  chatbox.innerHTML += `<p><b>AI:</b> ${data.result}</p>`;
}
