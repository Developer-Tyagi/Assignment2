<template>
  <q-page padding>
    <q-btn round icon="keyboard_backspace" @click="addVendor"></q-btn>
    <div class="addVendor">
      <q-btn round icon="search" @click="addVendor"></q-btn>
      <q-btn round color="orange" icon="add" @click="addVendor"></q-btn>
    </div>
    <h5>{{message}}</h5>
    <p>Filter</p>
    <q-option-group v-model="panel" inline :options="vendorTypes"></q-option-group>
    <q-tab-panels v-model="panel" animated class="shadow-2 rounded-borders">
      <q-tab-panel name="plumbers">
        <q-list bordered separator>
          <q-item
            v-for="(vendor) in vendorsData"
            :key="vendor.id"
            class="q-my-sm"
            clickable
            v-ripple
          >
            <q-item-section>
              <q-item-label>{{vendor.attributes.name}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import axios from "axios";
export default {
  name: "Leads",

  methods: {
    getVendors: function(event) {
      // API endpoint is hardcoded for testing.
      axios
        .get(
          "https://56564994-ccad-41d5-989e-839ceca5232d.mock.pstmn.io/v1/vendors",
          {
            headers: {
              "Content-Type": "application/vnd.api+json",
              Accept: "application/vnd.api+json",
              Authorization: ""
            }
          }
        )
        .then(
          response => {
            this.vendorsData = response["data"]["data"];
          },
          error => {
            console.log(error);
            this.showForm = false;
            this.showError("Sorry, Couldn't retrieve profile data");
          }
        );
    },
    getVendorTypes: function(event) {
      console.log("hello");
      this.vendorsData.forEach(function(vendor) {
        console.log("hello1");
        console.log(vendor.attributes.type);
      });
    },
    addVendor() {
      this.$router.push("/add-lead");
    }
  },
  mounted() {
    this.getVendors();
    this.getVendorTypes();
  },
  data() {
    return {
      message: "Vendors",
      vendorsData: [],
      vendorTypes: [
        { value: "plumbers", label: "Plumbers" },
        { value: "lossDetails", label: "Water Mitigation" },
        { value: "insurance", label: "Electrians" },
        { value: "other", label: "NOTES & SOURCE" }
      ],
      panel: "primary"
    };
  }
};
</script>

<style>
.addVendor {
  position: absolute;
  right: 20px;
}
</style>
