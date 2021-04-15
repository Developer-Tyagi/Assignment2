<template>
  <div
    :class="{
      'mobile-container-page-without-search': !$q.platform.is.iphone
    }"
  >
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
      <q-btn @click="onAddButtonClick" flat><img src="~assets/add.svg"/></q-btn>
    </div>
    <div class="mobile-container-page" v-if="vendors.length">
      <div
        v-for="vendor in vendors"
        :key="vendor.id"
        class="vendor-list-item clients-list  "
        @click="selectVendor(vendor)"
        style="overflow-y: auto;"
      >
        <q-item-section
          clickable
          v-ripple
          @click="onVendorNameClick(vendor)"
          v-if="vendorDetails"
        >
          <span class="text-bold">{{ vendor.name }}</span>
          <div v-if="vendor.address">
            <div>
              {{ vendor.address ? vendor.address.houseNumber : '-' }}
              {{
                vendor.address.streetAddress
                  ? vendor.address.streetAddress
                  : '-'
              }}
            </div>
            <div>
              {{
                vendor.address.addressLocality
                  ? vendor.address.addressLocality
                  : '-'
              }},{{
                vendor.address.addressRegion
                  ? vendor.address.addressRegion
                  : '-'
              }}
            </div>
            <div>
              {{
                vendor.address.addressCountry
                  ? vendor.address.addressCountry
                  : '-'
              }}
            </div>
          </div>
          <div
            class="q-mt-sm"
            v-for="(contact, index) in vendor.contact"
            v-if="vendor.contact"
          >
            <div
              v-for="(phone, index) in contact.phoneNumber"
              v-if="contact.phoneNumber"
            >
              <span v-if="phone.type">{{ phone.type }} : </span>
              <span
                class="clickLink"
                @click="onPhoneNumberClick(phone.number, $event)"
                >{{ phone.number }}</span
              >
            </div>
            <div
              class="click-link"
              @click="onEmailClick(contact.email, $event)"
            >
              {{ contact.email }}
            </div>
          </div>
        </q-item-section>
        <span v-else
          ><span class="text-bold">{{ vendor.name }}</span>
          <div v-if="vendor.address">
            <div>
              {{ vendor.address ? vendor.address.houseNumber : '-' }}
              {{
                vendor.address.streetAddress
                  ? vendor.address.streetAddress
                  : '-'
              }}
            </div>
            <div>
              {{
                vendor.address.addressLocality
                  ? vendor.address.addressLocality
                  : '-'
              }},{{
                vendor.address.addressRegion
                  ? vendor.address.addressRegion
                  : '-'
              }}
            </div>
            <div>
              {{
                vendor.address.addressCountry
                  ? vendor.address.addressCountry
                  : '-'
              }}
            </div>
          </div>
          <div
            class=" q-mt-sm"
            v-for="(contact, index) in vendor.contact"
            v-if="vendor.contact"
          >
            <div
              v-for="(phone, index) in contact.phoneNumber"
              v-if="contact.phoneNumber"
            >
              <span v-if="phone.type">{{ phone.type }} : </span>
              <span>{{ phone.number }}</span>
            </div>
            <div>{{ contact.email }}</div>
          </div>
        </span>
        <q-icon
          v-if="vendor.name === carrierName"
          name="done"
          size="xs"
          class="q-ml-auto"
        />
      </div>
    </div>
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
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { onEmailClick, onPhoneNumberClick } from '@utils/clickable';
export default {
  name: 'VendorsList',
  props: [
    'carrierName',
    'selective',
    'showFilter',
    'filterName',
    'valueName',
    'vendorDetails'
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
    this.getVendorIndustries();
    this.getVendors(this.params);
  },

  methods: {
    ...mapActions(['getVendors', 'getVendorIndustries']),

    selectFilter(filter) {
      this.selectedFilter = filter.id;
    },
    onEmailClick,
    onPhoneNumberClick,
    onVendorNameClick(vendor) {
      this.$router.push('/vendor-details/' + vendor.id);
    },
    applyFilter() {
      this.params.industry = this.selectedFilter;
      this.getVendors(this.params);
      this.filterDialog = false;
    },

    search(event) {
      this.params.name = event;
      this.getVendors(this.params);
    },

    selectVendor(vendor) {
      const dialogName = this.valueName;

      if (this.selective) {
        if (!this.showFilter) {
          this.$emit('selectedVendor', vendor, dialogName);
        } else {
          this.$emit('selectedVendor', vendor, dialogName);
        }
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
.vendor-list-item {
  padding: 20px;
  border-bottom: 1px solid lightgray;
  text-transform: capitalize;
  display: flex;
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
