<template>
  <div>
    <!-- header -->
    <div v-if="$route.name != 'onboarding' && $route.name !== 'admin'">
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
            Here By default the Page should be Active Lead, we change the header
            name based on the user routing, if user click on converted Lead then
            we land it to converted lead page and show the converted lead data,
            if user click on Dead lead then we land on Dead Lead page and show
            Dead Lead Datamfrom lead Dashboard page
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

    <div
      class="bg-white ht-83 sm-hide xs-hide bigScreen"
      :reveal-offset="false"
    >
      <!-- setup header -->
      <div class="row" v-if="$route.name == 'onboarding'">
        <div
          class="col-xl-3 col-md-4 q-pb-md max-width"
          style="background-color: #f9e7d8"
        >
          <q-img
            size="1em"
            src="~assets/Logo.svg"
            class="LogoSize"
            @click="clickedLogo"
          />
        </div>
        <div
          class="col-xl-9 padding-top-20 col-md-8 bg-white ht-83 justify-end q-pt-md"
        >
          <div
            class="row justify-end q-pr-xl"
            @click="openDropdown = !openDropdown"
          >
            <div style="position: relative; display: flex">
              <q-img
                size="1em"
                src="~assets/Avatarforprofile.svg"
                class="AvtarLogoSize"
              />

              <div class="q-pt-sm text-capitalize" style="margin-left: 5px">
                <span v-if="isMobile" class="userNameStyle">
                  {{ userName ? userName : updatedUserName }}</span
                >
                <q-img
                  size="1em"
                  src="~assets/Icondown.svg"
                  class="dropdownLogo"
                />
              </div>

              <q-popup-proxy
                ref="logoutProxy"
                class="bannerContainer"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-banner class="bg-white">
                  <div class="userDetailContainer">
                    <p class="userEmail">jaconjones@gmail.com</p>
                    <p class="companyName">10X Incubator</p>
                  </div>
                  <div class="logoutContainer">
                    <h6 class="logoutText">Log Out</h6>
                    <q-img src="~assets/LogOutIcon.svg" class="logoutLogo" />
                  </div>
                </q-banner>
              </q-popup-proxy>
            </div>
          </div>
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
        <div class="col-sm-2 mobile-view">
          <q-avatar
            size="3em"
            font-size="2.5rem"
            icon="person"
            class="text-white bg-grey float-right"
            style="margin-right: 9px"
          >
          </q-avatar>
        </div>

        <!-- user name -->
        <div class="col-8 row justify-end desktop-view"></div>
        <div class="col-4 row justify-end desktop-view">
          <div class="flex-row items-center">
            <q-avatar
              size="3em"
              font-size="2.5rem"
              icon="person"
              class="text-white bg-grey q-mr-md"
            >
            </q-avatar>

            <span
              class="text-capitalize text-weight-bold text-black text-subtitle1 ellipsis"
            >
              {{ userName ? userName : updatedUserName }}
            </span>
          </div>
        </div>
      </div>
      <!-- <q-separator /> -->
      <div
        v-if="!isMobile() && $route.name !== 'onboarding' && !$q.screen.lt.sm"
        class="q-px-xl q-ml-lg q-mt-sm q-pt-xs"
      >
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
    </div>

    <!-- menu -->
    <div v-if="$route.name !== 'onboarding'">
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
              class="col column text-weight-bold text-white q-pa-sm q-ml-md text-h6"
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
                  <div
                    class="row text-primary q-mb-sm"
                    style="max-height: 68px"
                  >
                    <div class="q-ml-lg col-2 q-mr-sm q-pt-xs">
                      <q-icon
                        :size="link.title == 'Reports' ? '2rem' : '2.5rem'"
                        :style="
                          link.title == 'Reports' ? 'padding-top:10px' : ''
                        "
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
        <!-- <q-separator class="q-mt-md q-mb-sm bg-primary" style="padding: none" /> -->
        <p class="text-black q-ml-md" style="opacity: 50%; font-size: 12px">
          Claimguru Version {{ this.version }}
        </p>
      </q-drawer>

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
// import QPopover from 'quasar-framework/src/components/popover/QPopover.js'
import { removeFirebaseToken } from '@utils/firebase';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { appVersion } from '../Version';
export default {
  name: 'CustomHeader',
  components: {
    // QPopover
  },
  data() {
    return {
      openDropdown: false,
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
    },
    clickedLogo() {
      window.location.href = 'https://claimguru.cilalabs.dev/';
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
      'userName'
    ]),
    userName() {
      // currentUser = getCurrentUser().attributes.contact
      // let fullName = this.userName
    }
  },
  async created() {
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
.AvtarLogoSize {
  width: 40px;
  height: 40px;
}
.q-header {
  margin: 0 auto !important;
  max-width: 120rem;
}
.q-pt-22 {
  padding-top: 22px;
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
.q-menu {
  border-radius: 20px !important;
  top: 70px !important;
}
.userDetailContainer {
  margin: 16px 39px 16px 16px;
  .userEmail {
    font-size: 12px;
    margin: 0px;
  }
  .companyName {
    font-size: 10px;
    margin-top: 4px;
  }
}
.logoutContainer {
  display: flex;
  justify-content: space-between;
  border-top: 2px solid #ccc;
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: 16px;
  padding-top: 8px;

  .logoutText {
    margin: 0px;
    padding: 0px;
    font-size: 16px;
  }
  .logoutLogo {
    height: 15px;
    width: 15px;
    margin-top: 5px;
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
.q-pt-22 {
  margin-top: 22px;
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

@media only screen and (min-width: 1440px) {
  .max-width {
    max-width: 480px;
  }
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
.bigScreen {
  margin: 0 auto !important;
  max-width: 120rem !important;
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
::v-deep .q-layout__section--marginal {
  background-color: white;
  border-top: none;
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
.ht-83 {
  height: 83px !important;
}
.mt-5 {
  margin-top: 5px;
}
.q-ml-32 {
  margin-left: 32px;
}
.padding-top-20 {
  padding-top: 20px;
}
.dropdownLogo {
  width: 12px;
  margin-top: -17px;
  height: 6;
  margin-left: 10px;
}
.LogoSize {
  width: 151px;
  height: 51px;
  margin-left: 32px;
  margin-top: 22px;
  margin-right: 10px;
}
.userNameStyle {
  color: #151821;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  display: inline-block;
  width: 170px;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
}
@media (min-width: 1024px) {
  .max-width {
    max-width: 480px !important;
  }
}
</style>
