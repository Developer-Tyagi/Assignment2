<template>
  <q-page>
    <q-header bordered class="bg-white">
      <q-toolbar class="row bg-white">
        <img
          src="~assets/left-arrow.svg"
          alt="back-arrow"
          @click="$router.push('/add-lead')"
        />
        <div class="text-uppercase text-bold text-black q-mx-auto">
          {{ $route.name }}
        </div>
      </q-toolbar>
    </q-header>
    <div style="padding-top: 51px">
      <q-stepper
        v-model="step"
        ref="stepper"
        contracted
        color="primary"
        animated
      >
        <q-step :name="1" :done="step > 1" title="Primary Contact">
          <q-form @submit="step++">
            <q-card class="form-card q-pa-md">
              <span class="stepper-heading">Primary Contact</span>
              <q-input
                v-model="primaryDetails.firstName"
                label="First Name"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Please fill the first name',
                ]"
              />
              <q-input
                v-model="primaryDetails.lastName"
                label="Last Name"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Please fill the last name',
                ]"
              />
              <div class="row">
                <q-input
                  v-model="primaryDetails.phoneNumber"
                  label="Phone"
                  type="number"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 7) || 'Please fill the phone number',
                  ]"
                  style="width: 65%"
                />
                <q-select
                  v-model="primaryDetails.selectedContactType"
                  :options="primaryDetails.contactType"
                  label="Mobile"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || '']"
                  style="width: 30%; margin-left: auto"
                ></q-select>
              </div>
              <q-input
                v-model="primaryDetails.email"
                label="Email"
                lazy-rules
                :rules="[
                  (val) =>
                    validateEmail(val) ||
                    'You have entered an invalid email address!',
                ]"
              />

              <div class="row">
                <p class="q-mx-none q-my-auto">
                  Is policy holder an organization ?
                </p>
                <q-toggle
                  v-model="primaryDetails.isOrganisation"
                  left-label
                  color="orange"
                  class="q-ml-auto"
                ></q-toggle>
              </div>
              <div v-if="primaryDetails.isOrganisation">
                <q-input
                  v-model="primaryDetails.organisationName"
                  label="Organization Name"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'Please fill the organization name ',
                  ]"
                />
              </div>
            </q-card>
            <div class="row q-pt-md">
              <div class="q-ml-auto">
                <span class="q-mr-md text-color-grey"> Next</span>
                <q-btn
                  class="rotate-180"
                  icon="keyboard_backspace"
                  text-color="primary"
                  padding="md"
                  type="submit"
                />
              </div>
            </div>
          </q-form>
        </q-step>

        <q-step :name="2" :done="step > 2" title="Loss Details">
          <q-form @submit="step++" @reset="step--">
            <q-card class="q-pa-md form-card">
              <span class="stepper-heading">Loss Details</span>
              <q-input
                v-model="lossDetails.dateOfLoss"
                type="date"
                placeholder="Date of Loss"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Please fill the date of loss ',
                ]"
              />
              <q-input
                v-model="lossDetails.lossDesc"
                label="Brief description of loss"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Please fill the loss description',
                ]"
              />
              <br />
              <span class="stepper-heading">Loss Location</span>
              <q-select
                v-model="lossDetails.country"
                :options="countries"
                label="Country"
                @input="onCountrySelect(lossDetails.country)"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please fill the country',
                ]"
              ></q-select>
              <q-input
                v-model="lossDetails.address1"
                label="Address1"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please fill the address',
                ]"
              />
              <q-input v-model="lossDetails.address2" label="Address2" />
              <q-input
                v-model="lossDetails.city"
                label="City"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please fill the city',
                ]"
              ></q-input>
              <q-select
                v-model="lossDetails.state"
                :options="states"
                label="State"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please fill the state',
                ]"
              ></q-select>
              <q-input
                v-model="lossDetails.postalCode"
                label="ZIP Code"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Please fill the zip code',
                ]"
              />
            </q-card>
            <div class="row q-pt-md">
              <div>
                <q-btn
                  icon="keyboard_backspace"
                  text-color="primary"
                  padding="md"
                  type="reset"
                />
                <span class="q-ml-md text-color-grey">Back</span>
              </div>
              <div class="q-ml-auto">
                <span class="q-mr-md text-color-grey"> Next</span>
                <q-btn
                  class="rotate-180"
                  icon="keyboard_backspace"
                  text-color="primary"
                  padding="md"
                  type="submit"
                />
              </div>
            </div>
          </q-form>
        </q-step>

        <q-step :name="3" :done="step > 3" title="Insurance">
          <q-form @submit="step++" @reset="step--">
            <q-card class="q-pa-md form-card">
              <span class="stepper-heading">Insurance Details (Optional)</span>
              <q-input
                v-model="insuranceDetails.carrierName"
                label="Carrier Name"
              />
              <q-input
                v-model="insuranceDetails.policyNumber"
                label="Policy Number"
              />
            </q-card>
            <div class="row q-pt-md">
              <div>
                <q-btn
                  icon="keyboard_backspace"
                  text-color="primary"
                  padding="md"
                  type="reset"
                />
                <span class="q-ml-md text-color-grey">Back</span>
              </div>
              <div class="q-ml-auto">
                <span class="q-mr-md text-color-grey"> Next</span>
                <q-btn
                  class="rotate-180"
                  icon="keyboard_backspace"
                  text-color="primary"
                  padding="md"
                  type="submit"
                />
              </div>
            </div>
          </q-form>
        </q-step>

        <q-step :name="4" :done="step > 4" title="Lead Source">
          <q-form @submit="step++" @reset="step--">
            <q-card class="q-pa-md form-card">
              <span class="stepper-heading">Choose Lead Source (Optional)</span>
              <div v-for="source in leadSources">
                <q-radio
                  v-model="sourceDetails.sourceType"
                  :val="source.value"
                  :label="source.label"
                />
                <q-input
                  v-if="source.placeholder"
                  type="text"
                  :placeholder="source.placeholder"
                  v-model="sourceDetails.sourceDetails"
                />
              </div>
            </q-card>
            <div class="row q-pt-md">
              <div>
                <q-btn
                  @click="$refs.stepper.previous()"
                  icon="keyboard_backspace"
                  text-color="primary"
                  padding="md"
                />
                <span class="q-ml-md text-color-grey">Back</span>
              </div>
              <div class="q-ml-auto">
                <span class="q-mr-md text-color-grey"> Next</span>
                <q-btn
                  class="rotate-180"
                  icon="keyboard_backspace"
                  text-color="primary"
                  padding="md"
                  type="submit"
                />
              </div>
            </div>
          </q-form>
        </q-step>

        <q-step :name="5" :done="step > 5" title="Notes">
          <q-form @submit="step++" @reset="step--">
            <q-card class="q-pa-md form-card">
              <p class="text-color-light-grey">
                Write relevent inforimation about this New Lead
              </p>
              <q-input
                v-model="notes"
                type="input"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please fill the notes',
                ]"
              />
            </q-card>
            <div class="row q-pt-md">
              <div>
                <q-btn
                  @click="$refs.stepper.previous()"
                  icon="keyboard_backspace"
                  text-color="primary"
                  padding="md"
                />
                <span class="q-ml-md text-color-grey">Back</span>
              </div>
              <div class="q-ml-auto">
                <span class="q-mr-md text-color-grey"> Next</span>
                <q-btn
                  class="rotate-180"
                  icon="keyboard_backspace"
                  text-color="primary"
                  padding="md"
                  type="submit"
                />
              </div>
            </div>
          </q-form>
        </q-step>

        <q-step :name="6" :done="step > 6" title="Scheduling">
          <q-form @submit="onSubmit" @reset="step--">
            <q-card class="q-pa-md form-card">
              <div class="stepper-heading">Scheduling</div>
              <q-toggle
                v-model="schedulingDetails.isAutomaticScheduling"
                label="Is automatic scheduling needed?"
                left-label
              ></q-toggle>
              <q-select
                v-model="schedulingDetails.inspectionType"
                :options="inspectionTypes"
                label="Type of Inspection"
                option-label="id"
                @input="onInspectionTypesSelect()"
              ></q-select>
              <q-select
                v-model="schedulingDetails.subInspectionType"
                :options="subInspectionTypes"
                label="Sub Type of Inspection"
              ></q-select>
              <q-input
                v-model="schedulingDetails.inspectionDuration"
                label="Duration of Inspection"
              />
            </q-card>
          </q-form>
          <div class="row q-pt-md">
            <div>
              <q-btn
                icon="keyboard_backspace"
                text-color="primary"
                padding="md"
              />
              <span class="q-ml-md text-color-grey">Back</span>
            </div>
            <div class="q-ml-auto">
              <span class="q-mr-md text-color-grey"> Add Lead</span>
              <q-btn
                class="rotate-180"
                icon="keyboard_backspace"
                text-color="primary"
                padding="md"
                type="submit"
              />
            </div>
          </div>
        </q-step>
      </q-stepper>
    </div>
  </q-page>
