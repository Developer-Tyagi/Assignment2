<template>
  <div>
    <q-header class="bg-white">
      <q-toolbar
        class="row bg-primary rounded-header toolbar-shadow"
        v-if="$route.name === 'dashboard'"
        style="max-height: 130px"
      >
        <q-btn
          flat
          size="lg"
          class="q-ml-sm color-white col-2"
          icon="menu"
          aria-label="Menu"
          style="z-index: 1; margin-top: -20px"
          @click="onMenuButtonClick"
        />
        <div
          class="self-center"
          style="
            margin-top: -20px;
            text-align: center;
            margin-right: 52px;
            width: 100%;
          "
        >
          <img src="~assets/logo_complete.png" height="130" />
        </div>
      </q-toolbar>
      <q-toolbar class="row bg-primary rounded-header" v-else>
        <q-btn
          flat
          dense
          class="q-ml-sm color-white button-50"
          icon="menu"
          aria-label="Menu"
          @click="onMenuButtonClick"
          v-if="isMobile() && $route.name === 'dashboard'"
        ></q-btn>
        <div class="cursor-pointer" v-if="toBackButtonVisibility()">
          <q-icon
            @click="onBackClick"
            name="arrow_back"
            size="sm"
            class="button-50"
          />
        </div>
        <div class="text-uppercase text-bold q-mx-auto">
          <span v-if="$route.name == 'Leads'">Active</span>
          <span class="text-white"> {{ $route.name }} </span>
          <q-icon
            v-if="
              $route.name == 'create client' &&
              !isOnline &&
              editSelectedClient.id &&
              isOfflineClientEdit
            "
            name="edit"
            @click="onClickEditIcon"
            size="xs"
            class="edit-icon"
            color="white"
          />
        </div>

        <div v-if="$route.name == 'Dashboard'">
          <q-icon name="notifications" size="sm" color="white" />
        </div>

        <q-btn class="no-visibility button-50" flat>
          <img src="~assets/left_arrow.svg" alt="back-arrow" />
        </q-btn>
      </q-toolbar>
      <div class="text-center" v-if="$route.name === 'dashboard'">
        <img
          src="~assets/header_shadow.png"
          class="absolute"
          style="
            width: 90%;
            height: 50px;
            left: 50%;
            transform: translateX(-50%);
            bottom: -25px;
          "
        />
      </div>
    </q-header>
    <q-drawer
      v-model="isLeftSidePanelOpen"
      :width="intViewportWidth"
      :breakpoint="992"
      content-class="bg-side-panel"
      @hide="onMenuHide()"
    >
      <div class="q-px-sm q-pt-lg menu-bar-style q-pb-sm">
        <div class="row q-pl-lg q-pr-md">
          <div class="q-pt-sm col-3">
            <q-avatar
              size="4.5em"
              color="white"
              text-color="primary"
              font-size="2.5rem"
              icon="person"
            />
          </div>
          <div
            class="
              col
              column
              text-weight-bold text-white
              q-pa-sm q-ml-md
              text-h6
            "
            style="width: calc(100% - 54px)"
          >
            <div class="text-capitalize ellipsis" style="width: 100%">
              {{
                user.roles[0].machineValue == 'vendor'
                  ? user.companyName
                  : user.name
              }}
            </div>

            <div class="text-weight-medium text-subtitle2">
              {{ user.contact.fname ? user.contact.fname : '' }}
            </div>
          </div>
        </div>
      </div>
      <q-scroll-area style="height: calc(100% - 265px)">
        <div class="q-pr-sm">
          <q-list separator dark>
            <q-item
              clickable
              v-ripple
              v-for="link in sidebarItems"
              :key="link.title"
              @click="routeTo(link)"
              v-bind="link"
              class="q-mt-lg bg-white rounded-sidebar q-pa-none q-pb-xs"
              v-if="
                (link.title != 'Admin' || !isMobile()) &&
                (link.title != 'Manage Users' || !isMobile()) &&
                (link.title != 'Configuration' || !isMobile())
              "
            >
              <q-item-section @click="onClickMenuItem(link.title)">
                <div class="row text-primary q-mb-sm" style="max-height: 68px">
                  <div class="q-ml-lg col-2 q-mr-sm q-pt-xs">
                    <q-icon
                      :size="link.title == 'Reports' ? '2rem' : '2.5rem'"
                      :style="link.title == 'Reports' ? 'padding-top:10px' : ''"
                      class="q-mt-sm q-mb-sm"
                    >
                      <q-img :src="getImage(link.icon)" color="primary" />
                    </q-icon>
                  </div>
                  <div class="col-8">
                    <div class="text-subtitle1 text-bold q-pt-sm">
                      {{ link.title }}
                    </div>

                    <div style="font-size: 10px">
                      {{ link.description }}
                    </div>
                  </div>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-scroll-area>
      <div class="q-px-lg q-mt-sm">
        <q-btn
          class="full-width q-mt-md menu-bar-style text-subtitle1 text-bold"
          label="LOGOUT"
          style="border-radius: 25px; width: 100%; height: 50px"
          @click="logout()"
        />
      </div>
      <q-separator class="q-mt-md q-mb-sm bg-primary" style="padding: none" />
      <p class="text-black q-ml-md" style="opacity: 50%; font-size: 12px">
        Claimguru Version {{ this.version }}
      </p>
    </q-drawer>
  </div>
