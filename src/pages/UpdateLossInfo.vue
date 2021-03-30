<template>
  <q-page>
    <q-dialog
      v-model="lossInfoDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="lossInfoDialog = false"
          :dialogName="'Loss Info'"
        />
        <div class="mobile-container-page-without-search q-pa-md">
          <q-form ref="lossInfoForm" class="form-height">
            <LossInfo
              :lossInfo="lossDetails"
              :isMailingAddressEnable="false"
              :lossAddressSameAsClient="false"
              :isAddressRequired="false"
            />
          </q-form>

          <q-btn
            label="Save"
            color="primary"
            class="button-width-90"
            @click="onSaveButtonClick"
            size="'xl'"
          />
        </div>
      </q-card>
    </q-dialog>
    <div
      :class="{
        'mobile-container-page-without-search': !$q.platform.is.iphone,
        'mobile-container-page': $q.platform.is.iphone
      }"
    >
      <div class="q-pa-lg column full-height">
        <!-- This is for showing the Loss Info details   -->

        <q-card class="q-pa-md q-mt-md full-width">
          <div class="row">
            <div class="form-heading  ">Loss Info</div>
            <div class="row ">
              <div class="col-10"></div>
              <q-icon
                size="sm"
                name="create"
                color="primary"
                class=" col q-pa-sm absolute-right "
                @click="lossInfoDialog = true"
              ></q-icon>
            </div>
          </div>

          <div class="form-heading">Address :</div>

          <div>
            {{
              lossInfo.attributes.lossInfo.address.streetAddress
                ? lossInfo.attributes.lossInfo.address.streetAddress
                : '-'
            }}
          </div>

          <div>
            {{
              lossInfo.attributes.lossInfo.address.addressLocality
                ? lossInfo.attributes.lossInfo.address.addressLocality
                : '-'
            }},
            {{
              lossInfo.attributes.lossInfo.address.houseNumber
                ? lossInfo.attributes.lossInfo.address.houseNumber
                : '-'
            }}
          </div>
          <div>
            {{ lossInfo.attributes.lossInfo.address.addressRegion }},
            {{ lossInfo.attributes.lossInfo.address.addressCountry }}
          </div>

          <div class="form-heading  ">Property Type :</div>

          <div>
            {{ lossInfo.attributes.lossInfo.propertyType.value }}
          </div>

          <div class="form-heading ">Property Description :</div>

          {{
            lossInfo.attributes.lossInfo.propertyDesc
              ? lossInfo.attributes.lossInfo.propertyDesc
              : '-'
          }}
          <div class="form-heading ">Claim Reason:</div>

          {{
            lossInfo.attributes.lossInfo.claimReason.value
              ? lossInfo.attributes.lossInfo.claimReason.value
              : '-'
          }}
          <div class="form-heading ">Serverity:</div>

          {{
            lossInfo.attributes.lossInfo.serverity.value
              ? lossInfo.attributes.lossInfo.serverity.value
              : '-'
          }}
          <div class="form-heading ">Cause of Loss:</div>

          {{
            lossInfo.attributes.lossInfo.cause
              ? lossInfo.attributes.lossInfo.cause.value
              : '-'
          }}

          <div class="form-heading ">Date of Loss:</div>
          <div>
            {{ lossInfo.attributes.lossInfo.dateOfLoss | moment('MM/DD/YYYY') }}
          </div>
          <div class="form-heading ">Deadline Date:</div>
          <div>
            {{
              lossInfo.attributes.lossInfo.deadlineDate | moment('MM/DD/YYYY')
            }}
          </div>

          <div class="form-heading ">Recovery Date:</div>
          <div>
            {{
              lossInfo.attributes.lossInfo.recovDDDate | moment('MM/DD/YYYY')
            }}
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import moment from 'moment';
import LossInfo from 'components/LossInfo';
import { validateDate } from '@utils/validation';
import { date } from 'quasar';
import { dateToSend } from '@utils/date';
import CustomBar from 'components/CustomBar';

