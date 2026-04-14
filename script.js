async function sendMessage() {
  const input = document.getElementById("input").value;

  try {
    const res = await fetch("/api/ai", {   // ✅ IMPORTANT CHANGE
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: input })
    });

    const data = await res.json();

    document.getElementById("output").innerText = data.result;

  } catch (err) {
    document.getElementById("output").innerText = "Error: " + err.message;
  }
}
