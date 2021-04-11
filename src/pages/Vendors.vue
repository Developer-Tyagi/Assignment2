<template>
  <q-page>
    <div
      :class="{
        'mobile-container-page-without-search': !$q.platform.is.iphone,
        'mobile-container-page': $q.platform.is.iphone
      }"
    >
      <!-- <div class="actions-div">
        <q-input
          dense
          placeholder="Search"
          v-model="searchText"
          borderless
          @input="search($event)"
          style="width: 100%"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <img
          src="~assets/close.svg"
          v-if="searchText"
          @click="onSearchBackButtonClick"
          style="margin: 0 20px"
        />
        <q-separator vertical></q-separator>
        <q-btn flat
          ><img src="~assets/add.svg" @click="addVendorDialog = true"
        /></q-btn>
      </div> -->
      <div class="actions-div">
        <q-input
          dense
          v-model="searchText"
          placeholder="Search"
          borderless
          @input="search($event)"
          class="full-width"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <div
          v-if="!params.industry"
          class="q-ml-auto row q-pr-md "
          @click="filterDialog = true"
        >
          <img src="~assets/filter.svg" />
        </div>
        <q-btn
          v-if="params.industry"
          class="q-ml-auto q-pr-md"
          color="white"
          text-color="grey"
          @click="clearFilter()"
          flat
          dense
          style="font-weight: 400"
          >Clear</q-btn
        >
        <q-separator vertical></q-separator>
        <q-btn @click="onAddButtonClick" flat
          ><img src="~assets/add.svg"
        /></q-btn>
      </div>

      <div class="listing-height">
        <div
          class="clients-list"
          v-for="vendor in vendors"
          :key="vendor.id"
          v-if="vendors.length"
        >
          <q-item-section clickable v-ripple @click="onVendorNameClick(vendor)">
            <div class="client-list-item">
              <div class="row">
                <span> {{ vendor.name }} </span>
              </div>
            </div>
          </q-item-section>
        </div>
        >
      </div>
    </div>

    <!-- <VendorsList
        ref="list"
        :selective="false"
        :showFilter="true"
        :filterName="''"
        @addVendor="openAddVendorDialog"
        @selectedVendor="onClosingVendorSelectDialog"
      /> -->

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

    <q-dialog
      v-model="filterDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-white">
        <q-bar
          style="height: 51px; border-bottom: 1px solid #0000001f"
          class="bg-grey-4"
        >
          <img
            src="~assets/close.svg"
            alt="close"
            @click="filterDialog = false"
          />
          <q-space />
          <div class="text-uppercase text-bold text-black">Filters</div>
          <q-space />
          <q-btn color="primary" text-color="white" @click="applyFilter()"
            >Apply</q-btn
          >
        </q-bar>
        <div class="mobile-container-page-without-search">
          <div
            v-for="filter in vendorIndustries"
            :key="filter.id"
            class="filters-list-item"
            @click="selectFilter(filter)"
          >
            <div class="row">
              {{ filter.name }}
              <q-radio
                v-model="selectedFilter"
                :val="filter.machineValue"
                dense
                class="q-ml-auto"
              />
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import VendorsList from 'components/VendorsList';
import AddVendor from 'components/AddVendor';
import { constants } from '@utils/constant';
import { mapGetters, mapActions, mapMutations } from 'vuex';
export default {
  name: 'Vendors',
  components: { VendorsList, AddVendor },
  data() {
    return {
      filterDialog: false,
      selectedFilter: '',
      addVendorDialog: false,
      vendorDialogFilterByIndustry: '',
      constants: constants,
      searchText: '',
      params: {
        industry: '',
        name: ''
      }
    };
  },
  computed: {
    ...mapGetters(['vendors', 'vendorIndustries'])
  },
  created() {
    this.getVendorIndustries();
    // this.getVendors();
    this.getVendors(this.params);
  },
  methods: {
    ...mapActions(['getVendors', 'getVendorIndustries']),
    ...mapMutations(['setSelectedVendor']),
    closeAddVendorDialog(e) {
      this.addVendorDialog = false;
      // if (e) {
      //   this.$refs.list.getVendors();
      // }
    },
    onVendorNameClick(vendor) {
      console.log(vendor.id);
      this.$router.push('/vendor-details/' + vendor.id);
    },
    onAddButtonClick() {
      this.addVendorDialog = true;
    },
    clearFilter() {
      this.params.industry = '';
      this.selectedFilter = '';
      this.getVendors(this.params);
    },
    applyFilter() {
      this.params.industry = this.selectedFilter;
      this.getVendors(this.params);
      this.filterDialog = false;
    },

    onSearchBackButtonClick() {
      this.searchText = '';
      this.search();
    },
    search(event) {
      this.params.name = event;
      this.getVendors(this.params);
    },
    openAddVendorDialog(e) {
      this.addVendorDialog = e;
    }
  }
};
</script>
