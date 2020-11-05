<template>
  <q-layout view="lhr lpR lfr">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="isLeftSidePanelOpen = !isLeftSidePanelOpen">
        </q-btn>
        <div class="text-uppercase text-bold">{{currentRoute}}</div>
      </q-toolbar>
    </q-header>
    <q-drawer
        v-model="isLeftSidePanelOpen"
        show-if-above
        :width="400"
        :breakpoint="600"
        content-class="bg-side-panel">
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section>

              <q-item-section>
                Inbox
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">Razvan Stoenescu</div>
            <div>@rstoenescu</div>
          </div>
        </q-img>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  
  name: 'MainLayout',
  data () {
    return {
      isLeftSidePanelOpen : false,
      currentRoute : (this.$router.currentRoute.path).substring(1) 
    }
  }
};
</script>
