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
    component: () => import('layouts/DashboardLayout.vue'),
    beforeEnter: guardMyroute,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        caseSensitive: true,
        component: () => import('pages/Dashboard.vue')
      }
    ]
  },
  {
    path: '',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: 'setConfiguration',
        name: 'setConfiguration',
        caseSensitive: true,
        beforeEnter: guardMyroute,
        component: () => import('pages/SetConfiguration.vue')
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
      }
    ]
  },
  {
    path: '',
    component: () => import('layouts/LeadLayout.vue'),
    beforeEnter: guardMyroute,
    children: [
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
        path: 'details/:id',
        name: 'lead details',
        caseSensitive: true,
        component: () => import('pages/LeadDetails.vue')
      },
      {
        path: 'add-lead-details/:id?',
        name: 'add new lead',
        caseSensitive: true,
        component: () => import('pages/AddLeadDetails.vue')
      }
    ]
  },
  {
    path: '',
    component: () => import('layouts/VendorsLayout.vue'),
    beforeEnter: guardMyroute,
    children: [
      {
        path: 'vendors',
        name: 'vendors',
        caseSensitive: true,
        component: () => import('pages/Vendors.vue')
      }
    ]
  },
  {
    path: '',
    component: () => import('layouts/ClientLayout.vue'),
    beforeEnter: guardMyroute,
    children: [
      {
        path: 'clients',
        name: 'clients',
        caseSensitive: true,
        component: () => import('pages/Clients.vue')
      },
      {
        path: 'add-client',
        name: 'create client',
        caseSensitive: true,
        component: () => import('pages/AddClient.vue')
      }
    ]
  },

  {
    path: '',
    component: () => import('layouts/SettingsLayout.vue'),
    beforeEnter: guardMyroute,
    children: [
      {
        path: 'settings',
        name: 'settings',
        caseSensitive: true,
        component: () => import('pages/Settings.vue')
      },
      {
        path: 'preferred',
        caseSensitive: true,
        component: () => import('pages/PreferredDistance.vue')
      },
      {
        path: 'inspection-types',
        name: 'type of inspections',
        caseSensitive: true,
        component: () => import('pages/InspectionTypes.vue')
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
