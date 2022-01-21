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

//assignedTO search data

export async function assignedTOSearchData(state, data) {
  state.assignedToData = [];
  var combinedData1 = [];
  var combinedData2 = [];
  var combinedData = [];
  if (data.attributes.users && data.attributes.roles) {
    this.combinedData1 = data.attributes.roles.map(item => ({
      name: item.value + '[Roles]',
      id: item.machineValue,
      type: 'roles'
    }));
    this.combinedData2 = data.attributes.users.map(item => ({
      name: item.name + '[User]',
      id: item.id,
      type: 'users'
    }));
    this.combinedData = this.combinedData1.concat(this.combinedData2);
    state.assignedToData = this.combinedData;
  } else if (data.attributes.users && data.attributes.users.length > 0) {
    state.assignedToData = data.attributes.users.map(item => ({
      name: item.name + '[User]',
      id: item.id,
      type: 'users'
    }));
  } else if (data.attributes.roles && data.attributes.roles.length > 0)
    state.assignedToData = data.attributes.roles.map(item => ({
      name: item.value + '[Roles]',
      id: item.machineValue,
      type: 'roles'
    }));
}
