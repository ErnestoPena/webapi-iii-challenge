// Defining Express
const express = require('express');

//Adding morgan library to log server activity
const morgan = require('morgan')

//Creating an express instance
const server = express();

//Using json for Express
server.use(express.json()); 

//Importing all user Routes 
const userRouter = require('./users/userRouter');

//Importing all Post Routes
const postRouter = require('./posts/postRouter');

//Binding the userRouter 
server.use('/api/users', userRouter);

//Binding the postRouter
server.use('/api/posts', postRouter);

//Defining a port for server
const port = 4000;


//Using morgan

server.use(morgan('dev'));
server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  const newDate = new Date();
  console.log(`Request method is: ${req.method} from URL: ${req.url} at ${newDate}` );
  next();
};



//Running the server.....
server.listen(port , () => {
  console.log(`Server is listening on port ${port}`);
})


module.exports = server;
