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
                behavior="menu"
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
                  behavior="menu"
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
                class=" row justify-between"
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
                    val => (val && val.length > 0) || 'Please select phone type'
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
            ></q-input>
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
                  (val && val.length > 0) || 'Please select the property type'
              ]"
            />
            <q-input
              dense
              v-model="propertyDescription"
              label="Description of Property"
            />
            <AutoCompleteAddress
              :address="clientAddressDetails"
              :isDropBoxEnable="true"
              :isChecksEnable="true"
              :isAsteriskMark="true"
            />
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
  </q-page>
</template>
<script>
import CustomBar from 'components/CustomBar';
import AutoCompleteAddress from 'components/AutoCompleteAddress';
import AddressService from '@utils/country';
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
import { date } from 'quasar';
const addressService = new AddressService();
export default {
  name: 'addClient',
  components: {
    CustomBar,
    VendorsList,
    AddVendor,
    AutoCompleteAddress
  },
  data() {
    return {
      property: {
        value: '',
        id: '',
        machineValue: ''
      },
      propertyDescription: '',
      lossAddressName: '',
      isAddMorePhoneDisabled: false,
      contractInfo: {
        reasonForCancellation: '',

        reasonForCancellation: [],
        sourceDetails: {
          id: '',
          type: '',
          details: ''
        },
        time: ''
      },
      isCreateClientButtonDisabled: true,
      dialogBoxes: [
        { name: 'Client Info', validForm: false },
        { name: 'Mailing Address', validForm: false }
      ],
      vendorIndustriesOptions: [],
      lossAddressNameOptions: ['Others'],
      constants: constants,
      companyPersonnelDialog: false,
      contractInfoDialog: false,
      officeTaskDialog: false,
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
        //This is Present in Payload but we are not taking any value like post offc number in form
        postOfficeBoxNumber: '4',
        dropBox: {
          info: '',
          isPresent: false
        }
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
      countries: [],
      additionalOfficeTaskRequiredToggle: false,
      officeActionRequiredTypes: [],
      officeTaskRequiredTypes: []
    };
  },

  created() {
    this.getRoles();
    this.contractInfo.time = date.formatDate(Date.now(), 'HH:mm:ss:aa');
    this.getVendors(this.$route.params.id);
    this.getClientTypes();
    this.getPropertyTypes();
    this.getPolicyTypes();
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
      this.propertyDescription = this.selectedLead.lossDesc;
    }

    this.countries = addressService.getCountries();
    this.onCountrySelect('United States');
  },

  computed: {
    ...mapGetters([
      'selectedLead',
      'contactTypes',
      'clientTypes',
      'titles',
      'vendors',
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
      'getVendors',
      'getClientTypes',
      'getPolicyTypes',
      'getContactTypes',
      'getTitles',
      'getPolicyCategory',
      'getVendorIndustries',
      'getPropertyTypes',
      'getRoles'
    ]),
    ...mapMutations(['setSelectedLead']),
    successMessage,

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

    createClientDailogBoxOpen(value) {
      switch (value) {
        case 'Client Info':
          this.clientInfoDailog = true;
          break;
        case 'Mailing Address':
          this.mailingAddressDialog = true;
          break;
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

        case 'mailingAddressDialog':
          success = await this.$refs.mailingAddressForm.validate();
          validationIndex = 1;
          break;
      }
      //here we are validating the form and giving tick if it is validated successfully
      if (success == true) {
        this.dialogBoxes[validationIndex].validForm = true;
        for (var i = 0; i < this.dialogBoxes.length; i++) {
          if (this.dialogBoxes[i].validForm == false) {
            this.isCreateClientButtonDisabled = true;
            break;
          } else {
            this.isCreateClientButtonDisabled = false;
          }
        }

        this[name] = false;
      } else {
        this.dialogBoxes.validForm = false;
      }
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
          mailingAddress: {
            ...this.mailingAddressDetails
          },
          phoneNumbers: this.phoneNumber,
          properties: [
            {
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
          ]
        }
      };
      /* if coInsuredDetails toggle is off it well not send the coInsured details */
      if (!this.isThereaCoInsuredToggle) {
        delete payload.insuredInfo.secondary;
      }
      if (this.contractInfo.sourceDetails.type == constants.industries.VENDOR) {
        payload.source.id = this.contractInfo.sourceDetails.id;
      } else {
        payload.source.detail = this.contractInfo.sourceDetails.details;
      }

      this.addClient(payload).then(() => {
        this.setSelectedLead();
        //Routing to Client if Client Creation is Successful
        this.$router.push('/clients');
      });
      this.successMessage(constants.successMessages.CLIENT);
    },

    validateEmail
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
</style>
