
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