</template>
<script>
import axios from "axios";
import { date } from "quasar";
import AddressService from "src/utils/country";
const addressService = new AddressService();

export default {
  data() {
    return {
      countries: [],
      states: [],
      inspectionTypes: [],
      subInspectionTypes: [],
      step: 1,
      leadSources: [
        {
          value: "priorClient",
          label: "Prior Client",
          placeholder: "Name of prior client",
        },
        { value: "vendor", label: "Vendor", placeholder: "Name of Vendor" },
        {
          value: "affiliate",
          label: "Affiliate",
          placeholder: "Name of Affiliate",
        },
        {
          value: "referral",
          label: "Referral",
          placeholder: "Name of Referral",
        },
        {
          value: "advertisement",
          label: "Advertisement",
          placeholder: "Name where you have seen the ad",
        },
        { value: "google", label: "Google" },
        { value: "other", label: "Other", placeholder: "Provide details" },
      ],
      primaryDetails: {
        isOrganisation: false,
        organisationName: "",
        firstName: "",
        lastName: "",
        email: "",
        contactType: ["phone", "mobile", "pager"],
        phone: "",
        selectedContactType: "mobile",
      },
      lossDetails: {
        lossDesc: "",
        dateOfLoss: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        country: "United States",
        postalCode: "",
      },
      insuranceDetails: {
        policyNumber: "",
        carrierName: "",
      },
      sourceDetails: {
        sourceType: "",
        sourceDetails: "",
      },
      schedulingDetails: {
        isAutomaticScheduling: false,
        inspectionType: "",
        subInspectionType: "",
        inspectionDuration: "",
      },
      notes: "",
      vendorSelected: "",
      // Hardcoding this as still api for this in not avialable.
      clientsList: [],
      vendorsList: [],
    };
  },
  mounted() {
    this.getVendors();
  },

  created() {
    this.countries = addressService.getCountries();
    this.onCountrySelect("United States");
    this.getInspectionType();
  },

  methods: {
    onCountrySelect(country) {
      this.states = addressService.getStates(country);
    },

    // onInspectionTypesSelect() {
    //   this.subInspectionTypes = this.inspectionTypes.filter(
    //     (types) => types.id === this.schedulingDetails.inspectionType.id
    //   );
    // },

    getInspectionType() {
      // Hardcoding api end point for testing.
      axios
        .get(
          "https://56564994-ccad-41d5-989e-839ceca5232d.mock.pstmn.io/v1/inspections",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "",
            },
          }
        )
        .then(
          (response) => {
            this.inspectionTypes = response["data"]["data"];
          },
          (error) => {
            this.showForm = false;
          }
        );
    },

    gotoVendors() {
      this.$router.push("/vendors");
    },
    onSubmit() {
      console.log("hi");
      let formattedString = date.formatDate(
        this.lossDetails.dateOfLoss,
        "YYYY-MM-DDTHH:mm:ssZ"
      );
      let payload = {
        isOrganization: this.primaryDetails.isOrganisation,
        primaryContact: {
          fname: this.primaryDetails.firstName,
          lname: this.primaryDetails.lastName,
          email: this.primaryDetails.email,
          phoneNumber: [],
        },
        lossLocation: {
          addressCountry: this.lossDetails.country,
          addressLocality: this.lossDetails.city,
          addressRegion: this.lossDetails.state,
          postOfficeBoxNumber: "",
          postalCode: this.lossDetails.postalCode,
          streetAddress: this.lossDetails.address1,
        },
        lossDesc: this.lossDetails.lossDesc,
        dateofLoss: formattedString,
        carrier: this.insuranceDetails.carrierName,
        policyNumber: this.insuranceDetails.policyNumber,
        isAutomaticScheduling: this.schedulingDetails.isAutomaticScheduling,
        notes: this.notes,
      };
      if (payload[this.primaryDetails.isOrganisation]) {
        payload[organizationName] = this.primaryDetails.organisationName;
      }
      if (this.primaryDetails.phoneNumber) {
        payload.primaryContact["phoneNumber"].push({
          type: this.primaryDetails.selectedContactType,
          number: this.primaryDetails.phoneNumber,
        });
      }

      // Hardcoding api end point for testing.
      axios
        .post(
          "https://api.claimguru.cilalabs.dev/v1/leads",
          {
            data: {
              type: "leads",
              attributes: payload,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((responseData) => {})
        .catch(function (error) {});
      this.$router.push("/leads");
    },
    getVendors() {
      // API endpoint is hardcoded for testing.
      axios
        .get(
          "https://56564994-ccad-41d5-989e-839ceca5232d.mock.pstmn.io/v1/vendors",
          {
            headers: {
              "Content-Type": "application/vnd.api+json",
              Accept: "application/vnd.api+json",
              Authorization: "",
            },
          }
        )
        .then(
          (response) => {
            this.vendorsList = response["data"]["data"];
          },
          (error) => {
            this.showForm = false;
            this.showError("Sorry, Couldn't retrieve profile data");
          }
        );
    },
    onReset() {
      this.$router.push("/leads");
    },
    gotoLeads() {
      this.$router.push("/leads");
    },

    validateEmail(mail) {
      const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (regex.test(mail)) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss">
.q-stepper {
  box-shadow: none;
  .q-stepper__step-inner {
    padding: 10px;
  }

  .q-stepper__nav {
    padding: 24px;
  }
}

.stepper-heading {
  color: #333333;
  font-weight: bold;
  font-size: 14px;
}
.text-color-grey {
  color: #333333;
}
.text-color-light-grey {
  color: #999999;
}

.form-card {
  min-height: 250px;
  max-height: calc(100vh - 250px);
  overflow: scroll;
}
</style>