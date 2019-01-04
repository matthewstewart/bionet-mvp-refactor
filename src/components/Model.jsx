import React, { Component } from 'react';
import { Card, CardHeader, CardTitle } from '../components/Bootstrap';

import ModelList from './ModelList';
import ModelProfile from './ModelProfile';
import ModelNew from './ModelNew';
import ModelEdit from './ModelEdit';
import ModelDelete from './ModelDelete';

//import FadeIn from 'react-fade-in'

const fields = {
  text: [
    { name: 'name', required: true },
    { name: 'username', required: true },
    { name: 'email', required: true },
    { name: 'imageUrl' },
    { name: 'provenance', required: true },
    { name: 'genotype', required: true },
    { name: 'sequence', required: true },
    { name: 'category', required: true }
  ],
  textArea: [
    { name: 'description' }
  ],
  number: [
    { name: 'row', required: true },
    { name: 'rows', required: true },
    { name: 'rowSpan', required: true },
    { name: 'column' },
    { name: 'columns', required: true },
    { name: 'columnSpan', required: true },
    { name: 'fgStage', required: true }       
  ],
  color: [
    { name: 'bgColor' }
  ]
};

class Model extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modelReady: false,
      mode: "List",
      name: "",
      endpoint: "",
      records: [],
      selectedRecordId: "",
      selectedRecord: {}
    };
    this.setModelState = this.setModelState.bind(this);
  }

  setModelState(newState) {
    //console.log('Model.setModelState.newState', newState);
    this.setState(newState);
  }

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    const iconClass = this.props.iconClass ? this.props.iconClass : "help-circle-outline";
    const iconClasses = `mdi mdi-${iconClass} mr-2 ${this.props.className}`;
    const name = this.props.name ? this.props.name : "Model";
    
    /* 
      attempting dynamic import of React Component
      can use switch statement instead but this is less code if possible
      if this.state.mode === 'List' then render <ModelList />
      if this.state.mode === 'Profile' then render <ModelProfile />
      if this.state.mode === 'New' then render <ModelNew />
      if this.state.mode === 'Edit' then render <ModelEdit> 
    */
    //let componentName = `Model${this.state.mode}`;
    
    // switch instead of better solution listed above 
    let ViewComponent;
    let cardTitle;
    let loadingTitle;
    const model = this.state.selectedRecord;
    const modelName = this.props.name;
    const attrs = Object.keys(model);
    const isUserModel = attrs.length > 0 && attrs.indexOf('username') > -1;
    const appReady = this.props.appReady === true;
    const pageReady = this.props.pageReady === true;
    const modelReady = this.state.modelReady === true;
    const allReady = appReady && pageReady && modelReady;
    switch(this.state.mode) {
      case 'List':
        ViewComponent = ModelList;
        cardTitle = `${modelName}s`;
        loadingTitle = `Loading ${cardTitle}...`;
        break;
      case 'Profile':
        ViewComponent = ModelProfile;
        cardTitle = isUserModel ? model.username : model.name;
        loadingTitle = `Loading ${modelName}...`;
        break;
      case 'New':
        ViewComponent = ModelNew;
        cardTitle = `New ${modelName}`;
        loadingTitle = `Loading ${cardTitle} Form...`;
        break;
      case 'Edit':
        ViewComponent = ModelEdit;
        cardTitle = `Edit ${isUserModel ? model.username : model.name}`;
        loadingTitle = `Loading ${cardTitle} Form...`;
        break;
      case 'Delete':
        ViewComponent = ModelDelete;
        cardTitle = `Delete ${isUserModel ? model.username : model.name}`;
        loadingTitle = `Loading ${cardTitle} Confirmation...`;
        break;
      default:
        ViewComponent = ModelList;
        cardTitle = `${modelName}s`;  
    }
    return (
      <Card className="Model">
        <CardHeader dark>
          <CardTitle>
            {allReady ? (
              <><i className={iconClasses}/>{cardTitle}</>
            ) : (
              <><i className="mdi mdi-timer-sand mr-2"/>{loadingTitle}</>
            )}
          </CardTitle>
        </CardHeader>
        <ViewComponent 
          {...this.props} 
          {...this.state} 
          fields={fields}
          modelName={name} 
          setModelState={this.setModelState}
        />
      </Card>
    );
  }

}

export default Model;
