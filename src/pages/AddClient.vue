<template>
  <q-page>
    <div class="mobile-container-page-without-search">
      <div class="column full-height">
        <div
          v-for="dialogBox in dialogBoxes"
          :key="dialogBox.name"
          @click="createClientDailogBoxOpen(dialogBox.name)"
          class="form-list row"
        >
          {{ dialogBox.name }}
          <div class="q-mr-lg q-ml-auto" v-if="dialogBox.validForm == true">
            <q-icon size="xs" color="primary" name="done" />
          </div>
        </div>

        <q-btn
          style="width: 90%"
          label="Create Client"
          color="primary"
          class="q-mt-auto text-capitalize q-mx-auto"
          :disabled="isCreateClientButtonDisabled"
          @click="createClientButtonClick"
          size="'xl'"
        ></q-btn>
      </div>
    </div>

    <!-- Client Info -->
    <q-dialog
      v-model="clientInfoDailog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          :dialogName="'Client Info'"
          @closeDialog="onCloseDialogBox('clientInfoDailog', 0)"
        />
        <div class="mobile-container-page-without-search">
          <q-form ref="clientForm" class="form-height">
            <q-select
              dense
              class="required"
              v-model="client.id"
              option-value="id"
              option-label="name"
              map-options
              emit-value
              options-dense
              :options="clientTypes"
              @input="setTypes(clientTypes, client)"
              label="Client Type"
              :rules="[
                val =>
                  (val && val.length > 0) || 'Please select the client type'
              ]"
            />

            <div class="row">
              <p class="q-mx-none q-my-auto">
                Is Policy Holder An Organization ?
              </p>
              <q-toggle
                v-model="primaryDetails.isOrganization"
                left-label
                class="q-ml-auto"
              />
            </div>

            <div v-if="primaryDetails.isOrganization">
              <q-input
                dense
                v-model="primaryDetails.organizationName"
                label="Organization Name"
                class="required"
                lazy-rules
                :rules="[
                  val =>
                    (val && val.length > 0) ||
                    'Please fill the organization name '
                ]"
              />
            </div>
            <div class="row">
              <p class="q-mx-none q-my-auto">Organization Is Policyholder?</p>
              <q-toggle
                v-model="policyHolder.isPolicyHolder"
                left-label
                class="q-ml-auto"
              />
            </div>
            <br />

            <span class="form-heading">Insured Details</span>
            <q-select
              dense
              v-model="honorific1.id"
              class="required"
              :options="titles"
              option-value="id"
              option-label="value"
              map-options
              options-dense
              behavior="menu"
              @input="setTitleName(1)"
              emit-value
              label="Title"
              lazy-rules
              options-dense
              :rules="[
                val => (val && val.length > 0) || 'Please select the Title'
              ]"
            />

            <q-input
              dense
              class="required"
              v-model="insuredDetails.fname"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please fill the First name'
              ]"
              label="First Name"
            />

            <q-input
              dense
              v-model="insuredDetails.lname"
              class="required"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please fill the Last name'
              ]"
              label="Last Name"
            />
            <div class="row justify-between">
              <q-select
                dense
                v-model="insuredDetails.type"
                class="required col-5"
                :options="contactTypes"
                option-value="machineValue"
                option-label="name"
                map-options
                emit-value
                options-dense
                label="Type"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please select phone type'
                ]"
              />
              <q-input
                dense
                v-model.number="insuredDetails.phone"
                class="required col-6"
                label="Phone"
                mask="(###) ###-####"
                lazy-rules
                :rules="[
                  val =>
                    (val && val.length == 14) || 'Please enter the phone number'
                ]"
              />
            </div>
            <q-input
              dense
              v-model="insuredDetails.email"
              class="required"
              label="Email"
              lazy-rules
              :rules="[
                val =>
                  validateEmail(val) ||
                  'You have entered an invalid email address!'
              ]"
            />
            <div class="row">
              <p class="q-mx-none q-my-auto">Is there a Co-insured?</p>
              <q-toggle class="q-ml-auto" v-model="isThereaCoInsuredToggle" />
            </div>
            <br />
            <div v-if="isThereaCoInsuredToggle" style="font-size: 20px">
              <span class="form-heading">Co-insured Details</span>

              <q-select
                dense
                v-model="honorific2.id"
                class="required"
                :options="titles"
                option-value="id"
                option-label="value"
                map-options
                @input="setTitleName(2)"
                emit-value
                options-dense
                behavior="menu"
                label="Title"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please select the Title'
                ]"
              />
              <q-input
                dense
                v-model="coInsuredDetails.fname"
                label="First Name"
              />
              <q-input
                dense
                v-model="coInsuredDetails.lname"
                label="Last Name"
              />
              <div class="row justify-between">
                <q-select
                  dense
                  v-model="coInsuredDetails.type"
                  class="required col-5"
                  :options="contactTypes"
                  option-value="machineValue"
                  option-label="name"
                  map-options
                  emit-value
                  options-dense
                  label="Type"
                  options-dense
                  lazy-rules
                  :rules="[
                    val => (val && val.length > 0) || 'Please select phone type'
                  ]"
                />
                <q-input
                  dense
                  v-model.number="coInsuredDetails.phone"
                  label="Phone"
                  class="required col-6"
                  mask="(###) ###-####"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length == 14) ||
                      'Please enter the phone number'
                  ]"
                />
              </div>
              <q-input
                dense
                v-model="coInsuredDetails.email"
                input
                type="email"
                class="required"
                lazy-rules
                :rules="[
                  val =>
                    validateEmail(val) ||
                    'You have entered an invalid email address!'
                ]"
                label="Email"
              />
            </div>
            <div class="row">
              <p class="q-mx-none q-my-auto">Add aditional phone number(s)</p>
              <q-toggle
                class="q-ml-auto"
                v-model="addAditionalPhoneNumberToggle"
                @input="onaddAditionalPhoneNumberToggle"
              />
            </div>
            <div v-if="addAditionalPhoneNumberToggle">
              <div
                class="row justify-between"
                v-for="(addPhone, index) in phoneNumber"
                v-if="index >= 0"
              >
                <q-select
                  v-model="phoneNumber[index].type"
                  class="required col-5"
                  label="Type"
                  :options="contactTypes"
                  option-value="machineValue"
                  option-label="name"
                  map-options
                  options-dense
                  emit-value
                  lazy-rules
                  :rules="[
                    val => (val && val.length > 0) || 'Please select phone type'
                  ]"
                />
                <q-input
                  dense
                  v-model.number="phoneNumber[index].number"
                  label="Phone"
                  class="required col-6"
                  mask="(###) ###-####"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length == 14) ||
                      'Please enter the phone number'
                  ]"
                />
              </div>
              <div class="row">
                <q-btn
                  outline
                  class="q-mt-sm"
                  @click="addAnotherContact"
                  color="primary"
                  label="Add"
                  style="margin-right: auto"
                />

                <q-btn
                  v-if="phoneNumber.length > 1"
                  outline
                  @click="RemoveAnotherContact"
                  class="q-mt-sm"
                  color="primary"
                  label="Remove"
                />
              </div>
            </div>
            <br />
            <span class="form-heading">Address Details</span>

            <AutoCompleteAddress
              :address="clientAddressDetails"
              :isDropBoxEnable="true"
              :isChecksEnable="true"
              :isAsteriskMark="true"
            />

            <div class="row">
              <p class="q-mx-none q-my-auto">Tenent Occupied</p>
              <q-toggle class="q-ml-auto" v-model="tenantOccupiedToggle" />
            </div>
            <div v-if="tenantOccupiedToggle">
              <q-input
                dense
                v-model="tenantOccupied.name"
                label="Tenant Name"
              />

              <div class="row justify-between">
                <q-select
                  dense
                  class="required col-5"
                  v-model="tenantOccupied.type"
                  label="Type"
                  :options="contactTypes"
                  option-value="machineValue"
                  option-label="name"
                  map-options
                  options-dense
                  emit-value
                  lazy-rules
                  :rules="[
                    val => (val && val.length > 0) || 'Please select phone type'
                  ]"
                />
                <q-input
                  dense
                  class="required col-6"
                  v-model.number="tenantOccupied.phone"
                  label="Phone"
                  mask="(###) ###-####"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length == 14) ||
                      'Please enter the phone number'
                  ]"
                />
              </div>
            </div>
          </q-form>
          <q-btn
            @click="onSubmit('clientInfoDailog')"
            label="Save"
            color="primary"
            class="button-width-90"
            size="'xl'"
          />
        </div>
      </q-card>
    </q-dialog>
    <!-- Mailing Address -->
    <q-dialog
      v-model="mailingAddressDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="onCloseDialogBox('mailingAddressDialog', 1)"
          :dialogName="'Mailing Address'"
        />
        <div class="mobile-container-page-without-search">
          <q-form ref="mailingAddressForm" class="form-height">
            <div class="row">
              <span class="form-heading"> Is the mailing address same? </span>
              <q-toggle
                class="q-ml-auto"
                v-model="isMailingAddressSameToggle"
                @input="mailingAddressSame"
              />
            </div>
            <AutoCompleteAddress
              :address="mailingAddressDetails"
              :isDropBoxEnable="true"
              :isChecksEnable="true"
              :isFieldsDisable="isMailingAddressSameToggle"
              :isAsteriskMark="true"
            />
          </q-form>
          <q-btn
            label="Save"
            color="primary"
            class="button-width-90"
            @click="onSubmit('mailingAddressDialog')"
            size="'xl'"
          />
        </div>
      </q-card>
    </q-dialog>
    <!-- Insurance Info -->
    <q-dialog
      v-model="insuranceInfoDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="onCloseDialogBox('insuranceInfoDialog', 2)"
          :dialogName="'Insurance Info'"
        />
        <div class="mobile-container-page-without-search">
          <q-form ref="insuranceInfoForm" class="form-height">
            <InsuranceInfo :insuranceDetails="insuranceDetails" />
          </q-form>

          <q-btn
            label="Save"
            color="primary"
            class="button-width-90"
            @click="onSubmit('insuranceInfoDialog')"
            size="'xl'"
          />
        </div>
      </q-card>
    </q-dialog>

    <!-- Loss Info -->
    <q-dialog
      v-model="lossInfoDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="onCloseDialogBox('lossInfoDialog', 3)"
          :dialogName="'Loss Info'"
        />
        <div class="mobile-container-page-without-search">
          <q-form ref="lossInfoForm" class="form-height">
            <LossInfo
              :lossInfo="lossInfo"
              @lossAddressSame="lossAddressSame"
              :isMailingAddressEnable="true"
              :lossAddressSameAsClient="true"
              :isAddressRequired="true"
            />
          </q-form>

          <q-btn
            label="Save"
            color="primary"
            class="button-width-90"
            @click="onSubmit('lossInfoDialog')"
            size="'xl'"
          />
        </div>
      </q-card>
    </q-dialog>

    <!-- Expert /Vendor Info -->
    <q-dialog
      v-model="expertVendorInfoDialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="onCloseDialogBox('expertVendorInfoDialog', 4)"
          :dialogName="'Expert / Vendor Info'"
        />
        <div class="mobile-container-page-without-search">
          <q-form ref="expertVendorInfoForm" class="form-height">
            <ExpertVendorInfo
              :expertVendorInfo="expertVendorInfo"
              @addAnotherVendor="addAnotherVendor"
            />
          </q-form>

          <q-btn
            label="Save"
            color="primary"
            class="button-width-90"
            @click="onSubmit('expertVendorInfoDialog')"
            size="'xl'"
          />
        </div>
      </q-card>
    </q-dialog>
    <!-- Estimating Info -->
    <q-dialog
      v-model="estimatingInfoDialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="estimatingInfoDialog = false"
          :dialogName="'Estimating Info'"
        />
        <div class="mobile-container-page-without-search">
          <q-form ref="estimatingInfoForm" class="form-height">
            <EstimatingInfo :estimatingInfo="estimatingInfo" />
          </q-form>
          <q-btn
            label="Save"
            color="primary"
            class="button-width-90"
            @click="onSubmit('estimatingInfoDialog')"
            size="'xl'"
          />
        </div>
      </q-card>
    </q-dialog>
    <!-- Contract Info Dialog -->
    <q-dialog
      v-model="contractInfoDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="onCloseDialogBox('contractInfoDialog', 5)"
          :dialogName="'Contract Details'"
        />
        <div class="mobile-container-page-without-search">
          <q-form ref="contractInfoForm" class="form-height">
            <ContractInfo :contractInfo="contractInfo" />
          </q-form>
          <q-btn
            label="Save"
            color="primary"
            class="button-width-90"
            @click="onSubmit('contractInfoDialog')"
            size="'xl'"
          ></q-btn>
        </div>
      </q-card>
    </q-dialog>
    <!-- Public Adjuster Info -->
    <q-dialog
      v-model="publicAdjustorInfoDialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          :dialogName="'Public Adjustor Info'"
          @closeDialog="onCloseDialogBox('publicAdjustorInfoDialog', 6)"
        />
        <div class="mobile-container-page-without-search">
          <q-form ref="publicAdjustorForm" class="form-height">
            <PublicAdjustorInfo :publicAdjustorInfo="publicAdjustorInfo" />
          </q-form>
          <q-btn
            label="Save"
            color="primary"
            class="button-width-90"
            @click="onSubmit('publicAdjustorInfoDialog')"
            size="'xl'"
          />
        </div>
      </q-card>
    </q-dialog>
    <!-- Office Task -->
    <q-dialog
      v-model="officeTaskDialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="officeTaskDialog = false"
          :dialogName="'Office Task'"
        />
        <div class="mobile-container-page-without-search">
          <q-form ref="estimatingInfoForm" class="form-height">
            <q-select
              dense
              v-model="officeTask.officeActionTypes"
              :options="officeActionRequiredTypes"
              label="Office Action Required"
              class="input-extra-padding"
            />
            <q-select
              dense
              v-model="officeTask.officeTaskTypes"
              :options="officeTaskRequiredTypes"
              label="Office Task Required"
              class="input-extra-padding"
            /><br />
            <div class="row">
              <p>Additional Office Task Required</p>
              <q-toggle
                class="q-ml-auto"
                v-model="additionalOfficeTaskRequiredToggle"
              />
            </div>
          </q-form>

          <q-btn
            label="Save"
            color="primary"
            class="full-width q-mt-auto text-capitalize"
            @click="officeTaskDialog = false"
            size="'xl'"
          />
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import CustomBar from 'components/CustomBar';
import AutoCompleteAddress from 'components/AutoCompleteAddress';
import ContractInfo from 'components/ContractInfo';
import PublicAdjustorInfo from 'components/PublicAdjustorInfo';
import EstimatingInfo from 'components/EstimatingInfo';
import LossInfo from 'components/LossInfo';
import ExpertVendorInfo from 'components/ExpertVendorInfo';
import InsuranceInfo from 'components/InsuranceInfo';
import AddressService from '@utils/country';
import { validateEmail, validateDate, validateTime } from '@utils/validation';
import { constants } from '@utils/constant';
import { dateToSend } from '@utils/date';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import VendorsList from 'components/VendorsList';
import AddVendor from 'components/AddVendor';
import { date } from 'quasar';

