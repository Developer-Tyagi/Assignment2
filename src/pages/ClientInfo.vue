<template>
  <q-page style="padding-top: 0; height: 100vh">
    <CustomHeader
      @backButton="$router.push('/view-client')"
      :showAddButton="false"
    />
    <div style="padding-top: 51px" class=" row  ">
      <!-- This is for showing the client details -->
      <q-card class="q-pa-md q-ma-md" style="width: 100%">
        <div class="row">
          <span class="form-heading q-mt-none">Insured Details</span><br />
          <q-icon
            name="create"
            color="primary"
            class="edit-icon"
            @click="onClickEditClient"
          ></q-icon>
        </div>

        {{ editSelectedClient.attributes.insuredInfo.primary.fname }}
        {{ editSelectedClient.attributes.insuredInfo.primary.lname }}
        <p class="texts">
          Mobile:
          <span
            class="clickLink"
            v-if="editSelectedClient.attributes.insuredInfo.primary.phoneNumber"
            @click="
              onPhoneNumberClick(
                editSelectedClient.attributes.insuredInfo.primary.phoneNumber[0]
                  .number,
                $event
              )
            "
          >
            {{
              editSelectedClient.attributes.insuredInfo.primary.phoneNumber[0]
                .number
            }}
          </span>
        </p>
        <p class="texts">
          Email
          <span
            class="clickLink"
            v-if="editSelectedClient.attributes.insuredInfo.primary.email"
            @click="
              onEmailClick(
                editSelectedClient.attributes.insuredInfo.primary.email,
                $event
              )
            "
          >
            {{ editSelectedClient.attributes.insuredInfo.primary.email }}
          </span>
        </p>
        <div class="q-mt-md">
          <span class="form-heading q-mt-none">Co-Insured Details</span> <br />
          {{
            editSelectedClient.attributes.insuredInfo.secondary.fname
              ? editSelectedClient.attributes.insuredInfo.secondary.fname
              : '-'
          }}
          {{
            editSelectedClient.attributes.insuredInfo.secondary.lname
              ? editSelectedClient.attributes.insuredInfo.secondary.lname
              : '-'
          }}<br />
          <p class="texts">
            Mobile:
            <span class="clickLink" @click="onPhoneNumberClick()">
              {{
                editSelectedClient.attributes.insuredInfo.secondary
                  .phoneNumber[0].number
                  ? editSelectedClient.attributes.insuredInfo.secondary
                      .phoneNumber[0].number
                  : '-'
              }}
            </span>
          </p>
          <br />
          {{
            editSelectedClient.attributes.insuredInfo.primary.email
              ? editSelectedClient.attributes.insuredInfo.primary.email
              : '-'
          }}<br />
        </div>
        <div class="q-mt-md">
          <span class="form-heading q-mt-none">Source Of Lead / Client</span>
          <br />
          {{
            editSelectedClient.attributes.source.detail
              ? editSelectedClient.attributes.source.detail
              : '-'
          }}
        </div>
        <div class="q-mt-md">
          <span class="form-heading q-mt-none">Address Details</span> <br />
          {{ editSelectedClient.attributes.insuredInfo.address.houseNumber
          }}<br />
          {{ editSelectedClient.attributes.insuredInfo.address.streetAddress
          }}<br />
          {{ editSelectedClient.attributes.insuredInfo.address.addressCountry
          }}<br />
          {{
            editSelectedClient.attributes.insuredInfo.mailingAddress
              .addressLocality
          }}<br />
          {{ editSelectedClient.attributes.insuredInfo.address.addressRegion }}
        </div>
        <div class="q-mt-md">
          <span class="form-heading q-mt-none">Additional Phone Numbers</span>
          <br />
          <span
            class="clickLink"
            v-if="editSelectedClient.attributes.insuredInfo.phoneNumbers"
            @click="
              onPhoneNumberClick(
                editSelectedClient.attributes.insuredInfo.phoneNumbers[0]
                  .number,
                $event
              )
            "
          >
            {{
              editSelectedClient.attributes.insuredInfo.phoneNumbers[0].number
                ? editSelectedClient.attributes.insuredInfo.phoneNumbers[0]
                    .number
                : '-'
            }}</span
          ><br />
          <span
            class="clickLink"
            v-if="editSelectedClient.attributes.insuredInfo.phoneNumbers"
            @click="
              onPhoneNumberClick(
                editSelectedClient.attributes.insuredInfo.phoneNumbers[1]
                  .number,
                $event
              )
            "
            >{{
              editSelectedClient.attributes.insuredInfo.phoneNumbers[1].number
                ? editSelectedClient.attributes.insuredInfo.phoneNumbers[1]
                    .number
                : '-'
            }}</span
          >
        </div>
        <div class="q-mt-md">
          <span class="form-heading q-mt-none">Tenant Details</span> <br />
          {{
            editSelectedClient.attributes.insuredInfo.tenantInfo.name
              ? editSelectedClient.attributes.insuredInfo.tenantInfo.name
              : '-'
          }}<br />
          <span
            class="clickLink"
            v-if="
              editSelectedClient.attributes.insuredInfo.tenantInfo.phoneNumber
                .number
            "
            @click="
              onPhoneNumberClick(
                editSelectedClient.attributes.insuredInfo.tenantInfo.phoneNumber
                  .number,
                $event
              )
            "
          >
            {{
              editSelectedClient.attributes.insuredInfo.tenantInfo.phoneNumber
                .number
                ? editSelectedClient.attributes.insuredInfo.tenantInfo
                    .phoneNumber.number
                : '-'
            }}</span
          >
        </div>
        <div class="q-mt-md">
          <span class="form-heading q-mt-none">Mailing Address</span> <br />

          {{
            editSelectedClient.attributes.insuredInfo.mailingAddress
              .houseNumber
          }}<br />
          {{
            editSelectedClient.attributes.insuredInfo.mailingAddress
              .streetAddress
          }}<br />
          {{
            editSelectedClient.attributes.insuredInfo.mailingAddress
              .addressCountry
          }}<br />
          {{
            editSelectedClient.attributes.insuredInfo.mailingAddress
              .addressLocality
          }}<br />
          {{ editSelectedClient.attributes.insuredInfo.address.addressRegion
          }}<br />
          {{
            editSelectedClient.attributes.insuredInfo.mailingAddress.postalCode
              ? editSelectedClient.attributes.insuredInfo.mailingAddress
                  .postalCode
              : '-'
          }}<br />
          {{
            editSelectedClient.attributes.insuredInfo.mailingAddress.dropBox
              .info
              ? editSelectedClient.attributes.insuredInfo.mailingAddress.dropBox
                  .info
              : '-'
          }}
        </div>
      </q-card>
    </div>
    <!-- Client Info Edit Dialog -->
    <q-dialog
      v-model="editClientInfoDailog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="form-card q-pa-md" style="padding-top: 30px">
        <q-header bordered class="bg-white">
          <q-toolbar class="row bg-white">
            <img
              src="~assets/close.svg"
              alt="back-arrow"
              @click="editClientInfoDailog = false"
              style="margin: auto 0"
            />
            <div class="text-uppercase text-bold text-black q-mx-auto">
              Client Info
            </div>
          </q-toolbar>
        </q-header>
        <q-card-section>
          <div class="q-page bg-white">
            <div class="full-width fix-height">
              <div>
                <q-select
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
                <span class="form-heading">Insured Details</span>
                <q-select
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
                  v-model="insuredDetails.lname"
                  class="required"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'Please fill the Last name'
                  ]"
                  label="Last Name"
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
                  <p class="q-mx-none q-my-auto">
                    Organization Is Policyholder?
                  </p>
                  <q-toggle
                    v-model="policyHolder.isPolicyHolder"
                    left-label
                    class="q-ml-auto"
                  />
                </div>
                <br />

                <div class="row justify-between">
                  <q-select
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
                      val =>
                        (val && val.length > 0) || 'Please select phone type'
                    ]"
                  />
                  <q-input
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
                  <q-toggle
                    class="q-ml-auto"
                    v-model="isThereaCoInsuredToggle"
                  />
                </div>
                <br />
                <div v-if="isThereaCoInsuredToggle" style="font-size: 20px">
                  <span class="form-heading">Co-insured Details</span>

                  <q-select
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
                    v-model="coInsuredDetails.fname"
                    label="First Name"
                  />
                  <q-input v-model="coInsuredDetails.lname" label="Last Name" />
                  <div class="row justify-between">
                    <q-select
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
                        val =>
                          (val && val.length > 0) || 'Please select phone type'
                      ]"
                    />
                    <q-input
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
                  <p class="q-mx-none q-my-auto">
                    Add aditional phone number(s)
                  </p>
                  <q-toggle
                    class="q-ml-auto"
                    v-model="addAditionalPhoneNumberToggle"
                  />
                </div>
                <div v-if="addAditionalPhoneNumberToggle">
                  <div class="row justify-between">
                    <q-select
                      v-model="addAditionalPhoneNumber.type1"
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
                        val =>
                          (val && val.length > 0) || 'Please select phone type'
                      ]"
                    />
                    <q-input
                      v-model.number="addAditionalPhoneNumber.phone2"
                      label="Phone2"
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
                  <div class="row justify-between">
                    <q-select
                      class="required col-5"
                      v-model="addAditionalPhoneNumber.type2"
                      label="Type"
                      :options="contactTypes"
                      option-value="machineValue"
                      option-label="name"
                      map-options
                      emit-value
                      options-dense
                      lazy-rules
                      :rules="[
                        val =>
                          (val && val.length > 0) || 'Please select phone type'
                      ]"
                    />
                    <q-input
                      class="required col-6"
                      v-model.number="addAditionalPhoneNumber.phone3"
                      label="Phone3"
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
                  <q-input v-model="tenantOccupied.name" label="Tenant Name" />

                  <div class="row justify-between">
                    <q-select
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
                        val =>
                          (val && val.length > 0) || 'Please select phone type'
                      ]"
                    />
                    <q-input
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
                <!-- Mailing Address Details            -->
                <div class="row">
                  <span class="form-heading">
                    Is the mailing address same?
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
              </div>
            </div>
            <br />
          </div>

          <q-btn
            @click="editClientInfoDailog = false"
            label="Save"
            color="primary"
            class="full-width q-mt-auto text-capitalize"
            size="'xl'"
          ></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { validateEmail } from '@utils/validation';
