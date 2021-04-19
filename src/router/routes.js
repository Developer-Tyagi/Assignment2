import { guardMyroute } from '@utils/auth.js';

const routes = [
  {
    path: '',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        caseSensitive: true,
        component: () => import('pages/Login.vue')
      },
      {
        path: 'signup',
        name: 'signup',
        caseSensitive: true,
        component: () => import('pages/Signup.vue')
      },

      {
        path: 'set-password',
        name: 'set-password',
        caseSensitive: true,
        component: () => import('pages/ForgotPassword.vue')
      },
      {
        path: 'info',
        name: 'info',
        caseSensitive: true,
        component: () => import('pages/Information.vue')
      },
      { path: '', redirect: 'login' }
    ]
  },
  {
    path: '',
    component: () => import('src/layouts/MainLayout.vue'),
    beforeEnter: guardMyroute,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        caseSensitive: true,
        component: () => import('pages/Dashboard.vue')
      },
      {
        path: 'configuration',
        name: 'configuration',
        caseSensitive: true,
        component: () => import('pages/Configuration.vue')
      },
      {
        path: 'account',
        name: 'account',
        caseSensitive: true,
        component: () => import('pages/Account.vue')
      },
      {
        path: 'payment',
        name: 'payment',
        caseSensitive: true,
        component: () => import('pages/Payment.vue')
      },
      {
        path: 'profile',
        name: 'profile',
        caseSensitive: true,
        component: () => import('pages/Profile.vue')
      },
      {
        path: 'my-plan',
        name: 'my plan',
        caseSensitive: true,
        component: () => import('pages/MyPlan.vue')
      },
      {
        path: 'manage-users',
        name: 'manage users',
        caseSensitive: true,
        component: () => import('pages/ManageUsers.vue')
      },
      {
        path: 'add-user',
        name: 'add-user',
        caseSensitive: true,
        component: () => import('pages/AddUser.vue')
      },
      {
        path: 'leads-dashboard',
        name: 'leads dashboard',
        caseSensitive: true,
        component: () => import('pages/LeadsDashboard.vue')
      },
      {
        path: 'leads',
        name: 'leads',
        caseSensitive: true,
        component: () => import('pages/Leads.vue')
      },

      {
        path: 'add-lead',
        name: 'add new leads',
        caseSensitive: true,
        component: () => import('pages/AddLead.vue')
      },
      {
        path: 'add-lead-details/:id?',
        name: 'add new lead',
        caseSensitive: true,
        component: () => import('pages/AddLeadDetails.vue')
      },
      {
        path: 'details/:id',
        name: 'lead details',
        caseSensitive: true,
        component: () => import('pages/LeadDetails.vue')
      },
      {
        path: 'clients',
        name: 'clients',
        caseSensitive: true,
        component: () => import('pages/Clients.vue')
      },
      {
        path: 'view-client',
        name: 'client details',

        caseSensitive: true,
        component: () => import('pages/ClientsDetails.vue')
      },
      {
        path: 'client-details',
        name: 'client info ',
        caseSensitive: true,
        component: () => import('pages/ClientInfo.vue')
      },
      {
        path: 'claim-details',
        name: 'claim details ',
        caseSensitive: true,
        component: () => import('pages/ClaimDetails.vue')
      },
      {
        path: 'add-claim/:clientId',
        name: 'Add Claim ',
        caseSensitive: true,
        component: () => import('pages/AddClaim.vue')
      },
      {
        path: 'claim-summary',
        name: 'claim summary ',
        caseSensitive: true,
        component: () => import('src/pages/ClaimSummary.vue')
      },
      {
        path: 'claim-files/:claimId',
        name: 'files ',
        caseSensitive: true,
        component: () => import('pages/ClaimFiles.vue')
      },
      {
        path: 'claim-action-items/:claimId',
        name: 'action items ',
        caseSensitive: true,
        component: () => import('pages/ClaimActionItems.vue')
      },

      {
        path: 'loss-info',
        name: 'loss info ',
        caseSensitive: true,
        component: () => import('src/pages/UpdateLossInfo.vue')
      },
      {
        path: 'client-documents',
        name: 'Documents',
        caseSensitive: true,
        component: () => import('pages/ClientDocuments.vue')
      },
      {
        path: 'property-details',
        name: 'properties and claims ',
        caseSensitive: true,
        component: () => import('pages/PropertyInfo.vue')
      },
      {
        path: 'claim-notes',
        name: 'notes ',
        caseSensitive: true,
        component: () => import('pages/ClaimNotes.vue')
      },
      {
        path: 'note-details',
        name: 'Notes',
        caseSensitive: true,
        component: () => import('pages/Notes.vue')
      },
      {
        path: 'company-personnel',
        name: 'Company Personnel',
        caseSensitive: true,
        component: () => import('src/pages/Personnel.vue')
      },
      {
        path: 'insurance-policy',
        name: 'Insurance Policy ',
        caseSensitive: true,
        component: () => import('pages/InsurancePolicy.vue')
      },
      {
        path: 'mortgage-liens',
        name: 'mortgage liens ',
        caseSensitive: true,
        component: () => import('src/pages/MortgageAndLiens.vue')
      },
      {
        path: 'settlements',
        name: 'Settlements ',
        caseSensitive: true,
        component: () => import('pages/Settlements.vue')
      },
      {
        path: 'activity-log',
        name: 'Activity Log And Message ',
        caseSensitive: true,
        component: () => import('pages/ActivityLog.vue')
      },
      {
        path: 'add-client',
        name: 'create client',
        caseSensitive: true,
        component: () => import('pages/AddClient.vue')
      },
      {
        path: 'vendors',
        name: 'vendors',
        caseSensitive: true,
        component: () => import('src/pages/vendor/Vendors.vue')
      },
      {
        path: 'vendor-details/:id',
        name: 'vendor details',
        caseSensitive: true,
        component: () => import('src/pages/vendor/VendorDetails.vue')
      },
      {
        path: 'vendor-company-info/:id',
        name: 'company info',
        caseSensitive: true,
        component: () => import('src/pages/vendor/VendorCompanyInfo.vue')
      },
      {
        path: 'vendor-personnel/:id',
        name: 'personnel',
        caseSensitive: true,
        component: () => import('src/pages/vendor/VendorPersonnel.vue')
      },
      {
        path: 'carriers',
        name: 'carriers',
        caseSensitive: true,
        component: () => import('pages/carrier/Carriers.vue')
      },
      {
        path: 'carrier-details/:id',
        name: 'carrier details',
        caseSensitive: true,
        component: () => import('src/pages/carrier/CarrierDetails.vue')
      },
      {
        path: 'carrier-company-info/:id',
        name: 'carrier info',
        caseSensitive: true,
        component: () => import('src/pages/carrier/CarrierCompanyInfo.vue')
      },

      {
        path: 'claims',
        name: 'open claims',
        caseSensitive: true,
        component: () => import('pages/Claims.vue')
      },
      {
        path: 'settings',
        name: 'settings',
        caseSensitive: true,
        component: () => import('pages/Settings.vue')
      },
      {
        path: 'inspection-types',
        name: 'type of inspections',
        caseSensitive: true,
        component: () => import('pages/InspectionTypes.vue')
      },
      {
        path: 'preferred',
        caseSensitive: true,
        component: () => import('pages/PreferredDistance.vue')
      },
      {
        path: 'admin',
        name: 'admin',
        caseSensitive: true,
        component: () => import('pages/Admin.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];
export default routes;
