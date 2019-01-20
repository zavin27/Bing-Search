import * as React from "react";
import {Redirect, Route, RouteComponentProps, Switch, withRouter} from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/home/Home";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {checkAuthStatus} from "./store/actions/auth";

interface Props extends RouteComponentProps {
    isAuthenticated: boolean;
    checkAuthStatus: () => void;
}

class App extends React.Component<Props> {

    componentDidMount() {
        this.props.checkAuthStatus();
    }


    render() {
        const {isAuthenticated} = this.props;
        return (
            <div className='position-relative'>
                {isAuthenticated
                    ?
                    <Switch>
                        <Route path='/' exact component={Home}/>
                        <Route path='/login' exact component={Login}/>
                        <Route path='/register' exact component={Register}/>
                        {isAuthenticated !== undefined && <Redirect to={'/'}/>}
                    </Switch>
                    :
                    <Switch>
                        <Route path='/login' exact component={Login}/>
                        <Route path='/register' exact component={Register}/>
                        {isAuthenticated !== undefined && <Redirect to={'/login'}/>}
                    </Switch>
                }
            </div>
        )
    }
}

/**
 * defines the state properties
 * @param state
 */
const mapStateToProps = (state: any) => {
    return {
        isAuthenticated: state.AuthReducer.isAuthenticated
    }
};
/**
 * define the dispatch actions
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        checkAuthStatus: () => dispatch(checkAuthStatus() as any)
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
