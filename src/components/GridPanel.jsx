import React, { Component } from 'react';
import { Card, CardHeader, CardTitle, CardBody, CardText } from '../components/Bootstrap';
import PanelTitle from '../components/PanelTitle';

class GridPanel extends Component {
  
  render() {
    // const appReady = this.props.appReady === true;
    return (
      <Card className="GridPanel mt-3">
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
          <CardText>This Panel will display the grid representation of the inside of a Lab or Container.</CardText>
        </CardBody>
      </Card>
    );
  }

}

export default GridPanel;