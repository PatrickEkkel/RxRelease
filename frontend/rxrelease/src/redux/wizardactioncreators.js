

export function storeWizardData(wizarddata) {
  return {
    type: 'STORE_WIZARD_DATA',
    data: wizarddata
  }
}

export function loadPreviousWizardItem() {
  return {
    type: 'LOAD_PREVIOUS_WIZARD_ITEM'
  }
}

export function loadNextWizardItem() {
  return {
    type: 'LOAD_NEXT_WIZARD_ITEM'
  }
}
