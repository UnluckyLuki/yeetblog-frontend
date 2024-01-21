import './App.css';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {useLocalStorage} from "./Logic/LocalStorage/HandleLocalStorage";
import NavBar from "./Components/Navigation/NavBar";
import {Route, Routes} from "react-router-dom";
import PostsPage from "./Pages/PostsPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import ProfilePageWrapper from "./Pages/ProfilePage";
import PostPageWrapper from "./Pages/PostPage";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    const [token, setToken] = useLocalStorage("token", null)
    const [user, setUser] = useLocalStorage("user", {name: null, id:null})

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <NavBar setToken={setToken} user={user} setUser={setUser}/>
            <Routes>
                <Route index element={<PostsPage token={token} user={user}/>}/>
                <Route path="posts"
                       element={<PostsPage token={token} user={user}/>}/>
                <Route path="login"
                       element={<LoginPage token={token} setToken={setToken} user={user} setUser={setUser}/>}/>
                <Route path="register"
                       element={<RegisterPage token={token} setToken={setToken} user={user} setUser={setUser}/>}/>
                <Route path="post/:postId"
                       element={<PostPageWrapper token={token} user={user}/>}/>
                <Route path="profile/:userName"
                       element={
                           <ProfilePageWrapper token={token} setToken={setToken}
                                               user={user} setUser={setUser}
                           />
                       }
                />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
