import logo from './logo.svg';
import './App.css';
import ProfilePage from "./Pages/ProfilePage";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <ProfilePage/>
        </ThemeProvider>
    );
}

export default App;
