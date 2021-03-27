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
              :lossInfo="lossInfo"
              :isMailingAddressEnable="false"
              :lossAddressSameAsClient="false"
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

          <div>
            <div>Address :</div>

            <div>
              {{ lossInfo.lossAddressDetails.streetAddress }}
            </div>

            {{
              InfoLoss.attributes.lossInfo.address.streetAddress
                ? InfoLoss.attributes.lossInfo.address.streetAddress
                : '-'
            }}
            <div>
              {{
                lossInfo.lossAddressDetails.addressLocality
                  ? lossInfo.lossAddressDetails.addressLocality
                  : '-'
              }},
              {{
                lossInfo.lossAddressDetails.houseNumber
                  ? lossInfo.lossAddressDetails.houseNumber
                  : '-'
              }}
            </div>
            <div>
              {{ lossInfo.lossAddressDetails.addressRegion }},
              {{ lossInfo.lossAddressDetails.addressCountry }}
            </div>

            <div class="form-heading  ">Property Type :</div>

            <div>
              {{ InfoLoss.attributes.lossInfo.propertyType.value }}
            </div>

            <div class="form-heading ">Property Description :</div>

            {{
              InfoLoss.attributes.lossInfo.propertyDesc
                ? InfoLoss.attributes.lossInfo.propertyDesc
                : '-'
            }}
            <div class="form-heading ">Claim Reason:</div>

            {{
              InfoLoss.attributes.lossInfo.claimReason.value
                ? InfoLoss.attributes.lossInfo.claimReason.value
                : '-'
            }}
            <div class="form-heading ">Loss Cause:</div>

            <div>
              {{
                InfoLoss.attributes.lossInfo.cause.value
                  ? InfoLoss.attributes.lossInfo.cause.value
                  : '-'
              }}
            </div>

            <div class="form-heading ">Deadline Date:</div>
            <div>
              {{ InfoLoss.attributes.deadlineDate | moment('MM/DD/YYYY') }}
            </div>

            <div class="form-heading ">Recovery Date:</div>
            <div>
              {{
                InfoLoss.attributes.lossInfo.recovDDDate | moment('MM/DD/YYYY')
              }}
            </div>

            <div class="form-heading ">lossAddressName:</div>

            <div>{{ InfoLoss.attributes.lossInfo.lossAddressName }}</div>
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
import AutoCompleteAddress from 'components/AutoCompleteAddress';
export default {
  name: 'UpdateLossInfo',
  components: {
    CustomBar,
    AutoCompleteAddress,
    LossInfo
  },
  data() {
    return {
      lossInfo: {
        isLossAddressSameAsClientToggle: false,

        lossAddressNameDropdown: 'Others',
        isSecondMortgageHome: false,

        wasAppifProvidedToTheInsuredToggle: false,
        doesTheOfficeNeedToProvidePpifToTheInsuredToggle: false,
        PPdamagedItemsDailog: false,
        ppDamagedItems: [],

        damagedItemsDailog: false,
        osDamagedItems: [],
        isDamageOSToggle: false,
        isThereDamageToPersonalPropertyToggle: false,
        femaClaimToggle: false,
        isStateOfEmergencyToggle: false,
        isTheHomeHabitable: false,
        lossAddressDetails: {
          houseNumber: '',
          addressCountry: '',
          addressRegion: '',
          addressLocality: '',
          postalCode: '',
          streetAddress: '',
          postOfficeBoxNumber: '4',
          dropBox: {
            info: '',
            isPresent: false
          }
        },

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
      'InfoLoss',
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
    this.lossInfo.dateOfLoss = this.lossInfo.deadlineDate = this.lossInfo.recovDeadline = date.formatDate(
      Date.now(),
      'MM/DD/YYYY'
    );

    //This is For Prefilling Values in Loss Info Form

    this.lossInfo.lossAddressDetails = this.InfoLoss.attributes.lossInfo.address;

    this.lossInfo.lossAddressName = this.InfoLoss.attributes.lossInfo.lossAddressName;
    this.lossInfo.causeOfLoss = this.InfoLoss.attributes.lossInfo.cause;

    this.lossInfo.property = this.InfoLoss.attributes.lossInfo.propertyType;

    this.lossInfo.reasonClaim = this.InfoLoss.attributes.lossInfo.claimReason;
    this.lossInfo.deadlineDate = this.InfoLoss.attributes.lossInfo.deadlineDate;
    this.lossInfo.recovDDDate = this.InfoLoss.attributes.lossInfo.recovDDDate;
    this.lossInfo.severityOfClaimType = this.InfoLoss.attributes.lossInfo.serverity;
    this.lossInfo.propertyDescription = this.InfoLoss.attributes.propertyDesc;
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

          lossInfo: {
            address: {
              ...this.lossInfo.lossAddressDetails
            },

            propertyType: {
              ...this.lossInfo.property
            },
            propertyDesc: this.lossInfo.propertyDescription,
            claimReason: {
              ...this.lossInfo.reasonClaim
            },
            date: dateToSend(this.lossInfo.dateOfLoss),
            cause: this.lossInfo.causeOfLoss.value
              ? this.lossInfo.causeOfLoss
              : null,
            deadlineDate: dateToSend(this.lossInfo.deadlineDate),
            recovDDDate: dateToSend(this.lossInfo.recovDeadline),

            desc: this.lossInfo.descriptionDwelling,

            serverity: {
              ...this.lossInfo.severityOfClaimType
            }
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
}
.form-height {
  height: calc(100vh - 150px);
  overflow: auto;
  margin: 10px;
}
</style>
