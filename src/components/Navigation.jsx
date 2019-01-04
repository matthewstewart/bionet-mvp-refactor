/*************************************************/
/* Navigation.jsx - Bootstrap 4 Navbar Component */
/*-----------------------------------------------*/
/* Used as a top navigation bar.                 */
/*************************************************/

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import shortid from 'shortid';
import { Navbar, NavbarBrand, NavbarToggle, NavbarNav, NavbarDropdown, NavbarDropdownLink, NavbarLink, Button } from './Bootstrap';
import logo from '../images/bionet-logo.png';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

class Navigation extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.onLabLinkClick = this.onLabLinkClick.bind(this);
  }

  onLabLinkClick(e) {
    e.preventDefault();
    let labs = this.props.labs;
    let labIndex = e.target.getAttribute('index');
    let lab = labs[Number(labIndex)];
    this.props.setSelectedRecord(lab);
  }

  render() {
    const appReady = this.props.appReady === true;
    const isLoggedIn = this.props.isLoggedIn;
    //const selectRecordExists = this.props.selectedRecord && Object.keys(this.props.selectedRecord).length > 0;
    const currentUser = this.props.currentUser;
    const userDropdownLabel = isLoggedIn && appReady ? currentUser.username : "Loading...";

    const labLinks = this.props.labs.map((lab, labIndex) => {
      return (
        <Button 
          key={shortid.generate()}
          className="dropdown-item" 
          onClick={this.onLabLinkClick} 
          index={labIndex}
        >
          <i className={`mdi text-lg mdi-teach mr-1`} index={labIndex}/>{lab.name}
        </Button>
      );
    });

    return (
      <Navbar dark className="Navigation">
        <NavbarBrand imgSrc={logo} imgAlt="BioNet Logo" width="40"/>
        <NavbarToggle target="navbarNav" />
        <NavbarNav right id="navbarNav">
    
          {appReady ? (
            <>

              {isLoggedIn && (
                <NavbarDropdown 
                  id="user-dropdown" 
                  label={userDropdownLabel}
                  className="text-light"
                  icon="account-circle"
                >
                  <button 
                    className="dropdown-item"
                    onClick={ this.props.logout }
                  >
                    <i className="mdi text-lg mdi-logout-variant mr-2"/>Logout
                  </button> 
                </NavbarDropdown>
              )} 

              <NavbarDropdown 
                id="labs-dropdown" 
                label="Labs"
                className="text-light"
                icon="teach"
              > 
                {labLinks}
                { isLoggedIn && (
                  <NavbarDropdownLink to="/labs/new">
                    <i className="mdi text-lg mdi-plus mr-1" />New Lab
                  </NavbarDropdownLink>
                )}
              </NavbarDropdown>  

              { !isLoggedIn && (
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

              {/* {isLoggedIn && selectRecordExists ? (
                <NavbarDropdown 
                  id="record-dropdown" 
                  label={this.props.selectedRecord.name}
                  className="text-light"
                  icon={this.props.selectedRecord.icon}
                >
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
              ) : null } */}

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

              {currentUser.isAdmin && (
                <NavbarDropdown 
                  id="admin-dropdown" 
                  label="Admin"
                  className="text-light"
                  icon="account-supervisor-circle"
                >
                  <NavbarDropdownLink to="/sandbox">
                    <i className="mdi text-lg mdi-information mr-1" />Sandbox
                  </NavbarDropdownLink>
              
                  <div 
                    className="dropdown-item" 
                    onClick={this.props.toggleDebuggingMode}
                  >
                    <i className="mdi text-lg mdi-bug mr-1" />
                    {this.props.debuggingMode ? "Turn Off" : "Turn On"}
                  </div>
                </NavbarDropdown>             
              )}

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
