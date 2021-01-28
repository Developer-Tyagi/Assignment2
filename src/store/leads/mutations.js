export function setActiveLeads(state, leads) {
  state.activeLeads = leads.map(lead => ({ ...lead.attributes, id: lead.id }));
}

export function setArchivedLeads(state, leads) {
  state.archivedLeads = leads.map(lead => ({
    ...lead.attributes,
    id: lead.id
  }));
}

export function moveActiveToArchive(state, leadId) {
  const index = state.activeLeads.findIndex(item => item.id === leadId);
  state.archivedLeads.push(state.activeLeads[index]);
  state.activeLeads.splice(index, 1);
}

export function setSelectedLead(state, lead) {
  if (lead.id || lead.attributes.id) {
    state.selectedLead = lead.attributes;
  } else {
    state.selectedLead = {
      isOrganization: false,
      organizationName: '',
      primaryContact: {
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
    };
  }
}
