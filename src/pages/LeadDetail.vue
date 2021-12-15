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
              v-if="isShowConvertButton"
              name="create"
              color="white"
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
                  ? showPhoneNumber(
                      selectedLead.primaryContact.phoneNumber[0].number
                    )
                  : '-'
              }}</span
            >
          </div>

          <div
            class="row q-mt-sm"
            v-if="
              selectedLead.leadSource &&
              selectedLead.leadSource.type != 'google'
            "
          >
            <span class="heading-light col-3"> Lead Source </span>
            <span class="q-ml-md">
              {{
                selectedLead.leadSource.detail
                  ? selectedLead.leadSource.detail
                  : '-'
              }}</span
            >
            <div v-if="selectedLead.leadSource.type != 'none'" class="q-ml-sm">
              ({{ selectedLead.leadSource.type }})
            </div>
          </div>
          <div v-else class="row q-mt-sm">
            <span class="heading-light col-3"> Lead Source </span>
            <span class="q-ml-md col">
              {{
                selectedLead.leadSource && selectedLead.leadSource.type
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
          <div v-if="selectedLead.isAutomaticScheduling">
            <div
              class="row q-mt-sm"
              v-if="
                selectedLead.inspectionInfo &&
                selectedLead.inspectionInfo.pValue
              "
            >
              <span class="heading-light col-3"> Inspection Type </span>
              <span class="q-ml-md col">
                {{
                  selectedLead.inspectionInfo.pValue
                    ? selectedLead.inspectionInfo.pValue
                    : '-'
                }}</span
              >
            </div>

            <div
              class="row q-mt-sm"
              v-if="
                selectedLead.inspectionInfo && selectedLead.inspectionInfo.value
              "
            >
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
                <div class="heading-light q-mt-none col-4">Loss Address</div>
                <div class="col-6 q-ml-md">
                  <div>
                    {{
                      selectedLead.lossLocation.houseNumber
                        ? selectedLead.lossLocation.houseNumber
                        : '-'
                    }}

                    {{
                      selectedLead.lossLocation.address1
                        ? selectedLead.lossLocation.address1
                        : '-'
                    }}
                  </div>
                  <div
                    v-if="
                      selectedLead.lossLocation &&
                      selectedLead.lossLocation.address2
                    "
                  >
                    {{ selectedLead.lossLocation.address2 }}
                  </div>
                  <div>
                    {{
                      selectedLead.lossLocation.addressLocality
                        ? selectedLead.lossLocation.addressLocality
                        : '-'
                    }},
                    {{
                      selectedLead.lossLocation.addressRegion
                        ? toGetStateShortName(
                            selectedLead.lossLocation.addressRegion
                          )
                        : '-'
                    }}
                    {{ selectedLead.lossLocation.postalCode }}
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
                <div class="heading-light q-mt-none col-xs-4">Date of Loss</div>
                <div class="column q-ml-md">
                  {{ dateToShow(selectedLead.dateofLoss) }}
                </div>
              </div>
              <div class="q-mt-md row">
                <div class="heading-light q-mt-none col-xs-4">
                  Loss Description
                </div>
                <div class="column q-ml-md">
                  {{ selectedLead.lossDesc ? selectedLead.lossDesc : '-' }}
                </div>
              </div>
              <div class="q-mt-md row">
                <div class="heading-light q-mt-none col-xs-4">Loss Cause</div>
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
                <div class="heading-light q-mt-none col-xs-4">
                  Policy Number
                </div>
                <div class="column q-ml-md">
                  {{
                    selectedLead.policyNumber ? selectedLead.policyNumber : '-'
                  }}
                </div>
              </div>
              <div class="q-mt-md row">
                <div class="heading-light q-mt-none col-xs-4">
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
                <div class="heading-light q-mt-none col-xs-4">Notes</div>
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
        v-if="isShowConvertButton == true"
        label="Convert Lead to Client"
        class="fixed-bottom rounded q-my-md q-mx-auto"
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
import { toGetStateShortName } from '@utils/common';
import { dateToShow } from '@utils/date';
import {
  onEmailClick,
  onPhoneNumberClick,
  sendMap,
  showPhoneNumber
} from '@utils/clickable';
export default {
  data() {
    return {};
  },

  created() {
    this.getLeadDetails(this.$route.params.id);
  },
  computed: {
    ...mapGetters(['selectedLead', 'isShowConvertButton', 'isOnline'])
  },
  methods: {
    ...mapActions(['getLeadDetails']),
    ...mapMutations(['setSelectedLeadOnline', 'setSelectedLeadOffline']),
    toGetStateShortName,
    onEmailClick,
    onPhoneNumberClick,
    sendMap,
    dateToShow,
    showPhoneNumber,
    editLeadButtonClick() {
      this.isEdit = true;
      this.$router.push('/edit-lead-details/' + this.$route.params.id);
    },
    onConvertLeadToClientButtonClick(selectedLead) {
      if (this.isOnline) {
        this.setSelectedLeadOnline(selectedLead);
      } else {
        this.setSelectedLeadOffline(selectedLead);
      }
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
