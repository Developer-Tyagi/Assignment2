<template>
  <q-page>
     <q-header bordered class="bg-white">
      <q-toolbar class="row bg-white">
        <img
          src="~assets/left-arrow.svg"
          alt="back-arrow"
          @click="$router.push('/vendors')"
          style="margin: auto 0"
        />
        <div class="text-uppercase text-bold text-black q-mx-auto">
          {{ $route.name }}
        </div>
      </q-toolbar>
    </q-header>
    <div style="padding-top: 51px">
      <q-form class="q-pa-lg" style="height: calc(100vh - 51px)" ref="vendorForm">
        <div
          class="full-width"
          style="
            height: calc(100vh - 145px);
            overflow-y: auto;
            margin-bottom: 10px;
          "
        >
          <q-input v-model="vendor.name" label="Vendor Company Name" lazy-rules
              :rules="[(val) => (val && val.length ) || '']"/>

          <q-select
            v-model="vendor.industry"
            :options="industryTypes"
            label="Vendor Industry"
          />
          
          <p class="form-heading">Company's Contact Person Details</p>
          <q-input v-model="vendor.contact.fname" label="First Name" />
          <q-input v-model="vendor.contact.lname" label="Last Name" />
          <div class="row">
            <q-input
              v-model="vendor.contact.phoneNumber[0].number"
              label="Phone"
              type="number"
              style="width: 65%"
            />
            <q-select
              v-model="vendor.contact.phoneNumber[0].type"
              :options="contactType"
              label="Type"
              style="width: 30%; margin-left: auto"
            />
          </div>
          <q-input v-model="vendor.contact.email" label="Email" />
          <p class="form-heading">Company's Address</p>
          <q-input v-model="vendor.address.streetAddress" label="Address1" />
          <q-input
            v-model="vendor.address.postOfficeBoxNumber"
            label="Address2"
          />
          <q-input
            v-model="vendor.address.addressLocality"
            label="City"
          ></q-input>
          <q-select
            v-model="vendor.address.addressRegion"
            :options="states"
            label="State"
          />
          <q-input
            v-model="vendor.address.postalCode"
            label="ZIP Code"
          />
          <q-select
            v-model="vendor.address.addressCountry"
            :options="countries"
            label="Country"
            @input="onCountrySelect(vendor.address.addressCountry)"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '']"
          />
          <p class="form-heading">Company's Phone & Website</p>
          <div class="row">
            <q-input
              v-model="vendor.info.phoneNumbers[0].number"
              label="Phone1"
              type="number"
              style="width: 65%"
            />
            <q-select
              v-model="vendor.info.phoneNumbers[0].type"
              :options="contactType"
              label="Type1"
              style="width: 30%; margin-left: auto"
            />
          </div>
          <div class="row">
            <q-input
              v-model="vendor.info.phoneNumbers[1].number"
              label="Phone2"
              type="number"
              style="width: 65%"
            />
            <q-select
              v-model="vendor.info.phoneNumbers[1].type"
              :options="contactType"
              label="Type2"
              style="width: 30%; margin-left: auto"
            />
          </div>
          <q-input v-model="vendor.info.website" label="Website" />
          <q-input v-model="vendor.info.notes" label="Notes" />
        </div>
        <q-btn
          label="Add Vendor"
          color="primary"
          class="full-width q-mt-auto text-capitalize"
          @click="onAddVendorButtonClick"
          size="'xl'"
        ></q-btn>
      </q-form>
    </div>
  </q-page>
</template>
<script>
import AddressService from "@utils/country";
const addressService = new AddressService();
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      industryTypes: ["Association"],
      countries: [],
      states: [],
      vendor: {
        name: "",
        industry: "",
        contact: {
          fname: "",
          lname: "",
          email: "",
          phoneNumber: [
            {
              type: "mobile",
              number: "",
            },
          ],
        },
        address: {
          addressCountry: "United States",
          addressLocality: "",
          addressRegion: "",
          postOfficeBoxNumber: "",
          postalCode: "",
          streetAddress: "",
        },
        info: {
          phoneNumbers: [
            {
              type: "pager",
              number: "",
            },
            {
              type: "mobile",
              number: "",
            },
          ],
          website: "",
          notes: "",
        },
      },
    };
  },

  computed: {
    ...mapGetters(["contactType"]),
  },

  methods: {
    ...mapActions(["addVendor"]),
    onCountrySelect(country) {
      this.states = addressService.getStates(country);
    },

    onAddVendorButtonClick() {
      this.$refs.vendorForm.validate().then(async (success) => {
        if (success) {
          this.addVendor(this.vendor);
        }
      });
    },
  },

  created() {
    this.countries = addressService.getCountries();
    this.onCountrySelect("United States");
  },
};
</script>
<style lang="scss" scoped>
.form-heading {
  color: #333333;
  font-weight: bold;
  font-size: 14px;
  margin: 24px 0;
}

::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
</style>