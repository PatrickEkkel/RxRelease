import ReducerLogFactory from '../../logging/ReducerLogFactory'

var initialYamlEditorState = { type: 'INITIAL_CONFIGURATION_STATE'}

export default function _yamleditor(state = initialYamlEditorState,action) {
  var yelf = new ReducerLogFactory();
  yelf.writeReducerAction('YAML_EDITOR',state,action)
  switch (action.type) {

    case 'INITIAL_YAML_EDITOR_STATE':
      return {
        type: action.type,
      }
   case 'LOAD_YAML_FILE':
      return {
        type: action.type,
        yaml_contents: action.yaml_contents
      }
   case 'UPDATE_YAML_FILE':
      return {
        type: action.type,
        yaml_contents: action.yaml_contents
      }
      default:
        return state
 }
}
