<template>
  <div>
    <div class="q-ml-md row">
      Date & Time of First Contact
      <q-icon
        name="create"
        color="primary"
        size="xs"
        class="q-ml-auto"
        v-if="!editClientInfoDailog"
        @click="onEditClick"
      ></q-icon>
    </div>
    <div class="q-ml-md">
      {{ dateWithTime(editSelectedClient.attributes.created) }}
    </div>

    <q-card class="q-ma-xs q-pa-md">
      <div class="client-list">
        <div class="row">
          <div class="heading-light q-ml-sm col-xs-4">Insured Details</div>
          <div class="q-ml-md column">
            <div class="">
              {{ editSelectedClient.attributes.insuredInfo.primary.fname }}
              {{ editSelectedClient.attributes.insuredInfo.primary.lname }}
            </div>
            <div
              class="clickLink clickable"
              v-if="
                editSelectedClient.attributes.insuredInfo.primary.phoneNumber
              "
              @click="
                onPhoneNumberClick(
                  editSelectedClient.attributes.insuredInfo.primary
                    .phoneNumber[0].number,
                  $event
                )
              "
            >
              {{
                showPhoneNumber(
                  editSelectedClient.attributes.insuredInfo.primary
                    .phoneNumber[0].number
                )
              }}
            </div>
            <div
              class="clickLink clickable"
              v-if="editSelectedClient.attributes.insuredInfo.primary.email"
              @click="
                onEmailClick(
                  editSelectedClient.attributes.insuredInfo.primary.email,
                  $event
                )
              "
            >
              {{ editSelectedClient.attributes.insuredInfo.primary.email }}
            </div>
          </div>
        </div>

        <div class="q-mt-md row">
          <div class="heading-light q-ml-xs q-mt-none col-4">
            Co-Insured Details
          </div>
          <div class="col-6 q-ml-md q-pl-xs">
            <div class="">
              {{
                editSelectedClient.attributes.insuredInfo.secondary
                  ? editSelectedClient.attributes.insuredInfo.secondary.fname
                  : '-'
              }}
              {{
                editSelectedClient.attributes.insuredInfo.secondary
                  ? editSelectedClient.attributes.insuredInfo.secondary.lname
                  : '-'
              }}
            </div>
            <div>
              <p
                class="texts"
                v-if="editSelectedClient.attributes.insuredInfo.secondary"
              >
                <span
                  v-if="
                    editSelectedClient.attributes.insuredInfo.secondary &&
                    editSelectedClient.attributes.insuredInfo.secondary
                      .phoneNumber
                  "
                  class="clickLink"
                  @click="
                    onPhoneNumberClick(
                      editSelectedClient.attributes.insuredInfo.secondary
                        .phoneNumber[0].number,
                      $event
                    )
                  "
                >
                  {{
                    editSelectedClient.attributes.insuredInfo.secondary
                      ? showPhoneNumber(
                          editSelectedClient.attributes.insuredInfo.secondary
                            .phoneNumber[0].number
                        )
                      : '-'
                  }}
                </span>
              </p>
            </div>
            <div>
              <p
                class="texts"
                v-if="editSelectedClient.attributes.insuredInfo.secondary"
              >
                <span
                  class="clickLink"
                  v-if="editSelectedClient.attributes.insuredInfo.secondary"
                  @click="
                    onEmailClick(
                      editSelectedClient.attributes.insuredInfo.secondary.email,
                      $event
                    )
                  "
                >
                  {{
                    editSelectedClient.attributes.insuredInfo.secondary
                      ? editSelectedClient.attributes.insuredInfo.secondary
                          .email
                      : '-'
                  }}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div class="q-mt-md row">
          <div class="heading-light q-ml-xs q-mt-none col-xs-4">
            Address Details
          </div>
          <div
            class="col-7 q-ml-md"
            v-if="editSelectedClient.attributes.insuredInfo.mailingAddress"
          >
            <div>
              {{
                editSelectedClient.attributes.insuredInfo.mailingAddress
                  .address1
                  ? editSelectedClient.attributes.insuredInfo.mailingAddress
                      .address1
                  : '-'
              }}
            </div>

            <div
              v-if="
                editSelectedClient.attributes.insuredInfo.mailingAddress &&
                editSelectedClient.attributes.insuredInfo.mailingAddress
                  .address2
              "
            >
              {{
                editSelectedClient.attributes.insuredInfo.mailingAddress
                  .address2
              }}
            </div>
            <div>
              {{
                editSelectedClient.attributes.insuredInfo.mailingAddress
                  .addressLocality
                  ? editSelectedClient.attributes.insuredInfo.mailingAddress
                      .addressLocality
                  : ''
              }},
              {{
                editSelectedClient.attributes.insuredInfo.mailingAddress
                  .addressRegion
                  ? toGetStateShortName(
                      editSelectedClient.attributes.insuredInfo.mailingAddress
                        .addressRegion
                    )
                  : ''
              }}
              {{
                editSelectedClient.attributes.insuredInfo.mailingAddress
                  .postalCode
                  ? editSelectedClient.attributes.insuredInfo.mailingAddress
                      .postalCode
                  : '-'
              }}
              <q-icon
                name="place"
                color="primary"
                @click="
                  sendMap(
                    editSelectedClient.attributes.insuredInfo.mailingAddress
                  )
                "
                class="edit-icon"
              ></q-icon>
            </div>
          </div>
        </div>
        <div class="q-mt-md row">
          <div class="heading-light q-mt-none col-xs-4">
            Additional Phone Numbers
          </div>
          <div class="column q-ml-md">
            <div
              v-for="(phone, i) in editSelectedClient.attributes.insuredInfo
                .phoneNumbers"
            >
              <span
                class="clickLink"
                @click="onPhoneNumberClick(phone.number, $event)"
              >
                {{ phone.number ? showPhoneNumber(phone.number) : '-' }}</span
              >
            </div>
          </div>
        </div>

        <div class="q-mt-md row">
          <div class="q-mt-none col-xs-4 heading-light">Tenant Details</div>
          <div
            class="column q-ml-md"
            v-if="editSelectedClient.attributes.insuredInfo.tenantInfo"
          >
            <div>
              {{
                editSelectedClient.attributes.insuredInfo.tenantInfo.name
                  ? editSelectedClient.attributes.insuredInfo.tenantInfo.name
                  : '-'
              }}
            </div>
            <div>
              <span
                class="clickLink"
                v-if="
                  editSelectedClient.attributes.insuredInfo.tenantInfo
                    .phoneNumber.number
                "
                @click="
                  onPhoneNumberClick(
                    editSelectedClient.attributes.insuredInfo.tenantInfo
                      .phoneNumber.number,
                    $event
                  )
                "
              >
                {{
                  editSelectedClient.attributes.insuredInfo.tenantInfo
                    .phoneNumber.number
                    ? showPhoneNumber(
                        editSelectedClient.attributes.insuredInfo.tenantInfo
                          .phoneNumber.number
                      )
                    : '-'
                }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </q-card>

    <!-- Client Info Edit Dialog -->
    <q-dialog
      v-model="editClientInfoDailog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          :dialogName="'Client Info'"
          @closeDialog="editClientInfoDailog = false"
        />

        <div class="mobile-container-page-without-search form-height">
          <q-form ref="clientForm">
            <q-card class="q-ma-xs q-pa-md">
              <q-select
                dense
                borderless
                class="required input-style input-field"
                v-model="client.value"
                option-value="name"
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

              <div class="q-ml-sm q-mt-md">
                <span class="form-heading">Insured Details</span>
              </div>

              <q-select
                dense
                v-model="honorific1.value"
                :options="titles"
                option-value="value"
                option-label="value"
                map-options
                options-dense
                borderless
                class="required input-style input-field"
                behavior="menu"
                @input="setTitleName(1)"
                emit-value
                label="Title"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please select the Title'
                ]"
              />
              <q-input
                dense
                borderless
                class="required input-style input-field"
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
                borderless
                class="required input-style input-field"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please fill the Last name'
                ]"
                label="Last Name"
              />
            </q-card>
            <q-card class="q-ma-xs q-pa-md">
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
                  lazy-rules
                  borderless
                  class="required input-style input-field"
                  :rules="[
                    val =>
                      (val && val.length > 0) ||
                      'Please fill the organization name '
                  ]"
                />
              </div>
            </q-card>
            <q-card class="q-ma-xs q-pa-md">
              <div class="row justify-between">
                <q-select
                  dense
                  v-model="insuredDetails.type"
                  borderless
                  class="required col-5 input-style input-field"
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
                  borderless
                  class="required col-6 input-style input-field"
                  label="Phone"
                  mask="(###) ###-####"
                  lazy-rules
                  :rules="[
                    val => val.length == 14 || 'Please enter the phone number'
                  ]"
                />
              </div>
              <q-input
                dense
                v-model="insuredDetails.email"
                borderless
                class="required input-style input-field"
                label="Email"
                lazy-rules
                :rules="[
                  val =>
                    validateEmail(val) ||
                    'You have entered an invalid email address!'
                ]"
              />
            </q-card>
            <q-card class="q-ma-xs q-pa-md">
              <div class="row">
                <p class="q-mx-none q-ml-xs q-my-auto">
                  Is there a Co-insured?
                </p>
                <q-toggle class="q-ml-auto" v-model="isThereaCoInsuredToggle" />
              </div>

              <div v-if="isThereaCoInsuredToggle" style="font-size: 20px">
                <div class="q-ml-xs">
                  <span class="form-heading">Co-insured Details</span>
                </div>

                <q-select
                  dense
                  v-model="honorific2.value"
                  borderless
                  class="required input-style input-field"
                  :options="titles"
                  option-value="value"
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
                  borderless
                  class="input-style input-field"
                  v-model="coInsuredDetails.fname"
                  label="First Name"
                />
                <q-input
                  borderless
                  class="input-style input-field"
                  v-model="coInsuredDetails.lname"
                  label="Last Name"
                />
                <div class="row justify-between">
                  <q-select
                    dense
                    v-model="coInsuredDetails.type"
                    borderless
                    class="required col-5 input-style input-field"
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
                    dense
                    v-model.number="coInsuredDetails.phone"
                    label="Phone"
                    borderless
                    class="col-6 input-style input-field"
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
                  borderless
                  class="input-style input-field"
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
            <q-card class="q-ma-xs q-pa-md">
              <div class="row">
                <p class="q-mx-none q-ml-xs q-my-auto">
                  Add aditional phone number(s)
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
                    dense
                    v-model="phoneNumber[index].type"
                    borderless
                    class="required col-5 input-style input-field"
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
                    dense
                    v-model.number="phoneNumber[index].number"
                    label="Phone"
                    borderless
                    class="required col-6 input-style input-field"
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
            </q-card>
            <q-card class="q-ma-xs q-pa-md">
              <span class="form-heading">Address Details</span>
              <AutoCompleteAddress
                :id="'ClientInfoEdit'"
                :address="clientAddressDetails"
                :isDropBoxEnable="true"
                :isChecksEnable="true"
                :isAsteriskMark="true"
                :value="false"
                :view="'mobile'"
              />
            </q-card>
            <q-card class="q-ma-xs q-pa-md">
              <div class="row">
                <p class="q-mx-none q-ml-xs q-my-auto">Tenant Occupied</p>
                <q-toggle
                  class="q-ml-auto"
                  v-model="tenantOccupiedToggle"
                  @input="onTenantToggleOff"
                />
              </div>

              <div v-if="tenantOccupiedToggle">
                <q-input
                  v-model="tenantOccupied.name"
                  label="Tenant Name"
                  borderless
                  class="required input-style input-field"
                />

                <div class="row justify-between">
                  <q-select
                    dense
                    v-model="tenantOccupied.type"
                    label="Type"
                    :options="contactTypes"
                    option-value="machineValue"
                    option-label="name"
                    map-options
                    options-dense
                    borderless
                    class="required col-5 input-style input-field"
                    emit-value
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'Please select phone type'
                    ]"
                  />
                  <q-input
                    dense
                    v-model.number="tenantOccupied.phone"
                    label="Phone"
                    mask="(###) ###-####"
                    borderless
                    class="required col-6 input-style input-field"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length == 14) ||
                        'Please enter the phone number'
                    ]"
                  />
                </div>
              </div>
            </q-card>
          </q-form>
          <br />
        </div>
        <div class="row justify-center q-mt-lg">
          <q-btn
            @click="onSaveButtonClick"
            label="Save"
            class="single-next-button-style"
          ></q-btn>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import CustomBar from 'components/CustomBar';
