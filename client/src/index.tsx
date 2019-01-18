import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {applyMiddleware, compose, createStore} from "redux";
import ReduxThunk from 'redux-thunk'
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {rootReducer} from "./store/rootReducer";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";

/**
 * Create store to manage state over application
 */
const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(ReduxThunk),
        window["devToolsExtension"] ? window["devToolsExtension"]() : (f: any) => f
    )
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
