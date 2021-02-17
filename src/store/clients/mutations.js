export function setClients(state, clients) {
  state.clients = clients.map(client => ({
    ...client.attributes,
    id: client.id,
    name: client.attributes.insuredInfo.primary['fname']
  }));
}

export function setEstimators(state, estimators) {
  state.estimators = estimators.map(estimator => ({
    ...estimator.attributes,
    id: estimator.id
  }));
}

export function setClientTypes(state, types) {
  state.clientTypes = types.map(type => ({
    name: type.attributes.value,
    machineValue: type.attributes.machineValue,
    id: type.id
  }));
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
export function setLossCause(state, types) {
  state.lossCauses = types.map(type => ({
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
