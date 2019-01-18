import * as React from "react";
import {Route, withRouter} from "react-router";
import Login from "./pages/Auth/Login";


const App = () => {
    return (
        <div>
            <Route path='/' exact component={Login}/>
        </div>
    )
};

export default withRouter(App)
