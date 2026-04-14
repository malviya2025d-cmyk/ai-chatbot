function showPage(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(page).classList.add("active");
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.style.display = sidebar.style.display === "none" ? "block" : "none";
}

async function send() {
  const input = document.getElementById("input").value;
  const chatbox = document.getElementById("chatbox");

  chatbox.innerHTML += `<p><b>You:</b> ${input}</p>`;

  const res = await fetch("/api/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt: input })
  });

  const data = await res.json();

  chatbox.innerHTML += `<p><b>AI:</b> ${data.result}</p>`;
}
