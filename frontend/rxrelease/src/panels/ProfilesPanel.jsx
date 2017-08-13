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
      //this.props.dispatch(profileActionCreators.loadProfiles());
      this.setState({showModal:  true});
    }
  }

  render() {
    const headers_1 = ['#','Profile','Profile type'];
    var currentContext = this;

    return <div className="container">
        <Modal title="New Profile" saveAndClose={() => currentContext.saveAndClose()} close={() => currentContext.close()} showModal={currentContext.state.showModal}>
          <ProfilePanel changeAttr={(e) => currentContext.changeAttr(e)}/>
        </Modal>
        <Table headers = {headers_1} data={this.state.profiles} onRowClick={(entry) => currentContext.onRowClick(entry)}/>
        <Button title="New Profile"  onClick={() => currentContext.createProfile()}/>
   </div>
  }
}
const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._profiles.type,
    profile_name: state._profiles.profile_name,
    profile_type: state._profiles.profile_type,
    profiles: state._profiles.profiles,
    reduxState: state,
  }
}

const ConnectedProfilesPanel = connect(mapStateToProps)(ProfilesPanel)

export default ConnectedProfilesPanel;
