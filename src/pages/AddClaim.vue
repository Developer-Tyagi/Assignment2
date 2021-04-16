<template>
  <q-page>
    <div class="mobile-container-page-without-search">
      <div class="column full-height">
        <div
          v-for="dialogBox in dialogBoxes"
          :key="dialogBox.name"
          @click="createClaimDailogBoxOpen(dialogBox.name)"
          class="form-list row"
        >
          {{ dialogBox.name }}
          <div class="q-mr-lg q-ml-auto" v-if="dialogBox.validForm == true">
            <q-icon size="xs" color="primary" name="done" />
          </div>
        </div>

        <q-btn
          style="width: 90%"
          label="Create Claim"
          color="primary"
          class="q-mt-auto text-capitalize q-mx-auto"
          :disabled="isCreateClientButtonDisabled"
          @click="setPayloadForClaim(selectedClientId)"
          size="'xl'"
        ></q-btn>
      </div>
    </div>

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
              :lossAddressToggleShow="false"
              :isMailingAddressEnable="true"
              :lossAddressSameAsClient="true"
              :isAddressRequired="true"
              :mortgageInfo="mortgageObject"
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
    <!-- Company Personnel Dialog-->
    <q-dialog
      v-model="companyPersonnelDialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          :dialogName="'Company Personnel'"
          @closeDialog="onCloseDialogBox('companyPersonnelDialog', 6)"
        />
        <div class="mobile-container-page-without-search">
          <q-form ref="companyPersonnelForm" class="form-height">
            <div class="form-heading text-bold">CLAIM PERSONNEL</div>
            <CompanyPersonnel :companyPersonnel="companyPersonnel" />
          </q-form>
          <q-btn
            label="Save"
            color="primary"
            class="button-width-90"
            @click="onSubmit('companyPersonnelDialog')"
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

import CompanyPersonnel from 'components/CompanyPersonnel';
import EstimatingInfo from 'components/EstimatingInfo';
import LossInfo from 'components/LossInfo';
import ExpertVendorInfo from 'components/ExpertVendorInfo';
import InsuranceInfo from 'components/InsuranceInfo';
import AddressService from '@utils/country';
import {
  validateEmail,
  validateDate,
  validateTime,
  successMessage
} from '@utils/validation';
import { constants } from '@utils/constant';
import { dateToSend } from '@utils/date';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import VendorsList from 'components/VendorsList';
import AddVendor from 'components/AddVendor';
import { date } from 'quasar';

const addressService = new AddressService();

