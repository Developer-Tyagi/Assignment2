<template>
  <q-page>
    <div class="listing-height">
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

      <div class="clients-list ">
        <!-- This is for showing the Loss Info details   -->

        <div class="clients-list">
          <div class="row">
            <div class="row ">
              <div class="col-10"></div>
              <q-icon
                size="sm"
                name="create"
                color="primary"
                class=" col q-pa-sm absolute-right "
                @click="onEditIconClick"
              ></q-icon>
            </div>
          </div>

          <div class="client-list-item">
            <div class="form-heading ">Loss Info</div>
            <div class="form-heading">Address :</div>

            <div v-if="lossInfo.attributes.lossInfo.property.streetAddress">
              {{
                lossInfo.attributes.lossInfo.property.streetAddress
                  ? lossInfo.attributes.lossInfo.property.streetAddress
                  : '-'
              }}
            </div>
            <div v-else>-</div>

            <div v-if="lossInfo.attributes.lossInfo.property.addressLocality">
              {{
                lossInfo.attributes.lossInfo.property.addressLocality
                  ? lossInfo.attributes.lossInfo.property.addressLocality
                  : '-'
              }},
              {{
                lossInfo.attributes.lossInfo.property.houseNumber
                  ? lossInfo.attributes.lossInfo.property.houseNumber
                  : '-'
              }}
            </div>
            <div v-else>-</div>
            <div v-if="lossInfo.attributes.lossInfo.property.addressRegion">
              {{ lossInfo.attributes.lossInfo.property.addressRegion }},
              {{ lossInfo.attributes.lossInfo.property.addressCountry }}
            </div>
            <div v-else>-</div>

            <div class="form-heading  ">Property Type :</div>

            <div
              v-if="
                lossInfo.attributes.lossInfo.property &&
                  lossInfo.attributes.lossInfo.property.propertyType
              "
            >
              {{ lossInfo.attributes.lossInfo.property.propertyType.value }}
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
              {{
                lossInfo.attributes.lossInfo.dateOfLoss | moment('MM/DD/YYYY')
              }}
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
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import moment from 'moment';
import LossInfo from 'components/LossInfo';
import { validateDate, successMessage } from '@utils/validation';
import { date } from 'quasar';
import { dateToSend, dateToShow } from '@utils/date';
import CustomBar from 'components/CustomBar';
import { constants } from 'src/utils/constant';

export default {
  name: 'UpdateLossInfo',
  components: {
    CustomBar,

    LossInfo
  },
  data() {
    return {
      lossDetails: {
        addressID: '',
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
    this.lossDetails.deadlineDate = this.lossDetails.dateOfLoss = this.lossDetails.recovDeadline = date.formatDate(
      Date.now(),
      'MM/DD/YYYY'
    );
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
    successMessage,
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
            addressID: this.lossDetails.addressID,
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
        this.successMessage(constants.successMessages.LOSSINFO_UPDATED);
        this.getLossInfo(this.selectedClaimId);
        this.$router.push('/loss-info');
      }
    },
    onEditIconClick() {
      this.lossInfoDialog = true;
      //This is For Prefilling Values in Loss Info Form

      this.lossDetails.lossAddressName = this.lossInfo.attributes.lossInfo.lossAddressName;
      this.lossDetails.addressID = this.lossInfo.attributes.lossInfo.addressID;
      this.lossDetails.property = this.lossInfo.attributes.lossInfo.propertyType;
      this.lossDetails.severityOfClaimType = this.lossInfo.attributes.lossInfo.serverity;
      this.lossDetails.reasonClaim = this.lossInfo.attributes.lossInfo.claimReason;

      this.lossDetails.deadlineDate = dateToShow(
        this.lossInfo.attributes.lossInfo.deadlineDate
      );
      this.lossDetails.recovDDDate = this.lossInfo.attributes.lossInfo.recovDDDate;

      this.lossDetails.isTheHomeHabitable = this.lossInfo.attributes.lossInfo.isHabitable;
      this.lossDetails.femaClaimToggle = this.lossInfo.attributes.lossInfo.isFEMA;
      this.lossDetails.isStateOfEmergencyToggle = this.lossInfo.attributes.lossInfo.isEmergency;
      this.lossDetails.causeOfLoss = this.lossInfo.attributes.lossInfo.cause
        .value
        ? this.lossInfo.attributes.lossInfo.cause
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
</style>
