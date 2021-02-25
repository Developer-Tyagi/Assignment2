<template>
  <q-layout view="lhr lpR lfr">
    <div class="row">
      <div
        style="width: 5%; background-color: #1b2854"
        class="items-center q-py-lg q-px-lg"
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
              class=" text-white q-px-lg q-pt-lg justified-center"
              @click="$router.push(`/dashboard`)"
            >
              Dashboard
            </div>

            <div>
              <div class=" q-pa-md  text-white" style="max-width: 350px">
                <div bordered class=" bg-white rounded-borders">
                  <q-expansion-item
                    class="text-black"
                    expand-separator
                    label=" Settings"
                  >
                    <q-card>
                      <q-card-section>
                        <div class="q-pa-xs border border-dark ">
                          <div
                            class="q-ma-xs"
                            style="text-decoration:none"
                            @click="$router.push(`/setConfiguration`)"
                          >
                            Inspection Type
                          </div>

                          <div class="q-ma-xs border border-red" outlined>
                            Industry Type
                          </div>
                          <div class="q-ma-xs border border-red" outlined>
                            Honorific
                          </div>
                          <div class="q-ma-xs border border-red" outlined>
                            Phone Type
                          </div>
                          <div class="q-ma-xs border border-red" outlined>
                            Client Type
                          </div>
                          <div class="q-ma-xs border border-red" outlined>
                            Policy Categories
                          </div>
                          <div class="q-ma-xs border border-red" outlined>
                            Policy Type
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                </div>
              </div>
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
<style lang="scss">
.a {
  text-decoration: none;
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
