import React, { Component } from 'react';
import Debug from '../components/Debug';
import { ContainerFluid, Row, Column, Card, CardHeader, CardTitle, CardBody, CardText } from '../components/Bootstrap';

class Landing extends Component {
  
  render() {
    const debuggingMode = this.props.debuggingMode && this.props.debuggingMode === true;
    return (
      <div className="Landing pt-3">
        <ContainerFluid>
          <Row>
            <Column col="12" colLg="4">
              <Card className="Message">
                <CardHeader dark>
                  <CardTitle>
                    <i className="mdi mdi-home mr-1"/>Landing
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <CardText>
                    This is the landing page found at ./src/pages/Landing.jsx
                  </CardText>
                </CardBody>
              </Card>
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
