const http = require("http");
const WebSocket = require("ws");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Wisp server running");
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws, req) => {
  console.log("WebSocket connected");

  ws.on("message", (msg) => {
    console.log("Message:", msg.toString());
  });

  ws.send("connected");
});

const PORT = process.env.PORT;

server.listen(PORT, "0.0.0.0", () => {
  console.log("Listening on", PORT);
});