import React, { Component } from 'react';
import { Card, CardHeader, CardTitle, CardBody, CardText } from '../components/Bootstrap';

import PanelTitle from '../components/PanelTitle';
// import ModelList from './ModelList';
// import ModelProfile from './ModelProfile';
// import ModelNew from './ModelNew';
// import ModelEdit from './ModelEdit';
// import ModelDelete from './ModelDelete';

class DataPanel extends Component {
  
  render() {
    const appReady = this.props.appReady === true;
    return (
      <Card className="DataPanel mt-3">
        <CardHeader dark>
          { appReady ? (
            <CardTitle>
              <PanelTitle 
                icon={this.props.selectedRecord.icon} 
                title={this.props.selectedRecord.name}
                view={this.props.view}
                action={this.props.action}
              />              
            </CardTitle>
          ) : (
            <CardTitle>
              {/* Can potentially be replaced with PanelTitleLoading / PanelTitle Conditional to include fancy animation for loading in a panel title. */}
              <PanelTitle icon="timer-sand" title="Loading..."/>
            </CardTitle>
          )}
        </CardHeader>
        <CardBody>
          <CardText>This Panel will display one of many views according to app.state.action.</CardText>
        </CardBody>
      </Card>
    );
  }

}

export default DataPanel;


// function exampleForReference(modelName) {
//   let cardTitle;
//   let ViewComponent;
//   let loadingTitle;
//   let isUserModel;
//   let model;
//   switch(this.state.mode) {
//     case 'List':
//       ViewComponent = ModelList;
//       cardTitle = `${modelName}s`;
//       loadingTitle = `Loading ${cardTitle}...`;
//       break;
//     case 'Profile':
//       ViewComponent = ModelProfile;
//       cardTitle = isUserModel ? model.username : model.name;
//       loadingTitle = `Loading ${modelName}...`;
//       break;
//     case 'New':
//       ViewComponent = ModelNew;
//       cardTitle = `New ${modelName}`;
//       loadingTitle = `Loading ${cardTitle} Form...`;
//       break;
//     case 'Edit':
//       ViewComponent = ModelEdit;
//       cardTitle = `Edit ${isUserModel ? model.username : model.name}`;
//       loadingTitle = `Loading ${cardTitle} Form...`;
//       break;
//     case 'Delete':
//       ViewComponent = ModelDelete;
//       cardTitle = `Delete ${isUserModel ? model.username : model.name}`;
//       loadingTitle = `Loading ${cardTitle} Confirmation...`;
//       break;
//     default:
//       ViewComponent = ModelList;
//       cardTitle = `${modelName}s`;  
//   }
// }
