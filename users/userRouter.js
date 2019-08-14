const express = require('express');

const userDb = require('./userDb');
const postDb = require('../posts/postDb'); //Had to import to get access to the insert(post) function

const userRouter = express.Router();

//POST method to add a new user
userRouter.post('/', validateUser, async (req, res) => {
  try {
    const insertedUser = await userDb.insert(req.body);
    res.status(201).json(insertedUser);
  }
  catch (err) {
    res.status(400).json({message:  'There was a problem adding your record', err: err.message});
  }
});

//POST Method to add a new post to a user
userRouter.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
  try {
    const newPost = await postDb.insert(req.body);
    res.status(200).send(newPost);
  }
  catch (err) {
    res.status(404).json({message: 'Post could not be added', err})
  }
});

//GET method to retrieve all users
userRouter.get('/', async (req, res) => {
 try {
    const  getUsers = await userDb.get();
    res.status(200).json({getUsers});
 }
 catch (err) {
    res.status(403).json({message: 'There was an error retreiving the information from the server' , err})
 }
});

//GET method to retrieve specific user
userRouter.get('/:id', validateUserId, async (req, res) => {
  try {
    const userwithId = await userDb.getById(req.user.id);
    res.status(200).send({userwithId});
  }
  catch(err) {
    res.status(500).json({message: 'There was a problem retreiving the information from the server', err});
  }
});

//GET Method to retreive all posts from specific user
userRouter.get('/:id/posts', validateUserId , async (req, res) => {
    try {
        const myUserPosts = await userDb.getUserPosts(req.user.id);
        res.status(200).send({myUserPosts});
    }
    catch (err) {
        res.status(500).json({message: 'There was a problem retreiving the information from the server', err});
    }
});

//DELETE method to delete a single user
userRouter.delete('/:id', validateUserId, async (req, res) => {
  try {
    const deletedUser = await userDb.remove(req.user.id);
    res.status(200).json(res.body);
  }
  catch (err) {
    res.status(404).json({message: 'There was a problem removing the record', err});
  }
});

//PUT method to update a single user
userRouter.put('/:id', validateUserId, async (req, res) => {
  const body = "This is to modify a user"
  try {
    const modifyUser = await userDb.update(req.user.id, body);
    res.status(200).json(modifyUser);
  }
  catch(err) {
    res.status(404).json({message: 'The record was not modified' });
  }
});
//-----------------------------------------------------------------------
//custom middleware

async function validateUserId(req, res, next) {
  const validateUserId = await userDb.getById(req.params.id);
  if (validateUserId) {
    req.user = validateUserId;
    next();
  } else {
    res.status(400).json({message: "Invalid user id"})
  }
};

function validateUser(req, res, next) {
  const { name } = req.body;
  if (req.body.name === "") {
    res.status(400).json({message: "missing user data"});
  } else if (name === undefined) {
      res.status(400).json({message: "missing required name field"});
  } else {
    next();
 }
};

function validatePost(req, res, next) {
   const { text, user_id } = req.body; 
  if (req.body.text === "") {
      res.status(400).json({message: "missing post data"});
    } else if (text === undefined) {
        res.status(400).json({message: "missing required text field"});
    } else if (user_id === undefined) {
      res.status(400).json({message: "missing the required user_id field"})
   } else {
      next();
   }
  };

module.exports = userRouter ;
