import React, { Component } from 'react';

import { ContainerFluid, Row, Column } from '../components/Bootstrap';
import FadeIn from 'react-fade-in'

//import MessageCard from '../components/MessageCard';
//import Debug from '../components/Debug';
import Search from '../components/Search';
import DataPanel from '../components/DataPanel';
import GridPanel from '../components/GridPanel';
import GraphPanel from '../components/GraphPanel';

class Landing extends Component {
  
  render() {
    //const debuggingMode = this.props.debuggingMode && this.props.debuggingMode === true;
    const selectedRecordExists = this.props.selectedRecord && Object.keys(this.props.selectedRecord).length > 0;
    const appReady = this.props.appReady === true;
    const isGridView = this.props.view === 'Grid';
    const isGraphView = this.props.view === 'Graph'; 
    return (
      
      <div className="Landing pt-3">
        { appReady ? (  
          <FadeIn>
            { isGridView && (
              // Grid Layout
              <ContainerFluid>
                <Row>
                  {/* Left Panel */}
                  <Column col="12" colLg="6">
                    <Search {...this.props}/>
                    {/* If Selected Record Exists, Load The Data Panel */}
                    { selectedRecordExists && <FadeIn><DataPanel {...this.props} /></FadeIn> }
                  </Column>
                  {/* Right Panel  */}
                  <Column>
                    {/* If Selected Record Exists and View is 'Grid', Load The Grid Panel */}
                    { selectedRecordExists && <FadeIn><GridPanel {...this.props} /></FadeIn> }
                  </Column>
                </Row>
              </ContainerFluid>
            )}
            { isGraphView && (
              // Graph Layout
              <ContainerFluid>
                <Row>
                  {/* Left Panel */}
                  <Column col="12" colLg="4">
                    <Search {...this.props}/>
                    {/* If Selected Record Exists, Load The Data Panel */}
                    { selectedRecordExists && <FadeIn><DataPanel {...this.props} /></FadeIn> }
                  </Column>
                  {/* Right Panel  */}
                  <Column col="12" colLg="8">
                    {/* If Selected Record Exists and View is 'Grid', Load The Grid Panel */}
                    { selectedRecordExists && isGridView && <FadeIn><GridPanel {...this.props} /></FadeIn> }
                    {/* If Selected Record Exists and View is 'Graph', Load The Graph Panel */}
                    { selectedRecordExists && isGraphView &&<FadeIn><GraphPanel {...this.props} /></FadeIn> }
                  </Column>
                </Row>
              </ContainerFluid>
            )}
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
