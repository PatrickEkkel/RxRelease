import React from 'react'
import { connect } from 'react-redux'
import BasicRxPanel from '../../components/panels/BasicRxPanel';
import Wizard from '../../components/Wizard'
import SelectNewOrExisting from './wizard/SelectNewOrExisting';
import ConfigureHost from './wizard/ConfigureHost';
import InstallHost from './wizard/InstallHost';
import  * as wizardActionCreators from '../../redux/wizardactioncreators'
import  * as hostActionCreators from '../../redux/hostactioncreators'
import  * as jsonUtils from '../../lib/json/utils'

class SaltInstallWizard extends BasicRxPanel {

  constructor() {
    super('SALT','INSTALL_WIZARD')
    this.state = {
      show_wizard: true
    }
  }

  componentWillMount() {
    // TODO: hier was ik gebleven
  //  this.props.dispatch(wizardActionCreators.)
  this.props.dispatch(wizardActionCreators.loadWizardState('rxsalt_wizard'))


  }
  componentWillReceiveProps(nextProps) {

    var type = nextProps.type;
    var host_type = nextProps.host_type;
    var wizard_state =  nextProps.wizard_state;
    var hostmanagement_type = nextProps.hostmanagement_type;
    var loaded_host = nextProps.selected_host;
    var hosts = nextProps.hosts
    this.getLogger().trace("host_type: " + host_type)
    this.getLogger().trace("host host_management_type: " + hostmanagement_type)
    if(type == 'WIZARD_STATE_LOADED') {

      this.getLogger().trace("wizard_state")
      this.getLogger().traceObject(wizard_state)
      if(wizard_state['wizard_status'] == 'COMPLETED' && host_type == 'INITIAL_HOSTS_STATE') {
        //this.setState({show_wizard: false})
        this.props.dispatch(hostActionCreators.getHostByProfiletypeId("Salt Master"))
      }
      else if(wizard_state['wizard_status'] == 'COMPLETED' && host_type == 'HOSTS_LOADED' &&  hostmanagement_type == 'INITIAL_HOST_MANAGEMENT_STATE') {
        this.getLogger().trace("Hosts loaded")
        this.getLogger().traceObject(hosts)
        // we verwachten 1 host terug dus als de length groter dan 0 is pakken we de eerste
        if(hosts.length > 0) {
          var saltmaster = jsonUtils.normalizeJson(hosts[0])
          var entry = [saltmaster.id,saltmaster.hostname];
          this.props.dispatch(hostActionCreators.loadHostManagement(entry))
        }
      }
      else if(type == 'WIZARD_STATE_LOADED' && hostmanagement_type == 'LOAD_HOST_MANAGEMENT_FROM_HOSTS') {
        this.setState({selected_host: loaded_host, show_wizard: false})
      }
    }


  }

  render() {

    if(this.state.show_wizard) {

      var disabled_previous = [3];
      var step1 = <SelectNewOrExisting/>
      var step2 = <ConfigureHost/>
      var step3 = <InstallHost/>
      var items = { 'Salt Master Installation': step1,'Select Host': step2,'Install Host': step3}
        return <Wizard items={items} />
    }
    else {
      this.getLogger().trace("Host to show the states of ")
      this.getLogger().traceObject(this.state.selected_host)
      return <InstallHost states={ this.state.selected_host.states}/>
    }
  }
}


const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._wizard.type,
    wizard_state: state._wizard.wizard_state,
    hostmanagement_type: state._hostmanagement.type,
    host_type: state._host.type,
    hosts: state._host.hosts,
    selected_host: state._hostmanagement.selected_host,

    // It is very bad practice to provide the full state like that (reduxState: state) and it is only done here
    // for you to see its stringified version in our page. More about that here:
    // https://github.com/reactjs/react-redux/blob/master/docs/api.md#inject-dispatch-and-every-field-in-the-global-state
    reduxState: state,
  }
}
const connectedSaltInstallWizard = connect(mapStateToProps)(SaltInstallWizard)

export default connectedSaltInstallWizard
