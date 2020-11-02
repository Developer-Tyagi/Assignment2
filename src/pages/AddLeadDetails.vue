<template>
  <q-page>
    <h5>ADD NEW LEAD</h5>
    <q-btn round icon="keyboard_backspace" @click="gotoLeads"></q-btn>
    <q-option-group v-model="panel" inline-label :options="addLeadTabs"></q-option-group>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-tab-panels v-model="panel" animated class="shadow-2 rounded-borders">
        <q-tab-panel name="primary">
          <q-input v-model="fname" label="First Name" />
          <q-input v-model="lname" label="Last Name" />
          <q-input v-model="phone" label="Phone" />
          <q-input v-model="mobile" label="Mobile" />
          <q-input v-model="email" label="Email" />
          <q-toggle v-model="isOrg" label="Is policyholder an organisation?" left-label></q-toggle>
          <div v-if="isOrg">
            <q-input v-model="organisation" label="Organisation Name" />
          </div>
        </q-tab-panel>
        <q-tab-panel name="lossDetails">
          <label>Loss Details</label>
          <q-datetime v-model="dateofLoss" float-label="Date of loss" />
          <p>Testing</p>
          <q-input v-model="lossDesc" label="Brief description of loss" />
          <br />
          <label>Loss Location</label>
          <q-input v-model="address1" label="Address1" />
          <q-input v-model="address2" label="Address2" />
          <q-select v-model="city" :options="[]" label="City"></q-select>
          <q-select v-model="state" :options="[]" label="State"></q-select>
          <q-select v-model="country" :options="[]" label="State"></q-select>
          <q-input v-model="zipcode" label="ZIP Code" />
        </q-tab-panel>

        <q-tab-panel name="insurance">
          <label>Insurance Details</label>
          <q-input v-model="carrier" label="Carrier Name" />
          <q-input v-model="policyNumber" label="Policy Number" />
          <br />
          <label>Scheduling</label>
          <br />
          <q-toggle v-model="isScheduling" label="Is automatic scheduling needed?" left-label></q-toggle>
        </q-tab-panel>
        <q-tab-panel name="notesRemarks">
          <label>Notes</label>
          <q-input v-model="notes" type="textarea" />
          <br />
        </q-tab-panel>
        <q-tab-panel name="source">
          <h6>Lead Source</h6>
          <label>Additional info good to know</label>
          <p>{{leadSource}}</p>
          <q-list>
            <q-item tag="label" v-ripple>
              <q-item-section avatar>
                <q-radio v-model="leadSource" val="priorClient"></q-radio>
              </q-item-section>
              <q-item-section>
                <q-item-label>Prior Client</q-item-label>
                <div v-if="leadSource==='priorClient'">
                  <q-select
                    v-model="clientSelected"
                    :options="clientsList"
                    label="Select existing client"
                  ></q-select>
                </div>
              </q-item-section>
            </q-item>
            <q-item tag="label" v-ripple>
              <q-item-section avatar>
                <q-radio v-model="leadSource" val="vendor"></q-radio>
              </q-item-section>
              <q-item-section>
                <q-item-label>Vendor</q-item-label>
                <div v-if="leadSource==='vendor'">
                  <!--<q-select
                    v-model="vendorSelected"
                    :options="vendorsList"
                    label="Select vendor"
                    key="id"
                  >
                    <template v-slot:option="scope">
                      <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                        <q-item-section>
                          <q-item-label v-html="scope.opt.attributes.name"></q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>-->
                  <q-input v-model="vendorSelected" @click="gotoVendors" />
                </div>
              </q-item-section>
            </q-item>
            <q-item tag="label" v-ripple>
              <q-item-section avatar>
                <q-radio v-model="leadSource" val="affliate"></q-radio>
              </q-item-section>
              <q-item-section>
                <q-item-label>Affliate</q-item-label>
                <div v-if="leadSource==='affliate'">
                  <q-select v-model="clientSelected" :options="clientsList" label="Select affliate"></q-select>
                </div>
              </q-item-section>
            </q-item>
            <q-item tag="label" v-ripple>
              <q-item-section avatar>
                <q-radio v-model="leadSource" val="referral"></q-radio>
              </q-item-section>
              <q-item-section>
                <q-item-label>Referral</q-item-label>
                <div v-if="leadSource==='referral'">
                  <q-select v-model="clientSelected" :options="clientsList" label="Select referral"></q-select>
                </div>
              </q-item-section>
            </q-item>
            <q-item tag="label" v-ripple>
              <q-item-section avatar>
                <q-radio v-model="leadSource" val="advertisement"></q-radio>
              </q-item-section>
              <q-item-section>
                <q-item-label>Advertisement</q-item-label>
                <div v-if="leadSource==='advertisement'">
                  <q-select
                    v-model="clientSelected"
                    :options="clientsList"
                    label="Select advertisement"
                  ></q-select>
                </div>
              </q-item-section>
            </q-item>
            <q-item tag="label" v-ripple>
              <q-item-section avatar>
                <q-radio v-model="leadSource" val="google"></q-radio>
              </q-item-section>
              <q-item-section>
                <q-item-label>Google</q-item-label>
              </q-item-section>
            </q-item>
            <q-item tag="label" v-ripple>
              <q-item-section avatar>
                <q-radio v-model="leadSource" val="other"></q-radio>
              </q-item-section>
              <q-item-section>
                <q-item-label>Other</q-item-label>
                <div v-if="leadSource==='other'">
                  <q-input v-model="other" />
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
      <div>
        <q-btn label="Back" type="reset" color="primary" flat class="q-ml-sm"></q-btn>
        <q-btn label="Add Lead" type="submit" color="primary"></q-btn>
      </div>
    </q-form>
  </q-page>
