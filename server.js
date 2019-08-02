// Defining Express
const express = require('express');

//Adding morgan library to log server activity
const morgan = require('morgan');

//Requiring dotenv
require('dotenv').config();

//Creating an express instance
const server = express();

//Using json for Express
server.use(express.json()); 

//Defining a port for server
const port = process.env.PORT || 9000;


//Using morgan
server.use(morgan('dev'));
server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom global middleware

function logger(req, res, next) {
  const newDate = new Date();
  console.log(`Request method is: ${req.method} from URL: ${req.url} at ${newDate}` );
  next();
};


//Intersting!!! Moving all my routes to the end fixed the logger. It makes sense
//Importing all user Routes 
const userRouter = require('./users/userRouter');

//Importing all Post Routes
const postRouter = require('./posts/postRouter');

//Binding the userRouter 
server.use('/api/users', userRouter);

//Binding the postRouter
server.use('/api/posts', postRouter);


//Running the server.....
server.listen(port , () => {
  console.log(`Server is listening on port ${port}`);
})


module.exports = server;
