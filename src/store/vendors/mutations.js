import localDB, { getCollection } from '@services/dexie';

export async function setVendors(state, vendorsData) {
  const vendorsCollection = await getCollection('vendors');
  const vendors = vendorsData.map(vendor => ({
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

export async function setOfflineVendors(state, params) {
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

export async function setvendorsIndustries(state, vendorIndustriesData) {
  const vendorIndusrtyCollection = await getCollection('vendorIndustry');
  const vendorIndustries = vendorIndustriesData.map(vendorIndustry => ({
    machineValue: vendorIndustry.attributes.machineValue,
    name: vendorIndustry.attributes.value,
    id: vendorIndustry.id
  }));
  state.vendorIndustries = vendorIndustries;
  if ((await vendorIndusrtyCollection.count()) > 0) {
    await vendorIndusrtyCollection.delete([]);
  }
  await localDB.vendorIndustry.bulkAdd(vendorIndustries);
}

export async function setOfflineVendorIndustries(state) {
  state.vendorIndustries = await getCollection('vendorIndustry').toArray();
}
