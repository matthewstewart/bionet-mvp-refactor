import Config from '../config.client';
import Auth from './Auth';

async function getCurrentUser() {
  try {
    let currentUser = {};
    if (Auth.isUserAuthenticated()) {
      let userResponse = await loginCurrentUser();
      currentUser = userResponse.user;
    }
    return currentUser;
  } catch (error) {
    console.log('Api.getCurrentUser', error);
  }  
}

async function loginCurrentUser() {
  try {  
    let request = new Request(`${Config.apiEndpoint}/dashboard`, {
      method: 'GET',
      headers: new Headers({
        'Authorization': `Bearer ${Auth.getToken()}`
      })
    });
    let response = await fetch(request);
    let result = response.json();
    return result;
  } catch (error) {
    console.log('Api.loginCurrentUser', error);
  } 
}

async function get(endpoint) {
  try {  
    let request = new Request(`${Config.apiEndpoint}/${endpoint}`, { method: 'GET' });
    let response = await fetch(request);
    let result = response.json();
    return result;
  } catch (error) {
    console.log('Api.get', error);
  }
}

function logoutCurrentUser() {
  Auth.deauthenticateUser();
}

let api = { getCurrentUser, get, logoutCurrentUser };

export default api;