import React from 'react';
import Button from '../components/Button';
import ProfilePanel from '../panels/ProfilePanel';
import Table from '../components/Table';

class  ProfilesPanel  extends React.Component {
  constructor() {
    super()
  }
  saveprofile()  {
    Axios.post('http://localhost:8080/rxbackend/profiles/',
        {
        name: 'Freds Profile',
        type: 'Flintstone'
      });
  }
  render() {
    const headers_1 = ['#','Profile','Profile type'];
    var data = [];
    data[0] = ['1','leeg','DEFAULT'];
    var items = ['default'];
    var profilePanel = <ProfilePanel/>
    return <div className="container">
        <Modal modalId="myModal" closeButtonText="Cancel" title="New Profile"  saveButtonText="Create" vote={test} body={profilePanel}  onclick={saveprofile} />
        <Table headers = {headers_1} data={data}/>
        <form className="form-horizontal">
              <div className="form-group row">
                <Button modal_target="#myModal" data_toggle="modal" title="New Profile"/>
              </div>
        </form>
   </div>
  }
}
export default ProfilesPanel;
