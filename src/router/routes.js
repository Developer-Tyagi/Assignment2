import { getToken } from "@utils/auth.js";

const routes = [
  {
    path: "",
    component: () => import("layouts/MainLayout.vue"),
    beforeEnter: (to, from, next) => {
      !getToken() ? next({ name: "login" }) : next();
    },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("pages/Dashboard.vue")
      },

      { path: "", redirect: "dashboard" }
    ]
  },
  {
    path: "",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("pages/Login.vue")
      }
    ]
  },
  {
    path: "",
    component: () => import("layouts/LeadLayout.vue"),
    children: [
      {
        path: "leads-dashboard",
        name: "leads dashboard",
        component: () => import("pages/LeadsDashboard.vue")
      },
      {
        path: "leads",
        name: "leads",
        component: () => import("pages/Leads.vue")
      },
      {
        path: "add-lead",
        name: "add new leads",
        component: () => import("pages/AddLead.vue")
      },
      {
        path: "details/:id",
        name: "lead details",
        component: () => import("pages/LeadDetails.vue")
      },
      {
        path: "add-lead-details/:id?",
        name: "add new lead",
        component: () => import("pages/AddLeadDetails.vue")
      }
    ]
  },
  {
    path: "",
    component: () => import("layouts/VendorsLayout.vue"),
    children: [
      {
        path: "vendors",
        name: "vendors",
        component: () => import("pages/Vendors.vue")
      },
      {
        path: "add-vendor",
        name: "add new vendor",
        component: () => import("pages/AddVendor.vue")
      }
    ]
  },
  {
    path: "",
    component: () => import("layouts/ClientLayout.vue"),
    children: [
      {
        path: "clients",
        name: "clients",
        component: () => import("pages/Clients.vue")
      },
      {
        path: "add-client",
        name: "add new client",
        component: () => import("pages/AddClient.vue")
      }
    ]
  },

  {
    path: "",
    component: () => import("layouts/SettingsLayout.vue"),
    children: [
      {
        path: "settings",
        name: "settings",
        component: () => import("pages/Settings.vue")
      },
      {
        path: "preferred",
        component: () => import("pages/PreferredDistance.vue")
      },
      {
        path: "inspection-types",
        name: "type of inspections",
        component: () => import("pages/InspectionTypes.vue")
      }
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
