import localDB, { getCollection } from '@services/dexie';

export async function setCarriers(state, carriersData) {
  const carriersCollection = await getCollection('carriers');
  const carriers = carriersData.data.map(carrier => ({
    ...carrier.attributes,
    id: carrier.id
  }));

  if (carriersData.params.limit == 0 && carriersData.params.offset == 0) {
    // this condition is used to store the entire data in local DB which is used for the offline mode.
    await localDB.carriers.bulkAdd(carriers);
  } else if (carriersData.params.name) {
    // this condition is use for searching carrier item.
    state.carriers = carriers;
  } else if (
    carriersData.params.limit == 20 && // this condition is use when the user first time open  the carrier list page, in that case we fetch the data set of given limit , but first we need to clear our variable
    carriersData.params.offset == 0
  ) {
    state.carriers = [];
    state.carriers = state.carriers.concat(carriers);
  } else {
    // this condition is for when we user start scrolling down for more than more time.
    state.carriers = state.carriers.concat(carriers);
  }
  if ((await carriersCollection.count()) > 0 && !carriersData.params) {
    await carriersCollection.delete([]);
  }
  // if (!carriersData.params) {
  //   await localDB.carriers.bulkAdd(carriers);
  // }
}

export async function setOfflineCarriers(state) {
  state.carriers = await getCollection('carriers').toArray();
  state.carriers.sort(function (a, b) {
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