import { validateEmail, successMessage } from '@utils/validation';
import AddressService from '@utils/country';

import { dateWithTime } from '@utils/date';
import {
  onEmailClick,
  onPhoneNumberClick,
  sendMap,
  sendPhoneNumber,
  showPhoneNumber
} from '@utils/clickable';
import AutoCompleteAddress from 'components/AutoCompleteAddress';
import { constants } from '@utils/constant';
import { toGetStateShortName } from '@utils/common';

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
        houseNumber: '',
        address1: '',
        address2: '',
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
      phoneNumber: [
        {
          type: '',
          number: ''
        }
      ],
      clientAddressDetails: {
        houseNumber: '',
        addressCountry: '',
        addressRegion: '',
        addressLocality: '',
        postalCode: '',
        address1: '',
        address2: '',
        postOfficeBoxNumber: '',
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
  components: { AutoCompleteAddress, CustomBar },
  computed: {
    ...mapGetters([
      'editSelectedClient',
      'clientTypes',
      'titles',
      'contactTypes',
      'selectedClientId'
    ])
  },

  created() {
    this.countries = addressService.getCountries();
    this.onCountrySelect('United States');
  },

  methods: {
    ...mapActions([
      'getAllConfigurationTableData',
      'editClient',
      'getSingleClientDetails'
    ]),
    toGetStateShortName,
    sendMap,
    dateWithTime,
    showPhoneNumber,
    sendPhoneNumber,
    setTypes(types, data) {
      const obj = types.find(item => {
        return item.value === data.name;
      });

      data.id = obj.id;
      data.machineValue = obj.machineValue;
    },
    onEditClick() {
      this.editClientInfoDailog = true;
      this.getAllConfigurationTableData({ name: 'client_types' });
      this.getAllConfigurationTableData({ name: 'honorifics' });
      this.getAllConfigurationTableData({ name: 'phone_types' });

      if (this.editSelectedClient.attributes.type) {
        this.client = this.editSelectedClient.attributes.type;
      }
      if (this.editSelectedClient.attributes.insuredInfo.primary.honorific) {
        this.honorific1 =
          this.editSelectedClient.attributes.insuredInfo.primary.honorific;
      }

      this.insuredDetails.fname = this.editSelectedClient.attributes.insuredInfo
        .primary.fname
        ? this.editSelectedClient.attributes.insuredInfo.primary.fname
        : '';
      this.insuredDetails.lname = this.editSelectedClient.attributes.insuredInfo
        .primary.lname
        ? this.editSelectedClient.attributes.insuredInfo.primary.lname
        : '';

      if (this.editSelectedClient.attributes.isOrganizationPolicyholder) {
        this.policyHolder.isPolicyHolder = this.editSelectedClient.attributes
          .isOrganizationPolicyholder
          ? this.editSelectedClient.attributes.isOrganizationPolicyholder
          : false;
      }
      if (this.editSelectedClient.attributes.isOrganization) {
        this.primaryDetails.isOrganization = true;
        this.primaryDetails.isOrganization = this.editSelectedClient.attributes
          .isOrganization
          ? this.editSelectedClient.attributes.isOrganization
          : '';
        this.primaryDetails.organizationName = this.editSelectedClient
          .attributes.organizationName
          ? this.editSelectedClient.attributes.organizationName
          : '';
      }
      if (this.editSelectedClient.attributes.insuredInfo.primary.phoneNumber) {
        this.insuredDetails.type = this.editSelectedClient.attributes
          .insuredInfo.primary.phoneNumber[0].type
          ? this.editSelectedClient.attributes.insuredInfo.primary
              .phoneNumber[0].type
          : '';
        this.insuredDetails.phone = this.editSelectedClient.attributes
          .insuredInfo.primary.phoneNumber[0].number
          ? showPhoneNumber(
              this.editSelectedClient.attributes.insuredInfo.primary
                .phoneNumber[0].number
            )
          : '';
      }
      if (this.editSelectedClient.attributes.insuredInfo.primary.email) {
        this.insuredDetails.email =
          this.editSelectedClient.attributes.insuredInfo.primary.email;
      }

      if (this.editSelectedClient.attributes.insuredInfo.secondary) {
        this.isThereaCoInsuredToggle = true;
        if (
          this.editSelectedClient.attributes.insuredInfo.secondary.honorific
        ) {
          this.honorific2 =
            this.editSelectedClient.attributes.insuredInfo.secondary.honorific;
        }

        this.coInsuredDetails.fname = this.editSelectedClient.attributes
          .insuredInfo.secondary.fname
          ? this.editSelectedClient.attributes.insuredInfo.secondary.fname
          : '';
        this.coInsuredDetails.lname = this.editSelectedClient.attributes
          .insuredInfo.secondary.lname
          ? this.editSelectedClient.attributes.insuredInfo.secondary.lname
          : '';
        if (
          this.editSelectedClient.attributes.insuredInfo.secondary.phoneNumber
        ) {
          this.coInsuredDetails.type = this.editSelectedClient.attributes
            .insuredInfo.secondary.phoneNumber[0].type
            ? this.editSelectedClient.attributes.insuredInfo.secondary
                .phoneNumber[0].type
            : '';

          this.coInsuredDetails.phone = this.editSelectedClient.attributes
            .insuredInfo.secondary.phoneNumber[0].number
            ? showPhoneNumber(
                this.editSelectedClient.attributes.insuredInfo.secondary
                  .phoneNumber[0].number
              )
            : '';
        }

        this.coInsuredDetails.email = this.editSelectedClient.attributes
          .insuredInfo.secondary.email
          ? this.editSelectedClient.attributes.insuredInfo.secondary.email
          : '';
      }
      if (
        this.editSelectedClient.attributes.insuredInfo.phoneNumbers &&
        this.editSelectedClient.attributes.insuredInfo.phoneNumbers[0].number
      ) {
        this.addAditionalPhoneNumberToggle = true;
        this.phoneNumber = [];
        this.editSelectedClient.attributes.insuredInfo.phoneNumbers.forEach(
          val => {
            this.phoneNumber.push({
              type: val.type,
              number: showPhoneNumber(val.number)
            });
          }
        );
      } else {
        this.addAditionalPhoneNumberToggle = false;
      }
      if (this.editSelectedClient.attributes.insuredInfo.tenantInfo) {
        this.tenantOccupiedToggle = true;
        this.tenantOccupied.name = this.editSelectedClient.attributes
          .insuredInfo.tenantInfo.name
          ? this.editSelectedClient.attributes.insuredInfo.tenantInfo.name
          : '';
        this.tenantOccupied.type = this.editSelectedClient.attributes
          .insuredInfo.tenantInfo.phoneNumber.type
          ? this.editSelectedClient.attributes.insuredInfo.tenantInfo
              .phoneNumber.type
          : '';
        this.tenantOccupied.phone = this.editSelectedClient.attributes
          .insuredInfo.tenantInfo.phoneNumber.number
          ? showPhoneNumber(
              this.editSelectedClient.attributes.insuredInfo.tenantInfo
                .phoneNumber.number
            )
          : '';
      }
      // Client Address Editable & prefilled Details
      if (this.editSelectedClient.attributes.insuredInfo.mailingAddress) {
        this.clientAddressDetails.addressCountry = this.editSelectedClient
          .attributes.insuredInfo.mailingAddress.addressCountry
          ? this.editSelectedClient.attributes.insuredInfo.mailingAddress
              .addressCountry
          : null;
        this.clientAddressDetails.addressLocality =
          this.editSelectedClient.attributes.insuredInfo.mailingAddress.addressLocality;
        this.clientAddressDetails.addressRegion = this.editSelectedClient
          .attributes.insuredInfo.mailingAddress.addressRegion
          ? this.editSelectedClient.attributes.insuredInfo.mailingAddress
              .addressRegion
          : null;
        this.clientAddressDetails.houseNumber = this.editSelectedClient
          .attributes.insuredInfo.mailingAddress.houseNumber
          ? this.editSelectedClient.attributes.insuredInfo.mailingAddress
              .houseNumber
          : '';
        this.clientAddressDetails.postalCode = this.editSelectedClient
          .attributes.insuredInfo.mailingAddress.postalCode
          ? this.editSelectedClient.attributes.insuredInfo.mailingAddress
              .postalCode
          : '';
        this.clientAddressDetails.address1 = this.editSelectedClient.attributes
          .insuredInfo.mailingAddress.address1
          ? this.editSelectedClient.attributes.insuredInfo.mailingAddress
              .address1
          : '';
        this.clientAddressDetails.address2 = this.editSelectedClient.attributes
          .insuredInfo.mailingAddress.address2
          ? this.editSelectedClient.attributes.insuredInfo.mailingAddress
              .address2
          : '';
        if (
          this.editSelectedClient.attributes.insuredInfo.mailingAddress
            .dropBox &&
          this.editSelectedClient.attributes.insuredInfo.mailingAddress.dropBox
            .isPresent
        ) {
          this.clientAddressDetails.dropBox.isPresent =
            this.editSelectedClient.attributes.insuredInfo.mailingAddress.dropBox.isPresent;
          this.clientAddressDetails.dropBox.info =
            this.editSelectedClient.attributes.insuredInfo.mailingAddress.dropBox.info;
        }

        this.mailingAddressDetails =
          this.editSelectedClient.attributes.insuredInfo.mailingAddress;
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
    onTenantToggleOff() {
      if (!this.tenantOccupiedToggle) {
        this.tenantOccupied.name = '';
        this.tenantOccupied.type = '';
        this.tenantOccupied.phone = '';
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
    async onSaveButtonClick() {
      let phoneNumberArray = [];
      this.phoneNumber.forEach(val => {
        phoneNumberArray.push({
          type: val.type,
          number: sendPhoneNumber(val.number)
        });
      });

      let success = false;
      success = await this.$refs.clientForm.validate();
      if (success) {
        this.editClientInfoDailog = false;

        const payload = {
          id: this.editSelectedClient.id,
          clientData: {
            isOrganization: this.primaryDetails.isOrganization,
            organizationName: this.primaryDetails.organizationName,
            isOrganizationPolicyholder: this.policyHolder.isPolicyHolder,
            type: {
              ...this.client
            },
            insuredInfo: {
              primary: {
                honorific: {
                  id: this.honorific1.id,
                  value: this.honorific1.value,
                  machineValue: this.honorific1.machineValue
                },
                fname: this.insuredDetails.fname,
                lname: this.insuredDetails.lname,
                email: this.insuredDetails.email,
                phoneNumber: [
                  {
                    type: this.insuredDetails.type,
                    number: sendPhoneNumber(this.insuredDetails.phone)
                  }
                ]
              },
              secondary: {
                honorific: {
                  id: this.honorific2.id,
                  value: this.honorific2.value,
                  machineValue: this.honorific2.machineValue
                },
                fname: this.coInsuredDetails.fname,
                lname: this.coInsuredDetails.lname,
                email: this.coInsuredDetails.email,
                phoneNumber: [
                  {
                    type: this.coInsuredDetails.type,
                    number: sendPhoneNumber(this.coInsuredDetails.phone)
                  }
                ]
              },
              address: {
                ...this.clientAddressDetails
              },
              mailingAddress: {
                ...this.mailingAddressDetails
              },
              phoneNumbers: phoneNumberArray,
              tenantInfo: {
                name: this.tenantOccupied.name,
                phoneNumber: {
                  type: this.tenantOccupied.type,
                  number: sendPhoneNumber(this.tenantOccupied.phone)
                }
              }
            }
          }
        };
        if (!this.isThereaCoInsuredToggle) {
          delete payload.clientData.insuredInfo.secondary;
        }
        if (!this.tenantOccupiedToggle) {
          delete payload.clientData.insuredInfo.tenantInfo;
        }

        await this.editClient(payload);
        this.getSingleClientDetails(this.selectedClientId);

        this.$router.push('/view-client/' + this.selectedClientId);
      }
    },
    onCountrySelect(country) {
      this.states = addressService.getStates(country);
    },
    validateEmail,
    successMessage,
    setTitleName(val) {
      const titleResult = this.titles.find(obj => {
        return obj.value === this['honorific' + val].value;
      });
      this['honorific' + val].machineValue = titleResult.machineValue;
      this['honorific' + val].id = titleResult.id;
    },
    onPhoneNumberClick,
    onEmailClick
  }
};
</script>
<style lang="scss">
.clickLink {
  color: $primary;
}
.texts {
  margin-bottom: 0;
  font-size: 15px;
}

.form-height {
  height: calc(100vh - 130px);
  overflow: auto;
  margin: 10px;
}
</style>
