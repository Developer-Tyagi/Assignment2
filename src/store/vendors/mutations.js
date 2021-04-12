export function setvendors(state, vendors) {
  state.vendors = vendors.map(vendor => ({
    ...vendor.attributes,
    id: vendor.id,
    machineValue: vendor.attributes.machineValue,
    selected: false
  }));
}
export function setSelectedVendor(state, vendor) {
  if (vendor && (vendor.id || vendor.attributes.id)) {
    state.selectedVendor = vendor.attributes;
  } else {
    console.log('else');
    state.selectedVendor = {
      name: '',
      industry: {
        value: ' ',
        id: '',
        machineValue: ''
      },
      meta: {
        claimFiledByEmail: true
      },
      contact: [
        {
          fname: '',
          lname: '',
          email: '',
          honorific: {
            id: '',
            value: '',
            machineValue: ''
          },
          phoneNumber: [
            {
              type: '',
              number: ''
            }
          ],
          isPrimary: true
        },
        {
          fname: '',
          lname: '',
          email: '',
          honorific: {
            id: '',
            value: '',
            machineValue: ''
          },
          phoneNumber: [
            {
              type: '',
              number: ''
            }
          ]
        }
      ],
      address: {
        addressCountry: '',
        addressLocality: '',
        addressRegion: '',
        postalCode: '',
        streetAddress: '',
        dropBox: {
          info: '',
          isPresent: false
        },
        houseNumber: ''
      },
      info: {
        website: '',
        notes: ''
      }
    };
  }
}

export function setvendorsIndustries(state, vendorIndustries) {
  state.vendorIndustries = vendorIndustries.map(vendorIndustry => ({
    machineValue: vendorIndustry.attributes.machineValue,
    name: vendorIndustry.attributes.value,
    id: vendorIndustry.id
  }));
}
