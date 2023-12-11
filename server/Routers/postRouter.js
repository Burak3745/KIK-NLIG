import express from "express";
import mongoose from "mongoose";
import Users from "../models/userModel.js";
import Posts from "../models/postModel.js";

const router = express.Router();

/**
 * @swagger
 * definitions:
 *    Post:
 *      properties:
 *        userId:
 *           type: string
 *           description: email will be used
 *        id:
 *           type: number
 *        title:
 *           type: string
 *        body:
 *           type: string
 *        movieId:
 *           type: string
 */


/**
 * @swagger
 * /posts/list/{userId}/{pageParam}:
 *   get:
 *    summary: Get All Posts
 *    description: Use to request all posts
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        description: Enter email address as userId
 *        schema:
 *          type: string
 *      - in: path
 *        name: pageParam
 *        required: true
 *        description: Page Number
 *        schema:
 *          type: number
 *    responses:
 *      200:
 *        description: A successful response
 *      500:
 *        description: Error
 *      404:
 *        description: User doesn't exist
 *        
 */

router.get(`/list/:userId/:pageParam`, async (req, res) => {
  try {
    console.log(req.params);
    const {userId, pageParam} = req.params;

    const userExists = await Users.findOne({ email: userId });
    if (!userExists)
      return res.status(404).json({ message: "User doesn't exist." });
    const getPost = await Posts.find().skip(pageParam*10).limit(10);
    return res.status(200).json(getPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /posts/list/{userId}:
 *   get:
 *    summary: Get All Posts
 *    description: Use to request all posts
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        description: Enter email address as userId
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: A successful response
 *      500:
 *        description: Error
 *      404:
 *        description: User doesn't exist
 *        
 */
router.get(`/list/:userId`, async (req, res) => {
  try {
    console.log(req.params);
    const {userId} = req.params;

    const userExists = await Users.findOne({ email: userId });
    if (!userExists)
      return res.status(404).json({ message: "User doesn't exist." });
    const getPost = await Posts.find();
    return res.status(200).json(getPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /posts/single/{_id}:
 *   get:
 *    summary: Get Single Post
 *    description: Use to request a post
 *    parameters:
 *      - in: path
 *        name: _id
 *        required: true
 *        description: Enter object id of the post
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: A successful response
 *      500:
 *        description: Error
 *        
 */
router.get('/single/:_id', async (req, res) => {
  try {
      const { _id } = req.params

      if (!mongoose.Types.ObjectId.isValid(_id))
          res.status(404).json({ message: 'Post id is not valid' })

      const getPost = await Posts.findById(_id);
      return res.status(200).json(getPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
})

/**
 * @swagger
 * /posts:
 *   post:
 *    summary: Record
 *    description: Records a post
 *    
 *    parameters:
 *       - in: body
 *         name: Post
 *         description: The post to create.
 *         schema:
 *           $ref: '#/definitions/Post' 
 *    responses:
 *         201:
 *           description: Recorded
 *         500:
 *           description: Error
 *         404:
 *           description: User doesn't exist
 *          
 */
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { userId, id, title, body, movieId } = req.body;

    const userExists = await Users.findOne({ email: userId });
    if (!userExists)
      return res.status(404).json({ message: "User doesn't exist." });

    const getPost = await Posts.find().sort("-id").limit(1);
    const result = getPost && getPost.length > 0 ? getPost[0].id : 0;
  
    const createdPost = await Posts.create({
      userId,
      id: result + 1,
      title,
      body,
      movieId
    });
    return res.status(201).json(createdPost);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `create post failed -> ${error.message}` });
  }
});


/**
 * @swagger
 * /posts/{_id}:
 *   put:
 *    summary: Update post
 *    description: The post is updated
 *    
 *    parameters:
 *       - in: body
 *         name: Post
 *         description: The post to update.
 *         schema:
 *           $ref: '#/definitions/Post' 
 *       - in: path
 *         name: _id
 *         required: true
 *         description: Oject ID please
 *         schema:
 *           type: string
 *    responses:
 *         201:
 *           description: Updated
 *         500:
 *           description: Error
 *         404:
 *           description: User doesn't exist
 *          
 */

router.put('/:_id', async (req, res) => {
  try {

  const {_id} = req.params
  console.log(req.params);
  console.log(req.body);

  const {userId, id, title, body, movieId} = req.body
  
  const userExists = await Users.findOne({ email: userId });
  if (!userExists)
    return res.status(404).json({ message: "User doesn't exist." });

  await Posts.findByIdAndUpdate(_id, {userId, id, title, body, movieId});
    res.status(201).json({ message: 'Post update successful' });

  } catch (error) {
      console.log(error.message)
      res
        .status(500)
        .json({ message: `update post failed -> ${error.message}` });
  }
  
})

/**
 * @swagger
 * /posts/{userId}/{_id}:
 *   delete:
 *    summary: Delete Post
 *    description: Post is deleted.
 *    
 *    parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User email address
 *         schema:
 *           type: string
 *       - in: path
 *         name: _id
 *         required: true
 *         description: Object ID please
 *         schema:
 *           type: string
 *    responses:
 *         201:
 *           description: Deleted
 *         404:
 *           description: User doesn't exist
 *         400:
 *           description: Post not found
 *         500:
 *           description: Error
 *          
 */

router.delete("/:userId/:_id", async (req, res) => {
  try {
      const { _id, userId } = req.params

      const userExists = await Users.findOne({ email: userId });
      if (!userExists)
        return res.status(400).json({ message: "User doesn't exist." });
    
      if (!mongoose.Types.ObjectId.isValid(_id))
          res.status(404).json({ message: 'This id does not belong to any post' })

      await Posts.findByIdAndDelete(_id)
      res.status(201).json({ message: 'Post deletion successful' })
  } catch (error) {
      console.log(error.message)
      res.status(500).json({ message: 'An error occurred during the deletion process' })
  }

})


export default router;
