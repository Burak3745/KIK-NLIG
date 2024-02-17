import express from "express";
import mongoose from "mongoose";

import Series from "../models/seriesModel.js";
import auth from "../middleware/auth.js";
const router = express.Router();




/**
 * @swagger
 * /series:
 *   get:
 *    summary: Get All Series
 *    description: Use to request all Series
 *    responses:
 *      200:
 *        description: A successful response
 *        
 */

router.get("/", auth, async (req, res) => {
    try {
        const getSeries = await Series.find()

        res.status(200).json(getSeries)
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})

/**
 * @swagger
 * /series/{id}:
 *   get:
 *    summary: Get ID Series
 *    description: Use to request all Series
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
router.get('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id))
            res.status(404).json({ message: 'Series id is not valid' })

        const series = await Series.findById(id)
        if (!series) return

        res.status(200).json(series)
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Series not found' })
    }
})

/**
 * @swagger
 * definitions:
 *    Series:
 *      properties:
 *        name:
 *           type: string
 *        time:
 *           type: string
 *        link:
 *           type: string
 *        year:
 *           type: string
 *        description:
 *           type: string
 *        season:
 *           type: string
 *        episode:
 *           type: string
 *        foreignkey:
 *           type: string
 */




/**
 * @swagger
 * /series:
 *   post:
 *    summary: Add Series
 *    description: this ap
 *    
 *    parameters:
 *       - in: body
 *         name: Series
 *         description: The Series to create.
 *         schema:
 *           $ref: '#/definitions/Series' 
 *    responses:
 *         200:
 *           description: added
 *           schema:
 *              $ref: '#/definitions/Series'
 *          
 */



router.post("/", auth, async (req, res) => {
    try {
        if (req.creatorType !== "ADMIN") return res.sendStatus(403)
        const createdSeries = await Series.create(req.body)
        res.status(201).json(createdSeries)
    } catch (error) {
        console.log(error);
        res.json({ message: 'Series creation failed' })
    }


})

/**
 * @swagger
 * /series/{id}:
 *   put:
 *    summary: Update Series
 *    description: this ap
 *    
 *    parameters:
 *       - in: body
 *         name: user
 *         description: The Series to update.
 *         schema:
 *           $ref: '#/definitions/Series' 
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
 *              $ref: '#/definitions/Series'
 *          
 */

router.put('/:id', auth, async (req, res) => {
    try {

        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id))
            res.status(404).json({ message: 'This id does not belong to any movie' })

        const SeriesMovie = await Series.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(SeriesMovie)

    } catch (error) {
        console.log(error.message)
        res.json({ message: 'An error occurred during the update process' })
    }

})

/**
 * @swagger
 * /series/{id}:
 *   delete:
 *    summary: Delete Series
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
 *              $ref: '#/definitions/Series'
 *          
 */

router.delete("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params
        if (req.creatorType !== "ADMIN") return res.sendStatus(403)
        if (!mongoose.Types.ObjectId.isValid(id))
            res.status(404).json({ message: 'This id does not belong to any series' })

        await Series.findByIdAndDelete(id)
        res.status(200).json({ message: 'Series deletion successful' })
    } catch (error) {
        console.log(error.message)
        res.json({ message: 'An error occurred during the deletion process' })
    }

})

/**
 * @swagger
 * /series/alldeleteseries/{id}:
 *   delete:
 *    summary: Delete All Series
 *    description: this ap
 *    
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Movie ID please
 *         schema:
 *           type: string
 *    responses:
 *         200:
 *           description: added
 *           schema:
 *              $ref: '#/definitions/Series'
 *          
 */


router.delete("/alldeleteseries/:id", auth, async (req, res) => {
    try {
        const { id } = req.params
        if (req.creatorType !== "ADMIN") return res.sendStatus(403)
        const getSeries = await Series.find()
        
        if (getSeries.filter((item) => item.foreignkey === id).length == 0){
            console.log("There is no episode of this movie")
            return res.status(400)
        }

        await Series.deleteMany({ foreignkey: { $in: id } })
        res.status(200).json({ message: 'Episodes deletion successful' })
        
    } catch (error) {
        console.log(error.message)
        res.json({ message: 'An error occurred during the deletion process' })
    }

})

export default router;