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
        <div
          class="text-uppercase text-bold text-black q-mx-auto"
          v-if="!openSearchInput"
        >
          {{ $route.name }}
        </div>
        <!-- <img
          src="~assets/search.svg"
          alt="Search icon"
          @click="openSearchInput = true"
          style="margin: 0"
          v-if="vendors.length && !openSearchInput"
        /> -->
        <img
          src="~assets/add.svg"
          alt=""
          @click="addVendor"
          style="margin: 0 0 0 20px"
          v-if="!openSearchInput"
        />
        <q-input
          v-model="searchText"
          v-if="openSearchInput"
          placeholder="Search for leads"
          style="width: 80%; margin: 0 10%"
        >
        </q-input>
      </q-toolbar>
    </q-header>
    <div class="vendors-filter">
      <span class="filter-text">Filter</span>
      <div class="custom-chip" v-for="industry in vendorIndustries" :key="industry.id">
        {{ industry.name }}
      </div>
    </div>
    <div>
      <div v-for="vendor in vendors" :key="vendor.id" class="vendor-list-item">
        {{ vendor.name }}
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Vendors",
  data() {
    return {
      openSearchInput: false,
      searchText: "",
      vendorTypes: [
        { value: "association", label: "Association" },
        { value: "plumbers", label: "Plumbers" },
        { value: "lossDetails", label: "Water Mitigation" },
        { value: "electrians", label: "Electrians" },
        { value: "electrians", label: "Electrians" },
        { value: "electrians", label: "Electrians" },
      ],
    };
  },

  computed: {
    ...mapGetters(["vendors","vendorIndustries"]),
  },

  created() {
    // this.getVendorIndustries();
    this.getVendors();
  },

  methods: {
    ...mapActions(["getVendors","getVendorIndustries"]),

    addVendor() {
      this.$router.push("/add-vendor");
    },
  },
};
</script>

<style lang="scss">
.vendors-filter {
  width: 100%;
  overflow-x: scroll;
  padding: 67px 0 16px 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid lightgray;

  .custom-chip {
    border: 1px solid #eca74c;
    border-radius: 3px;
    color: #999999;
    font-size: 12px;
    text-align: center;
    padding: 5px;
    margin: 0 10px;
    white-space: nowrap;
  }
  .filter-text {
    color: #666666;
    font-weight: bold;
    font-size: 12px;
  }
}
.vendor-list-item {
  color: #666666;
  padding: 20px;
  border-bottom: 1px solid lightgray;
  text-transform: capitalize;
}
</style>
