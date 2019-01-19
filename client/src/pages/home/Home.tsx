import * as React from 'react';
import {Button, IconButton, InputAdornment, TextField} from "@material-ui/core";
import {Search} from "@material-ui/icons";
import {Dispatch} from "redux";
import {RouteComponentProps, withRouter} from "react-router";
import {connect} from "react-redux";
import {logOut} from "../../store/actions/auth";

interface Props extends RouteComponentProps {
    logOut: () => void;

}

class Home extends React.Component<Props> {

    state = {
        search: ''
    };

    /**
     * handles search field value changes
     * @param e
     */
    handleChange = (e) => {
        this.setState({search: e.target.value})
    };
    /**
     * Handles search function
     */
    handleSubmit = (event) => {
        event.preventDefault();
        console.log('submit')
    };

    handleLogOut = () => {
        this.props.logOut();
        this.props.history.push('/login')
    };

    render() {
        return (
            <div className='container'>
                <div className="row mt-2 justify-content-end">
                    <Button variant={"outlined"} onClick={this.handleLogOut}>
                        Logout
                    </Button>
                </div>
                <div className="mt-3 row justify-content-center">
                    <form onSubmit={this.handleSubmit} style={{width: '90%'}}>
                        <TextField
                            fullWidth
                            variant={"outlined"}
                            type={'text'}
                            value={this.state.search}
                            onChange={this.handleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={this.handleSubmit}>
                                            <Search/>
                                        </IconButton>
                                    </InputAdornment>),
                            }}
                            placeholder='Enter here to search'
                        />
                    </form>
                </div>
            </div>
        )
    }
}

/**
 * define the dispatch actions
 * @param dispatch the actions to be dispatched
 */
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        logOut: () => dispatch(logOut())
    }
};
export default withRouter(connect(null, mapDispatchToProps)(Home));
