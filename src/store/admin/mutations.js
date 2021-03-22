export function setActionOverDues(state, actionOverDues) {
  state.actionOverDues = actionOverDues.map(actionOverDues => ({
    ...actionOverDues.attributes,
    value: actionOverDues.attributes.additionalActions,

    id: actionOverDues.id,
    machineValue: actionOverDues.attributes.machineValue,
    subOptions: actionOverDues.attributes.additionalActions
  }));
}
export function setActionCompletion(state, actionCompletion) {
  state.actionCompletion = actionCompletion.map(actionCompletion => ({
    ...actionCompletion.attributes,
    value: actionCompletion.attributes.additionalActions,

    id: actionCompletion.id,
    machineValue: actionCompletion.attributes.machineValue,
    subOptions: actionCompletion.attributes.additionalActions
  }));
}
export function setActionReasons(state, actionReason) {
  state.actionReason = actionReason.map(actionReason => ({
    ...actionReason.attributes,
    value: actionReason.attributes.machineValue,

    id: actionReason.id,
    machineValue: actionReason.attributes.machineValue,
    subOptions: actionReason.attributes.additionalActions
  }));
}
