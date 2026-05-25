const http = require("http");
const { server } = require("wisp-server-node");

const app = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Wisp server running");
});

app.on("upgrade", (req, socket, head) => {
  // accept all upgrade requests
  server.handleUpgrade(req, socket, head);
});

const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Listening on", PORT);
});