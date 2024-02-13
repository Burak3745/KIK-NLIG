import { Navigate } from 'react-router-dom';

const DetectAuth = ( {user, setUser} ) => {
    return localStorage.getItem("user") ? <Navigate to="/"/> : <Navigate to="/login"/>;
}

export default DetectAuth;