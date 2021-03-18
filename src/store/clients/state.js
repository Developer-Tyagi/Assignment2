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
    editSelectedClient: [],
    selectedClientId: '',
    setClientProperty: [],
    claimsData: {
      number: '2131313100001',
      fileNumber: 'FL-12121212',
      status: 'Open',
      phase: 'Orgainated'
    }
  };
}
