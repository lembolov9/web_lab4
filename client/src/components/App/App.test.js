import renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import React from "react";
import {App} from "./App";
import {Provider} from "react-redux";
import {INITIAL_STATE} from "../../constants/initial-state";
import correctWeather from "../../test-data/correctWeather";
import {FAKE_STATE} from "../../test-data/fakeState";
import thunk from "redux-thunk";

const mockStore = configureMockStore();
const fakeState = INITIAL_STATE;
fakeState.mainCity.weather = correctWeather;
fakeState.mainCity.waiting = false;

const fakeStore = mockStore(fakeState);

it("App display correctly without favourites", () => {
    const component = renderer.create(
        <Provider store={fakeStore}>
            <App getWeatherByCoords={() => {}} mainCity={fakeState.mainCity} />
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});


const mockStoreWithFav = configureMockStore([thunk]);
const fakeStateWithFav = FAKE_STATE;
fakeState.mainCity.weather = correctWeather;
fakeState.mainCity.waiting = false;

const fakeStoreWithFav = mockStoreWithFav(fakeStateWithFav);

it("App display correctly with favourites", () => {
    const component = renderer.create(
        <Provider store={fakeStoreWithFav}>
            <App getWeatherByCoords={() => {}} mainCity={fakeState.mainCity} />
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});