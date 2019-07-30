const express = require('express');

const userDb = require('./userDb')

const userRouter = express.Router();



//POST method to add a new user
userRouter.post('/', (req, res) => {
  
});

//Post Method to add a new post to a user
userRouter.post('/:id/posts', (req, res) => {

});

//GET method to retrieve all users
userRouter.get('/', async (req, res) => {
 try {
    const  getUsers = await userDb.get();
    res.status(200).send({getUsers});//.json({message: 'Users were retreived'})
 }
 catch (err) {
    res.status(403).json({message: 'There was an error retreiving the information from the server' , err})
 }
});

//GET method to retrieve all users
userRouter.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const userwithId = await userDb.getById(userId);
    res.status(200).send({userwithId});
  }
  catch(err) {
    res.status(500).json({message: 'There was a problem retreiving the information from the server', err});
  }
});

//Method to retreive all posts from specific user
userRouter.get('/:id/posts', async (req, res) => {
    try {
        const userId = req.params.id;
        const myUserPosts = await userDb.getUserPosts(userId);
        res.status(200).send({myUserPosts});
    }
    catch (err) {
        res.status(500).json({message: 'There was a problem retreiving the information from the server', err});
    }
});


userRouter.delete('/:id', (req, res) => {

});


userRouter.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = userRouter;
