// express는 웹서버
const express = require("express");
const app = express();
const path = require("path"); // 기본모듈, 서버가 구동되는 폴더의 절대경로를 알려줌

// node에 원래부터 있던 기본모듈(자동으로 포함되어 있음)
const http = require("http");

// socket서버 만들기
// io >> input, output
const socketIO = require("socket.io");
const moment = require("moment");
const server = http.createServer(app);
const io = socketIO(server); // 여기서 클라이언트로 데이터를 내려줌
app.use(express.static(path.join(__dirname, "/public"))); // 정적파일을 서비스하는 폴더 지정

io.on("connection", (socket) => {
  console.log("client로 연결되었습니다.");
  // *test
  // socket.on("yaho", (data) => {
  //   console.log(data);
  //   io.emit("serverYaho", "나는 클라이언트가 yaho로 보낸 이벤트를 받아서 다시 yaho로 서버가 다시 yaho로 이벤트를 발송하는 것입니다.");
  // });
  socket.on("chatting", (data) => {
    console.log(data);
    const sendTime = moment(new Date()).format("A hh:mm");
    io.emit("chatting", {
      nickname: data.nickname,
      msg: data.msg,
      time: sendTime,
    });
  });
});

app.set("port", process.env.PORT || 8099);
/* process.env
 * 접속정보(port번호, db접속 비밀번호 등), 보안과 관련된 것들
 * 업로드 X
 * js 아님!
 */

const PORT = app.get("port");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/html/chatting.html"));
});

// app.get("/", (req, res) => {
//   res.send("hello node");
// });

// app.get("/chatting", (req, res) => {
//   // res.send("CHATTING ROOM");
//   res.sendFile(path.join(__dirname, "/public/html/chatting.html"));
// });

server.listen(PORT, () => {
  console.log(`${PORT}에서 서버 대기중`);
});
