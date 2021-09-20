<template>
  <q-page>
    <div class="mobile-container-page-without-search">
      <div class="stepper">
        <div class="step justify-between" id="step">
          <div
            class="column align-center q-px-md"
            v-for="(arr, index) in stepArr"
            @click="onStepClick(index)"
          >
            <div
              :class="{
                'icon-div-selected': index == step,
                'icon-div-done': index < step,
                'icon-div': index > step
              }"
              class="q-mx-auto"
            >
              <q-icon
                v-if="index == step"
                size="14px"
                name="create"
                color="white"
                style="margin: auto"
              />
              <q-icon
                v-if="index < stepClickValidTill && index != step"
                size="14px"
                name="done"
                color="white"
                style="margin: auto"
              />
            </div>
            <div class="label">{{ arr.name }}</div>
          </div>
        </div>
        <div class="form">
          <q-form
            @submit="onNextButtonClick(0)"
            :hidden="step != 0"
            ref="insuranceInfo"
          >
            <div class="q-pa-sm form-card">
              <InsuranceInfo
                :insuranceDetails="insuranceDetails"
                :showAppraisal="false"
              />
            </div>
            <div class="row q-pt-md">
              <q-btn
                class="single-next-button-style"
                label="Next"
                padding="md"
                type="submit"
              />
            </div>
          </q-form>
          <q-form
            @submit="onNextButtonClick(1)"
            @reset="onBackButtonClick(1)"
            :hidden="step != 1"
            ref="lossInfo"
          >
            <div class="q-pa-sm form-card">
              <LossInfo
                :lossInfo="lossInfo"
                @lossAddressSame="lossAddressSame"
                :lossAddressToggleShow="false"
                :isMailingAddressEnable="true"
                :lossAddressSameAsClient="true"
                :isAddressRequired="true"
                :mortgageInfo="mortgageObject"
                :policyDate="{
                  policyEffectiveDate: insuranceDetails.policyEffectiveDate,
                  policyExpireDate: insuranceDetails.policyExpireDate
                }"
              />
            </div>
            <div class="row q-pt-md">
              <div style="width:100%;">
                <q-btn
                  class="back-button-style"
                  padding="md"
                  type="reset"
                  label="Back"
                />
                <q-btn
                  class="next-button-style"
                  padding="md"
                  type="submit"
                  label="Next"
                />
              </div>
            </div>
          </q-form>
          <q-form
            @submit="onNextButtonClick(2)"
            @reset="onBackButtonClick(2)"
            :hidden="step != 2"
            ref="property"
          >
            <q-card class="q-pa-md form-card" style="min-height: 400px">
              <div class="row">
                <div class="col-9 q-mt-md form-heading">
                  Is there damage to personal property?
                </div>
                <q-toggle
                  class="q-ml-auto"
                  v-model="lossInfo.isThereDamageToPersonalPropertyToggle"
                  @input="onPersonalPropertyToggleButtonOff"
                />
              </div>
              <div
                class="row"
                v-if="lossInfo.isThereDamageToPersonalPropertyToggle"
              >
                <div class="col-8 q-mx-none q-my-auto form-heading">
                  Is the PA filling out the PPIF at this inspection?
                </div>
                <q-toggle
                  class="q-ml-auto"
                  v-model="lossInfo.isPAFillingOutToggle"
                  @input="onPersonalPropertyToggleButtonOff"
                />
              </div>
              <!-- Persnol Property Damage List -->
              <div
                v-if="
                  lossInfo.isThereDamageToPersonalPropertyToggle &&
                    lossInfo.isPAFillingOutToggle
                "
              >
                <br />
                <div
                  v-if="lossInfo.ppDamagedItems.length >= 1"
                  flat
                  bordered
                  scroll
                  class="q-mt-xs"
                >
                  <div class="items-start q-gutter-md">
                    <div
                      v-for="(item, index) in lossInfo.ppDamagedItems"
                      v-if="lossInfo.ppDamagedItems.length"
                    >
                      <q-card class="q-pa-sm">
                        <div class="text-right">
                          <q-icon
                            class="q-ma-xs"
                            dense
                            color="primary"
                            name="create"
                            @click="OnEditPPdamageItem(index)"
                          />
                          <q-icon
                            v-if="lossInfo.ppDamagedItems.length >= 1"
                            class="q-ma-xs"
                            size="xs"
                            dense
                            color="primary"
                            name="close"
                            @click="deletePPDamagedItem(index)"
                          />
                        </div>
                        <div class="row justify-between">
                          <div>
                            <q-badge class="q-pa-sm" color="grey-6">
                              {{ item.radio }}</q-badge
                            >
                          </div>
                          <div class="text-bold text-capitalize q-pt-xs">
                            {{ item.name }}
                          </div>
                          <div class="q-pt-xs q-mr-sm text-bold">
                            {{ item.quantity }}
                          </div>
                        </div>
                        <div
                          class="
                            text-capitalize
                            q-pt-xs
                            text-caption
                            q-mr-xl q-my-xs q-pr-xs
                          "
                        >
                          <p>{{ item.desc }}</p>

                          <p>{{ item.itemDesc }}</p>
                        </div>
                        <div class="q-my-sm">
                          <div class="row justify-between q-my-sm">
                            <div class="heading-light">Serial Number</div>
                            <div class="q-mr-sm">
                              {{ item.serialNumber ? item.serialNumber : '-' }}
                            </div>
                          </div>
                          <div class="row justify-between q-my-sm">
                            <div class="heading-light">Purchase Date</div>
                            <div class="q-mr-sm">
                              {{ dateToShow(item.purchaseDate) }}
                            </div>
                          </div>
                        </div>
                        <q-separator />
                        <div class="q-my-sm row">
                          <div class="heading-light col-7">Purchase Price</div>
                          <div class="heading-light col-3">$</div>
                          <div class="q-mr-sm">
                            {{ item.purchasePrice }}
                          </div>
                        </div>
                        <div class="q-my-sm row">
                          <div class="heading-light col-7">
                            {{ item.radio }} Cost
                          </div>
                          <div class="heading-light col-3">$</div>
                          <div>
                            {{
                              item.radio == 'Replace'
                                ? item.replaceCost
                                : item.repairCost
                            }}
                          </div>
                        </div>
                      </q-card>
                    </div>
                  </div>
                </div>
                <div>
                  <q-btn
                    label="add item"
                    name="add"
                    class="q-mt-sm"
                    icon="add"
                    size="sm"
                    color="primary"
                    @click="addNewItem('property')"
                  >
                  </q-btn>
                </div>
              </div>
              <div
                class="row"
                v-if="
                  !lossInfo.isPAFillingOutToggle &&
                    lossInfo.isThereDamageToPersonalPropertyToggle
                "
              >
                <div class="col-8 q-mx-none q-my-auto form-heading">
                  Is the adjuster going to fill out the PPIF at a later date?
                </div>
                <q-toggle
                  v-if="lossInfo.isThereDamageToPersonalPropertyToggle"
                  class="q-ml-auto"
                  v-model="lossInfo.isAdjustorFillOutLaterDate"
                />
              </div>
              <div
                class="row"
                v-if="
                  !lossInfo.isAdjustorFillOutLaterDate &&
                    lossInfo.isThereDamageToPersonalPropertyToggle &&
                    !lossInfo.isAdjustorFillOutLaterDate &&
                    !lossInfo.isPAFillingOutToggle
                "
              >
                <div class="col-8 q-mx-none q-my-auto form-heading">
                  Is the client going to prepare the PPIFs?
                </div>
                <q-toggle
                  v-if="lossInfo.isThereDamageToPersonalPropertyToggle"
                  class="q-ml-auto"
                  v-model="lossInfo.isClientGoingToPreparePPIF"
                />
              </div>
              <div
                class="row"
                v-if="
                  lossInfo.isClientGoingToPreparePPIF &&
                    lossInfo.isPAFillingOutToggle == false
                "
              >
                <div class="col-8 q-mx-none q-my-auto form-heading">
                  Do you want to send the insured a PPIF?
                </div>
                <q-toggle
                  v-if="lossInfo.isThereDamageToPersonalPropertyToggle"
                  class="q-ml-auto"
                  v-model="lossInfo.doYouWantToSendInsuredPPIF"
                />
              </div>
              <div class="row" v-if="lossInfo.isPAFillingOutToggle == false">
                <div class="col-8 q-mx-none q-my-auto form-heading">
                  Was a PPIF provided to the insured?
                </div>
                <q-toggle
                  class="q-ml-auto"
                  v-model="lossInfo.wasAppifProvidedToTheInsuredToggle"
                />
              </div>
              <div
                class="row"
                v-if="
                  lossInfo.isPAFillingOutToggle == false &&
                    lossInfo.wasAppifProvidedToTheInsuredToggle == false
                "
              >
                <div class="col-9 q-mx-none q-my-auto form-heading">
                  Does Claim Guru need to provide the insured with a PPIF?
                </div>
                <q-toggle
                  class="q-ml-auto"
                  v-model="
                    lossInfo.doesTheOfficeNeedToProvidePpifToTheInsuredToggle
                  "
                />
              </div>
              <PropertyInfo
                :lossInfo="lossInfo"
                :policyDate="{
                  policyEffectiveDate: insuranceDetails.policyEffectiveDate,
                  policyExpireDate: insuranceDetails.policyExpireDate
                }"
              />
            </q-card>
            <div class="row q-pt-md">
              <div style="width:100%;">
                <q-btn
                  class="back-button-style"
                  padding="md"
                  type="reset"
                  label="Back"
                />
                <q-btn
                  class="next-button-style"
                  padding="md"
                  type="submit"
                  label="Next"
                />
              </div>
            </div>
          </q-form>
          <!-- Damage Structure -->
          <q-form
            @submit="onNextButtonClick(3)"
            @reset="onBackButtonClick(3)"
            :hidden="step != 3"
            ref="property"
          >
            <q-card class="q-pa-md form-card">
              <div class="row">
                <p class="q-mx-none q-my-auto form-heading">
                  Is there damage to other structures?
                </p>
                <q-toggle
                  class="q-ml-auto"
                  v-model="lossInfo.isDamageOSToggle"
                  @input="onDamageOsToggleButtonOff"
                />
              </div>

              <div v-if="lossInfo.isDamageOSToggle">
                <br />
                <div
                  v-if="lossInfo.osDamagedItems.length >= 1"
                  flat
                  bordered
                  scroll
                  style="margin-top: 20px"
                >
                  <div class="items-start q-gutter-md">
                    <div
                      v-for="(item, index) in lossInfo.osDamagedItems"
                      v-if="lossInfo.osDamagedItems.length"
                    >
                      <q-card class="q-pa-sm">
                        <div class="text-right">
                          <q-icon
                            class="q-ma-xs"
                            dense
                            color="primary"
                            name="create"
                            @click="OnEditPPdamageItem(index)"
                          />
                          <q-icon
                            v-if="lossInfo.osDamagedItems.length >= 1"
                            class="q-ma-xs"
                            size="xs"
                            dense
                            color="primary"
                            name="close"
                            @click="deleteOsDamagedItems(index)"
                          />
                        </div>
                        <div class="row justify-between">
                          <div>
                            <q-badge class="q-pa-sm" color="grey-6">
                              {{ item.radio }}</q-badge
                            >
                          </div>
                          <div class="text-bold text-capitalize q-pt-xs">
                            {{ item.name }}
                          </div>
                          <div class="q-pt-xs q-mr-sm text-bold">
                            {{ item.quantity }}
                          </div>
                        </div>
                        <div
                          class="
                            text-capitalize
                            q-pt-xs
                            text-caption
                            q-mr-xl q-my-xs q-px-xs
                          "
                        >
                          <p>{{ item.desc }}</p>

                          <p>{{ item.itemDesc }}</p>
                        </div>
                        <div class="q-my-sm">
                          <div class="row justify-between q-my-sm">
                            <div class="heading-light">Serial Number</div>
                            <div class="q-mr-sm">
                              {{ item.serialNumber ? item.serialNumber : '-' }}
                            </div>
                          </div>
                          <div class="row justify-between q-my-sm">
                            <div class="heading-light">Purchase Date</div>
                            <div class="q-mr-sm">
                              {{ dateToShow(item.purchaseDate) }}
                            </div>
                          </div>
                        </div>
                        <q-separator />
                        <div class="q-my-sm row">
                          <div class="heading-light col-7">Purchase Price</div>
                          <div class="heading-light col-3">$</div>
                          <div class="q-mr-sm">
                            {{ item.purchasePrice }}
                          </div>
                        </div>
                        <div class="q-my-sm row">
                          <div class="heading-light col-7">
                            {{ item.radio }} Cost
                          </div>
                          <div class="heading-light col-3">$</div>
                          <div>
                            {{
                              item.radio == 'Replace'
                                ? item.replaceCost
                                : item.repairCost
                            }}
                          </div>
                        </div>
                      </q-card>
                    </div>
                  </div>
                </div>
                <q-btn
                  label="add item"
                  name="add"
                  class="q-mt-sm"
                  icon="add"
                  size="sm"
                  color="primary"
                  @click="addNewItem('otherDamage')"
                >
                </q-btn>
              </div>
              <PropertyInfo
                :lossInfo="lossInfo"
                @loss="lossValue"
                :policyDate="{
                  policyEffectiveDate: insuranceDetails.policyEffectiveDate,
                  policyExpireDate: insuranceDetails.policyExpireDate
                }"
              />
            </q-card>
            <div class="row q-pt-md">
              <div style="width:100%;">
                <q-btn
                  class="back-button-style"
                  padding="md"
                  type="reset"
                  label="Back"
                />
                <q-btn
                  class="next-button-style"
                  padding="md"
                  type="submit"
                  label="Next"
                />
              </div>
            </div>
          </q-form>
          <!-- Mortage -->
          <q-form
            @submit="onNextButtonClick(4)"
            @reset="onBackButtonClick(4)"
            :hidden="step != 4"
            ref="mortgageInfo"
          >
            <div class="q-pa-sm form-card">
              <MortgageForm
                :mortgage="mortgageInfo"
                :isThereSecondMortgage="true"
              />
            </div>

            <div class="row q-pt-md">
              <div style="width:100%;">
                <q-btn
                  class="back-button-style"
                  padding="md"
                  type="reset"
                  label="Back"
                />
                <q-btn
                  class="next-button-style"
                  padding="md"
                  type="submit"
                  label="Next"
                />
              </div>
            </div>
          </q-form>
          <q-form
            @submit="onNextButtonClick(5)"
            @reset="onBackButtonClick(5)"
            :hidden="step != 5"
            ref="expertInfo"
          >
            <div class="q-pa-md form-card">
              <ExpertVendorInfo
                :expertVendorInfo="expertVendorInfo"
                @addAnotherVendor="addAnotherVendor"
              />
            </div>
            <div class="row q-pt-md">
              <div style="width:100%;">
                <q-btn
                  class="back-button-style"
                  padding="md"
                  type="reset"
                  label="Back"
                />
                <q-btn
                  class="next-button-style"
                  padding="md"
                  type="submit"
                  label="Next"
                />
              </div>
            </div>
          </q-form>
          <q-form
            @submit="onNextButtonClick(6)"
            @reset="onBackButtonClick(6)"
            :hidden="step != 6"
            ref="estimatingInfo"
          >
            <div class="q-pa-md form-card">
              <EstimatingInfo
                :estimatingInfo="estimatingInfo"
                :estimatorAssignToggle="true"
              />
            </div>
            <div class="row q-pt-md">
              <div style="width:100%;">
                <q-btn
                  class="back-button-style"
                  padding="md"
                  type="reset"
                  label="Back"
                />
                <q-btn
                  class="next-button-style"
                  padding="md"
                  type="submit"
                  label="Next"
                />
              </div>
            </div>
          </q-form>

          <q-form
            @submit="onNextButtonClick(7)"
            @reset="onBackButtonClick(7)"
            :hidden="step != 7"
            ref="contractInfo"
          >
            <div class="q-pa-md form-card">
              <ContractInfo :contractInfo="contractInfo" />
            </div>
            <div class="row q-pt-md">
              <div style="width:100%;">
                <q-btn
                  class="back-button-style"
                  padding="md"
                  type="reset"
                  label="Back"
                />
                <q-btn
                  class="next-button-style"
                  padding="md"
                  type="submit"
                  label="Next"
                />
              </div>
            </div>
          </q-form>
          <q-form
            @submit="onNextButtonClick(8)"
            @reset="onBackButtonClick(8)"
            :hidden="step != 8"
            ref="personnelInfo"
          >
            <div class="q-pa-md form-card">
              <CompanyPersonnel :companyPersonnel="companyPersonnel" />
            </div>
            <div class="row q-pt-md">
              <div style="width:100%;">
                <q-btn
                  class="back-button-style"
                  padding="md"
                  type="reset"
                  label="Back"
                />
                <q-btn
                  class="next-button-style"
                  padding="md"
                  type="submit"
                  label="Next"
                />
              </div>
            </div>
          </q-form>
          <q-form
            @submit="setPayloadForClaim(selectedClientId)"
            @reset="onBackButtonClick(9)"
            :hidden="step != 9"
            ref="officeTaskInfo"
          >
            <div class="q-pa-md form-card">
              <OfficeTask :officeTask="officeTask" />
            </div>
            <div class="row q-pt-md">
              <div>
                <q-btn
                  icon="keyboard_backspace"
                  text-color="primary"
                  padding="md"
                  type="reset"
                />
                <span class="q-ml-md text-color-grey">Back</span>
              </div>
              <div class="q-ml-auto">
                <span class="q-mr-md text-color-grey"> Create Claim</span>
                <q-btn
                  class="rotate-180"
                  icon="keyboard_backspace"
                  text-color="primary"
                  padding="md"
                  type="submit"
                />
              </div>
            </div>
          </q-form>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import CustomBar from 'components/CustomBar';
