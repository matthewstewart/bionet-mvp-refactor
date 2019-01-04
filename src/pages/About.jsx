import React, { Component } from 'react';
import { ContainerFluid, Row, Column, Card, CardHeader, CardTitle, CardBody, CardText } from '../components/Bootstrap';
import FadeIn from 'react-fade-in';

class About extends Component {
  
  render() {
    return (
      <ContainerFluid className="About">  
        <Row className="justify-content-lg-center">
          <Column col="12" colLg="5" colXl="4">
            <FadeIn>
              <Card className="mb-3 text-center mt-3">
                <CardHeader dark className="bg-dark-green">
                  <CardTitle>Bionet</CardTitle>
                </CardHeader>
                <CardBody>
                  <CardTitle className="mb-2"><strong>Open Source Biological Inventory Management</strong></CardTitle>
                  <CardText>Welcome to BioNet. Keep track of your stuff, find what you need, and share as you like. The BioNet supports searching for biological material across multiple labs — all your inventory information is controlled locally by you. You decide if others can see what you wish to share. All BioNet software and associated materials are open source and free to use.</CardText>
                </CardBody>
              </Card>
            </FadeIn>
          </Column>
        </Row>
      </ContainerFluid>
    );
  }

}

export default About;
