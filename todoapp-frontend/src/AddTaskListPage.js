import React, { Component } from 'react';
import {MuiThemeProvider, RaisedButton, TextField} from "material-ui";

export const style = {
    margin: 15,
    marginLeft: 80
};

class AddTaskListPage extends Component{
    constructor(props) {
        super(props);

        this.state = {
            taskList: {
                name: '',
                goal: '',
            }
        }
    }

    render() {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <MuiThemeProvider>
                    <div>
                        <h1 style={{marginLeft: 20}}>Add Task List</h1>
                        <TextField
                            hintText="Enter Name"
                            floatingLabelText="Name"
                            onChange={(event, newValue) => this.setState({name: newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter Goal"
                            floatingLabelText="Goal"
                            onChange={(event, newValue) => this.setState({goal: newValue})}
                        />
                        <br/>
                        <RaisedButton label="Add" primary={true} style={style}
                                      onClick={(event) => this.onSubmitButtonClick(event)}/>
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

export default AddTaskListPage