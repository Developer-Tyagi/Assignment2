export function setvendors(state, vendors) {
    state.vendors = vendors.map(vendor => ({...vendor.attributes, id: vendor.id }));
}

export function setvendorsIndustries(state, vendorIndustries) {
    state.vendorIndustries = vendorIndustries.map(vendorIndustry => ({...vendorIndustry.attributes, id: vendorIndustry.id }));
}