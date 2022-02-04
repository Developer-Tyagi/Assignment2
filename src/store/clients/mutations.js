import localDB, { getCollection } from '@services/dexie';

export async function setClients(state, clientsData) {
  const clientsCollection = await getCollection('clients');
  const clients = clientsData.data.map(client => ({
    ...client.attributes,
    id: client.id,
    name:
      client.attributes.insuredInfo.primary.fname +
      ' ' +
      client.attributes.insuredInfo.primary.lname
  }));
  //Initially we Clear the Client data  otherwise this will create duplications of Client and give an error , this scenario is happens when a user is switched from online to offline mode and vice versa.
  if (clientsData.params.offset == 0) state.clients = [];
  if (clientsData.params.limit == 0 && clientsData.params.offset == 0) {
    // this condition is used to store the entire data in local DB which is used for the offline mode.
    await clientsCollection.delete([]);

    await localDB.clients.bulkAdd(clients);
  } else if (clientsData.params.name) {
    // this condition is use for searching clients item.
    state.clients = clients;
  }

  // this condition is for when we user start scrolling down for more than one time.
  else state.clients = state.clients.concat(clients);

  if ((await clientsCollection.count()) > 0 && !clientsData.params) {
    await clientsCollection.delete([]);
  }
}

export async function setOfflineClients(state) {
  let claims = await getCollection('claims').toArray();
  let clients = await getCollection('clients').toArray();

  var claimsForClient;
  clients.forEach(client => {
    if (client.offline) {
      claimsForClient = claims.filter(claim => claim.client.id === client.id);
      localDB.clients
        .where('id')
        .equals(client.id)
        .modify({
          meta: {
            openClaims: claimsForClient.length,
            totalClaims: claimsForClient.length
          }
        });
    }
  });

  state.clients = await getCollection('clients').toArray();
  state.clients.sort(function (a, b) {
    return new Date(b.updated).getTime() - new Date(a.updated).getTime();
  });
}

export async function setSelectedSingleClaim(state, claim) {
  if (claim && claim.id) {
    state.getSelectedClaim = {
      ...claim.attributes
    };
  }
}

export function setSelectedClientProperty(state, client) {
  state.setClientProperty = client;
}

export async function setEstimators(state, estimatorsData) {
  const estimatorsCollection = await getCollection('estimators');
  const estimators = estimatorsData.map(estimator => ({
    ...estimator.attributes,
    id: estimator.id
  }));
  state.estimators = estimators;
  if ((await estimatorsCollection.count()) > 0) {
    await estimatorsCollection.delete([]);
  }
  await localDB.estimators.bulkAdd(estimators);
}

export async function setOfflineEstimators(state) {
  state.estimators = await getCollection('estimators').toArray();
}

export function setSelectedClientId(state, id) {
  state.selectedClientId = id;
}
export function setSelectedClaimId(state, id) {
  state.selectedClaimId = id;
}

export async function setPropertyTypes(state, types) {
  const propertyTypesCollection = await getCollection('propertyTypes');
  const propertyTypes = types.map(type => ({
    name: type.attributes.value,
    machineValue: type.attributes.machineValue,
    id: type.id,
    type: type.type,
    attributes: type.attributes
  }));
  state.propertyTypes = propertyTypes;
  if ((await propertyTypesCollection.count()) > 0) {
    await propertyTypesCollection.delete([]);
  }
  await localDB.propertyTypes.bulkAdd(propertyTypes);
}

export async function setOfflinePropertyTypes(state) {
  state.propertyTypes = await getCollection('propertyTypes').toArray();
}

export async function setPolicyTypes(state, types) {
  const policyTypesCollection = await getCollection('policyTypes');
  const policyTypes = types.map(type => ({
    name: type.attributes.value,
    machineValue: type.attributes.machineValue,
    id: type.id,
    type: type.type,
    attributes: type.attributes
  }));
  state.policyTypes = policyTypes;
  if ((await policyTypesCollection.count()) > 0) {
    await policyTypesCollection.delete([]);
  }
  await localDB.policyTypes.bulkAdd(policyTypes);
}

export async function setOfflinePolicyTypes(state) {
  state.policyTypes = await getCollection('policyTypes').toArray();
}

export async function setClaimReasons(state, reasons) {
  const claimReasonsCollection = await getCollection('claimReasons');
  const claimReasons = reasons.map(reason => ({
    id: reason.id,
    name: reason.attributes.value,
    machineValue: reason.attributes.machineValue,
    type: reason.type,
    attributes: reason.attributes
  }));
  state.claimReasons = claimReasons;
  if ((await claimReasonsCollection.count()) > 0) {
    await claimReasonsCollection.delete([]);
  }
  await localDB.claimReasons.bulkAdd(claimReasons);
}

export async function setOfflineClaimReasons(state) {
  state.claimReasons = await getCollection('claimReasons').toArray();
}

export async function setClaimSeverities(state, types) {
  const claimSeveritiesCollection = await getCollection('claimSeverities');
  const claimSeverity = types.map(type => ({
    name: type.attributes.value,
    machineValue: type.attributes.machineValue,
    id: type.id,
    type: type.type,
    attributes: type.attributes
  }));
  state.claimSeverity = claimSeverity;
  if ((await claimSeveritiesCollection.count()) > 0) {
    await claimSeveritiesCollection.delete([]);
  }
  await localDB.claimSeverities.bulkAdd(claimSeverity);
}

export async function setOfflineClaimSeverities(state) {
  state.claimSeverity = await getCollection('claimSeverities').toArray();
}

export async function setPolicyCategories(state, types) {
  const policyCategoriesCollection = await getCollection('policyCategories');
  const policyCategories = types.map(type => ({
    name: type.attributes.value,
    machineValue: type.attributes.machineValue,
    id: type.id,
    type: type.type,
    attributes: type.attributes
  }));
  state.policyCategories = policyCategories;
  if ((await policyCategoriesCollection.count()) > 0) {
    await policyCategoriesCollection.delete([]);
  }
  await localDB.policyCategories.bulkAdd(policyCategories);
}

export async function setOfflinePolicyCategories(state) {
  state.policyCategories = await getCollection('policyCategories').toArray();
}

export function setSelectedClient(state, client) {
  state.selectedClient = client;
}
export function setClientStatistics(state, clientStatic) {
  state.clientStatic = {
    ...clientStatic.attributes
  };
}

export function setSelectedEditClient(state, client) {
  state.editSelectedClient = client;
}
export async function setSelectedClientOffline(state, client) {
  if (client && client.id) {
    state.editSelectedClient = {
      ...client
    };
  }
}
