import React from 'react';
import Modal from 'react-bootstrap-modal';
import  * as modalActionCreators from '../redux/modalactioncreators'
import { connect } from 'react-redux'

class RxModal extends React.Component {

  constructor() {
    super()

    this.state = {
      open:false
    }
  }

  saveAndClose() {
    this.props.saveAndClose();
  }
  close() {
    this.props.close();
  }
  getTitle() {
   var title = this.props.title;
   if(title == null) {
     return "No title"
   }
   return title;
  }
  getBody() {
    return this.props.body;
  }
  render(){
    var currentContext = this;

    return (
      <div>
        <Modal
          show={this.props.showModal}
          role="document"
          aria-labelledby="ModalHeader">
          <Modal.Header closeButton>
            <Modal.Title id='ModalHeader'>{this.getTitle()}</Modal.Title>
          </Modal.Header>
          <div className="modal-body">{this.props.children}</div>
          <div className="modal-footer">
            <button className='btn btn-default' onClick={() => currentContext.close()} >Cancel</button>
            <button className='btn btn-primary' onClick={() => currentContext.saveAndClose()}>Save  </button>
          </div>
        </Modal>
      </div>
    )
  }
}


export default RxModal;
