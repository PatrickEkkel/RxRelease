import LogFactory from '../../logging/LogFactory';
import BasicRxPanel from './BasicRxPanel';
import React from 'react';
import { connect } from 'react-redux'



class WizardBasePanel extends BasicRxPanel {

constructor(component,subcomponent,step) {
  super(component,subcomponent,{stepCompleted: false,current_step: step})

  this.getLogger().debug("step value for wizardPanel: " + step)
  this.setState();
  this.getLogger().trace("state object in wizardPanel: " + this.state.current_step);
  this.getLogger().traceObject(this.state)
}

waitForSave(nextProps) {
  throw new Error('You have to implement the method waitForSave!');
}
waitForLoad(nextProps) {
  throw new Error('You have to implement the method waitForLoad!');
}

stepCompleted() {
  throw new Error('You have to implement the method stepCompleted!');
}

storeWizardData(current_wizard_item) {
    throw new Error('You have to implement the method storeWizardData!');
}
loadNextScreen(nextProps) {
  throw new Error('You have to implement the method storeWizardData!');
}
wizardStepSuccess(nextProps) {
  throw new Error('You have to implement the method wizardStepSuccess')
}

storeWizardDataForStep(type,current_wizard_item) {

  this.getLogger().trace("state object");
  this.getLogger().traceObject(this.state)
  this.getLogger().debug("storeWizardDataForStep called with type: " + type + " current_wizard_item: " + current_wizard_item)
  this.getLogger().debug("current state value for step: " + this.state.current_step)
  if(type == 'STORE_WIZARD_DATA' && current_wizard_item == this.state.current_step) {
    this.storeWizardData(current_wizard_item)
  }
}

componentWillReceiveProps(nextProps) {
this.getLogger().debug("WizardBasePanel recieved nextProps with type: " + nextProps.type + " and current_wizard_item: " + nextProps.current_wizard_item + " and current_step: " + this.state.current_step);
var type = nextProps.type;
var current_wizard_item = nextProps.current_wizard_item;

if(type == 'WAIT_FOR_SAVE') {
  this.waitForSave(nextProps);
}
else if(type == 'WAIT_FOR_LOAD') {
  this.waitForLoad(nextProps);
}
else if(type == 'STORE_WIZARD_DATA_SUCCESS') {
  this.wizardStepSuccess(nextProps)
}
else if(type == 'LOAD_NEXT_SCREEN' && current_wizard_item == (this.state.current_step-1)) {
  this.getLogger().debug("LOAD_NEXT_SCREEN called with current_wizard_item: " + current_wizard_item)
  this.loadNextScreen(nextProps)
}

this.storeWizardDataForStep(type,current_wizard_item)
//if(this.state.stepCompleted) {
//  this.stepCompleted()
//}

}

}

WizardBasePanel.STEP1 = 1;
WizardBasePanel.STEP2 = 2;
WizardBasePanel.STEP3 = 3;
WizardBasePanel.STEP4 = 4;
WizardBasePanel.STEP5 = 5;

//const connectedWizardBasePanel = connect(mapStateToProps)(WizardBasePanel)
export default WizardBasePanel
