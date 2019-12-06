import 'bootstrap/dist/css/bootstrap.css'
import React from 'react';
import {render} from 'react-dom';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import {INITIAL_STATE} from "./constants/initial-state";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index"
import * as serviceWorker from './serviceWorker';
import {AppC} from "./components/App/App";


const store  = createStore(rootReducer, INITIAL_STATE, applyMiddleware(thunk));

render(
        <Provider store={store}>
            <AppC/>
        </Provider>,
    document.getElementById("root")
);

serviceWorker.unregister();