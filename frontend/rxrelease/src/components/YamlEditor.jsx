import React from 'react';
import CodeMirror from 'react-codemirror';
import yaml from 'codemirror/mode/yaml/yaml'

class YAMLEditor extends React.Component {

constructor() {
  super()
  this.state = {
    code: ""
  }

}

render() {
  var options = {
      lineNumbers: true,
      mode: 'yaml'
    };

  return <div> <CodeMirror value={this.state.code} onChange={this.updateCode} options={options} /></div>

}


}

export default YAMLEditor;
