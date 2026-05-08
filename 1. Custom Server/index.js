const http = require("http");
const fs = require("fs");
const querystring = require("querystring");

const port = 8000;
const app = http.createServer((req, res) => {
  let url = req.url;
  let filename = "";

  let [path, queryStr] = url.split("?");
  let query = querystring.parse(queryStr);

  switch (path) {
    case "/":
      filename = "index.html";
      break;

    case "/about":
      filename = "about.html";
      break;

    case "/contact":
      filename = "contact.html";
      break;

    case "/api":
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ name: "Sahil", course: "NodeJS" }));
      return;

    case "/text":
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Hello World");
      return;

    case "/user":
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`Hello ${query.name || "Guest"}`);
      return;

    default:
      res.writeHead(404, { "Content-Type": "text/html" });
      filename = "404.html";
  }

  fs.readFile(filename, (err, data) => {
    if (err) {
      res.end("Error loading file");
    } else {
      if (!res.headersSent) {
        res.writeHead(200, { "Content-Type": "text/html" });
      }
      res.end(data);
    }
  });
});

app.listen(port, () => {
  console.log("Server running at http://localhost:8000");
});