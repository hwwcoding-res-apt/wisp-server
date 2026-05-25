const http = require("http");
const { server: wispServer } = require("@mercuryworkshop/wisp-js/server");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Wisp-js ready");
});

// Attach Wisp upgrade handler safely
server.on("upgrade", (req, socket, head) => {
  if (!wispServer.handleUpgrade) {
    socket.destroy();
    return;
  }

  try {
    wispServer.handleUpgrade(req, socket, head);
  } catch (err) {
    console.error("Wisp upgrade error:", err);
    socket.destroy();
  }
});

const PORT = process.env.PORT;

server.listen(PORT, "0.0.0.0", () => {
  console.log("Listening on", PORT);
});