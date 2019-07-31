const express = require('express');
const postDb = require('./postDb');

const postRouter = express.Router();


//GET method to retreive all posts
postRouter.get('/', async (req, res) => {
 try {
    const allPosts = await postDb.get();
    res.status(200).send({allPosts})
 }
 catch (err) {
    res.status(500).json({message: `There was a problem retreiving all posts from server`, err})
 }
});

//GET method to retreive the post with Id
postRouter.get('/:id', validatePostId, async (req, res) => {
    try {
        const postsById = await postDb.getById(req.params.id);
        res.status(200).send({postsById});
    }
    catch (err) {
        res.status(500).json({message: `There was a problem retreiving the post with the ID: ${req.params.id} from the server`});
    }
});

//DELETE Method to delete a post
postRouter.delete('/:id', validatePostId, async (req, res) => {
    try {
        const deletedPost = await postDb.remove(req.params.id);
        res.status(200).send('The post was deleted')
    }
    catch (err) {
        res.status(404).json({message:'There was a problem deleting the post'});
    }
});

//PUT method to update a post
postRouter.put('/:id', validatePostId, async (req, res) => {
    try {
        const changes = {
            "text": "Ernesto modified. Indeed. I can avoid being seen, if I wish, but to disappear entirely, that is a rare gift."
        }
        console.log(changes);
        const updatedPost = await postDb.update(req.params.id , changes);
        res.status(200).send({updatedPost});
    }
    catch (error) {
        res.status(400).json({message: 'The post could not be changed'})
    }

});

// Validate Post ID
async function validatePostId(req, res, next) {
    const validId = await postDb.getById(req.params.id);
    var myMessage = '';
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
          myMessage = 'Unknown'; //There is no such a thing as unknown HTTP request but I just added a default to the switch 
    }

    validId ? next() : res.status(404).send(`Your request to ${myMessage} the Post with ID ${req.params.id} was not found in the server, enter a valid post's id`).end;
};

module.exports = postRouter;