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
  state.selectedLead = lead.attributes;
}
// export function selectedLead(state, lead) {
//   state.selectedLead = lead.attributes;
// }
