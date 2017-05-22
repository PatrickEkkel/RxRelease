 import React from 'react';

 export default React.createClass({
   getTitle: function() {
     return this.props.title || "empty";
   },
   render: function() {
 return <button className="btn btn-primary">{this.getTitle()}</button>
   }
 });
