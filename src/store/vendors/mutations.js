import localDB, { getCollection } from '@services/dexie';

export async function setVendors(state, vendorsData) {
  const vendorsCollection = await getCollection('vendors');
  const vendors = vendorsData.data.map(vendor => ({
    ...vendor.attributes,
    id: vendor.id,
    machineValue: vendor.attributes.machineValue,
    selected: false
  }));
  state.vendors = vendors;
  // if count is greater than zero, and  we are not searching anything in this case only we will delete previous data from local database
  if ((await vendorsCollection.count()) > 0 && !vendorsData.params) {
    await vendorsCollection.delete([]);
  }
  //when we are searching anything, in that case we will not save searched data into local database
  if (!vendorsData.params) {
    await localDB.vendors.bulkAdd(vendors);
  }
  // this condition is for if we are on dashboard i am passing param as hideLoader in that case i am saving the data into localDB so that we can use when we go offline
  if (vendorsData.params == 'hideLoader') {
    await localDB.vendors.bulkAdd(vendors);
  }
}

export async function setOfflineVendors(state, params) {
  state.vendors = await getCollection('vendors').toArray();
  state.vendors.sort(function(a, b) {
    return new Date(b.updated).getTime() - new Date(a.updated).getTime();
  });
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
