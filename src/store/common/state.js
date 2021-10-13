export default function() {
  return {
    notificationRouteTo: '',
    showLoading: false,
    notification: null,
    contactTypes: [],
    titles: [],
    clientTypes: [],
    userRoles: [],
    lossCauses: [],
    roleTypes: [],
    permissions: [],
    toShowCamera: false,
    templates: [],
    paidUsers: [],
    fileRoleOptions: [
      { value: 'View Access', name: 'reader' },
      { value: 'Edit Access', name: 'writer' }
    ],
    leadSources: [
      { value: 'none', name: 'None' },
      { value: 'client', name: 'Prior Client' },
      { value: 'vendor', name: 'Vendor' },
      { value: 'affiliate', name: 'Affiliate' },
      { value: 'referral', name: 'Referral' },
      { value: 'advertisement', name: 'Advertisement' },
      { value: 'google', name: 'Google' },
      { value: 'other', name: 'Other' }
    ],
    plans: [],
    isEdit: false,
    tokens: [],
    pageAccess: [],
    organization: [],
    isOnline: navigator.onLine,
    isOfflineClientEdit: false
  };
}
