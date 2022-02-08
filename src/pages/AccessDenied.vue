<template>
  <q-page>
    <div class="column q-mt-xl">
      <q-icon
        name="lock"
        size="xl"
        color="grey"
        style="margin: auto"
        class="q-mt-sm"
      />
      <p class="text-center q-mt-sm">
        You don't have permission to access this page.
      </p>
      <p class="text-center q-mt-sm">
        Contact the administrator to get permission or go to the home page
      </p>
      <p class="text-center q-mt-sm">and browse other pages</p>
      <q-btn style="width: 50%; margin: auto" @click="goToDashboard"
        >Go to Dashboard</q-btn
      >
      <span class="text-center text-subtitle2 q-my-lg">OR</span>
      <q-btn
        color="primary"
        class=""
        style="width: 50%; margin: auto"
        @click="logout()"
        >Logout</q-btn
      >
    </div>
  </q-page>
</template>
<script>
import { isMobile } from 'src/utils/common';
import {
  removeToken,
  removeCurrentUser,
  removeFCMToken,
  getFCMToken
} from '../utils/auth';
import { removeFirebaseToken } from '@utils/firebase';
import { mapActions } from 'vuex';
export default {
  methods: {
    ...mapActions(['deletePushNotificationToken']),

    goToDashboard() {
      if (isMobile()) {
        this.$router.push('/dashboard');
      } else {
        this.$router.push('/admin');
      }
    },
    removeToken,
    removeCurrentUser,
    removeFCMToken,
    getFCMToken,
    removeFirebaseToken,
    async logout() {
      if (this.getFCMToken()) {
        await this.deletePushNotificationToken(this.getFCMToken());
        await this.removeFCMToken();
      }
      await this.removeFirebaseToken();

      this.removeToken();
      this.removeCurrentUser();
      this.$router.push('/login');
    }
  }
};
</script>
