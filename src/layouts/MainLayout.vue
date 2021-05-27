<template>
  <q-layout view="lhr lpR lfr">
    <CustomHeader @backButton="onBackButtonClick" />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import CustomHeader from 'components/CustomHeader';
import { getCurrentUser } from '@utils/auth';
export default {
  name: 'MainLayout',
  components: { CustomHeader },
  methods: {
    onBackButtonClick() {
      this.userRole = getCurrentUser().attributes.roles[0];
      const route = this.$router.currentRoute.fullPath.substring(1);
      if (
        route == 'leads-dashboard' ||
        route == 'clients' ||
        route == 'vendors' ||
        route == 'admin' ||
        route == 'settings' ||
        route == 'claims' ||
        route == 'mortgage'
      ) {
        this.$router.push('/dashboard');
      } else if (route == 'leads') {
        this.$router.push('/leads-dashboard');
      } else if (route == 'claim-summary' && this.userRole == 'estimator') {
        this.$router.push('/claims');
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>
