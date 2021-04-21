<template>
  <q-page>
    <div style=" height: calc(100vh - 50px); overflow-y: auto">
      <ClaimDetail />
      <q-card class="q-ma-md q-pa-md  ">
        <div class="text-bold row q-pa-sm">
          Carrier Info
          <q-icon
            v-if="selectedClaimCarrier.carrier"
            size="xs"
            name="create "
            color="primary"
            @click="onAddCarrierClick"
            class="q-ml-auto"
          ></q-icon>
          <q-icon
            v-if="selectedClaimCarrier.carrier"
            class="q-my-auto q-ml-sm"
            name="delete"
            size="xs"
            color="primary"
            @click="onDelete(selectedClaimCarrier.carrier.id)"
          />
          <img
            v-if="!selectedClaimCarrier.carrier"
            class="q-ml-auto"
            src="~assets/add.svg"
            alt="add_icon"
            height="20px"
            @click="onAddCarrierClick"
          />
        </div>

        <div class="q-pa-sm" v-if="selectedClaimCarrier.carrier">
          <div class="text-bold row" v-model="carrierName">
            {{ selectedClaimCarrier.carrier.name }}
          </div>

          <div class="row q-mt-sm">
            <span
              class="col-7 heading-light"
              v-if="selectedClaimCarrier.carrier.address"
            >
              <div class="row">
                {{
                  selectedClaimCarrier.carrier.address.houseNumber
                    ? selectedClaimCarrier.carrier.address.houseNumber
                    : '-'
                }}
                ,
                {{
                  selectedClaimCarrier.carrier.address.streetAddress
                    ? selectedClaimCarrier.carrier.address.streetAddress
                    : '-'
                }}
              </div>
              <div>
                {{
                  selectedClaimCarrier.carrier.address.addressLocality
                    ? selectedClaimCarrier.carrier.address.addressLocality
                    : '-'
                }}
                ,
                {{
                  selectedClaimCarrier.carrier.address.addressRegion
                    ? selectedClaimCarrier.carrier.address.addressRegion
                    : '-'
                }}
              </div>
              <div class="row">
                {{
                  selectedClaimCarrier.carrier.address.addressCountry
                    ? selectedClaimCarrier.carrier.address.addressCountry
                    : '-'
                }},
                {{
                  selectedClaimCarrier.carrier.address.postalCode
                    ? selectedClaimCarrier.carrier.address.postalCode
                    : '-'
                }}
              </div>
              <div
                class="q-mt-xs"
                v-for="phone in selectedClaimCarrier.carrier.phoneNumber"
              >
                <span v-if="phone.type"
                  >{{ phone.type ? phone.type : '-' }} :
                </span>
                <span
                  class="clickLink"
                  @click="onPhoneNumberClick(phone.number, $event)"
                  >{{ phone.number ? phone.number : '-' }}</span
                >
              </div>
              <span
                class="click-link"
                @click="
                  onEmailClick(selectedClaimCarrier.carrier.email, $event)
                "
                >{{
                  selectedClaimCarrier.carrier.email
                    ? selectedClaimCarrier.carrier.email
                    : '-'
                }}</span
              >
            </span>
          </div>
        </div>
        <div v-else class="heading-light col q-ma-xs">
          Carrier info not added yet.
        </div>
      </q-card>
      <q-card class="q-ma-md q-pa-md ">
        <span class=" text-bold col q-ma-xs "> Adjusters Info</span>
        <div class="row">
          <span class="text-bold col q-ma-xs q-mt-md"> Field Adjuster</span>
          <img
            class="q-mx-xs q-my-auto"
            src="~assets/add.svg"
            alt="add_icon"
            height="20px"
          />
        </div>
        <div class="q-pa-sm" v-if="policy.adjustor">
          -
        </div>
        <div v-else class="heading-light q-mb-sm  q-ma-xs">
          Field Adjuster not added yet.
        </div>
        <q-separator />
        <div class="row ">
          <span class="text-bold col q-ma-xs q-mt-md"> Desk Adjuster</span>
          <img
            class="q-mx-xs q-my-auto"
            src="~assets/add.svg"
            alt="add_icon"
            height="20px"
          />
        </div>
        <div class="q-pa-sm" v-if="policy.adjustor">
          -
        </div>
        <div v-else class="heading-light q-ma-xs">
          Desk Adjuster not added yet.
        </div>
      </q-card>
      <q-card class="q-ma-md q-pa-md  ">
        <div class="row q-mt-xs">
          <span class="text-bold col "> Policy Info</span>
          <q-icon name="edit" size="xs" color="primary" class="col-2  " />
        </div>
        <div class=" q-ml-xs">
          <div class="row q-mt-sm">
            <span class="heading-light col"> Policy Number </span>
            <span class="q-ml-md col">
              {{
                policy.policyInfo.policyNumber
                  ? policy.policyInfo.policyNumber
                  : '-'
              }}
            </span>
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col"> Claim Number </span>
            <span class="q-ml-md col">
              {{ policy.policyInfo.number ? policy.policyInfo.number : '-' }}
            </span>
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col"> Start Date </span>
            <span class="q-ml-md col">
              {{ policy.policyInfo.effectiveDate | moment('MM/DD/YYYY') }}
            </span>
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col"> End Date </span>
            <span class="q-ml-md col">
              {{ policy.policyInfo.expirationDate | moment('MM/DD/YYYY') }}
            </span>
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col"> Category </span>
            <span class="q-ml-md col">
              {{
                policy.policyInfo.category.value
                  ? policy.policyInfo.category.value
                  : '-'
              }}
            </span>
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col"> Policy Type </span>
            <span class="q-ml-md col">
              {{
                policy.policyInfo.type.value
                  ? policy.policyInfo.type.value
                  : '-'
              }}
            </span>
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col"> Appraisal Clause </span>
            <span class="q-ml-md col">
              -
            </span>
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col"> Total Amount of Policy </span>
            <span class="q-ml-md col">
              -
            </span>
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col"> Dwelling Limit (A) </span>
            <span class="q-ml-md col">
              {{
                policy.policyInfo.limitCoverage.dwelling
                  ? policy.policyInfo.limitCoverage.dwelling
                  : '-'
              }}
            </span>
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col"> Other Structures (B) </span>
            <span class="q-ml-md col">
              {{
                policy.policyInfo.limitCoverage.otherStructure
                  ? policy.policyInfo.limitCoverage.otherStructure
                  : '-'
              }}
            </span>
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col"> Contents Limit (C) </span>
            <span class="q-ml-md col">
              {{
                policy.policyInfo.limitCoverage.content
                  ? policy.policyInfo.limitCoverage.content
                  : '-'
              }}
            </span>
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col"> Loss of Use/Ale Limit (D) </span>
            <span class="q-ml-md col">
              {{
                policy.policyInfo.limitCoverage.lossOfUse
                  ? policy.policyInfo.limitCoverage.lossOfUse
                  : '-'
              }}
            </span>
          </div>

          <div class="row q-mt-xs">
            <span class="heading-light col"> Ordinance or Law</span>
            <span class="q-ml-md col">
              -
            </span>
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col"> Debris Removal</span>
            <span class="q-ml-md col">
              -
            </span>
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col"> Mold Fungi</span>
            <span class="q-ml-md col">
              -
            </span>
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col"> Business Interruption</span>
            <span class="q-ml-md col">
              -
            </span>
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col"> Depreciation</span>
            <span class="q-ml-md col">
              {{
                policy.policyInfo.depreciation
                  ? policy.policyInfo.depreciation
                  : '-'
              }}
            </span>
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col">Deductible</span>
            <span class="q-ml-md col">
              {{
                policy.policyInfo.deductibleAmount
                  ? policy.policyInfo.deductibleAmount
                  : '-'
              }}
            </span>
          </div>
          <div class="row q-mt-xs">
            <span class="heading-light col"> Additional Details</span>
          </div>
          <q-card class=" q-mt-sm q-pa-sm full-width q-mb-sm row">
            <span class="q-mb-lg col "> -</span>
          </q-card>
          <div class="row q-mt-xs">
            <span class="heading-light col "> Notes</span>
          </div>
          <q-card class=" q-pa-sm full-width q-mt-sm  row">
            <span class="q-mb-lg col "> -</span>
          </q-card>
        </div>
      </q-card>
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
    <q-dialog
      v-model="carriersListDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="carriersListDialog = false"
          :dialogName="'Select Carrier'"
        />
        <CarriersList
          @addCarrier="openAddCarrierDialog"
          :carrierDetails="false"
          :selectCarrier="true"
          @afterSelecting="selecting()"
          :carrierName="carrierName"
        />
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="addCarrierDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <AddCarrier
          @closeDialog="addCarrierDialog = false"
          :componentName="constants.industries.CARRIER"
        />
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import CustomBar from 'components/CustomBar';
import ClaimDetail from 'components/ClaimDetail';
import moment from 'moment';
import InsuranceInfo from 'components/InsuranceInfo';
import AddCarrier from 'components/AddCarrier';
import CarriersList from 'components/CarriersList';
import { validateDate, successMessage } from '@utils/validation';
import { onEmailClick, onPhoneNumberClick, sendMap } from '@utils/clickable';