</template>
<script>
import axios from "axios";
import QDatetime from "quasar";
export default {
  components: {
    QDatetime
  },
  mounted() {
    console.log("Hello");
    this.getVendors();
  },
  methods: {
    gotoVendors() {
      this.$router.push("/vendors");
    },
    onSubmit() {
      console.log("entering in submit");
      // Hardcoding api end point for testing.
      axios
        .post(
          "https://56564994-ccad-41d5-989e-839ceca5232d.mock.pstmn.io/v1/leads",
          {
            data: {
              type: "leads",
              attributes: {
                isOrganization: false,
                primaryContact: {
                  fname: this.fname,
                  lname: this.lname,
                  email: this.email,
                  phoneNumber: {
                    type: "home",
                    number: this.phone
                  }
                },
                lossLocation: {
                  addressCountry: this.country,
                  addressLocality: this.city,
                  addressRegion: this.state,
                  postOfficeBoxNumber: this.address1,
                  postalCode: this.zipcode,
                  streetAddress: this.address1
                },
                lossDesc: this.lossDesc,
                carrier: this.lossDesc,
                policyNumber: this.policyNumber,
                isAutomaticScheduling: this.isScheduling,
                dateofLoss: ""
              }
            }
          },
          {
            headers: {
              "Content-Type": "application/vnd.api+json",
              Accept: "application/vnd.api+json"
            }
          }
        )
        .then(responseData => {
          console.log(this.email);
          console.log("Successfully added lead");
        })
        .catch(function(error) {
          console.log("Error :  " + error);
        });
      console.log("exiting in submit");
    },
    onReset() {
      this.$router.push("/leads");
    },
    getVendors: function(event) {
      console.log("in get vendors");
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
            this.vendorsList = response["data"]["data"];
          },
          error => {
            console.log(error);
            this.showForm = false;
            this.showError("Sorry, Couldn't retrieve profile data");
          }
        );
    },
    onSubmit() {
      console.log(this.clientSelected.label);
      this.$router.push("/add-lead-details");
    },
    onReset() {
      this.$router.push("/leads");
    },
    gotoLeads() {
      this.$router.push("/leads");
    }
  },
  data() {
    return {
      addLeadTabs: [
        { value: "primary", label: "PRIMARY CONTACT" },
        { value: "lossDetails", label: "LOSS DETAILS" },
        { value: "insurance", label: "INSURANCE & SCHEDULING" },
        { value: "notesRemarks", label: "NOTES" },
        { value: "source", label: "SOURCE" }
      ],
      panel: "primary",
      isOrg: false,
      organisation: "",
      fname: "",
      lname: "",
      phone: "",
      mobile: "",
      email: "",
      country: "",
      lossDesc: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipcode: "",
      carrier: "",
      policyNumber: "",
      notes: "",
      isScheduling: false,
      leadSource: "",
      priorClient: "",
      vendor: "",
      affliate: "",
      referral: "",
      advertisement: "",
      google: "",
      notesRemarks: "",
      dateofLoss: "",
      clientSelected: "",
      vendorSelected: "",
      // Hardcoding this as still api for this in not avialable.
      clientsList: [
        {
          label: "James",
          value: "James"
        },
        {
          label: "Jane",
          value: "Jane"
        },
        ,
        {
          label: "Peter",
          value: "Peter"
        }
      ],
      vendorsList: []
    };
  }
};
</script>
