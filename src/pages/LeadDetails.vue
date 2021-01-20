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
            {{ selectedLead["primaryContact"]["fname"] }}
            {{ selectedLead.primaryContact.lname }}
          </p>
          <p class="texts">
            Mobile:
            <span
              v-if="selectedLead.primaryContact.phoneNumber"
              @click="
                onPhoneNumberClick(
                  selectedLead.primaryContact.phoneNumber[0].number,
                  $event
                )
              "
              >{{ selectedLead.primaryContact.phoneNumber[0].number }}</span
            ><span v-else> - </span>
          </p>
          <p class="texts">Email: {{ selectedLead.primaryContact.email }}</p>

          <p class="heading">Loss Address</p>
          <p class="texts">{{ selectedLead.lossLocation.streetAddress }}</p>
          <p class="texts">{{ selectedLead.lossLocation.addressRegion }}</p>
          <p class="texts">
            {{ selectedLead.lossLocation.addressRegion }}-{{
              selectedLead.lossLocation.postalCode
            }}
          </p>
          <p class="texts">{{ selectedLead.lossLocation.addressCountry }}</p>

          <p class="heading">Loss Details</p>

          <p class="texts">
            Date of Loss &nbsp;&nbsp;{{ selectedLead.dateOfLoss }}
          </p>
          <p class="texts">
            Description &nbsp;&nbsp;{{ selectedLead.lossDesc }}
          </p>

          <p class="heading">Policy Details</p>
          <p class="texts">
            Carrier Name &nbsp;&nbsp;{{ selectedLead.carrier }}
          </p>
          <p class="texts">
            Policy No &nbsp;&nbsp;{{ selectedLead.policyNumber }}
          </p>

          <p class="heading">Inspection Type</p>
          <p class="texts"></p>

          <p class="heading">Lead Source</p>
          <p class="texts"></p>

          <p class="heading">Loss Site Visiting On</p>
          <p class="texts"></p>

          <p class="heading">Notes</p>
          <p class="texts">{{ selectedLead.notes }}</p>
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
import { getLeadDetails } from "src/store/leads/actions";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["selectedLead"])
  },

  methods: {
    ...mapActions(["getLeadDetails", "removeSelectedLeadDetails"]),

    onPhoneNumberClick(number, e) {
      e.stopPropagation();
      if (number) {
        window.open("tel:" + number);
      }
    }
  },
  created() {
    console.log(1234);
    console.log(this.selectedLead, 1);
    this.getLeadDetails(this.$route.params.id);
  }

  // beforeDestroy() {
  //   this.removeSelectedLeadDetails();
  // }
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
