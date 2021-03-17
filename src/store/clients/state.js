export default function() {
  return {
    personnelRoles: [
      { value: '', name: 'None' },
      { value: 'manager', name: 'Manager' },
      { value: 'receptionist', name: 'Receptionist' },
      { value: 'supervisor', name: 'Supervisor' },
      { value: 'referral', name: 'Referral' },
      { value: 'professional', name: 'Professional' }
    ],
    clients: [],
    estimators: [],
    propertyTypes: [],
    policyTypes: [],
    claimReasons: [],
    selectedClient: '',
    claimSeverity: [],
    policyCategories: [],
    editSelectedClient: []
  };
}
