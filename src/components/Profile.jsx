import React, { Component } from 'react';
import { Card, CardHeader, CardTitle, CardBody, CardText } from '../components/Bootstrap';
import PanelTitle from '../components/PanelTitle';

class Profile extends Component {
  
  async getData() {

  }

  componentDidMount() {
    this.getData()
    .then((result) => {
      this.props.debuggingMode && console.log('Profile.componentDidMount.getData.result', result);
    })
    .catch((error) => {
      console.log('Profile.getData', error);
    });
  }

  render() {
    const appReady = this.props.appReady === true;
    const dataReady = this.state.dataReady;
    return (
      <CardBody>
        <CardText>ToDo: Dynamic Detail Layout Per Model</CardText>
      </CardBody>
    );
  }

}

export default Profile;