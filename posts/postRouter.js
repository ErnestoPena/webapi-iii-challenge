const express = require('express');
const postDb = require('./postDb');

const postRouter = express.Router();


//GET method to retreive all posts
postRouter.get('/', async (req, res) => {
 try {
    const allPosts = await postDb.get();
    res.status(200).json({allPosts})
 }
 catch (err) {
    res.status(500).json({message: `There was a problem retreiving all posts from server`, err})
 }
});

//GET method to retreive the post with Id
postRouter.get('/:id', validatePostId, async (req, res) => {
    try {
        res.status(200).json(res.body); //Using res.body from validatePostId middleware
    }
    catch (err) {
        res.status(500).json({message: `There was a problem retreiving the post with the ID: ${req.id} from the server`});
    }
});

//DELETE Method to delete a post
postRouter.delete('/:id', validatePostId, async (req, res) => {
    try {
        const deletedPost = await postDb.remove(req.params.id);
        res.status(200).json('The post was deleted');
    }
    catch (err) {
        res.status(404).json({message:'There was a problem deleting the post'});
    }
});

//PUT method to update a post
//This one is failing. The error says there is an Empty .update detected and that it does not contain any values
postRouter.put('/:id', validatePostId, async (req, res) => {
    try {
        const { text, id } = req.body;
        console.log(text , id);
        const updatedPost = await postDb.update(id , text);
        res.status(200).json(updatedPost);
    }
    catch (error) {
        res.status(400).json({message: 'The post could not be changed', Error: error.message})
    }

});

// Validate Post ID
async function validatePostId(req, res, next) {
    const validPostId = await postDb.getById(req.params.id);
    var myMessage = '';
    //Switch statement to customize an Invalid postId
    switch (req.method) {
        case "GET":
          myMessage = 'RETREIVE';
          break;
        case "PUT":
          myMessage = 'UPDATE';
          break;
          case "DELETE":
          myMessage = 'DELETE';     
          break;
          default:
          myMessage = 'Unknown'; //I think there is no such thing as unknown HTTP request but I just added a default to the switch 
    }

    if (validPostId) {
        res.body = validPostId;
        next(); 
    } else {
        postsres.status(404).send(`Your request to ${myMessage} the Post with ID ${req.params.id} was not found in the server, enter a valid post's id`).end;
    } 
};

module.exports = postRouter;