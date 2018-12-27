/*************************************************/
/* App.js - Top Level Application Component      */
/*-----------------------------------------------*/
/* Loaded by the ./src/index.js entrypoint, it   */
/* contains the primary layout and routes.       */
/*************************************************/

// core react components
import React, { Component } from 'react';

// react router
  // Route - Enables routing to a component when there is a url parameter change matching a set pattern
  // Switch - A wrapper if/else/switch component that helps ensure multiple routes are not matched and rendered at the same time
import { Route, Switch } from "react-router-dom";

// component scss
import './App.scss';

// js modules - contain logic for use within components
import Api from './modules/Api';

// layout components - header, grid, footer components
import Navigation from './components/Navigation';

// pages - individual views/routes/components loaded by a url parameter change
import Landing from './pages/Landing';
import About from './pages/About';
import UserProfile from './pages/UserProfile';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      debuggingMode: true,
      isReady: false, // the component tree renders from child up, this is useful for passing back down that the entire component tree is loaded
      isLoggedIn: false, // is the user logged in
      currentUser: {}, // the current user record
      labs: [], // a test of getAll
      lab: {} // a test of getOne
    };
    this.getData = this.getData.bind(this); // each component has a 'parent' async function, getData(), loaded on componentDidMount/componentDidUpdate to change the state
  }

  // async function returning data required for this component
  async getData() {
    try {  
      // reused variable to hold API response
      let response;

      // get all labs
      response = await Api.get('labs');
      // the response is an object with an attribute 'data', an array holding the records
      let labs = response.data;
      // select first lab for profile
      let firstLab = labs[0];

      // get one lab
      response = await Api.get(`labs/${firstLab._id}`);
      // the response is an object with an attribute 'data', an object holding the record
      let lab = response.data;

      // get current user if they have a json web token in local storage
      let currentUser = await Api.getCurrentUser();
      // log current user object to see if empty
      //console.log('App.getData.currentUser', currentUser);
      // if the current user object is empty, the user is not logged in
      let isLoggedIn = Object.keys(currentUser).length > 0;
      
      // return result for view in object
      return {lab, labs, currentUser, isLoggedIn};
    } catch (error) {
      console.log('App.getData', error);
    }      
  }

  // only runs on the initial load
  componentDidMount() {
    // get data for view
    this.getData()
    .then((res) => {
      // log response
      //console.log('App.componentDidMount.getData.res', res);
      // add isReady attribute with value of true 
      res['isReady'] = true;
      // set state to response
      this.setState(res);
    });
  }

  render() {
    return (
      <div className="App">
        <Navigation
          isReady={this.state.isReady} 
          isLoggedIn={this.state.isLoggedIn}
          currentUser={this.state.currentUser}
        />
        <main className="viewport-container">
          <Switch>
            <Route path="/users/:userId" component={ UserProfile }/>
            <Route exact path="/about" component={ (props) => (<About {...this.state} />) }/>
            <Route exact path="/" render={ (props) => (<Landing {...this.state} />) } />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
