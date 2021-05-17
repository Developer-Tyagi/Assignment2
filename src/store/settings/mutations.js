import localDB, { getCollection } from '@services/dexie';

export async function setInspectionTypes(state, types) {
  const inspectionTypesCollection = await getCollection('activeLeads');
  const inspectionTypes = types.map(type => ({
    ...type.attributes,
    id: type.id
  }));
  state.inspectionTypes = inspectionTypes;
  if ((await inspectionTypesCollection.count()) > 0) {
    await inspectionTypesCollection.delete([]);
  }
  await localDB.inspectionTypes.bulkAdd(inspectionTypes);
}

export function setAllUsers(state, Users) {
  state.allUsers = Users.map(allUser => ({
    attributes: allUser.attributes,
    name: allUser.attributes.name,
    id: allUser.id
  }));
}
