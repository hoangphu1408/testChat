$(function () {
  var socket = io.connect("http://localhost:3000");

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

    if (username == "" || message == "") {
      alert("Please enter name and message!!");
    } else {
      //Gửi dữ liệu cho socket
      socket.emit("send", { username: username, message: message });
      $("#message").val("");
    }
  });
});
