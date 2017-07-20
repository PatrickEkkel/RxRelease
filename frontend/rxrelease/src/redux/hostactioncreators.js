
import Axios from 'axios';


export function initialHostState() {
  return {
    type: 'INITIAL_HOSTS_STATE'
  }
}

export function openNewHost() {
  return {
    type: 'OPEN_NEW_HOST'
    }
}

export function saveNewHost(hostname,ipadress,description) {
  return function (dispatch) {
    if (hostname != '' && ipadress != '') {
    Axios.post('http://localhost:8080/rxbackend/hosts/',
        {
        hostname: hostname,
        ipaddress: ipadress,
        description: description
      }).then(function() {
        dispatch( {
            type: 'SAVE_NEW_HOST',
            hostname: hostname,
            ipadress: ipadress,
            description: description
        })
      });
    }
  }
}
