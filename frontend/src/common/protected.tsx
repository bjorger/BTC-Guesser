import { Navigate } from "react-router-dom";

interface ProtectedProps {
    isLoggedIn: boolean;
    children: React.ReactElement;
}

const Protected: React.FC<ProtectedProps> = ({ isLoggedIn, children }) => {
    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default Protected;
