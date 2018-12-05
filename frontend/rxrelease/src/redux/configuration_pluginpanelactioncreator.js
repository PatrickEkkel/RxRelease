import Axios from 'axios';
import  * as jsonUtils from '../lib/json/utils'


export function pluginTabsLoaded() {
  return {
    type: 'PLUGIN_TABS_LOADED'
  }
}

export function pluginInfoObtained() {
  return {
    type: 'PLUGIN_INFO_OBTAINED',
    //obtained_plugins: obtained_plugins
  }

}
