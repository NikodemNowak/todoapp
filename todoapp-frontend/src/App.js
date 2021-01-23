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
import {ChangeTheme, Home, TaskListMenu, UserMenu} from './DropdownMenu'
import HomePage from "./HomePage";
import AddTaskListPage from "./AddTaskListPage";
import AllTaskListsTablePage from "./AllTaskListsTablePage";
import TaskListPage from "./TaskListPage";
import UserPanel from "./UserPanelPage";

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
                            <ChangeTheme/>
                            <Home/>
                            <UserMenu/>
                            <TaskListMenu/>
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
                <Route path="/panel">
                    <UserPanel/>
                </Route>
                <Route path="/addTaskList">
                    <AddTaskListPage/>
                </Route>
                <Route path="/taskLists/:id" children={<TaskListPage />} />
                <Route path="/taskLists">
                    <AllTaskListsTablePage/>
                </Route>
                <Route path="/">
                    <HomePage/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App

