<template>
  <q-page>
    <div class="mobile-container-page-without-search">
      <div class="column full-height">
        <div>
          <q-icon
            class="icon-top"
            @click="editClaimDetails = true"
            name="more_vert"
            size="sm"
          />

          <div class="mobile-container-page">
            <ClaimDetail />

            <q-item-section class="q-mt-md">
              <div
                v-for="item in ClaimDetails"
                :key="item.name"
                @click="onClickClaimItems(item.name)"
                class=" row q-ma-sm"
              >
                <q-card class="q-ma-xs q-pa-md full-width">
                  {{ item.name }}
                </q-card>
              </div>
            </q-item-section>
          </div>
        </div>
      </div>
    </div>
    <q-dialog
      v-model="editClaimDetails"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
      :position="'bottom'"
    >
      <q-card style="width: 350px;">
        <q-card-section class="items-center ">
          <div
            class="q-pa-md heading-light"
            @click="editClaimNumberDialogOnClick('Claim Number')"
          >
            Edit Claim Number
          </div>
          <div
            class=" q-pa-md heading-light"
            @click="editClaimNumberDialogOnClick('Claim Phase')"
          >
            Edit Current Phase
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- editClaim Number Dialog Box -->
    <q-dialog
      v-model="editClaimNumberDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card style="width: 350px;height:370px;">
        <q-card-section class="items-center ">
          <q-form ref="claimEditForm">
            <div class="text-bold">{{ editDialogName }}</div>
            <div style="height:250px; ">
              <div v-if="editDialogName == 'Claim Number'">
                <div class=" q-py-md row">
                  <div class="heading-light">Current Claim Number :</div>
                  <div class="q-px-lg ">
                    {{
                      getSelectedClaim.policyInfo.claimNumber
                        ? getSelectedClaim.policyInfo.claimNumber
                        : '-'
                    }}
                  </div>
                </div>
                <div class=" q-pb-lg row  ">
                  <div class="heading-light">New Claim Number</div>
                  <div class="q-ml-xl">
                    <q-input
                      class="required"
                      label=" Claim Number"
                      style="width:130px;height:20px;"
                      v-if="editDialogName == 'Claim Number'"
                      v-model="editInputValue"
                      lazy-rules
                      :rules="[
                        val => (val && val.length > 0) || 'enter  new value'
                      ]"
                    />
                  </div>
                </div>
              </div>
              <div v-else>
                <div class=" q-py-md row">
                  <div class="heading-light">Current phase :</div>
                  <div class="q-px-lg ">
                    {{
                      getSelectedClaim.status
                        ? getSelectedClaim.status.value
                        : '-'
                    }}
                  </div>
                </div>
                <div class="q-mb-sm">
                  <div class="heading-light">Change Claim phase to :</div>
                  <div class="q-mt-sm">
                    <q-select
                      class="required"
                      filled
                      v-model="claimPhase.value"
                      :options="options"
                      use-input
                      input-debounce="0"
                      option-value="name"
                      option-label="name"
                      behavior="menu"
                      map-options
                      options-dense
                      label="Claim Phases"
                      options-dense
                      emit-value
                      @filter="searchFilterBy"
                      @input="setTypes(claimPhase.value)"
                      lazy-rules
                      :rules="[
                        val => (val && val.length > 0) || 'Enter  new value'
                      ]"
                    ></q-select>
                  </div>
                </div>
                <div class="heading-light">Notes</div>
                <textarea
                  rows="5"
                  class="full-width"
                  v-model="notes"
                  style="resize: none;height:80px;"
                ></textarea>
              </div>
            </div>
            <div class="row text-primary justify-end q-mt-lg">
              <div class="  q-pa-md" @click="editClaimNumberDialog = false">
                CANCEL
              </div>
              <div
                class=" q-pa-md text-bold"
                @click="onClickChange(editDialogName)"
              >
                CHANGE
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import ClaimDetail from 'components/ClaimDetail';
import { onEmailClick } from '@utils/clickable';
import { successMessage } from '@utils/validation';
import { constants } from '@utils/constant';
export default {
  components: { ClaimDetail },
  data() {
    return {
      options: '',
      rating: 1,
      editClaimDetails: false,
      editClaimNumberDialog: false,
      editDialogName: '',
      editInputValue: '',
      notes: '',
      claimPhase: {
        value: '',
        machineValue: ''
      },

      ClaimDetails: [
        { name: 'Claim Summary' },
        { name: 'Loss Info' },
        { name: 'Property Details' },
        { name: 'Activity Log & Message Archive' },
        { name: 'Carrier & Policy' },
        { name: 'Tasks' },
        { name: 'Settlements' },
        { name: 'Company Personnel' },
        { name: 'Mortgages and Liens' },
        { name: 'Files' },
        { name: 'Notes' },
        { name: 'MatterPort' },
        { name: 'Time Tracking' },
        { name: 'Claim Ledger' }
      ]
    };
  },

  computed: {
    ...mapGetters(['selectedClaimId', 'getSelectedClaim', 'phases'])
  },

  created() {
    this.getSingleClaimDetails(this.selectedClaimId);
    this.getPhases();
    this.options = this.phases;
  },
  methods: {
    ...mapActions([
      'getSingleClaimDetails',
      'editClaimNumber',
      'editClaimPhase',
      'getPhases'
    ]),
    onEmailClick,
    successMessage,

    searchFilterBy(val, update) {
      this.claimPhase.value = null;
      if (val === ' ') {
        update(() => {
          this.options = this.phases;
        });
        return;
      }

      update(() => {
        const search = val.toLowerCase();
        this.options = this.phases.filter(
          v => v.name.toLowerCase().indexOf(search) > -1
        );
      });
    },

    setTypes(value) {
      const obj = this.phases.find(item => {
        return item.name === value;
      });

      this.claimPhase.machineValue = obj.machineValue;
    },

    async onClickChange(val) {
      const success = await this.$refs.claimEditForm.validate();

      if (success) {
        if (val == 'Claim Number') {
          const payload = {
            id: this.selectedClaimId,
            data: { number: this.editInputValue }
          };
          await this.editClaimNumber(payload);
          this.successMessage(constants.successMessages.CLAIM_EDITED);
        } else {
          const payload = {
            id: this.selectedClaimId,
            data: { phase: this.claimPhase, note: this.notes }
          };
          await this.editClaimPhase(payload);
          this.successMessage(constants.successMessages.CLAIM_PHASE_EDITED);
        }
        await this.getSingleClaimDetails(this.selectedClaimId);
        this.editClaimNumberDialog = false;
      } else {
      }
    },

    editClaimNumberDialogOnClick(value) {
      if (value == 'Claim Number') {
        this.editClaimNumberDialog = true;
        this.editClaimDetails = false;
        this.editDialogName = 'Claim Number';
      } else {
        this.editClaimNumberDialog = true;
        this.editClaimDetails = false;
        this.editDialogName = 'Claim Phase';
      }
    },
    onClickClaimItems(value) {
      switch (value) {
        case 'Claim Summary':
          this.$router.push('/claim-summary');
          break;
        case 'Loss Info':
          this.$router.push('/loss-info');
          break;
        case 'Property Details':
          this.$router.push('/personal-property');
          break;
        case 'Settlements':
          this.$router.push('/settlements');
          break;
        case 'Tasks':
          this.$router.push(`/claim-tasks/${this.selectedClaimId}`);
          break;
        case 'Demands And Offers':
          break;
        case 'Activity Log & Message Archive':
          this.$router.push('/activity-log');
          break;
        case 'Company Personnel':
          this.$router.push('/company-personnel');
          break;
        case 'Carrier & Policy':
          this.$router.push(`/insurance-policy/${this.selectedClaimId}`);
          break;
        case 'Mortgages and Liens':
          this.$router.push(`/mortgage-liens/${this.selectedClaimId}`);
          break;
        case 'Files':
          this.$router.push({
            path: `/claim-files/${this.selectedClaimId}`
          });
          break;
        case 'Notes':
          this.$router.push('/claim-notes');
          break;
        case 'MatterPort':
          break;
        case 'Time Tracking':
          break;
        case 'Claim Ledger':
      }
    }
  }
};
</script>
<style>
.icon-top {
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 10000;
}
</style>
