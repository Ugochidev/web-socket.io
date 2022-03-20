// make connection
// const socket = io.connect("https://ugochidev-web.herokuapp.com/");

let newUserPass = prompt(
  "App locked, Please input App Password."
).toLowerCase();
if (
  newUserPass == "myown_" ||
  newUserPass == "josh_" ||
  newUserPass == "ugochidev_" ||
  newUserPass == "wheeler_"
) {
  alert("Welcome in, Enjoy your sesion.....");
  socket = io.connect("https://ugochidev-web.herokuapp.com/");
} else {
  alert("Wrong Password");
  const chat = document.getElementById("mario-chat");
  chat.innerHTML =
    "<p><strong>Please get a valid password and reload.</strong></p>";
  chat.style.background = "#e0b0b0";
}
// Query DOM
const message = document.getElementById("message");
handle = document.getElementById("handle");
btn = document.getElementById("send");
output = document.getElementById("output");
feedback = document.getElementById("feedback");
//   Emit events
btn.addEventListener("click", function () {
  if (handle.value == null || handle.value == "") {
    alert("Pls input a handle");
    return null;
  }
  if (message.value == null || message.value == "") {
    alert("Cannot send blank message!");
    return null;
  }
  socket.emit("chat", {
    message: message.value,
    handle: handle.value,
  });
   message.value = "";
});
message.addEventListener("keypress", function () {
  socket.emit("typing", handle.value);
});
// listen for events
socket.on("chat", function (data) {
  feedback.innerHTML = "";
  output.innerHTML += "<p><strong>" + data.handle + ":</strong>" + data.message + "</p>";
});
socket.on("typing", function (data) {
  feedback.innerHTML = "<p><em>" + data + " is typing a message ...</em></p>";
});
