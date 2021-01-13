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
          ADD NEW{{ componentName }}
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
            v-model="vendor.industry.name"
            :options="vendorIndustries"
            label=" Industry"
            option-label="name"
            option-value="name"
            @input="setVendorIndustryName()"
            emit-value
          />
          <p class="form-heading">Company's Contact Person Details</p>
          <q-select
            v-model="vendor.contact[0].honorific.title"
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
              v-model="vendor.contact[0].phoneNumber[0].type"
              :options="contactTypes"
              option-value="machineName"
              option-label="name"
              map-options
              label="Type"
              style="width: 40%; margin-right: auto"
            />
            <q-input
              v-model="vendor.contact[0].phoneNumber[0].number"
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
          <div class="row" v-if="this.pageFrom">
            <p class="q-mx-none q-my-auto">
              can claim be filed by email
            </p>
            <q-toggle class="q-ml-auto" v-model="vendor.claimFiledByEmail" />
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
              v-model="contactInfo.honorific.title"
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
                option-value="machineName"
                option-label="name"
                map-options
                label="Type"
                style="width: 40%; margin-right: auto"
              />
              <q-input
                v-model="contactInfo.phoneNumber.phone"
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
          >Add {{ pageFrom }}</q-btn
        >
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
  props: ["pageFrom", "componentName"],
  title: "",
  data() {
    return {
      industryTypes: ["Association"],
      countries: [],
      states: [],
      vendor: {
        name: "",
        industry: { name: "", id: "" },
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
              title: ""
            },
            phoneNumber: [
              {
                type: "",
                phone: ""
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
              title: ""
            },
            phoneNumber: [
              {
                type: "",
                phone: ""
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
    if (this.pageFrom) {
      this.vendor.name = this.pageFrom;
      this.titles = this.pageFrom;
      //console.log(this.pageFrom);
    }
    this.titles = this.name;

    this.getVendorIndustries();
    this.getTitles();
    this.getContactTypes();
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

      var titleId1 = this.vendor.contact[len - 1].honorific.title;

      var titleResult1 = this.titles.find(obj => {
        return obj.title === titleId1;
      });
      this.vendor.contact[len - 1].honorific.id = titleResult1.id;
    },
    /* for adding the id for the primary vendor */
    setTitleName() {
      var titleId = this.vendor.contact[0].honorific.title;

      var titleResult = this.titles.find(obj => {
        return obj.title === titleId;
      });

      this.vendor.contact[0].honorific.id = titleResult.id;
    },

    setVendorIndustryName() {
      var ids = this.vendor.industry.name;

      var result = this.vendorIndustries.find(obj => {
        return obj.name === ids;
      });

      var industryName = result.name;
      var industryId = result.id;

      this.vendor.industry.name = industryName;
      this.vendor.industry.id = industryId;
    },

    addAnotherContact() {
      const len = this.vendor.contact.length;
      if (
        this.vendor.contact[len - 1].fname &&
        this.vendor.contact[len - 1].phoneNumber
      ) {
        this.vendor.contact.push({
          fname: "",
          lname: "",
          email: "",
          honorific: {
            id: "",
            title: ""
          },
          phoneNumber: [
            {
              type: "mobile",
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
