export default function () {
  return {
    activeLeads: [],
    archivedLeads: [],
    selectedLead: {
      isOrganization: false,
      organizationName: '',
      primaryContact: {
        honorific: {
          id: '',
          value: ''
        },
        fname: '',
        lname: '',
        email: '',
        phoneNumber: [
          {
            type: '',
            number: ''
          }
        ]
      },
      lastVisted: '',
      visited: [],
      lossLocation: {
        addressCountry: '',
        addressLocality: '',
        addressRegion: '',
        postOfficeBoxNumber: '',
        postalCode: '',
        streetAddress: ''
      },
      lossDesc: '',
      dateOfLoss: '',
      carrier: '',
      policyNumber: '',
      isAutomaticScheduling: false,
      notes: ''
    }
  };
}
