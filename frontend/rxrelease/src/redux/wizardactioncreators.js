import  * as wizardRequests from '../rest/requests/wizardrequests'
import LogFactory from '../logging/LogFactory'
import GlobalSettings from '../config/global';
import * as utils from '../lib/json/utils'


var settings = new GlobalSettings();
var acwLogger = new LogFactory().createLogger("ACTIONCREATOR","WIZARD")

export function loadNextScreen(currentItem) {
  return {
    type: 'LOAD_NEXT_SCREEN',
    current_item: currentItem
  }
}

export function storeWizardData(wizarddata,currentItem) {
  return {
    type: 'STORE_WIZARD_DATA',
    data: wizarddata,
    current_item: currentItem
  }
}

export function loadWizardState(wizard_id) {
  return function (dispatch) {

    wizardRequests.getWizardState(wizard_id).then(function(response) {

       var data = utils.normalizeJson(response.data)
       acwLogger.trace("wizard_state data: ")
       acwLogger.traceObject(data)
      dispatch(wizardStateLoaded(data))
    })

  }
}
export function wizardStateLoaded(data) {
  return {
    type: 'WIZARD_STATE_LOADED',
    wizard_state: data
  }
}

export function updateWizardState(wizard_id,wizard_status) {

  return function (dispatch) {
    wizardRequests.getWizardState(wizard_id).then(function(response) {

      var data = utils.normalizeJson(response.data)

      acwLogger.trace("recieving wizard data")
      acwLogger.traceObject(data)

      acwLogger.debug("wizard id")
      acwLogger.debug(data['id'])
      return wizardRequests.putWizardState(data['id'],wizard_id,wizard_status)
    })
  }
}

export function wizardStateUpdated() {
  return {
    type: 'WIZARD_STATE_UPDATED'
  }
}

export function waitForSave() {
  return {
    type: 'WAIT_FOR_SAVE'
  }
}
export function waitForLoad() {
  return {
    type: 'WAIT_FOR_LOAD'
  }
}

export function loadPreviousWizardItem() {
  return {
    type: 'LOAD_PREVIOUS_WIZARD_ITEM'
  }
}

export function storeWizardDataSuccess(currentItem,wizard_data) {
  return {
    type: 'STORE_WIZARD_DATA_SUCCESS',
    current_item: currentItem,
    wizard_data: wizard_data
  }
}

export function loadNextWizardItem() {
  return {
    type: 'LOAD_NEXT_WIZARD_ITEM'
  }
}
