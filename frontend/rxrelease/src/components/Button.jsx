 import React from 'react';

 export default React.createClass({
   getTitle: function() {
     return this.props.title || "empty";
   },
   getModalTarget() {
    return this.props.modal_target || "empty"
   },
   getDataToggle() {
     return this.props.data_toggle || "empty"
   },

   render: function() {
 return <button className="btn btn-primary" data-toggle={this.getDataToggle()} data-target={this.getModalTarget()}>{this.getTitle()}</button>
   }
 });
