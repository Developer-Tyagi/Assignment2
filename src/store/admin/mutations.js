import localDB, { getCollection } from '@services/dexie';

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
    id: workaction.id,
    name: workaction.attributes.name,
    createdDesc: workaction.attributes.createdDesc,
    ...workaction.attributes
  }));
}
export async function setOfficeTaskActions(state, actionsData) {
  const officeTaskActionsCollection = await getCollection('officeTasks');
  const officeTaskActions = actionsData.map(action => ({
    id: action.id,
    ...action.attributes
  }));
  state.officeTaskActions = officeTaskActions;
  if ((await officeTaskActionsCollection.count()) > 0) {
    await officeTaskActionsCollection.delete([]);
  }
  await localDB.officeTasks.bulkAdd(officeTaskActions);
}

export async function setOfflineOfficeTaskActions(state) {
  state.officeTaskActions = await getCollection('officeTasks').toArray();
}
