import React, { Component } from 'react';
import moment from 'moment';
import { Card, CardHeader, CardTitle, CardBody, CardText } from '../components/Bootstrap';

import PanelTitle from '../components/PanelTitle';
import Search from '../components/Search';
// import ModelList from './ModelList';
// import ModelProfile from './ModelProfile';
// import ModelNew from './ModelNew';
// import ModelEdit from './ModelEdit';
// import ModelDelete from './ModelDelete';

class DataPanel extends Component {
  
  render() {
    const appReady = this.props.appReady === true;
    const selectedRecord = this.props.selectedRecord;
    const hasSelectedRecord = selectedRecord && Object.keys(selectedRecord).length > 0;
    //const modelType = hasSelectedRecord ? selectedRecord.type : this.props.modelType;
    const isListMode = this.props.action === 'List';
    //const isViewMode = this.props.action === 'View';
    // const isEditMode = this.props.action === 'Edit';
    // const isDeleteMode = this.props.action === 'Delete';
    const createdAt = new Date(selectedRecord.createdAt);
    return (
      <Card className="DataPanel mt-3">
        { appReady ? (
          <>
            

            {!isListMode && (
              <>
                {hasSelectedRecord ? (
                  <>
                    <CardHeader dark>
                      <CardTitle>
                        <PanelTitle 
                          icon={selectedRecord.icon} 
                          title={selectedRecord.name}
                          view={this.props.view}
                          action={this.props.action}
                        />
                      </CardTitle>
                    </CardHeader>
                    <Search {...this.props}/>
                    <CardBody>
                      {createdAt && <small>created {moment(createdAt).calendar().toLowerCase()} by {selectedRecord.createdBy.username}</small>}
                      {selectedRecord.description && <CardText className="mt-3">{selectedRecord.description}</CardText>}
                    </CardBody>
                  </>    
                ) : (
                  <>
                    <CardHeader dark>
                      <CardTitle>
                        <PanelTitle 
                          icon={'search-web'} 
                          title={'Search Bionet'}
                          view={this.props.view}
                          action={this.props.action}
                        />   
                      </CardTitle>
                    </CardHeader>
                    <Search {...this.props}/>
                  </>  
                )}
              </>
            )}

          </>  
        ) : (
          <CardHeader dark>
            <CardTitle>
              <PanelTitle icon="timer-sand" title="Loading..."/>
            </CardTitle>
          </CardHeader>
        )}
        
        
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
