const http = require("http");
const { server: wispServer } = require("@mercuryworkshop/wisp-js/server");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Wisp-js server running");
});

server.on("upgrade", (req, socket, head) => {
  wispServer.handleUpgrade(req, socket, head);
});

const PORT = process.env.PORT;

server.listen(PORT, "0.0.0.0", () => {
  console.log("Listening on", PORT);
});