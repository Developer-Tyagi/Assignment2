<template>
  <div class="mobile-container-page-without-search">
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
        v-if="!params.industry && showFilter"
        class="q-ml-auto row q-pr-md"
        @click="filterDialog = true"
      >
        <img src="~assets/filter.svg" />
      </div>
      <q-btn
        v-if="params.industry && showFilter"
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
    <div class="mobile-container-page" v-if="vendors.length">
      <div
        v-for="vendor in vendors"
        :key="vendor.id"
        class="listing-item clients-list"
        @click="onVendorSelect(vendor, $event)"
        style="overflow-y: auto"
      >
        <q-item-section>
          <span class="form-heading fit-content">{{
            vendor.companyName ? vendor.companyName : ''
          }}</span>
          <span>{{ vendor.name ? vendor.name : '' }}</span>
          <div v-if="vendor.mailingAddress">
            <div>
              {{
                vendor.mailingAddress ? vendor.mailingAddress.houseNumber : '-'
              }}
              {{
                vendor.mailingAddress.address1
                  ? vendor.mailingAddress.address1
                  : '-'
              }}
            </div>
            <div v-if="vendor.mailingAddress && vendor.mailingAddress.address2">
              {{ vendor.mailingAddress.address2 }}
            </div>
            <div class="row">
              {{
                vendor.mailingAddress.addressLocality
                  ? vendor.mailingAddress.addressLocality
                  : '-'
              }}
              ,
              {{
                vendor.mailingAddress.addressRegion
                  ? toGetStateShortName(vendor.mailingAddress.addressRegion)
                  : '-'
              }}
              {{
                vendor.mailingAddress.postalCode
                  ? vendor.mailingAddress.postalCode
                  : '-'
              }}
              <q-icon
                name="place"
                color="primary"
                @click="sendMap(vendor.mailingAddress, $event)"
                class="q-ml-auto"
                size="sm"
              ></q-icon>
            </div>
          </div>
          <div class="q-mt-xs fit-content" v-if="vendor.phoneNumber">
            <span v-if="vendor.phoneNumber.type"
              >{{ vendor.phoneNumber.type }} :
            </span>
            <span
              class="clickLink"
              @click="onPhoneNumberClick(vendor.phoneNumber.number, $event)"
              >{{ showPhoneNumber(vendor.phoneNumber.number) }}</span
            >
          </div>
          <span
            class="click-link fit-content"
            @click="onEmailClick(vendor.email, $event)"
            >{{ vendor.email }}</span
          >
        </q-item-section>
        <q-icon
          v-if="vendor.name === selectedVendorName"
          name="done"
          size="xs"
          class="q-ml-auto"
        />
      </div>
    </div>
    <q-dialog
      v-model="filterDialog"
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
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { toGetStateShortName } from '@utils/common';
import {
  onEmailClick,
  onPhoneNumberClick,
  sendMap,
  showPhoneNumber
} from '@utils/clickable';
export default {
  name: 'VendorsList',
  props: [
    'selectedVendorName',
    'selectVendor',
    'showFilter',
    'filterName',
    'showVendorDetails'
  ],
  data() {
    return {
      searchText: '',
      filterDialog: false,
      selectedFilter: '',
      params: {
        industry: '',
        name: ''
      }
    };
  },
  computed: {
    ...mapGetters(['vendors', 'vendorIndustries'])
  },

  mounted() {
    if (this.filterName) {
      this.params.industry = this.filterName;
    }
    this.getVendors(this.params);
  },

  methods: {
    ...mapActions(['getVendors', 'getAllConfigurationTableData']),

    selectFilter(filter) {
      this.selectedFilter = filter.id;
    },

    onEmailClick,
    onPhoneNumberClick,
    sendMap,
    showPhoneNumber,
    toGetStateShortName,

    applyFilter() {
      this.params.industry = this.selectedFilter;
      this.getVendors(this.params);
      this.filterDialog = false;
    },

    search(event) {
      this.params.name = event;
      this.getVendors(this.params);
    },

    onVendorSelect(vendor, e) {
      if (this.selectVendor) {
        e.stopPropagation();
        this.$emit('afterSelecting', vendor);
      } else {
        this.$router.push('/vendor-details/' + vendor.id);
      }
    },

    clearFilter() {
      this.params.industry = '';
      this.selectedFilter = '';
      this.getVendors(this.params);
    },

    onAddButtonClick() {
      this.$emit('addVendor', true);
    }
  }
};
</script>

<style lang="scss">
.actions-div {
  display: flex;
  border-bottom: 1px solid #0000001f;
  align-items: center;
}

.filters-list-item {
  color: #666666;
  padding: 20px;
  border-bottom: 1px solid lightgray;
  text-transform: capitalize;
}

.text-green {
  color: green;
}
</style>
