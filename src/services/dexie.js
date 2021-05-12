import Dexie from 'dexie';

const localDB = new Dexie('claimguru-offline');

localDB.version(1).stores({
  activeLeads: 'id',
  archivedLeads: 'id'
});

export function getCollection(name) {
  return localDB[name].toCollection();
}

export default localDB;
