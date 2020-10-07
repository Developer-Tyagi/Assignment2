
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Dashboard.vue') },
      { path: '/login', component: () => import('pages/Login.vue')},
      { path: '/index', component: () => import('pages/Index.vue')},
      { path: '/dashboard', component: () => import('pages/Dashboard.vue')},
      { path: '/leads', component: () => import('pages/Leads.vue')},
      { path: '/addLead', component: () => import('pages/AddLead.vue')},
      { path: '/addLeadDetails', component: () => import('pages/AddLeadDetails.vue')}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
