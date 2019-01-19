import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/es/Button/Button";
import Paper from "@material-ui/core/es/Paper/Paper";
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import * as React from 'react';
import './AuthStyles.css';
import ReeValidate from "ree-validate";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {Dispatch} from "redux";
import {authApi} from "../../rest-api/Auth";
import {connect} from "react-redux";
import {User} from "../../models/User.model";
import {authSuccess} from "../../store/actions/auth";

interface LoginForm {
    username: string;
    password: string
}

interface Props extends RouteComponentProps {
    login: (form: LoginForm) => Promise<any>;
    authSuccess: (user: User) => void;
}

class Login extends React.Component<Props> {
    /**
     * initialize validator
     */
    validator = new ReeValidate({
        username: 'required|min:3|alpha_num',
        password: 'required|min:6',
    });

    state = {
        form: {
            username: '',
            password: ''
        },
        errors: this.validator.errors,
    };
    /**
     * Handles field Changes
     * @param event
     */
    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const {errors} = this.validator;
        const {form} = this.state;
        form[name] = value;
        this.validator.validate(name, value).then(() => {
            this.setState({errors, form});
        });
    };
    /**
     * Validate the form before submit
     * @param event
     */
    handleSubmit = (event) => {
        event.preventDefault();
        const {form, errors} = this.state;
        this.validator.validateAll(form).then((success) => {
            if (success) {
                this.submit(form);
            } else {
                this.setState({errors});
            }
        });
    };
    /**
     * Submit the form
     * @param form
     */
    submit = (form) => {
        this.props.login(form)
            .then(data => {
                this.props.authSuccess(data);
                this.props.history.push('/')
            })
            .catch(error => {

            })
    };

    render() {
        const {form, errors} = this.state;
        return (
            <div className='main-container'>
                <Paper className='m-auto form-container p-3 text-center'>
                    <h2>Bing Search</h2>
                    <h4 style={{marginBottom: 50}}>Login</h4>
                    <form onSubmit={this.handleSubmit} className={'w-100'}>
                        <FormControl fullWidth className='mb-4' error={errors.has('username')}>
                            <TextField
                                variant={"outlined"}
                                name='username'
                                label="Username"
                                placeholder={'Enter Your Username'}
                                type="text"
                                value={form.username}
                                onChange={this.handleChange}
                                error={errors.has('username')}
                                InputLabelProps={{
                                    shrink: true,
                                    required: true
                                }}
                            />
                            {errors.has('username') &&
                            <FormHelperText>{errors.first('username')}</FormHelperText>
                            }
                        </FormControl>
                        <FormControl fullWidth className='mb-4' error={errors.has('password')}>
                            <TextField
                                variant={"outlined"}
                                name='password'
                                label="Password"
                                type="password"
                                placeholder={"Enter Your Password"}
                                value={form.password}
                                onChange={this.handleChange}
                                error={errors.has('password')}
                                InputLabelProps={{
                                    shrink: true,
                                    required: true
                                }}
                            />
                            {errors.has('password') &&
                            <FormHelperText>{errors.first('password')}</FormHelperText>
                            }
                        </FormControl>
                        <div className='w-100 text-right'>
                            <Link to='/register' className="mr-2">Don't have an account?</Link>
                        </div>
                        <Button variant={"outlined"} type={'submit'} color={"primary"} className={'mx-auto mt-3'}>
                            Login
                        </Button>
                    </form>
                </Paper>
            </div>
        );
    }
}

/**
 * define the dispatch actions
 * @param dispatch the actions to be dispatched
 */
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        login: (form: LoginForm) => dispatch(authApi.login(form) as any),
        authSuccess: (user: User) => dispatch(authSuccess(user))
    }
};
export default withRouter(connect(null, mapDispatchToProps)(Login));
