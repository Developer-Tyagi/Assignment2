<template>
  <q-page class="bg-white full-width">
    <q-header bordered class="bg-white">
      <q-toolbar class="row bg-white">
        <img
          src="~assets/close.svg"
          alt="back-arrow"
          @click="closeDialog(false)"
          style="margin: auto 0"
        />
        <div class="text-uppercase text-bold text-black q-mx-auto">
          ADD NEW {{ componentName }}
        </div>
      </q-toolbar>
    </q-header>
    <div style="padding-top: 51px">
      <q-form
        class="q-pa-lg"
        style="height: calc(100vh - 51px)"
        ref="vendorForm"
      >
        <div
          class="full-width"
          style="
            height: calc(100vh - 145px);
            overflow-y: auto;
            margin-bottom: 10px;
          "
        >
          <q-input
            v-model="vendor.name"
            label=" Company Name"
            lazy-rules
            :rules="[val => (val && val.length) || '']"
          />
          <q-select
            v-model="vendor.industry.value"
            :options="vendorIndustries"
            label=" Industry"
            option-label="name"
            option-value="name"
            @input="setVendorIndustryName()"
            emit-value
          />
          <p class="form-heading">Company's Contact Person Details</p>
          <q-select
            v-model="vendor.contact[0].honorific.value"
            :options="titles"
            option-label="title"
            label="Title"
            option-value="title"
            @input="setTitleName()"
            emit-value
          />
          <q-input v-model="vendor.contact[0].fname" label="First Name" />
          <q-input v-model="vendor.contact[0].lname" label="Last Name" />
          <div class="row">
            <q-select
              v-model="vendor.contact[0].phoneNumber.type"
              :options="contactTypes"
              option-value="machineName"
              option-label="name"
              label="Type"
              style="width: 40%; margin-right: auto"
              emit-value
            />
            <q-input
              v-model="vendor.contact[0].phoneNumber.number"
              label="Phone"
              type="number"
              style="width: 55%"
            />
          </div>
          <q-input
            v-model="vendor.contact[0].email"
            type="email"
            label="Email"
          />
          <div class="row" v-if="componentName === 'carrier'">
            <p class="q-mx-none q-my-auto">
              <label> Can Claim be Filed by email</label>
            </p>
            <q-toggle
              class="q-ml-auto"
              v-model="vendor.meta.claimFiledByEmail"
            />
          </div>

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
          <q-input v-model="vendor.address.postalCode" label="ZIP Code" />
          <q-select
            v-model="vendor.address.addressCountry"
            :options="countries"
            label="Country"
            @input="onCountrySelect(vendor.address.addressCountry)"
            lazy-rules
            :rules="[val => (val && val.length > 0) || '']"
          />
          <p class="form-heading">Company's Phone & Website</p>
          <div v-for="(contactInfo, index) in vendor.contact" v-if="index >= 1">
            <q-input v-model="contactInfo.fname" label="First Name" />
            <q-input v-model="contactInfo.lname" label="LastName" />
            <q-select
              v-model="contactInfo.honorific.value"
              :options="titles"
              option-label="title"
              label="Title"
              option-value="title"
              @input="setTitleNameForMultiple()"
              emit-value
            />

            <div class="row">
              <q-select
                v-model="contactInfo.phoneNumber.type"
                :options="contactTypes"
                option-value="name"
                option-label="name"
                label="Type"
                style="width: 40%; margin-right: auto"
                emit-value
              />
              <q-input
                v-model="contactInfo.phoneNumber.number"
                label="Phone1"
                type="number"
                style="width: 55%"
              />
            </div>
            <q-input
              v-model="contactInfo.email"
              novalidate="true"
              label="email"
            />
          </div>
          <div @click="addAnotherContact" class="q-pa-md text-capitalize">
            + another
          </div>
          <q-input v-model="vendor.info.website" label="Website" />
          <q-input v-model="vendor.info.notes" label="Notes" />
        </div>
        <q-btn
          color="primary"
          class="full-width q-mt-auto text-capitalize"
          @click="onAddVendorButtonClick"
          size="'xl'"
        >
          Add {{ componentName }}
        </q-btn>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import AddressService from "@utils/country";
