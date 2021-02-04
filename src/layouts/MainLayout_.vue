<template>
  <q-layout view="lHh Lpr lFf">
    <div class="row justify-between items-center q-pa-lg">
      <q-img src="~assets/insideLogo.png" style="width: 142px; height: 45px" />
      <q-img
        src="~assets/LogIn-Logout Icon.svg"
        style="width: 24px; height: 24px"
      />
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data() {
    return {
      leftDrawerOpen: false
    };
  }
};
</script>
