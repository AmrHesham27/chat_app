import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/userSlice";

function ColorSchemesExample() {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(userActions.logoutUser());
  };

  return (
    <Navbar bg="light" variant="light" className={styles.header}>
      <Container>
        <Nav className="me-auto">
          <NavLink to="/" className={styles.link}>
            Dashboard
          </NavLink>
        </Nav>
        <button className={styles.button} onClick={logout}>
          Logout
        </button>
      </Container>
    </Navbar>
  );
}

export default ColorSchemesExample;
