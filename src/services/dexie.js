import Dexie from 'dexie';

const localDB = new Dexie('claimguru-offline');

localDB.version(1).stores({
  activeLeads: 'id',
  archivedLeads: 'id',
  clients: 'id',
  titles: 'id',
  vendors: 'id',
  carriers: 'id',
  lossCauses: 'id',
  contactTypes: 'id',
  inspectionTypes: 'id'
});

export function getCollection(name) {
  return localDB[name].toCollection();
}

export default localDB;