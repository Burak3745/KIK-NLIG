import express from "express";
import mongoose from "mongoose";

import Movie from "../models/movieModel.js";

import auth from "../middleware/auth.js";
const router = express.Router();


/**
 * @swagger
 * /movie:
 *   get:
 *    summary: Get All Movie
 *    description: Use to request all movie
 *    responses:
 *      200:
 *        description: A successful response
 *        
 */

router.get("/", auth, async (req, res) => {
    try {
        const getMovie = await Movie.find()

        res.status(200).json(getMovie)
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})

/**
 * @swagger
 * /movie/{id}:
 *   get:
 *    summary: Get ID Movie
 *    description: Use to request all movie
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
            res.status(404).json({ message: 'Movie id is not valid' })

        const movie = await Movie.findById(id)
        if (!movie) return

        res.status(200).json(movie)
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Movie not found' })
    }
})


/**
 * @swagger
 * definitions:
 *    Movie:
 *      properties:
 *        name:
 *           type: string
 *        time:
 *           type: string
 *        link:
 *           type: string
 *        country:
 *           type: string
 *        year:
 *           type: string
 *        score:
 *           type: string
 *        description:
 *           type: string
 *        director:
 *           type: string
 *        company:
 *           type: string
 *        actors:
 *           type: string
 *        season:
 *           type: string
 *        type:
 *           type: string
 *        catagory:
 *           type: string
 */




/**
 * @swagger
 * /movie:
 *   post:
 *    summary: Add Movie
 *    description: this ap
 *    
 *    parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           $ref: '#/definitions/Movie' 
 *    responses:
 *         200:
 *           description: added
 *           schema:
 *              $ref: '#/definitions/Movie'
 *          
 */



router.post("/", auth, async (req, res) => {
    try {
        if (req.creatorType !== "ADMIN") return res.sendStatus(403)
        const createdMovie = await Movie.create(req.body)
        res.status(201).json(createdMovie)
    } catch (error) {
        console.log(error);
        res.json({ message: 'Movie creation failed' })
    }


})

/**
 * @swagger
 * /movie/{id}:
 *   put:
 *    summary: Update Movie
 *    description: this ap
 *    
 *    parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           $ref: '#/definitions/Movie' 
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
 *              $ref: '#/definitions/Movie'
 *          
 */

router.put('/:id', auth, async (req, res) => {
    try {

        const { id } = req.params


        if (!mongoose.Types.ObjectId.isValid(id))
            res.status(404).json({ message: 'This id does not belong to any movie' })

        const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(updatedMovie)

    } catch (error) {
        console.log(error.message)
        res.json({ message: 'An error occurred during the update process' })
    }

})



/**
 * @swagger
 * /movie/{id}:
 *   delete:
 *    summary: Delete Movie
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
 *              $ref: '#/definitions/Movie'
 *          
 */

router.delete("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params

        if (req.creatorType !== "ADMIN") return res.sendStatus(403)

        if (!mongoose.Types.ObjectId.isValid(id))
            res.status(404).json({ message: 'This id does not belong to any movie' })

        await Movie.findByIdAndDelete(id)
        res.status(200).json({ message: 'Movie deletion successful' })
    } catch (error) {
        console.log(error.message)
        res.json({ message: 'An error occurred during the deletion process' })
    }

})

/**
 * @swagger
 * definitions:
 *    Like:
 *      properties:
 *        userid:
 *           type: string
 */


/**
 * @swagger
 * /movie/like/{id}:
 *   put:
 *    summary: Like Movie
 *    description: this ap
 *    
 *    parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           $ref: '#/definitions/Like' 
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
 *              $ref: '#/definitions/Like'
 *          
 */

router.put('/like/:id', async (req, res) => {
    try {

        const movie = await Movie.findById(req.params.id);

        if (movie.likes.filter(like => like.user.toString() === JSON.stringify(req.body)).length > 0) {
            return res.status(400).json({ msg: 'Movie already liked' })
        }

        if (movie.dislikes.filter(dislike => dislike.user.toString() === JSON.stringify(req.body)).length > 0) {
            const removeIndex = movie.dislikes.map(dislike => dislike.user.toString()).indexOf(JSON.stringify(req.body))

            movie.dislikes.splice(removeIndex, 1);

        }

        movie.likes.unshift({ user: JSON.stringify(req.body) })

        await movie.save();

        res.status(200).json(movie.likes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error')
    }
})

/**
 * @swagger
 * /movie/unlike/{id}:
 *   put:
 *    summary: Unlike Movie
 *    description: this ap
 *    
 *    parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           $ref: '#/definitions/Like' 
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
 *              $ref: '#/definitions/Like'
 *          
 */
router.put('/unlike/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (movie.likes.filter(like => like.user.toString() === JSON.stringify(req.body)).length === 0) {
            return res.status(400).json({ msg: 'Movie has been not yet liked' })
        }

        const removeIndex = movie.likes.map(like => like.user.toString()).indexOf(JSON.stringify(req.body))

        movie.likes.splice(removeIndex, 1);

        await movie.save();

        res.json(movie.likes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error')
    }
})

