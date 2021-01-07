import React, { Component } from 'react';
import {MuiThemeProvider, RaisedButton, TextField} from "material-ui";

const style = {
    margin: 15,
    marginLeft: 80
};

const open = (url) => {
    const newWindow = window.open(url, "_self")
    if (newWindow) newWindow.opener = null
}

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            repeatPassword: '',
            email: ''
        }
    }

    render() {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <MuiThemeProvider>
                    <div>
                        <h1 style={{marginLeft: 55}}>Register</h1>
                        <TextField
                            hintText="Enter your First Name"
                            floatingLabelText="First Name"
                            onChange={(event, newValue) => this.setState({firstName: newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Last Name"
                            floatingLabelText="Last Name"
                            onChange={(event, newValue) => this.setState({lastName: newValue})}
                        />
                        <br/>
                        <TextField
                            type="username"
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            onChange={(event, newValue) => this.setState({username: newValue})}
                        />
                        <br/>
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({password: newValue})}
                        />
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
                                      onClick={() => open('http://localhost:3000/loginClient')}/>
                        <br/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }

    onRegisterButtonClick(event) {
        console.log(this.state)
    }

}

export default Register