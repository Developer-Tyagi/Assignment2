<template>
  <q-page>
    <q-header bordered class="bg-white">
      <q-toolbar class="row bg-white">
        <q-btn
          flat
          dense
          class="color-grey"
          icon="arrow_back"
          aria-label="Back"
          @click="$router.push('/leads')"
        >
        </q-btn>
        <div
          class="text-uppercase text-bold text-black q-mx-auto"
          v-if="!openSearchInput"
        >
          {{ $route.name }}
        </div>
      </q-toolbar>
    </q-header>
    <div style="padding-top: 51px">
      <q-tabs
        v-model="selectedTab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="primary" label="Primary" />
        <q-tab name="lossDetails" label="Loss details" />
        <q-tab name="insurance" label="Insurance" />
        <q-tab name="source" label="Lead Source" />
        <q-tab name="notes" label="Notes" />
        <q-tab name="scheduling" label="Scheduling" />
      </q-tabs>

      <q-separator />
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md" style="">
        <q-tab-panels v-model="selectedTab" animated>
          <q-tab-panel name="primary">
            <q-input v-model="primaryDetails.firstName" label="First Name" />
            <q-input v-model="primaryDetails.lastName" label="Last Name" />
            <div class="row">
              <q-input v-model="primaryDetails.phoneNumber" label="Phone" />
              <q-select
                v-model="primaryDetails.selectedContactType"
                :options="primaryDetails.contactType"
                label="Mobile"
              ></q-select>
            </div>
            <q-input v-model="primaryDetails.email" label="Email" />

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
              />
            </div>
          </q-tab-panel>

          <q-tab-panel name="lossDetails">
            <label>Loss Details</label>
            <q-input
              v-model="lossDetails.dateOfLoss"
              type="date"
              placeholder="Date of Loss"
            />
            <q-input
              v-model="lossDetails.lossDesc"
              label="Brief description of loss"
            />
            <br />
            <label>Loss Location</label>
            <q-select
              v-model="lossDetails.country"
              :options="countries"
              label="Country"
              @input="onCountrySelect(lossDetails.country)"
            ></q-select>
            <q-input v-model="lossDetails.address1" label="Address1" />
            <q-input v-model="lossDetails.address2" label="Address2" />
            <q-input v-model="lossDetails.city" label="City"></q-input>
            <q-select
              v-model="lossDetails.state"
              :options="states"
              label="State"
            ></q-select>
            <q-input v-model="lossDetails.postalCode" label="ZIP Code" />
          </q-tab-panel>

          <q-tab-panel name="insurance">
            <label>Insurance Details</label>
            <q-input
              v-model="insuranceDetails.carrierName"
              label="Carrier Name"
            />
            <q-input
              v-model="insuranceDetails.policyNumber"
              label="Policy Number"
            />
            <br />
          </q-tab-panel>

          <q-tab-panel name="source">
            <label>Lead Source</label>
            <p>Additional info good to know</p>
            <q-list>
              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio
                    v-model="sourceDetails.sourceType"
                    val="priorClient"
                  ></q-radio>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Prior Client</q-item-label>
                  <div v-if="sourceDetails.sourceType === 'priorClient'">
                    <q-select
                      v-model="sourceDetails.sourceDetails"
                      :options="clientsList"
                      label="Select existing client"
                    ></q-select>
                  </div>
                </q-item-section>
              </q-item>
              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio
                    v-model="sourceDetails.sourceType"
                    val="vendor"
                  ></q-radio>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Vendor</q-item-label>
                  <div v-if="sourceDetails.sourceType === 'vendor'">
                    <q-input v-model="vendorSelected" @click="gotoVendors" />
                  </div>
                </q-item-section>
              </q-item>
              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio
                    v-model="sourceDetails.sourceType"
                    val="affliate"
                  ></q-radio>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Affliate</q-item-label>
                  <div v-if="sourceDetails.sourceType === 'affliate'">
                    <q-select
                      v-model="sourceDetails.sourceDetails"
                      :options="clientsList"
                      label="Select affliate"
                    ></q-select>
                  </div>
                </q-item-section>
              </q-item>
              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio
                    v-model="sourceDetails.sourceType"
                    val="referral"
                  ></q-radio>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Referral</q-item-label>
                  <div v-if="sourceDetails.sourceType === 'referral'">
                    <q-select
                      v-model="sourceDetails.sourceDetails"
                      :options="clientsList"
                      label="Select referral"
                    ></q-select>
                  </div>
                </q-item-section>
              </q-item>
              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio
                    v-model="sourceDetails.sourceType"
                    val="advertisement"
                  ></q-radio>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Advertisement</q-item-label>
                  <div v-if="sourceDetails.sourceType === 'advertisement'">
                    <q-select
                      v-model="sourceDetails.sourceDetails"
                      :options="clientsList"
                      label="Select advertisement"
                    ></q-select>
                  </div>
                </q-item-section>
              </q-item>
              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio
                    v-model="sourceDetails.sourceType"
                    val="google"
                  ></q-radio>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Google</q-item-label>
                </q-item-section>
              </q-item>
              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio
                    v-model="sourceDetails.sourceType"
                    val="other"
                  ></q-radio>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Other</q-item-label>
                  <div v-if="sourceDetails.sourceType === 'other'">
                    <q-input v-model="sourceDetails.sourceDetails" />
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>

          <q-tab-panel name="notes">
            <p>Write relevent inforimation about this New Lead</p>
            <q-input v-model="notes" type="input" />
          </q-tab-panel>

          <q-tab-panel name="scheduling">
            <p>Scheduling</p>
            <q-toggle
              v-model="schedulingDetails.isAutomaticScheduling"
              label="Is automatic scheduling needed?"
              left-label
            ></q-toggle>
            <q-select
              v-model="schedulingDetails.inspectionType"
              :options="[]"
              label="Type of Inspection"
            ></q-select>
            <q-select
              v-model="schedulingDetails.subInspectionType"
              :options="[]"
              label="Sub Type of Inspection"
            ></q-select>
            <q-input
              v-model="schedulingDetails.inspectionDuration"
              label="Duration of Inspection"
            />
          </q-tab-panel>
        </q-tab-panels>
        <div class="q-pa-md">
          <q-btn
            label="Back"
            type="reset"
            color="primary"
            style="width: 50%"
            flat
          ></q-btn>
          <q-btn
            label="Add Lead"
            type="submit"
            style="width: 50%"
            color="primary"
          ></q-btn>
        </div>
      </q-form>
    </div>

    <!-- <div class="stepper">
      <div class="stepper-nav">
        <div v-for="tab in tabs" class="tab">
          <span class="dot"></span>
          <span class="label">{{ tab.label }}</span>
        </div>
        <div></div>
      </div>
      <div class="stepper-content"></div>
    </div> -->
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
      step: 1,
      tabs: [
        { value: "primary", label: "PRIMARY CONTACT" },
        { value: "lossDetails", label: "LOSS DETAILS" },
        { value: "insurance", label: "INSURANCE" },
        { value: "source", label: "SOURCE" },
        { value: "notes", label: "NOTES" },
        { value: "scheduling", label: "SCHEDULING" },
      ],
      selectedTab: "primary",
      primaryDetails: {
        isOrganisation: false,
        organisationName: "",
        firstName: "",
        lastName: "",
        email: "",
        contactType: ["phone", "mobile", "pager"],
        phone: "",
        phoneType: "mobile",
      },
      lossDetails: {
        lossDesc: "",
        dateOfLoss: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        country: "",
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
      clientsList: [
        {
          label: "James",
          value: "James",
        },
        {
          label: "Jane",
          value: "Jane",
        },
        ,
        {
          label: "Peter",
          value: "Peter",
        },
      ],
      vendorsList: [],
    };
  },
  mounted() {
    this.getVendors();
  },

  created() {
    this.countries = addressService.getCountries();
  },

  methods: {
    onCountrySelect(country) {
      this.states = addressService.getStates(country);
    },

    gotoVendors() {
      this.$router.push("/vendors");
    },
    onSubmit() {
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
          type: this.primaryDetails.phoneType,
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
        .then((responseData) => {
          console.log("Successfully added lead");
        })
        .catch(function (error) {
          console.log("Error :  " + error);
        });
      this.$router.push("/leads");
    },
    onReset() {
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
  },
};
</script>

<style lang="scss">
.stepper {
  .stepper-nav {
    display: flex;
    flex-direction: row;
    width: 100vw;
    overflow: scroll;
    .tab {
      display: flex;
      flex-direction: column;
      width: 40%;
      .dot {
        height: 15px;
        width: 15px;
        border-radius: 50%;
        background-color: orange;
        margin: 0 auto;
      }
      .label {
        font-size: 10px;
        text-align: center;
        color: #666666;
      }
    }
  }
}
</style>