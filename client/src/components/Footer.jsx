export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-element">
          <h4>Contact Us</h4>
          <ul>
            <li>📍 123 E-commerce St, Shop City, EC 12345</li>
            <li>📧 <a href="mailto:contact@ecommerce.com">contact@ecommerce.com</a></li>
          </ul>
        </div>

        <div className="footer-element">
          <h4>Follow Us</h4>
          <ul>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img src="https://img.freepik.com/vecteurs-libre/nouvelle-conception-icone-x-du-logo-twitter-2023_1017-45418.jpg?semt=ais_hybrid&w=740&q=80" alt="Twitter logo" />
                Twitter
              </a>
            </li>
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiXN9xSEe8unzPBEQOeAKXd9Q55efGHGB9BA&s" alt="Facebook logo" />
                Facebook
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="https://commons.wikimedia.org/wiki/File:Instagram_logo_2022.svg" alt="Instagram logo" />
                Instagram
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <img src="https://commons.wikimedia.org/wiki/File:LinkedIn_logo.svg" alt="LinkedIn logo" />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="terms">
        <p>© 2023 E-commerce. All rights reserved.</p>
        <p><a href="/terms">Terms of Service</a> | <a href="/privacy">Privacy Policy</a></p>
      </div>
    </footer>
  );
}
