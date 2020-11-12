<template>
  <q-page class="q-pa-md" style="height: calc(100vh - 81px)">
    <div class="column full-height">
      <div>
        <p class="heading">Policy Holder Details</p>
        <p class="text">
          {{ lead.primaryContact.fname }} {{ lead.primaryContact.lname }}
        </p>
        <p class="text">
          Mobile:
          <span v-if="lead.primaryContact.phoneNumber">{{
            lead.primaryContact.phoneNumber[0].number
          }}</span
          ><span v-else> - </span>
        </p>
        <p class="text">Email: {{ lead.primaryContact.email }}</p>

        <p class="heading">Loss Address</p>
        <p class="text">{{ lead.lossLocation.streetAddress }}</p>
        <p class="text">{{ lead.lossLocation.addressRegion }}</p>
        <p class="text">
          {{ lead.lossLocation.addressRegion }}-{{
            lead.lossLocation.postalCode
          }}
        </p>
        <p class="text">{{ lead.lossLocation.addressCountry }}</p>

        <p class="heading">Loss Details</p>

        <p class="text">Date of Loss &nbsp;&nbsp;{{ lead.dateOfLoss }}</p>
        <p class="text">Description &nbsp;&nbsp;{{ lead.lossDesc }}</p>

        <p class="heading">Policy Details</p>
        <p class="text">Carrier Name &nbsp;&nbsp;{{ lead.carrier }}</p>
        <p class="text">Policy No &nbsp;&nbsp;{{ lead.policyNumber }}</p>

        <p class="heading">Inspection Type</p>
        <p class="text"></p>

        <p class="heading">Lead Source</p>
        <p class="text"></p>

        <p class="heading">Loss Site Visiting On</p>
        <p class="text"></p>

        <p class="heading">Notes</p>
        <p class="text">{{ lead.notes }}</p>
      </div>
      <q-btn
        label="Schedule Visit"
        class="full-width q-mt-auto"
        color="primary"
      ></q-btn>
    </div>
  </q-page>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      lead: {
        isOrganization: false,
        organizationName: "",
        primaryContact: {
          fname: "",
          lname: "",
          email: "",
          phoneNumber: [
            {
              type: "",
              number: "",
            },
          ],
        },
        lastVisted: "",
        visited: [],
        lossLocation: {
          addressCountry: "",
          addressLocality: "",
          addressRegion: "",
          postOfficeBoxNumber: "",
          postalCode: "",
          streetAddress: "",
        },
        lossDesc: "",
        dateOfLoss: "",
        carrier: "",
        policyNumber: "",
        isAutomaticScheduling: false,
        notes: "",
      },
    };
  },

  mounted() {
    this.getLead();
  },
  methods: {
    getLead() {
      // API endpoint is hardcoded for testing.
      axios
        .get(
          `https://api.claimguru.cilalabs.dev/v1/leads/${this.$route.params.id}`,
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
            console.log(response["data"]["data"]["attributes"]);
            this.lead = response["data"]["data"]["attributes"];
          },
          (error) => {
            this.showError("Sorry, Couldn't retrieve lead data");
          }
        );
    },
  },
};
</script>
<style lang="scss" scoped>
.heading {
  font-weight: bold;
  margin: 16px 0 8px 0;
}

.text {
  margin-bottom: 0;
  font-size: 12px;
}
</style>