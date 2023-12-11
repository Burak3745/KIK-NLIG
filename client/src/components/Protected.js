import useGlobalState from '../services/useGlobalState';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';


export default function Protected({ children, ...rest }) {
   const { StateContext } = useGlobalState();
   const { state } = useContext(StateContext);

   return state.user ? children  : <Navigate to="/login"/>;
}