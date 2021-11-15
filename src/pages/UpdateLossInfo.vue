<template>
  <div>
    <q-dialog
      v-model="lossInfoDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="
            (lossInfoDialog = false), $emit('editLossInoDialog', false)
          "
          :dialogName="'Loss Info'"
        />
        <q-card class="q-pa-sm">
          <div class="mobile-container-page">
            <q-form ref="lossInfoForm">
              <LossInfo
                :lossInfo="lossDetails"
                :isMailingAddressEnable="false"
                :lossAddressSameAsClient="false"
                :isAddressRequired="false"
                :policyDate="{
                  policyEffectiveDate: lossDetails.policyEffectiveDate,
                  policyExpireDate: lossDetails.policyExpireDate
                }"
              />
            </q-form>
          </div>
          <div class="row justify-center">
            <q-btn
              label="Save"
              class="single-next-button-style"
              @click="onSaveButtonClick"
            ></q-btn>
          </div>
        </q-card>
      </q-card>
    </q-dialog>
    <div class="row">
      <q-icon
        size="xs"
        name="create"
        color="primary"
        class="q-ml-auto"
        v-if="!lossInfoDialog"
        @click="onEditIconClick"
      ></q-icon>
    </div>

    <div
      class="row"
      v-if="lossInfo.attributes && lossInfo.attributes.lossInfo.property"
    >
      <div class="heading-light q-mt-none col-4">Address Details</div>
      <div
        class="col-6 q-ml-md"
        v-if="lossInfo.attributes.lossInfo.property.address1"
      >
        {{
          lossInfo.attributes.lossInfo.property.houseNumber
            ? lossInfo.attributes.lossInfo.property.houseNumber
            : '-'
        }}
        {{
          lossInfo.attributes.lossInfo.property.address1
            ? lossInfo.attributes.lossInfo.property.address1
            : '-'
        }}
        <div
          v-if="
            lossInfo.attributes.lossInfo.property &&
            lossInfo.attributes.lossInfo.property.address2
          "
        >
          {{ lossInfo.attributes.lossInfo.property.address2 }}
        </div>
        <div>
          {{
            lossInfo.attributes.lossInfo.property.addressLocality
              ? lossInfo.attributes.lossInfo.property.addressLocality
              : '-'
          }}
          ,
          {{
            lossInfo.attributes.lossInfo.property.addressRegion
              ? toGetStateShortName(
                  lossInfo.attributes.lossInfo.property.addressRegion
                )
              : '-'
          }}
          {{
            lossInfo.attributes.lossInfo.property.postalCode
              ? lossInfo.attributes.lossInfo.property.postalCode
              : '-'
          }}
          <q-icon
            name="place"
            color="primary"
            @click="sendMap(lossInfo.attributes.lossInfo.property)"
            style="position: absolute; right: 20px"
            size="sm"
            class="q-mb-md"
          ></q-icon>
        </div>
      </div>
    </div>
    <div
      class="q-mt-md row"
      v-if="
        lossInfo.attributes &&
        lossInfo.attributes.lossInfo.property.propertyType
      "
    >
      <div class="heading-light q-mt-none col-xs-4">Property Type</div>
      <div class="column q-ml-md">
        {{ lossInfo.attributes.lossInfo.property.propertyType.value }}
      </div>
    </div>
    <div
      class="q-mt-md row"
      v-if="
        lossInfo.attributes.lossInfo &&
        lossInfo.attributes.lossInfo.propertyDesc
      "
    >
      <div class="heading-light q-mt-none col-xs-4">Property Description :</div>
      <div class="column q-ml-md">
        {{
          lossInfo.attributes.lossInfo.propertyDesc
            ? lossInfo.attributes.lossInfo.propertyDesc
            : '-'
        }}
      </div>
    </div>
    <div
      class="q-mt-md row"
      v-if="lossInfo.attributes && lossInfo.attributes.lossInfo.claimReason"
    >
      <div class="heading-light q-mt-none col-xs-4">Claim Reason:</div>
      <div class="column q-ml-md">
        {{
          lossInfo.attributes.lossInfo.claimReason.value
            ? lossInfo.attributes.lossInfo.claimReason.value
            : '-'
        }}
      </div>
    </div>
    <div
      class="q-mt-md row"
      v-if="lossInfo.attributes && lossInfo.attributes.lossInfo.serverity"
    >
      <div class="heading-light q-mt-none col-xs-4">Serverity:</div>
      <div class="column q-ml-md">
        {{
          lossInfo.attributes.lossInfo.serverity.value
            ? lossInfo.attributes.lossInfo.serverity.value
            : '-'
        }}
      </div>
    </div>
    <div
      class="q-mt-md row"
      v-if="lossInfo.attributes && lossInfo.attributes.lossInfo.cause"
    >
      <div class="heading-light q-mt-none col-xs-4">Cause of Loss:</div>
      <div class="column col-7 q-ml-md">
        {{
          lossInfo.attributes.lossInfo.cause
            ? lossInfo.attributes.lossInfo.cause.value
            : '-'
        }}
        -
        {{
          lossInfo.attributes.lossInfo.cause
            ? lossInfo.attributes.lossInfo.cause.desc
            : '-'
        }}
      </div>
    </div>
    <div
      class="q-mt-md row"
      v-if="lossInfo.attributes && lossInfo.attributes.lossInfo.date"
    >
      <div class="heading-light q-mt-none col-xs-4">Date of Loss:</div>
      <div class="column q-ml-md">
        {{ dateToShow(lossInfo.attributes.lossInfo.date) }}
      </div>
    </div>

    <div
      class="q-mt-md row"
      v-if="lossInfo.attributes && lossInfo.attributes.lossInfo.claimReason"
    >
      <div class="heading-light q-mt-none col-xs-4">Reason For Claim:</div>
      <div class="column q-ml-md">
        {{
          lossInfo.attributes.lossInfo.claimReason.value
            ? lossInfo.attributes.lossInfo.claimReason.value
            : '-'
        }}
      </div>
    </div>
    <div
      class="q-mt-md row"
      v-if="lossInfo.attribute && lossInfo.attributes.lossInfo.desc"
    >
      <div class="heading-light q-mt-none col-xs-4">Loss Description:</div>
      <div class="column col-7 q-ml-md">
        {{
          lossInfo.attributes.lossInfo.desc
            ? lossInfo.attributes.lossInfo.desc
            : '-'
        }}
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import moment from 'moment';
import { toGetStateShortName } from '@utils/common';
import LossInfo from 'components/LossInfo';
import ClaimDetail from 'components/ClaimDetail';
import { validateDate } from '@utils/validation';
import { date } from 'quasar';
import { dateToSend, dateToShow } from '@utils/date';
import { sendMap } from '@utils/clickable';
import CustomBar from 'components/CustomBar';
import { constants } from 'src/utils/constant';