export default {
  name: 'addClaim',
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
    CompanyPersonnel
  },

  data() {
    return {
      mortgageObject: {
        vendorsListDialog: false,
        vendorDialogFilterByIndustry: '',
        showVendorDialogFilters: false,
        addVendorDialog: false,
        vendorDialogName: '',
        valueName: '',
        isSecondMortgageHome: false,
        isMortgageHomeToggle: false,
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
        ]
      },
      isAddMorePhoneDisabled: false,
      addressId: '',
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
      companyPersonnel: {
        notes: '',
        endDate: '',
        startDate: '',
        buttonGroup: 'dollar',
        claimFeeRate: '',
        isFieldDisable: true,
        personnel: {
          id: '',
          role: {
            value: '',
            machineValue: ''
          }
        },
        personParty: '',
        filterRole: []
      },

      isCreateClientButtonDisabled: true,

      industryType: {
        value: '',
        machineValue: ''
      },
      dialogBoxes: [
        { name: 'Insurance Info', validForm: false },
        { name: 'Loss Info', validForm: false },
        { name: 'Expert/Vendor Info', validForm: false },
        { name: 'Estimating Info', validForm: false },
        { name: 'Contract Info', validForm: false },
        { name: 'Company Personnel', validForm: false },
        { name: 'Office Task', validForm: false }
      ],

      vendorIndustriesOptions: [],

      constants: constants,

      companyPersonnelDialog: false,
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

      lossInfo: {
        isDisable: '',
        lossAddressNameOptions: ['Others'],
        isMortgageHomeToggle: false,
        vendorsListDialog: false,
        vendorDialogFilterByIndustry: '',
        showVendorDialogFilters: false,
        addVendorDialog: false,
        vendorDialogName: '',
        valueName: '',
        lossAddressNameDropdown: '',
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
    this.getRoles();
    this.addressId = this.$route.params.clientId;
    this.getSingleClientDetails(this.selectedClientId);
    this.getSingleClientProperty(this.selectedClientId);
    this.contractInfo.time = date.formatDate(Date.now(), 'HH:mm:ss:aa');
    this.companyPersonnel.startDate = this.companyPersonnel.endDate = this.contractInfo.firstContractDate = this.contractInfo.contractDate = this.insuranceDetails.policyEffectiveDate = this.insuranceDetails.policyExpireDate = this.lossInfo.dateOfLoss = this.lossInfo.deadlineDate = this.lossInfo.recovDeadline = date.formatDate(
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
    if (this.addressId) {
      const obj = this.setClientProperty.find(item => {
        return item.id === this.addressId;
      });
      this.lossInfo.lossAddressNameDropdown = obj.attributes.name;
      this.lossInfo.isDisable = true;
    } else {
      this.lossInfo.lossAddressNameDropdown = 'Others';
    }

    const obj = this.setClientProperty.find(item => {
      return item.id === this.addressId;
    });
    this.lossInfo.lossAddressDetails = {
      houseNumber: obj.attributes.houseNumber,
      addressCountry: obj.attributes.addressCountry,
      addressRegion: obj.attributes.addressRegion,
      addressLocality: obj.attributes.addressLocality,
      postalCode: obj.attributes.postalCode,
      streetAddress: obj.attributes.streetAddress,
      postOfficeBoxNumber: '',
      dropBox: {
        info: '',
        isPresent: false
      }
    };

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
      'personnelRoles',
      'editSelectedClient',
      'selectedClientId',
      'setClientProperty',
      'roleTypes',
      'userRoles'
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
      'addIndustry',
      'getSingleClientDetails',
      'getSingleClientProperty',
      'getRoles',
      'getAllUsers'
    ]),
    ...mapMutations(['setSelectedLead']),

    // For adding multiple Contact Numbers in ClientInfo
    addAnotherContact() {
      let len = this.phoneNumber.length;
      if (this.phoneNumber[len - 1].number.length == 14) {
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
      const obj = this.setClientProperty.find(item => {
        return item.id === this.addressId;
      });
      this.lossInfo.lossAddressDetails = {
        houseNumber: obj.attributes.houseNumber,
        addressCountry: obj.attributes.addressCountry,
        addressRegion: obj.attributes.addressRegion,
        addressLocality: obj.attributes.addressLocality,
        postalCode: obj.attributes.postalCode,
        streetAddress: obj.attributes.streetAddress,
        postOfficeBoxNumber: '',
        dropBox: {
          info: '',
          isPresent: false
        }
      };
    },

    createClaimDailogBoxOpen(value) {
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
        case 'Company Personnel':
          this.companyPersonnelDialog = true;
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
        case 'insuranceInfoDialog':
          success = await this.$refs.insuranceInfoForm.validate();
          validationIndex = 0;

          break;

        case 'addEstimatorDialog':
          success = await this.$refs.addEstimatorForm.validate();
          validationIndex = 2;
          break;
        case 'lossInfoDialog':
          success = await this.$refs.lossInfoForm.validate();
          validationIndex = 1;

          break;

        case 'expertVendorInfoDialog':
          success = await this.$refs.expertVendorInfoForm.validate();
          validationIndex = 2;

          break;
        case 'estimatingInfoDialog':
          success = await this.$refs.estimatingInfoForm.validate();
          validationIndex = 3;
          break;

        case 'contractInfoDialog':
          success = await this.$refs.contractInfoForm.validate();
          validationIndex = 4;
          break;
        case 'companyPersonnelDialog':
          success = await this.$refs.companyPersonnelForm.validate();
          validationIndex = 5;
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

    //claim

    async setPayloadForClaim(id) {
      const payload = {
        client: {
          id: id,
          fname: this.editSelectedClient.attributes.insuredInfo.primary.fname,

          lname: this.editSelectedClient.attributes.insuredInfo.primary.lname
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
        mortgageInfo: this.mortgageObject.mortgageDetails,
        lossInfo: {
          isNewAddress:
            this.lossInfo.lossAddressNameDropdown == 'Others' ? true : false,
          lossAddressName: this.lossInfo.lossAddressNameDropdown,
          addressID: this.addressId,
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

        personnel: [
          {
            id: this.companyPersonnel.personnel.id,
            name: this.companyPersonnel.personParty.name,
            role: {
              value: this.companyPersonnel.personnel.role.value,
              machineValue: this.companyPersonnel.personnel.role.machineValue
            },
            note: this.companyPersonnel.notes,
            fees: {
              type: this.companyPersonnel.buttonGroup,
              rate: this.companyPersonnel.claimFeeRate
                ? this.companyPersonnel.claimFeeRate
                : 0
            },
            startDate: dateToSend(this.companyPersonnel.startDate),
            endDate: dateToSend(this.companyPersonnel.endDate)
          }
        ]
      };

      this.addClaim(payload).then(() => {
        this.setSelectedLead();
        this.successMessage(constants.successMessages.CLAIM);
        this.$router.push('/property-details');
      });
    },

    validateEmail,
    successMessage
  }
};
</script>

<style lang="scss">
::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
.form-heading {
  color: #333333;
  font-weight: bold;
  font-size: 14px;
}

.form-list {
  color: #333333;
  font-weight: bold;
  font-size: 16px;
  border-bottom: 1px solid #d3d3d3;
  padding: 10px;
  margin: 5px 0;
}

.custom-select {
  width: 100%;
  border-bottom: 1px solid #c2c2c2;
  margin-bottom: 20px;

  .select-text {
    line-height: 24px;
    padding-top: 24px;
    padding-bottom: 8px;
    height: 50px;
  }
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
