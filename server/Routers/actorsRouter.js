import express from "express";
import mongoose from "mongoose";

import Actors from "../models/actorsModel.js";
const router = express.Router();

/**
 * @swagger
 * /actors:
 *   get:
 *    summary: Get All Actors
 *    description: Use to request all Actors
 *    responses:
 *      200:
 *        description: A successful response
 *        
 */

router.get("/", async (req, res) => {
    try {
        const getActors = await Actors.find()

        res.status(200).json(getActors)
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})

/**
 * @swagger
 * /actors/{id}:
 *   get:
 *    summary: Get ID Actors
 *    description: Use to request all Actors
 *    parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID required
 *          schema:
 *            type: string
 *    responses:
 *      200:
 *        description: A successful response
 *        
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id))
            res.status(404).json({ message: 'Actors id is not valid' })

        const actors = await Actors.findById(id)
        if (!actors) return

        res.status(200).json(actors)
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Actors not found' })
    }
})

/**
 * @swagger
 * definitions:
 *    Actors:
 *      properties:
 *        name:
 *           type: string
 *        image:
 *           type: string
 */




/**
 * @swagger
 * /actors:
 *   post:
 *    summary: Add Actors
 *    description: this ap
 *    
 *    parameters:
 *       - in: body
 *         name: Actors
 *         description: The Actors to create.
 *         schema:
 *           $ref: '#/definitions/Actors' 
 *    responses:
 *         200:
 *           description: added
 *           schema:
 *              $ref: '#/definitions/Actors'
 *          
 */



router.post("/", async (req, res) => {
    try {
        const createdActors = await Actors.create(req.body)
        res.status(201).json(createdActors)
    } catch (error) {
        console.log(error);
        res.json({ message: 'Actors creation failed' })
    }


})

/**
 * @swagger
 * /actors/{id}:
 *   put:
 *    summary: Update Actors
 *    description: this ap
 *    
 *    parameters:
 *       - in: body
 *         name: Actors
 *         description: The Actors to create.
 *         schema:
 *           $ref: '#/definitions/Actors' 
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID please
 *         schema:
 *           type: string
 *    responses:
 *         200:
 *           description: added
 *           schema:
 *              $ref: '#/definitions/Actors'
 *          
 */

router.put('/:id', async (req, res) => {
    try {

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id))
            res.status(404).json({ message: 'This id does not belong to any actors' })

        const updatedActors = await Actors.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(updatedActors)

    } catch (error) {
        console.log(error.message)
        res.json({ message: 'An error occurred during the update process' })
    }

})



/**
 * @swagger
 * /actors/{id}:
 *   delete:
 *    summary: Delete Actors
 *    description: this ap
 *    
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID please
 *         schema:
 *           type: string
 *    responses:
 *         200:
 *           description: added
 *           schema:
 *              $ref: '#/definitions/Actors'
 *          
 */

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id))
            res.status(404).json({ message: 'This id does not belong to any actors' })

        await Actors.findByIdAndDelete(id)
        res.status(200).json({ message: 'Actors deletion successful' })
    } catch (error) {
        console.log(error.message)
        res.json({ message: 'An error occurred during the deletion process' })
    }

})

export default router;