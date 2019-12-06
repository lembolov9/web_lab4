import * as actions from "../constants/action-types";
import {INITIAL_STATE} from "../constants/initial-state";
import {combineReducers} from "redux";

const weatherReducer = (state =INITIAL_STATE.cityList, action = {}) => {
    let newState = [];
    if (action.id === 0) {
        return state;
    }

    switch (action.type) {
        case actions.WEATHER_WAIT:
            newState = state.cities.map(city =>
                city.id === action.id ? {...city, waiting: true} : city
            );
            return {
                ...state,
                cities: newState
            };

        case actions.WEATHER_SUCCESS:
            newState = state.cities.map(city =>
                city.id === action.id ? {...city, waiting: false, weather: action.weather} : city
            );
            return {
                ...state,
                cities: newState
            };

        case actions.WEATHER_ERROR:
            newState = state.cities.map(city =>
                city.id === action.id ? {...city, waiting: false, error: action.error} : city
            );
            return {
                ...state,
                cities: newState
            };

        case actions.ADD_CITY:
            return {
                ...state,
                newCity: action.name
            };

        case actions.ADD_CITY_SUCCESS:
            newState = [...state.cities, action.city];
            return {
                ...state,
                error: null,
                cities: newState,
                newCity: null
            };

        case actions.ADD_CITY_ERROR:
            return {
                ...state,
                error: action.error
            };

        case actions.DELETE_CITY:
            return {
                ...state,
                cityForDelete: action.id
            };

        case actions.DELETE_CITY_SUCCESS:
            newState = state.cities.filter(city => city.id !== action.id);
            return {
                ...state,
                cities: newState,
                error: null,
                cityToDelete: null
            };

        case actions.GET_CITIES_WAIT:
            return {
                ...state,
                isGetting: true,
            };

        case actions.GET_CITIES_SUCCESS:
            return {
                ...state,
                cities: action.cities,
                isGetting: false
            };

        case actions.GET_CITIES_ERROR:
            return {
                ...state,
                isGetting: true,
                error: action.error
            };

        default:
            return state;
    }
};

const mainCityReducer = (state = INITIAL_STATE.mainCity, action = {}) => {
    if (action.id !== 0) {
        return state;
    }
    switch (action.type) {
        case actions.WEATHER_WAIT:
            return {
                ...state,
                waiting: true
            };

        case actions.WEATHER_SUCCESS:
            return {
                ...state,
                waiting: false,
                weather: action.weather
            };

        case actions.WEATHER_ERROR:
            return {
                ...state,
                waiting: false,
                error: action.error
            };

        default:
            return state;
    }
};

export const getCities = state => state.cityList.cities;
export const getError = state => state.cityList.error;
export const getIsGetting = state => state.cityList.isGetting;
export const getNewCity = state => state.cityList.newCity;
export const getMainCity = state => state.mainCity;
export const getCityForDelete = state => state.cityList.cityForDelete

export default combineReducers({
    cityList: weatherReducer,
    mainCity: mainCityReducer
});