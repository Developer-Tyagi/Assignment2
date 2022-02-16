<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Vue from 'vue';
import VueSignaturePad from 'vue-signature-pad';
import VueCountryCode from 'vue-country-code-select';

Vue.use(VueSignaturePad);
Vue.use(VueCountryCode);
export default {
  name: 'App',
  methods: { ...mapActions(['changeNetworkStatus']) },
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
  },
  created() {
    window.addEventListener('load', () => {
      // now we listen for network status changes
      window.addEventListener('online', () => {
        this.changeNetworkStatus(true);
      });

      window.addEventListener('offline', () => {
        this.changeNetworkStatus(false);
      });
    });
  }
};
</script>
