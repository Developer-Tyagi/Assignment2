<template>
  <div>
    <q-header class="bg-white">
      <q-toolbar
        class="row bg-primary rounded-header toolbar-shadow"
        v-if="$route.name === 'dashboard'"
        style="height: 100px;"
      >
        <q-btn
          flat
          class="q-ml-sm color-white button-50"
          icon="menu"
          aria-label="Menu"
          style="z-index: 1"
          @click="onMenuButtonClick"
        ></q-btn>
        <div class="row">
          <div class="column justify-center" style="margin-left:-30px">
            <img src="~assets/logo2.png" />
          </div>
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
          v-if="
            (!isMobile() &&
              ($route.name === 'dashboard' ||
                $route.name === 'clients' ||
                $route.name === 'leads dashboard' ||
                $route.name === 'vendors' ||
                $route.name === 'settings' ||
                $route.name === 'carriers' ||
                $route.name === 'mortgages' ||
                $route.name === 'manage users' ||
                $route.name === 'admin' ||
                $route.name === 'claims' ||
                $route.name === 'configuration')) ||
              (isMobile() && $route.name === 'dashboard')
          "
        ></q-btn>
        <div class="cursor-pointer" v-if="toBackButtonVisibility()">
          <q-icon
            @click="onBackClick"
            name="arrow_back"
            size="sm"
            class="button-50"
          />
        </div>
        <div class="text-uppercase text-bold  q-mx-auto">
          <span v-if="$route.name == 'Leads'">{{ converted }}</span>
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
          <img src="~assets/left-arrow.svg" alt="back-arrow" />
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="isLeftSidePanelOpen"
      :width="intViewportWidth"
      :breakpoint="992"
      content-class="bg-side-panel"
      @hide="onMenuHide()"
    >
      <div style="height: calc(100px)" class="q-px-md q-pt-lg menu-bar-style">
        <div class="row no-wrap">
          <div>
            <q-avatar
              size="54px"
              font-size="42px"
              color="white"
              text-color="white"
              icon="user"
            />
          </div>
          <div
            class="column text-white q-pa-sm q-ml-sm"
            style="width: calc(100% - 54px)"
          >
            <div class="text-capitalize">
              {{
                user.roles[0].machineValue == 'vendor'
                  ? user.companyName
                  : user.name
              }}
            </div>

            <div style="font-size: 11px; opacity: 80%">
              {{ user.contact.fname ? user.contact.fname : '' }}
            </div>
          </div>
        </div>
      </div>
      <q-scroll-area style="height: calc(100% - 220px)">
        <div class="q-pr-md">
          <q-list separator dark>
            <q-item
              clickable
              v-ripple
              v-for="link in sidebarItems"
              :key="link.title"
              @click="routeTo(link)"
              v-bind="link"
              class="q-mt-md bg-white rounded-sidebar q-px-none"
              v-if="
                (link.title != 'Admin' || !isMobile()) &&
                  (link.title != 'Manage Users' || !isMobile()) &&
                  (link.title != 'Configuration' || !isMobile())
              "
            >
              <q-item-section @click="onClickMenuItem(link.title)">
                <div class="row text-primary">
                  <div class="q-ml-md col-3 q-mb-md column justify-center">
                    <q-icon size="md">
                      <q-img :src="getImage(link.icon)" color="primary" />
                    </q-icon>
                  </div>
                  <div class="column col-7">
                    <div class="title text-primary col-4">{{ link.title }}</div>

                    <div class="description text-primary">
                      {{ link.description }}
                    </div>
                  </div>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-scroll-area>
      <div style="height: 100px" class="q-px-md q-mt-sm">
        <q-btn
          class="button-width-90 q-mt-md rounded text-capitalize menu-bar-style"
          label="LOGOUT"
          @click="logout()"
        />
        <q-separator class="q-my-md bg-primary" />
        <p class="text-black q-ml-md" style="opacity: 50%; font-size: 12px">
          Claimguru Version {{ this.version }}
        </p>
      </div>
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
          icon: 'Dashboard_menu.svg',
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
          icon: 'CLIENTS_menu.svg',
          description: 'View, Add and Manage Clients.'
        },
        {
          title: 'Leads',
          key: 'leads',
          link: '/leads-dashboard',
          icon: 'LEADS_menu.svg',
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
      'converted',
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
  box-shadow: 0 52px 28px -40px #000000;
}
::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
</style>