</template>
<script>
import {
  removeToken,
  removeCurrentUser,
  removeFCMToken,
  getCurrentUser,
  getFCMToken
} from '@utils/auth';
import { isMobile } from '@utils/common';
import { Capacitor } from '@capacitor/core';
import { removeFirebaseToken } from '@utils/firebase';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { appVersion } from '../Version';

export default {
  name: 'CustomHeader',

  data() {
    return {
      version: appVersion,
      user: {
        name: ''
      },
      isLeftSidePanelOpen: false,
      intViewportWidth: 0,
      linksData: [
        {
          title: 'Dashboard',
          key: 'dashboard',
          icon: 'dashboard_menu.svg',
          link: '/claimstats',
          description: 'View Dashboard and details'
        },
        {
          title: 'Claims',
          key: 'claims',
          link: '/claims',
          icon: 'claim_menu.svg',
          description: 'View, Add and Manage Claims.'
        },
        {
          title: 'Clients',
          key: 'clients',
          link: '/clients',
          icon: 'clients_menu.svg',
          description: 'View, Add and Manage Clients.'
        },
        {
          title: 'Leads',
          key: 'leads',
          link: '/leads-dashboard',
          icon: 'leads_menu.svg',
          description: 'View Lead Dashboard, Add New Lead and Manage Leads.'
        },

        {
          title: 'Vendors',
          key: 'vendors',
          link: '/vendors',
          icon: 'vendors_menu.svg',
          description: 'View, Add and Manage all types of Vendors.'
        },
        {
          title: 'Carriers',
          key: 'carriers',
          link: '/carriers',
          icon: 'carriers_menu.svg',
          description: 'View, Add and Manage all types of Carriers.'
        },

        {
          title: 'Mortgages',
          key: 'mortgages',
          link: '/mortgages',
          icon: 'mortgage_menu.svg',
          description: 'View, Add and Manage all types of Mortgages.'
        },
        {
          title: 'Configuration',
          key: 'configuration',
          link: '/configuration',
          icon: 'configuration_big.svg',
          description: 'View, Add and Manage all types of configuration.'
        },
        {
          title: 'Reports',
          key: 'reports',
          link: '/reports',
          icon: 'reports_menu.svg',
          description: 'Download files.'
        },
        {
          title: 'Admin',
          key: 'admin',
          link: '/admin',
          icon: 'admin_big.svg',
          description: 'Setup Company , account, email, actions etc.'
        },
        {
          title: 'Manage Users',
          key: 'manage-users',
          link: '/manage-users',
          icon: 'manage_users_big.svg',
          description: 'View, Add and Manage all types of Vendors.'
        },

        {
          title: 'Profile',
          key: 'profile',
          link: '/edit-profile',
          icon: 'profile_big.svg',
          description: 'Edit profile '
        }
      ],
      sidebarItems: []
    };
  },

  methods: {
    ...mapActions([
      'deletePushNotificationToken',
      'getClaims',
      'getActiveLeadsList',
      'getArchivedLeadsList',
      'getClients',
      'getAccess'
    ]),
    // this function is used to hide the back button for the pages which are there in the humberger menubar
    toBackButtonVisibility() {
      const screenWidth = window.screen.width;
      const route = this.$router.currentRoute.fullPath.split('/')[1];
      if (
        (route == 'claimstats' ||
          route == 'claims' ||
          route == 'clients' ||
          route == 'leads-dashboard' ||
          route == 'vendors' ||
          route == 'carriers' ||
          route == 'mortgages' ||
          route == 'configuration' ||
          route == 'reports' ||
          route == 'admin' ||
          route == 'manage-users' ||
          route == 'edit-profile') &&
        screenWidth > 1600
      )
        return false;
      else return true;
    },
    ...mapMutations(['setConvertedLead', 'setEditOfflineClientIcon']),
    isMobile,
    getImage(icon) {
      return require('../assets/' + icon);
    },

    async logout() {
      if (this.getFCMToken()) {
        await this.deletePushNotificationToken(this.getFCMToken());
        await this.removeFCMToken();
      }
      await this.removeFirebaseToken();

      this.removeToken();
      this.removeCurrentUser();
      location.reload();
    },
    onClickEditIcon() {
      this.setEditOfflineClientIcon(false);
    },
    onClickMenuItem(name) {
      if (name == 'Claims') {
        this.getClaims();
      } else if (name == 'Leads') {
        const payload = {
          searchString: '',
          new: ''
        };
        this.getActiveLeadsList(payload);
        this.getArchivedLeadsList();
      } else if (name == 'Clients') {
        const payload = {
          name: '',
          status: ''
        };
        this.getClients(payload);
      }
    },
    removeToken,
    removeCurrentUser,
    removeFCMToken,
    getFCMToken,
    removeFirebaseToken,
    getCurrentUser,

    onMenuButtonClick() {
      this.isLeftSidePanelOpen = !this.isLeftSidePanelOpen;
    },

    onMenuHide() {
      this.isLeftSidePanelOpen = false;
    },

    onBackClick() {
      this.$emit('backButton');
      this.setConvertedLead('');
    },

    routeTo(link) {
      this.$router.push(link.link);
    },
    isEmpty(obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
      }

      return true;
    },

    createSidebarMenuItems() {
      const PageAccessItems = new Set();
      //function use to reshuffle the order of the menubar items.
      for (let i = 0; i < this.pageAccess.length; i++) {
        PageAccessItems.add(this.pageAccess[i]);
      }

      for (let i = 0; i < this.linksData.length; i++) {
        if (PageAccessItems.has(this.linksData[i].key)) {
          this.sidebarItems.push(this.linksData[i]);
        }
      }
    }
  },

  computed: {
    currentRouteName() {
      return this.$router.history.current.path.substring(1);
    },
    ...mapGetters([
      'pageAccess',
      'isOnline',
      'editSelectedClient',
      'isOfflineClientEdit'
    ])
  },

  async created() {
    if (window.innerWidth * 0.9 < 300) {
      this.intViewportWidth = window.innerWidth * 0.9;
    } else {
      this.intViewportWidth = 300;
    }
    if (this.getCurrentUser().attributes) {
      this.user = getCurrentUser().attributes;
      await this.getAccess();
      this.createSidebarMenuItems();
    }
    if (!isMobile()) {
      this.isLeftSidePanelOpen = true;
    }
  }
};
</script>
<style lang="scss">
.q-toolbar {
  padding: 0;
}

.button-50 {
  width: 50px;
}
.bg-side-panel {
  background-color: #ededed;
}
.title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 0;
}
.description {
  opacity: 70%;
  font-size: 12px;
  margin-bottom: 0;
  margin-top: 5px;
}
// .overlay {
//   position: absolute;
//   bottom: 10;
//   color: #f1f1f1;
//   width: 100%;

//   opacity: 4;
//   color: white;
// }
.rounded-sidebar {
  border-radius: 0px 20px 20px 0px;
  box-shadow: 1px 3px 2px 1px #e0e0e0;
}
.toolbar-shadow {
  // box-shadow: 0 52px 28px -40px #000000;
}
::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
</style>
