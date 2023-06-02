import { Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import myFlix from "../../img/myFlix.png";
function NavBar({ user, setUser, setToken }) {
  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };
  return (
    <Navbar>
      <Container>
        <Navbar.Brand className="me-auto">
          <Link
            to="/movies"
            className="fs-1"
            style={{ textDecoration: "none" }}
          >
            <img src={myFlix} alt="myFlix" width={100} />
          </Link>
        </Navbar.Brand>
        <Nav>
          {!user ? (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Signup
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/movies">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
              <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
export default NavBar;
