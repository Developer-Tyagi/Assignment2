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
        color="primary"
        animated
        alternative-labels
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
                  val => (val && val.length > 0) || 'Please fill the first name'
                ]"
              />
              <q-input
                v-model="primaryDetails.lastName"
                label="Last Name"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please fill the last name'
                ]"
              />
              <div class="row">
                <q-input
                  v-model="primaryDetails.phoneNumber"
                  label="Phone"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length > 7) || 'Please fill the phone number'
                  ]"
                  style="width: 65%"
                />
                <q-select
                  v-model="primaryDetails.selectedContactType"
                  :options="contactType"
                  label="Mobile"
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || '']"
                  style="width: 30%; margin-left: auto"
                />
              </div>
              <q-input
                v-model="primaryDetails.email"
                label="Email"
                lazy-rules
                :rules="[
                  val =>
                    validateEmail(val) ||
                    'You have entered an invalid email address!'
                ]"
              />

              <div class="row">
                <p class="q-mx-none q-my-auto">
                  Is policy holder an organization ?
                </p>
                <q-toggle
                  v-model="primaryDetails.isOrganization"
                  left-label
                  color="orange"
                  class="q-ml-auto"
                />
              </div>
              <div v-if="primaryDetails.isOrganization">
                <q-input
                  v-model="primaryDetails.organizationName"
                  label="Organization Name"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length > 0) ||
                      'Please fill the organization name '
                  ]"
                />
              </div>
            </q-card>
            <div class="row q-pt-md">
              <div class="q-ml-auto">
                <span class="q-mr-md text-color-grey">Next</span>
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
                  val =>
                    (val && val.length > 0) || 'Please fill the date of loss '
                ]"
              />
              <q-input
                v-model="lossDetails.lossDesc"
                label="Brief description of loss"
                lazy-rules
                :rules="[
                  val =>
                    (val && val.length > 0) ||
                    'Please fill the loss description'
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
                  val => (val && val.length > 0) || 'Please fill the country'
                ]"
              />
              <q-input
                v-model="lossDetails.address1"
                label="Address1"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please fill the address'
                ]"
              />
              <q-input v-model="lossDetails.address2" label="Address2" />
              <q-input
                v-model="lossDetails.city"
                label="City"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please fill the city'
                ]"
              ></q-input>
              <q-select
                v-model="lossDetails.state"
                :options="states"
                label="State"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please fill the state'
                ]"
              />
              <q-input
                v-model="lossDetails.postalCode"
                label="ZIP Code"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please fill the zip code'
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
              <span class="stepper-heading">Choose Lead Source</span>
              <div>
                <q-select
                  v-model="sourceDetails.type"
                  :options="leadSources"
                  option-label="name"
                  option-value="value"
                  emit-value
                  map-options
                  @input="onChangingSourceType()"
                />
                <q-input
                  v-if="
                    sourceDetails.type != 'vendor' &&
                      sourceDetails.type != '' &&
                      sourceDetails.type != 'google'
                  "
                  type="text"
                  placeholder="Enter Source details"
                  v-model="sourceDetails.details"
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || '']"
                />
                <div
                  v-else-if="sourceDetails.type == 'vendor'"
                  class="custom-select"
                  @click="vendorsListDialog = true"
                >
                  <div class="select-text">
                    {{
                      sourceDetails.id ? sourceDetails.details : "Select Vendor"
                    }}
                  </div>
                </div>
              </div>
            </q-card>
            <div class="row q-pt-md">
              <div>
                <q-btn
                  type="reset"
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
              <p class="text-color-light-grey">Last Notes</p>
              <q-input
                v-model="notes"
                type="input"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please fill the notes'
                ]"
              />
            </q-card>
            <div class="row q-pt-md">
              <div>
                <q-btn
                  type="reset"
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
              />
              <q-select
                v-model="schedulingDetails.inspectionType"
                :options="inspectionTypes"
                label="Type of Inspection"
                option-label="name"
                option-value="name"
                emit-value
                @input="onInspectionTypesSelect()"
              />
              <q-select
                v-if="showSubInspectionType"
                v-model="schedulingDetails.subInspectionType"
                :options="subInspectionTypes"
                option-label="name"
                option-value="id"
                emit-value
                label="Sub Type of Inspection"
                @input="onSubInspectionTypesSelect()"
                map-options
              />
              <q-input
                v-model="schedulingDetails.inspectionDuration"
                label="Duration of Inspection (in hours)"
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
          </q-form>
        </q-step>
      </q-stepper>
    </div>
    <q-dialog
      v-model="vendorsListDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-header bordered class="bg-white">
          <q-toolbar class="row bg-white">
            <img
              src="~assets/close.svg"
              alt="close"
              @click="vendorsListDialog = false"
              style="margin: auto 0"
            />
            <div class="text-uppercase text-bold text-black q-mx-auto">
              Vendors
            </div>
            <img
              src="~assets/add.svg"
              @click="addVendorDialog = true"
              style="margin: 0 0 0 20px"
            />
          </q-toolbar>
        </q-header>
        <VendorsList
          :selective="true"
          @selectedVendor="addSelectedVendor"
          ref="list"
        />
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="addVendorDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <AddVendor @closeDialog="closeAddVendorDialog" />
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { date } from "quasar";
import AddressService from "@utils/country";
import { validateEmail } from "@utils/validation";
import { leadSource } from "src/store/common/getters";
import VendorsList from "components/VendorsList";
import AddVendor from "components/AddVendor";
const addressService = new AddressService();

