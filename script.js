async function send() {
  const input = document.getElementById("input").value;

  const res = await fetch("/api/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt: input })
  });

  const data = await res.json();

  document.getElementById("chatbox").innerHTML += 
    "<p><b>You:</b> " + input + "</p>" +
    "<p><b>AI:</b> " + data.result + "</p>";
}
