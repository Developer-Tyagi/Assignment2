<template>
  <div>
    <q-header bordered class="bg-white">
      <q-toolbar class="row bg-white">
        <q-btn
          flat
          dense
          class="color-grey button-50"
          icon="menu"
          aria-label="Menu"
          @click="onMenuButtonClick"
          v-if="
            ($q.screen.width > 992 &&
              ($route.name === 'dashboard' ||
                $route.name === 'clients' ||
                $route.name === 'leads dashboard' ||
                $route.name === 'vendors' ||
                $route.name === 'settings' ||
                $route.name === 'manage users' ||
                $route.name === 'admin' ||
                $route.name === 'claims' ||
                $route.name === 'configuration')) ||
              ($q.screen.width < 992 && $route.name === 'dashboard')
          "
        ></q-btn>
        <q-btn @click="onBackClick" flat v-else class="button-50">
          <img src="~assets/left-arrow.svg" alt="back-arrow" />
        </q-btn>
        <div class="text-uppercase text-bold text-black q-mx-auto">
          <span v-if="$route.name == 'Leads'">{{ converted }}</span>
          {{ $route.name }}
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
      <div style="height: calc(120px)" class="q-px-md q-pt-lg">
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
              {{
                user.roles[0].machineValue == 'vendor'
                  ? user.companyName
                  : user.name
              }}
            </div>
            <div style="font-size: 11px; opacity: 80%" @click="">
              {{ user.contact.fname ? user.contact.fname : '' }}
            </div>
          </div>
        </div>
      </div>
      <q-scroll-area style="height: calc(100% - 220px)">
        <div class="q-px-md">
          <q-list separator dark>
            <q-item
              clickable
              v-ripple
              v-for="link in sidebarItems"
              :key="link.title"
              @click="routeTo(link)"
              v-bind="link"
              class="q-px-none"
              v-if="
                (link.title != 'Admin' || $q.screen.width > 992) &&
                  (link.title != 'Manage Users' || $q.screen.width > 992) &&
                  (link.title != 'Configuration' || $q.screen.width > 992)
              "
            >
              <q-item-section @click="onClickMenuItem(link.title)">
                <p class="title">{{ link.title }}</p>
                <p class="description">
                  {{ link.description }}
                </p>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-scroll-area>
      <div style="height: 100px" class="q-px-md">
        <q-btn
          class="q-px-md q-py-xs full-width"
          color="primary"
          label="LOGOUT"
          @click="logout()"
        />
        <p class="text-white q-mt-md" style="opacity: 50%; font-size: 12px">
          Claimguru Version 1.0
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
import { Capacitor } from '@capacitor/core';
import { removeFirebaseToken } from '@utils/firebase';
import { mapActions, mapGetters, mapMutations } from 'vuex';
const isPushNotificationsAvailable = Capacitor.isPluginAvailable(
  'PushNotifications'
);
export default {
  name: 'CustomHeader',

  data() {
    return {
      user: {
        name: ''
      },
      isLeftSidePanelOpen: true,
      intViewportWidth: 0,
      linksData: [
        {
          title: 'Dashboard',
          key: 'dashboard',
          link: '/dashboard',
          description: 'View Dashboard and details'
        },
        {
          title: 'Leads',
          key: 'leads',
          link: '/leads-dashboard',
          description: 'View Lead Dashboard, Add New Lead and Manage Leads.'
        },
        {
          title: 'Clients',
          key: 'clients',
          link: '/clients',
          description: 'View, Add and Manage Clients.'
        },
        {
          title: 'Claims',
          key: 'claims',
          link: '/claims',
          description: 'View, Add and Manage Claims.'
        },
        // {
        //   title: "Companies",
        //   link: "/companies",
        //   description:
        //     "View Insurance and Mortgage Companies, Add and Manage New Companies."
        // },
        {
          title: 'Vendors',
          key: 'vendors',
          link: '/vendors',
          description: 'View, Add and Manage all types of Vendors.'
        },
        {
          title: 'Carriers',
          key: 'carriers',
          link: '/carriers',
          description: 'View, Add and Manage all types of Carriers.'
        },
        // {
        //   title: 'Settings',
        //   link: '/settings',
        //   description: 'Setup My Schedule, Type of Inspection etc.'
        // },
        {
          title: 'Mortgages',
          key: 'mortagages',
          link: '/mortgages',
          description: 'View, Add and Manage all types of Mortgages.'
        },
        {
          title: 'Reports',
          key: 'reports',
          link: '/reports',
          description: 'Download files.'
        },
        {
          title: 'Admin',
          key: 'admin',
          link: '/admin',
          description: 'Setup Company , account, email, actions etc.'
        },
        {
          title: 'Manage Users',
          key: 'manage-users',
          link: '/manage-users',
          description: 'View, Add and Manage all types of Vendors.'
        },
        {
          title: 'Configuration',
          key: 'configuration',
          link: '/configuration',
          description: 'View, Add and Manage all types of configuration.'
        },
        {
          title: 'Profile',
          key: 'profile',
          link: '/edit-profile',
          description: 'Edit profile '
        }
      ],
      sidebarItems: [],
      estimator: ['dashboard', 'claims', 'profile'],
      vendor: ['dashboard', 'claims', 'profile'],
      owner: [
        'dashboard',
        'leads',
        'clients',
        'claims',
        'vendors',
        'carriers',
        'mortagages',
        'reports',
        'admin',
        'manage-users',
        'configuration'
      ]
    };
  },

  methods: {
    ...mapActions([
      'deletePushNotificationToken',
      'getClaims',
      'getActiveLeadsList',
      'getArchivedLeadsList',
      'getClients'
    ]),
    ...mapMutations(['setConvertedLead']),
    async logout() {
      if (!isPushNotificationsAvailable) {
        await this.deletePushNotificationToken(this.getFCMToken());
      }
      await this.removeFirebaseToken();
      this.removeFCMToken();
      this.removeToken();
      this.removeCurrentUser();
      location.reload();
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
      } else if ((name = 'Clients')) {
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

    createSidebarMenuItems() {
      const roles = getCurrentUser().attributes.roles;
      roles.forEach(role => {
        this[role.machineValue].forEach(item => {
          let obj = this.linksData.find(link => link.key === item);
          let index = this.sidebarItems.findIndex(x => x.key === obj.key);
          if (index < 0) {
            this.sidebarItems.push(obj);
          }
        });
      });
    }
  },

  computed: {
    currentRouteName() {
      return this.$router.history.current.path.substring(1);
    },
    ...mapGetters(['converted'])
  },

  created() {
    if (window.innerWidth * 0.9 < 300) {
      this.intViewportWidth = window.innerWidth * 0.9;
    } else {
      this.intViewportWidth = 300;
    }
    if (this.getCurrentUser().attributes) {
      this.user = getCurrentUser().attributes;
      this.createSidebarMenuItems();
    }
    if (this.$q.screen.width < 992) {
      this.isLeftSidePanelOpen = false;
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
  background-color: $sidePanel;
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
}
</style>
