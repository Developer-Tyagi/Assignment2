<template>
  <q-layout view="lhr lpR lfr">
    <q-header bordered class="bg-white">
      <q-toolbar class="row bg-white">
        <q-btn
          flat
          dense
          class="color-grey"
          icon="menu"
          aria-label="Menu"
          @click="onMenuButtonClick"
        >
        </q-btn>
        <div class="text-uppercase text-bold text-black q-mx-auto">
          {{ $route.name }}
        </div>
        <q-btn
          flat
          dense
          class="color-grey invisible"
          icon="menu"
          aria-label="Menu"
          @click="onMenuButtonClick"
        >
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="isLeftSidePanelOpen"
      :width="intViewportWidth"
      :breakpoint="600"
      content-class="bg-side-panel"
      @hide="onMenuHide()"
    >
      <div style="height: calc(120px)" class="q-px-xl q-pt-xl">
        <div class="row no-wrap">
          <q-avatar
            rounded
            size="54px"
            font-size="42px"
            color="yellow-9"
            text-color="white"
            icon="user"
          />
          <div
            class="column text-white q-pa-sm q-ml-sm"
            style="width: calc(100% - 54px)"
          >
            <div class="text-capitalize ellipsis full-width">
              {{ user.name || 'Unknown' }}
            </div>
            <div style="font-size: 11px; opacity: 80%">View Profile</div>
          </div>
        </div>
      </div>
      <q-scroll-area style="height: calc(100% - 220px)">
        <div class="q-px-xl">
          <q-list separator dark>
            <q-item
              clickable
              v-ripple
              v-for="link in linksData"
              :key="link.title"
              :to="link.link"
              v-bind="link"
              class="q-px-none"
            >
              <q-item-section>
                <p class="title">{{ link.title }}</p>
                <p class="description">
                  {{ link.description }}
                </p>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-scroll-area>
      <div style="height: 100px" class="q-px-xl">
        <q-btn
          class="q-px-xl q-py-xs full-width"
          color="primary"
          label="LOGOUT"
          @click="logout()"
        />
        <p class="text-white q-mt-md" style="opacity: 50%; font-size: 12px">
          Claimguru Version 1.0
        </p>
      </div>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { removeToken, removeCurrentUser } from '@utils/auth';
export default {
  name: 'DashboardLayout',
  data() {
    return {
      user: {
        name: ''
      },
      isLeftSidePanelOpen: false,
      intViewportWidth: 0,
      linksData: [
        {
          title: 'Leads',
          link: '/leads-dashboard',
          description: 'View Lead Dashboard, Add New Lead and Manage Leads.'
        },
        {
          title: 'Clients',
          link: '/clients',
          description: 'View, Add and Manage Clients.'
        },
        // {
        //   title: "Claims",
        //   link: "/claims",
        //   description: "View, Add and Manage Claims."
        // },
        // {
        //   title: "Companies",
        //   link: "/companies",
        //   description:
        //     "View Insurance and Mortgage Companies, Add and Manage New Companies."
        // },
        {
          title: 'Vendors',
          link: '/vendors',
          description: 'View, Add and Manage all types of Vendors.'
        },
        {
          title: 'Settings',
          link: '/settings',
          description: 'Setup My Schedule, Type of Inspection etc.'
        }
      ]
    };
  },

  methods: {
    logout() {
      this.removeToken();
      this.removeCurrentUser();
      this.$router.push('/login');
    },

    removeToken,
    removeCurrentUser,

    onMenuButtonClick() {
      this.isLeftSidePanelOpen = !this.isLeftSidePanelOpen;
    },

    onMenuHide() {
      this.isLeftSidePanelOpen = false;
    }
  },

  computed: {
    currentRouteName() {
      return this.$router.history.current.path.substring(1);
    }
  },

  created() {
    if (window.innerWidth * 0.9 < 400) {
      this.intViewportWidth = window.innerWidth * 0.9;
    } else {
      this.intViewportWidth = 400;
    }
  }
};
</script>
<style lang="sass">
.bg-side-panel
  background-color: $sidePanel
.title
  font-size: 16px
  font-weight: bold
  margin-bottom: 0
.description
  opacity: 70%
  font-size: 12px
  margin-bottom: 0
</style>
