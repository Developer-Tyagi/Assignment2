import localDB, { getCollection } from '@services/dexie';

export async function setActiveLeads(state, leads) {
  const activeLeadsCollection = await getCollection('activeLeads');
  const activeLeads = leads.data.map(lead => ({
    ...lead.attributes,
    id: lead.id
  }));
  state.activeLeads = activeLeads;
  // this consdition is added to stop the data filliing again in local db ,after searching the leads.
  if ((await activeLeadsCollection.count()) > 0 && !leads.params) {
    await activeLeadsCollection.delete([]);
  }
  if (!leads.params) await localDB.activeLeads.bulkAdd(activeLeads);
}

export async function setOfflineActiveLeads(state) {
  state.activeLeads = await getCollection('activeLeads').toArray();

  state.activeLeads.sort(function (a, b) {
    return new Date(b.updated).getTime() - new Date(a.updated).getTime();
  });
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

export function setSelectedLeadOnline(state, lead) {
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
        address1: '',
        address2: ''
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

export function setSelectedLeadOffline(state, lead) {
  if (lead && lead.id) {
    state.selectedLead = {
      ...lead
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
        address1: '',
        address2: ''
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

export function setLeadStatistics(state, leadStatic) {
  state.leadStatic = {
    ...leadStatic.attributes
  };
}
export function setConvertedLead(state, converted) {
  state.converted = converted;
}
export function setShowConvertButton(state, converted) {
  state.isShowConvertButton = converted;
}
