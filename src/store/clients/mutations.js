export function setClients(state, clients) {
  state.clients = clients.map(client => ({
    ...client.attributes,
    id: client.id,
    name: client.attributes.insuredInfo.primary["fname"]
  }));
}

export function setClientTypes(state, types) {
  state.contactTypes = types.map(type => ({
    name: type.attributes.value,
    machineName: type.attributes.machineValue
  }));
}
