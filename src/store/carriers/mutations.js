import localDB, { getCollection } from '@services/dexie';

export async function setCarriers(state, carriersData) {
  const carriersCollection = await getCollection('carriers');

  const carriers = carriersData.data.map(carrier => ({
    ...carrier.attributes,
    id: carrier.id
  }));
  //Initially we Clear the Carrier data  otherwise this will create duplications of carriers and give an error , this scenario is happens when a user is switched from online to offline mode and vice versa.
  if (carriersData.params.offset == 0) state.carriers = [];
  if (carriersData.params.limit == 0 && carriersData.params.offset == 0) {
    // this condition is used to store the entire data in local DB which is used for the offline mode.
    await carriersCollection.delete([]);

    await localDB.carriers.bulkAdd(carriers);
  } else if (carriersData.params.name) {
    // this condition is use for searching carrier item.
    state.carriers = carriers;
  }
  // this condition is for when we user start scrolling down for more than one time.
  else state.carriers = state.carriers.concat(carriers);

  //this condition is used for the clearing of local DB data, so that no duplication is happens.
  if ((await carriersCollection.count()) > 0 && !carriersData.params) {
    await carriersCollection.delete([]);
  }
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
