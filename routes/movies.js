const express = require("express");
const MoviesService = require("../services/movies");
const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema,
} = require("../utils/schemas/movies");
const validationHandler = require("../utils/middleware/validationHandler");
const cacheResponse = require('../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECOND, SIXTY_MINUTES_IN_SECOND } = require('../utils/time');

function moviesApi(app) {
  const router = express.Router();
  app.use("/api/movies", router);
  const moviesService = new MoviesService();

  router.get("/", async (req, res, next) => {
    cacheResponse(res, FIVE_MINUTES_IN_SECOND);
    const { tags } = req.query;
    try {
      const movies = await moviesService.getMovies({ tags });
      res.status(200).json({
        data: movies,
        message: "Movies listed!",
      });
    } catch (error) {
      next(error);
    }
  });

  router.get(
    "/:movieId",
    validationHandler({ movieId: movieIdSchema }, "params"),
    async (req, res, next) => {
      cacheResponse(res, SIXTY_MINUTES_IN_SECOND);
      try {
        const { movieId } = req.params;
        const movies = await moviesService.getMovie({ movieId });
        res.status(200).json({
          data: movies,
          message: "Movies retriewed!",
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    "/",
    validationHandler(createMovieSchema),
    async (req, res, next) => {
      const { body: movie } = req;
      try {
        const createdMovieID = await moviesService.createMovie({ movie });
        res.status(201).json({
          data: createdMovieID,
          message: "Movies created!",
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    "/:movieId",
    validationHandler({ movieId: movieIdSchema }, "params"),
    validationHandler(updateMovieSchema),
    async (req, res, next) => {
      try {
        const { body: movie } = req;
        const { movieId } = req.params;
        const updateMovieID = await moviesService.updateMovie({
          movieId,
          movie,
        });
        res.status(200).json({
          data: updateMovieID,
          message: "Movies updated!",
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    "/:movieId",
    validationHandler({ movieId: movieIdSchema }, "params"),
    async (req, res, next) => {
      try {
        const { movieId } = req.params;
        const deleteMovieID = await moviesService.deleteMovie({ movieId });
        res.status(200).json({
          data: deleteMovieID,
          message: "Movies delete!",
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = moviesApi;
