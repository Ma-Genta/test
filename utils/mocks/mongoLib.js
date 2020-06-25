const sinon = require('sinon');

const { moviesMock, MoviesServiceMock, filteredMoviesMock } = require('./movies');

const getAllStub = sinon.stub();

getAllStub.withArgs('movies').resolves(moviesMock);

const tagQuery = { tags: { $in: ['Drama'] } };
getAllStub.withArgs('movies', tagQuery).resolves(filteredMoviesMock('Drama'));

const createStub = sinon.stub().resolves(moviesMock[0].id);

class MongoLibMock {
    getAll(collection, query){
        getAllStub(collection, query);
    };

    create(collection, data) {
        return create(collection, data);
    };
};

module.exports = {
    getAllStub,
    createStub,
    MongoLibMock
};