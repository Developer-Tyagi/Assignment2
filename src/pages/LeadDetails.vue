<template>
  <q-page style="padding-top: 0; height: 100vh">
    <q-header bordered class="bg-white">
      <q-toolbar class="row bg-white">
        <img
          src="~assets/left-arrow.svg"
          alt="back-arrow"
          @click="$router.push('/leads')"
          style="margin: auto 0"
        />
        <div class="text-uppercase text-bold text-black q-mx-auto">
          {{ $route.name }}
        </div>
      </q-toolbar>
    </q-header>
    <div style="padding-top: 51px" class="full-height row">
      <q-card class="q-pa-md q-ma-md" style="width: 100%">
        <div>
          <q-icon name="create" color="primary" class="edit-icon"></q-icon>
          <p class="heading">Policy Holder Details</p>
          <p class="texts">
            {{ lead.primaryContact.fname }} {{ lead.primaryContact.lname }}
          </p>
          <p class="texts">
            Mobile:
            <span v-if="lead.primaryContact.phoneNumber">{{
              lead.primaryContact.phoneNumber[0].number
            }}</span
            ><span v-else> - </span>
          </p>
          <p class="texts">Email: {{ lead.primaryContact.email }}</p>

          <p class="heading">Loss Address</p>
          <p class="texts">{{ lead.lossLocation.streetAddress }}</p>
          <p class="texts">{{ lead.lossLocation.addressRegion }}</p>
          <p class="texts">
            {{ lead.lossLocation.addressRegion }}-{{
              lead.lossLocation.postalCode
            }}
          </p>
          <p class="texts">{{ lead.lossLocation.addressCountry }}</p>

          <p class="heading">Loss Details</p>

          <p class="texts">Date of Loss &nbsp;&nbsp;{{ lead.dateOfLoss }}</p>
          <p class="texts">Description &nbsp;&nbsp;{{ lead.lossDesc }}</p>

          <p class="heading">Policy Details</p>
          <p class="texts">Carrier Name &nbsp;&nbsp;{{ lead.carrier }}</p>
          <p class="texts">Policy No &nbsp;&nbsp;{{ lead.policyNumber }}</p>

          <p class="heading">Inspection Type</p>
          <p class="texts"></p>

          <p class="heading">Lead Source</p>
          <p class="texts"></p>

          <p class="heading">Loss Site Visiting On</p>
          <p class="texts"></p>

          <p class="heading">Notes</p>
          <p class="texts">{{ lead.notes }}</p>
        </div>
      </q-card>

      <q-btn
        label="Schedule Visit"
        class="q-my-auto q-mx-lg text-capitalize"
        style="width: 100%"
        color="primary"
        size="md"
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
.edit-icon {
  position: absolute;
  right: 20px;
  font-size: 20px;
}

.heading {
  font-weight: bold;
  margin: 16px 0 8px 0;
}

.texts {
  margin-bottom: 0;
  font-size: 12px;
  text-align: left;
}
</style>