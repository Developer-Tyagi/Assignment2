import localDB, { getCollection } from '@services/dexie';

export async function setInspectionTypes(state, types) {
  const inspectionTypesCollection = await getCollection('inspectionTypes');
  const inspectionTypes = types.map(type => ({
    id: type.id,
    ...type.attributes
  }));
  state.inspectionTypes = inspectionTypes;
  if ((await inspectionTypesCollection.count()) > 0) {
    await inspectionTypesCollection.delete([]);
  }
  await localDB.inspectionTypes.bulkAdd(inspectionTypes);
}

export async function setOfflineInspectionTypes(state) {
  state.inspectionTypes = await getCollection('inspectionTypes').toArray();
}

export function setAllUsers(state, Users = []) {
  state.allUsers = Users.map(allUser => ({
    attributes: allUser.attributes,
    name: allUser.attributes.name,
    id: allUser.id
  }));
  state.paidUnpaidUserList = [];
  var paidUsers = [];
  var unPaidUsers = [];
  for (let i = 0; i < state.allUsers.length; i++) {
    if (state.allUsers[i].attributes.roles[0].isPaid == false) {
      unPaidUsers.push(state.allUsers[i].attributes.name);
    } else {
      paidUsers.push(state.allUsers[i].attributes.name);
    }
  }

  var paidUserLength = paidUsers.length;
  var unPaidUserLength = unPaidUsers.length;
  if (paidUserLength > unPaidUserLength) {
    for (let i = 0; i < unPaidUserLength; i++) {
      let paidUnpaid = {
        paidUserName: '',
        unPaidUserName: ''
      };
      paidUnpaid.paidUserName = paidUsers[i];
      paidUnpaid.unPaidUserName = unPaidUsers[i];
      state.paidUnpaidUserList.push(paidUnpaid);
    }
    for (let i = unPaidUserLength; i < paidUserLength; i++) {
      let paidUnpaid = {
        paidUserName: '',
        unPaidUserName: ''
      };
      paidUnpaid.paidUserName = paidUsers[i];
      paidUnpaid.unPaidUserName = '-';
      state.paidUnpaidUserList.push(paidUnpaid);
    }
  } else if (paidUserLength < unPaidUserLength) {
    for (let i = 0; i < paidUserLength; i++) {
      let paidUnpaid = {
        paidUserName: '',
        unPaidUserName: ''
      };
      paidUnpaid.paidUserName = paidUsers[i];
      paidUnpaid.unPaidUserName = unPaidUsers[i];
      state.paidUnpaidUserList.push(paidUnpaid);
    }
    for (let i = paidUserLength; i < unPaidUserLength; i++) {
      let paidUnpaid = {
        paidUserName: '',
        unPaidUserName: ''
      };
      paidUnpaid.paidUserName = '-';
      paidUnpaid.unPaidUserName = unPaidUsers[i];
      state.paidUnpaidUserList.push(paidUnpaid);
    }
  } else {
    for (let i = 0; i < paidUserLength; i++) {
      let paidUnpaid = {
        paidUserName: '',
        unPaidUserName: ''
      };
      paidUnpaid.paidUserName = paidUsers[i];
      paidUnpaid.unPaidUserName = unPaidUsers[i];
      state.paidUnpaidUserList.push(paidUnpaid);
    }
  }
}

//function used to set all the configuration data
export async function setAllConfigurationData(state, data) {
  state.setAllConfigurationData = [];
  state.setAllConfigurationData = data.map(item => ({
    attributes: item.attributes,
    type: item.type,
    id: item.id,
    dataTypeValue: item.attributes.value,
    dataTypeMachineValue: item.attributes.machineValue
  }));
}
