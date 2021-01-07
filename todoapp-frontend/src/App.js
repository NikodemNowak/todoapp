import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AppBar} from "material-ui";
import Login from './LoginPage'
import Register from './RegisterPage'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {Home, UserMenu} from './DropdownMenu'
import HomePage from "./HomePage";

export const style = {
    margin: 15
};

const appbar = {
    alignItems: 'center'
};

function App() {
    return (
        <Router>
            <nav>
                <div>
                    <MuiThemeProvider>
                        <AppBar showMenuIconButton={false} style={appbar}>
                            <Home/>
                            <UserMenu/>
                        </AppBar>
                    </MuiThemeProvider>
                </div>
            </nav>

            <Switch>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/register">
                    <Register/>
                </Route>
                <Route path="/">
                    <HomePage/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App

