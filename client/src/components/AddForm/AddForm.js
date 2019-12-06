import React from "react";
import {connect} from "react-redux";
import {getCities} from "../../reducers";
import {addCity, addCityError, addCitySuccess} from "../../actions";
import "./AddForm.css"
import {api} from "../../constants/server";
import axios from "axios";

const addCityAction = name => {
    return dispatch => {
        dispatch(addCity(name));
        axios
            .post(`${api}favourites`, { name })
            .then(response => {
                const city = {
                    id: response.data.city._id,
                    name: response.data.city.name
                };
                dispatch(addCitySuccess(city));
            })
            .catch(error => {
                dispatch(addCityError(error));
            });
    };
};

class AddForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleFormInput = this.handleFormInput.bind(this);
    }

    handleFormInput(event) {
        event.preventDefault();
        this.props.addCity(event.target[0].value);
    }

    render() {
        return (
            <div className="AddForm">
                <div><h2>Favourites</h2></div>
                <div>
                    <form onSubmit={this.handleFormInput}>
                        <input id="addCity" placeholder="Add city" required/>
                        <button className="addBtn" type="submit">+</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    cities: getCities(state)
});

const mapDispatchToProps = dispatch => ({
    addCity: name => dispatch(addCityAction(name))
});

const Add = connect(mapStateToProps, mapDispatchToProps)(AddForm);


export {Add, AddForm};