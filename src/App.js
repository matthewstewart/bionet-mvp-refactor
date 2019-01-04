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
import Sandbox from './pages/Sandbox';
import ErrorPage from './pages/ErrorPage';

//import FadeIn from 'react-fade-in';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loadSuccess: false,
      error: {},
      appReady: false,
      debuggingMode: true,
      isLoggedIn: false,
      currentUser: {},
      selectedRecord: {},
      action: "View",
      view: "Graph"
    };
    this.logout = this.logout.bind(this);
    this.setSelectedRecord = this.setSelectedRecord.bind(this);
    this.setAction = this.setAction.bind(this);
    this.setView = this.setView.bind(this);
    this.toggleDebuggingMode = this.toggleDebuggingMode.bind(this);
    this.getData = this.getData.bind(this);
    this.refreshAppState = this.refreshAppState.bind(this);
  }

  logout() {
    Api.logoutCurrentUser()
    .then(() => {
      this.refreshAppState();
    });
  }

  setSelectedRecord(selectedRecord) {
    this.setState({ selectedRecord })
  }

  setAction(newAction) {
    this.setState({ action: newAction });
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
      result['loadSuccess'] = true;
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
    const loadSuccess = this.state.loadSuccess === true;
    return (
      <div className="App">
        <Navigation
          appReady={this.state.appReady} 
          refreshAppState={this.refreshAppState}
          isLoggedIn={this.state.isLoggedIn}
          currentUser={this.state.currentUser}
          logout={this.logout}
          debuggingMode={this.state.debuggingMode}
          selectedRecord={this.state.selectedRecord}
          toggleDebuggingMode={this.toggleDebuggingMode}
        />
        <main className="viewport-container">
          {loadSuccess ? (
            <>
              <Switch>
                <Route exact path="/sandbox" render={ (props) => ( <Sandbox {...this.state} />) } />
              </Switch>
              
              <Switch>
                <Route path="/users/:userId" render={ (props) => ( <UserProfile {...this.state} />) }/>
                <Route exact path="/about" render={ (props) => ( <About {...this.state} />) }/>
                <Route exact path="/" render={ (props) => ( <Landing {...this.state} setSelectedRecord={this.setSelectedRecord}/>) } />
              </Switch>
            </>
          ) : (<ErrorPage />)}  
        </main>
      </div>
    );
  }
}

export default App;
