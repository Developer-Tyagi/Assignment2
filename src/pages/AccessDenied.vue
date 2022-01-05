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
    </div>
  </q-page>
</template>
<script>
import { isMobile } from 'src/utils/common';
export default {
  methods: {
    goToDashboard() {
      if (isMobile()) {
        this.$router.push('/dashboard');
      } else {
        this.$router.push('/admin');
      }
    }
  }
};
</script>
