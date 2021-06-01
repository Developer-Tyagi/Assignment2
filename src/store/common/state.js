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
    templates: [],
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
    plans: [],

    tokens: [],
    isOnline: navigator.onLine
  };
}