import AddressService from '@utils/country';
import AutoCompleteAddress from 'components/AutoCompleteAddress';
import CustomHeader from 'components/CustomHeader';
const addressService = new AddressService();
export default {
  name: 'ClientInfo',

  data() {
    return {
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
      primaryDetails: {
        isOrganization: false,
        organizationName: ''
      },
      policyHolder: {
        isPolicyHolder: false,
        policyHolderName: ''
      },
      tenantOccupied: {
        name: '',
        phone: '',
        type: ''
      },
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
      isThereaCoInsuredToggle: false,
      addAditionalPhoneNumberToggle: false,
      tenantOccupiedToggle: false,
      isMailingAddressSameToggle: false,

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
      editClientInfoDailog: false
    };
  },
  components: { CustomHeader, AutoCompleteAddress },
  computed: {
    ...mapGetters([
      'editSelectedClient',
      'clientTypes',
      'titles',
      'contactTypes'
    ])
  },
  created() {
    this.getClientTypes();
    this.getTitles();
    this.countries = addressService.getCountries();
    this.onCountrySelect('United States');
    // Client info Editable & prefilled Details
    this.client.id = this.editSelectedClient.attributes.type.id;
    this.client.value = this.editSelectedClient.attributes.type.value;
    this.client.machineValue = this.editSelectedClient.attributes.type.machineValue;
    this.honorific1.id = this.editSelectedClient.attributes.insuredInfo.primary.honorific.id;
    this.honorific1.value = this.editSelectedClient.attributes.insuredInfo.primary.honorific.value;
    this.honorific1.machineValue = this.editSelectedClient.attributes.insuredInfo.primary.honorific.machineValue;
    this.insuredDetails.fname = this.editSelectedClient.attributes.insuredInfo.primary.fname;
    this.insuredDetails.lname = this.editSelectedClient.attributes.insuredInfo.primary.lname;
    console.log(this.editSelectedClient.attributes, 11);
    this.primaryDetails.isOrganization = this.editSelectedClient.attributes.isOrganization;
    this.policyHolder.isPolicyHolder = this.editSelectedClient.attributes.isOrganizationPolicyholder;
    this.primaryDetails.organizationName = this.editSelectedClient.attributes.organizationName;
    this.insuredDetails.type = this.editSelectedClient.attributes.insuredInfo.primary.phoneNumber[0].type;
    this.insuredDetails.phone = this.editSelectedClient.attributes.insuredInfo.primary.phoneNumber[0].number;
    this.insuredDetails.email = this.editSelectedClient.attributes.insuredInfo.primary.email;
    if (this.editSelectedClient.attributes.insuredInfo.secondary) {
      this.isThereaCoInsuredToggle = true;
      this.honorific2.id = this.editSelectedClient.attributes.insuredInfo.secondary.honorific.id;
      this.honorific2.value = this.editSelectedClient.attributes.insuredInfo.secondary.honorific.value;
      this.honorific2.machineValue = this.editSelectedClient.attributes.insuredInfo.secondary.honorific.machineValue;
      this.coInsuredDetails.fname = this.editSelectedClient.attributes.insuredInfo.secondary.fname;
      this.coInsuredDetails.lname = this.editSelectedClient.attributes.insuredInfo.secondary.lname;
      this.coInsuredDetails.type = this.editSelectedClient.attributes.insuredInfo.secondary.phoneNumber[0].type;
      this.coInsuredDetails.phone = this.editSelectedClient.attributes.insuredInfo.secondary.phoneNumber[0].number;
      this.coInsuredDetails.email = this.editSelectedClient.attributes.insuredInfo.secondary.email;
    }
    if (this.editSelectedClient.attributes.insuredInfo.phoneNumbers) {
      this.addAditionalPhoneNumberToggle = true;
      this.addAditionalPhoneNumber.type1 = this.editSelectedClient.attributes.insuredInfo.phoneNumbers[0].type;
      this.addAditionalPhoneNumber.phone2 = this.editSelectedClient.attributes.insuredInfo.phoneNumbers[0].number;
      this.addAditionalPhoneNumber.type2 = this.editSelectedClient.attributes.insuredInfo.phoneNumbers[1].type;
      this.addAditionalPhoneNumber.phone3 = this.editSelectedClient.attributes.insuredInfo.phoneNumbers[1].number;
    }
    if (this.editSelectedClient.attributes.insuredInfo.tenantInfo) {
      this.tenantOccupiedToggle = true;
      this.tenantOccupied.name = this.editSelectedClient.attributes.insuredInfo.tenantInfo.name;
      this.tenantOccupied.type = this.editSelectedClient.attributes.insuredInfo.tenantInfo.phoneNumber.type;
      this.tenantOccupied.phone = this.editSelectedClient.attributes.insuredInfo.tenantInfo.phoneNumber.number;
    }
    //Mailing Address Editable & prefilled Details
  },

  methods: {
    ...mapActions(['getClientTypes', 'getTitles']),
    setTypes(types, data) {
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
    onCountrySelect(country) {
      this.states = addressService.getStates(country);
    },
    validateEmail,
    setTitleName(val) {
      const titleResult = this.titles.find(obj => {
        return obj.id === this['honorific' + val].id;
      });
      this['honorific' + val].title = titleResult.value;
      this['honorific' + val].machineValue = titleResult.machineValue;
    },

    onClickEditClient() {
      this.editClientInfoDailog = true;
    },
    onPhoneNumberClick(number, e) {
      e.stopPropagation();
      if (number) {
        window.open('tel:' + number);
      }
    },
    onEmailClick(email, e) {
      e.stopPropagation();
      if (email) {
        window.open('mailto:' + email);
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
.edit-icon {
  position: absolute;
  right: 20px;
  font-size: 20px;
}
.clickLink {
  color: $primary;
}
.texts {
  margin-bottom: 0;
  font-size: 15px;

  text-align: left;
}
</style>
