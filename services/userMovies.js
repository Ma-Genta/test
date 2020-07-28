const MongoLib = require('../lib/mongo');

class UserMoviesService {
  constructor() {
    this.colletion = "user-movies";
    this.mongoDB = new MongoLib();
  }

  async getUserMovies({ userId }) {
    const query = userId && { userId };
    const userMovies = await this.mongoDB.getAll(this.colletion, query);
    return userMovies || [];
  };

  async createUserMovie({ userMovie }) {
    const createdUserMovieId = await this.mongoDB.create(this.colletion, userMovie);
    return createdUserMovieId;
  };

  async deleteUserMovie({ userMovieId }) {
    const deleteUserMovieId = await this.mongoDB.delete(this.colletion, userMovieId);
    return deleteUserMovieId;
  };
};

module.exports = UserMoviesService;