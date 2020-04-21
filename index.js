var http = require("http");
var url = require("url");
var fs = require("fs");

http
  .createServer(function (req, res) {
    var link = url.parse(req.url, true);
    var filename =
      link.pathname !== "/" ? "." + link.pathname + ".html" : "./index.html";
    fs.readFile(filename, function (err, data) {
      if (err) {
        var errFile = "./404.html";
        fs.readFile(errFile, function (err, data) {
          if (err) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("404 Not Found");
          } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            res.end();
          }
        });
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      }
    });
  })
  .listen(8080);
