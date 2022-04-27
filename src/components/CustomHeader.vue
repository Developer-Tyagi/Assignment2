<template>
  <div>
    <!-- header -->
    <div v-if="$route.name != 'setup' && $route.name !== 'admin'">
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
            v-if="$route.name === 'dashboard'"
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

    <q-header class="bg-white">
      <!-- setup header -->
      <div class="row" v-if="$route.name == 'setup'">
        <div
          class="col-3 q-px-xl q-pt-md q-pb-md"
          v-if="$route.name == 'setup'"
          style="background-color: #f9e7d8"
        >
          <q-img src="~assets/Logo.svg" width="50%" />
        </div>
        <div class="col bg-white q-pt-md">
          <div class="row justify-end q-pr-xl">
            <q-avatar
              size="4em"
              font-size="2.5rem"
              icon="person"
              class="text-white bg-grey q-mr-md"
            >
            </q-avatar>

            <div
              class="q-pt-md text-capitalize text-weight-bold text-black text-subtitle1"
            >
              {{ userName ? userName : updatedUserName }}
            </div>
          </div>
          <q-separator class="q-mt-md" />
        </div>
      </div>
      <!-- admin header -->
      <div
        class="row header-color items-center text-center"
        :class="$q.screen.lt.sm ? 'justify-between' : 'justify-end'"
        v-if="$route.name == 'admin'"
        style="max-height: 100px; min-height: 70px"
      >
        <!-- menu icon -->
        <div class="col-sm-2 mobile-view">
          <q-btn
            flat
            dense
            color="primary"
            class="col-4 float-left"
            icon="menu"
            style="margin-left: 12px"
            aria-label="Menu"
            @click="onWebMenuButtonClick"
          ></q-btn>
        </div>
        <!-- logo -->
        <div class="col-sm-8 mobile-view">
          <img width="115" height="38.84" src="~assets/new_app_logo.svg" />
        </div>
        <div class="col-sm-2 mobile-view q-mr-sm">
          <img
            v-if="organization && organization.logo"
            class="header-logo"
            :class="isMobileResolution ? 'image-30' : 'image-40'"
            :src="organization.logo"
            alt="Company logo"
          />
          <img
            v-else
            :class="isMobileResolution ? 'image-30' : 'image-40'"
            :src="getImage('empty-company-logo.svg')"
            alt="Company logo"
          />
          <!-- <q-avatar
            size="3em"
            font-size="2.5rem"
            icon="person"
            class="text-white bg-grey float-right"
            style="margin-right: 9px"
          >
          </q-avatar> -->
        </div>

        <!-- user name -->
        <div class="col-8 row justify-end desktop-view"></div>
        <div class="col-4 row justify-end desktop-view">
          <div class="flex-row items-center">
            <img
              v-if="organization && organization.logo"
              class="header-logo"
              :class="isMobileResolution ? 'image-30' : 'image-40'"
              :src="organization.logo"
              alt="Company logo"
            />
            <img
              v-else
              :class="isMobileResolution ? 'image-30' : 'image-40'"
              :src="getImage('empty-company-logo.svg')"
              alt="Company logo"
            />
            <!-- <q-avatar
              size="3em"
              font-size="2.5rem"
              icon="person"
              class="text-white bg-grey q-mr-md"
            >
            </q-avatar> -->

            <span
              class="text-capitalize text-weight-bold text-black text-subtitle1 ellipsis q-pl-sm"
            >
              {{ userName ? userName : updatedUserName }}
            </span>
          </div>
        </div>
      </div>
      <q-separator />

      <div
        v-if="$route.name !== 'setup' && !$q.screen.lt.sm"
        class="q-px-xl q-ml-lg q-mt-sm q-pt-xs"
      >
        <q-breadcrumbs style="color: #667085" active-color="#667085">
          <template v-slot:separator>
            <q-icon
              size="sm"
              name="chevron_right"
              color="#D0D5DD"
              style="color: #d0d5dd"
            />
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

    <!-- menu -->
    <div v-if="$route.name !== 'setup'">
      <!-- Menu Drawer for Mobile application-->

      <!--Menu Drawer for Web Applicaiton-->
      <q-drawer
        v-model="isLeftWebSidePanelOpen"
        :show-if-above="true"
        :width="300"
        :breakpoint="1023"
        bordered
      >
        <div class="full-height" style="background-color: #f9e7d8">
          <div class="col-2 q-mb-lg">
            <!-- <div v-if="miniState" class="row items-center">
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
            </div> -->
            <div class="row justify-center">
              <div class="col-6">
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
              <div class="q-pl-xl q-pt-sm fontWeight500 text-grey1">
                <q-icon name="arrow_back" size="xs" class="q-mr-sm" />
                <span>Back to dashboard</span>
              </div>
              <q-scroll-area style="height: 65vh">
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
                            class="q-ml-sm col-11 cursor-pointer text-subtitle2"
                            clickable
                            :class="
                              subOptionSelected.key == subMenuOption.key &&
                              webSubOptionMenuTab != ''
                                ? 'underlineItem'
                                : ''
                            "
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
                              <!-- <q-separator style="background: #ef5926" /> -->
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

                <!-- <div class="q-mt-xl q-ml-xl q-pt-xl">
                  <div class="row cursor-pointer" @click="logout()">
                    <div class="q-mt-xs text-subtitle2">Logout</div>
                    <q-icon size="sm" class="q-ml-xl">
                      <q-img :src="getImage('log_out.svg')" color="grey-4" />
                    </q-icon>
                  </div>
                </div> -->
              </q-scroll-area>
            </div>
          </div>
          <div class="col">
            <div
              class="q-mx-md bg-white text-center q-py-sm"
              style="border-radius: 10px"
            >
              Download Mobile App

              <div class="q-px-md">
                <img
                  class="web-menu-claim-guru-logo"
                  :src="getImage('Mobile_app_store_badge.svg')"
                />
              </div>
              <div class="q-px-lg">
                <a
                  target="_blank"
                  href="https://play.google.com/store/apps/details?id=com.claimguru.app"
                >
                  <img
                    class="web-menu-claim-guru-logo"
                    :src="getImage('Mobile_app_store_badge-1.svg')"
                  />
                </a>
              </div>
            </div>
          </div>
          <div class="col"></div>
        </div>
      </q-drawer>
    </div>
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
      updatedUserName: '',
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
      isLeftWebSidePanelOpen: false,
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
            // { name: ' Automation', key: 'actionItems' },
            {
              name: 'Global Data Management',
              key: 'global-data-management',
              link: '/configuration',
              subOption: [{ name: 'Template', key: 'template' }],
              icon: 'configuration_big.svg',
              description: 'View, Add and Manage all types of configuration.'
            },
            // Change the path to template later
            {
              name: 'Templates',
              key: 'templates',
              link: '/manage-users',
              icon: 'manage_users_big.svg',
              description: 'View, Add and Manage all types of Vendors.'
            },
            {
              name: 'Manage Users',
              key: 'manage-users',
              link: '/manage-users',
              icon: 'manage_users_big.svg',
              description: 'View, Add and Manage all types of Vendors.'
            },
            {
              name: 'Reports',
              key: 'reports',
              link: '/reports',
              icon: 'reports_menu.svg',
              description: 'Download files.'
            },
            // Change the path to billing later
            {
              name: 'Billings',
              key: 'billing',
              link: '/billing',
              icon: 'reports_menu.svg',
              description: 'Download files.'
            }
          ],
          icon: 'admin_big.svg',
          description: 'Setup Company , account, email, actions etc.'
        }
        // Hiding Profile for now , if we need this in future we can unhide it.
        // {
        //   title: 'Profile',
        //   key: 'profile',
        //   link: '/edit-profile',
        //   icon: 'profile_big.svg',
        //   description: 'Edit profile '
        // }
      ],

      sidebarItems: []
    };
  },
  mounted() {
    this.webMenuSubOptionTab(this.linksDataForWebDrawer[0].subOption[0]);
    const route = this.$router.currentRoute.fullPath.split('/')[1];
    for (let i = 0; i < this.linksDataForWebDrawer.length; i++) {
      if (this.linksDataForWebDrawer[i].link.slice(1) == route) {
        this.parentColorMenuItem = this.linksDataForWebDrawer[i].title;
        this.breadcrumbsData.menuItemTitle =
          this.linksDataForWebDrawer[i].title;
        this.breadcrumbsData.menuItem = this.linksDataForWebDrawer[i];
        this.breadcrumbsData.menuItemLink = this.linksDataForWebDrawer[i].link;
        if (this.linksDataForWebDrawer[i].subOption) {
          for (
            let j = 0;
            j < this.linksDataForWebDrawer[i].subOption.length;
            j++
          ) {
            if (
              this.linksDataForWebDrawer[i].subOption[j].name ==
              this.webSubOptionMenuTab.name
            )
              this.breadcrumbsData.subItemTitle =
                this.linksDataForWebDrawer[i].subOption[j].name;
          }
        }
      }
    }
  },

  methods: {
    ...mapActions([
      'deletePushNotificationToken',
      'getClaims',
      'getActiveLeadsList',
      'getArchivedLeadsList',
      'getClients',
      'getAccess',
      'getOrganization'
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
      this.breadcrumbsData.menuItemLink = key.link;
      this.breadcrumbsData.subItemTitle = key.name;
      this.breadcrumbsData.menuItem = menuItem;
      this.subOptionSelected = key;
      const route = this.$router.currentRoute.fullPath.split('/')[1];
      // console.log("RoutE:",route,"Link SLice:",link.slice(1),'key.link',key.link)
      if (route != link.slice(1)) {
        this.$router.push(key.link);
      }
      // if (route != key.link) {
      //   this.$router.push(key.link);
      // }
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
        if (menuItem.link.slice(1) == 'admin') {
          this.openSubOptionMenuItem(
            menuItem.subOption[0],
            menuItem.link,
            menuItem
          );
        } else if (menuItem.link.slice(1) == 'configuration') {
          this.$router.push(menuItem.link);
          this.webMenuSubOptionTab('');
        } else {
          this.$router.push(menuItem.link);
        }
      } else {
        if (menuItem.link.slice(1) == 'admin') {
          this.openSubOptionMenuItem(
            this.webSubOptionMenuTab,
            menuItem.link,
            menuItem
          );
        } else if (menuItem.link.slice(1) == 'configuration') {
          this.webMenuSubOptionTab('');
        }
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
    onWebMenuButtonClick() {
      if (this.isLeftWebSidePanelOpen == true) {
        this.isLeftWebSidePanelOpen = false;
      } else {
        this.isLeftWebSidePanelOpen = true;
      }
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
      'isOfflineClientEdit',
      'userName',
      'organization',
      'isMobileResolution'
    ])
  },
  async created() {
    await this.getOrganization();
    if (window.innerWidth * 0.9 < 300) {
      this.intViewportWidth = window.innerWidth * 0.9;
    } else {
      this.intViewportWidth = 300;
    }
    if (this.getCurrentUser().attributes) {
      let currentUser = getCurrentUser().attributes.contact;
      const firstName = currentUser.fname;
      const lastName = currentUser.lname;
      this.user = getCurrentUser().attributes;
      this.updatedUserName = firstName + ' ' + lastName;
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
.mobile-view {
  @media only screen and (max-width: 1023px) {
    display: block;
  }
  @media only screen and (min-width: 1024px) {
    display: none;
  }
}
.desktop-view {
  @media only screen and (max-width: 1023px) {
    display: none;
  }
  @media only screen and (min-width: 1024px) {
    display: block;
  }
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
.header-color {
  @media only screen and (max-width: 1023px) {
    background: #f9e7d8;
  }
  @media only screen and (min-width: 1024px) {
    background: #ffffff;
  }
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
.underlineItem {
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-decoration-color: #ef5926;
}
</style>
