import React from 'react';
import Button from '../components/Button';
import ProfilePanel from '../panels/ProfilePanel';
import Table from '../components/Table';


class  ProfilesPanel  extends React.Component {

  constructor() {
    super()
    var currentContext = this;

  }
  loadCreateProfile(e) {
    var profilePanel  = <ProfilePanel ref={this.props.profileRef}/>
    this.props.onModalLoad(profilePanel);
  }
  render() {
  //  this.loadCreateProfile()
    const headers_1 = ['#','Profile','Profile type'];
    var data = [];
    data[0] = ['1','leeg','DEFAULT'];
    var items = ['default'];
    var currentContext = this;

    return <div className="container">

        <Table headers = {headers_1} data={data}/>
        <form className="form-horizontal">
              <div className="form-group row">
                <Button  title="New Profile" modal_target="#myModal" data_toggle="modal" onClickEvent={currentContext.loadCreateProfile.bind(currentContext)}/>
              </div>
        </form>
   </div>
  }
}
export default ProfilesPanel;
