import React, { Component } from 'react';
import Debug from '../components/Debug';
import { ContainerFluid, Row, Column } from '../components/Bootstrap';

class UserProfile extends Component {
  
  render() {
    return (
      <div className="Landing pt-3">
        <ContainerFluid>
          <Row>
            <Column col="12" colLg="4">
              <Debug title="User Profile Props" {...this.props} />
            </Column>
          </Row>
        </ContainerFluid>
      </div>
    );
  }

}

export default UserProfile;
