import { Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import myFlix from "../../img/myFlix.png";

function NavBar({ setUser, setToken }) {
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
            <Nav.Link href="#Profile">Profile</Nav.Link>
            <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
          </Nav>
        </Container>
    </Navbar>
  );
}

export default NavBar;
