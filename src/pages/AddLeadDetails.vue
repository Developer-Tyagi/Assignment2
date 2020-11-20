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