import AutoCompleteAddress from 'components/AutoCompleteAddress';
import ContractInfo from 'components/ContractInfo';
import MortgageForm from 'components/MortgageForm';
import MortgagesList from 'components/MortgagesList';

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
import { dateToSend, dateToShow } from '@utils/date';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import VendorsList from 'components/VendorsList';
import AddVendor from 'components/AddVendor';
import PropertyInfo from 'components/PropertyInfo';
import OfficeTask from 'components/OfficeTask';
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
    PropertyInfo,
    ExpertVendorInfo,
    EstimatingInfo,
    ContractInfo,
    MortgageForm,
    OfficeTask,
    MortgagesList,
    CompanyPersonnel
  },

  data() {
    return {
      finalOfficeTask: [],
      mortgageInfo: [
        {
          id: '',
          value: '',
          loanNumber: '',
          accountNumber: '',
          isPrimary: true,
          notes: '',
          isSecondMortgageHome: false
        }
      ],

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
      propertyId: '',
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
          value: '',
          machineValue: ''
        },
        personParty: {
          id: '',
          name: ''
        },
        filterRole: []
      },

      isCreateClientButtonDisabled: true,

      industryType: {
        value: '',
        machineValue: ''
      },

      step: 0,
      stepClickValidTill: 0,

      stepArr: [
        { name: 'Insurance Info', ref: 'insuranceInfo' },
        { name: 'Loss Info', ref: 'lossInfo' },
        { name: 'Personal Property', ref: 'property' },
        { name: 'Damage Structure', ref: 'structure' },
        { name: 'Mortgage Info', ref: 'mortgageInfo' },
        { name: 'Expert/Vendor Info', ref: 'vendorInfo' },
        { name: 'Estimating Info', ref: 'estimatingInfo' },
        { name: 'Contract Info', ref: 'contractInfo' },
        { name: 'Company Personnel', ref: 'personnelInfo' },
        { name: 'Office Task', ref: 'officeTaskInfo' }
      ],

      vendorIndustriesOptions: [],
      constants: constants,
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
        address1: '',
        address2: '',
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
        currentIndex: '',
        isEdit: 'noneditable',
        damageType: '',
        purchaseDate: '',
        purchasePrice: '',
        quantity: '',
        repairCost: null,
        replaceCost: null,
        PPDamageItemDescription: '',
        isPAFillingOutToggle: true,
        doYouWantToSendInsuredPPIF: false,
        isClientGoingToPreparePPIF: false,
        isAdjustorFillOutLaterDate: false,

        lossAddressNameDropdown: 'Others',

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
          address1: '',
          address2: '',
          postOfficeBoxNumber: '4',
          dropBox: {
            info: '',
            isPresent: false
          }
        },
        isLossAddressSameAsClientToggle: false,
        repairReplaceRadio: 'Replace',
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

      insuranceDetails: {
        hasClaimBeenFilledToggle: false,
        isThisIsForcedPlacedPolicyToggle: false,
        policy: {
          id: '',
          value: '',
          machineValue: ''
        },
        type: '',
        details: '',
        id: '',
        policyCategory: {
          id: '',
          value: '',
          machineValue: ''
        },
        carrierName: '',
        carrierId: '',
        hasAppraisalClause: false,
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
        isAlreadyHiredVendor: [{ industry: '', vendor: {} }],
        isHiredByClaimguru: [{ industry: '', vendor: {} }],
        anyOtherExpertHiredToggle: false,
        vendorExpertHiredToggle: false,
        notes: '',
        internalNotes: ''
      },

      officeTask: {
        officeActionTypes: '',
        officeTaskTypes: '',
        officeActionRequired: false
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
    this.propertyId = this.$route.params.clientId;
    this.getVendorIndustries();
    //TODO
    // this.getSingleClientDetails(this.selectedClientId);
    // this.getSingleClientProperty(this.selectedClientId);
    this.contractInfo.time = date.formatDate(Date.now(), 'HH:mm:ss:aa');
    this.companyPersonnel.startDate = this.companyPersonnel.endDate = this.contractInfo.firstContractDate = this.contractInfo.contractDate = this.insuranceDetails.policyEffectiveDate = this.insuranceDetails.policyExpireDate = this.lossInfo.dateOfLoss = this.lossInfo.deadlineDate = this.lossInfo.recovDeadline = date.formatDate(
      Date.now(),
      'MM/DD/YYYY'
    );
    this.getPolicyTypes();
    this.getPolicyCategory();
    if (this.propertyId) {
      const obj = this.setClientProperty.find(item => {
        return item.id === this.propertyId;
      });
      this.lossInfo.lossAddressNameDropdown = obj.attributes.name;
      this.lossInfo.isDisable = true;
    } else {
      this.lossInfo.lossAddressNameDropdown = 'Others';
    }

    const obj = this.setClientProperty.find(item => {
      return item.id === this.propertyId;
    });

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
      'userRoles',
      'isOnline'
    ])
  },

  methods: {
    ...mapActions([
      'getClaimRoles',
      'getAllUsers',
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
      'getAllUsers',
      'addMultipleTaskToClaim'
    ]),
    ...mapMutations([
      'setSelectedLeadOffline',
      'setSelectedLeadOnline',
      'isLastRouteEdit'
    ]),
    onDamageOsToggleButtonOff() {
      if (!this.lossInfo.isDamageOSToggle) {
        this.lossInfo.osDamagedItems.length = 0;
      }
    },
    dateToShow,
    lossValue(value, index, damageType) {
      this.lossInfo[damageType][index] = value;
      this.lossInfo[damageType].push({
        name: '',
        desc: '',
        repairCost: '',
        replaceCost: '',
        serialNumber: '',
        radio: '',
        itemDesc: '',
        purchaseDate: '',
        purchasePrice: '',
        quantity: ''
      });
      this.lossInfo[damageType].pop();
    },

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
    validateEstimatingInfo() {
      if (this.estimatingInfo.doesAnEstimatorNeedToBeAssignedToggle) {
        if (this.estimatingInfo.name) {
          this.step = this.step + 1;
        } else {
          this.$q.notify({
            message: 'Please Choose a estimator',
            position: 'top',
            type: 'negative'
          });
        }
      } else {
        this.step = this.step + 1;
      }
    },
    onPersonalPropertyToggleButtonOff() {
      if (
        !this.lossInfo.isThereDamageToPersonalPropertyToggle ||
        !this.lossInfo.isPAFillingOutToggle
      ) {
        this.lossInfo.ppDamagedItems.length = 0;
      }
    },
    deleteDamagedItem(index) {
      this.$delete(this.lossInfo.osDamagedItems, index);
    },
    deletePPDamagedItem(index) {
      this.$delete(this.lossInfo.ppDamagedItems, index);
    },
    deleteOsDamagedItems(index) {
      this.$delete(this.lossInfo.osDamagedItems, index);
    },
    addNewItem(val) {
      this.lossInfo.isEdit = 'noneditable';
      this.lossInfo.quantity = '';
      this.lossInfo.PPDamageName = '';
      this.lossInfo.PPDamageDescription = '';
      this.lossInfo.serialNumber = '';
      this.lossInfo.purchasePrice = '';
      this.purchaseDate = date.formatDate(Date.now(), 'MM/DD/YYYY');
      this.lossInfo.repairReplaceRadio = '';
      this.lossInfo.repairCost = null;
      this.lossInfo.replaceCost = null;
      this.lossInfo.PPdamagedItemsDailog = true;
      if (val == 'otherDamage') {
        this.lossInfo.damageType = 'otherDamage';
      } else {
        this.lossInfo.damageType = 'property';
      }
    },
    OnEditPPdamageItem(index) {
      if (this.lossInfo.damageType == 'property') {
        this.lossInfo.isEdit = 'editable';

        this.lossInfo.currentIndex = index;
        this.lossInfo.quantity = this.lossInfo.ppDamagedItems[index].quantity;
        this.lossInfo.PPDamageName = this.lossInfo.ppDamagedItems[index].name;
        this.lossInfo.PPDamageDescription = this.lossInfo.ppDamagedItems[
          index
        ].desc;
        this.lossInfo.serialNumber = this.lossInfo.ppDamagedItems[
          index
        ].serialNumber;
        this.lossInfo.purchasePrice = this.lossInfo.ppDamagedItems[
          index
        ].purchasePrice;
        this.purchaseDate = this.lossInfo.ppDamagedItems[index].purchaseDate;
        this.lossInfo.repairReplaceRadio = this.lossInfo.ppDamagedItems[
          index
        ].radio;
        this.lossInfo.PPDamageItemDescription = this.lossInfo.ppDamagedItems[
          index
        ].itemDesc;
        this.lossInfo.repairCost = this.lossInfo.ppDamagedItems[
          index
        ].repairCost;
        this.lossInfo.replaceCost = this.lossInfo.ppDamagedItems[
          index
        ].replaceCost;

        this.lossInfo.PPdamagedItemsDailog = true;
      } else {
        this.lossInfo.isEdit = 'editable';
        this.lossInfo.currentIndex = index;
        this.lossInfo.quantity = this.lossInfo.osDamagedItems[index].quantity;
        this.lossInfo.PPDamageName = this.lossInfo.osDamagedItems[index].name;
        this.lossInfo.PPDamageDescription = this.lossInfo.osDamagedItems[
          index
        ].desc;
        this.lossInfo.serialNumber = this.lossInfo.osDamagedItems[
          index
        ].serialNumber;
        this.lossInfo.purchasePrice = this.lossInfo.osDamagedItems[
          index
        ].purchasePrice;
        this.purchaseDate = this.lossInfo.osDamagedItems[index].purchaseDate;
        this.lossInfo.repairReplaceRadio = this.lossInfo.osDamagedItems[
          index
        ].radio;
        this.lossInfo.PPDamageItemDescription = this.lossInfo.osDamagedItems[
          index
        ].itemDesc;
        this.lossInfo.repairCost = this.lossInfo.osDamagedItems[
          index
        ].repairCost;
        this.lossInfo.replaceCost = this.lossInfo.osDamagedItems[
          index
        ].replaceCost;

        this.lossInfo.PPdamagedItemsDailog = true;
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
        return item.id === this.propertyId;
      });
      this.lossInfo.lossAddressDetails = {
        houseNumber: obj.attributes.houseNumber,
        addressCountry: obj.attributes.addressCountry,
        addressRegion: obj.attributes.addressRegion,
        addressLocality: obj.attributes.addressLocality,
        postalCode: obj.attributes.postalCode,
        address1: obj.attributes.address1,
        address2: obj.attributes.address2,

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
          isClaimFiled: this.insuranceDetails.hasClaimBeenFilledToggle,
          isForcedPlaced: this.insuranceDetails
            .isThisIsForcedPlacedPolicyToggle,
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
        mortgageInfo: this.mortgageInfo,
        lossInfo: {
          lossAddressName: this.lossInfo.lossAddressNameDropdown,
          property: { id: this.propertyId },

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
        damageInfo: {
          personal: {
            isDamaged: this.lossInfo.isThereDamageToPersonalPropertyToggle,
            isPPIFFillNow: this.lossInfo.isPAFillingOutToggle,
            isPPIFFillLater: this.lossInfo.isAdjustorFillOutLaterDate,
            isClientPreparePPIF: this.lossInfo.isClientGoingToPreparePPIF,
            isPPIFSendToInsure: this.lossInfo.doYouWantToSendInsuredPPIF,
            items: this.lossInfo.ppDamagedItems
          },
          otherStructure: {
            isDamaged: this.lossInfo.isThereDamageToPersonalPropertyToggle,
            isPPIFFillNow: this.lossInfo.isPAFillingOutToggle,
            isPPIFFillLater: this.lossInfo.isAdjustorFillOutLaterDate,
            isClientPreparePPIF: this.lossInfo.isClientGoingToPreparePPIF,
            isPPIFSendToInsure: this.lossInfo.doYouWantToSendInsuredPPIF,
            items: this.lossInfo.osDamagedItems
          }
        },
        // expertInfo: {
        //   isVendorAssigned: this.expertVendorInfo.vendorExpertHiredToggle,
        //   vendor: this.expertVendorInfo.vendors,
        //   isInsuredHired: this.expertVendorInfo.anyOtherExpertHiredToggle,
        //   notes: this.expertVendorInfo.notes,
        //   internalNotes: this.expertVendorInfo.internalNotes
        // },
        expertInfo: {
          vendors: [],
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
          source: this.contractInfo.sourceDetails,
          dateOfFirstContact: dateToSend(this.contractInfo.firstContractDate)
        },

        personnel: [
          {
            personnelID: this.companyPersonnel.personParty.id,
            name: this.companyPersonnel.personParty.value,
            role: {
              value: this.companyPersonnel.personnel.value.name,
              machineValue: this.companyPersonnel.personnel.value.machineValue
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
      if (
        !this.companyPersonnel.personnel.value &&
        !this.companyPersonnel.personnel.value.machineValue
      ) {
        delete payload.personnel;
      }
      if (
        this.estimatingInfo.doesAnEstimatorNeedToBeAssignedToggle &&
        this.estimatingInfo.estimatorID
      ) {
        payload.estimatingInfo = {
          estimatorID: this.estimatingInfo.estimatorID,
          scopeTimeNeeded: this.estimatingInfo.scopeTimeNeeded,
          notesToTheEstimator: this.estimatingInfo.notesToTheEstimator
        };
      }
      if (
        this.estimatingInfo.doesAnEstimatorNeedToBeAssignedToggle &&
        this.estimatingInfo.estimatorID
      ) {
        payload.estimatingInfo = {
          estimatorID: this.estimatingInfo.estimatorID,
          scopeTimeNeeded: this.estimatingInfo.scopeTimeNeeded,
          notesToTheEstimator: this.estimatingInfo.notesToTheEstimator
        };
      }
      if (
        this.expertVendorInfo.isAlreadyHiredVendor.length ||
        this.expertVendorInfo.isHiredByClaimguru.length
      ) {
        let vendorsAlreadyExist = this.expertVendorInfo.isAlreadyHiredVendor.map(
          val => ({
            id: val.vendor.id,
            value: val.vendor.value,
            isAlreadyHired: true
          })
        );
        let vendorsHired = this.expertVendorInfo.isHiredByClaimguru.map(
          val => ({
            id: val.vendor.id,
            value: val.vendor.value,
            isAlreadyHired: false
          })
        );
        if (vendorsAlreadyExist[0].id) {
          payload.expertInfo.vendors = vendorsAlreadyExist.concat(vendorsHired);
        } else {
          payload.expertInfo.vendors = vendorsHired;
        }
      }
      var response = await this.addClaim(payload);

      if (response && response.id) {
        if (
          this.officeTask.officeActionRequired &&
          this.officeTask.actions &&
          this.officeTask.actions.length
        ) {
          this.addMultipleOfficeTask(response);
        } else {
          this.$router.push('/clients');
        }
      }
      if (this.isOnline) {
        this.setSelectedLeadOnline();
      } else {
        this.setSelectedLeadOffline();
      }
      this.successMessage(constants.successMessages.CLAIM);
      this.isLastRouteEdit(true);
      this.$router.push('/view-client/' + this.selectedClientId);
    },
    async addMultipleOfficeTask(response) {
      if (this.officeTask && this.officeTask.actions) {
        this.officeTask.actions.forEach(val => {
          if (val.isEnabled == true) {
            this.finalOfficeTask.push(val);
          }
        });
      }

      const payload = {
        id: response.id,
        tasks: this.finalOfficeTask
      };

      await this.addMultipleTaskToClaim(payload);
    },
    async onStepClick(index) {
      if (this.step < index) {
        const validation = await this.$refs[
          this.stepArr[this.step].ref
        ].validate();
        if (index <= this.stepClickValidTill) {
          if (validation) {
            this.step = index;
          }
        }
      } else {
        const validation = await this.$refs[
          this.stepArr[this.step].ref
        ].validate();
        if (validation) {
          this.step = index;
        }
      }
    },

    onNextButtonClick() {
      this.step++;
      switch (this.stepArr[this.step].ref) {
        case 'lossInfo':
          this.getLossCauses();
          this.getClaimReasons();
          this.getSeverityClaim();
          break;
        case 'expertInfo':
          this.getVendorIndustries();
          break;
        case 'personnelInfo':
          this.getClaimRoles();
          this.getAllUsers();
          break;
      }
      if (this.stepClickValidTill < this.step) {
        this.stepClickValidTill = this.step;
      }
      document.getElementById('step').scrollLeft += 50;
    },

    onBackButtonClick() {
      this.step--;
      document.getElementById('step').scrollLeft -= 50;
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
.stepper {
  .step {
    display: flex;
    overflow-x: auto;
    padding: 10px;

    .icon-div-selected {
      background: $primary;
      display: flex;
      height: 18px;
      width: 18px;
      border-radius: 50%;
    }
    .icon-div-done {
      background: green;
      display: flex;
      height: 18px;
      width: 18px;
      border-radius: 50%;
    }

    .icon-div {
      background: $grey;
      display: flex;
      height: 18px;
      width: 18px;
      border-radius: 50%;
    }

    .label {
      text-transform: capitalize;
      text-align: center;
      font-size: x-small;
      margin-top: 10pxasd;
    }
  }

  .form {
    height: calc(100vh - 140px);
  }
}
.form-card {
  min-height: 250px;
  max-height: calc(100vh - 230px);
  overflow: scroll;
}
</style>