export default {
  name: 'UpdateLossInfo',
  components: {
    CustomBar,
    ClaimDetail,
    LossInfo
  },
  data() {
    return {
      lossDetails: {
        isStateOfEmergencyToggle: '',
        nameOfEmergency: '',
        addressID: '',
        lossAddressNameDropdown: 'Others',
        policyEffectiveDate: '',
        policyExpireDate: '',
        wasAppifProvidedToTheInsuredToggle: false,
        doesTheOfficeNeedToProvidePpifToTheInsuredToggle: false,

        ppDamagedItems: [],

        osDamagedItems: [],
        isDamageOSToggle: false,
        isThereDamageToPersonalPropertyToggle: false,
        femaClaimToggle: false,
        isStateOfEmergencyToggle: false,
        isTheHomeHabitable: false,

        repairReplaceRadio: '',
        serialNumber: '',
        PPDamageName: '',
        PPDamageDescription: '',
        PPDamagedItemCost: '',
        lossAddressName: '',
        OSDamageDescription: '',
        OSDamageName: '',

        DescriptionOfLoss: '',

        OSDamagedItemCost: '',
        dateOfLoss: '',
        propertyDescription: '',
        damagePersnalPropertyDescription: '',
        reasonClaim: {
          value: '',
          id: '',
          machineValue: ''
        },

        nameOfEmergency: '',
        descriptionDwelling: '',
        damageDescription: '',
        property: {
          value: '',
          id: '',
          machineValue: ''
        },

        insuranceAdjustorName: '',
        whereDidTheLossOccur: '',
        other: '',
        severityOfClaimType: {
          id: '',
          value: '',
          machineValue: ''
        },
        causeOfLoss: {
          value: '',
          id: '',
          machineValue: '',
          desc: ''
        },
        describeTheLoss: '',
        insuranceAdjustorPhone: '',
        insuranceAdjustorPhoneType: '',
        typeOfLoss: ''
      },
      lossInfoDialog: false
    };
  },
  computed: {
    ...mapGetters([
      'lossInfo',
      'selectedClaimId',
      'propertyTypes',
      'claimReasons',
      'lossCauses',
      'claimSeverity',
      'claim'
    ]),

    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY');
      }
    }
  },

  async created() {
    if (!this.selectedClaimId) {
      this.$router.push('/clients');
    }
    this.getLossInfo(this.selectedClaimId);
    this.setSelectedClaimId(this.selectedClaimId);
    await this.getSingleClaims(this.selectedClaimId).then(() => {
      this.lossDetails.policyEffectiveDate =
        this.claim.policyInfo.effectiveDate;
      this.lossDetails.policyExpireDate = this.claim.policyInfo.expirationDate;
    });
  },
  methods: {
    ...mapActions([
      'getLossInfo',
      'getPropertyTypes',
      'getClaimReasons',
      'getLossCauses',
      'getSeverityClaim',
      'updateLossInfo',
      'getSingleClaims',
      'getSingleClaimDetails'
    ]),
    ...mapMutations(['setSelectedClaimId']),
    sendMap,
    toGetStateShortName,
    isMortgageDetails() {
      this.isMortgageHomeToggle = false;
    },
    validateDate,
    dateToShow,
    async onSaveButtonClick() {
      let success = false;
      success = await this.$refs.lossInfoForm.validate();
      if (success == true) {
        const payload = {
          id: this.selectedClaimId,
          lossInfo: {
            desc: this.lossDetails.descriptionDwelling,
            claimReason: this.lossDetails.reasonClaim,
            date: dateToSend(this.lossDetails.dateOfLoss),
            cause: this.lossDetails.causeOfLoss.value
              ? this.lossDetails.causeOfLoss
              : null,

            isFEMA: this.lossDetails.femaClaimToggle,
            isHabitable: this.lossDetails.isTheHomeHabitable,
            emergencyName: this.lossDetails.nameOfEmergency,
            isEmergency: this.lossDetails.isStateOfEmergencyToggle,
            serverity: this.lossDetails.severityOfClaimType
          }
        };

        await this.updateLossInfo(payload);
        this.lossInfoDialog = false;
        this.getLossInfo(this.selectedClaimId);

        this.getSingleClaimDetails(this.selectedClaimId);
      }
    },
    onEditIconClick() {
      this.lossInfoDialog = true;
      this.getPropertyTypes();
      this.getClaimReasons();
      this.getLossCauses();
      this.getSeverityClaim();
      this.$emit('editLossInoDialog', true);
      //This is For Prefilling Values in Loss Info Form
      if (this.lossInfo.attributes.lossInfo.desc) {
        this.lossDetails.descriptionDwelling =
          this.lossInfo.attributes.lossInfo.desc;
      }

      this.lossDetails.lossAddressName =
        this.lossInfo.attributes.lossInfo.lossAddressName;
      this.lossDetails.addressID = this.lossInfo.attributes.lossInfo.addressID;
      this.lossDetails.property =
        this.lossInfo.attributes.lossInfo.propertyType;
      if (this.lossInfo.attributes.lossInfo.serverity) {
        this.lossDetails.severityOfClaimType =
          this.lossInfo.attributes.lossInfo.serverity;
      }

      if (this.lossInfo.attributes.lossInfo.claimReason) {
        this.lossDetails.reasonClaim =
          this.lossInfo.attributes.lossInfo.claimReason;
      }

      if (this.lossInfo.attributes.lossInfo.date) {
        this.lossDetails.dateOfLoss = dateToShow(
          this.lossInfo.attributes.lossInfo.date
        );
      }

      this.lossDetails.isTheHomeHabitable = this.lossInfo.attributes.lossInfo
        .isHabitable
        ? this.lossInfo.attributes.lossInfo.isHabitable
        : false;
      this.lossDetails.femaClaimToggle = this.lossInfo.attributes.lossInfo
        .isFEMA
        ? this.lossInfo.attributes.lossInfo.isFEMA
        : false;
      this.lossDetails.isStateOfEmergencyToggle = this.lossInfo.attributes
        .lossInfo.isEmergency
        ? this.lossInfo.attributes.lossInfo.isEmergency
        : false;
      this.lossDetails.causeOfLoss.id = this.lossInfo.attributes.lossInfo.cause
        ? this.lossInfo.attributes.lossInfo.cause.id
        : null;
      this.lossDetails.causeOfLoss.value = this.lossInfo.attributes.lossInfo
        .cause
        ? this.lossInfo.attributes.lossInfo.cause.value
        : null;
      this.lossDetails.causeOfLoss.machineValue = this.lossInfo.attributes
        .lossInfo.cause
        ? this.lossInfo.attributes.lossInfo.cause.machineValue
        : null;
      this.lossDetails.causeOfLoss.desc = this.lossInfo.attributes.lossInfo
        .cause
        ? this.lossInfo.attributes.lossInfo.cause.desc
        : null;
    }
  }
};
</script>
<style lang="scss">
.form-height {
  height: calc(100vh - 150px);
  overflow: auto;
  margin: 10px;
}
::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
</style>
