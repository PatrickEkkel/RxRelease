import React from 'react';
import ReactDOM from 'react-dom';


class InfoBox extends React.Component {

constructor() {
  super()
  this.state = {
    show_infobox: false
  }
}

componentWillReceiveProps(nextProps) {
  var currentContext = this;

  this.setState({show_infobox: true})

    setTimeout(function() {
      currentContext.setState({show_infobox: false})
    }.bind(this),3500)

}
componentDidMount() {
var currentContext = this
this.setState({show_infobox: currentContext.props.success })

}


render() {
  return <div>{ this.props.success && this.state.show_infobox ? <div className="alert alert-success fade in" >Changes saved succesfully</div> : null}
  { this.props.success === false && this.state.show_infobox ? <div className="alert alert-danger fade in" >Something went wrong while saving</div> : null}
  </div>
}

}

export default InfoBox;
