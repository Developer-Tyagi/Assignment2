<template>
  <q-page>
    <div
      :class="{
        'mobile-container-page-without-search': !$q.platform.is.iphone,
        'mobile-container-page': $q.platform.is.iphone
      }"
    >
      <div class="q-pa-lg column full-height">
        <!-- This is for showing the client details   -->

        <q-card class="q-pa-md q-mt-md full-width">
          <div class="row">
            <span class="form-heading">Insured Details</span><br />
            <q-icon
              name="create"
              color="primary"
              class="edit-icon"
              @click="editClientInfoDailog = true"
            ></q-icon>
          </div>
          {{ editSelectedClient.attributes.insuredInfo.primary.fname }}
          {{ editSelectedClient.attributes.insuredInfo.primary.lname }}
          <p class="texts">
            Mobile:
            <span
              class="clickLink"
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
                editSelectedClient.attributes.insuredInfo.primary.phoneNumber[0]
                  .number
              }}
            </span>
          </p>
          <p class="texts">
            Email:
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
            <span class="form-heading q-mt-none">Co-Insured Details</span>
            <br />
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

            <p class="texts">
              Mobile:
              <span
                v-if="editSelectedClient.attributes.insuredInfo.secondary"
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
                    ? editSelectedClient.attributes.insuredInfo.secondary
                        .phoneNumber[0].number
                    : '-'
                }}
              </span>
            </p>

            {{
              editSelectedClient.attributes.insuredInfo.secondary
                ? editSelectedClient.attributes.insuredInfo.secondary.email
                : '-'
            }}<br />
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
            {{
              editSelectedClient.attributes.insuredInfo.address.addressRegion
            }}
          </div>
          <div class="q-mt-md">
            <span class="form-heading q-mt-none">Additional Phone Numbers</span>
            <br />

            <div
              v-for="(phone, i) in editSelectedClient.attributes.insuredInfo
                .phoneNumbers"
            >
              <span
                class="clickLink"
                @click="onPhoneNumberClick(phone.number, $event)"
              >
                {{ phone.number ? phone.number : '-' }}</span
              >
            </div>
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
                  editSelectedClient.attributes.insuredInfo.tenantInfo
                    .phoneNumber.number,
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
              editSelectedClient.attributes.insuredInfo.mailingAddress
                .postalCode
                ? editSelectedClient.attributes.insuredInfo.mailingAddress
                    .postalCode
                : '-'
            }}<br />
            {{
              editSelectedClient.attributes.insuredInfo.mailingAddress.dropBox
                .info
                ? editSelectedClient.attributes.insuredInfo.mailingAddress
                    .dropBox.info
                : '-'
            }}
          </div>
        </q-card>
      </div>
    </div>
    <!-- Client Info Edit Dialog -->
    <q-dialog
      v-model="editClientInfoDailog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          :dialogName="'Client Info'"
          @closeDialog="editClientInfoDailog = false"
        />
        <q-card-section>
          <div class="mobile-container-page-without-search form-height">
            <q-form ref="clientForm">
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
              <div class="row">
                <p class="q-mx-none q-my-auto">Add aditional phone number(s)</p>
                <q-toggle
                  class="q-ml-auto"
                  v-model="addAditionalPhoneNumberToggle"
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
                      val =>
                        (val && val.length > 0) || 'Please select phone type'
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
              <!-- Mailing Address Details -->
              <div class="row">
                <p class="form-heading q-mx-none q-my-auto">
                  Is the mailing address same?
                </p>
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
          </div>

          <br />

          <q-btn
            @click="onSaveButtonClick"
            label="Save"
            color="primary"
            class="button-width-90"
            size="'xl'"
          ></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import CustomBar from 'components/CustomBar';