export default {
  name: 'UpdateLossInfo',
  components: {
    CustomBar,

    LossInfo
  },
  data() {
    return {
      lossDetails: {
        lossAddressNameDropdown: 'Others',

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
          machineValue: ''
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
      'claimSeverity'
    ]),

    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY');
      }
    }
  },
  created() {
    if (!this.selectedClaimId) {
      this.$router.push('/clients');
    }
    this.getLossInfo(this.selectedClaimId);
    this.setSelectedClaimId(this.selectedClaimId);

    this.getPropertyTypes();
    this.getClaimReasons();
    this.getLossCauses();
    this.getSeverityClaim();
    this.lossDetails.dateOfLoss = this.lossDetails.deadlineDate = this.lossDetails.recovDeadline = date.formatDate(
      Date.now(),
      'MM/DD/YYYY'
    );

    //This is For Prefilling Values in Loss Info Form

    this.lossDetails.property = this.lossInfo.attributes.lossInfo.propertyType;
    this.lossDetails.severityOfClaimType = this.lossInfo.attributes.lossInfo.serverity;
    this.lossDetails.reasonClaim = this.lossInfo.attributes.lossInfo.claimReason;
    this.lossDetails.deadlineDate = this.lossInfo.attributes.lossInfo.deadlineDate;
    this.lossDetails.recovDDDate = this.lossInfo.attributes.lossInfo.recovDDDate;
    this.lossDetails.isTheHomeHabitable = this.lossInfo.attributes.lossInfo.isHabitable;
    this.lossDetails.femaClaimToggle = this.lossInfo.attributes.lossInfo.isFEMA;
    this.lossDetails.isStateOfEmergencyToggle = this.lossInfo.attributes.lossInfo.isEmergency;
    this.lossDetails.causeOfLoss = this.lossInfo.attributes.lossInfo.cause;
  },
  methods: {
    ...mapActions([
      'getLossInfo',
      'getPropertyTypes',
      'getClaimReasons',
      'getLossCauses',
      'getSeverityClaim',
      'updateLossInfo'
    ]),
    ...mapMutations(['setSelectedClaimId']),

    isMortgageDetails() {
      this.isMortgageHomeToggle = false;
    },
    validateDate,
    successMessage() {
      this.$q.notify({
        type: 'positive',
        message: `Loss Info Updated Successfully!`,
        position: 'top'
      });
    },
    async onSaveButtonClick() {
      let success = false;
      success = await this.$refs.lossInfoForm.validate();
      if (success == true) {
        const payload = {
          id: this.selectedClaimId,
          lossInfo: {
            address: {
              addressCountry: this.lossInfo.attributes.lossInfo.address
                .addressCountry,
              addressLocality: this.lossInfo.attributes.lossInfo.address
                .addressLocality,
              addressRegion: this.lossInfo.attributes.lossInfo.address
                .addressRegion,
              postalCode: this.lossInfo.attributes.lossInfo.address.postalCode,
              streetAddress: this.lossInfo.attributes.lossInfo.address
                .streetAddress,
              dropBox: {
                info: this.lossInfo.attributes.lossInfo.address.dropBox.info,
                isPresent: this.lossInfo.attributes.lossInfo.address.dropBox
                  .isPresent
              },
              houseNumber: this.lossInfo.attributes.lossInfo.address.houseNumber
            },
            isNewAddress: false,
            lossAddressName: this.lossDetails.lossAddressName,
            addressID: '605c5f3dd762a4813d48cd91',
            propertyType: this.lossDetails.property,
            propertyDesc: this.lossDetails.propertyDescription,
            claimReason: this.lossDetails.reasonClaim,
            date: dateToSend(this.lossDetails.dateOfLoss),
            cause: this.lossDetails.causeOfLoss.value
              ? this.lossDetails.causeOfLoss
              : null,
            deadlineDate: dateToSend(this.lossDetails.deadlineDate),
            recovDDDate: dateToSend(this.lossDetails.recovDeadline),
            isFEMA: this.lossDetails.femaClaimToggle,
            isHabitable: this.lossDetails.isTheHomeHabitable,
            serverity: this.lossDetails.severityOfClaimType
          }
        };

        await this.updateLossInfo(payload);
        this.lossInfoDialog = false;
        this.successMessage();
        this.getLossInfo(this.selectedClaimId);
        this.$router.push('/claim-details');
      }
    }
  }
};
</script>
<style lang="scss">
.form-heading {
  color: #333333;
  font-weight: bold;
  font-size: 14px;
  margin-top: 10px;
}
.form-height {
  height: calc(100vh - 150px);
  overflow: auto;
  margin: 10px;
}
</style>
