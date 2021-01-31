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
import ProtectedRoute, {PublicRoute} from "./Authentiacion";

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
                <PublicRoute path="/login" component={Login}/>
                <PublicRoute path="/register" component={Register}/>
                <ProtectedRoute path="/panel" component={UserPanel}/>
                <ProtectedRoute path="/addTaskList" component={AddTaskListPage}/>
                <ProtectedRoute path="/taskLists/:id" component={TaskListPage}/>
                <ProtectedRoute path="/taskLists" component={AllTaskListsTablePage}/>
                <ProtectedRoute path="/" component={HomePage}/>
            </Switch>
        </Router>
    );
}

export default App

