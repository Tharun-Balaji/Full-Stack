const router = require('express').Router();
const Movie = require('../models/movieModel');
const authMiddleware = require('../middleware/authMiddleware');

//Create 
router.post("add-movie", authMiddleware, async (req, res,) => {
    try {
        const movie = req.body;
        const newMovie = new Movie(movie);
        await newMovie.save();
        res.status(200).send({
            success: true,
            message: "Movie added successfully"
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

//Read

router.get("get-all-movies", authMiddleware, async (_, res,) => {
    try {
        const movies = await Movie.find();
        res.status(200).send({
            success: true,
            message: "Movies Fetched successfully",
            data: movies
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

// Update

router.put("update-movie/", authMiddleware, async (req, res,) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.body.movieId,req.body  );
        res.status(200).send({
            success: true,
            message: "Movie updated successfully",
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

// Delete

router.delete("delete-movie/", authMiddleware, async (req, res,) => {
 try {
   await Movie.findByIdAndDelete(request.query.movieId);
   response.send({
     success: true,
     message: "Movie Deleted Successfully",
   });
 } catch (err) {
   response.status(500).send({
     success: false,
     message: err.message,
   });
 }
})

module.exports = router;