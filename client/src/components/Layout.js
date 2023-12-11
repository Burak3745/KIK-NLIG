import Logo from '../image/King.jpg';
import Navbar from './Navbar';
import Profile from "./Profile"
import { FaRegCopyright } from 'react-icons/fa';

const Layout = ({user, setUser, child} ) => {

  return (
    <>
      <header>
        <img id="logo" src={Logo} alt="Welcome to Flixxit" height="100" />
        <Navbar />
        <Profile user={user} setUser={setUser} />
      </header>
      {child}

      <footer>
        <FaRegCopyright /> KnowledgeHut. All rights reserved.
      </footer>
    </>
  );
}

export default Layout;