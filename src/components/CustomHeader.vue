<template>
  <div>
    <div v-if="isMobile()">
      <q-header class="bg-white">
        <q-toolbar
          class="row bg-primary rounded-header"
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
            <!--Here By default the Page should be Active Lead, we change the header name based on the user routing, if user click on converted Lead then we land it to converted lead page and show the converted lead data, if user click on
          Dead lead then we land on Dead Lead page and show Dead Lead Datamfrom lead Dashboard page-->
            <span v-if="$route.name == 'Leads'">{{
              converted ? converted : 'Active'
            }}</span>
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
    </div>
    <q-header v-if="!isMobile()" class="bg-white q-py-lg">
      <div class="justify-end row items-center q-mr-lg q-px-xl">
        <q-avatar
          size="4em"
          font-size="2.5rem"
          icon="person"
          class="text-white bg-grey q-mr-md"
        >
        </q-avatar>

        <div class="text-capitalize text-weight-bold text-black text-subtitle1">
          {{ user.name }}
        </div>
        <q-icon
          class="q-ml-sm"
          color="primary"
          size="md"
          name="expand_more"
        ></q-icon>
      </div>
      <q-separator class="q-my-lg" v-if="!isMobile()" />

      <div v-if="!isMobile()" class="q-px-xl q-ml-lg q-mt-sm q-pt-xs">
        <q-breadcrumbs style="color: #667085" active-color="#667085">
          <template v-slot:separator>
            <q-icon size="sm" name="chevron_right" color="#D0D5DD" />
          </template>
          <q-breadcrumbs-el
            class="cursor-pointer"
            @click="onClickBreadcrumbsHome()"
          >
            <q-icon class="">
              <q-img :src="getImage('breadcrumbs-home.svg')" color="primary" />
            </q-icon>
          </q-breadcrumbs-el>
          <q-breadcrumbs-el
            class="cursor-pointer"
            :label="breadcrumbsData.menuItemTitle"
            @click="onClickBreadcrumbsItem(breadcrumbsData.menuItem)"
          />
          <q-breadcrumbs-el
            v-if="breadcrumbsData.subItemTitle && webSubOptionMenuTab != ''"
            :label="breadcrumbsData.subItemTitle"
          />
        </q-breadcrumbs>
      </div>
    </q-header>

    <!-- Menu Drawer for Mobile application-->
    <q-drawer
      v-if="isMobile()"
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
            <div
              class="text-capitalize ellipsis-2-lines"
              style="width: 100%; line-height: 1.2"
            >
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
                (link.title != 'Dashboard' || isMobile()) &&
                (link.title != 'Claims' || isMobile()) &&
                (link.title != 'Clients' || isMobile()) &&
                (link.title != 'Leads' || isMobile()) &&
                (link.title != 'Vendors' || isMobile()) &&
                (link.title != 'Carriers' || isMobile()) &&
                (link.title != 'Mortgages' || isMobile()) &&
                (link.title != 'Vendors' || isMobile()) &&
                (link.title != 'Carriers' || isMobile()) &&
                (link.title != 'Mortgages' || isMobile()) &&
                (link.title != 'Manage Users' || !isMobile()) &&
                (link.title != 'Configuration' || !isMobile()) &&
                (link.title != 'Admin' || !isMobile())
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

    <!--Menu Drawer for Web Applicaiton-->
    <q-drawer
      v-model="webDrawer"
      :mini="!webDrawer || miniState"
      show-if-above
      :width="290"
      :breakpoint="400"
      bordered
      v-else
    >
      <div class="full-height" style="background-color: #f9e7d8">
        <div class="col-2 q-mb-lg">
          <div v-if="miniState" class="row items-center">
            <div class="col q-ml-md q-py-md">
              <q-btn
                dense
                round
                unelevated
                color="primary"
                icon="chevron_right"
                @click="webDrawerCollapse()"
              />
            </div>
          </div>
          <div class="row items-center" v-else>
            <div v-if="!miniState" class="col-2 q-ml-md">
              <q-btn
                dense
                round
                unelevated
                color="primary"
                icon="chevron_left"
                @click="webDrawerCollapse()"
              />
            </div>
            <div class="col">
              <q-img
                class="web-menu-claim-guru-logo"
                :src="getImage('claimguru_new_logo.png')"
              />
            </div>
          </div>
        </div>
        <div class="col">
          <div v-if="miniState">
            <div
              class="column items-center"
              v-for="(menuItem, index) in linksDataForWebDrawer"
              :key="index"
            >
              <q-item>
                <q-item-section avatar>
                  <q-tooltip>
                    {{ menuItem.title }}
                  </q-tooltip>
                  <q-icon size="sm" class="q-mt-sm q-mb-sm">
                    <q-img :src="getImage(menuItem.icon)" color="grey-4" />
                  </q-icon>
                </q-item-section>
              </q-item>
            </div>
          </div>
          <div v-else>
            <q-scroll-area style="height: 80vh">
              <q-list>
                <q-item
                  v-for="(menuItem, index) in linksDataForWebDrawer"
                  :key="index"
                >
                  <q-item-section
                    v-if="menuItem.subOption"
                    @click="changeParentColor(menuItem.title)"
                  >
                    <q-expansion-item
                      group="somegroup"
                      @click="toRouteMenuBarPage(menuItem)"
                    >
                      <template v-slot:header>
                        <q-item
                          :class="
                            parentColorMenuItem == menuItem.title
                              ? 'menu-item-styling'
                              : null
                          "
                        >
                          <q-item-section avatar>
                            <q-icon size="sm" class="q-my-sm">
                              <q-img
                                :src="getImage(menuItem.icon)"
                                color="primary"
                              />
                            </q-icon>
                          </q-item-section>
                          <q-item-section class="text-subtitle2">
                            {{ menuItem.title }}
                          </q-item-section>
                        </q-item>
                      </template>

                      <q-item
                        class="q-ml-sm"
                        v-for="(subMenuOption, index) in menuItem.subOption"
                        :key="index"
                      >
                        <q-item-section
                          class="q-ml-xl col-11 cursor-pointer text-subtitle2"
                          clickable
                          @click="
                            openSubOptionMenuItem(
                              subMenuOption,
                              menuItem.link,
                              menuItem
                            )
                          "
                        >
                          {{ subMenuOption.name }}
                          <div
                            class="q-mr-xl q-pr-lg"
                            v-if="
                              subOptionSelected.key == subMenuOption.key &&
                              webSubOptionMenuTab != ''
                            "
                          >
                            <q-separator style="background: #ef5926" />
                          </div>
                        </q-item-section>
                      </q-item>
                    </q-expansion-item>
                  </q-item-section>

                  <q-item-section
                    @click="changeParentColor(menuItem.title)"
                    :class="
                      parentColorMenuItem == menuItem.title
                        ? 'menu-item-styling-non-component'
                        : null
                    "
                    v-else
                    class="col-12 q-ml-md"
                    clickable
                  >
                    <q-expansion-item
                      group="somegroup"
                      expand-icon="disabled"
                      @click="toRouteMenuBarPage(menuItem)"
                    >
                      <template v-slot:header>
                        <q-item-section avatar>
                          <q-icon size="sm" class="q-mt-sm q-mb-sm">
                            <q-img
                              :src="getImage(menuItem.icon)"
                              color="grey-4"
                            />
                          </q-icon>
                        </q-item-section>
                        <q-item-section class="text-subtitle2">
                          {{ menuItem.title }}
                        </q-item-section>
                      </template>
                    </q-expansion-item>
                  </q-item-section>
                </q-item>
              </q-list>

              <div class="q-mt-xl q-ml-xl q-pt-xl">
                <div class="row cursor-pointer" @click="logout()">
                  <div class="q-mt-xs text-subtitle2">Logout</div>
                  <q-icon size="sm" class="q-ml-xl">
                    <q-img :src="getImage('log_out.svg')" color="grey-4" />
                  </q-icon>
                </div>
              </div>
            </q-scroll-area>
          </div>
        </div>
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
      webDrawer: true,
      miniState: false,
      user: {
        name: ''
      },
      breadcrumbsData: {
        menuItemTitle: '',
        menuItemLink: '',
        subItemTitle: '',
        menuItem: {}
      },
      subOptionSelected: {},
      parentColorMenuItem: '',
      isLeftSidePanelOpen: false,
      intViewportWidth: 0,
      linksDataForMobileDrawer: [
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
          title: 'Reports',
          key: 'reports',
          link: '/reports',
          icon: 'reports_mobile_menu.svg',
          description: 'Download files.'
        },

        {
          title: 'Profile',
          key: 'profile',
          link: '/edit-profile',
          icon: 'profile_mobile_menu.svg',
          description: 'Edit profile '
        }
      ],
      linksDataForWebDrawer: [
        {
          title: 'Admin',
          key: 'admin',
          link: '/admin',
          subOption: [
            { name: 'Account Summary', key: 'accountSummary' },
            { name: 'Group Permission ', key: 'groupPermission' },
            { name: ' Action items', key: 'actionItems' }
          ],
          icon: 'admin_big.svg',
          description: 'Setup Company , account, email, actions etc.'
        },
        {
          title: 'Configuration',
          key: 'configuration',
          link: '/configuration',
          subOption: [{ name: 'Template', key: 'template' }],
          icon: 'configuration_big.svg',
          description: 'View, Add and Manage all types of configuration.'
        },

        {
          title: 'Manage Users',
          key: 'manage-users',
          link: '/manage-users',
          icon: 'manage_users_big.svg',
          description: 'View, Add and Manage all types of Vendors.'
        },
        {
          title: 'Reports',
          key: 'reports',
          link: '/reports',
          icon: 'reports_menu.svg',
          description: 'Download files.'
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
  mounted() {
    this.webMenuSubOptionTab(this.linksDataForWebDrawer[0].subOption[0]);
    this.breadcrumbsData.menuItemTitle = this.linksDataForWebDrawer[0].title;
    this.breadcrumbsData.menuItemLink = this.linksDataForWebDrawer[0].link;
    this.breadcrumbsData.subItemTitle =
      this.linksDataForWebDrawer[0].subOption[0].name;
    this.breadcrumbsData.menuItem = this.linksDataForWebDrawer[0];
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
    //function is used to collapse the web-drawer in the

    webDrawerCollapse() {
      if (!this.miniState) this.miniState = true;
      else if (this.miniState) this.miniState = false;
    },
    //used to change the parent color of menu item
    changeParentColor(item) {
      this.parentColorMenuItem = item;
    },
    //function is used to route to the home page when click from the icon of Home in breadCrumbs
    onClickBreadcrumbsHome() {
      this.breadcrumbsData.menuItemTitle = this.linksDataForWebDrawer[0].title;
      this.breadcrumbsData.menuItemLink = this.linksDataForWebDrawer[0].link;
      this.breadcrumbsData.subItemTitle =
        this.linksDataForWebDrawer[0].subOption[0].name;
      this.breadcrumbsData.menuItem = this.linksDataForWebDrawer[0];
      const route = this.$router.currentRoute.fullPath.split('/')[1];
      if (route != this.breadcrumbsData.menuItemLink.slice(1)) {
        this.$router.push(this.breadcrumbsData.menuItemLink);
      }
      this.webMenuSubOptionTab(this.linksDataForWebDrawer[0].subOption[0]);
    },
    //function is used for routing through breadcrumbs item.
    onClickBreadcrumbsItem(item) {
      this.subOptionSelected = item.subOption[0];
      this.breadcrumbsData.menuItemTitle = item.title;
      this.breadcrumbsData.subItemTitle = item.subOption[0].name;
      const route = this.$router.currentRoute.fullPath.split('/')[1];
      if (route != item.link.slice(1)) {
        this.$router.push(item.link);
      }
      this.webMenuSubOptionTab(item.subOption[0]);
    },
    // function is used to open the suboption menu item for web.
    openSubOptionMenuItem(key, link, menuItem) {
      this.breadcrumbsData.menuItemTitle = menuItem.title;
      this.breadcrumbsData.menuItemLink = menuItem.link;
      this.breadcrumbsData.subItemTitle = key.name;
      this.breadcrumbsData.menuItem = menuItem;
      this.subOptionSelected = key;
      const route = this.$router.currentRoute.fullPath.split('/')[1];
      if (route != link.slice(1)) {
        this.$router.push(link);
      }
      this.webMenuSubOptionTab(key);
    },

    //this function is used to route the pages of menubar.
    toRouteMenuBarPage(menuItem) {
      (this.breadcrumbsData = {
        menuItemTitle: '',
        menuItemLink: '',
        subItemTitle: ''
      }),
        (this.breadcrumbsData.menuItemTitle = menuItem.title);
      this.breadcrumbsData.menuItemLink = menuItem.link;
      const route = this.$router.currentRoute.fullPath.split('/')[1];
      if (route != menuItem.link.slice(1)) {
        this.$router.push(menuItem.link);
      }
    },
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
    ...mapMutations([
      'setConvertedLead',
      'setEditOfflineClientIcon',
      'webMenuSubOptionTab'
    ]),
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

      for (let i = 0; i < this.linksDataForMobileDrawer.length; i++) {
        if (PageAccessItems.has(this.linksDataForMobileDrawer[i].key)) {
          this.sidebarItems.push(this.linksDataForMobileDrawer[i]);
        }
      }
    }
  },

  computed: {
    currentRouteName() {
      return this.$router.history.current.path.substring(1);
    },
    ...mapGetters([
      'webSubOptionMenuTab',
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
.rounded-sidebar {
  border-radius: 0px 20px 20px 0px;
  box-shadow: 1px 3px 2px 1px #e0e0e0;
}
::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}

.menu-item-styling {
  width: 270px;
  background: #ffffff;
  color: #000000;
  border-radius: 0 32px 32px 0;
  border-left: 4px solid #ef5926;
  left: 38%;
  padding-left: 45px;
  margin-left: -118px;
}
.menu-item-styling-non-component {
  width: 275px;
  background: #ffffff;
  color: #000000;
  border-radius: 0 32px 32px 0;
  border-left: 4px solid #ef5926;
  left: 50%;
  padding-left: 28px;
  margin-left: -16px;
}

//style for web menu top claimguru logo
.web-menu-claim-guru-logo {
  width: 151px;
  height: 51px;
  margin-top: 16px;
}
//this style is used to hide the hover.
.q-expansion-item {
  .q-focus-helper {
    visibility: hidden;
  }
}
.web-collapse-menu-style {
  background: #f9e7d8;
  height: 50px;
}

.breadcrumbs-style {
  color: #667085;
}
.q-item__section--avatar {
  min-width: 0px;
}
</style>
