import React, { Component } from 'react';
import Model from '../components/Model';
import Debug from '../components/Debug';
import MessageCard from '../components/MessageCard';
import { ContainerFluid, Row, Column } from '../components/Bootstrap';
import FadeIn from 'react-fade-in'

class Sandbox extends Component {
  
  render() {
    const debuggingMode = this.props.debuggingMode && this.props.debuggingMode === true;
    const appReady = this.props.appReady === true;
    //const appReady = false;
    return (
      <div className="Sandbox pt-3 pb-3">
        <ContainerFluid>
          {appReady ? (
            <>
            <Row>
              <Column col="12" colLg="4">
              <FadeIn>
                <Model 
                  {...this.props}
                  pageReady={appReady}
                  name="User" 
                  iconClass="account"
                />
                </FadeIn>            
              </Column> 
              <Column col="12" colLg="4">
                <Model 
                  {...this.props}
                  pageReady={appReady}
                  name="Lab" 
                  iconClass="teach"
                />            
              </Column> 
              <Column col="12" colLg="4">
                <Model 
                  {...this.props}
                  pageReady={appReady}
                  name="Virtual" 
                  iconClass="dna"
                />            
              </Column> 
            </Row>
            <Row className="mt-3">
              <Column col="12" colLg="6">
                <Model 
                  {...this.props}
                  pageReady={appReady}
                  name="Container" 
                  iconClass="grid"
                />            
              </Column> 
              <Column col="12" colLg="6">
                <Model 
                  {...this.props}
                  pageReady={appReady}
                  name="Physical" 
                  iconClass="flask"
                />            
              </Column>
            </Row>
            </>
          ) : (
            <Column col="12" colLg="4">
              <MessageCard
                {...this.props}
                title="Loading Page..." 
                iconClass="timer-sand"
              >The page is currently loading.</MessageCard>            
            </Column>             
          )}  
        </ContainerFluid>

        {(appReady === true && debuggingMode) ? (
          <Debug 
            componentName="Sandbox"
            componentProps={this.props}
            componentState={this.state}
          />
        ) : null }
        
      </div>
    );
  }

}

export default Sandbox;
