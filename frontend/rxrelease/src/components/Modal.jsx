import React from 'react';

export default React.createClass({

  getModalId: function() {
    return this.props.modalId || null;
  },
  getCloseButtonText: function() {
    return this.props.closeButtonText || "Close";
  },
  getSaveButtonText: function() {
    return this.props.saveButtonText || "Save Changes";
  },
  render: function() {
  return  <div className="modal fade" id={this.getModalId()} tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title" id="myModalLabel">Modal title</h4>
          </div>
          <div className="modal-body">
            condor cunt!
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal" key={this.getModalId() + "_Close"}>{this.getCloseButtonText()}</button>
            <button type="button" className="btn btn-primary" key={this.getModalId() + "_Save"} onClick={() => this.props.vote(this.getModalId() + "_Save")}>{this.getSaveButtonText()}</button>
          </div>
        </div>
      </div>
    </div>
  }
});
