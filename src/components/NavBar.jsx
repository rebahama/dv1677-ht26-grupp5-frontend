import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom'
import styles from '../styles/NavBar.module.css'
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className={styles.navLink}>Homepage</Navbar.Brand>
        <Navbar.Brand as={Link} to="/showall" className={styles.navLink}>Display API</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">testing</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;