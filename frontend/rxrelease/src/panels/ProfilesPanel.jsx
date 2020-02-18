import React from 'react';
import Button from '../components/Button';
import ProfilePanel from '../panels/ProfilePanel';
import BasicRxPanel from '../components/panels/BasicRxPanel';
import StandardListConverters from '../converters/StandardListConverters';
import Table from '../components/Table';
import Axios from 'axios';
import  * as profileActionCreators from '../redux/profileactioncreators'
import Modal from '../components/Modal';
import { connect } from 'react-redux'


class  ProfilesPanel  extends BasicRxPanel {

  constructor() {
    super()
    var currentContext = this;

    this.state = {
      showModal: false,
      profiles: []
    }

  }
  createProfile() {
    this.props.dispatch(profileActionCreators.openNewProfile())
  }
  loadConfigurationsPanel(e) {

  }
  reload() {
    this.setState({panelState: "reload"});
  }
  saveAndClose() {
    this.props.dispatch(profileActionCreators.saveNewProfile(this.state.name,this.state.profiletype));
  }
  close() {
      this.props.dispatch(profileActionCreators.initialProfilesState())
  }
  changeAttr(e) {
    this.setState({[e.target.id]: e.target.value});
  }
  onRowClick(entry) {
    this.props.dispatch(profileActionCreators.loadConfigurationsPanel(entry))
  }
  componentWillMount() {

    var  {type,profiles} = this.props

    if(type == 'SAVE_NEW_PROFILE' || type == 'INITIAL_PROFILES_STATE') {
      this.props.dispatch(profileActionCreators.loadProfiles());
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.type == 'INITIAL_PROFILES_STATE' || nextProps.type == 'SAVE_NEW_PROFILE') {
      this.props.dispatch(profileActionCreators.loadProfiles());

    }
    if(nextProps.type == 'PROFILES_LOADED') {
      this.setState({showModal: false,profiles: nextProps.profiles})
    }

    if(nextProps.type == 'OPEN_NEW_PROFILE') {
      this.setState({showModal:  true});
    }
  }

  render() {
    const headers_1 = ['#','Profile'];
    var currentContext = this;

    var profiles = StandardListConverters.convertListToMap(this.state.profiles,function(item) {
      return [item.getId(),item.getName()]
    })


    return <div className="container">
        <Modal title="New Profile" saveAndClose={() => currentContext.saveAndClose()} close={() => currentContext.close()} showModal={currentContext.state.showModal}>
          <ProfilePanel changeAttr={(e) => currentContext.changeAttr(e)}/>
        </Modal>
        <Table headers = {headers_1} data={profiles} onRowClick={(entry) => currentContext.onRowClick(entry)}/>
        <Button title="New Profile"  onClick={() => currentContext.createProfile()}/>
   </div>
  }
}
const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._profiles.type,
    name: state._profiles.name,
    profiles: state._profiles.profiles,
    reduxState: state,
  }
}

const ConnectedProfilesPanel = connect(mapStateToProps)(ProfilesPanel)

export default ConnectedProfilesPanel;
