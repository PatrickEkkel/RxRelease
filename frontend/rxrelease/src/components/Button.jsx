 import React from 'react';

// export default React.createClass({

class Button extends React.Component {
  constructor() {
    super()
  }
   getTitle() {
     return this.props.title || "empty";
   }
   getModalTarget() {
    return this.props.modal_target || "empty"
   }
   getDataToggle() {
     return this.props.data_toggle || "empty"
   }
   onClick() {
     this.props.onClick();
   }

   getClassName() {
     return this.props.css || "btn btn-primary"
   }
   render() {
     var currentContext = this;
     var className = this.getClassName();
 return <button className={className} onClick={currentContext.onClick.bind(currentContext)}>{this.getTitle()}</button>
   }
 }


 export default Button
