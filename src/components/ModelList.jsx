import React, { Component } from 'react';
import shortid from 'shortid';
import { CardList, CardListButton } from '../components/Bootstrap';
import Api from '../modules/Api';

class ModelList extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.setModeToProfile = this.setModeToProfile.bind(this);
    this.getData = this.getData.bind(this);
    this.onNewClick = this.onNewClick.bind(this);
  }

  onNewClick(e) {
    this.props.setModelState({
      mode: 'New'
    });    
  }

  setModeToProfile(e) {
    let selectedRecordId = e.target.getAttribute('id');
    this.props.setModelState({
      mode: 'Profile',
      selectedRecordId
    });
  }

  async getData() {
    let endpoint;
    switch (this.props.modelName) {
      case 'User':
        endpoint = 'users';
        break;
      case 'Lab':
        endpoint = 'labs';
        break;
      case 'Virtual':
        endpoint = 'virtuals';
        break;
      case 'Container':
        endpoint = 'containers';
        break;
      case 'Physical':
        endpoint = 'physicals';
        break;    
      default:
        endpoint = 'labs';  
    }
    try {  
      let response = await Api.get(endpoint);
      let result = { 
        records: response.data,
        endpoint
      };
      return result;
    } catch (error) {
      console.log('ModelList.getData', error);
    }      
  }

  componentDidMount() {
    this.props.setModelState({modelReady: false});
    this.getData()
    .then((result) => {
      this.props.setModelState({
        modelReady: true,
        endpoint: result.endpoint,
        records: result.records
      });
    })
    .catch((error) => {
      console.log('ModelList.componentDidMount.getData.error', error);
    });
  }
  
  render() {
    const modelReady = this.props.modelReady === true;
    const isLoggedIn = this.props.isLoggedIn === true;
    const records = this.props.records || [];
    const links = records.map((record, recordIndex) => {
      let recordIcon;
      switch (this.props.modelName) {
        case 'User':
          recordIcon = 'account';
          break;
        case 'Lab':
          recordIcon = 'teach';
          break;
        case 'Virtual':
          recordIcon = 'dna';
          break;
        case 'Container':
          recordIcon = 'grid';
          break;
        case 'Physical':
          recordIcon = 'flask';
          break;    
        default:
          recordIcon = 'help';  
      }      
      return (
        <CardListButton 
          key={shortid.generate()}
          onClick={this.setModeToProfile}
          id={record._id}
        >
          <i id={record._id} className={`mdi text-lg mdi-${recordIcon} mr-2`}/>{this.props.modelName === 'User' ? record.username : record.name}
        </CardListButton>        
      );
    });
    
    return (
      <>
        {modelReady ? (
          <CardList className="ModelList">
            {links}
            {isLoggedIn && (
              <CardListButton dark type="success" onClick={this.onNewClick}>
                <i className="mdi mdi-plus mr-2"/>Add New {this.props.modelName}
              </CardListButton>
            )}
          </CardList>
        ) : (
          <CardList className="ModelList">
            <CardListButton>
              <i className="mdi text-lg mdi-timer-sand mr-2"/>Loading...
            </CardListButton>
          </CardList>
        )}
      </>  
    );
  }

}

export default ModelList;
