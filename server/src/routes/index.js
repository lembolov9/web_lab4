const express =  require('express');
const cityController = require('../controllers/cityController');
const weatherController  = require('../controllers/weatherController');

const router = express.Router();

router.get('/weather', weatherController.getWeatherByCityName);

router.get('/weather/coordinates', weatherController.getWeatherByCoords);

router.route('/favourites')
    .get(cityController.getList)
    .post(cityController.create);

router.delete('/favourites/:id', cityController.deleteById);

module.exports = router;
