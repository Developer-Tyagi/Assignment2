import localDB, { getCollection } from '@services/dexie';

export function setLoading(state, value) {
  state.showLoading = value;
}

export async function setClientTypes(state, typesData) {
  const clientTypesCollection = await getCollection('clientTypes');
  const types = typesData.map(types => ({
    name: types.attributes.value,
    id: types.id,
    machineValue: types.attributes.machineValue
  }));
  state.clientTypes = types;
  if ((await clientTypesCollection.count()) > 0) {
    await clientTypesCollection.delete([]);
  }
  await localDB.clientTypes.bulkAdd(types);
}

export async function setOfflineClientTypes(state) {
  state.clientTypes = await getCollection('clientTypes').toArray();
}

export function setUserRoles(state, userRoles) {
  state.userRoles = userRoles.map(type => ({
    name: type.attributes.name,
    id: type.id
  }));
}

export function setNotification(state, value) {
  state.notification = value;
}

export async function setTitles(state, titleData) {
  const titlesCollection = await getCollection('titles');
  const titles = titleData.map(title => ({
    value: title.attributes.value,
    id: title.id,
    machineValue: title.attributes.machineValue
  }));
  state.titles = titles;
  if ((await titlesCollection.count()) > 0) {
    await titlesCollection.delete([]);
  }
  await localDB.titles.bulkAdd(titles);
}

export async function setOfflineTitles(state) {
  state.titles = await getCollection('titles').toArray();
}

export async function setContactTypes(state, types) {
  const contactTypesCollection = await getCollection('contactTypes');
  const contactTypes = types.map(type => ({
    id: type.id,
    name: type.attributes.value,
    machineValue: type.attributes.machineValue
  }));
  state.contactTypes = contactTypes;
  if ((await contactTypesCollection.count()) > 0) {
    await contactTypesCollection.delete([]);
  }
  await localDB.contactTypes.bulkAdd(contactTypes);
}

export async function setOfflineContactTypes(state) {
  state.contactTypes = await getCollection('contactTypes').toArray();
}

export function setPlans(state, plans) {
  state.plans = plans.map(plan => ({ ...plan.attributes, id: plan.id }));
}
export async function setLossCause(state, causes) {
  const lossCausesCollection = await getCollection('lossCauses');
  const lossCauses = causes.map(cause => ({
    name: cause.attributes.value,
    machineValue: cause.attributes.machineValue,
    id: cause.id
  }));
  state.lossCauses = lossCauses;
  if ((await lossCausesCollection.count()) > 0) {
    await lossCausesCollection.delete([]);
  }
  await localDB.lossCauses.bulkAdd(lossCauses);
}

export async function setOfflineLossCauses(state) {
  state.lossCauses = await getCollection('lossCauses').toArray();
}

export async function setRoles(state, roles) {
  const rolesCollection = await getCollection('roles');
  const roleTypes = roles.map(type => ({
    name: type.attributes.value,
    machineValue: type.attributes.machineValue,
    id: type.id,
    permission: type.attributes.permissions,
    isPaid: type.attributes.isPaid
  }));
  state.roleTypes = roleTypes;
  if ((await rolesCollection.count()) > 0) {
    await rolesCollection.delete([]);
  }
  await localDB.roles.bulkAdd(roleTypes);
}

export async function setOfflineRoles(state) {
  state.roleTypes = await getCollection('roles').toArray();
}
export function setPermissions(state, permission) {
  state.permissions = permission.map(type => ({
    name: type.attributes.value,
    machineValue: type.attributes.machineValue,
    id: type.id
  }));
}
export function setTemplateToken(state, token) {
  console.log(token, 76);
  state.tokens = token.data;
}

export function setNetworkStatus(state, isOnline) {
  state.isOnline = isOnline;
  console.log(state.isOnline);
}
