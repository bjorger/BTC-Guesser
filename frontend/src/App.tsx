import { useAppSelector } from "app/hooks";
import { Protected } from "common";
import { Home } from "home";
import { Login } from "login";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

const App: React.FC = () => {
    const user = useAppSelector((state) => state.user);

    return (
        <Router>
            <Routes>
                <Route index element={<Login />} />
                <Route
                    path="/home"
                    element={
                        <Protected isLoggedIn={user.isLoggedIn}>
                            <Home />
                        </Protected>
                    }
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
