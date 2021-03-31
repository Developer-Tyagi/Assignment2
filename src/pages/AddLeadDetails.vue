<template>
  <q-page>
    <div
      :class="{
        'mobile-container-page-without-search': !$q.platform.is.iphone,
        'mobile-container-page': $q.platform.is.iphone
      }"
    >
      <q-stepper
        v-model="step"
        ref="stepper"
        color="primary"
        animated
        alternative-labels
        header-nav
      >
        <q-step
          :name="1"
          :done="step > 1"
          title="Primary Contact"
          :header-nav="step > 1"
        >
          <q-form @submit="step++">
            <q-card class="form-card q-pa-md">
              <span class="stepper-heading">Primary Contact </span>
              <q-select
                dense
                class="required"
                v-model="primaryDetails.honorific.id"
                :options="titles"
                option-value="id"
                option-label="value"
                map-options
                options-dense
                @input="setTitleName()"
                emit-value
                behavior="menu"
                label="Title"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please select the Title'
                ]"
              />

              <q-input
                dense
                class="required"
                v-model="primaryDetails.firstName"
                label="First Name"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please fill the first name'
                ]"
              />
              <q-input
                dense
                class="required"
                v-model="primaryDetails.lastName"
                label="Last Name"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please fill the last name'
                ]"
              />
              <div class="row justify-between">
                <q-select
                  dense
                  class="required col-5"
                  v-model="primaryDetails.selectedContactType"
                  :options="contactTypes"
                  option-value="machineValue"
                  option-label="name"
                  map-options
                  options-dense
                  emit-value
                  label="Type"
                  lazy-rules
                  :rules="[
                    val => (val && val.length > 0) || 'Please select phone type'
                  ]"
                />
                <q-input
                  dense
                  class="required col-6"
                  v-model.number="primaryDetails.phoneNumber"
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
                class="required"
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
                  dense
                  class="required"
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
        <q-step
          :name="2"
          :done="step > 2"
          title="Loss Details"
          :header-nav="step > 2"
        >
          <q-form @submit="step++" @reset="step--">
            <q-card class="q-pa-md form-card">
              <span class="stepper-heading">Loss Details</span>

              <div class="full-width">
                <q-input
                  dense
                  v-model="lossDetails.dateOfLoss"
                  mask="##/##/####"
                  label="MM/DD/YYYY"
                  lazy-rules
                  :rules="[val => validateDate(val) || 'Invalid date!']"
                >
                  <template v-slot:append>
                    <q-icon
                      name="event"
                      size="sm"
                      color="primary"
                      class="cursor-pointer"
                    >
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="lossDetails.dateOfLoss"
                          @input="() => $refs.qDateProxy.hide()"
                          mask="MM/DD/YYYY"
                        ></q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <q-select
                dense
                class=" input-extra-padding"
                v-model="lossDetails.causeOfLoss.id"
                option-value="id"
                option-label="name"
                map-options
                options-dense
                emit-value
                :options="lossCauses"
                @input="setTypes(lossCauses, lossDetails.causeOfLoss)"
                label="Cause of Loss"
              /><br />

              <q-input
                dense
                v-model="lossDetails.lossDesc"
                label="Brief description of loss"
              />
              <br />
              <span class="stepper-heading">Loss Location</span>
              <AutoCompleteAddress
                :address="lossAddress"
                :isDropBoxEnable="false"
                :isChecksEnable="true"
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
        </q-step>

        <q-step
          :name="3"
          :done="step > 3"
          title="Insurance"
          :header-nav="step > 3"
        >
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
                dense
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

        <q-step
          :name="4"
          :done="step > 4"
          title="Lead Source"
          :header-nav="step > 4"
        >
          <q-form @submit="step++" @reset="step--">
            <q-card class="q-pa-md form-card">
              <span class="stepper-heading">Choose Lead Source</span>
              <div>
                <q-select
                  dense
                  v-model="sourceDetails.type"
                  :options="leadSources"
                  option-label="name"
                  option-value="value"
                  options-dense
                  emit-value
                  map-options
                  @input="onChangingSourceType()"
                  class="input-extra-padding"
                />
                <q-input
                  dense
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

        <q-step :name="5" :done="step > 5" title="Notes" :header-nav="step > 5">
          <q-form @submit="step++" @reset="step--">
            <q-card class="q-pa-md form-card">
              <span class="stepper-heading">Last Notes</span>
              <q-input dense label="Last Notes" v-model="notes" type="input" />
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

        <q-step
          :name="6"
          :done="step > 6"
          title="Scheduling"
          :header-nav="step > 6"
        >
          <q-form @submit="onSubmit" @reset="step--">
            <q-card class="q-pa-md form-card">
              <div class="stepper-heading">Scheduling</div>

              <q-toggle
                v-model="schedulingDetails.isAutomaticScheduling"
                label="Is automatic scheduling needed?"
                left-label
              />
              <q-select
                dense
                class="required"
                v-model="schedulingDetails.inspectionType"
                :options="inspectionTypes"
                label="Type of Inspection"
                option-label="value"
                option-value="id"
                options-dense
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
                dense
                class="required input-extra-padding"
                v-if="showSubInspectionType"
                v-model="schedulingDetails.subInspectionType"
                :options="subInspectionTypes"
                option-label="value"
                option-value="id"
                options-dense
                emit-value
                label="Sub Type of Inspection"
                @input="onSubInspectionTypesSelect()"
                map-options
              />
              <q-input
                dense
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
        <CustomBar
          :dialogName="vendorDialogName"
          @closeDialog="vendorsListDialog = false"
        />
        <VendorsList
          :selective="true"
          @selectedVendor="onClosingVendorSelectDialog"
          ref="list"
          :showFilter="showVendorDialogFilters"
          :filterName="vendorDialogFilterByIndustry"
          :valueName="valueName"
          @addVendor="addVendorDialog = true"
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
          @onCloseAddVendor="onCloseAddVendorDialogBox"
          @closeDialog="closeAddVendorDialog"
          :componentName="vendorDialogName"
        />
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { validateEmail, validateDate } from '@utils/validation';
import { dateToSend } from '@utils/date';
import VendorsList from 'components/VendorsList';
import { constants } from '@utils/constant';
import AddVendor from 'components/AddVendor';
import CustomBar from 'components/CustomBar';
import AutoCompleteAddress from 'components/AutoCompleteAddress';
import { date } from 'quasar';

