import React, { Component } from 'react';
import DebugCard from './DebugCard';
import { ContainerFluid, Row, Column } from './Bootstrap';

class Debug extends Component {
  
  render() {
    return (
      <div className="Landing pt-3">
        <ContainerFluid>
          <Row>
            <Column col="12" colLg="6">
              <DebugCard title={`${this.props.componentName}.props`} {...this.props.componentProps} />
            </Column>
            <Column col="12" colLg="6">
              <DebugCard title={`${this.props.componentName}.state`} {...this.props.componentState} />
            </Column>
          </Row>
        </ContainerFluid>
      </div>
    );
  }

}

export default Debug;
