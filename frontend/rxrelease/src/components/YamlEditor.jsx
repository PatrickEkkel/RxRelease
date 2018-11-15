import React from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2'
import yaml from 'codemirror/mode/yaml/yaml'
class YAMLEditor extends React.Component {

constructor() {
  super()
}

getCode() {
  return this.props.code
}
shouldComponentUpdate(nextProps, nextState) {
  this.setState({blargh: ''})
  return true
}
render() {
  var options = {
      lineNumbers: true,
      mode: 'yaml',
      theme: 'blackboard'
    };
  return <CodeMirror value={this.props.code} onChange={this.updateCode} options={options} />
//  return <input id='test' value={this.props.code}/>
}


}

export default YAMLEditor;
