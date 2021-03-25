export function setClients(state, clients) {
  state.clients = clients.map(client => ({
    ...client.attributes,
    id: client.id,
    name: client.attributes.insuredInfo.primary['fname']
  }));
}

export function setSelectedEditClient(state, client) {
  state.editSelectedClient = client;
}

export function setSelectedSingleClaim(state, claim) {
  state.getSelectedClaim = claim;
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
