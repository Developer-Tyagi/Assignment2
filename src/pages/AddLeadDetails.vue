<template>
  <q-page>
    <CustomHeader
      @backButton="$router.push('/add-lead')"
      :showAddButton="false"
    />
    <div style="padding-top: 51px">
      <q-stepper
        v-model="step"
        ref="stepper"
        color="primary"
        animated
        alternative-labels
      >
        <q-step :name="1" :done="step > 1" title="Primary Contact">
          <q-form @submit="step++">
            <q-card class="form-card q-pa-md">
              <span class="stepper-heading">Primary Contact </span>
              <q-select
                v-model="primaryDetails.honorific.id"
                :options="titles"
                option-value="id"
                option-label="value"
                map-options
                @input="setTitleName()"
                emit-value
                label="Title"
                lazy-rules
                :rules="[val => (val && val.length > 0) || '']"
              />
              <q-input
                v-model="primaryDetails.firstName"
                label="First Name"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please fill the first name'
                ]"
              />
              <q-input
                v-model="primaryDetails.lastName"
                label="Last Name"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please fill the last name'
                ]"
              />
              <div class="row">
                <q-select
                  v-model="primaryDetails.selectedContactType"
                  :options="contactTypes"
                  option-value="machineValue"
                  option-label="name"
                  map-options
                  emit-value
                  style="width: 40%; margin-right: auto"
                  label="Type"
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || '']"
                />
                <q-input
                  v-model="primaryDetails.phoneNumber"
                  label="Phone"
                  type="number"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length == 10) ||
                      'Please fill the phone number'
                  ]"
                  style="width: 55%"
                />
              </div>
              <q-input
                v-model="primaryDetails.email"
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
                  Is policy holder an organization ?
                </p>
                <q-toggle
                  v-model="primaryDetails.isOrganization"
                  left-label
                  color="orange"
                  class="q-ml-auto"
                />
              </div>
              <div v-if="primaryDetails.isOrganization">
                <q-input
                  v-model="primaryDetails.organizationName"
                  label="Organization Name"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length > 0) ||
                      'Please fill the organization name '
                  ]"
                />
              </div>
            </q-card>
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
        </q-step>
        <q-step :name="2" :done="step > 2" title="Loss Details">
          <q-form @submit="step++" @reset="step--">
            <q-card class="q-pa-md form-card">
              <span class="stepper-heading">Loss Details</span>
              <q-input
                v-model="lossDetails.dateOfLoss"
                type="date"
                placeholder="Date of Loss"
              />
              <q-input
                v-model="lossDetails.lossDesc"
                label="Brief description of loss"
              />
              <br />
              <span class="stepper-heading">Loss Location</span>
              <AutoCompleteAddress
                :address="lossAddress"
                :isDropBoxEnable="false"
                :isChecksEnable="true"
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
                  @click="checkAddressField"
                />
              </div>
            </div>
          </q-form>
        </q-step>

        <q-step :name="3" :done="step > 3" title="Insurance">
          <q-form @submit="step++" @reset="step--">
            <q-card class="q-pa-md form-card">
              <span class="stepper-heading">Insurance Details (Optional)</span>

              <div
                v-model="insuranceDetails.carrierName"
                class="custom-select"
                @click="onAddVendorDialogClick(constants.industries.CARRIER)"
              >
                <div class="select-text">
                  {{
                    insuranceDetails.carrierName
                      ? insuranceDetails.carrierName
                      : 'Enter Carrier Details'
                  }}
                </div>
              </div>
              <q-input
                v-model="insuranceDetails.policyNumber"
                label="Policy Number"
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
        </q-step>

        <q-step :name="4" :done="step > 4" title="Lead Source">
          <q-form @submit="step++" @reset="step--">
            <q-card class="q-pa-md form-card">
              <span class="stepper-heading">Choose Lead Source</span>
              <div>
                <q-select
                  v-model="sourceDetails.type"
                  :options="leadSources"
                  option-label="name"
                  option-value="value"
                  emit-value
                  map-options
                  @input="onChangingSourceType()"
                />
                <q-input
                  v-if="
                    sourceDetails.type != constants.industries.VENDOR &&
                      sourceDetails.type != '' &&
                      sourceDetails.type != 'google'
                  "
                  type="text"
                  placeholder="Enter Source details"
                  v-model="sourceDetails.details"
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || '']"
                />
                <div
                  v-else-if="sourceDetails.type == constants.industries.VENDOR"
                  class="custom-select"
                  @click="onAddVendorDialogClick(constants.industries.VENDOR)"
                >
                  <div class="select-text">
                    {{
                      sourceDetails.id
                        ? sourceDetails.details
                        : 'Select Lead Source'
                    }}
                  </div>
                </div>
              </div>
            </q-card>
            <div class="row q-pt-md">
              <div>
                <q-btn
                  type="reset"
                  icon="keyboard_backspace"
                  text-color="primary"
                  padding="md"
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
        </q-step>

        <q-step :name="5" :done="step > 5" title="Notes">
          <q-form @submit="step++" @reset="step--">
            <q-card class="q-pa-md form-card">
              <p class="text-color-light-grey">Last Notes</p>
              <q-input
                v-model="notes"
                type="input"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please fill the notes'
                ]"
              />
            </q-card>
            <div class="row q-pt-md">
              <div>
                <q-btn
                  type="reset"
                  icon="keyboard_backspace"
                  text-color="primary"
                  padding="md"
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
        </q-step>

        <q-step :name="6" :done="step > 6" title="Scheduling">
          <q-form @submit="onSubmit" @reset="step--">
            <q-card class="q-pa-md form-card">
              <div class="stepper-heading">Scheduling</div>

              <q-toggle
                v-model="schedulingDetails.isAutomaticScheduling"
                label="Is automatic scheduling needed?"
                left-label
              />
              <q-select
                v-model="schedulingDetails.inspectionType"
                :options="inspectionTypes"
                label="Type of Inspection"
                option-label="value"
                option-value="id"
                emit-value
                map-options
                @input="onInspectionTypesSelect()"
                :rules="[
                  val =>
                    (val && val.length > 0) ||
                    'Please Choose the inspection type'
                ]"
              />
              <q-select
                v-if="showSubInspectionType"
                v-model="schedulingDetails.subInspectionType"
                :options="subInspectionTypes"
                option-label="value"
                option-value="id"
                emit-value
                label="Sub Type of Inspection"
                @input="onSubInspectionTypesSelect()"
                map-options
              />
              <q-input
                type="number"
                mask="#.#"
                step="0.5"
                v-model="schedulingDetails.inspectionDuration"
                label="Duration of Inspection (in hours)"
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
                <span class="q-mr-md text-color-grey"> Add Lead</span>
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
        </q-step>
      </q-stepper>
    </div>

    <q-dialog
      v-model="vendorsListDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-header bordered class="bg-white">
          <q-toolbar class="row bg-white">
            <img
              src="~assets/close.svg"
              alt="close"
              @click="vendorsListDialog = false"
              style="margin: auto 0"
            />
            <div class="text-uppercase text-bold text-black q-mx-auto">
              {{ vendorDialogName }}
            </div>
            <img
              src="~assets/add.svg"
              @click="addVendorDialog = true"
              style="margin: 0 0 0 20px"
            />
          </q-toolbar>
        </q-header>
        <VendorsList
          :selective="true"
          @selectedVendor="onClosingVendorSelectDialog"
          ref="list"
          :showFilter="showVendorDialogFilters"
          :filterName="vendorDialogFilterByIndustry"
          :valueName="valueName"
        />
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="addVendorDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <AddVendor
          @closeDialog="closeAddVendorDialog"
          :componentName="vendorDialogName"
        />
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { validateEmail } from '@utils/validation';
import { dateToSend } from '@utils/date';
import VendorsList from 'components/VendorsList';
import { constants } from '@utils/constant';
import AddVendor from 'components/AddVendor';
import AutoCompleteAddress from 'components/AutoCompleteAddress';
import CustomHeader from 'components/CustomHeader';