const addressService = new AddressService();

export default {
  name: 'addClient',
  components: {
    CustomBar,
    VendorsList,
    AddVendor,
    AutoCompleteAddress,
    InsuranceInfo,
    LossInfo,
    ExpertVendorInfo,
    EstimatingInfo,
    ContractInfo,
    PublicAdjustorInfo
  },

  data() {
    return {
      industryTypeValue: '',

      contractInfo: {
        vendorsListDialog: false,
        vendorDialogFilterByIndustry: '',
        showVendorDialogFilters: false,
        addVendorDialog: false,
        reasonForCancellation: '',
        vendorDialogName: '',
        reasonForCancellation: [],
        sourceDetails: {
          id: '',
          type: '',
          details: ''
        },
        contractDate: '',
        firstContractDate: '',
        claimFeeRate: '',
        time: '',
        cancelledToggle: false,

        reasonForCancellationText: '',

        buttonGroup: 'dollar'
      },

      publicAdjustorInfo: {
        isFieldDisable1: true,
        isFieldDisable2: true,
        isFieldDisable3: true,
        isFieldDisable4: true,

        personnel: [
          {
            id: '',
            role: ''
          },
          {
            id: '',
            role: ''
          },
          {
            id: '',
            role: ''
          },
          {
            id: '',
            role: ''
          }
        ],

        personParty1: '',
        personParty2: '',
        personParty3: '',
        personParty4: '',
        notes: '',

        filterRole: []
      },

      isCreateClientButtonDisabled: true,

      industryType: {
        value: '',
        machineValue: ''
      },
      dialogBoxes: [
        { name: 'Client Info', validForm: false },
        { name: 'Mailing Address', validForm: false },
        { name: 'Insurance Info', validForm: false },
        { name: 'Loss Info', validForm: false },
        { name: 'Expert/Vendor Info', validForm: false },
        { name: 'Estimating Info', validForm: false },
        { name: 'Contract Info', validForm: false },
        { name: 'Public Adjustor Info', validForm: false },
        { name: 'Office Task', validForm: false }
      ],

      vendorIndustriesOptions: [],
      lossAddressNameOptions: ['Others'],

      constants: constants,

      publicAdjustorInfoDialog: false,
      contractInfoDialog: false,

      officeTaskDialog: false,
      expertVendorInfoDialog: false,
      estimatingInfoDialog: false,
      lossInfoDialog: false,

      maximizedToggle: true,
      clientInfoDailog: false,
      policyHolder: {
        isPolicyHolder: false,
        policyHolderName: ''
      },
      primaryDetails: {
        isOrganization: false,
        organizationName: ''
      },
      honorific1: {
        id: '',
        value: '',
        machineValue: ''
      },
      honorific2: {
        id: '',
        value: '',
        machineValue: ''
      },

      client: {
        id: '',
        value: '',
        machineValue: ''
      },
      insuredDetails: {
        fname: '',
        lname: '',
        phone: '',
        type: '',
        email: ''
      },
      coInsuredDetails: {
        fname: '',
        lname: '',
        phone: '',
        type: '',
        machineValue: '',
        email: ''
      },
      phoneNumber: [
        {
          type: '',
          number: ''
        }
      ],
      addAditionalPhoneNumber: {
        phone2: '',
        phone3: '',
        phone: '',
        type1: '',
        type2: ''
      },
      clientAddressDetails: {
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

      tenantOccupied: {
        name: '',
        phone: '',
        type: ''
      },
      mailingAddressDetails: {
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

      lossInfo: {
        isPAFillingOutToggle: false,
        isAdjustorFillOutLaterDate: false,
        isMortgageHomeToggle: false,
        vendorsListDialog: false,
        vendorDialogFilterByIndustry: '',
        showVendorDialogFilters: false,
        addVendorDialog: false,
        vendorDialogName: '',
        valueName: '',
        mortgageInfoDialog: false,
        mortgageDetails: [
          {
            id: '',
            value: '',
            loanNumber: '',
            accountNumber: '',
            isPrimary: true,
            notes: ''
          }
        ],
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
        isLossAddressSameAsClientToggle: false,
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
        policyCategory: {
          id: '',
          value: ''
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
      },

      estimatingInfo: {
        addEstimatorDialog: false,
        addEstimatorValue: { name: '' },
        honorific3: {
          id: '',
          value: '',
          machineValue: ''
        },
        name: '',
        fname: '',
        lname: '',
        email: '',
        phone: '',
        type: '',
        estimatorsListDialog: false,

        estimatorToBeAssigned: '',
        scopeTimeNeeded: '',
        notesToTheEstimator: '',
        doesAnEstimatorNeedToBeAssignedToggle: false
      },

      expertVendorInfo: {
        expertVendorButton: true,
        carrierName: '',
        carrierId: '',
        vendorIndustriesOptions: [],
        anyOtherExpertHiredToggle: false,
        vendorExpertHiredToggle: false,
        notes: '',
        internalNotes: '',

        vendors: [{ id: '', value: null }],
        id: '',
        industry: [{ value: null, id: '', machineValue: '' }]
      },
      officeTask: {
        officeActionTypes: '',
        officeTaskTypes: ''
      },

      addAditionalPhoneNumberToggle: false,
      tenantOccupiedToggle: false,

      mailingAddressDialog: false,
      isMailingAddressSameToggle: false,
      isThereaCoInsuredToggle: false,

      states: [],
      countries: [],
      insuranceInfoDialog: false,

      DidYouHavePoliceDeclarationToggle: false,

      typeOfLoss: [],

      additionalOfficeTaskRequiredToggle: false,
      officeActionRequiredTypes: [],
      officeTaskRequiredTypes: []
    };
  },

  created() {
    this.contractInfo.time = date.formatDate(Date.now(), 'HH:mm:ss:aa');
    this.contractInfo.firstContractDate = this.contractInfo.contractDate = this.insuranceDetails.policyEffectiveDate = this.insuranceDetails.policyExpireDate = this.lossInfo.dateOfLoss = this.lossInfo.deadlineDate = this.lossInfo.recovDeadline = date.formatDate(
      Date.now(),
      'MM/DD/YYYY'
    );
    this.getVendors(this.$route.params.id);
    this.getClientTypes();

    this.getPropertyTypes();
    this.getPolicyTypes();
    this.getLossCauses();
    this.getSeverityClaim();
    this.getClaimReasons();
    this.getContactTypes();
    this.getPolicyCategory();
    if (this.selectedLead.id) {
      this.insuredDetails.fname = this.selectedLead.primaryContact.fname;
      this.insuredDetails.lname = this.selectedLead.primaryContact.lname;
      this.insuredDetails.email = this.selectedLead.primaryContact.email;
      this.insuredDetails.phone = this.selectedLead.primaryContact.phoneNumber[0].number;
      this.insuredDetails.type = this.selectedLead.primaryContact.phoneNumber[0].type;
      this.contractInfo.sourceDetails.id = this.selectedLead.leadSource.id;
      this.contractInfo.sourceDetails.type = this.selectedLead.leadSource.type;
      this.honorific1.id = this.selectedLead.primaryContact.honorific.id;
      this.honorific1.value = this.selectedLead.primaryContact.honorific.value;
      this.honorific1.machineValue = this.selectedLead.primaryContact.honorific.machineValue;

      this.lossInfo.lossAddressDetails.houseNumber = this.selectedLead.lossLocation.houseNumber;
      this.lossInfo.lossAddressDetails.addressCountry = this.selectedLead.lossLocation.addressCountry;
      this.lossInfo.lossAddressDetails.addressLocality = this.selectedLead.lossLocation.addressLocality;
      this.lossInfo.lossAddressDetails.addressRegion = this.selectedLead.lossLocation.addressRegion;
      this.lossInfo.lossAddressDetails.postalCode = this.selectedLead.lossLocation.postalCode;
      this.lossInfo.lossAddressDetails.streetAddress = this.selectedLead.lossLocation.streetAddress;

      this.contractInfo.sourceDetails.details = this.selectedLead.leadSource
        ? this.selectedLead.leadSource.detail
        : null;

      this.insuranceDetails.carrierName = this.selectedLead.carrier
        ? this.selectedLead.carrier.value
        : null;
      this.insuranceDetails.carrierId = this.selectedLead.carrier
        ? this.selectedLead.carrier.id
        : null;
      this.insuranceDetails.policyNumber = this.selectedLead.policyNumber
        ? this.selectedLead.policyNumber
        : null;
      this.lossInfo.causeOfLoss = this.selectedLead.lossCause.value
        ? this.selectedLead.lossCause
        : null;

      this.lossInfo.dateOfLoss = date.formatDate(
        this.selectedLead.dateofLoss,
        'MM/DD/YYYY'
      );
    }

    this.countries = addressService.getCountries();
    this.onCountrySelect('United States');
  },

  computed: {
    ...mapGetters([
      'selectedLead',
      'leadSources',
      'estimators',
      'contactTypes',
      'clientTypes',
      'propertyTypes',
      'policyTypes',
      'claimSeverity',
      'lossCauses',
      'claimReasons',
      'titles',
      'vendors',
      'policyCategories',
      'vendorIndustries',
      'personnelRoles'
    ])
  },

  mounted() {
    this.getTitles();
    this.getVendorIndustries();
  },
  methods: {
    ...mapActions([
      'addClient',
      'getVendors',
      'getEstimators',
      'addClaim',
      'addEstimator',
      'getClientTypes',
      'getPropertyTypes',
      'getPolicyTypes',
      'getSeverityClaim',
      'getLossCauses',
      'getClaimReasons',
      'getContactTypes',
      'getTitles',
      'getPolicyCategory',
      'getVendorIndustries',
      'addIndustry'
    ]),
    ...mapMutations(['setSelectedLead']),

    // For adding multiple Contact Numbers in ClientInfo
    addAnotherContact() {
      let len = this.phoneNumber.length;
      if (this.phoneNumber[len - 1].number) {
        this.phoneNumber.push({
          type: '',
          number: ''
        });
      } else {
        this.$q.notify({
          message: 'Please fill the above contact first',
          position: 'top',
          type: 'negative'
        });
      }
    },
    async addAnotherVendor() {
      const success = await this.$refs.expertVendorInfoForm.validate();
      if (success) {
        this.expertVendorInfo.industry.push({
          id: this.expertVendorInfo.industry.id,
          value: this.expertVendorInfo.industry.value
        });
        let len = this.expertVendorInfo.vendors.length;
        this.expertVendorInfo.vendors.push({
          id: this.expertVendorInfo.vendors[len - 1].id,
          value: this.expertVendorInfo.vendors[len - 1].value
        });
        this.expertVendorInfo.vendors[len].value = 'Select Vendor';
      }
    },
    RemoveAnotherContact() {
      this.phoneNumber.pop();
    },

    onaddAditionalPhoneNumberToggle() {
      if (this.addAditionalPhoneNumberToggle == false) {
        this.phoneNumber = [
          {
            type: '',
            number: ''
          }
        ];
      }
    },

    lossAddressSame() {
      if (this.lossInfo.isLossAddressSameAsClientToggle) {
        this.lossInfo.lossAddressDetails = this.clientAddressDetails;
      } else {
        if (this.selectedLead.id) {
          this.lossInfo.lossAddressDetails = {
            houseNumber: this.selectedLead.lossLocation.houseNumber,
            addressCountry: this.selectedLead.lossLocation.addressCountry,
            addressRegion: this.selectedLead.lossLocation.addressRegion,
            addressLocality: this.selectedLead.lossLocation.addressLocality,
            postalCode: this.selectedLead.lossLocation.postalCode,
            streetAddress: this.selectedLead.lossLocation.streetAddress,
            postOfficeBoxNumber: '',
            dropBox: {
              info: '',
              isPresent: false
            }
          };
        }
      }
    },

    createClientDailogBoxOpen(value) {
      switch (value) {
        case 'Client Info':
          this.clientInfoDailog = true;
          break;
        case 'Mailing Address':
          this.mailingAddressDialog = true;
          break;
        case 'Insurance Info':
          this.insuranceInfoDialog = true;
          break;
        case 'Loss Info':
          this.lossInfoDialog = true;
          break;
        case 'Expert/Vendor Info':
          this.expertVendorInfoDialog = true;
          break;
        case 'Estimating Info':
          this.estimatingInfoDialog = true;
          break;
        case 'Office Task':
          this.officeTaskDialog = true;
          break;
        case 'Public Adjustor Info':
          this.publicAdjustorInfoDialog = true;
          break;
        case 'Documents':
          this.documentsDialog = true;
          break;
        case 'Contract Info':
          this.contractInfoDialog = true;
      }
    },
    validateDate,
    validateTime,

    onCountrySelect(country) {
      this.states = addressService.getStates(country);
    },
    onCloseDialogBox(DialogName, value) {
      if (this.dialogBoxes[value].validForm == true) {
        this.onSubmit(DialogName);
      } else {
        this[DialogName] = false;
      }
    },

    async onSubmit(name) {
      let success = false;
      let validationIndex;
      switch (name) {
        case 'clientInfoDailog':
          success = await this.$refs.clientForm.validate();
          validationIndex = 0;

          break;
        case 'insuranceInfoDialog':
          success = await this.$refs.insuranceInfoForm.validate();
          validationIndex = 2;

          break;

        case 'mailingAddressDialog':
          success = await this.$refs.mailingAddressForm.validate();
          validationIndex = 1;

          break;

        case 'addEstimatorDialog':
          success = await this.$refs.addEstimatorForm.validate();
          validationIndex = 5;
          break;
        case 'lossInfoDialog':
          success = await this.$refs.lossInfoForm.validate();
          validationIndex = 3;

          break;

        case 'expertVendorInfoDialog':
          success = await this.$refs.expertVendorInfoForm.validate();
          validationIndex = 4;

          break;
        case 'estimatingInfoDialog':
          success = await this.$refs.estimatingInfoForm.validate();
          validationIndex = 5;
          break;

        case 'contractInfoDialog':
          success = await this.$refs.contractInfoForm.validate();
          validationIndex = 6;
          break;
        case 'publicAdjustorInfoDialog':
          success = await this.$refs.publicAdjustorForm.validate();
          validationIndex = 7;
      }
      if (success == true) {
        this.dialogBoxes[validationIndex].validForm = true;

        for (var i = 0; i < this.dialogBoxes.length - 1; i++) {
          if (this.dialogBoxes[i].validForm == false) {
            this.isCreateClientButtonDisabled = true;
            break;
          } else {
            this.isCreateClientButtonDisabled = false;
          }
        }

        if (
          name === 'insuranceInfoDialog' ||
          name === 'expertVendorInfoDialog'
        ) {
          this[name] = false;
        }
        if (name === 'addEstimatorDialog') {
          this.onAddEstimatorButtonClick();
          this[name] = false;
        } else {
          this[name] = false;
        }
      } else {
        this.dialogBoxes.validForm = false;
      }
    },
    setTitleName(val) {
      const titleResult = this.titles.find(obj => {
        return obj.id === this['honorific' + val].id;
      });
      this['honorific' + val].title = titleResult.value;
      this['honorific' + val].machineValue = titleResult.machineValue;
    },

    setTypes(types, data, type) {
      const obj = types.find(item => {
        return item.id === data.id;
      });

      data.machineValue = obj.machineValue;
      data.value = obj.name;
    },

    mailingAddressSame() {
      if (this.isMailingAddressSameToggle) {
        this.mailingAddressDetails = this.clientAddressDetails;
      } else {
        this.mailingAddressDetails = {
          addressCountry: '',
          addressRegion: '',
          addressLocality: '',
          postalCode: '',
          streetAddress: '',
          postOfficeBoxNumber: '',
          dropBox: {
            info: '',
            isPresent: false
          }
        };
      }
    },

    async createClientButtonClick() {
      const payload = {
        isOrganization: this.primaryDetails.isOrganization,
        organizationName: this.primaryDetails.organizationName,
        isOrganizationPolicyholder: this.policyHolder.isPolicyHolder,
        source: {
          id: this.contractInfo.sourceDetails.id,
          type: this.contractInfo.sourceDetails.type,
          detail: this.contractInfo.sourceDetails.details
        },
        type: {
          ...this.client
        },
        insuredInfo: {
          primary: {
            honorific: {
              id: this.honorific1.id,
              value: this.honorific1.title,
              machineValue: this.honorific1.machineValue
            },
            fname: this.insuredDetails.fname,
            lname: this.insuredDetails.lname,
            email: this.insuredDetails.email,
            phoneNumber: [
              {
                type: this.insuredDetails.type,
                number: this.insuredDetails.phone
              }
            ]
          },
          secondary: {
            honorific: {
              id: this.honorific2.id,
              value: this.honorific2.title,
              machineValue: this.honorific2.machineValue
            },
            fname: this.coInsuredDetails.fname,
            lname: this.coInsuredDetails.lname,
            email: this.coInsuredDetails.email,
            phoneNumber: [
              {
                type: this.coInsuredDetails.type,
                number: this.coInsuredDetails.phone
              }
            ]
          },
          address: {
            ...this.clientAddressDetails
          },
          mailingAddress: {
            ...this.mailingAddressDetails
          },
          phoneNumbers: this.phoneNumber,
          tenantInfo: {
            name: '',
            phoneNumber: {
              type: '',
              number: ''
            }
          }
        }
      };

      if (this.tenantOccupiedToggle) {
        payload.insuredInfo.tenantInfo.name = this.tenantOccupied.name;
        payload.insuredInfo.tenantInfo.phoneNumber.type = this.tenantOccupied.type;
        payload.insuredInfo.tenantInfo.phoneNumber.number = this.tenantOccupied.phone;
      } else {
        delete payload.insuredInfo.tenantInfo;
      }
      if (!this.isThereaCoInsuredToggle) {
        delete payload.insuredInfo.secondary;
      }
      if (this.contractInfo.sourceDetails.type == constants.industries.VENDOR) {
        payload.source.id = this.contractInfo.sourceDetails.id;
      } else {
        payload.source.detail = this.contractInfo.sourceDetails.details;
      }

      const response = await this.addClient(payload);

      if (response && response.id) {
        this.setPayloadForClaim(response.id);
      }
    },

    async setPayloadForClaim(id) {
      const payload = {
        client: {
          id: id,
          fname: this.insuredDetails.fname,
          lname: this.insuredDetails.lname
        },
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
          effectiveDate: dateToSend(this.insuranceDetails.policyEffectiveDate),
          expirationDate: dateToSend(this.insuranceDetails.policyExpireDate),
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
        },
        mortgageInfo: this.lossInfo.mortgageDetails,
        lossInfo: {
          isNewAddress:
            this.lossInfo.lossAddressNameDropdown == 'Others' ? true : false,
          address: {
            ...this.clientAddressDetails
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
          isFEMA: this.lossInfo.femaClaimToggle,
          isEmergency: this.lossInfo.isStateOfEmergencyToggle,
          emergencyName: this.lossInfo.nameOfEmergency,
          desc: this.lossInfo.descriptionDwelling,
          isHabitable: this.lossInfo.isTheHomeHabitable,
          serverity: {
            ...this.lossInfo.severityOfClaimType
          },
          OSDamageItems: this.lossInfo.osDamagedItems,
          PPDamageItems: this.lossInfo.ppDamagedItems,
          isPPIF: this.lossInfo.wasAppifProvidedToTheInsuredToggle,
          isNeedPPIF: this.lossInfo
            .doesTheOfficeNeedToProvidePpifToTheInsuredToggle,

          hasHomeMortgage: this.lossInfo.isMortgageHomeToggle,
          isSecondClaim: false
        },
        expertInfo: {
          isVendorAssigned: this.expertVendorInfo.vendorExpertHiredToggle,
          vendor: this.expertVendorInfo.vendors,
          isInsuredHired: this.expertVendorInfo.anyOtherExpertHiredToggle,
          notes: this.expertVendorInfo.notes,
          internalNotes: this.expertVendorInfo.internalNotes
        },
        contractInfo: {
          date: dateToSend(this.contractInfo.contractDate),
          fees: {
            type: this.contractInfo.buttonGroup,
            rate: this.contractInfo.claimFeeRate
              ? this.contractInfo.claimFeeRate
              : 0
          },
          dateOfFirstContact: dateToSend(this.contractInfo.firstContractDate)
        },

        personnel: this.publicAdjustorInfo.personnel
      };

      this.addClaim(payload).then(() => {
        this.setSelectedLead();
        this.$router.push('/clients');
      });
    },

    validateEmail
  }
};
</script>

<style lang="scss">
::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}

.form-list {
  color: #333333;
  font-weight: bold;
  font-size: 16px;
  border-bottom: 1px solid #d3d3d3;
  padding: 10px;
  margin: 5px 0;
}

.vendor-list {
  color: #666666;

  .vendor-list-item {
    padding: 20px;
    border-bottom: 1px solid lightgray;
    text-transform: capitalize;
    display: flex;
  }
}
.form-height {
  height: calc(100vh - 120px);
  overflow: auto;
  margin: 10px;
}
</style>
