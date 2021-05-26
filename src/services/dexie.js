import Dexie from 'dexie';

const localDB = new Dexie('claimguru-offline');

localDB.version(1).stores({
  activeLeads: 'id',
  archivedLeads: 'id',
  clients: 'id',
  claims: 'id',
  titles: 'id',
  vendors: 'id',
  carriers: 'id',
  mortgages: 'id',
  estimators: 'id',
  lossCauses: 'id',
  contactTypes: 'id',
  inspectionTypes: 'id',
  clientTypes: 'id',
  claimReasons: 'id',
  claimSeverities: 'id',
  propertyTypes: 'id',
  policyTypes: 'id',
  policyCategories: 'id',
  roles: 'id',
  vendorIndustry: 'id',
  tasks: 'id',
  officeTasks: 'id'
});

export function getCollection(name) {
  return localDB[name].toCollection();
}

export default localDB;
