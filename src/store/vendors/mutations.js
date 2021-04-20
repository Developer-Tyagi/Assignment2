export function setvendors(state, vendors) {
  state.vendors = vendors.map(vendor => ({
    ...vendor.attributes,
    id: vendor.id,
    machineValue: vendor.attributes.machineValue,
    selected: false
  }));
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
