import  * as loginRequests from '../rest/requests/loginrequests'


export function login(username,password) {

  return function(dispatch) {
    loginRequests.postLogin(username,password).then(function(response) {
      dispatch(loginSuccess())
    });
  }

}
export function checkIfLoggedIn() {

  return function(dispatch) {
    loginRequests.getUsers().then(function(response) {
      dispatch(loginSuccess())
    }).catch(function(error) {
      dispatch(loginFailed())
    });
  }

}
export function doLogin() {
  return {
    type: 'DO_AUTHENTICATION'
  }
}
export function goToLandingPage() {
  return {
    type: 'LOAD_PROFILES_PANEL'
  }
}
export function loginFailed() {
  return {
    type: 'AUTHENTICATION_ERROR'
  }
}
export function loginSuccess() {
  return {
      type: 'AUTHENTICATION_SUCCESS'
  }
}
