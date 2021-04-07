<template>
  <q-page>
    <div style=" height: calc(100vh - 50px); overflow-y: auto">
      <div class="q-pa-md">
        <div class="q-pl-sm text-h6">
          Insurer
        </div>
        <div class="q-pa-sm">
          {{
            policy.attributes.policyInfo.carrier
              ? policy.attributes.policyInfo.carrier.value
              : '-'
          }}
        </div>
        <div class="q-pl-sm">
          {{
            policy.attributes.policyInfo.number
              ? policy.attributes.policyInfo.number
              : '-'
          }}
        </div>
      </div>

      <div class="client-list-item q-ma-sm">
        <div class="row justify-between">
          <div class=" text-bold">Policy Details</div>

          <div>
            <q-icon
              class="q-my-auto "
              name="edit"
              size="sm"
              color="primary"
              @click="insuranceInfoDialog = true"
            />
          </div>
        </div>

        <div class="form-heading">Claim Number</div>
        <div class="q-pl-sm">
          {{
            policy.attributes.policyInfo.claimNumber
              ? policy.attributes.policyInfo.claimNumber
              : '-'
          }}
        </div>

        <div class="form-heading">Is Claim be Filed</div>
        <div class="q-pl-sm">
          {{
            policy.attributes.policyInfo.isClaimFiled
              ? policy.attributes.policyInfo.isClaimFiled
              : '-'
          }}
        </div>

        <div class="form-heading">Is this is a Forced-Placed policy?</div>
        <div class="q-pl-sm">
          {{
            policy.attributes.policyInfo.isForcedPlaced
              ? policy.attributes.policyInfo.isForcedPlaced
              : '-'
          }}
        </div>

        <div class="form-heading">Policy Start date</div>
        <div class="q-pl-sm">
          {{
            policy.attributes.policyInfo.effectiveDate | moment('MM/DD/YYYY')
          }}
        </div>

        <div class="form-heading">Policy End Date</div>
        <div class="q-pl-sm">
          {{
            policy.attributes.policyInfo.expirationDate | moment('MM/DD/YYYY')
          }}
        </div>

        <div class="form-heading">Policy Category</div>

        <div class="q-pl-sm">
          {{
            policy.attributes.policyInfo.category.value
              ? policy.attributes.policyInfo.category.value
              : '-'
          }}
        </div>

        <div class="form-heading">Policy Type</div>
        <div class="q-pl-sm">
          {{
            policy.attributes.policyInfo.type.value
              ? policy.attributes.policyInfo.type.value
              : '-'
          }}
        </div>

        <div class="form-heading">Dwelling Limit (A)</div>
        <div class="q-pl-sm">
          {{
            policy.attributes.policyInfo.limitCoverage.dwelling
              ? policy.attributes.policyInfo.limitCoverage.dwelling
              : '-'
          }}
        </div>
        <div class="form-heading">Other Structure (B)</div>
        <div class="q-pl-sm">
          {{
            policy.attributes.policyInfo.limitCoverage.otherStructure
              ? policy.attributes.policyInfo.limitCoverage.otherStructure
              : '-'
          }}
        </div>

        <div class="form-heading">Contents Limit (C)</div>
        <div class="q-pl-sm">
          {{
            policy.attributes.policyInfo.limitCoverage.content
              ? policy.attributes.policyInfo.limitCoverage.content
              : '-'
          }}
        </div>
        <div class="form-heading">Loss of Use Limit (D)</div>
        <div class="q-pl-sm">
          {{
            policy.attributes.policyInfo.limitCoverage.lossOfUse
              ? policy.attributes.policyInfo.limitCoverage.lossOfUse
              : '-'
          }}
        </div>

        <div class="form-heading">Depreciation</div>
        <div class="q-pl-sm">
          {{
            policy.attributes.policyInfo.depreciation
              ? policy.attributes.policyInfo.depreciation
              : '-'
          }}
        </div>
        <div class="form-heading">Deductible</div>
        <div class="q-pl-sm">
          {{
            policy.attributes.policyInfo.deductibleAmount
              ? policy.attributes.policyInfo.deductibleAmount
              : '-'
          }}
        </div>
        <div class="form-heading">Prior payment by insured</div>
        <div class="q-pl-sm">
          {{
            policy.attributes.policyInfo.priorPayment
              ? policy.attributes.policyInfo.priorPayment
              : '-'
          }}
        </div>

        <div class="form-heading">Reason for Limits/Denial</div>
        <div class="q-pl-sm">
          {{
            policy.attributes.policyInfo.limitReason
              ? policy.attributes.policyInfo.limitReason
              : '-'
          }}
        </div>
      </div>
      <q-separator />
    </div>
    <q-dialog
      v-model="insuranceInfoDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="insuranceInfoDialog = false"
          :dialogName="'Insurance Info'"
        />
        <div class="q-ma-sm  mobile-container-page-without-search">
          <q-form ref="insuranceInfoForm" class="form-height">
            <InsuranceInfo :insuranceDetails="insuranceDetails" />
          </q-form>

          <q-btn
            label="Save"
            color="primary"
            class="button-width-90"
            @click="onSaveButtonClick('insuranceInfoDialog')"
            size="'xl'"
          />
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import CustomBar from 'components/CustomBar';
import moment from 'moment';
import InsuranceInfo from 'components/InsuranceInfo';
import { validateDate } from '@utils/validation';
import { dateToSend } from '@utils/date';
import { date } from 'quasar';

