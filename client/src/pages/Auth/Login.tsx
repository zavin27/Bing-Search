import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/es/Button/Button";
import Paper from "@material-ui/core/es/Paper/Paper";
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import * as React from 'react';
import './Login.css';
import ReeValidate from "ree-validate";

// import axios from 'axios';


class Login extends React.Component {
    /**
     * initialize validator
     */
    validator = new ReeValidate({
        username: 'required',
        password: 'required',
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
     * Submit the form to the db
     * @param form
     */
    submit = (form) => {
        // axios.post('/login', form).then(response => {
        //   console.log(response);
        //   localStorage.setItem('token', response.data.access_token);
        // }).catch(error => {
        //   console.log(error);
        // });
    };

    render() {
        const {form, errors} = this.state;
        return (
            <div className='login-container'>
                <Paper className='m-auto login-form-container p-3 text-center'>
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
                        <Button variant={"outlined"} type={'submit'} color={"primary"} className={'mx-auto mt-3'}>
                            Login
                        </Button>
                    </form>
                </Paper>
            </div>
        );
    }
}

export default Login;
