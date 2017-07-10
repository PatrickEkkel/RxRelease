import React from 'react';
import Modal from 'react-bootstrap-modal';
import  * as actionCreators from '../redux/actioncreators'
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
    this.props.dispatch(actionCreators.closeModal())
  }
  getBody() {
    return this.props.body;
  }
  render(){
    var currentContext = this;
    var { type,showModal,panelToRender } = this.props
    let closeModal = () => this.setState({ open: showModal })

    return (
      <div>
        <Modal
          show={showModal}
          onHide={closeModal}
          role="document"
          aria-labelledby="ModalHeader">
          <Modal.Header closeButton>
            <Modal.Title id='ModalHeader'>A Title Goes here</Modal.Title>
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
const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._profiles.type,
    showModal: state._profiles.showModal,
    panelToRender: state._profiles.panel
  }
}

const ConnectedModal = connect(mapStateToProps)(RxModal)

export default ConnectedModal;
