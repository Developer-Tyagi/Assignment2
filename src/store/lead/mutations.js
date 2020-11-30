export function setActiveLeads(state, leads) {
    state.activeLeads = leads.map(lead => ({...lead.attributes, id: lead.id }));
}

export function setArchiveLeads(state, leads) {
    state.archiveLeads = leads.map(lead => ({...lead.attributes, id: lead.id }));
}