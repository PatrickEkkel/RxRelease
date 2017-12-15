import React from 'react';


class BasicRxPanel extends React.Component {


constructor() {
super()
}


changeAttr(e) {
  this.setState({[e.target.id]: e.target.value});
}

}

export default BasicRxPanel;
