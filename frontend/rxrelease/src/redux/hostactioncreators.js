
import Axios from 'axios';
import Host from '../models/host'
import HostFactory from '../factories/hostFactory'

export function initialHostState() {
  return {
    type: 'INITIAL_HOSTS_STATE'
  }
}

export function loadHostManagement(hostentry) {
  return {
    type: 'LOAD_HOST_MANAGEMENT_FROM_HOSTS',
    selected_host: HostFactory.convertMapToHost(hostentry)
  }
}


export function openNewHost(hostentry) {

  return {
    type: 'OPEN_NEW_HOST'
    }
}

export function loadHosts() {
  return function (dispatch) {

      Axios.get('http://localhost:8080/rxbackend/hosts/')
      .then(function(response){

        var factory = new HostFactory();
        var hostList = factory.convertJsonList(response.data)

          dispatch(hostsLoaded(hostList));
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
