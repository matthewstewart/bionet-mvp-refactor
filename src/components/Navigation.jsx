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
import { Navbar, NavbarBrand, NavbarToggle, NavbarNav, NavbarDropdown, NavbarDropdownLink, NavbarLink } from './Bootstrap';
// logo for navbar brand
import logo from '../images/bionet-logo.png';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

class Navigation extends Component {

  render() {
    const appReady = this.props.appReady === true;
    const isLoggedIn = this.props.isLoggedIn;
    const selectRecordExists = this.props.selectedRecord && Object.keys(this.props.selectedRecord).length > 0;
    const currentUser = this.props.currentUser;
    const userDropdownLabel = isLoggedIn && appReady ? currentUser.username : "Loading...";
    
    const userDropdownLinks = (
      <>
        {/* <NavbarDropdownLink to={`/users/${currentUser._id}`}>
          <i className="mdi text-lg mdi-information mr-2" />Profile
        </NavbarDropdownLink> */}
        <button 
          className="dropdown-item"
          onClick={ this.props.logout }
        >
          <i className="mdi text-lg mdi-logout-variant mr-2"/>Logout
        </button> 
      </>
    );

    return (
      <Navbar dark className="Navigation">
        <NavbarBrand imgSrc={logo} imgAlt="BioNet Logo" width="40"/>
        <NavbarToggle target="navbarNav" />
        <NavbarNav right id="navbarNav">
    
          {appReady ? (
            <>
              {isLoggedIn ? (
                <NavbarDropdown 
                  id="user-dropdown" 
                  label={userDropdownLabel}
                  className="text-light"
                  icon="account-circle"
                >
                  {userDropdownLinks}
                </NavbarDropdown>
              ) : (
                <>
                  <NavbarDropdown 
                    id="signup-dropdown" 
                    label="Sign Up"
                    className="text-light"
                    icon="clipboard-account"
                  >
                    <div className="dropdown-item">
                      <SignupForm {...this.props} />
                    </div>          
                  </NavbarDropdown>
                  <NavbarDropdown 
                    id="login-dropdown" 
                    label="Login"
                    className="text-light"
                    icon="login-variant"
                  >
                    <div className="dropdown-item">
                      <LoginForm {...this.props} />
                    </div>            
                  </NavbarDropdown>                  
                </>
              )}


              {selectRecordExists ? (
                <NavbarDropdown 
                  id="record-dropdown" 
                  label={this.props.selectedRecord.name}
                  className="text-light"
                  icon={this.props.selectedRecord.icon}
                >
                  {/* ToDo: Set Modes For Model With Button Click Event  */}
                  <button 
                    className="dropdown-item"
                    onClick={() => { alert('This should change the data panel to \'Profile\' mode.') }}
                  >
                    <i className="mdi mdi-eye mr-2"/>View
                  </button>
                  <button 
                    className="dropdown-item"
                    onClick={() => { alert('This should change the data panel to \'Edit\' mode.') }}
                  >
                    <i className="mdi mdi-pencil mr-2"/>Edit
                  </button>
                </NavbarDropdown>                
              ) : null }

              <NavbarDropdown 
                id="info-dropdown" 
                label="Info"
                className="text-light"
                icon="information"
              >
                <NavbarDropdownLink to="/about">
                  <i className="mdi text-lg mdi-information mr-1" />About
                </NavbarDropdownLink>

                <NavbarDropdownLink to="/sandbox">
                  <i className="mdi text-lg mdi-information mr-1" />Sandbox
                </NavbarDropdownLink>
              
             
                <div 
                  className="dropdown-item" 
                  onClick={this.props.toggleDebuggingMode}
                >
                  <i className="mdi text-lg mdi-bug mr-1" />
                  {this.props.debuggingMode ? "Turn Off Debug Console" : "Turn On Debug Console"}
                </div>
                
              </NavbarDropdown>  

            </>
          ) : (
            <NavbarLink
              to="/"
              id="user-dropdown" 
              label={"Loading..."}
              className="text-light"
              icon="timer-sand"
            >
              <i className="mdi text-lg mdi-timer-sand mr-2"/>Loading Bionet Data...
            </NavbarLink>
          )}

        </NavbarNav>
      </Navbar>
    );
  }

}

// wrapped with withRouter to pass in router props
export default withRouter(Navigation);
