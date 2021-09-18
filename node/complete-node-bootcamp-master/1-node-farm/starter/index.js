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
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  console.log(req.url);
  const pathname = req.url;

  if (pathname === "/" || pathname === "/overview") {
    // overview
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  } else if (pathname === "/product") {
    // products
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  } else if (pathname === "/api") {
    // api
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(data);
  } else {
    // page not found
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