export default {
  components: { VendorsList, AddVendor },

  data() {
    return {
      countries: [],
      states: [],
      subInspectionTypes: [],
      showSubInspectionType: false,
      addVendorDialog: false,
      vendorsListDialog: false,
      step: 1,
      primaryDetails: {
        isOrganization: false,
        organizationName: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        selectedContactType: "mobile"
      },
      lossDetails: {
        lossDesc: "",
        dateOfLoss: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        country: "United States",
        postalCode: ""
      },
      insuranceDetails: {
        policyNumber: "",
        carrierName: ""
      },
      sourceDetails: {
        id: "",
        type: "",
        details: ""
      },
      schedulingDetails: {
        isAutomaticScheduling: false,
        inspectionType: "",
        subInspectionType: "",
        inspectionDuration: ""
      },
      notes: "",
      vendorSelected: "",
      industryTypes: ["Association"]
    };
  },

  methods: {
    ...mapActions(["addLeads", "getInspectionTypes", "addVendor"]),

    onCountrySelect(country) {
      this.states = addressService.getStates(country);
    },

    onInspectionTypesSelect() {
      let selectedInspectionType = this.inspectionTypes.find(
        type => type.name === this.schedulingDetails.inspectionType
      );
      if (selectedInspectionType.subtypes.length > 1) {
        this.subInspectionTypes = selectedInspectionType.subtypes;
        this.schedulingDetails.subInspectionType = "";
        this.schedulingDetails.inspectionDuration = "";
        this.showSubInspectionType = true;
      } else {
        this.showSubInspectionType = false;
        this.schedulingDetails.subInspectionType =
          selectedInspectionType.subtypes[0].id;
        this.schedulingDetails.inspectionDuration =
          selectedInspectionType.subtypes[0].duration;
      }
    },

    onSubInspectionTypesSelect() {
      const index = this.subInspectionTypes.findIndex(
        val => val.id == this.schedulingDetails.subInspectionType
      );
      this.schedulingDetails.inspectionDuration = this.subInspectionTypes[
        index
      ].duration;
    },

    onSubmit() {
      let formattedString = date.formatDate(
        this.lossDetails.dateOfLoss,
        "YYYY-MM-DDTHH:mm:ssZ"
      );
      let payload = {
        isOrganization: this.primaryDetails.isOrganization,
        primaryContact: {
          fname: this.primaryDetails.firstName,
          lname: this.primaryDetails.lastName,
          email: this.primaryDetails.email,
          phoneNumber: []
        },
        lossLocation: {
          addressCountry: this.lossDetails.country,
          addressLocality: this.lossDetails.city,
          addressRegion: this.lossDetails.state,
          postOfficeBoxNumber: "",
          postalCode: this.lossDetails.postalCode,
          streetAddress: this.lossDetails.address1
        },
        lossDesc: this.lossDetails.lossDesc,
        dateofLoss: formattedString,
        carrier: this.insuranceDetails.carrierName,
        policyNumber: this.insuranceDetails.policyNumber,
        isAutomaticScheduling: this.schedulingDetails.isAutomaticScheduling,
        notes: this.notes,
        inspectionInfo: {
          id: this.schedulingDetails.subInspectionType,
          duration: this.schedulingDetails.inspectionDuration
        },
        leadSource: {
          id: "",
          type: this.sourceDetails.type,
          details: ""
        }
      };
      if (payload[isOrganization]) {
        payload[organizationName] = this.primaryDetails.organizationName;
      }
      if (this.primaryDetails.phoneNumber) {
        payload.primaryContact["phoneNumber"].push({
          type: this.primaryDetails.selectedContactType,
          number: this.primaryDetails.phoneNumber
        });
      }
      if (this.sourceDetails.type == "vendor") {
        payload.leadSource.id = this.sourceDetails.id;
      } else {
        payload.leadSource.details = this.sourceDetails.details;
      }
      this.addLeads(payload);
    },

    validateEmail,

    closeVendorsList() {
      this.vendorsListDialog = false;
    },

    onChangingSourceType() {
      (this.sourceDetails.id = ""), (this.sourceDetails.details = "");
    },

    addSelectedVendor(e) {
      (this.sourceDetails = {
        id: e.id,
        type: "vendor",
        details: e.name
      }),
        this.closeVendorsList();
    },

    closeAddVendorDialog(e) {
      this.addVendorDialog = false;
      this.vendorsListDialog = true;
      if (e) {
        this.$refs.list.getVendors();
      }
    }
  },

  computed: {
    ...mapGetters(["clients", "inspectionTypes", "contactType", "leadSources"])
  },

  created() {
    if (this.$route.params.id) {
      let selectedClient = this.clients.find(
        client => client.id === this.$route.params.id
      );
      this.primaryDetails.firstName = selectedClient.primaryContact.fname;
      this.primaryDetails.lastName = selectedClient.primaryContact.lname;
      this.primaryDetails.email = selectedClient.primaryContact.email;
      this.primaryDetails.phoneNumber =
        selectedClient.primaryContact.phoneNumber[0].number;
      this.primaryDetails.selectedContactType =
        selectedClient.primaryContact.phoneNumber[0].type;
      this.primaryDetails.isOrganization = selectedClient.isOrganization;
      if (this.primaryDetails.isOrganization) {
        this.primaryDetails.organizationName = selectedClient.organizationName;
      }
    }
    this.countries = addressService.getCountries();
    this.getInspectionTypes();
    this.onCountrySelect("United States");
  }
};
</script>

<style lang="scss">
.q-stepper {
  box-shadow: none;

  .q-stepper__header {
    flex-wrap: nowrap;
    overflow: auto;
  }
  .q-stepper__tab {
    width: 80px;
  }

  .q-stepper__tab--active {
    .q-stepper__title {
      color: #333333;
    }
  }
  .q-stepper__step-inner {
    padding: 10px;
  }

  .q-stepper__nav {
    padding: 24px;
  }
  .q-stepper__dot {
    font-size: 12px;
    width: 20px;
    min-width: 20px;
    height: 20px;
  }

  .q-stepper__title {
    color: #cccccc;
    font-size: 10px;
    text-align: center;
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

.custom-select {
  width: 100%;
  border-bottom: 1px solid #c2c2c2;
  margin-bottom: 20px;

  .select-text {
    line-height: 24px;
    padding-top: 24px;
    padding-bottom: 8px;
    height: 50px;
  }
}
</style>