const addressService = new AddressService();
import { mapGetters, mapActions } from "vuex";
import { getVendorIndustries } from "src/store/vendors/actions";
import { getContactTypes, getTitles } from "src/store/common/actions";

export default {
  name: "AddVendor",
  props: ["componentName"],
  data() {
    return {
      industryTypes: ["Association"],
      countries: [],
      states: [],
      vendor: {
        name: "",
        industry: { value: "", id: "" },
        meta: {
          claimFiledByEmail: false
        },
        contact: [
          {
            fname: "",
            lname: "",
            email: "",
            honorific: {
              id: "",
              value: ""
            },
            phoneNumber: [
              {
                type: "",
                number: ""
              }
            ],
            isPrimary: true
          },
          {
            fname: "",
            lname: "",
            email: "",
            honorific: {
              id: "",
              value: ""
            },
            phoneNumber: [
              {
                type: "",
                number: ""
              }
            ]
          }
        ],

        address: {
          addressCountry: "United States",
          addressLocality: "",
          addressRegion: "",
          postOfficeBoxNumber: "",
          postalCode: "",
          streetAddress: ""
        },
        info: {
          website: "",
          notes: ""
        }
      }
    };
  },

  computed: {
    ...mapGetters(["contactTypes", "vendorIndustries", "titles"])
  },

  mounted() {
    this.getVendorIndustries();
    this.getTitles();
    this.getContactTypes();
    if (this.componentName && this.componentName === "carrier") {
      let industryType = this.vendorIndustries.find(
        o => o.machineValue === "carrier"
      );
      if (industryType.name && industryType.id) {
        this.vendor.industry.value = industryType.name;
        this.vendor.industry.id = industryType.id;
      }
    }
  },

  methods: {
    ...mapActions([
      "addVendor",
      "getVendorIndustries",
      "getTitles",
      "getContactTypes"
    ]),

    /* for adding the ids for multiple vendors */
    setTitleNameForMultiple() {
      const len = this.vendor.contact.length;

      var titleId1 = this.vendor.contact[len - 1].honorific.value;

      var titleResult1 = this.titles.find(obj => {
        return obj.title === titleId1;
      });
      this.vendor.contact[len - 1].honorific.id = titleResult1.id;
    },
    /* for adding the id for the primary vendor */
    setTitleName() {
      var titleId = this.vendor.contact[0].honorific.value;

      var titleResult = this.titles.find(obj => {
        return obj.title === titleId;
      });

      this.vendor.contact[0].honorific.id = titleResult.id;
    },

    setVendorIndustryName() {
      var ids = this.vendor.industry.value;

      var result = this.vendorIndustries.find(obj => {
        return obj.name === ids;
      });

      var industryName = result.name;
      var industryId = result.id;

      this.vendor.industry.value = industryName;
      this.vendor.industry.id = industryId;
    },

    addAnotherContact() {
      const len = this.vendor.contact.length;
      if (
        this.vendor.contact[len - 1].fname &&
        this.vendor.contact[len - 1].phoneNumber.phone
      ) {
        this.vendor.contact.push({
          fname: "",
          lname: "",
          email: "",
          honorific: {
            id: "",
            value: ""
          },
          phoneNumber: [
            {
              type: "",
              phone: ""
            }
          ]
        });
      } else {
        this.$q.notify({
          message: "Please fill the above details first",
          position: "top",
          type: "negative"
        });
      }
    },

    onCountrySelect(country) {
      this.states = addressService.getStates(country);
    },

    onAddVendorButtonClick() {
      this.$refs.vendorForm.validate().then(async success => {
        if (success) {
          this.addVendor(this.vendor).then(async => {
            this.closeDialog(true);
          });
        }
      });
    },

    closeDialog(flag) {
      this.$emit("closeDialog", flag);
    }
  },

  created() {
    this.countries = addressService.getCountries();
    this.onCountrySelect("United States");
  }
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
