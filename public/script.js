function sendMessage() {

let name = document.getElementById("name").value;
let email = document.getElementById("email").value;
let message = document.getElementById("message").value;

if(name === "" || email === "" || message === ""){
document.getElementById("response").innerText = "Please fill all fields";
return;
}

fetch("https://portfolio-1-n8kd.onrender.com/contact", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: name,
    email: email,
    message: message
  })
})


.then(response => response.text())

.then(data => {

document.getElementById("response").innerText = "Message Sent Successfully!";

document.getElementById("name").value = "";
document.getElementById("email").value = "";
document.getElementById("message").value = "";

})

.catch(error => {

document.getElementById("response").innerText = "Error sending message";

});

}