<template>
  <div class="mobile-container-page-without-search">
    <VendorsList
      ref="list"
      :selective="false"
      :showFilter="true"
      :filterName="''"
      :vendorDetails="true"
      @addVendor="openAddVendorDialog"
    />

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
          :isEdit="false"
        />
      </q-card>
    </q-dialog>
  </div>
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
