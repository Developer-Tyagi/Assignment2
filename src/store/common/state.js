export default function() {
  return {
    showLoading: false,
    notification: null,
    contactTypes: [],
    titles: [],
    clientTypes: [],
    userRoles: [],
    lossCauses: [],
    roleTypes: [],
    permissions: [],
    fileRoleOptions: [
      { value: 'View Access', name: 'reader' },
      { value: 'Edit Access', name: 'writer' }
    ],
    leadSources: [
      { value: '', name: 'None' },
      { value: 'client', name: 'Prior Client' },
      { value: 'vendor', name: 'Vendor' },
      { value: 'affiliate', name: 'Affiliate' },
      { value: 'referral', name: 'Referral' },
      { value: 'advertisement', name: 'Advertisement' },
      { value: 'google', name: 'Google' },
      { value: 'other', name: 'Other' }
    ],
    plans: [
      {
        id: '3',
        machineValue: 'office',
        name: 'Office',
        price: 249
      }
    ],
    isOnline: navigator.onLine
  };
}
