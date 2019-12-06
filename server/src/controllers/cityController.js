const City =  require('../models/WeatherCity');

const create = (req, res) => {
    const weatherCity = new City({
        name: req.body.name
    });
    weatherCity.save()
        .then(
            city => res.status(201).json({ success: true, message: 'сity was added', city })
        )
        .catch(
            err => res.status(404).json({ success: false, message: 'сity was not added', err})
        );
};

const deleteById = (req, res) => {
    City
        .findOneAndDelete({ _id: req.params.id })
        .then(
            () => res.json({ success: true, message: `сity ${req.params.id} was deleted` })
        )
        .catch(
            err => res.status(404).json({ success: false, message: 'city not found', err })
        );
};

const getList = (req, res) => {
    City
        .find()
        .then(
            cities => res.json(cities)
        )
        .catch(
            err => res.status(500).json({ success: false, message: 'cities get error', err })
        );
};

module.exports = {
    create,
    deleteById,
    getList
};