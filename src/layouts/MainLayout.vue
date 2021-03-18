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

export default {
  name: 'MainLayout',
  components: { CustomHeader },
  methods: {
    onBackButtonClick() {
      const route = this.$router.currentRoute.fullPath.substring(1);
      if (
        route == 'leads-dashboard' ||
        route == 'clients' ||
        route == 'vendors' ||
        route == 'admin' ||
        route == 'settings'
      ) {
        this.$router.push('/dashboard');
      } else if (route == 'leads') {
        this.$router.push('/leads-dashboard');
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>
