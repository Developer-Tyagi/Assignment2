<template>
  <q-layout class=" " view="lhr lpR lfr">
    <div class="row">
      <div
        style="width: 5%; background-color: #1b2854"
        class="items-center q-py-lg q-px-md"
      >
        <q-btn
          flat
          color="white"
          dense
          icon="menu"
          aria-label="Menu"
          @click="onMenuButtonClick"
        >
        </q-btn>
      </div>
      <div style="width: 95%">
        <q-drawer
          v-model="isLeftSidePanelOpen"
          :width="intViewportWidth"
          :breakpoint="300"
          content-class="bg-side-panel"
          @hide="onMenuHide()"
        >
          <q-toolbar class=" items-center q-py-lg q-px-md">
            <q-btn
              v-if="isLeftSidePanelOpen == true"
              flat
              dense
              color="white"
              icon="menu"
              aria-label="Menu"
              @click="onMenuButtonClick"
            >
            </q-btn>
          </q-toolbar>

          <q-scroll-area style="height: calc(100% - 220px)">
            <div
              class=" text-white q-pa-xl justified-center"
              @click="$router.back()"
            >
              Dashboard
            </div>
          </q-scroll-area>
        </q-drawer>

        <q-page-container>
          <div class="row justify-between items-center q-pa-lg">
            <div class="bg-transparent col-1 q-ml-xl">
              <q-img src="~assets/insideLogo.png" />
            </div>
            <div class="q-mr-xl">
              <q-img
                src="~assets/LogIn-Logout Icon.svg"
                style="height: 24px; width: 24px"
              />
            </div>
          </div>

          <router-view />
        </q-page-container>
      </div>
    </div>
  </q-layout>
</template>

<script>
// import { removeToken, removeCurrentUser } from '@utils/auth';
export default {
  name: 'AdminLayout',
  data() {
    return {
      user: {
        name: ''
      },
      isLeftSidePanelOpen: false,
      intViewportWidth: 0
    };
  },

  methods: {
    onMenuButtonClick() {
      this.isLeftSidePanelOpen = !this.isLeftSidePanelOpen;
    },

    onMenuHide() {
      this.isLeftSidePanelOpen = false;
    }
  },

  computed: {},

  created() {
    if (window.innerWidth * 0.9 < 400) {
      this.intViewportWidth = window.innerWidth * 0.9;
    } else {
      this.intViewportWidth = 200;
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
