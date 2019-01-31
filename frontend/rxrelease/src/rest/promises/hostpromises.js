import  * as jsonUtils from '../../lib/json/utils'
import  * as settingsRequests from '../../rest/requests/settingsrequests'
import GlobalSettings from '../../config/global';
import SettingsFactory from '../../factories/settingsFactory'
import SettingsCategoryModel from '../../models/dbmodels/settingscategorymodel'
import  * as hostsRequests from '../../rest/requests/hostrequests'
import StateModel from '../../models/dbmodels/statemodel'

export function GET_STATES_FOR_HOST(response,properties) {
  var states = []
  var logger = properties.logger
  var host = properties.current_host

  for(var i=0;i<response.data.length;i++) {
       // State is of type Simple state
     if (response.data[i].simple_state != null) {
            logger.trace("simple_state applied")
            var state_response = response.data[i]
            states.push(StateModel.newSimpleState(state_response.id,state_response.name,state_response.simple_state))
          }
     else if(response.data[i].repeatable_state != null)  {
            logger.trace("repeatable_state applied")
            var state_response  = response.data[i]
            states.push(StateModel.newRepeatableState(state_response.id,state_response.name,state_response.repeatable_state))
     }

        logger.trace("states are loaded")
        logger.traceObject(states)
        host.setStates(states);
    }

    return hostsRequests.getHostById(host.getId())
  }
export function CREATE_HOST_WITH_CONNECTION_CREDENTIALS(response,properties){

  var host = properties.current_host
  var swaLogger = properties.logger

  var settingsfactory = new SettingsFactory();

  var connectioncredentials = settingsfactory.createCredentialSettingFromJson(jsonUtils.normalizeJson(response.data))
  host.setConnectionCredentials(connectioncredentials)

  swaLogger.debug("host to be saved: ")
  swaLogger.traceObject(host)

  return hostsRequests.postHost(host);


}
