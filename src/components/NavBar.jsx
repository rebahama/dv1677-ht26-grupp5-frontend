import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom'
import styles from '../styles/NavBar.module.css'
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar bg="primary" data-bs-theme="dark" expand="lg">
      <Container>
        {user ? (
          <>
            <Navbar.Brand as={Link} to="/" className={styles.navLink}>
              Homepage
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="main-navbar" />
            <Navbar.Collapse id="main-navbar">
              <div className="d-flex align-items-center gap-3 ms-auto">
                <Navbar.Brand
                  as={Link}
                  to="/showall"
                  className={`mb-0 ${styles.navLink}`}
                >
                  Resources
                </Navbar.Brand>
                <Navbar.Brand
                  as={Link}
                  to="/bookings"
                  className={`mb-0 ${styles.navLink}`}
                >
                  My bookings
                </Navbar.Brand>
                <Navbar.Brand
                  as={Link}
                  to="/login"
                  className={`mb-0 ${styles.navLink}`}
                  onClick={handleLogout}
                >
                  Log out
                </Navbar.Brand>
                 <Navbar.Brand
                  as={Link}
                  to="/sync"
                  className={`mb-0 ${styles.navLink}`}
                >
                  Sync and update database
                </Navbar.Brand>
                <span className="navbar-text">
                  Signed in as: {user.email}
                </span>
              </div>
            </Navbar.Collapse>
          </>
        ) : (
          <>
            <Navbar.Brand as={Link} to="/" className={styles.navLink}>
              Homepage
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="main-navbar" />
            <Navbar.Collapse id="main-navbar">
              <div className="d-flex align-items-center gap-3 ms-auto">
                <Navbar.Brand
                  as={Link}
                  to="/showall"
                  className={`mb-0 ${styles.navLink}`}
                >
                  Resources
                </Navbar.Brand>
                <Navbar.Brand
                  as={Link}
                  to="/login"
                  className={`mb-0 ${styles.navLink}`}
                >
                  Login
                </Navbar.Brand>

                <Navbar.Brand
                  as={Link}
                  to="/register"
                  className={`mb-0 ${styles.navLink}`}
                >
                  Register
                </Navbar.Brand>
              </div>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
}

export default NavBar;