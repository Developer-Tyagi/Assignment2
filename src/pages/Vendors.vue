<template>
  <q-page style="padding-top: 0; height: 100vh">
    <q-header bordered class="bg-white">
      <q-toolbar class="row bg-white">
        <img
          src="~assets/left-arrow.svg"
          alt="back-arrow"
          @click="$router.push('/dashboard')"
          style="margin: auto 0"
        />
        <div class="text-uppercase text-bold text-black q-mx-auto">
          {{ $route.name }}
        </div>
        <img
          src="~assets/add.svg"
          alt=""
          @click="addVendorDialog = true"
          style="margin: 0 0 0 20px"
        />
      </q-toolbar>
    </q-header>
    <VendorsList
      ref="list"
      :selective="false"
      :showFilter="true"
      :filterName="''"
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
        />
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import VendorsList from 'components/VendorsList';
import AddVendor from 'components/AddVendor';
export default {
  name: 'Vendors',
  components: { VendorsList, AddVendor },
  data() {
    return { addVendorDialog: false, vendorDialogFilterByIndustry: '' };
  },
  methods: {
    closeAddVendorDialog(e) {
      this.addVendorDialog = false;
      if (e) {
        this.$refs.list.getVendors();
      }
    }
  }
};
</script>
