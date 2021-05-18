import localDB, { getCollection } from '@services/dexie';

export function setLoading(state, value) {
  state.showLoading = value;
}

export function setClientTypes(state, types) {
  state.clientTypes = types.map(type => ({
    name: type.attributes.value,
    machineValue: type.attributes.machineValue,
    id: type.id
  }));
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

export function setRoles(state, roles) {
  state.roleTypes = roles.map(type => ({
    name: type.attributes.value,
    machineValue: type.attributes.machineValue,
    id: type.id,
    isPaid: type.attributes.isPaid
  }));
}

export function setNetworkStatus(state, isOnline) {
  state.isOnline = isOnline;
  console.log(state.isOnline);
}
