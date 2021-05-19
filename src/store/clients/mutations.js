import localDB, { getCollection } from '@services/dexie';

export async function setClients(state, clientsData) {
  const clientsCollection = await getCollection('clients');
  const clients = clientsData.map(client => ({
    ...client.attributes,
    id: client.id,
    name: client.attributes.insuredInfo.primary['fname']
  }));
  state.clients = clients;
  if ((await clientsCollection.count()) > 0) {
    await clientsCollection.delete([]);
  }
  await localDB.clients.bulkAdd(clients);
}

export async function setOfflineClients(state) {
  state.clients = await getCollection('clients').toArray();
}

export function setSelectedEditClient(state, client) {
  state.editSelectedClient = client;
}

export function setSelectedSingleClaim(state, claim) {
  state.getSelectedClaim = claim.attributes;
}

export function setSelectedClientProperty(state, client) {
  state.setClientProperty = client;
}

export function setEstimators(state, estimators) {
  state.estimators = estimators.map(estimator => ({
    ...estimator.attributes,
    id: estimator.id
  }));
}

export function setSelectedClientId(state, id) {
  state.selectedClientId = id;
}
export function setSelectedClaimId(state, id) {
  state.selectedClaimId = id;
}

export function setPropertyTypes(state, types) {
  state.propertyTypes = types.map(type => ({
    name: type.attributes.value,
    machineValue: type.attributes.machineValue,
    id: type.id
  }));
}
export function setPolicyTypes(state, types) {
  state.policyTypes = types.map(type => ({
    name: type.attributes.value,
    machineValue: type.attributes.machineValue,
    id: type.id
  }));
}

export function setClaimReasons(state, types) {
  state.claimReasons = types.map(type => ({
    name: type.attributes.value,
    machineValue: type.attributes.machineValue,

    id: type.id
  }));
}

export function setClaimSeverity(state, types) {
  state.claimSeverity = types.map(type => ({
    name: type.attributes.value,
    machineValue: type.attributes.machineValue,
    id: type.id
  }));
}
export function setPolicyCategory(state, types) {
  state.policyCategories = types.map(type => ({
    name: type.attributes.value,
    machineValue: type.attributes.machineValue,
    id: type.id
  }));
}

export function setSelectedClient(state, client) {
  state.selectedClient = client;
}
export function setClientStatistics(state, clientStatic) {
  state.clientStatic = {
    ...clientStatic.attributes
  };
}
