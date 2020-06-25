const express = require('express');
const app = express();
const { config } = require('./config');
const moviesApi = require('./routes/movies.js');
const { logErrors, errorHandler, wrapErrors } = require('./utils/middleware/errorHandlers')
const notFoundHandler = require('./utils/middleware/notFoundHandler');
app.use(express.json());

moviesApi(app);
app.use(notFoundHandler); //Captura Error 404
//Errores
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Listen on http://localhost:${config.port}`);
});