import { validateEmail } from '@utils/validation';
import AddressService from '@utils/country';
import AutoCompleteAddress from 'components/AutoCompleteAddress';

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
  mounted() {
    if (!this.selectedClientId) {
      this.$router.push('/clients');
    }
  },
  created() {
    this.getClientTypes();
    this.getTitles();
    this.getContactTypes();
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

    if (this.editSelectedClient.attributes.isOrganizationPolicyholder) {
      this.policyHolder.isPolicyHolder = this.editSelectedClient.attributes.isOrganizationPolicyholder;
    }
    if (this.editSelectedClient.attributes.isOrganization) {
      this.primaryDetails.isOrganization = true;
      this.primaryDetails.isOrganization = this.editSelectedClient.attributes.isOrganization;
      this.primaryDetails.organizationName = this.editSelectedClient.attributes.organizationName;
    }
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
    if (this.editSelectedClient.attributes.insuredInfo.phoneNumbers[0].type) {
      this.addAditionalPhoneNumberToggle = true;
      this.phoneNumber = this.editSelectedClient.attributes.insuredInfo.phoneNumbers;
    } else {
      this.addAditionalPhoneNumberToggle = false;
    }
    if (this.editSelectedClient.attributes.insuredInfo.tenantInfo.name) {
      this.tenantOccupiedToggle = true;
      this.tenantOccupied.name = this.editSelectedClient.attributes.insuredInfo.tenantInfo.name;
      this.tenantOccupied.type = this.editSelectedClient.attributes.insuredInfo.tenantInfo.phoneNumber.type;
      this.tenantOccupied.phone = this.editSelectedClient.attributes.insuredInfo.tenantInfo.phoneNumber.number;
    }
    // Client Address Editable & prefilled Details
    this.clientAddressDetails.addressCountry = this.editSelectedClient.attributes.insuredInfo.mailingAddress.addressCountry;
    this.clientAddressDetails.addressRegion = this.editSelectedClient.attributes.insuredInfo.mailingAddress.addressRegion;
    this.clientAddressDetails.addressLocality = this.editSelectedClient.attributes.insuredInfo.mailingAddress.addressLocality;
    this.clientAddressDetails.postalCode = this.editSelectedClient.attributes.insuredInfo.mailingAddress.postalCode;
    this.clientAddressDetails.streetAddress = this.editSelectedClient.attributes.insuredInfo.mailingAddress.streetAddress;
    this.clientAddressDetails.houseNumber = this.editSelectedClient.attributes.insuredInfo.mailingAddress.houseNumber;
    this.clientAddressDetails.dropBox.info = this.editSelectedClient.attributes.insuredInfo.mailingAddress.dropBox.info;
    this.clientAddressDetails.dropBox.isPresent = this.editSelectedClient.attributes.insuredInfo.mailingAddress.dropBox.isPresent;

    // Mailing  Address Editable & prefilled Details
    this.mailingAddressDetails.addressCountry = this.editSelectedClient.attributes.insuredInfo.mailingAddress.addressCountry;
    this.mailingAddressDetails.addressRegion = this.editSelectedClient.attributes.insuredInfo.mailingAddress.addressRegion;
    this.mailingAddressDetails.addressLocality = this.editSelectedClient.attributes.insuredInfo.mailingAddress.addressLocality;
    this.mailingAddressDetails.postalCode = this.editSelectedClient.attributes.insuredInfo.mailingAddress.postalCode;
    this.mailingAddressDetails.streetAddress = this.editSelectedClient.attributes.insuredInfo.mailingAddress.streetAddress;
    this.mailingAddressDetails.houseNumber = this.editSelectedClient.attributes.insuredInfo.mailingAddress.houseNumber;
    this.mailingAddressDetails.dropBox.info = this.editSelectedClient.attributes.insuredInfo.mailingAddress.dropBox.info;
    this.mailingAddressDetails.dropBox.isPresent = this.editSelectedClient.attributes.insuredInfo.mailingAddress.dropBox.isPresent;
  },

  methods: {
    ...mapActions([
      'getClientTypes',
      'getTitles',
      'editClient',
      'getContactTypes',
      'getSingleClientDetails'
    ]),
    setTypes(types, data) {
      const obj = types.find(item => {
        return item.id === data.id;
      });

      data.machineValue = obj.machineValue;
      data.value = obj.name;
    },
    // For adding multiple Contact Numbers in ClientInfo
    addAnotherContact() {
      this.phoneNumber.push({
        type: '',
        number: ''
      });
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
    async onSaveButtonClick() {
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
          }
        };
        if (!this.isThereaCoInsuredToggle) {
          delete payload.clientData.insuredInfo.secondary;
        }
        if (!this.tenantOccupiedToggle) {
          delete payload.clientData.insuredInfo.tenantInfo;
        }

        await this.editClient(payload);

        this.successMessage();

        this.$router.push('/view-client');
      }
    },
    onCountrySelect(country) {
      this.states = addressService.getStates(country);
    },
    validateEmail,
    successMessage() {
      this.$q.notify({
        type: 'positive',
        message: `Client Info Updated Successfully!`,
        position: 'center'
      });
    },
    setTitleName(val) {
      const titleResult = this.titles.find(obj => {
        return obj.id === this['honorific' + val].id;
      });
      this['honorific' + val].title = titleResult.value;
      this['honorific' + val].machineValue = titleResult.machineValue;
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
.form-height {
  height: calc(100vh - 145px);
  overflow: auto;
  margin: 10px;
}
</style>
