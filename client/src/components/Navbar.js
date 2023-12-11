import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav>
      <button name="link" onClick={navigate("/")}>Home</button>
    </nav>
  );
}