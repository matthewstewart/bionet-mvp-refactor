import React, { Component } from 'react';
import MessageCard from '../components/MessageCard';
import { ContainerFluid, Row, Column } from '../components/Bootstrap';

class ErrorPage extends Component {
  
  render() {
    return (
      <div className="pt-3">
        <ContainerFluid>
          <Row>
            <Column col="12" colLg="4">
              <MessageCard title="Error" iconClass="alert-circle">
                There was a problem connecting to the network. Please check back soon.
              </MessageCard>
            </Column>
          </Row>
        </ContainerFluid>
      </div>
    );
  }

}

export default ErrorPage;
