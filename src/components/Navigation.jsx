/*************************************************/
/* Navigation.jsx - Bootstrap 4 Navbar Component */
/*-----------------------------------------------*/
/* Used as a top navigation bar.                 */
/*************************************************/

// core react components
import React, { Component } from 'react';
// withRouter - enables the router props to pass into a component not inside the <main> => <Route> tree, wrapped on export
import { withRouter } from 'react-router-dom';
// bootstrap components
import { Navbar, NavbarBrand, NavbarToggle, NavbarNav, NavbarDropdown, NavbarDropdownLink } from './Bootstrap';
// logo for navbar brand
import logo from '../images/bionet-logo.png';

class Navigation extends Component {

  render() {
    // is the app / entire component tree finished loading
    const appReady = this.props.isReady;
    
    // is there a user currently logged in
    const isLoggedIn = this.props.isLoggedIn;
    
    // commented debug toggle - test logged out state
    // const isLoggedIn = false;
    
    // the current user record returned from App.componentDidMount.getData
    const currentUser = this.props.currentUser;
    
    // the label for the user dropdown link
      // if logged in
        // if app is ready
          // set label to currentUser.username
        // if app is not ready
          // set label to 'Loading...'
      // if not logged in
        // set label to 'Login Register'
    const userDropdownLabel = isLoggedIn ? appReady ? currentUser.username : "Loading..." : "Login/Register";
    
    // the dropdown links/content for the user dropdown link
      // if logged in
        // show profile link
      // if not logged in
        // show Login & Signup Links - **TODO** Replace with login/signup form and auth logic
    const userDropdownLinks = isLoggedIn ? (
      <NavbarDropdownLink to={`/users/${currentUser._id}`}>
        <i className="mdi text-lg mdi-information mr-1" />Profile
      </NavbarDropdownLink>    
    ) : (
      <>
        <NavbarDropdownLink to="/login">
          <i className="mdi text-lg mdi-information mr-1" />Login
        </NavbarDropdownLink>
        <NavbarDropdownLink to="/signup">
          <i className="mdi text-lg mdi-information mr-1" />Sign Up
        </NavbarDropdownLink>
      </>  
    );

    return (
      <Navbar dark className="Navigation">
        <NavbarBrand imgSrc={logo} imgAlt="BioNet Logo" width="40"/>
        <NavbarToggle target="navbarNav" />
        <NavbarNav right id="navbarNav">
    
          <NavbarDropdown 
            id="user-dropdown" 
            label={userDropdownLabel}
            className="text-light"
            icon="account-circle"
          >
            {userDropdownLinks}
          </NavbarDropdown>
       
          <NavbarDropdown 
            id="info-dropdown" 
            label="Info"
            className="text-light"
            icon="information"
          >
            <NavbarDropdownLink to="/about">
              <i className="mdi text-lg mdi-information mr-1" />About
            </NavbarDropdownLink>

          </NavbarDropdown>
        </NavbarNav>
      </Navbar>
    );
  }

}

// wrapped with withRouter to pass in router props
export default withRouter(Navigation);
