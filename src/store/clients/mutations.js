export function setClients(state, clients) {
  state.clients = clients.map(client => ({
    ...client.attributes,
    id: client.id,
    name: client.attributes.insuredInfo.primary["fname"]
  }));
}
