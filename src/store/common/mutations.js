import localDB, { getCollection } from '@services/dexie';
import { startState } from 'app/public/ckeditor/samples/toolbarconfigurator/lib/codemirror/codemirror';

export function setLoading(state, value) {
  state.showLoading = value;
}

export async function setClientTypes(state, typesData) {
  const clientTypesCollection = await getCollection('clientTypes');
  const types = typesData.map(types => ({
    name: types.attributes.value,
    id: types.id,
    type: types.type,
    machineValue: types.attributes.machineValue,
    attributes: types.attributes
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
    type: title.type,
    machineValue: title.attributes.machineValue,
    attributes: title.attributes
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
    machineValue: type.attributes.machineValue,
    type: type.type,
    attributes: type.attributes
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
  state.plans = plans.map(plan => ({
    ...plan.attributes,
    id: plan.attributes.id
  }));
}
export function setOrganization(state, org) {
  state.organization = org.attributes;
}

export async function setLossCause(state, causes) {
  const lossCausesCollection = await getCollection('lossCauses');
  const lossCauses = causes.map(cause => ({
    name: cause.attributes.value,
    machineValue: cause.attributes.machineValue,
    id: cause.id,
    type: cause.type,
    attributes: cause.attributes
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
    isPaid: type.attributes.isPaid,
    attribute: type.attributes
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
    name: type.attributes.desc,
    machineValue: type.attributes.machineValue,
    id: type.id,
    category: type.attributes.category
  }));
}

export async function setAllTemplate(state, templates) {
  // state.templates = templates.map(type => ({
  //   name: type.attributes,
  //   id: type.id
  // }));
  ////////////////
  const templateTypesCollection = await getCollection('allTemplates');
  const types = templates.map(types => ({
    name: types.attributes,
    id: types.id
  }));
  state.templates = types;

  const temp = await templateTypesCollection.count();

  if ((await templateTypesCollection.count()) > 0) {
    await templateTypesCollection.delete([]);
  }

  await localDB.allTemplates.bulkAdd(types);
}
// setOfflineTemplates;
export async function setOfflineTemplates(state) {
  state.templates = await getCollection('allTemplates').toArray();
}

export function setTemplateToken(state, token) {
  state.tokens = token;
}

export function setAccess(state, access) {
  state.pageAccess = access.attributes.pages;
}

export function setNetworkStatus(state, isOnline) {
  state.isOnline = isOnline;
}
export function setDeviceStatus(state, deviceStatus) {
  state.isMobileResolution = deviceStatus;
}
export function setEditOfflineClientIcon(state, isOfflineClientEdit) {
  state.isOfflineClientEdit = isOfflineClientEdit;
}
export function isLastRouteEdit(state, isEdit) {
  state.isEdit = isEdit;
}
export async function setOfflineUsers(state) {
  state.allUsers = await getCollection('allUsers').toArray();
}

export async function setNotificationRouteTo(state, route) {
  state.notificationRouteTo = route;
}

// this function will take the value 'true' if we redirect from the camera option in dashboard page ,and will false when we press back button ,
//this helps us to check weather the user rediect from the camera option  or scan and upload option from the dashboard page.
export async function setCameraIcon(state, toShowCamera) {
  state.toShowCamera = toShowCamera;
}

//this function is used to check if the routing is done from Lead-Dashboard page of Main Dashboard page. If this is routing from Lead-Dashboard Page then we update `routeFromLeadDashboard` as true, and it become false again when we move back to Main-dashboard page
export async function leadDashboardRoute(state, isLeadDashboard) {
  state.routeFromLeadDashboad = isLeadDashboard;
}
// this function is used for getting a paid user data.
export function setPaidUsers(state, data) {
  state.paidUsers = data.map(allUser => ({
    attributes: allUser.attributes,
    name: allUser.attributes.name,
    id: allUser.id
  }));
}

export async function setPlanInfo(state, planInfo) {
  state.planInfo = planInfo;
}

// this function is used to open the tab of suboption of web menu bar
export function webMenuSubOptionTab(state, key) {
  startState.webSubOptionMenuTab = '';
  state.webSubOptionMenuTab = key;
}
