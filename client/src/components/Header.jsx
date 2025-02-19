import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav>
        <img src="src/assets/Images/LOGO-BLANC.png" alt="logo" />
        <ul>
            <li>Home</li>
            <li>Producs</li>
            <li>Categories</li>
            <li>About us</li>
            <li>Contact us</li>   
        </ul>
        <input type="text" placeholder="Search" />
    </nav>
  );
}