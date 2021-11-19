<template>
  <q-page
    class="mobile-container-page"
    :style-fn="offset => ({ paddingTop: `${offset - 40}px` })"
  >
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
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <AddVendor
          @closeDialog="closeAddVendorDialog"
          :componentName="'Add Vendor'"
          :isEdit="false"
        />
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import VendorsList from 'components/VendorsList';
import AddVendor from 'components/AddVendor';
import { mapGetters, mapActions } from 'vuex';
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
  created() {
    this.getTitles();
    this.getContactTypes();
    this.getVendorIndustries();
    this.getVendors(this.params);
  },
  computed: {
    ...mapGetters([
      'contactTypes',
      'vendorIndustries',
      'titles',
      'selectedVendor'
    ])
  },
  methods: {
    ...mapActions([
      'getVendorIndustries',
      'getTitles',
      'getContactTypes',
      'getVendors'
    ]),
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
