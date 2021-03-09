$(function () {
  var socket = io.connect("http://localhost:3000");
  socket.emit("online", {
    username: $("#username").val(),
    id: $("#id").val(),
  });
  socket.on("online", function (data) {
    $("#tabChat").append(
      `<button onclick="clickTest('${data.id}')" >${data.username}</button>`
    );
  });
  socket.on("send", function (data) {
    console.log(data);
    var username = $("#username").val();
    if (data.username !== username) {
      $("#content").append(
        "<p class='mfMess'>" + data.username + ": " + data.message + "</p>"
      );
    } else {
      $("#content").append(
        "<p class='myMess'>" + data.username + ": " + data.message + "</p>"
      );
    }
  });

  //Bắt sự kiện click gửi message
  $("#sendMessage").on("click", function () {
    var message = $("#message").val();
    var username = $("#username").val();
    if (message == "") {
      alert("Please enter name and message!!");
    } else {
      console.log(message);
      //Gửi dữ liệu cho socket
      socket.emit("send", { username: username, message: message });
      $("#message").val("");
    }
  });
});

function clickTest(id) {
  console.log(id);
}
