import ReducerLogFactory from '../../logging/ReducerLogFactory'

var initialConfigurationPluginpanelState = { type: 'INITIAL_CONFIGURATION_PLUGINPANEL_STATE' }



export default function _configuration_plugin_panel(state = initialConfigurationPluginpanelState,action) {
  var lf = new ReducerLogFactory();
  lf.writeReducerAction('CONFIGURATION_PLUGINPANEL',state,action)
  switch (action.type) {

      case 'PLUGIN_INFO_OBTAINED':
      return {
        type: action.type,
      
      }
      break;
      case 'PLUGIN_TABS_LOADED':
      return {
        type: action.type
      }
      break;
      default:
        return state
  }
}
