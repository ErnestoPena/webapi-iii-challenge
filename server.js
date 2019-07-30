// Defining Express
const express = require('express');

//Instance of Express
const server = express();

//Defining a port for server
const port = 4000;

//Using json for Express
server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});



//custom middleware

function logger(req, res, next) {

};



//Running the server.....
server.listen(port , () => {
  console.log(`Server is listening on port ${port}`);
})

server.listen()

module.exports = server;
