import React, { Component } from 'react';

import { ContainerFluid, Row, Column } from '../components/Bootstrap';
import FadeIn from 'react-fade-in'

import DataPanel from '../components/DataPanel';
import GridPanel from '../components/GridPanel';
// import GraphPanel from '../components/GraphPanel';

class Landing extends Component {
  
  render() {
    //const debuggingMode = this.props.debuggingMode && this.props.debuggingMode === true;
    const selectedRecordExists = this.props.selectedRecord && Object.keys(this.props.selectedRecord).length > 0;
    const appReady = this.props.appReady === true; 
    return (
      
      <div className="Landing">
        { appReady ? (  
          <FadeIn>
            <ContainerFluid>
              <Row>
                <Column col="12" colLg="4">
                  <FadeIn><DataPanel {...this.props} /></FadeIn>
                </Column>
                <Column col="12" colLg="8">
                  { selectedRecordExists && <FadeIn><GridPanel {...this.props} /></FadeIn> }
                </Column>
              </Row>
            </ContainerFluid>
          </FadeIn>     
        ) : (
          // Whole Page Loading UI // no fade in
          <div className="page-loading"></div>
        )}  
        
      </div>
    );
  }

}

export default Landing;
