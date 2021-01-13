import React, {Component, useState} from 'react';
import {MuiThemeProvider, RaisedButton, TextField} from "material-ui";
import {addUser} from "./ApiRepository";
import {FormControl} from "@material-ui/core";
import {useForm, Controller} from 'react-hook-form';

const style = {
    margin: 15,
    marginLeft: 80
};

const open = (url) => {
    const newWindow = window.open(url, "_self")
    if (newWindow) newWindow.opener = null
}

const Register = (props) => {
    const {control, errors: fieldsErrors} = useForm();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        repeatPassword: '',
        email: ''
    })

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <MuiThemeProvider>
                <div>
                    <h1 style={{marginLeft: 55}}>Register</h1>
                    <form>
                        <FormControl>
                            <Controller
                                name="firstName"
                                control={control}
                                as={
                                    <TextField
                                        hintText="Enter your First Name"
                                        floatingLabelText="First Name"
                                        onChange={(event, newValue) => this.setState({firstName: newValue})}
                                        error={fieldsErrors.firstName}
                                    />
                                }
                                rules={{
                                    required: 'Required',
                                }}
                            />
                        </FormControl>
                        <br/>
                        <FormControl>
                            <Controller
                                name="lastName"
                                control={control}
                                as={
                                    <TextField
                                        hintText="Enter your Last Name"
                                        floatingLabelText="Last Name"
                                        onChange={(event, newValue) => this.setState({lastName: newValue})}
                                        error={fieldsErrors.lastName}
                                    />
                                }
                                rules={{
                                    required: 'Required',
                                }}
                            />
                        </FormControl>
                        <br/>
                        <FormControl>
                            <Controller
                                name="username"
                                control={control}
                                as={
                                    <TextField
                                        type="username"
                                        hintText="Enter your Username"
                                        floatingLabelText="Username"
                                        onChange={(event, newValue) => this.setState({username: newValue})}
                                        error={fieldsErrors.username}
                                    />
                                }
                                rules={{
                                    required: 'Required',
                                }}
                            />
                        </FormControl>
                        <br/>
                        <FormControl>
                            <Controller
                                name="password"
                                control={control}
                                as={
                                    <TextField
                                        type="password"
                                        hintText="Enter your Password"
                                        floatingLabelText="Password"
                                        onChange={(event, newValue) => this.setState({password: newValue})}
                                        error={fieldsErrors.password}
                                    />
                                }
                                rules={{
                                    required: 'Required',
                                    
                                }}
                            />
                        </FormControl>
                        <br/>
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Confirm Password"
                            onChange={(event, newValue) => this.setState({repeatPassword: newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Email"
                            floatingLabelText="Email"
                            onChange={(event, newValue) => this.setState({email: newValue})}
                        />
                        <br/>
                        <RaisedButton label="Register" primary={true} style={style}
                                      onClick={(event) => this.onRegisterButtonClick(event)}/>
                        <br/>
                        <h3 style={{marginLeft: 10}}>Already registered? Log in</h3>
                        <RaisedButton label="Log in" primary={true} style={style}
                                      onClick={() => open('http://localhost:3000/login')}/>
                        <br/>
                    </form>
                </div>
            </MuiThemeProvider>
        </div>
    );


    function onRegisterButtonClick(event) {
        addUser(this.state)
    }

}

export default Register