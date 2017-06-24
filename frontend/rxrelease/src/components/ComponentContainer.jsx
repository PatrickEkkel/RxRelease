import React from 'react';
import ReactDOM from 'react-dom';

class  ComponentContainer  extends React.Component {
  constructor() {
    super()
    this.state = {
      innerComponent: "empty",
      containerState: "init",
    }
  }
  setInnerComponent(newComponent) {
    this.setState({containerState: "reload",innerComponent: newComponent});
  }
  getInnerComponent() {
   if(this.state.containerState == "init") {
     return this.props.children;
   }
   else {
     return this.state.innerComponent;
   }
  }
  reload() {
    this.setState({innerComponent: 'load'} );
  }

  render() {
    return <div>{this.getInnerComponent()}</div>
  }
}
export default ComponentContainer;
