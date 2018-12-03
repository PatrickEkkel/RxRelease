import Axios from 'axios';
import  * as jsonUtils from '../lib/json/utils'
//import  * as moduleRequests from '../rest/requests/modulerequests'

export function loadYamlFile(_yaml_contents) {

return {
  type: 'LOAD_YAML_FILE',
  yaml_contents: _yaml_contents
}

}

export function updateYamlFile(_yaml_contents) {

  return {
    type: 'UPDATE_YAML_FILE',
    yaml_contents: _yaml_contents
  }


}
