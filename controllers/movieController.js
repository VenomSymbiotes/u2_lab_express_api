const Movie = require("../models/movie");

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (movie) {
      return res.json(movie);
    }
    return res.status(404).send("Movie with the specified ID does not exist");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const createMovie = async (req, res) => {
  try {
    const movie = await new Movie(req.body);
    await movie.save();
    return res.status(201).json({
      movie,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateMovie = async (req, res) => {
  try {
    let { id } = req.params;
    let movie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
    if (movie) {
      return res.status(200).json(movie);
    }
    throw new Error("Movie not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Movie.findByIdAndDelete(id);
    if (deleted) {
      return res.status(200).send("Movie deleted");
    }
    throw new Error("Movie not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
