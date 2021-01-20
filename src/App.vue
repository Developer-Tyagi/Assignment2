<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters(['showLoading', 'notification'])
  },
  watch: {
    showLoading(val) {
      if (val) {
        this.$q.loading.show({
          spinnerColor: 'primary',
          spinnerSize: 50,
          backgroundColor: 'white'
        });
      } else {
        this.$q.loading.hide();
      }
    },
    notification(data) {
      if (data) {
        this.$q.notify({
          ...data,
          position: 'top'
        });
      }
    }
  }
};
</script>
