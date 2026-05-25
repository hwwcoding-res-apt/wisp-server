const http = require("http");
const WebSocket = require("ws");

// IMPORTANT: use correct export style (no guessing API shape)
const wispModule = require("@mercuryworkshop/wisp-js");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Wisp server running");
});

const wss = new WebSocket.Server({ server });

// Try to safely resolve Wisp handler (library export varies by version)
const wispHandler =
  wispModule.server?.handleConnection ||
  wispModule.handleConnection ||
  null;

wss.on("connection", (ws, req) => {
  try {
    if (wispHandler) {
      wispHandler(ws, req);
    } else {
      // fallback: keep connection alive so we can debug
      ws.send("ws-ok-no-wisp");
    }
  } catch (err) {
    console.error("Wisp runtime error:", err);
    ws.close();
  }
});

const PORT = process.env.PORT;

server.listen(PORT, "0.0.0.0", () => {
  console.log("Listening on", PORT);
});