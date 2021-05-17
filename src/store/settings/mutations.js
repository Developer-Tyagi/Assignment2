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

export function setAllUsers(state, Users) {
  state.allUsers = Users.map(allUser => ({
    attributes: allUser.attributes,
    name: allUser.attributes.name,
    id: allUser.id
  }));
}
