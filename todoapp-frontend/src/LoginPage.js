import React, { Component } from 'react';
import {MuiThemeProvider, RaisedButton, TextField} from "material-ui";

export const style = {
    margin: 15,
    marginLeft: 80
};

const open = (url) => {
    const newWindow = window.open(url, "_self")
    if (newWindow) newWindow.opener = null
}

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    render() {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <MuiThemeProvider>
                    <div>
                        <h1 style={{marginLeft: 80}}>Login</h1>
                        <TextField
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            onChange={(event, newValue) => this.setState({username: newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({password: newValue})}
                        />
                        <br/>
                        <RaisedButton label="Submit" primary={true} style={style}
                                      onClick={(event) => this.onSubmitButtonClick(event)}/>
                        <br/>
                        <h3>Not registered yet? Register</h3>
                        <RaisedButton label="Register" primary={true} style={style}
                                      onClick={() => open('http://localhost:3000/registerClient')}/>
                        <br/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
    onSubmitButtonClick(event) {
        console.log(this.state)
    }
}

export default Login