import { Navigate } from 'react-router-dom';
import Logo from '../image/King.png';

const Profile = ({ user, setUser }) => {
  const doLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    return <Navigate to="/login" />;
  }


  return (
    <div className="profile">
      <img id="logo" src={Logo} alt="Welcome to FDP" height="100" />
      {user ? (
        <>
          <button className="logout-btn" onClick={doLogout}>
            Logout
          </button>
          {user.email}
        </>
      ) : null}

    </div>
  );
}

export default Profile;