<template>
  <q-page>
    <div class="mobile-container-page-without-search">
      <div>
        <div class="q-mx-lg q-mt-md">
          <div class="q-ml-none text-primary">
            <div class="row">
              {{ selectedLead['primaryContact']['fname'] }}
              {{ selectedLead.primaryContact.lname }}
            </div>
            <q-icon
              name="create"
              color="primary"
              class="icon-top"
              @click="editLeadButtonClick"
            ></q-icon>
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-3"> Email </span>
            <span
              class="q-ml-md col clickLink"
              @click="onEmailClick(selectedLead.primaryContact.email, $event)"
            >
              {{
                selectedLead.primaryContact.email
                  ? selectedLead.primaryContact.email
                  : '-'
              }}</span
            >
          </div>
          <div class="row q-mt-sm">
            <span class="heading-light col-3"> Phone Number </span>
            <span
              class="q-ml-md col clickLink"
              @click="
                onPhoneNumberClick(
                  selectedLead.primaryContact.phoneNumber[0].number,
                  $event
                )
              "
            >
              {{
                selectedLead.primaryContact.phoneNumber[0].number
                  ? selectedLead.primaryContact.phoneNumber[0].number
                  : '-'
              }}</span
            >
          </div>

          <div
            class="row q-mt-sm"
            v-if="selectedLead.leadSource.type != 'google'"
          >
            <span class="heading-light col-3"> Lead Source </span>
            <span class="q-ml-md col">
              {{
                selectedLead.leadSource.detail
                  ? selectedLead.leadSource.detail
                  : '-'
              }}</span
            >
          </div>
          <div v-else class="row q-mt-sm">
            <span class="heading-light col-3"> Lead Source </span>
            <span class="q-ml-md col">
              {{
                selectedLead.leadSource.type
                  ? selectedLead.leadSource.type
                  : '-'
              }}</span
            >
          </div>

          <div class="row q-mt-sm" v-if="selectedLead.isOrganization">
            <span class="heading-light col-3"> Organization Name </span>
            <span class="q-ml-md col">
              {{ selectedLead.organizationName }}</span
            >
          </div>

          <div class="row q-mt-sm" v-if="selectedLead.inspectionInfo.pValue">
            <span class="heading-light col-3"> Inspection Type </span>
            <span class="q-ml-md col">
              {{
                selectedLead.inspectionInfo.pValue
                  ? selectedLead.inspectionInfo.pValue
                  : '-'
              }}</span
            >
          </div>
          <div class="row q-mt-sm" v-if="selectedLead.inspectionInfo.value">
            <span class="heading-light col-3">Sub Inspection Type </span>
            <span class="q-ml-md col">
              {{
                selectedLead.inspectionInfo.value
                  ? selectedLead.inspectionInfo.value
                  : '-'
              }}</span
            >
          </div>
        </div>
      </div>
      <q-list bordered class="q-mt-xs">
        <q-expansion-item
          group="leadGroup"
          label="Loss Info"
          header-class="text-primary"
        >
          <q-card>
            <q-card-section>
              <div class="q-mt-md row">
                <div class="heading-light q-mt-none col-4 lightHeading">
                  Loss Address
                </div>
                <div class="col-6 q-ml-md">
                  <div>
                    {{
                      selectedLead.lossLocation.streetAddress
                        ? selectedLead.lossLocation.streetAddress
                        : '-'
                    }}
                  </div>
                  <div>
                    {{
                      selectedLead.lossLocation.addressRegion
                        ? selectedLead.lossLocation.addressRegion
                        : '-'
                    }}
                    {{ selectedLead.lossLocation.addressRegion }}-{{
                      selectedLead.lossLocation.postalCode
                    }}
                  </div>
                  <div>
                    {{ selectedLead.lossLocation.addressCountry }}
                    <q-icon
                      name="place"
                      color="primary"
                      @click="sendMap(selectedLead.lossLocation)"
                      class="edit-icon"
                    ></q-icon>
                  </div>
                </div>
              </div>
              <div class="q-mt-md row">
                <div class="heading-light q-mt-none col-xs-4 lightHeading">
                  Date of Loss
                </div>
                <div class="column q-ml-md">
                  {{ selectedLead.dateofLoss | moment('MM/DD/YYYY') }}
                </div>
              </div>
              <div class="q-mt-md row">
                <div class="heading-light q-mt-none col-xs-4 lightHeading">
                  Loss Description
                </div>
                <div class="column q-ml-md">
                  {{ selectedLead.lossDesc ? selectedLead.lossDesc : '-' }}
                </div>
              </div>
              <div class="q-mt-md row">
                <div class="heading-light q-mt-none col-xs-4 lightHeading">
                  Loss Cause
                </div>
                <div class="column q-ml-md" v-if="selectedLead.lossCause">
                  {{
                    selectedLead.lossCause.value
                      ? selectedLead.lossCause.value
                      : '-'
                  }}
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator></q-separator>

        <q-expansion-item
          group="leadGroup"
          label="Policy Info"
          header-class="text-primary"
        >
          <q-card>
            <q-card-section>
              <div class="q-mt-md row">
                <div class="heading-light q-mt-none col-xs-4 lightHeading">
                  Policy Number
                </div>
                <div class="column q-ml-md">
                  {{
                    selectedLead.policyNumber ? selectedLead.policyNumber : '-'
                  }}
                </div>
              </div>
              <div class="q-mt-md row">
                <div class="heading-light q-mt-none col-xs-4 lightHeading">
                  Carrier Details
                </div>
                <div class="column q-ml-md" v-if="selectedLead.carrier">
                  {{
                    selectedLead.carrier.value
                      ? selectedLead.carrier.value
                      : '-'
                  }}
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator></q-separator>

        <q-expansion-item
          group="leadGroup"
          label="Notes"
          header-class="text-primary"
        >
          <q-card>
            <q-card-section>
              <div class="q-mt-md row">
                <div class="heading-light q-mt-none col-xs-4 lightHeading">
                  Notes
                </div>
                <div class="column q-ml-md" v-if="selectedLead.notes">
                  {{ selectedLead.notes }}
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator></q-separator>
      </q-list>

      <q-btn
        label="Convert Lead to Client"
        class="fixed-bottom q-my-md q-mx-auto"
        color="primary"
        @click="onConvertLeadToClientButtonClick(selectedLead)"
        size="md"
        style="width: 90%"
      />
    </div>
  </q-page>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import CustomBar from 'components/CustomBar';
import { onEmailClick, onPhoneNumberClick, sendMap } from '@utils/clickable';
export default {
  data() {
    return {};
  },

  components: { CustomBar },
  created() {
    this.getLeadDetails(this.$route.params.id);
  },
  computed: {
    ...mapGetters(['selectedLead'])
  },
  methods: {
    ...mapActions(['getLeadDetails']),
    ...mapMutations(['setSelectedLead']),
    onEmailClick,
    onPhoneNumberClick,
    sendMap,
    editLeadButtonClick() {
      this.isEdit = true;
      this.$router.push('/edit-lead-details/' + this.$route.params.id);
    },
    onConvertLeadToClientButtonClick(selectedLead) {
      let payload = {
        attributes: selectedLead
      };
      this.setSelectedLead(payload);
      this.$router.push('/add-client');
    }
  }
};
</script>
<style>
.form-list {
  color: #333333;
  font-weight: bold;
  font-size: 16px;
  padding: 5px;
  border-bottom: 1px solid #d3d3d3;
  margin-top: 30px;
}
</style>
