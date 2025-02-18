export default function Navbar() {
  return (
    <navbar>
        <img src="src/assets/logo.png" alt="logo" />
        <ul>
            <li href="src/pages/Home.jsx">Home</li>
            <li>Producs</li>
            <li>Categories</li>
            <li>About us</li>
            <li>Contact us</li>
            <input type="text" placeholder="Search" />
        </ul>
    </navbar>
  );
}