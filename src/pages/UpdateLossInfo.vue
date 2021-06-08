<template>
  <div>
    <!-- <ClaimDetail /> -->
    <q-dialog
      v-model="lossInfoDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="lossInfoDialog = false"
          :dialogName="'Loss Info'"
        />
        <q-card class="q-ma-sm q-pa-sm">
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
          <div class="q-mx-md">
            <q-btn
              label="Save"
              color="primary"
              class="button-width-90"
              @click="onSaveButtonClick"
              size="'xl'"
            ></q-btn>
          </div>
        </q-card>
      </q-card>
    </q-dialog>

    <q-card class="q-ma-sm q-pa-sm">
      <div class="row q-mt-sm" v-if="lossInfo.attributes.lossInfo.property">
        <div class="heading-light col-2">Address Details</div>

        <div
          class="col-7"
          v-if="lossInfo.attributes.lossInfo.property.streetAddress"
        >
          {{
            lossInfo.attributes.lossInfo.property.houseNumber
              ? lossInfo.attributes.lossInfo.property.houseNumber
              : '-'
          }}
          ,
          {{
            lossInfo.attributes.lossInfo.property.streetAddress
              ? lossInfo.attributes.lossInfo.property.streetAddress
              : '-'
          }}
          <div>
            {{
              lossInfo.attributes.lossInfo.property.addressLocality
                ? lossInfo.attributes.lossInfo.property.addressLocality
                : '-'
            }}
            ,
            {{ lossInfo.attributes.lossInfo.property.addressRegion }},
          </div>
          <div>
            {{ lossInfo.attributes.lossInfo.property.addressCountry }},
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
            ></q-icon>
          </div>
        </div>
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
        class="row q-mt-sm"
        v-if="
          lossInfo.attributes.lossInfo.property &&
            lossInfo.attributes.lossInfo.property.propertyType
        "
      >
        <span class="heading-light col-2"> Property Type :</span>
        <span class="q-ml-lg col">
          {{ lossInfo.attributes.lossInfo.property.propertyType.value }}</span
        >
      </div>
      <div
        class="row q-mt-sm"
        v-if="
          lossInfo.attributes.lossInfo &&
            lossInfo.attributes.lossInfo.propertyDesc
        "
      >
        <span class="heading-light col-2"> Property Description :</span>
        <span class="q-ml-lg col">
          {{
            lossInfo.attributes.lossInfo.propertyDesc
              ? lossInfo.attributes.lossInfo.propertyDesc
              : '-'
          }}</span
        >
      </div>
      <div
        class="row q-mt-sm"
        v-if="
          lossInfo.attributes.lossInfo &&
            lossInfo.attributes.lossInfo.claimReason
        "
      >
        <span class="heading-light col-2"> Claim Reason:</span>
        <span class="q-ml-lg col">
          {{
            lossInfo.attributes.lossInfo.claimReason.value
              ? lossInfo.attributes.lossInfo.claimReason.value
              : '-'
          }}</span
        >
      </div>
      <div
        class="row q-mt-sm"
        v-if="
          lossInfo.attributes.lossInfo && lossInfo.attributes.lossInfo.serverity
        "
      >
        <span class="heading-light col-2"> Serverity:</span>
        <span class="q-ml-lg col">
          {{
            lossInfo.attributes.lossInfo.serverity.value
              ? lossInfo.attributes.lossInfo.serverity.value
              : '-'
          }}</span
        >
      </div>
      <div
        class="row q-mt-sm"
        v-if="
          lossInfo.attributes.lossInfo && lossInfo.attributes.lossInfo.cause
        "
      >
        <span class="heading-light col-2"> Cause of Loss:</span>
        <span class="q-ml-lg col">
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
        </span>
      </div>
      <div
        class="row q-mt-sm"
        v-if="lossInfo.attributes.lossInfo && lossInfo.attributes.lossInfo.date"
      >
        <span class="heading-light col-2"> Date of Loss:</span>
        <span class="q-ml-lg col">
          {{ dateToShow(lossInfo.attributes.lossInfo.date) }}</span
        >
      </div>

      <div
        class="row q-mt-sm"
        v-if="
          lossInfo.attributes.lossInfo &&
            lossInfo.attributes.lossInfo.deadlineDate
        "
      >
        <span class="heading-light col-2"> Deadline Date:</span>
        <span class="q-ml-lg col">
          {{ dateToShow(lossInfo.attributes.lossInfo.deadlineDate) }}</span
        >
      </div>
      <div
        class="row q-mt-sm"
        v-if="
          lossInfo.attributes.lossInfo &&
            lossInfo.attributes.lossInfo.recovDDDate
        "
      >
        <span class="heading-light col-2"> Recovery Date:</span>
        <span class="q-ml-lg col">
          {{ dateToShow(lossInfo.attributes.lossInfo.recovDDDate) }}</span
        >
      </div>
      <div
        class="row q-mt-sm"
        v-if="
          lossInfo.attributes.lossInfo &&
            lossInfo.attributes.lossInfo.claimReason
        "
      >
        <span class="heading-light col-2"> Reason For Claim:</span>
        <span class="q-ml-lg col">
          {{
            lossInfo.attributes.lossInfo.claimReason.value
              ? lossInfo.attributes.lossInfo.claimReason.value
              : '-'
          }}</span
        >
      </div>
      <div
        class="row q-mt-sm"
        v-if="lossInfo.attributes.lossInfo && lossInfo.attributes.lossInfo.desc"
      >
        <span class="heading-light col-2"> Loss Description:</span>
        <span class="q-ml-lg col">
          {{
            lossInfo.attributes.lossInfo.desc
              ? lossInfo.attributes.lossInfo.desc
              : '-'
          }}</span
        >
      </div>
    </q-card>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import moment from 'moment';
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
        deadlineDate: '',
        recovDeadline: '',
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
    this.getPropertyTypes();
    this.getClaimReasons();
    await this.getSingleClaims(this.selectedClaimId).then(() => {
      this.lossDetails.policyEffectiveDate = this.claim.policyInfo.effectiveDate;
      this.lossDetails.policyExpireDate = this.claim.policyInfo.expirationDate;
    });
    this.getLossCauses();
    this.getSeverityClaim();
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
            deadlineDate: dateToSend(this.lossDetails.deadlineDate),
            recovDDDate: dateToSend(this.lossDetails.recovDeadline),
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
        this.$router.push('/loss-info');
        this.getSingleClaimDetails(this.selectedClaimId);
      }
    },
    onEditIconClick() {
      this.lossInfoDialog = true;

      //This is For Prefilling Values in Loss Info Form
      this.lossDetails.descriptionDwelling = this.lossInfo.attributes.lossInfo.desc;
      this.lossDetails.lossAddressName = this.lossInfo.attributes.lossInfo.lossAddressName;
      this.lossDetails.addressID = this.lossInfo.attributes.lossInfo.addressID;
      this.lossDetails.property = this.lossInfo.attributes.lossInfo.propertyType;
      this.lossDetails.severityOfClaimType = this.lossInfo.attributes.lossInfo.serverity;
      this.lossDetails.reasonClaim = this.lossInfo.attributes.lossInfo.claimReason;
      this.lossDetails.deadlineDate = dateToShow(
        this.lossInfo.attributes.lossInfo.deadlineDate
      );
      this.lossDetails.dateOfLoss = dateToShow(
        this.lossInfo.attributes.lossInfo.date
      );
      this.lossDetails.recovDeadline = dateToShow(
        this.lossInfo.attributes.lossInfo.recovDDDate
      );
      this.lossDetails.recovDDDate = this.lossInfo.attributes.lossInfo.recovDDDate;
      this.lossDetails.isTheHomeHabitable = this.lossInfo.attributes.lossInfo.isHabitable;
      this.lossDetails.femaClaimToggle = this.lossInfo.attributes.lossInfo.isFEMA;
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