/**
 * @swagger
 * /movie/dislike/{id}:
 *   put:
 *    summary: Dislike Movie
 *    description: this ap
 *    
 *    parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           $ref: '#/definitions/Like' 
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
 *              $ref: '#/definitions/Like'
 *          
 */

router.put('/dislike/:id', async (req, res) => {
    try {

        const movie = await Movie.findById(req.params.id);

        if (movie.dislikes.filter(dislike => dislike.user.toString() === JSON.stringify(req.body)).length > 0) {
            return res.status(400).json({ msg: 'Movie already disliked' })
        }

        if (movie.likes.filter(like => like.user.toString() === JSON.stringify(req.body)).length > 0) {
            const removeIndex = movie.likes.map(like => like.user.toString()).indexOf(JSON.stringify(req.body))

            movie.likes.splice(removeIndex, 1);


        }

        movie.dislikes.unshift({ user: JSON.stringify(req.body) })

        await movie.save();

        res.status(200).json(movie.dislikes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error')
    }
})

/**
 * @swagger
 * /movie/undislike/{id}:
 *   put:
 *    summary: Undislike Movie
 *    description: this ap
 *    
 *    parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           $ref: '#/definitions/Like' 
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
 *              $ref: '#/definitions/Like'
 *          
 */

router.put('/undislike/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (movie.dislikes.filter(dislike => dislike.user.toString() === JSON.stringify(req.body)).length === 0) {
            return res.status(400).json({ msg: 'Movie has been not yet disliked' })
        }

        const removeIndex = movie.dislikes.map(dislike => dislike.user.toString()).indexOf(JSON.stringify(req.body))

        movie.dislikes.splice(removeIndex, 1);

        await movie.save();

        res.json(movie.dislikes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error')
    }
})



router.put("/updateallactor/:id", auth, async (req, res) => {
    try {
        const { id } = req.params

        if (req.creatorType !== "ADMIN") return res.sendStatus(403)

        const players = await Movie.find({ 'player.actorsid': id });

        for (const film of players) {
            const actorIndex = film.player.findIndex(actor => actor.actorsid === id);

            if (actorIndex !== -1) {
                film.player[actorIndex].name = req.body.name;
                film.player[actorIndex].image = req.body.image;

                await film.save();
            }
        }



        res.status(200).json({ message: "Actors updated successfully" })
    } catch (error) {
        console.log(error.message)
        res.json({ message: "An error occurred during the update process" })
    }
})




router.delete("/deleteallactor/:id", auth, async (req, res) => {
    try {
        const { id } = req.params

        if (req.creatorType !== "ADMIN") return res.sendStatus(403)

        const players = await Movie.find({ 'player.actorsid': id });

        for (const film of players) {
            const actorIndex = film.player.findIndex(actor => actor.actorsid === id);

            if (actorIndex !== -1) {
                film.player.splice(actorIndex, 1);

                await film.save();
            }
        }
        res.status(200).json({ message: "Actors delete successfully" })
    } catch (error) {
        console.log(error.message)
        res.json({ message: "An error occurred during the delete process" })
    }
})





/*actors.forEach( async (actor) => {
      actor.name = name
      actor.image = image
      await actor.save()
    })*/

export default router;

/*
import WebTorrent from 'webtorrent'
const client = new WebTorrent();
const torrentId1 = 'magnet:?xt=urn:btih:a6d87cc8568bbdf8a3b9568d34bef9080d3eb24d&dn=Breaking+Bad+S01E01+Pilot&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969';
router.get('/torrent/:torrentId', (req, res) => {
    const { torrentId } = req.params;
    console.log("indiriliyor")
    client.add(torrentId1, function (torrent) {
        const file = torrent.files.find(file => file.name.endsWith('.avi')); // Örnek olarak sadece mp4 dosyasını alalım
        file.createReadStream()
            .on('error', (err) => {
                console.error('Error reading stream:', err);
                res.status(500).send('Internal Server Error');
            })
            .pipe(res); // Dosyayı HTTP yanıtına boru hattıyla gönder
    });
});
*/

