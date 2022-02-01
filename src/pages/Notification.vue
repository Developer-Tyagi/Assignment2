<template>
  <q-page>
    <div class="q-pa-md height-without-header">
      <div class="row justify-center q-mt-xl">
        <div class="col-3 bg-white q-pa-md">
          <q-img
            class="web-menu-claim-guru-logo"
            :src="getImage('claimguru_new_logo.png')"
          />
        </div>
      </div>
      <div class="row justify-center text-h3 q-mt-lg">
        You are now official! Welcome to ClaimGuru!
      </div>
      <div v-if="role == 'owner'">
        <div class="row justify-center text-h5 q-mt-lg">
          You now have access to your comapny's admin website and the mobile
          app.
        </div>
        <div class="row justify-center text-h5 q-mt-lg">
          <span
            class="text-blue q-mr-sm"
            style="text-decoration:underline"
            @click="goToAdmin"
            >Launch your company!</span
          >
          <q-icon color="black" size="md">
            <i class="fas fa-rocket"></i>
          </q-icon>
        </div>
        <div class="row justify-center text-h5 q-mt-xl">
          If you want to grab ClaimGuru app, you can fing the link here!
        </div>
      </div>
      <div v-else class="row justify-center text-h5 q-mt-xl">
        Grab the ClaimGuru mobile app and get started!
      </div>
      <div class="row justify-center q-mt-xl">
        <div class="col-2 bg-white q-pa-md">
          <q-img
            class="web-menu-claim-guru-logo"
            :src="getImage('Mobile_app_store_badge.svg')"
          />
        </div>
        <div class="col-2 bg-white q-pa-md">
          <a
            target="_blank"
            href="https://play.google.com/store/apps/details?id=com.claimguru.app"
          >
            <q-img
              class="web-menu-claim-guru-logo"
              :src="getImage('Mobile_app_store_badge-1.svg')"
            />
          </a>
        </div>
      </div>
      <div class="row justify-center text-h5 q-mt-xl">
        <a href="" class="text-blue" style="text-decoration: underline">
          Need support? Click here
        </a>
      </div>
    </div>
  </q-page>
</template>

<script>
import { getCurrentUser } from 'src/utils/auth';
export default {
  data() {
    return {
      role: '',
      user: []
    };
  },
  methods: {
    getImage(icon) {
      return require('../assets/' + icon);
    },
    goToAdmin() {
      this.$router.push('/admin');
    }
  },
  created() {
    if (getCurrentUser().attributes) {
      this.user = getCurrentUser().attributes;
      this.role = this.user.roles[0].machineValue;
    }
  }
};
</script>
