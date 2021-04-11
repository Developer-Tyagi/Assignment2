export default function() {
  return {
    vendors: [],
    vendorIndustries: [],
    selectedVendor: {
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
    }
  };
}
