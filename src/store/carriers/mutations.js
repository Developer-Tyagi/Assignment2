import localDB, { getCollection } from '@services/dexie';

export async function setCarriers(state, carriersData) {
  const carriersCollection = await getCollection('carriers');
  const carriers = carriersData.data.map(carrier => ({
    ...carrier.attributes,
    id: carrier.id
  }));
  const carriersPagination = carriersData.meta;
  state.carriersPagination = carriersPagination;
  state.carriers = carriers;

  if ((await carriersCollection.count()) > 0 && !carriersData.params) {
    await carriersCollection.delete([]);
  }
  if (!carriersData.params) {
    await localDB.carriers.bulkAdd(carriers);
  }
}

export async function setOfflineCarriers(state) {
  state.carriers = await getCollection('carriers').toArray();
  state.carriers.sort(function(a, b) {
    return new Date(b.updated).getTime() - new Date(a.updated).getTime();
  });
}

export function setSelectedCarrier(state, carrier) {
  state.selectedCarrier = {
    id: carrier.id,
    ...carrier.attributes
  };
}

export function setCarrierPersonnel(state, carrier) {
  state.carrierPersonnel = {
    id: carrier.id,
    ...carrier.attributes
  };
}
export function setSelectedClaimCarrier(state, carrier = {}) {
  state.selectedClaimCarrier = {
    id: carrier.id,
    ...carrier.attributes
  };
}
export function setClaimRoles(state, claimRoles) {
  state.claimRoles = claimRoles.map(role => ({
    machineValue: role.attributes.machineValue,
    name: role.attributes.value,
    id: role.id
  }));
}
