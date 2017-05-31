import React from 'react';

class  ComponentContainer  extends React.Component {
  constructor() {
    super()
    this.state = {
      innerComponent: "empty",
    }
  }
  setInnerComponent(newComponent) {
    this.setState({innerComponent: newComponent})
  }
  getInnerComponent() {
    if(this.state.innerComponent ==  "empty") {
      this.setInnerComponent(this.props.innerComponent)
    }
    return this.state.innerComponent;
  }

  render() {
    return <div>{this.getInnerComponent()}</div>
  }
}
export default ComponentContainer;
