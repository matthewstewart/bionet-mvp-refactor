import React, { Component } from 'react';
import Debug from '../components/Debug';
import { ContainerFluid, Row, Column, Card, CardHeader, CardTitle, CardBody, CardText } from '../components/Bootstrap';

class About extends Component {
  
  render() {
    const debuggingMode = this.props.debuggingMode && this.props.debuggingMode === true;
    return (
      <div className="About pt-3">
        <ContainerFluid>
          <Row>
            <Column col="12" colLg="4">
              <Card className="Message">
                <CardHeader dark>
                  <CardTitle>
                    <i className="mdi mdi-information mr-1"/>About
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <CardText>
                    This is the about page found at ./src/pages/About.jsx
                  </CardText>
                </CardBody>
              </Card>
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

export default About;
