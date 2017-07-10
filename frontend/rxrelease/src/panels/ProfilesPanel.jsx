import React from 'react';
import Button from '../components/Button';
import ProfilePanel from '../panels/ProfilePanel';
import Table from '../components/Table';
import Axios from 'axios';
import  * as actionCreators from '../redux/actioncreators'
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
  createProfile() {
    this.props.dispatch(actionCreators.openNewProfile())
  }
  loadConfigurationsPanel(e) {

  }
  reload() {
    this.setState({panelState: "reload"});
  }
  saveAndClose() {
    this.props.dispatch(actionCreators.saveNewProfile(this.state.profile_name,this.state.profile_type));
  }
  changeAttr(e) {
    this.setState({[e.target.id]: e.target.value});
  }
  render() {
    var { type } = this.props

    var retrievedData = [];
    var currentContext = this;
    if(type == 'SAVE_NEW_PROFILE' || type == 'INITIAL_PROFILES_STATE') {

    this.props.dispatch(actionCreators.profileIsLoaded());
    Axios.get('http://localhost:8080/rxbackend/profiles/')
    .then(function(response){
      for(var i=0;i<response.data.length;i++) {
      retrievedData[i] = [i,response.data[i].name,response.data[i].type];
      }
       currentContext.setState({data: retrievedData,panelState: "loaded"});

    }); }
    const headers_1 = ['#','Profile','Profile type'];
    var items = ['default'];
    var currentContext = this;

    var data = [];
    data[0]  = ['a','b','c'];
    return <div className="container">
        <Modal saveAndClose={() => currentContext.saveAndClose()}>
          <ProfilePanel changeAttr={(e) => currentContext.changeAttr(e)}/>
        </Modal>
        <Table headers = {headers_1} data={this.state.data} onRowClick={() => currentContext.onClickEvent(entry)}/>
        <Button title="New Profile"  onClick={() => currentContext.createProfile()}/>
   </div>
  }
}
const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._profiles.type,
    profile_name: state._profiles.profile_name,
    profile_type: state._profiles.profile_type,
    reduxState: state,
  }
}

const ConnectedProfilesPanel = connect(mapStateToProps)(ProfilesPanel)

export default ConnectedProfilesPanel;
