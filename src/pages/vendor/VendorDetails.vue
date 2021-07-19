<template>
  <div>
    <!-- <div class="q-ml-md text-h6">
        {{ selectedVendor.name ? selectedVendor.name : '-' }}
      </div> -->

    <q-list bordered>
      <q-expansion-item
        group="vendorGroup"
        label="Vendor Info"
        header-class="text-primary"
        default-opened
        dense
        class="q-mt-xs"
      >
        <q-card-section>
          <VendorCompanyInfo />
        </q-card-section>
      </q-expansion-item>
    </q-list>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { onEmailClick, onPhoneNumberClick } from '@utils/clickable';
import VendorCompanyInfo from 'src/pages/vendor/VendorCompanyInfo';

export default {
  components: { VendorCompanyInfo },
  data() {
    return {
      dialogBoxes: [
        { name: 'Vendor Info' }
        // { name: 'Personnel' }
      ]
    };
  },
  computed: {
    ...mapGetters(['selectedVendor'])
  },

  methods: {
    ...mapActions(['getVendorDetails']),
    onEmailClick,
    onPhoneNumberClick,
    vendorDetailsDailogBoxOpen(value) {
      switch (value) {
        case 'Vendor Info':
          this.$router.push('/vendor-company-info/' + this.$route.params.id);
          break;
        case 'Personnel':
          this.$router.push('/vendor-personnel/' + this.$route.params.id);
      }
    }
  },
  mounted() {
    this.getVendorDetails(this.$route.params.id);
  }
};
</script>
