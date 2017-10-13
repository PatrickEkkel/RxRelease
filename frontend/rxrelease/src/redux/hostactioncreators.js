
import Axios from 'axios';
import Host from '../models/host'
import HostFactory from '../factories/hostFactory'
import StateFactory from '../factories/stateFactory'

export function initialHostState() {
  return {
    type: 'INITIAL_HOSTS_STATE'
  }
}

export function loadHostManagement(hostentry) {
  var host = HostFactory.convertMapToHost(hostentry)
  return function (dispatch) {

      Axios.get('http://localhost:8080/rxbackend/states/search/?host_id=' + host.getId())
      .then(function(response){
        var factory = new StateFactory()
        var states = factory.convertJsonList(response.data)
        host.setStates(states)
          dispatch(hostManagementLoaded(host));
      });
  }
}
export function hostManagementLoaded(host) {
  return {
     type: 'LOAD_HOST_MANAGEMENT_FROM_HOSTS',
     selected_host: host
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

export function updateHost(host) {
  return function (dispatch) {
    if(host.getHostname() != '' && host.getIpaddress() != '') {
      Axios.put('http://localhost:8080/rxbackend/hosts/' + host.getId() + "/",
     {
       hostname: host.getHostname(),
       ipaddress: host.getIpaddress(),
       description: host.getDescription()
     }).then(function() {
       dispatch({
           type: 'UPDATE_EXISTING_HOST',
           host: host
       })
     });
    }
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