export default {
  name: 'InsurancePolicy',

  components: { CustomBar, InsuranceInfo },
  data() {
    return {
      insuranceInfoDialog: false,
      insuranceDetails: {
        hasClaimBeenFilledToggle: false,
        isThisIsForcedPlacedPolicyToggle: false,
        policy: {
          id: '',
          value: ''
        },
        type: '',
        details: '',
        id: '',
        machineValue: '',
        policyCategory: {
          id: '',
          value: '',
          machineValue: ''
        },
        carrierName: '',
        carrierId: '',
        insuranceClaimNumber: '',
        policyNumber: '',
        policyEffectiveDate: '',
        policyExpireDate: '',
        dwellingLimitA: '',
        contentsLimit: '',
        otherStructureB: '',
        lossOfUSD: '',
        deprecation: '',
        deductible: '',
        priorPayment: '',
        reasonsOfLD: ''
      }
    };
  },

  computed: {
    ...mapGetters([
      'policy',
      'policyTypes',
      'policyCategories',
      'selectedClaimId'
    ]),
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY');
      }
    }
  },

  async created() {
    if (this.selectedClaimId) {
      await this.getPolicy(this.selectedClaimId);
    } else {
      this.$router.push('/clients');
    }

    this.getPolicyCategory();
    this.getPolicyTypes();

    this.insuranceDetails.hasClaimBeenFilledToggle = this.policy.attributes
      .policyInfo.isClaimFiled
      ? this.policy.attributes.policyInfo.isClaimFiled
      : false;

    this.insuranceDetails.isThisIsForcedPlacedPolicyToggle = this.policy
      .attributes.policyInfo.isForcedPlaced
      ? this.policy.attributes.policyInfo.isForcedPlaced
      : false;

    this.insuranceDetails.policy.id = this.policy.attributes.policyInfo.type.id
      ? this.policy.attributes.policyInfo.type.id
      : '';

    this.insuranceDetails.policy.value = this.policy.attributes.policyInfo.type
      .value
      ? this.policy.attributes.policyInfo.type.value
      : '';
    this.insuranceDetails.policy.machineValue = this.policy.attributes
      .policyInfo.type.machineValue
      ? this.policy.attributes.policyInfo.type.machineValue
      : '';

    this.insuranceDetails.policyCategory.id = this.policy.attributes.policyInfo
      .category.id
      ? this.policy.attributes.policyInfo.category.id
      : '';

    this.insuranceDetails.policyCategory.value = this.policy.attributes
      .policyInfo.category.value
      ? this.policy.attributes.policyInfo.category.value
      : '';
    this.insuranceDetails.policyCategory.machineValue = this.policy.attributes
      .policyInfo.category.machineValue
      ? this.policy.attributes.policyInfo.category.machineValue
      : '';

    this.insuranceDetails.carrierName = this.policy.attributes.policyInfo
      .carrier.value
      ? this.policy.attributes.policyInfo.carrier.value
      : '';
    this.insuranceDetails.carrierId = this.policy.attributes.policyInfo.carrier
      .id
      ? this.policy.attributes.policyInfo.carrier.id
      : ''.value
      ? this.policy.attributes.policyInfo.carrier.value
      : '';

    this.insuranceDetails.policyNumber = this.policy.attributes.policyInfo
      .number
      ? this.policy.attributes.policyInfo.number
      : ' ';
    this.insuranceDetails.insuranceClaimNumber = this.policy.attributes.policyInfo.claimNumber;
    this.insuranceDetails.policyEffectiveDate = this.policy.attributes.policyInfo.effectiveDate;
    this.insuranceDetails.policyExpireDate = this.policy.attributes.policyInfo.expirationDate;

    this.insuranceDetails.policyEffectiveDate = this.insuranceDetails.policyExpireDate = date.formatDate(
      Date.now(),
      'MM/DD/YYYY'
    );

    this.insuranceDetails.dwellingLimitA = this.policy.attributes.policyInfo.limitCoverage.dwelling;
    this.insuranceDetails.contentsLimit = this.policy.attributes.policyInfo.limitCoverage.content;
    this.insuranceDetails.otherStructureB = this.policy.attributes.policyInfo.limitCoverage.otherStructure;
    this.insuranceDetails.lossOfUSD = this.policy.attributes.policyInfo.limitCoverage.lossOfUse;
    this.insuranceDetails.deprecation = this.policy.attributes.policyInfo.depreciation;
    this.insuranceDetails.deductible = this.policy.attributes.policyInfo.deductibleAmount;
    this.insuranceDetails.priorPayment = this.policy.attributes.policyInfo.priorPayment;
    this.insuranceDetails.reasonsOfLD = this.policy.attributes.policyInfo.limitReason;
  },
  methods: {
    ...mapActions([
      'getPolicy',
      'getPolicyTypes',
      'getPolicyCategory',
      'editInsurancePolicy'
    ]),
    validateDate,
    successMessage() {
      this.$q.notify({
        type: 'positive',
        message: `Insurer & Policy Info Updated Successfully!`,
        position: 'top'
      });
    },
    async onSaveButtonClick() {
      let success = false;
      success = await this.$refs.insuranceInfoForm.validate();

      if (success) {
        const payload = {
          id: this.selectedClaimId,
          data: {
            policyInfo: {
              carrier: {
                id: this.insuranceDetails.carrierId,
                value: this.insuranceDetails.carrierName
              },
              number: this.insuranceDetails.policyNumber,
              isClaimFiled: this.hasClaimBeenFilledToggle,
              isForcedPlaced: this.isThisIsForcedPlacedPolicyToggle,
              claimNumber: this.insuranceDetails.insuranceClaimNumber,
              category: {
                id: this.insuranceDetails.policyCategory.id,
                value: this.insuranceDetails.policyCategory.value,
                machineValue: this.insuranceDetails.policyCategory.machineValue
              },
              type: {
                id: this.insuranceDetails.policy.id,
                value: this.insuranceDetails.policy.value,
                machineValue: this.insuranceDetails.policy.machineValue
              },

              effectiveDate: dateToSend(
                this.insuranceDetails.policyEffectiveDate
              ),
              expirationDate: dateToSend(
                this.insuranceDetails.policyExpireDate
              ),
              isClaimFiled: this.insuranceDetails.hasClaimBeenFilledToggle,
              isForcedPlaced: this.insuranceDetails
                .isThisIsForcedPlacedPolicyToggle,
              limitCoverage: {
                dwelling: this.insuranceDetails.dwellingLimitA
                  ? this.insuranceDetails.dwellingLimitA
                  : 0,
                otherStructure: this.insuranceDetails.otherStructureB
                  ? this.insuranceDetails.otherStructureB
                  : 0,
                content: this.insuranceDetails.contentsLimit
                  ? this.insuranceDetails.contentsLimit
                  : 0,
                lossOfUse: this.insuranceDetails.lossOfUSD
                  ? this.insuranceDetails.lossOfUSD
                  : 0
              },
              deductibleAmount: this.insuranceDetails.deductible
                ? this.insuranceDetails.deductible
                : 0,
              depreciation: this.insuranceDetails.deprecation
                ? this.insuranceDetails.deprecation
                : 0,
              priorPayment: this.insuranceDetails.priorPayment
                ? this.insuranceDetails.priorPayment
                : 0,
              limitReason: this.insuranceDetails.reasonsOfLD,
              declaration: {
                isDeclared: true,
                fileInfo: {
                  id: '',
                  value: ''
                }
              }
            }
          }
        };

        await this.editInsurancePolicy(payload);
        this.insuranceInfoDialog = false;
        this.getPolicy(this.selectedClaimId);
        this.$router.push('/claim-details');
        this.successMessage();
      }
    }
  }
};
</script>
<style lang="scss">
.form-height {
  height: calc(100vh - 120px);
  overflow: auto;
  margin: 10px;
}
</style>
