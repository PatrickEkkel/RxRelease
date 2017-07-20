import React from 'react';
import Button from '../components/Button';
import ProfilePanel from '../panels/ProfilePanel';
import Table from '../components/Table';
import Axios from 'axios';
import  * as profileActionCreators from '../redux/profileactioncreators'
import Modal from '../components/Modal';
import { connect } from 'react-redux'


class  ProfilesPanel  extends React.Component {

  constructor() {
    super()
    var currentContext = this;

    this.state = {
      data: [],
      panelState: "init",
    }

  }
  createProfile(profiles_list) {
    this.props.dispatch(profileActionCreators.openNewProfile(profiles_list))
  }
  loadConfigurationsPanel(e) {

  }
  reload() {
    this.setState({panelState: "reload"});
  }
  saveAndClose() {
    this.props.dispatch(profileActionCreators.saveNewProfile(this.state.profile_name,this.state.profile_type));
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
  render() {
    var { type,showModal,profiles_list } = this.props


    var currentContext = this;
    var showModal = false;
    if(type == 'OPEN_NEW_PROFILE') {
      showModal = true;
    }

    if(type == 'SAVE_NEW_PROFILE' || type == 'INITIAL_PROFILES_STATE') {
      this.props.dispatch(profileActionCreators.loadProfiles());
    }

    const headers_1 = ['#','Profile','Profile type'];
    var items = ['default'];
    var currentContext = this;

    var data = [];
    data[0]  = ['a','b','c'];
    return <div className="container">
        <Modal title="New Profile" saveAndClose={() => currentContext.saveAndClose()} close={() => currentContext.close()} showModal={showModal}>
          <ProfilePanel changeAttr={(e) => currentContext.changeAttr(e)}/>
        </Modal>
        <Table headers = {headers_1} data={profiles_list} onRowClick={(entry) => currentContext.onRowClick(entry)}/>
        <Button title="New Profile"  onClick={() => currentContext.createProfile(profiles_list)}/>
   </div>
  }
}
const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._profiles.type,
    profile_name: state._profiles.profile_name,
    profile_type: state._profiles.profile_type,
    profiles_list: state._profiles.profiles,
    reduxState: state,
  }
}

const ConnectedProfilesPanel = connect(mapStateToProps)(ProfilesPanel)

export default ConnectedProfilesPanel;
