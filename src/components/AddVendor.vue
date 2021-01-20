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
            :rules="[
              val => (val && val.length > 0) || 'Please fill the first name'
            ]"
          />
          <div>
            <q-select
              class="full-width"
              v-model="vendor.industry.value"
              use-input
              input-debounce="0"
              option-label="name"
              label=" Industry"
              :options="options"
              option-value="name"
              @filter="filterFn"
              style="width: 250px"
              behavior="menu"
              emit-value
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please fill the first name'
              ]"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-black">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>

          <p class="form-heading">Company's Contact Person Details</p>
          <q-select
            v-model="vendor.contact[0].honorific.id"
            :options="titles"
            label="Title"
            option-label="name"
            option-value="id"
            map-options
            emit-value
            @input="setTitleName(vendor.contact[0].honorific)"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Please choose the Title'
            ]"
          />
          <q-input
            v-model="vendor.contact[0].fname"
            label="First Name"
            lazy-rules
            :rules="[val => (val && val.length) || '']"
          />
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
          <div
            outline
            v-for="(contactInfo, index) in vendor.contact"
            v-if="index >= 1"
          >
            <q-card class="q-mt-sm">
              <q-select
                v-model="contactInfo.honorific.id"
                :options="titles"
                option-label="name"
                label="Title"
                option-value="id"
                @input="setTitleName(contactInfo.honorific)"
                emit-value
                map-options
              />
              <q-input
                v-model="contactInfo.fname"
                label="First Name"
                :rules="[
                  val => (val && val.length > 0) || 'Please fill the first name'
                ]"
              />
              <q-input v-model="contactInfo.lname" label="Last Name" />
              <div class="row">
                <q-select
                  v-model="contactInfo.phoneNumber.type"
                  :options="contactTypes"
                  option-value="machineName"
                  option-label="name"
                  label="Type"
                  style="width: 40%; margin-right: auto"
                  emit-value
                  :rules="[val => (val && val.length > 0) || '']"
                />
                <q-input
                  v-model="contactInfo.phoneNumber.number"
                  label="Phone1"
                  type="number"
                  style="width: 55%"
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'Please fill the phone number'
                  ]"
                />
              </div>
              <q-input
                v-model="contactInfo.email"
                novalidate="true"
                label="Email"
              />
            </q-card>
          </div>
          <div class="row">
            <q-btn
              outline
              class="q-mt-sm"
              @click="addAnotherContact"
              color="primary"
              label="Add-Another"
              style=" margin-right: auto"
            />

            <q-btn
              outline
              @click="removeAnotherContact"
              class="q-mt-sm"
              color="primary"
              label="Remove"
              v-if="isShowRemoveButton"
            />
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
//const stringOptions = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];
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
      options: "",
      industryTypes: ["Association"],
      countries: [],
      states: [],
      isShowRemoveButton: false,
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
    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.options = this.vendorIndustries;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase().trim();

        this.options = this.vendorIndustries.filter(
          v =>
            v.name
              .toLowerCase()
              .trim()
              .indexOf(needle) > -1
        );
      });
    },

    removeAnotherContact() {
      const len = this.vendor.contact.length;
      if (len === 3) {
        this.isShowRemoveButton = false;
      }

      this.vendor.contact.pop();
    },

    setTitleName(selectedTitle) {
      const selected = this.titles.find(obj => {
        return obj.id === selectedTitle.id;
      });

      selectedTitle.value = selected.title;
    },

    setVendorIndustryName() {
      const selectedName = this.vendor.industry.value;
      const result = this.vendorIndustries.find(obj => {
        return obj.name === selectedName;
      });
      this.vendor.industry.value = result.name;
      this.vendor.industry.id = result.id;
    },

    addAnotherContact() {
      const len = this.vendor.contact.length;
      this.$refs.vendorForm.validate();
      if (
        this.vendor.contact[len - 1].fname &&
        this.vendor.contact[len - 1].phoneNumber.number
      ) {
        this.isShowRemoveButton = true;
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
              number: ""
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

    async onAddVendorButtonClick() {
      const success = await this.$refs.vendorForm.validate();
      if (success) {
        const response = await this.addVendor(this.vendor);
        if (response) {
          this.closeDialog(true);
        }
      }
    },

    closeDialog(flag) {
      this.$emit("closeDialog", flag);
    }
  },

  created() {
    this.options = this.vendorIndustries;
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
