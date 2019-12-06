import * as constants from "../constants/action-types";

export const addCity = (name) => ({
    type: constants.ADD_CITY,
    name
});

export const addCitySuccess = (city) => ({
    type: constants.ADD_CITY_SUCCESS,
    city
});

export const addCityError = (error) => ({
    type: constants.ADD_CITY_ERROR,
    error
});

export const deleteCity = (id) => ({
    type: constants.DELETE_CITY,
    id
});

export const deleteCitySuccess = (id) => ({
    type: constants.DELETE_CITY_SUCCESS,
    id
});

export const deleteCityError = (error) => ({
    type: constants.DELETE_CITY_ERROR,
    error
});

export const getWeatherWait = (id) => ({
    type: constants.WEATHER_WAIT,
    id
});

export const getWeatherSuccess = (weather, id) => ({
    type: constants.WEATHER_SUCCESS,
    id,
    weather
});

export const getWeatherError = (error, id) => ({
    type: constants.WEATHER_ERROR,
    id,
    error
});

export const getCitiesWait = () => ({
    type: constants.GET_CITIES_WAIT
});

export const getCitiesSuccess = (cities) => ({
    type: constants.GET_CITIES_SUCCESS,
    cities
});

export const getCitiesError = (error) => ({
    type: constants.GET_CITIES_ERROR,
    error
});