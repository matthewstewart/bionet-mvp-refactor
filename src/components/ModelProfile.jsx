import React, { Component } from 'react';
import shortid from 'shortid';
import { CardBody, CardText, ButtonGroup, Button } from '../components/Bootstrap';
import Api from '../modules/Api';

class ModelProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.setMode = this.setMode.bind(this);
    this.getData = this.getData.bind(this);
  }

  setMode(e) {
    const mode = e.target.getAttribute('mode');
    this.props.setModelState({ mode });
  }

  async getData() {
    let endpoint = this.props.endpoint;
    let selectedRecordId = this.props.selectedRecordId;
    try {  
      let response = await Api.get(`${endpoint}/${selectedRecordId}`);
      let result = { 
        selectedRecord: response.data
      };
      return result;
    } catch (error) {
      console.log('ModelProfile.getData', error);
    }      
  }

  componentDidMount() {
    this.props.setModelState({modelReady: false});
    this.getData()
    .then((result) => {
      this.props.setModelState({
        modelReady: true,
        selectedRecord: result.selectedRecord
      });
    })
    .catch((error) => {
      console.log('ModelProfile.componentDidMount.getData.error', error);
    });
  }

  render() {
    const selectedRecord = this.props.selectedRecord || {};
    const hasAttributes = Object.keys(selectedRecord).length > 0;
    let filteredAttributes = ['name', 'username', 'description', 'provenance', 'genotype', 'sequence', 'datKey', 'category'];
    const attributes = hasAttributes ? Object.keys(selectedRecord).map((attribute, attributeIndex) => {
      let attributeIsFiltered = filteredAttributes.indexOf(attribute) > -1;
      //console.log('attributeType', attributeType, attribute);
      if (attributeIsFiltered) {
        return (
          <CardText key={shortid.generate()}>
            <span className="text-capitalize">{attribute}</span>: {selectedRecord[attribute] || 'None Provided'}
          </CardText>
        );
      } else { return null}
    }) : null;
    const modelReady = this.props.modelReady === true;
    const isLoggedIn = this.props.isLoggedIn === true;
    return (
      <>
        {modelReady ? (
          <CardBody className="ModelProfile">
            {attributes}
            {isLoggedIn && (
              <ButtonGroup className="mt-3">
                <Button mode="List" onClick={this.setMode}>
                  <i mode="List" className="mdi mdi-arrow-left-bold-circle mr-2"/>Back To List
                </Button>
                <Button mode="Edit" color="primary" onClick={this.setMode}>
                  <i mode="Edit" className="mdi mdi-pencil mr-2"/>Edit
                </Button>
              </ButtonGroup>
            )}
          </CardBody>
        ) : (
          <CardBody>
            <CardText>
              <i className="mdi text-lg mdi-timer-sand mr-2"/>Loading...
            </CardText>
          </CardBody>  
        )}
      </> 
    );
  }

}

export default ModelProfile;
