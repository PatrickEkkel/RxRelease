
import Axios from 'axios';
import Host from '../models/host'


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

export function loadHosts() {
  return function (dispatch) {
      var retrievedData = [];
      Axios.get('http://localhost:8080/rxbackend/hosts/')
      .then(function(response){
        for(var i=0;i<response.data.length;i++) {
          var id = response.data[i].id;
          var hostname = response.data[i].hostname;
          var ipaddress = response.data[i].ipaddress;
          var description = response.data[i].description;
          var p = new Host(id,hostname,ipaddress,description)

        retrievedData[i] = [id,hostname,ipaddress,description];
        }
          dispatch(hostsLoaded(retrievedData));
      });
  }
}

export function hostsLoaded(hosts) {
  return {
    type: 'HOSTS_LOADED',
    hosts: hosts
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
