export default function() {
  return {
    showLoading: false,
    notification: null,
    contactTypes: [],
    titles: [],
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
        id: '1',
        machineName: 'individual',
        name: 'Individual',
        price: 99
      },
      {
        id: '2',
        machineName: 'basic',
        name: 'Basic',
        price: 199
      },
      {
        id: '3',
        machineName: 'office',
        name: 'Office',
        price: 249
      },
      {
        id: '4',
        machineName: 'professional',
        name: 'Professional',
        price: 349
      },
      {
        id: '5',
        machineName: 'enterprise',
        name: 'Enterprise',
        price: 0
      }
    ]
  };
}
