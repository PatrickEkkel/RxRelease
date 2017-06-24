import React from 'react';
import Button from '../components/Button';
import ProfilePanel from '../panels/ProfilePanel';
import Table from '../components/Table';
import Axios from 'axios';

class  ProfilesPanel  extends React.Component {

  constructor() {
    super()
    var currentContext = this;

    this.state = {
      data: [],
      panelState: "init",
    }

  }
  loadCreateProfile(e) {
    var profilePanel  = <ProfilePanel ref={this.props.profileRef}/>
    this.props.onModalLoad(profilePanel);
  }
  loadConfigurationsPanel(e) {
    
  }
  reload() {
    this.setState({panelState: "reload"});
  }

  render() {
    var retrievedData = [];
    if(this.state.panelState == "init" || this.state.panelState == "reload") {

    Axios.get('http://localhost:8080/rxbackend/profiles/')
    .then(function(response){
      for(var i=0;i<response.data.length;i++) {
      retrievedData[i] = [i,response.data[i].name,response.data[i].type];
      }
       currentContext.setState({data: retrievedData,panelState: "loaded"});

    });
    }
    const headers_1 = ['#','Profile','Profile type'];
    var items = ['default'];
    var currentContext = this;
    var data = [];
    data[0]  = ['a','b','c'];
    return <div className="container">

        <Table headers = {headers_1} data={this.state.data} onRowClick={currentContext.loadConfigurationsPanel.bind(currentContext)}/>
        <form className="form-horizontal">
              <div className="form-group row">
                <Button  title="New Profile" modal_target="#myModal" data_toggle="modal" onClickEvent={currentContext.loadCreateProfile.bind(currentContext)}/>
              </div>
        </form>
   </div>
  }
}
export default ProfilesPanel;
