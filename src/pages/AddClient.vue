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
          <!-- Client Info -->
          <q-form
            @submit="onNextButtonClick(0)"
            :hidden="step != 0"
            ref="clientInfo"
          >
            <div class="form-card q-pa-sm">
              <q-card class="q-pa-sm q-mb-md">
                <q-select
                  dense
                  class="required"
                  v-model="client.id"
                  option-value="id"
                  option-label="name"
                  map-options
                  emit-value
                  behavior="menu"
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
                    Is Policyholder An Organization ?
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
              </q-card>
              <q-card class="q-pa-sm q-mb-md">
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
                    val =>
                      (val && val.length > 0) || 'Please fill the First name'
                  ]"
                  label="First Name"
                />
                <q-input
                  dense
                  v-model="insuredDetails.lname"
                  class="required"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'Please fill the Last name'
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
                    behavior="menu"
                    options-dense
                    label="Type"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'Please select phone type'
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
                        (val && val.length == 14) ||
                        'Please enter the phone number'
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
                  <p class="q-mx-none q-my-auto">
                    Add additional phone number(s)
                  </p>
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
                      behavior="menu"
                      emit-value
                      lazy-rules
                      :rules="[
                        val =>
                          (val && val.length > 0) || 'Please select phone type'
                      ]"
                    />
                    <q-input
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
                  <div class="row justify-between q-my-sm">
                    <q-btn
                      :disabled="isAddMorePhoneDisabled"
                      outline
                      class="q-mt-sm"
                      @click="addAnotherContact"
                      color="primary"
                      label="Add"
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
                <div class="row">
                  <p class="q-mx-none q-my-auto">Is there a Co-insured?</p>
                  <q-toggle
                    class="q-ml-auto"
                    v-model="isThereaCoInsuredToggle"
                  />
                </div>

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
                      val =>
                        (val && val.length > 0) || 'Please select the Title'
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
                      behavior="menu"
                      options-dense
                      label="Type"
                      options-dense
                      lazy-rules
                      :rules="[
                        val =>
                          (val && val.length > 0) || 'Please select phone type'
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
              </q-card>
              <q-card class="q-pa-sm">
                <span class="form-heading">Loss Address Details</span>
                <q-input
                  dense
                  class="required"
                  v-model="lossAddressName"
                  label="Enter  Loss Address Name "
                  lazy-rules
                  :rules="[
                    val => (val && val.length > 0) || 'This is a required field'
                  ]"
                />
                <q-select
                  dense
                  behavior="menu"
                  class="required"
                  v-model="property.id"
                  option-value="id"
                  option-label="name"
                  map-options
                  options-dense
                  emit-value
                  :options="propertyTypes"
                  @input="setTypes(propertyTypes, property)"
                  label="Property Type"
                  :rules="[
                    val =>
                      (val && val.length > 0) ||
                      'Please select the property type'
                  ]"
                />
                <q-input
                  dense
                  v-model="propertyDescription"
                  label="Description of Property"
                />
                <AutoCompleteAddress
                  :id="'ClientInfo'"
                  :address="clientAddressDetails"
                  :isDropBoxEnable="true"
                  :isChecksEnable="true"
                  :isAsteriskMark="true"
                />
              </q-card>
            </div>

            <div class="row q-pt-md">
              <div class="q-ml-auto">
                <span class="q-mr-md text-color-grey">Next</span>
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
          <!-- Mailing Address -->
          <q-form
            @submit="onNextButtonClick(1)"
            @reset="onBackButtonClick(1)"
            :hidden="step != 1"
            ref="mailingInfo"
          >
            <q-card class="q-pa-md form-card">
              <div class="row">
                <span class="form-heading">
                  Is the Mailing Address same as the Loss Address ?
                </span>
                <q-toggle
                  class="q-ml-auto"
                  v-model="isMailingAddressSameToggle"
                  @input="mailingAddressSame"
                />
              </div>
              <AutoCompleteAddress
                :id="'ClientMailing'"
                :address="mailingAddressDetails"
                :isDropBoxEnable="true"
                :isChecksEnable="true"
                :isFieldsDisable="isMailingAddressSameToggle"
                :isAsteriskMark="true"
              />
            </q-card>
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
                <span class="q-mr-md text-color-grey"> Next</span>
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
          <!-- Insurance Info -->
          <q-form
            @submit="onNextButtonClick(2)"
            @reset="onBackButtonClick(2)"
            :hidden="step != 2"
            ref="insuranceInfo"
          >
            <div class="q-pa-sm form-card">
              <InsuranceInfo :insuranceDetails="insuranceDetails" />
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
                <span class="q-mr-md text-color-grey"> Next</span>
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
          <!-- Loss Info -->
          <q-form
            @submit="onNextButtonClick(3)"
            @reset="onBackButtonClick(3)"
            :hidden="step != 3"
            ref="lossInfo"
          >
            <div class="q-pa-md form-card">
              <LossInfo
                :lossInfo="lossInfo"
                @lossAddressSame="lossAddressSame"
                :lossAddressToggleShow="true"
                :isMailingAddressEnable="true"
                :lossAddressSameAsClient="true"
                :isAddressRequired="true"
                :policyDate="{
                  policyEffectiveDate: insuranceDetails.policyEffectiveDate,
                  policyExpireDate: insuranceDetails.policyExpireDate
                }"
              />
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
                <span class="q-mr-md text-color-grey"> Next</span>
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
          <!-- Property -->
          <q-form
            @submit="onNextButtonClick(4)"
            @reset="onBackButtonClick(4)"
            :hidden="step != 4"
            ref="property"
          >
            <div class="q-pa-md form-card" style="min-height: 400px">
              <PropertyInfo
                :lossInfo="lossInfo"
                @lossAddressSame="lossAddressSame"
                :lossAddressToggleShow="true"
                :isMailingAddressEnable="true"
                :lossAddressSameAsClient="true"
                :isAddressRequired="true"
                :policyDate="{
                  policyEffectiveDate: insuranceDetails.policyEffectiveDate,
                  policyExpireDate: insuranceDetails.policyExpireDate
                }"
              />
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
                <span class="q-mr-md text-color-grey"> Next</span>
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
          <!-- Damage Structure -->
          <q-form
            @submit="onNextButtonClick(5)"
            @reset="onBackButtonClick(5)"
            :hidden="step != 5"
            ref="property"
          >
            <div class="q-pa-md form-card">Damage structure</div>
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
                <span class="q-mr-md text-color-grey"> Next</span>
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
          <!-- Mortgage Info -->
          <q-form
            @submit="onNextButtonClick(6)"
            @reset="onBackButtonClick(6)"
            :hidden="step != 6"
            ref="mortgageInfo"
          >
            <div class="q-pa-sm form-card">
              <MortgageForm
                :mortgage="mortgageInfo"
                :isThereSecondMortgage="true"
              />
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
                <span class="q-mr-md text-color-grey"> Next</span>
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
          <!-- Expert /Vendor Info -->
          <q-form
            @submit="onNextButtonClick(7)"
            @reset="onBackButtonClick(7)"
            :hidden="step != 7"
            ref="vendorInfo"
          >
            <div class="q-pa-md form-card">
              <ExpertVendorInfo :expertVendorInfo="expertVendorInfo" />
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
                <span class="q-mr-md text-color-grey"> Next</span>
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
          <!-- Estimating Info -->
          <q-form
            @submit="onNextButtonClick(8)"
            @reset="onBackButtonClick(8)"
            :hidden="step != 8"
            ref="estimatingInfo"
          >
            <div class="q-pa-md form-card">
              <EstimatingInfo :estimatingInfo="estimatingInfo" />
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
                <span class="q-mr-md text-color-grey"> Next</span>
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
          <!-- Contract Info Dialog -->
          <q-form
            @submit="onNextButtonClick(9)"
            @reset="onBackButtonClick(9)"
            :hidden="step != 9"
            ref="contractInfo"
          >
            <div class="q-pa-md form-card">
              <ContractInfo :contractInfo="contractInfo" />
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
                <span class="q-mr-md text-color-grey"> Next</span>
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
          <!-- Company Personnel Dialog-->
          <q-form
            @submit="onNextButtonClick(10)"
            @reset="onBackButtonClick(10)"
            :hidden="step != 10"
            ref="personnelInfo"
          >
            <div class="q-pa-md form-card">
              <CompanyPersonnel :companyPersonnel="companyPersonnel" />
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
                <span class="q-mr-md text-color-grey"> Next</span>
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
          <!-- Office Task -->
          <q-form
            @submit="createClientButtonClick()"
            @reset="onBackButtonClick(11)"
            :hidden="step != 11"
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
                <span class="q-mr-md text-color-grey"> Create Client</span>
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
import AddressService from '@utils/country';
import ContractInfo from 'components/ContractInfo';
import CompanyPersonnel from 'components/CompanyPersonnel';
import OfficeTask from 'components/OfficeTask';
import EstimatingInfo from 'components/EstimatingInfo';
import PropertyInfo from 'components/PropertyInfo';
import LossInfo from 'components/LossInfo';
import ExpertVendorInfo from 'components/ExpertVendorInfo';
import InsuranceInfo from 'components/InsuranceInfo';
import { dateToSend } from '@utils/date';
import {
  validateEmail,
  validateDate,
  validateTime,
  successMessage
} from '@utils/validation';
import { constants } from '@utils/constant';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import VendorsList from 'components/VendorsList';
import AddVendor from 'components/AddVendor';
import MortgageForm from 'components/MortgageForm';
import MortgagesList from 'components/MortgagesList';
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
    CompanyPersonnel,
    PropertyInfo,
    OfficeTask,
    MortgageForm,
    MortgagesList
  },
  data() {
    return {
      step: 0,
      stepClickValidTill: 0,
      mortgageInfo: [
        {
          id: '',
          value: '',
          loanNumber: '',
          accountNumber: '',
          isPrimary: true,
          notes: ''
        }
      ],

      industryTypeValue: '',
      property: {
        value: '',
        id: '',
        machineValue: ''
      },
      propertyDescription: '',
      lossAddressName: '',
      isAddMorePhoneDisabled: false,
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
        time: '',
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
          role: ''
        },
        personParty: '',
        notes: '',
        filterRole: []
      },
      industryType: {
        value: '',
        machineValue: ''
      },
      isCreateClientButtonDisabled: true,
      stepArr: [
        { name: 'Client Info', ref: 'clientInfo' },
        { name: 'Mailing Address', ref: 'mailingInfo' },
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
      lossAddressNameOptions: ['Others'],
      constants: constants,
      maximizedToggle: true,
      clientInfoDailog: false,
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
        type: 'main',
        email: ''
      },
      coInsuredDetails: {
        fname: '',
        lname: '',
        phone: '',
        type: 'main',
        machineValue: '',
        email: ''
      },
      phoneNumber: [
        {
          type: 'main',
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
        //This is Present in Payload but we are not taking any value like post offc number in form
        postOfficeBoxNumber: '4',
        dropBox: {
          info: '',
          isPresent: false
        }
      },
      lossInfo: {
        purchaseDate: '',
        purchasePrice: '',
        quantity: '',
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
          streetAddress: '',
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
        doesAnEstimatorNeedToBeAssignedToggle: false,
        estimatorID: '',
        scopeTimeNeeded: '',
        notesToTheEstimator: ''
      },
      insuranceInfoDialog: false,

      DidYouHavePoliceDeclarationToggle: false,

      typeOfLoss: [],
      expertVendorInfo: {
        isAlreadyHiredVendor: [{ industry: '', vendor: {} }],
        isHiredByClaimguru: [{ industry: '', vendor: {} }],
        anyOtherExpertHiredToggle: false,
        vendorExpertHiredToggle: false,
        notes: '',
        internalNotes: ''
      },
      officeTask: {
        officeActionRequired: false
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
      addAditionalPhoneNumberToggle: false,

      mailingAddressDialog: false,
      isMailingAddressSameToggle: false,
      isThereaCoInsuredToggle: false,
      states: [],
      countries: []
    };
  },

  async created() {
    this.getRoles();
    this.getLossCauses();
    this.getSeverityClaim();
    this.getClaimReasons();
    this.getVendors(this.$route.params.id);
    this.getClientTypes();
    this.getPropertyTypes();
    this.getPolicyTypes();
    this.getContactTypes();
    this.getPolicyCategory();
    this.contractInfo.time = date.formatDate(Date.now(), 'hh:mm A');
    this.companyPersonnel.startDate = this.companyPersonnel.endDate = this.contractInfo.firstContractDate = this.contractInfo.contractDate = this.insuranceDetails.policyEffectiveDate = this.lossInfo.dateOfLoss = this.lossInfo.deadlineDate = this.lossInfo.recovDeadline = date.formatDate(
      Date.now(),
      'MM/DD/YYYY'
    );
    this.insuranceDetails.policyExpireDate = date.formatDate(
      date.addToDate(Date.now(), {
        year: 1
      }),
      'MM/DD/YYYY'
    );

    if (this.selectedLead.id) {
      await this.getLeadDetails(this.selectedLead.id);
      this.honorific1 = {
        id: this.selectedLead.primaryContact.honorific.id,
        value: this.selectedLead.primaryContact.honorific.value,
        machineValue: this.selectedLead.primaryContact.honorific.machineValue
      };
      this.insuredDetails.fname = this.selectedLead.primaryContact.fname;
      this.insuredDetails.lname = this.selectedLead.primaryContact.lname;
      this.insuredDetails.email = this.selectedLead.primaryContact.email;
      this.insuredDetails.phone = this.selectedLead.primaryContact.phoneNumber[0].number;
      this.insuredDetails.type = this.selectedLead.primaryContact.phoneNumber[0].type;
      this.propertyDescription = this.selectedLead.lossDesc;
      this.clientAddressDetails.houseNumber = this.selectedLead.lossLocation.houseNumber;
      this.clientAddressDetails.addressCountry = this.selectedLead.lossLocation.addressCountry;
      this.clientAddressDetails.addressLocality = this.selectedLead.lossLocation.addressLocality;
      this.clientAddressDetails.addressRegion = this.selectedLead.lossLocation.addressRegion;
      this.clientAddressDetails.postalCode = this.selectedLead.lossLocation.postalCode;
      this.clientAddressDetails.streetAddress = this.selectedLead.lossLocation.streetAddress;
      this.lossInfo.descriptionDwelling = this.selectedLead.lossDesc;
      this.contractInfo.sourceDetails.id = this.selectedLead.leadSource
        ? this.selectedLead.leadSource.id
        : '';
      this.contractInfo.sourceDetails.type = this.selectedLead.leadSource
        ? this.selectedLead.leadSource.type
        : '';
      this.contractInfo.sourceDetails.details = this.selectedLead.leadSource
        ? this.selectedLead.leadSource.detail
        : '';
      this.insuranceDetails.carrierName = this.selectedLead.carrier
        ? this.selectedLead.carrier.value
        : '';
      this.insuranceDetails.carrierId = this.selectedLead.carrier
        ? this.selectedLead.carrier.id
        : '';
      this.insuranceDetails.policyNumber = this.selectedLead.policyNumber
        ? this.selectedLead.policyNumber
        : '';
      this.lossInfo.causeOfLoss = this.selectedLead.lossCause
        ? this.selectedLead.lossCause.value
        : '';

      this.lossInfo.dateOfLoss = date.formatDate(
        this.selectedLead.dateofLoss,
        'MM/DD/YYYY'
      );
    }
  },

  computed: {
    ...mapGetters([
      'selectedLead',
      'contactTypes',
      'clientTypes',
      'titles',
      'vendors',
      'leadSources',
      'estimators',
      'propertyTypes',
      'policyTypes',
      'claimSeverity',
      'lossCauses',
      'claimReasons',
      'policyCategories',
      'vendorIndustries',
      'personnelRoles',
      'roleTypes',
      'userRoles',
      'addIndustry',
      'vendorIndustries',
      'propertyTypes'
    ])
  },
  mounted() {
    this.getTitles();
    this.getVendorIndustries();
  },
  methods: {
    ...mapActions([
      'addClient',
      'getClaimReasons',
      'getLossCauses',
      'getVendors',
      'getClientTypes',
      'getPolicyTypes',
      'getContactTypes',
      'getTitles',
      'getPolicyCategory',
      'getVendorIndustries',
      'getPropertyTypes',
      'getRoles',
      'getSeverityClaim',
      'addClaim',
      'getLeadDetails',
      'addMultipleTaskToClaim'
    ]),
    ...mapMutations(['setSelectedLead']),
    successMessage,

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

    validateDate,
    validateTime,

    onCountrySelect(country) {
      this.states = addressService.getStates(country);
    },

    //This function is used for setting the title name,machine value from its Id
    setTitleName(val) {
      const titleResult = this.titles.find(obj => {
        return obj.id === this['honorific' + val].id;
      });
      this['honorific' + val].title = titleResult.value;
      this['honorific' + val].machineValue = titleResult.machineValue;
    },
    //This function is used for seting the client Type and  Id from client Info
    setTypes(types, data, type) {
      const obj = types.find(item => {
        return item.id === data.id;
      });

      data.machineValue = obj.machineValue;
      data.value = obj.name;
    },

    /* Here If Malling address toggle is on , then the address of the client Info will set to maling Address too*/
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
    //Creating Client (here currently  we are sending Source Detail blank ,later it will change as per client requirement)
    async createClientButtonClick() {
      const payload = {
        isOrganization: this.primaryDetails.isOrganization,
        organizationName: this.primaryDetails.organizationName,
        leadID: this.selectedLead.id,

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
          mailingAddress: {
            ...this.mailingAddressDetails
          },
          phoneNumbers: this.phoneNumber
        },
        property: {
          name: this.lossAddressName,
          addressCountry: this.clientAddressDetails.addressCountry,
          addressLocality: this.clientAddressDetails.addressLocality,
          addressRegion: this.clientAddressDetails.addressRegion,
          postalCode: this.clientAddressDetails.postalCode,
          streetAddress: this.clientAddressDetails.streetAddress,
          houseNumber: this.clientAddressDetails.houseNumber,
          propertyType: {
            ...this.property
          },
          propertyDesc: this.propertyDescription
        }
      };
      /* if coInsuredDetails toggle is off it well not send the coInsured details */
      if (!this.isThereaCoInsuredToggle) {
        delete payload.insuredInfo.secondary;
      }
      if (!this.selectedLead.id) {
        delete payload.leadID;
      }
      const response = await this.addClient(payload);
      this.setSelectedLead();
      if (response && response.id) {
        const responseData = {
          id: response.id,
          propertyId: response.attributes.propertyID
        };
        this.setPayloadForClaim(responseData);
      }
    },

    /*Payload for Claim*/
    async setPayloadForClaim(responseData) {
      const payload = {
        client: {
          id: responseData.id,
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
        mortgageInfo: this.mortgageInfo,
        lossInfo: {
          property: {
            id: responseData.propertyId
          },

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
          isPPDamaged: this.lossInfo.isThereDamageToPersonalPropertyToggle,
          isPPIFFillNow: this.lossInfo.isPAFillingOutToggle,
          isPPIFFillLater: this.lossInfo.isAdjustorFillOutLaterDate,
          isClientPreparePPIF: this.lossInfo.isClientGoingToPreparePPIF,
          isPPIFSendToInsure: this.lossInfo.doYouWantToSendInsuredPPIF,
          OSDamageItems: this.lossInfo.osDamagedItems,
          PPDamageItems: this.lossInfo.ppDamagedItems,
          isPPIF: this.lossInfo.wasAppifProvidedToTheInsuredToggle,
          isNeedPPIF: this.lossInfo
            .doesTheOfficeNeedToProvidePpifToTheInsuredToggle,
          hasHomeMortgage: this.lossInfo.isMortgageHomeToggle,
          isSecondClaim: false
        },
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
          dateOfFirstContact: dateToSend(this.contractInfo.firstContractDate),
          source: this.contractInfo.sourceDetails
        },

        personnel: [
          {
            personnelID: '',
            name: this.companyPersonnel.personParty.name,
            role: {
              value: this.companyPersonnel.personnel.role,
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
      if (
        !this.companyPersonnel.personnel.role.value &&
        !this.companyPersonnel.personnel.role.machineValue
      ) {
        delete payload.personnel;
      }
      if (this.estimatingInfo.doesAnEstimatorNeedToBeAssignedToggle) {
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

      const response = await this.addClaim(payload);
      if (response && response.id) {
        if (this.officeTask.officeActionRequired) {
          this.addMultipleOfficeTask(response.id);
        } else {
          this.setSelectedLead();
          this.$router.push('/clients');
        }
      }
    },

    async addMultipleOfficeTask(id) {
      const payload = {
        id: id,
        tasks: this.officeTask.actions
      };

      const response = await this.addMultipleTaskToClaim(payload);
      if (response) {
        this.setSelectedLead();
        this.$router.push('/clients');
      }
    },

    validateEmail,

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
      if (this.stepClickValidTill < this.step) {
        this.stepClickValidTill = this.step;
      }

      document.getElementById('step').scrollLeft += 50;
    },

    onBackButtonClick() {
      this.step--;
      document.getElementById('step').scrollLeft -= 50;
    }
  }
  /*----------------------end of method-----------------------------------*/
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
.form-height {
  height: calc(100vh - 120px);
  overflow: auto;
  margin: 10px;
}

.form-card {
  min-height: 250px;
  max-height: calc(100vh - 230px);
  overflow: scroll;
}

.stepper {
  .step {
    display: flex;
    overflow-x: auto;
    padding: 10px 10px 0 10px;

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
      margin-top: 10px;
    }
  }

  .form {
    height: calc(100vh - 140px);
    padding: 10px;
  }
}
</style>
