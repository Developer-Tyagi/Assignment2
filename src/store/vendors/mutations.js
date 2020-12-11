export function setvendors(state, vendors) {
    state.vendors = vendors.map(vendor => ({...vendor.attributes, id: vendor.id }));
}

