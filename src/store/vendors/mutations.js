export function setvendors(state, vendors) {
    state.vendors = vendors.map(vendor => ({...vendor.attributes, id: vendor.id, selected: false }));
}

export function setvendorsIndustries(state, vendorIndustries) {
    state.vendorIndustries = vendorIndustries.map(vendorIndustry => ({ name: vendorIndustry.attributes.name, id: vendorIndustry.id }));
}