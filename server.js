const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const HttpException = require('./app/utils/HttpException.utils');
const errorMiddleware = require('./app/middleware/error.middleware');

// Init express
const app = express();
// Init environment
dotenv.config();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options('*', cors());

const port = Number(process.env.PORT || 8080);

var routes = require('./app/routes/appRoutes'); //importing route
routes(app); //register the route

// 404 error
app.all('*', (req, res, next) => {
  const err = new HttpException(404, 'Endpoint Not Found');
  next(err);
});

// Error middleware
app.use(errorMiddleware);

// starting the server
app.listen(port, () => console.log(`🚀 Server running on port ${port}!`));

module.exports = app;
