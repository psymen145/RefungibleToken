import React from 'react';
import { Link } from 'react-router-dom';
import { MDBNavbar, MDBNavbarBrand } from 'mdbreact';

class Header extends React.Component {
  render() {
    return (
      <MDBNavbar expand="md">
        <MDBNavbarBrand>
          <strong>ReFunTokens</strong>
        </MDBNavbarBrand>
      </MDBNavbar>
    );
  }
}

export default Header;