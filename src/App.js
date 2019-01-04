/*************************************************/
/* App.js - Top Level Application Component      */
/*-----------------------------------------------*/
/* Loaded by the ./src/index.js entrypoint, it   */
/* contains the primary layout and routes.       */
/*************************************************/


import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import './App.scss';

import Api from './modules/Api';
import Navigation from './components/Navigation';
import Landing from './pages/Landing';
import About from './pages/About';
import UserProfile from './pages/UserProfile';
import NewLab from './pages/NewLab';
import Sandbox from './pages/Sandbox';
import Footer from './components/Footer';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      appReady: false,
      debuggingMode: false,
      isLoggedIn: false,
      currentUser: {},
      labs: [],
      containers: [],
      physicals: [],
      virtuals: [],
      records: [],
      selectedRecord: {},
      action: "View",
      modelType: "Lab",
      view: "Grid"
    };
    this.setRecords = this.setRecords.bind(this);
    this.setLabs = this.setLabs.bind(this);
    this.setContainers = this.setContainers.bind(this);
    this.setPhysicals = this.setPhysicals.bind(this);
    this.setVirtuals = this.setVirtuals.bind(this);
    this.logout = this.logout.bind(this);
    this.setSelectedRecord = this.setSelectedRecord.bind(this);
    this.setAction = this.setAction.bind(this);
    this.onSetAction = this.onSetAction.bind(this);
    this.setView = this.setView.bind(this);
    this.toggleDebuggingMode = this.toggleDebuggingMode.bind(this);
    this.getData = this.getData.bind(this);
    this.refreshAppState = this.refreshAppState.bind(this);
  }

  setRecords(records) { this.setState({records}) }
  setLabs(labs) { this.setState({labs}) }
  setContainers(containers) { this.setState({containers}) }
  setPhysicals(physicals) { this.setState({physicals}) }
  setVirtuals(virtuals) { this.setState({virtuals}) }

  logout() {
    Api.logoutCurrentUser()
    .then(() => {
      this.refreshAppState();
    });
  }

  setSelectedRecord(selectedRecord) {
    const selectedRecordExists = selectedRecord && Object.keys(selectedRecord).length > 0;
    if (selectedRecordExists) {
      const recordType = selectedRecord.type;
      let endpoint;
      switch (recordType) {
        case 'Lab':
          endpoint = 'labs';
          break;
        case 'Container':
          endpoint = 'containers';
          break;
        case 'Physical':
          endpoint = 'physicals';
          break;
        case 'Virtual':
          endpoint = 'virtuals';
          break;
        default:
          // nothing  
      }

      selectedRecord['endpoint'] = endpoint;
      Api.get(`${endpoint}/${selectedRecord._id}`)
      .then((result) => {
        let fullSelectedRecord = result.data;
        fullSelectedRecord['icon'] = selectedRecord.icon;
        fullSelectedRecord['type'] = selectedRecord.type;
        fullSelectedRecord['label'] = selectedRecord.label;
        fullSelectedRecord['endpoint'] = endpoint;
        this.setState({ 
          selectedRecord: fullSelectedRecord,
          modelType: fullSelectedRecord.type || "",
          action: 'View'
        });
      });
    } else {
      this.setState({
        selectedRecord: {},
        modelType: ""
      });
    }  
  }

  setAction(newAction, modelType) {
    this.setState({ action: newAction, modelType });
  }

  onSetAction(e) {
    e.preventDefault();
    const action = e.target.getAttribute('action');
    const model = e.target.getAttribute('model');
    this.setAction(action, model);
  }

  setView(newView) {
    this.setState({ view: newView });
  }

  toggleDebuggingMode() {
    this.setState({ debuggingMode: !this.state.debuggingMode });
  }

  async getData() {
    try {   
      let currentUser = await Api.getCurrentUser();
      let isLoggedIn = Object.keys(currentUser).length > 0;
      return {currentUser, isLoggedIn};
    } catch (error) {
      //console.log('App.getData', error);
      throw error;
    }      
  }

  refreshAppState() {
    this.getData()
    .then((result) => {
      this.state.debuggingMode && console.log('App.componentDidMount.getData.result', result);
      result['appReady'] = true;
      this.setState(result);
    }).catch((error) => {
      console.error(error);
      this.logout();
    });
  }

  componentDidMount() {
    //this.logout();
    this.refreshAppState();
  }

  render() {
    return (
      <div className="App">
        <Navigation
          appReady={this.state.appReady} 
          refreshAppState={this.refreshAppState}
          isLoggedIn={this.state.isLoggedIn}
          currentUser={this.state.currentUser}
          labs={this.state.labs}
          logout={this.logout}
          debuggingMode={this.state.debuggingMode}
          selectedRecord={this.state.selectedRecord}
          toggleDebuggingMode={this.toggleDebuggingMode}
          setSelectedRecord={this.setSelectedRecord}
          setAction={this.setAction}
          onSetAction={this.onSetAction}
        />
        <main className="viewport-container">
          <>
            <Switch>
              <Route exact path="/labs/new" render={ (props) => ( <NewLab {...this.state} />) }/>
              <Route path="/users/:userId" render={ (props) => ( <UserProfile {...this.state} />) }/>
              <Route exact path="/about" render={ (props) => ( <About {...this.state} />) }/>
              <Route exact path="/sandbox" render={ (props) => ( <Sandbox {...this.state} />) } />
              <Route 
                exact 
                path="/" 
                render={ (props) => (
                  <Landing 
                    {...this.state} 
                    setSelectedRecord={this.setSelectedRecord}
                    setRecords={this.setRecords}
                    setLabs={this.setLabs}
                    setContainers={this.setContainers}
                    setPhysicals={this.setPhysicals}
                    setVirtuals={this.setVirtuals}
                    setAction={this.setAction}
                    onSetAction={this.onSetAction}
                  />
                )} 
              />
            </Switch>
          </>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
