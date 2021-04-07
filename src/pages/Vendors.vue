<template>
  <q-page>
    <div
      :class="{
        'mobile-container-page-without-search': !$q.platform.is.iphone,
        'mobile-container-page': $q.platform.is.iphone
      }"
    >
      <VendorsList
        ref="list"
        :selective="false"
        :showFilter="true"
        :filterName="''"
        @addVendor="openAddVendorDialog"
      />
    </div>
    <q-dialog
      v-model="addVendorDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <AddVendor
          @closeDialog="closeAddVendorDialog"
          :componentName="constants.industries.VENDOR"
        />
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import VendorsList from 'components/VendorsList';
import AddVendor from 'components/AddVendor';
import { constants } from '@utils/constant';
export default {
  name: 'Vendors',
  components: { VendorsList, AddVendor },
  data() {
    return {
      addVendorDialog: false,
      vendorDialogFilterByIndustry: '',
      constants: constants
    };
  },

  methods: {
    closeAddVendorDialog(e) {
      this.addVendorDialog = false;
      if (e) {
        this.$refs.list.getVendors();
      }
    },
    openAddVendorDialog(e) {
      this.addVendorDialog = e;
    }
  }
};
</script>
