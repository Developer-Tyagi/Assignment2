export function setCarriers(state, carriers) {
  state.carriers = carriers.map(carrier => ({
    ...carrier.attributes,
    id: carrier.id
  }));
}
export function setSelectedCarrier(state, carrier) {
  state.selectedCarrier = {
    id: carrier.id,
    ...carrier.attributes
  };
}
