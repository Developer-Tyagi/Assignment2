import localDB, { getCollection } from '@services/dexie';

export async function setVendors(state, vendorsData) {
  const vendorsCollection = await getCollection('vendors');
  const vendors = vendorsData.map(carrier => ({
    ...vendor.attributes,
    id: vendor.id,
    machineValue: vendor.attributes.machineValue,
    selected: false
  }));
  state.vendors = vendors;
  if ((await vendorsCollection.count()) > 0) {
    await vendorsCollection.delete([]);
  }
  await localDB.vendors.bulkAdd(vendors);
}

export async function setOfflinevendors(state) {
  state.vendors = await getCollection('vendors').toArray();
}

export function setSelectedVendor(state, vendor) {
  state.selectedVendor = {
    id: vendor.id,
    ...vendor.attributes
  };
}
export function setVendorPersonnel(state, vendor) {
  state.vendorPersonnel = {
    id: vendor.id,
    ...vendor.attributes
  };
}

export function setvendorsIndustries(state, vendorIndustries) {
  state.vendorIndustries = vendorIndustries.map(vendorIndustry => ({
    machineValue: vendorIndustry.attributes.machineValue,
    name: vendorIndustry.attributes.value,
    id: vendorIndustry.id
  }));
}
