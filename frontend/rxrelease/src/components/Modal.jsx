import React from 'react';

class  Modal  extends React.Component {
  constructor() {
    super()
    this.state = {
      body: "empty",
      refelement: "empty"
    }
  }
  closeModal() {
    // Add in some hacky JQuery to get the job done
    $('#myModal').modal('hide');
      //this.setState({modalState: "modal"});
  }
  getModalState() {
    return this.state.modalState;
  }
  getModalId() {
    return this.props.modalId || null;
  }
  getBodyRef() {
    return this.state.refelement;
  }
  getBody() {
     var returnValue = "";

     if(this.state.body == "empty") {
       this.state.body = this.props.body;
       returnValue = this.state.body;
     }
     else {
       returnValue = this.state.body;
     }
     return returnValue;
  }
  getCloseButtonText() {
    return this.props.closeButtonText || "Close";
  }
  getSaveButtonText() {
    return this.props.saveButtonText || "Save Changes";
  }
  getTitle() {
    return this.props.title || "Empty"
  }
  setBody(element) {
    this.setState({body: element});
  }
  onClickEvent()  {
    if(this.props.onclick != null) {
      this.props.onclick();
    }
  }
  render() {
    var currentContext = this
  return  <div className="modal fade" id={this.getModalId()} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title" id="myModalLabel">{this.getTitle()}</h4>
          </div>
          <div className="modal-body">
            {this.getBody()}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal" key={this.getModalId() + "_Close"}>{this.getCloseButtonText()}</button>
            <button type="button" className="btn btn-primary" key={this.getModalId() + "_Save"} onClick={currentContext.onClickEvent.bind(currentContext) } key={this.getModalId() + "_Save"}>{this.getSaveButtonText()}</button>
          </div>
        </div>
      </div>
    </div>
  }
}

export default Modal;
