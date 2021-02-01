export function setvendors(state, vendors) {
  state.vendors = vendors.map(vendor => ({
    ...vendor.attributes,
    id: vendor.id,
    machineValue: vendor.attributes.machineValue,
    selected: false
  }));
}

export function setvendorsIndustries(state, vendorIndustries) {
  state.vendorIndustries = vendorIndustries.map(vendorIndustry => ({
    machineValue: vendorIndustry.attributes.machineValue,
    name: vendorIndustry.attributes.value,
    id: vendorIndustry.id,
    machineName: vendorIndustry.attributes.machineName
  }));
}
