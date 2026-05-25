const http = require("http");
const WebSocket = require("ws");

const server = http.createServer((req, res) => {
  res.end("OK");
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("CLIENT CONNECTED");

  ws.send(JSON.stringify({
    type: "test",
    message: "raw-ws-working"
  }));
});

server.listen(process.env.PORT, "0.0.0.0", () => {
  console.log("running");
});