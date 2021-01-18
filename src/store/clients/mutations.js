export function setClients(state, clients) {
  state.clients = clients.map(client => ({
    ...client.attributes,
    id: client.id,
    name: client.attributes.insuredInfo.primary["fname"]
  }));
}

export function setClientTypes(state, types) {
  state.clientTypes = types.map(type => ({
    name: type.attributes.value,
    machineName: type.attributes.machineValue,
    id: type.id
  }));
}
export function setPropertyTypes(state, types) {
  state.propertyTypes = types.map(type => ({
    name: type.attributes.value,
    machineName: type.attributes.machineValue,
    id: type.id
  }));
}

export function setClaimReasons(state, types) {
  state.claimReasons = types.map(type => ({
    name: type.attributes.value,
    machineName: type.attributes.machineValue,
    id: type.id
  }));
}
export function setLossCause(state, types) {
  state.lossCauses = types.map(type => ({
    name: type.attributes.value,
    machineName: type.attributes.machineValue,
    id: type.id
  }));
}

export function setClaimSeverity(state, types) {
  state.claimSeverity = types.map(type => ({
    name: type.attributes.value,
    machineName: type.attributes.machineValue,
    id: type.id
  }));
}
