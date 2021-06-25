const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const userController = require('../controllers/userController');
const proizvoditelController = require('../controllers/proizvoditelController');
const artikalController = require('../controllers/artikalController');
const narackiController = require('../controllers/narackiController');

module.exports = function (app) {
  // Users Routes
  app
    .route('/users')
    .get(awaitHandlerFactory(userController.getAllUsers))
    .post(awaitHandlerFactory(userController.createUser));

  app
    .route('/users/:id')
    .get(awaitHandlerFactory(userController.getUserById))
    .put(auth(), awaitHandlerFactory(userController.updateUser))
    .delete(auth(), awaitHandlerFactory(userController.deleteUser));

  app
    .route('/users/username/:username')
    .get(awaitHandlerFactory(userController.getUserByUsername));

  // Proizvoditeli Routes
  app
    .route('/proizvoditeli')
    .get(awaitHandlerFactory(proizvoditelController.getAllProizvoditeli))
    .post(awaitHandlerFactory(proizvoditelController.createProizvoditel));

  app
    .route('/proizvoditeli/:proizvoditelId')
    .get(awaitHandlerFactory(proizvoditelController.getProizvoditel))
    .put(awaitHandlerFactory(proizvoditelController.updateProizvoditel))
    .delete(awaitHandlerFactory(proizvoditelController.deleteProizvoditel));

  // Artikli Routes
  app
    .route('/artikli')
    .get(awaitHandlerFactory(artikalController.getAllArtikli))
    .post(awaitHandlerFactory(artikalController.createArtikal));

  app
    .route('/artikli/:articleId')
    .get(awaitHandlerFactory(artikalController.getArtikal))
    .put(awaitHandlerFactory(artikalController.updateArtikal))
    .delete(awaitHandlerFactory(artikalController.deleteArtikal));

  app
  .route('/artikli/proizvoditel/:proizvoditel')
  .get(awaitHandlerFactory(artikalController.getArtikliByProizvoditel))

  // Naracki Routes
  app
    .route('/naracki')
    .get(awaitHandlerFactory(narackiController.getAllNaracki))
    .post(awaitHandlerFactory(narackiController.createNaracki));

  app
    .route('/naracki/:narackaId')
    .get(awaitHandlerFactory(narackiController.getNaracka))
    .put(awaitHandlerFactory(narackiController.updateNaracki))
    .delete(awaitHandlerFactory(narackiController.deleteNaracka));

  app
    .route('/naracki/orderNumber/:narackaId')
    .get(awaitHandlerFactory(narackiController.getNarackiByOrderNumber));

  // Login Routes
  app.route('/login').post(awaitHandlerFactory(userController.userLogin));
};
