const express = require('express');
const helmet = require('helmet');
const app = express();
const { config } = require('./config');
const moviesApi = require('./routes/movies.js');
const userMoviesApi = require('./routes/UserMovies');
const authApi = require('./routes/auth');
const { logErrors, errorHandler, wrapErrors } = require('./utils/middleware/errorHandlers')
const notFoundHandler = require('./utils/middleware/notFoundHandler');

app.use(express.json());
app.use(helmet());

moviesApi(app);
userMoviesApi(app);
authApi(app);
app.use(notFoundHandler); //Captura Error 404
//Errores
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Listen on http://localhost:${config.port}`);
});