import { dateToSend } from '@utils/date';
import { date } from 'quasar';
import { constants } from '@utils/constant';

export default {
  name: 'InsurancePolicy',

  components: {
    CustomBar,
    InsuranceInfo,
    ClaimDetail,
    CarriersList,
    AddCarrier
  },
  data() {
    return {
      carrierName: '',
      claimID: '',
      carrierDetails: '',
      carriersListDialog: false,
      addCarrierDialog: false,
      searchText: '',
      constants: constants,
      params: {
        name: ''
      },
      carrierListDialog: false,
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
      'selectedClaimId',
      'selectedClaimCarrier',
      'selectedClaimId',
      'selectedClaimCarrier'
    ]),
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY');
      }
    }
  },

  async created() {
    if (this.$route.params.id) {
      this.getPolicy(this.$route.params.id);
    }

    this.getPolicyCategory();
    this.getPolicyTypes();

    this.insuranceDetails.hasClaimBeenFilledToggle = this.policy.policyInfo
      .isClaimFiled
      ? this.policy.policyInfo.isClaimFiled
      : false;

    this.insuranceDetails.isThisIsForcedPlacedPolicyToggle = this.policy
      .policyInfo.isForcedPlaced
      ? this.policy.policyInfo.isForcedPlaced
      : false;

    this.insuranceDetails.policy.id = this.policy.policyInfo.type.id
      ? this.policy.policyInfo.type.id
      : '';

    this.insuranceDetails.policy.value = this.policy.policyInfo.type.value
      ? this.policy.policyInfo.type.value
      : '';
    this.insuranceDetails.policy.machineValue = this.policy.policyInfo.type
      .machineValue
      ? this.policy.policyInfo.type.machineValue
      : '';

    this.insuranceDetails.policyCategory.id = this.policy.policyInfo.category.id
      ? this.policy.policyInfo.category.id
      : '';

    this.insuranceDetails.policyCategory.value = this.policy.policyInfo.category
      .value
      ? this.policy.policyInfo.category.value
      : '';
    this.insuranceDetails.policyCategory.machineValue = this.policy.policyInfo
      .category.machineValue
      ? this.policy.policyInfo.category.machineValue
      : '';

    this.insuranceDetails.carrierName = this.policy.policyInfo.carrier.value
      ? this.policy.policyInfo.carrier.value
      : '';
    this.insuranceDetails.carrierId = this.policy.policyInfo.carrier.id
      ? this.policy.policyInfo.carrier.id
      : ''.value
      ? this.policy.policyInfo.carrier.value
      : '';

    this.insuranceDetails.policyNumber = this.policy.policyInfo.number
      ? this.policy.policyInfo.number
      : ' ';
    this.insuranceDetails.insuranceClaimNumber = this.policy.policyInfo.claimNumber;
    this.insuranceDetails.policyEffectiveDate = this.policy.policyInfo.effectiveDate;
    this.insuranceDetails.policyExpireDate = this.policy.policyInfo.expirationDate;

    this.insuranceDetails.policyEffectiveDate = this.insuranceDetails.policyExpireDate = date.formatDate(
      Date.now(),
      'MM/DD/YYYY'
    );

    this.insuranceDetails.dwellingLimitA = this.policy.policyInfo.limitCoverage.dwelling;
    this.insuranceDetails.contentsLimit = this.policy.policyInfo.limitCoverage.content;
    this.insuranceDetails.otherStructureB = this.policy.policyInfo.limitCoverage.otherStructure;
    this.insuranceDetails.lossOfUSD = this.policy.policyInfo.limitCoverage.lossOfUse;
    this.insuranceDetails.deprecation = this.policy.policyInfo.depreciation;
    this.insuranceDetails.deductible = this.policy.policyInfo.deductibleAmount;
    this.insuranceDetails.priorPayment = this.policy.policyInfo.priorPayment;
    this.insuranceDetails.reasonsOfLD = this.policy.policyInfo.limitReason;
  },
  methods: {
    ...mapActions([
      'getPolicy',
      'getPolicyTypes',
      'getPolicyCategory',
      'editInsurancePolicy',
      'getSelectedClaim',
      'getClaimCarrier',
      'deleteClaimCarrier'
    ]),
    validateDate,
    successMessage,
    onEmailClick,
    onPhoneNumberClick,

    async onDelete(id) {
      const carrier = {
        claimID: this.selectedClaimId,
        carrierID: id
      };
      await this.deleteClaimCarrier(carrier);
      this.$router.push(`/insurance-policy/${this.selectedClaimId}`);
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
        this.$router.push('/insurance-policy');
        this.successMessage(constants.successMessages.INSURER_AND_POLICY);
      }
    },
    async selecting() {
      this.carriersListDialog = false;
      await this.getClaimCarrier(this.selectedClaimId);
    },
    async onSelectCarrier() {},
    openAddCarrierDialog(e) {
      this.addCarrierDialog = e;
    },
    onSearchBackButtonClick() {
      this.searchText = '';
      this.search();
    },
    onAddButtonClick() {
      this.$emit('addCarrier', true);
    },
    search(event) {
      this.params.name = event;
    },
    onAddCarrierClick() {
      this.carriersListDialog = true;
      this.carrierName = this.selectedClaimCarrier.carrier.name;
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
