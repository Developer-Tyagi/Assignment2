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

export async function setOfflineActiveLeads(state) {
  state.activeLeads = await getCollection('activeLeads').toArray();
}

export async function setArchivedLeads(state, leads) {
  const archivedLeadsCollection = await getCollection('archivedLeads');
  const archivedLeads = leads.map(lead => ({
    ...lead.attributes,
    id: lead.id
  }));
  state.archivedLeads = archivedLeads;
  if ((await archivedLeadsCollection.count()) > 0) {
    await archivedLeadsCollection.delete([]);
  }
  await localDB.archivedLeads.bulkAdd(archivedLeads);
}

export async function setOfflineArchivedLeads(state) {
  state.archivedLeads = await getCollection('archivedLeads').toArray();
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
