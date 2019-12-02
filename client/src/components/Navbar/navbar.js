import React,{Fragment} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar , Nav , NavDropdown} from 'react-bootstrap';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const navbar = ({auth:{isAuthenticated,loading},logout}) => {
  const authLink = (
    <Nav>
    <Nav.Link onClick={logout} href="#">Logout</Nav.Link>
  </Nav>
  );
  const geustLinks =(
    <Nav>
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/regisration">
        Rgistration
      </Nav.Link>
    </Nav>
  );
    return (
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="#home">Apna delivery</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
    </Nav>

    {!loading && (<Fragment>{isAuthenticated ? authLink : geustLinks}</Fragment>)}

  </Navbar.Collapse>
</Navbar>
    )
};
navbar.prototype = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
  auth: state.auth
});
export default connect(mapStateToProps,{ logout })(navbar)
