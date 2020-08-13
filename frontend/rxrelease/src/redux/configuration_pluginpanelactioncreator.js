import Axios from 'axios';
import  * as jsonUtils from '../lib/json/utils'


export function initalState() {
  return {
    type: 'INITIAL_CONFIGURATION_PLUGINPANEL_STATE'
  }
}
export function pluginTabsLoaded() {
  return {
    type: 'PLUGIN_TABS_LOADED'
  }
}

export function pluginInfoObtained(obtained_plugins) {
  return {
    type: 'PLUGIN_INFO_OBTAINED',
    plugins: obtained_plugins
  }

}
