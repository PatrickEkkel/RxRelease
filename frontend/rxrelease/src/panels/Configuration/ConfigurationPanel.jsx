import React from 'react';
import CodeMirror from 'react-codemirror';
import yaml from 'codemirror/mode/yaml/yaml'
import { connect } from 'react-redux'
import YAMLEditor from '../../components/YamlEditor'

class ConfigurationPanel  extends React.Component {


  constructor() {
    super()


  }
  changeAttr(e) {
    this.props.changeAttr(e);
  }
  updateCode() {

  }
  render() {

  }
  render() {
    var options = {
  			lineNumbers: true,
        mode: 'yaml'
  		};
      //return <div> <CodeMirror value={this.state.code} onChange={this.updateCode} options={options} /></div>
      return <YAMLEditor/>
  }
}

const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._configuration.type,
  }
}

const ConnectedConfigurationPanel = connect(mapStateToProps)(ConfigurationPanel)

export default ConnectedConfigurationPanel;
