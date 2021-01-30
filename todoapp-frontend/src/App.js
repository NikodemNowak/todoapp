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
import {ChangeTheme, Home, TaskListMenu, UserMenu, Welcome} from './DropdownMenu'
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
                            <Welcome/>
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
                    {localStorage.length === 0 ? <Login/> : <div/>}
                </Route>
                <Route path="/register">
                    {localStorage.length === 0 ? <Register/> : <div/>}
                </Route>
                <Route path="/panel">
                    {localStorage.length > 0 ? <UserPanel/> : <div/>}
                </Route>
                <Route path="/addTaskList">
                    {localStorage.length > 0 ? <AddTaskListPage/> : <div/>}
                </Route>
                <Route path="/taskLists/:id" children={<TaskListPage/>}/>
                <Route path="/taskLists">
                    {localStorage.length > 0 ? <AllTaskListsTablePage/> : <div/>}
                </Route>
                <Route path="/">
                    {localStorage.length > 0 ? <HomePage/> : <div/>}
                </Route>
            </Switch>
        </Router>
    );
}

export default App

