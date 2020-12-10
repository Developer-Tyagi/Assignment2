export function setActiveLeads(state, leads) {
    state.activeLeads = leads.map(lead => ({...lead.attributes, id: lead.id }));
}

export function setArchiveLeads(state, leads) {
    state.archiveLeads = leads.map(lead => ({...lead.attributes, id: lead.id }));
}

export function moveActiveToArchive(state, leadId) {
    let index = state.activeLeads.findIndex((item) => item.id === leadId);
    state.archiveLeads.push(state.activeLeads[index]);
    state.activeLeads.splice(index, 1);
}