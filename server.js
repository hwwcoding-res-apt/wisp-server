const http = require("http");
const WebSocket = require("ws");
const { WispServer } = require("@mercuryworkshop/wisp-js/server");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Wisp server running");
});

const wss = new WebSocket.Server({ noServer: true });

// Create Wisp handler bound to ws instance
const wisp = new WispServer();

server.on("upgrade", (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws) => {
    try {
      wisp.handleConnection(ws, req);
    } catch (err) {
      console.error("Wisp error:", err);
      ws.close();
    }
  });
});

const PORT = process.env.PORT;

server.listen(PORT, "0.0.0.0", () => {
  console.log("Listening on", PORT);
});