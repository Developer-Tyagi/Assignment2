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
            <div class="form-heading ">Loss Info</div>
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
              lossInfo.attributes.address.streetAddress
                ? lossInfo.attributes.address.streetAddress
                : '-'
            }}
          </div>
          <div>
            {{
              lossInfo.attributes.address.addressLocality
                ? lossInfo.attributes.address.addressLocality
                : '-'
            }},
            {{
              lossInfo.attributes.address.houseNumber
                ? lossInfo.attributes.address.houseNumber
                : '-'
            }}
          </div>
          <div>
            {{ lossInfo.attributes.address.addressRegion }},
            {{ lossInfo.attributes.address.addressCountry }}
          </div>

          <div class="form-heading  ">Property Type :</div>

          <div>
            {{ lossInfo.attributes.propertyType.value }}
          </div>

          <div class="form-heading ">Property Description :</div>

          {{
            lossInfo.attributes.propertyDesc
              ? lossInfo.attributes.propertyDesc
              : '-'
          }}
          <div class="form-heading ">Claim Reason:</div>

          {{
            lossInfo.attributes.claimReason.value
              ? lossInfo.attributes.claimReason.value
              : '-'
          }}
          <div class="form-heading ">Loss Cause:</div>

          <div>
            {{
              lossInfo.attributes.cause.value
                ? lossInfo.attributes.cause.value
                : '-'
            }}
          </div>
          <div class="form-heading ">Date of Loss:</div>
          <div>
            {{ lossInfo.attributes.dateOfLoss | moment('MM/DD/YYYY') }}
          </div>
          <div class="form-heading ">Deadline Date:</div>
          <div>
            {{ lossInfo.attributes.deadlineDate | moment('MM/DD/YYYY') }}
          </div>

          <div class="form-heading ">Recovery Date:</div>
          <div>
            {{ lossInfo.attributes.recovDDDate | moment('MM/DD/YYYY') }}
          </div>

          <div class="form-heading ">lossAddressName:</div>

          <div>{{ lossInfo.attributes.lossAddressName }}</div>
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
    mounted() {
      if (!this.selectedClaimId) {
        this.$router.push('/clients');
      }
    },
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY');
      }
    }
  },
  created() {
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

    this.lossDetails.lossAddressName = this.lossInfo.attributes.lossAddressName;
    this.lossDetails.causeOfLoss.id = this.lossInfo.attributes.cause.id;
    this.lossDetails.causeOfLoss.value = this.lossInfo.attributes.cause.value;
    this.lossDetails.causeOfLoss.machineValue = this.lossInfo.attributes.cause.machineValue;

    this.lossDetails.property = this.lossInfo.attributes.propertyType;

    this.lossDetails.reasonClaim = this.lossInfo.attributes.claimReason;
    this.lossDetails.deadlineDate = this.lossInfo.attributes.deadlineDate;
    this.lossDetails.recovDDDate = this.lossInfo.attributes.recovDDDate;
    this.lossDetails.severityOfClaimType = this.lossInfo.attributes.serverity;
    this.lossDetails.propertyDescription = this.lossInfo.attributes.propertyDesc;
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
        position: 'center'
      });
    },
    async onSaveButtonClick() {
      let success = false;
      success = await this.$refs.lossInfoForm.validate();
      if (success == true) {
        const payload = {
          id: this.selectedClaimId,

          propertyType: {
            ...this.lossInfo.property
          },
          propertyDesc: this.lossInfo.propertyDescription,
          claimReason: {
            ...this.lossInfo.reasonClaim
          },
          date: dateToSend(this.lossInfo.dateOfLoss),
          cause: this.lossInfo.causeOfLoss ? this.lossInfo.causeOfLoss : null,
          deadlineDate: dateToSend(this.lossInfo.deadlineDate),
          recovDDDate: dateToSend(this.lossInfo.recovDeadline),

          desc: this.lossInfo.descriptionDwelling,

          serverity: {
            ...this.lossInfo.severityOfClaimType
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
