import * as React from 'react';
import {Button, IconButton, InputAdornment, TextField} from "@material-ui/core";
import {Search} from "@material-ui/icons";
import {Dispatch} from "redux";
import {RouteComponentProps, withRouter} from "react-router";
import {connect} from "react-redux";
import {logOut} from "../../store/actions/auth";
import {searchAPI} from "../../rest-api/Search";
import {WebPageItem} from "./components/WebPageItem";
import './HomeStyles.css';

interface Props extends RouteComponentProps {
    logOut: () => void;
    searchRequest: (value: string) => Promise<any>;
    searchHistoryRequest: () => Promise<any>;
}

class Home extends React.Component<Props> {

    state = {
        search: '',
        results: [],
        recentlySearched: [],
        showRecentlySearch: false,
    };

    inputRef = React.createRef<HTMLInputElement>();

    componentDidMount(): void {
        const searchInput = localStorage.getItem('searchInput');
        if (searchInput) {
            this.props.searchRequest(searchInput)
                .then(data => {
                    console.log(data);
                    this.setState({results: data, search: searchInput})
                })
                .catch(error => {

                })
        }
        this.getRecentlySearched();
    }

    getRecentlySearched = () => {
        this.props.searchHistoryRequest()
            .then(data => {
                console.log(data);
                this.setState({recentlySearched: data})
            })
            .catch(error => {

            })
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
        console.log('submit');
        localStorage.setItem('searchInput', this.state.search);
        this.props.searchRequest(this.state.search)
            .then(data => {
                console.log(data);
                this.setState({results: data, showRecentlySearch: false});
                this.getRecentlySearched();
            })
            .catch(error => {

            })
    };

    handleLogOut = () => {
        this.props.logOut();
        this.props.history.push('/login')
    };

    handleRecentlySearchedClicked = (event, value) => {
        event.preventDefault();
        this.props.searchRequest(value)
            .then(data => {
                console.log(data);
                this.getRecentlySearched();
                this.setState({results: data, search: value, showRecentlySearch: false}, () => {
                    this.inputRef.current.blur();
                })
            })
            .catch(error => {

            })
    };

    render() {
        const {results, search, recentlySearched, showRecentlySearch} = this.state;
        return (
            <>
                <div className='container'>
                    <div className="row mt-2 justify-content-end">
                        <Button variant={"outlined"} onClick={this.handleLogOut}>
                            Iesire
                        </Button>
                    </div>
                    <div className="mt-3 row justify-content-center">
                        <form onSubmit={this.handleSubmit} className={'w-100 autocomplete'}>
                            <TextField
                                onFocus={() => this.setState({showRecentlySearch: true})}
                                fullWidth
                                variant={"outlined"}
                                type={'text'}
                                value={search}
                                onChange={this.handleChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={this.handleSubmit}>
                                                <Search/>
                                            </IconButton>
                                        </InputAdornment>),
                                }}
                                placeholder='Cautati aici...'
                                inputRef={this.inputRef}
                            />
                            {recentlySearched && recentlySearched.length && showRecentlySearch
                                ?
                                <div className='autocomplete-items'>
                                    {recentlySearched.map((item, index) => (
                                        <div key={index}
                                             onClick={(event) => this.handleRecentlySearchedClicked(event, item)}>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                : null}
                        </form>

                    </div>
                    <div className={'mt-3'}>
                        {results && results.length
                            ? results.map((item, index) => (
                                <WebPageItem key={index}{...item}/>
                            ))
                            : null}
                    </div>

                </div>
                {showRecentlySearch &&
                <div style={{zIndex: 2, position: 'absolute', width: '100vw', height: '100vh', top: 0, left: 0}}
                     onClick={() => this.setState({showRecentlySearch: false})}/>
                }
            </>
        )
    }
}

/**
 * define the dispatch actions
 * @param dispatch the actions to be dispatched
 */
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        logOut: () => dispatch(logOut()),
        searchRequest: (value: string) => dispatch((searchAPI.search(value) as any)),
        searchHistoryRequest: () => dispatch(searchAPI.searchHistory() as any)
    }
};
export default withRouter(connect(null, mapDispatchToProps)(Home));
