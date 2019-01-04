import React, { Component } from 'react';
import { Card, CardHeader, CardTitle, CardBody, CardText } from '../components/Bootstrap';
import PanelTitle from '../components/PanelTitle';

class GraphPanel extends Component {
  
  render() {
    // const appReady = this.props.appReady === true;
    return (
      <Card className="GridPanel">
        <CardHeader dark>
          <CardTitle>
            <PanelTitle 
              icon={this.props.selectedRecord.icon} 
              title={this.props.selectedRecord.name}
              view={this.props.view}
              action={this.props.action}
            />
          </CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>This Panel will display the node graph representation of a Lab or Container and it's child objects.</CardText>
        </CardBody>
      </Card>
    );
  }

}

export default GraphPanel;