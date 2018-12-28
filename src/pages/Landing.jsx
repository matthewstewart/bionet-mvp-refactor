import React, { Component } from 'react';
import MessageCard from '../components/MessageCard';
import Model from '../components/Model';
import Debug from '../components/Debug';
import { ContainerFluid, Row, Column } from '../components/Bootstrap';

class Landing extends Component {
  
  render() {
    const debuggingMode = this.props.debuggingMode && this.props.debuggingMode === true;
    return (
      <div className="Landing pt-3">
        <ContainerFluid>
          <Row>
            <Column col="12" colLg="4">
              <MessageCard title="Landing" iconClass="home">
                This is the landing page found at ./src/pages/Landing.jsx
              </MessageCard>
            </Column> 
            <Column col="12" colLg="8">
              <Model 
                name="Lab" 
                iconClass="teach"
              />            
            </Column> 
          </Row>
        </ContainerFluid>

        {(debuggingMode) ? (
          <Debug 
            componentName="Landing"
            componentProps={this.props}
            componentState={this.state}
          />
        ) : null }
        
      </div>
    );
  }

}

export default Landing;
