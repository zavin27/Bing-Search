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
import {connect} from "react-redux";
import {authAPI} from "../../rest-api/Auth";
import {User} from "../../models/User.model";
import {authSuccess} from "../../store/actions/auth";
import ro from "ree-validate/dist/locale/ro";

interface RegisterForm {
    username: string;
    password: string;
    confirmPassword: string
}

interface Props extends RouteComponentProps {
    register: (form: RegisterForm) => Promise<any>;
    authSuccess: (user: User) => void;
}

class Register extends React.Component<Props> {
    dictionary = {
        ro: {
            ...ro,
            attributes: {
                username: 'Nume Utilizator',
                password: 'Parola',
            }
        }
    };
    /**
     * initialize validator
     */
    validator = new ReeValidate({
        username: 'required|min:3|alpha_num',
        password: 'required|min:6',
        confirmPassword: ''
    });

    state = {
        form: {
            username: '',
            password: '',
            confirmPassword: ''
        },
        errors: this.validator.errors,
        confirmError: null
    };

    componentDidMount(): void {
        this.validator.localize('ro', this.dictionary.ro);
    }
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
        if (name === 'password' || name === 'confirmPassword') {
            this.validatePasswordConfirmation(form['confirmPassword']);
            if (name === 'confirmPassword') return
        }
        this.validator.validate(name, value).then(() => {
            this.setState({errors, form});
        });
    };
    /**
     * handles password confirmation validation
     * @param value
     */
    validatePasswordConfirmation = (value) => {
        const {form} = this.state;

        if (this.state.form.password !== value) {
            this.setState({confirmError: 'Câmpurile de parole nu se potrivesc.', form})
        } else {
            this.setState({confirmError: null, form})
        }
    };

    /**
     * Validate the form before submit
     * @param event
     */
    handleSubmit = (event) => {
        event.preventDefault();
        const {form, errors} = this.state;
        this.validator.validateAll(form)
            .then((success) => {
                if (success && !this.state.confirmError && this.state.form.confirmPassword === this.state.form.password) {
                    this.setState({buttonIsLoading: true});
                    this.submit(form);
                } else {
                    let errMsg = '';
                    if (this.state.confirmError && this.state.confirmError.length) {
                        errMsg = 'Câmpurile de parole nu se potrivesc.';
                    } else if (this.state.form.confirmPassword === '') {
                        errMsg = 'Câmpul Confirmare Parolă este necesar.';
                    }
                    this.setState({errors, confirmError: errMsg})
                }
            });
    };
    /**
     * Submit the form
     * @param form
     */
    submit = (form) => {
        this.props.register(form)
            .then(data => {
                this.props.authSuccess(data);
                this.props.history.push('/')
            })
            .catch(error => {

            })
    };

    render() {
        const {form, errors, confirmError} = this.state;
        return (
            <div className='main-container'>
                <Paper className='m-auto form-container p-3 text-center'>
                    <h2>Bing Search</h2>
                    <h4 style={{marginBottom: 50}}>Inregistrare</h4>
                    <form onSubmit={this.handleSubmit} className={'w-100'}>
                        <FormControl fullWidth className='mb-4' error={errors.has('username')}>
                            <TextField
                                variant={"outlined"}
                                name='username'
                                label="Nume Utilizator"
                                type="text"
                                value={form.username}
                                onChange={this.handleChange}
                                error={errors.has('username')}
                                InputLabelProps={{
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
                                label="Parola"
                                type="password"
                                value={form.password}
                                onChange={this.handleChange}
                                error={errors.has('password')}
                                InputLabelProps={{
                                    required: true
                                }}
                            />
                            {errors.has('password') &&
                            <FormHelperText>{errors.first('password')}</FormHelperText>
                            }
                        </FormControl>
                        <FormControl fullWidth className='mb-4' error={!!confirmError}>
                            <TextField
                                variant={"outlined"}
                                name='confirmPassword'
                                label="Confirmare Parola"
                                type="password"
                                value={form.confirmPassword}
                                onChange={this.handleChange}
                                error={!!confirmError}
                                InputLabelProps={{
                                    required: true
                                }}
                            />
                            {confirmError &&
                            <FormHelperText>{confirmError}</FormHelperText>
                            }
                        </FormControl>
                        <div className='w-100 text-right'>
                            <Link to='/login' className="mr-2">Aveti deja un cont?</Link>
                        </div>
                        <Button variant={"outlined"} type={'submit'} color={"primary"} className={'mx-auto mt-3'}>
                            Inregistrare
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
        register: (form: RegisterForm) => dispatch(authAPI.register(form) as any),
        authSuccess: (user: User) => dispatch(authSuccess(user))
    }
};
export default withRouter(connect(null, mapDispatchToProps)(Register));
