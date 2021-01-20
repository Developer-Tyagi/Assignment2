<template>
  <div class="vendor-list">
    <div class="actions-div">
      <q-input
        v-model="searchText"
        placeholder="Search"
        borderless
        @input="search($event)"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
      <div
        v-if="!params.industry && showFilter"
        class="q-ml-auto row"
        @click="filterDialog = true"
      >
        <img src="~assets/filter.svg" />Filters
      </div>
      <q-btn
        v-if="params.industry && showFilter"
        class="q-ml-auto"
        color="white"
        text-color="grey"
        @click="clearFilter()"
        flat
        dense
        style="font-weight: 400"
        >Clear</q-btn
      >
    </div>
    <div>
      <div
        v-for="vendor in vendors"
        :key="vendor.id"
        class="vendor-list-item"
        @click="selectVendor(vendor)"
      >
        <span>{{ vendor.name }}</span>
        <q-icon
          v-if="vendor.selected"
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
          style="height:51px;border-bottom: 1px solid #0000001f;"
          class="bg-white"
        >
          <img
            src="~assets/close.svg"
            alt="close"
            @click="filterDialog = false"
          />
          <q-space />
          <div class="text-uppercase text-bold text-black">
            Filters
          </div>
          <q-space />
          <q-btn color="primary" text-color="white" @click="applyFilter()"
            >Apply</q-btn
          >
        </q-bar>
        <div class="filters">
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
                :val="filter.id"
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
import { mapActions, mapGetters } from "vuex";
export default {
  name: "VendorsList",
  props: ["selective", "showFilter", "filterName"],
  data() {
    return {
      searchText: "",
      filterDialog: false,
      selectedFilter: "",
      params: {
        industry: "",
        name: ""
      }
    };
  },
  computed: {
    ...mapGetters(["vendors", "vendorIndustries"])
  },

  mounted() {
    if (this.filterName) {
      this.params.industry = this.filterName;
    }
    this.getVendorIndustries();
    this.getVendors(this.params);
  },

  methods: {
    ...mapActions(["getVendors", "getVendorIndustries"]),

    selectFilter(filter) {
      this.selectedFilter = filter.id;
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
      if (this.selective) {
        this.vendors.forEach(vendor => {
          vendor.selected = false;
        });
        vendor.selected = true;
        if (!this.showFilter) {
          this.$emit("selectedVendor", vendor, false);
        } else {
          this.$emit("selectedVendor", vendor, true);
        }
      }
    },

    clearFilter() {
      this.params.industry = "";
      this.selectedFilter = "";
      this.getVendors(this.params);
    }
  }
};
</script>

<style lang="scss">
.vendor-list {
  padding-top: 51px;
  color: #666666;
  .actions-div {
    display: flex;
    border-bottom: 1px solid #0000001f;
    padding: 0 20px;
    align-items: center;
  }
  .vendor-list-item {
    padding: 20px;
    border-bottom: 1px solid lightgray;
    text-transform: capitalize;
    display: flex;
  }
}
.filters {
  .filters-list-item {
    color: #666666;
    padding: 20px;
    border-bottom: 1px solid lightgray;
    text-transform: capitalize;
  }
}
.text-green {
  color: green;
}
</style>
