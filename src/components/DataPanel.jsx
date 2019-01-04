import React, { Component } from 'react';
import moment from 'moment';
import { Card, CardHeader, CardTitle, CardBody, CardText, Navbar, NavbarBrand, NavbarToggle, NavbarNav, NavbarDropdown, Row, Column } from '../components/Bootstrap';

import PanelTitle from '../components/PanelTitle';
import Search from '../components/Search';
import NewLabForm from '../components/NewLabForm';
import FadeIn from 'react-fade-in';
// import ModelList from './ModelList';
// import ModelProfile from './ModelProfile';
// import ModelNew from './ModelNew';
// import ModelEdit from './ModelEdit';
// import ModelDelete from './ModelDelete';

class DataPanel extends Component {
  
  render() {
    const appReady = this.props.appReady === true;
    const isLoggedIn = this.props.isLoggedIn;
    const selectedRecord = this.props.selectedRecord;
    const hasSelectedRecord = selectedRecord && Object.keys(selectedRecord).length > 0;
    //const modelType = hasSelectedRecord ? selectedRecord.type : this.props.modelType;
    //const isListMode = this.props.action === 'List';
    const isViewMode = this.props.action === 'View';
    const isNewMode = this.props.action === 'New';
    // const isEditMode = this.props.action === 'Edit';
    // const isDeleteMode = this.props.action === 'Delete';
    const createdAt = new Date(selectedRecord.createdAt);
    return (
      <Card className="DataPanel mt-3">
        { appReady ? (
          <>
            {isViewMode && (
              <>
                {hasSelectedRecord ? (
                  <>
                    <Navbar dark className="mr-0">
                      <NavbarBrand>
                        <PanelTitle 
                          icon={selectedRecord.icon} 
                          title={selectedRecord.name}
                          view={this.props.view}
                          action={this.props.action}
                        />
                      </NavbarBrand>
                      <NavbarToggle target="dataPanelNav" />
                      <NavbarNav right id="dataPanelNav">
                        {isLoggedIn && (
                          <NavbarDropdown 
                            id="settings-dropdown" 
                            label={'Add'}
                            className="text-light"
                            icon="plus"
                          >
                            { selectedRecord.type === 'Lab' && (
                              <>
                                <button className="dropdown-item" onClick={this.props.onSetAction} action="New" model="Container">
                                  <i className="mdi text-lg mdi-grid mr-1" action="New" model="Container"/>Add Container
                                </button>
                                <button className="dropdown-item" onClick={this.props.onSetAction} action="New" model="Physical">
                                  <i className="mdi text-lg mdi-flask mr-1" action="New" model="Physical"/>Add Physical
                                </button>                                                                
                                <button className="dropdown-item" onClick={this.props.onSetAction} action="New" model="Lab">
                                  <i className="mdi text-lg mdi-teach mr-1" action="New" model="Lab"/>New Lab
                                </button>
                              </>  
                            )}                            

                          </NavbarDropdown>
                        )} 
                      </NavbarNav>
                    </Navbar>
                    <Search {...this.props}/>
                    <CardBody>
                      {createdAt && <small>created {moment(createdAt).calendar().toLowerCase()} by {selectedRecord.createdBy.username}</small>}
                      {selectedRecord.description && <CardText className="mt-3">{selectedRecord.description}</CardText>}
                      {selectedRecord.type === 'Lab' && (
                        <>
                          <CardText className="mt-3">
                            <i className="mdi mdi-account-circle mr-2"/>Members: {selectedRecord.users.length}<br/>
                            <i className="mdi mdi-grid mr-2"/>Containers: {selectedRecord.children.cTotal}<br/>
                            <i className="mdi mdi-flask mr-2"/>Physicals: {selectedRecord.children.pTotal}
                          </CardText>
                          {this.props.debuggingMode && <pre>{JSON.stringify(selectedRecord, null, 2)}</pre>}
                        </>
                      )}
                    </CardBody>
                  </>    
                ) : (
                  <>
                    <Navbar dark className="Navigation">
                      <NavbarBrand>
                      <PanelTitle 
                          icon={'search-web'} 
                          title={'Search Bionet'}
                          view={this.props.view}
                          action={this.props.action}
                        />   
                      </NavbarBrand>
                    </Navbar>                    
                    <Search {...this.props}/>
                  </>  
                )}
              </>
            )}

            {isNewMode && (
              <>
                <Navbar dark className="Navigation">
                  <NavbarBrand>
                  <PanelTitle 
                      icon={'plus'} 
                      title={`${this.props.modelType}`}
                      view={this.props.view}
                      action={this.props.action}
                    />   
                  </NavbarBrand>
                </Navbar>             
                <CardBody>
                  {this.props.modelType === 'Lab' && <NewLabForm {...this.props} />}
                  {this.props.modelType === 'Container' && (
                    <FadeIn>
                      <Row>
                        <Column col="12" colLg="6">
                          <CardText>Add Container To {selectedRecord.name} Form Goes Here</CardText>
                          <button className="btn btn-secondary mt-3" onClick={this.props.onSetAction} action="View" model="Labs">
                            <i className="mdi mdi-cancel mr-1" action="View" model="Labs"/>Cancel
                          </button>
                        </Column>
                      </Row>
                    </FadeIn> 
                  )}
                  {this.props.modelType === 'Physical' && (
                    <FadeIn>
                      <Row>
                        <Column col="12" colLg="6">
                          <CardText>Add Physical To {selectedRecord.name} Form Goes Here</CardText>
                          <button className="btn btn-secondary mt-3" onClick={this.props.onSetAction} action="View" model="Labs">
                            <i className="mdi mdi-cancel mr-1" action="View" model="Labs"/>Cancel
                          </button>                          
                        </Column>
                      </Row>
                    </FadeIn> 
                  )}
                </CardBody>
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
