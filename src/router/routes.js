const routes = [
  {
<<<<<<< HEAD
    path: "", component: () => import("layouts/MainLayout.vue"),
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('token')) {
        next({ path: "login" })
      } else {
        next();
=======
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Login.vue") },
      { path: "/dashboard", component: () => import("pages/Dashboard.vue") },
      { path: "/login", component: () => import("pages/Login.vue") },
      { path: "/index", component: () => import("pages/Index.vue") },
      { path: "/leads", component: () => import("pages/Leads.vue") },
      { path: "/add-lead", component: () => import("pages/AddLead.vue") },
      { path: "/vendors", component: () => import("pages/Vendors.vue") },
      {
        path: "/add-lead-details",
        component: () => import("pages/AddLeadDetails.vue")
>>>>>>> master
      }
    },
    children: [
      { path: "dashboard", component: () => import("pages/Dashboard.vue") },
      { path: "index", component: () => import("pages/Index.vue") },
      { path: "leads", component: () => import("pages/Leads.vue") },
      { path: "add-lead", component: () => import("pages/AddLead.vue") },
      { path: "vendors", component: () => import("pages/Vendors.vue") },
      { path: "add-lead-details", component: () => import("pages/AddLeadDetails.vue") },
      { path: '', redirect: 'dashboard' },
    ],
  },
  {
    path: "",
    component: () => import("layouts/AuthLayout.vue"),
    children: [{ path: "login", component: () => import("pages/Login.vue") }]
  },
  {
    path: "/settings",
    component: () => import("layouts/SettingsLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Settings.vue") },
      { path: 'preferred', component: () => import("pages/PreferredDistance.vue") },
      { path: 'inspection', component: () => import("pages/InspectionTypes.vue") }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];
export default routes;
