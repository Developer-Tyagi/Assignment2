<template>
  <q-page>
    <div
      :class="{
        'mobile-container-page-without-search': !$q.platform.is.iphone,
        'mobile-container-page': $q.platform.is.iphone
      }"
    >
      <div class="full-height">
        <div class="clients-list q-ma-md listing-height">
          <div class="q-mb-lg">
            {{ selectedVendor }}
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';

export default {
  computed: {
    ...mapGetters(['selectedVendor'])
  },

  methods: {
    ...mapActions(['getVendorDetails']),
    onEmailClick(email, e) {
      e.stopPropagation();
      if (email) {
        window.open('mailto:' + email);
      }
    },

    onPhoneNumberClick(number, e) {
      e.stopPropagation();
      if (number) {
        window.open('tel:' + number);
      }
    }
  },
  mounted() {
    this.getVendorDetails(this.$route.params.id);
  }
};
</script>
