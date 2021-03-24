export function setActionOverDues(state, actionOverDues) {
  state.actionOverDues = actionOverDues.map(actionOverDues => ({
    ...actionOverDues.attributes,

    subOptions: actionOverDues.attributes.additionalActions
  }));
}

export function setActionCompletion(state, actionCompletion) {
  state.actionCompletion = actionCompletion.map(actionCompletion => ({
    ...actionCompletion.attributes,

    subOptions: actionCompletion.attributes.additionalActions
  }));
}

export function setActionReasons(state, actionReason) {
  state.actionReason = actionReason.map(actionReason => ({
    ...actionReason.attributes,

    subOptions: actionReason.attributes.additionalActions
  }));
}

export function setWorkflowAction(state, workflowAction) {
  state.workflowAction = workflowAction.map(action => ({
    value: action.attributes.value,
    id: action.id,
    machineValue: action.attributes.machineValue
  }));
}

export function setAllWorkFlow(state, allAction) {
  state.allAction = allAction.map(workaction => ({
    ...workaction.attributes,
    value: workaction
  }));
}
