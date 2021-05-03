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

export function setAllWorkFlow(state, allActions) {
  state.allAction = allActions.map(workaction => ({
    name: workaction.attributes.name,
    createdDesc: workaction.attributes.createdDesc
  }));
}

export function setOfficeTaskActions(state, actions) {
  state.officeTaskActions = actions.map(action => ({
    id: action.id,
    ...action.attributes
  }));
}
