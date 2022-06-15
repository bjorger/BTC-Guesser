import { useAppSelector } from "app/hooks";
import { Home } from "home";
import { Login } from "login";

const App: React.FC = () => {
    const user = useAppSelector((state) => state.user);

    return user.isLoggedIn ? <Home></Home> : <Login />;
};

export default App;
