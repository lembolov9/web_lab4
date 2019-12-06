import React from "react";
import Weather from "../Weather/Weather";
import {
    getWeatherWait,
    getWeatherError,
    getWeatherSuccess,
    deleteCity,
    deleteCitySuccess,
    deleteCityError, getCitiesWait, getCitiesSuccess, getCitiesError
} from '../../actions';
import { connect } from 'react-redux';
import axios from "axios"
import {getCities, getCityForDelete, getError, getIsGetting, getNewCity} from "../../reducers"
import "./WeatherList.css"
import {api} from "../../constants/server";

export const getWeatherByNameAction = (id, cityName) => {
    return dispatch => {
        dispatch(getWeatherWait(id));
        axios
            .get(`${api}weather?city=${cityName}`)
            .then(response => {
                dispatch(getWeatherSuccess(response.data, id));
                console.log(response.data);
            })
            .catch(error => {
                dispatch(getWeatherError(error, id));
                console.log(error);
            });
    }
};

const deleteCityAction = id => {
    return dispatch => {
        dispatch(deleteCity(id));
        axios
            .delete(`${api}favourites/${id}`)
            .then(response => {
                dispatch(deleteCitySuccess(id));
            })
            .catch(error => {
                dispatch(deleteCityError(error));
            });
    };
};

const getCitiesAction = () => {
    return dispatch => {
        dispatch(getCitiesWait());
        axios
            .get(`${api}favourites`)
            .then(response => {
                const cities = response.data.map(city => ({ name: city.name, id: city._id }));
                dispatch(getCitiesSuccess(cities));
            })
            .catch(error => {
                dispatch(getCitiesError(error));
            });
    };
};

const mapStateToProps = (state) => ({
    cities: getCities(state),
    error: getError(state),
    newCityId: getNewCity(state),
    isGetting: getIsGetting(state),
    cityToDelete: getCityForDelete(state)
});

const mapDispatchToProps = (dispatch) => ({
    getCities: () => dispatch(getCitiesAction()),
    getWeatherByName: (id, name) => dispatch(getWeatherByNameAction(id, name)),
    deleteCity: id => dispatch(deleteCityAction(id))
});


class WeatherList extends React.Component {

    componentDidMount(){
        this.props.getCities();
    }

    render() {
        if (this.props.error !== null) {
            if (this.props.isGetting) {
                return (
                    <div className="WeatherList">
                        Error with get cities'
                    </div>
                );
            }

            if (this.props.cityForDelete !== null) {
                alert('Cannot delete city');
            }

            if (this.props.newCity !== null) {
                alert('Cannot add new city');
            }

        } else {
            if (this.props.isGetting) {
                return (
                    <div className="WeatherList">
                        <div className="loader"/>
                    </div>
                );
            }
        }
        if (Array.isArray(this.props.cities)) {
            return (
                <div className="WeatherList">
                    {this.props.cities.map(city => (
                        <Weather key={city.id} data={city}
                                 getWeather={() => this.props.getWeatherByName(city.id, city.name)}
                                 deleteCity={() => this.props.deleteCity(city.id)}/>
                    ))}
                </div>
            );
        } else {
            return (
                <div className="WeatherList"/>
            )
        }
    }
}

const WList = connect(mapStateToProps, mapDispatchToProps)(WeatherList);


export {WList , WeatherList};