export default {
  components: {
    VendorsList,
    AddVendor,
    AutoCompleteAddress,
    CustomBar
  },

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
        dateOfLoss: '',
        causeOfLoss: {
          value: '',
          id: '',
          machineValue: ''
        }
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
      'getTitles',
      'getClients',
      'getVendors',
      'getLossCauses'
    ]),
    ...mapMutations(['setSelectedClient']),

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

    // This function value is coming through props form add-vendor Page!

    onCloseAddVendorDialogBox(result, selected, industryType) {
      if (result === true && industryType === 'carrier') {
        this.onClosingVendorSelectDialog(
          selected,
          selected.industry.machineValue
        );
      }
    },

    onClosingVendorSelectDialog(vendor, dialogName) {
      if (dialogName === constants.industries.VENDOR) {
        this.sourceDetails.id = vendor.id;
        this.sourceDetails.details = vendor.name;
      } else {
        this.insuranceDetails.carrierId = vendor.id;
        this.insuranceDetails.carrierName = vendor.name;
      }
      this.vendorsListDialog = false;
    },
    setTypes(types, data) {
      const obj = types.find(item => {
        return item.id === data.id;
      });

      data.machineValue = obj.machineValue;
      data.value = obj.name;
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
        lossCause: this.lossDetails.causeOfLoss.value
          ? this.lossDetails.causeOfLoss
          : null,

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
      this.addLeads(payload).then(() => {
        this.setSelectedClient();
      });
    },

    closeVendorsList() {
      this.vendorsListDialog = false;
    },

    validateEmail,
    validateDate,

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
        this.vendorsListDialog = false;
      }
      this.vendorsListDialog = false;
    }
  },

  computed: {
    ...mapGetters([
      'clients',
      'inspectionTypes',
      'leadSources',
      'contactTypes',
      'titles',
      'vendors',
      'lossCauses'
    ])
  },

  watch: {
    step(newValue, oldValue) {
      var el = document.getElementsByClassName('q-stepper__header');
      if (newValue === 6) {
        el[0].scroll(100, 0);
      } else if (newValue < 6) {
        el[0].scroll(-100, 0);
      }
    }
  },

  created() {
    //Current Date
    this.lossDetails.dateOfLoss = date.formatDate(Date.now(), 'MM/DD/YYYY');

    // TODO : Have to change primary details object, so that selected client can be assigned as it is.
    this.getInspectionTypes();
    this.getContactTypes();
    this.getTitles();
    this.getLossCauses();
    this.getClients().then(() => {
      if (this.$route.params.id) {
        let selectedClient = this.clients.find(
          client => client.id === this.$route.params.id
        );
        this.primaryDetails.honorific.id =
          selectedClient.insuredInfo.primary.honorific.id;
        this.primaryDetails.honorific.value =
          selectedClient.insuredInfo.primary.honorific.value;
        this.primaryDetails.honorific.machineValue =
          selectedClient.insuredInfo.primary.honorific.machineValue;

        this.primaryDetails.firstName =
          selectedClient.insuredInfo.primary.fname;
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
          this.primaryDetails.organizationName =
            selectedClient.organizationName;
        }
      }
    });
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
    padding: 10px 20px;
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
  max-height: calc(100vh - 280px);
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