export default {
  components: { VendorsList, AddVendor, AutoCompleteAddress, CustomHeader },

  data() {
    return {
      valueName: '',
      constants: constants,
      subInspectionTypes: [],
      addVendorDialog: false,
      showSubInspectionType: false,
      vendorsListDialog: false,
      showVendorDialogFilters: false,
      vendorDialogName: '',
      vendorDialogFilterByIndustry: '',
      step: 1,
      primaryDetails: {
        isOrganization: false,
        organizationName: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',

        selectedContactType: '',
        honorific: {
          id: '',
          value: '',
          machineValue: ''
        }
      },
      lossDetails: {
        lossDesc: '',
        dateOfLoss: ''
      },
      lossAddress: {
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
      },
      insuranceDetails: {
        policyNumber: '',
        carrierName: '',
        carrierId: ''
      },
      sourceDetails: {
        id: '',
        type: '',
        details: ''
      },
      schedulingDetails: {
        isAutomaticScheduling: false,
        inspectionType: '',
        subInspectionType: '',
        subInspectionMachineValue: '',
        inspectionDuration: '',
        subInspectionTypeValue: ''
      },
      notes: '',
      vendorSelected: '',
      industryTypes: ['Association']
    };
  },

  methods: {
    ...mapActions([
      'addLeads',
      'getInspectionTypes',
      'addVendor',
      'getContactTypes',
      'getTitles'
    ]),
    checkAddressField() {
      if (this.lossAddress.streetAddress) {
        this.step = 3;
      } else {
        this.$q.notify({
          message: 'Please fill this Street Address',
          position: 'top',
          type: 'negative'
        });
      }
    },

    onAddVendorDialogClick(name) {
      this.valueName = name;
      this.vendorDialogName = name;
      if (name === constants.industries.CARRIER) {
        this.showVendorDialogFilters = false;
        this.vendorDialogFilterByIndustry = constants.industries.CARRIER;
      } else {
        this.showVendorDialogFilters = true;
        this.vendorDialogFilterByIndustry = '';
      }
      this.vendorsListDialog = true;
    },

    onClosingVendorSelectDialog(vendor, dialogName) {
      if (dialogName) {
        this.sourceDetails.id = vendor.id;
        this.sourceDetails.details = vendor.name;
      } else {
        this.insuranceDetails.carrierId = vendor.id;
        this.insuranceDetails.carrierName = vendor.name;
      }
      this.vendorsListDialog = false;
    },

    setTitleName() {
      const title = this.titles.find(obj => {
        return obj.id === this.primaryDetails.honorific.id;
      });

      this.primaryDetails.honorific.value = title.value;

      this.primaryDetails.honorific.machineValue = title.machineValue;
    },

    onInspectionTypesSelect() {
      const selectedInspectionType = this.inspectionTypes.find(
        type => type.id === this.schedulingDetails.inspectionType
      );
      if (selectedInspectionType.subtypes.length > 1) {
        this.subInspectionTypes = selectedInspectionType.subtypes;
        this.schedulingDetails.subInspectionType = '';
        this.schedulingDetails.inspectionDuration = '';
        this.schedulingDetails.subInspectionTypeValue = '';
        this.showSubInspectionType = true;
      } else {
        this.showSubInspectionType = false;
        this.schedulingDetails.subInspectionType =
          selectedInspectionType.subtypes[0].id;
        this.schedulingDetails.inspectionDuration =
          selectedInspectionType.subtypes[0].duration;
        this.schedulingDetails.subInspectionTypeValue =
          selectedInspectionType.subtypes[0].value;
        this.schedulingDetails.subInspectionMachineValue =
          selectedInspectionType.subtypes[0].machineValue;
      }
    },

    onSubInspectionTypesSelect() {
      const index = this.subInspectionTypes.findIndex(
        val => val.id === this.schedulingDetails.subInspectionType
      );
      this.schedulingDetails.inspectionDuration = this.subInspectionTypes[
        index
      ].duration;
      this.schedulingDetails.subInspectionTypeValue = this.subInspectionTypes[
        index
      ].value;
      this.schedulingDetails.subInspectionMachineValue = this.subInspectionTypes[
        index
      ].machineValue;
    },

    onSubmit() {
      const payload = {
        isOrganization: this.primaryDetails.isOrganization,
        primaryContact: {
          honorific: {
            id: this.primaryDetails.honorific.id,
            value: this.primaryDetails.honorific.value,
            machineValue: this.primaryDetails.honorific.machineValue
          },
          fname: this.primaryDetails.firstName,
          lname: this.primaryDetails.lastName,
          email: this.primaryDetails.email,
          phoneNumber: []
        },
        lossLocation: {
          ...this.lossAddress
        },
        lossDesc: this.lossDetails.lossDesc,
        dateofLoss: dateToSend(this.lossDetails.dateOfLoss),

        policyNumber: this.insuranceDetails.policyNumber,
        isAutomaticScheduling: this.schedulingDetails.isAutomaticScheduling,
        notes: this.notes,
        inspectionInfo: {
          id: this.schedulingDetails.inspectionType,
          duration: parseFloat(this.schedulingDetails.inspectionDuration),
          value: this.schedulingDetails.subInspectionTypeValue,
          machineValue: this.schedulingDetails.subInspectionMachineValue
        },
        leadSource: {
          id: '',
          type: this.sourceDetails.type,
          detail: this.sourceDetails.details
        },
        carrier: {
          id: '',
          value: ''
        }
      };

      if (payload['isOrganization']) {
        payload['organizationName'] = this.primaryDetails.organizationName;
      }
      if (this.insuranceDetails.carrierId) {
        payload['carrier']['id'] = this.insuranceDetails.carrierId;
        payload['carrier']['value'] = this.insuranceDetails.carrierName;
      } else {
        delete payload['carrier'];
      }
      if (this.primaryDetails.phoneNumber) {
        payload.primaryContact['phoneNumber'].push({
          type: this.primaryDetails.selectedContactType,
          number: this.primaryDetails.phoneNumber
        });
      }
      if (this.sourceDetails.type == constants.industries.VENDOR) {
        payload.leadSource.id = this.sourceDetails.id;
      } else {
        payload.leadSource.details = this.sourceDetails.details;
      }
      this.addLeads(payload);
    },

    closeVendorsList() {
      this.vendorsListDialog = false;
    },

    validateEmail,

    onChangingSourceType() {
      this.sourceDetails.id = '';
      this.sourceDetails.details = '';
    },

    addSelectedVendor(e) {
      this.sourceDetails = {
        id: e.id,
        details: e.name
      };
      this.closeVendorsList();
    },

    closeAddVendorDialog(e) {
      this.addVendorDialog = false;
      this.vendorsListDialog = true;
      if (e) {
        if (this.vendorDialogName === constants.industries.CARRIER) {
          let params = {
            industry: constants.industries.CARRIER,
            name: ''
          };
          this.$refs.list.getVendors(params);
        } else {
          this.$refs.list.getVendors();
        }
      }
    }
  },

  computed: {
    ...mapGetters([
      'clients',
      'inspectionTypes',
      'leadSources',
      'contactTypes',
      'titles'
    ])
  },

  watch: {
    step(newValue, oldValue) {
      var el = document.getElementsByClassName('q-stepper__header');
      if (newValue === 6 && oldValue === 5) {
        el[0].scroll(100, 0);
      } else if (newValue === 5 && oldValue === 6) {
        el[0].scroll(-100, 0);
      }
    }
  },

  created() {
    // TODO : Have to change primary details object, so that selected client can be assigned as it is.
    if (this.$route.params.id) {
      let selectedClient = this.clients.find(
        client => client.id === this.$route.params.id
      );
      this.primaryDetails.honorific.id =
        selectedClient.insuredInfo.primary.honorific.id;
      this.primaryDetails.honorific.value =
        selectedClient.insuredInfo.primary.honorific.value;
      this.primaryDetails.firstName = selectedClient.insuredInfo.primary.fname;
      this.primaryDetails.lastName = selectedClient.insuredInfo.primary.lname;
      this.primaryDetails.email = selectedClient.insuredInfo.primary.email;
      this.primaryDetails.phoneNumber =
        selectedClient.insuredInfo.primary.phoneNumber[0].number;
      this.primaryDetails.selectedContactType =
        selectedClient.insuredInfo.primary.phoneNumber[0].type;
      this.primaryDetails.isOrganization = selectedClient.isOrganization
        ? true
        : false;
      if (this.primaryDetails.isOrganization) {
        this.primaryDetails.organizationName = selectedClient.organizationName;
      }
    }
    this.getInspectionTypes();
    this.getContactTypes();
    this.getTitles();
  }
};
</script>

<style lang="scss">
.q-stepper {
  box-shadow: none;

  .q-stepper__header {
    flex-wrap: nowrap;
    overflow: auto;
  }
  .q-stepper__tab {
    width: 80px;
  }

  .q-stepper__tab--active {
    .q-stepper__title {
      color: #333333;
    }
  }
  .q-stepper__step-inner {
    padding: 10px;
  }

  .q-stepper__nav {
    padding: 24px;
  }
  .q-stepper__dot {
    font-size: 12px;
    width: 20px;
    min-width: 20px;
    height: 20px;
  }

  .q-stepper__title {
    color: #cccccc;
    font-size: 10px;
    text-align: center;
  }
}

.stepper-heading {
  color: #333333;
  font-weight: bold;
  font-size: 14px;
}
.text-color-grey {
  color: #333333;
}
.text-color-light-grey {
  color: #999999;
}

.form-card {
  min-height: 250px;
  max-height: calc(100vh - 250px);
  overflow: scroll;
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
</style>
