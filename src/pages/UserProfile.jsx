import React, { Component } from 'react';
import MessageCard from '../components/MessageCard';
import Debug from '../components/Debug';
import { ContainerFluid, Row, Column } from '../components/Bootstrap';

class UserProfile extends Component {
  
  render() {
    const debuggingMode = this.props.debuggingMode && this.props.debuggingMode === true;
    return (
      <div className="Landing pt-3">
        <ContainerFluid>
          <Row>
            <Column col="12" colLg="4">
              <MessageCard title="User Profile" iconClass="account">
                This is the user profile page found at ./src/pages/UserProfile.jsx
              </MessageCard>
            </Column>
          </Row>
        </ContainerFluid>

        {(debuggingMode) ? (
          <Debug 
            componentName="About"
            componentProps={this.props}
            componentState={this.state}
          />
        ) : null }
        
      </div>
    );
  }

}

export default UserProfile;
