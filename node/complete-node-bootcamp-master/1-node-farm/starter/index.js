const fs = require("fs");
const http = require("http");

// ------------------ Files ------------------------

// Synchronous blocking--------------------------------
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
// const textOut = `This is what we know about avocado: ${textIn}. \n Created on ${Date.now()}`

// fs.writeFileSync('./txt/output.txt', textOut)
// console.log('File written!!!!!!!!')

// Asynchronous, non blocking way to write---------------
// fs.readFile('./txt/start.txt', (err, data1) => {
//     if(err) {
//         return console.log(err)
//     }
//     console.log(data1)
//     fs.readFile(`./txt/${data1}.txt`, (err, data2) => {
//         console.log(data2)
//         fs.readFile('./txt/append.txt', (err, data3) => {
//             const textOut = `${data2}\n${data3}`;
//             console.log(textOut)
//             fs.writeFile('./txt/final.txt',textOut, err => {
//                 console.log('its done')
//             })
//         })
//     })
// })

// ----------------------- Server ----------------------------------------------
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const products = JSON.parse(data);

const server = http.createServer((req, res) => {
  console.log(req.url);
  const pathname = req.url;
  if (pathname === "/" || pathname === "/overview") {
    res.end("Hello from the homepage");
  } else if (pathname === "/products") {
    res.end("products page");
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Elango",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", (err) => {
  console.log("Server is listening on port number:" + "8000");
});
