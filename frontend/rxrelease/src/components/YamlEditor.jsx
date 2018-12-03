import React from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2'
import { connect } from 'react-redux'
import yaml from 'codemirror/mode/yaml/yaml'
import  * as yamlEditorActionCreator from '../redux/yamleditoractioncreator'
class YAMLEditor extends React.Component {

constructor() {
  super()
  this.state = {
    value: ''
  }
}

changeAttr(e) {
  this.props.changeAttr(e);
}

getCode() {
  return this.props.code
}

update(yaml_contents) {
  this.props.dispatch(yamlEditorActionCreator.loadYamlFile(yaml_contents))
}

componentWillMount() {

  var {type} = this.props;

    switch (type) {
      case 'INITIAL_SALT_CONFIGURATION_STATE':
      break;
    }
}
componentWillReceiveProps(nextProps) {

var type = nextProps.type


switch (type) {
  case 'INITIAL_YAML_EDITOR_STATE':
    break;
  case 'LOAD_YAML_FILE':
    this.setState({value: nextProps.yaml_contents})
    //this.props.dispatch(yamlEditorActionCreator.initialYamlEditorState())
    break;
  case 'UPDATE_YAML_FILE':
   this.setState({value: nextProps.yaml_contents})
}
}
render() {
  var options = {
      lineNumbers: true,
      mode: 'yaml',
      theme: 'blackboard'
    };
  return <CodeMirror value={this.state.value} onBeforeChange={(editor,data,value) => {
      //this.setState({value});
      this.props.dispatch(yamlEditorActionCreator.updateYamlFile(value))
    }}
    onChange={(editor, metadata, value) => {
    }}
    options={options} />
//  return <input id='test' value={this.props.code}/>
}


}

const mapStateToProps = (state/*, props*/) => {
  return {
    type: state._yamleditor.type,
    yaml_contents: state._yamleditor.yaml_contents
  }
}

const ConnectedYAMLEditor = connect(mapStateToProps)(YAMLEditor)

export default ConnectedYAMLEditor;
