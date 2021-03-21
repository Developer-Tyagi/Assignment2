export function setActionOverDues(state, actionOverDues) {
  state.actionOverDues = actionOverDues.map(actionOverDues => ({
    ...actionOverDues.attributes,
    value: actionOverDues.attributes.additionalActions,

    id: actionOverDues.id,
    machineValue: actionOverDues.attributes.machineValue,
    subOptions: actionOverDues.attributes.additionalActions
  }));
}
