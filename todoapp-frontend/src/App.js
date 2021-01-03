import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export const style = {
    margin: 15
};

const appbar = {
    alignItems: 'center'
};

function App() {
    return (
        <div>
            <MuiThemeProvider>
                Hello
            </MuiThemeProvider>
        </div>
    );
}

export default App

