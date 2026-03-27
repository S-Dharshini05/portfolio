function sendMessage() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  fetch("/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, message })
  })
  .then(res => res.text())
  .then(data => {
    document.getElementById("response").innerText = data;
  })
  .catch(err => {
    console.log(err);
    document.getElementById("response").innerText = "Error sending message";
  });
}
