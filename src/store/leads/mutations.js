import localDB, { getCollection } from '@services/dexie';

export async function setActiveLeads(state, leads) {
  const activeLeadsCollection = await getCollection('activeLeads');
  const activeLeads = leads.map(lead => ({ ...lead.attributes, id: lead.id }));
  state.activeLeads = activeLeads;
  if ((await activeLeadsCollection.count()) > 0) {
    await activeLeadsCollection.delete([]);
  }
  await localDB.activeLeads.bulkAdd(activeLeads);
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
  if (lead && (lead.id || lead.attributes.id)) {
    state.selectedLead = {
      id: lead.id,
      ...lead.attributes
    };
  } else {
    state.selectedLead = {
      id: '',
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
      lossDetails: '',
      dateOfLoss: '',
      carrier: '',
      policyNumber: '',
      isAutomaticScheduling: false,
      notes: ''
    };
  }
}
