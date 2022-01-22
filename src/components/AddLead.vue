<template>
  <q-page>
    <div>
      <div class="stepper">
        <div class="step justify-between" id="step">
          <div
            class="column align-center q-px-xs"
            v-for="(arr, index) in stepArr"
            :key="index"
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
            ref="primary"
          >
            <q-card class="form-card q-pa-md">
              <div class="stepper-heading">Primary Contact</div>
              <q-select
                dense
                borderless
                class="input-style required"
                v-model="primaryDetails.honorific.value"
                :options="titles"
                option-value="value"
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
                borderless
                class="input-style required"
                v-model="primaryDetails.firstName"
                label="First Name"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please fill the first name'
                ]"
              />
              <q-input
                dense
                borderless
                class="input-style required"
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
                  borderless
                  class="input-style required col-5"
                  v-model="primaryDetails.selectedContactType"
                  :options="contactTypes"
                  option-value="machineValue"
                  option-label="name"
                  map-options
                  options-dense
                  behavior="menu"
                  emit-value
                  label="Type"
                  lazy-rules
                  :rules="[
                    val => (val && val.length > 0) || 'Please select phone type'
                  ]"
                />
                <q-input
                  dense
                  borderless
                  class="input-style required col-6"
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
                borderless
                class="input-style required"
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
                  class="q-ml-auto"
                />
              </div>
              <div v-if="primaryDetails.isOrganization">
                <q-input
                  dense
                  borderless
                  class="input-style required"
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
            <div class="row q-mt-md justify-center">
              <q-btn
                class="single-next-button-style"
                label="Next"
                type="submit"
              />
            </div>
          </q-form>
          <q-form
            @submit="onNextButtonClick(1)"
            @reset="onBackButtonClick(1)"
            :hidden="step != 1"
            ref="loss"
          >
            <q-card class="q-pa-md form-card">
              <span class="stepper-heading">Loss Details</span>

              <div class="full-width">
                <q-input
                  class="input-style"
                  dense
                  borderless
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
                borderless
                class="input-style q-select-style input-extra-padding"
                v-model="lossDetails.causeOfLoss.value"
                option-value="name"
                option-label="name"
                map-options
                options-dense
                use-input
                input-debounce="0"
                behavior="menu"
                emit-value
                :options="lossCauseOptions"
                @input="setTypes(lossCauses, lossDetails.causeOfLoss)"
                @filter="searchByCause"
                label="Cause of Loss"
              />

              <q-input
                v-if="lossDetails.causeOfLoss.value != 'None'"
                class="input-style required"
                borderless
                dense
                v-model="lossDetails.lossDesc"
                label="Brief description of loss"
                lazy-rules
                :rules="[
                  val =>
                    (val && val.length > 0) || 'Please fill the description'
                ]"
              />
              <div class="stepper-heading q-pt-md">Loss Location</div>
              <AutoCompleteAddress
                :id="'LeadLoss'"
                :address="lossAddress"
                :isDropBoxEnable="false"
                :isChecksEnable="true"
                :isAsteriskMark="true"
                :value="true"
                :view="'mobile'"
              />
            </q-card>
            <div class="row q-mt-lg justify-center">
              <div style="width: 90%">
                <q-btn class="back-button-style" type="reset" label="Back" />
                <q-btn class="next-button-style" type="submit" label="Next" />
              </div>
            </div>
          </q-form>
          <q-form
            @submit="onNextButtonClick(2)"
            @reset="onBackButtonClick(2)"
            :hidden="step != 2"
            ref="insurance"
          >
            <q-card class="q-pa-md form-card">
              <span class="stepper-heading">Insurance Details (Optional)</span>

              <div
                class
                @click="carriersListDialog = true"
                v-if="!insuranceDetails.carrierName"
              >
                <div class="input-style button-style cursor-pointer q-my-md">
                  <div class="text-center q-my-sm">
                    Click for choosing a carrier
                  </div>
                </div>
              </div>
              <div>
                <q-card
                  bordered
                  v-if="insuranceDetails.carrierName"
                  @click="carriersListDialog = true"
                  class="q-my-md q-pa-md"
                >
                  <div class="text-bold">
                    {{ insuranceDetails.carrierName }}
                  </div>
                  <div
                    v-if="
                      insuranceDetails.address &&
                        insuranceDetails.address.address1
                    "
                  >
                    <div>
                      {{
                        insuranceDetails.address
                          ? insuranceDetails.address.houseNumber
                          : '-'
                      }}
                      {{
                        insuranceDetails.address.address1
                          ? insuranceDetails.address.address1
                          : '-'
                      }}
                    </div>
                    <div
                      v-if="
                        insuranceDetails.address &&
                          insuranceDetails.address.address2
                      "
                    >
                      {{ insuranceDetails.address.address2 }}
                    </div>
                    <div class="row">
                      {{
                        insuranceDetails.address.addressLocality
                          ? insuranceDetails.address.addressLocality
                          : '-'
                      }}
                      ,
                      {{
                        insuranceDetails.address.addressRegion
                          ? toGetStateShortName(
                              insuranceDetails.address.addressRegion
                            )
                          : '-'
                      }}
                      {{
                        insuranceDetails.address.postalCode
                          ? insuranceDetails.address.postalCode
                          : '-'
                      }}
                    </div>
                  </div>

                  <div>
                    Phone:
                    <span
                      class="clickLink"
                      @click="
                        onPhoneNumberClick(insuranceDetails.phone, $event)
                      "
                      >{{ showPhoneNumber(insuranceDetails.phone) }}</span
                    >
                  </div>
                  <div>
                    Email:
                    <span
                      class="clickLink"
                      @click="onEmailClick(insuranceDetails.email, $event)"
                      >{{ insuranceDetails.email }}</span
                    >
                  </div>
                </q-card>
              </div>
              <q-input
                class="input-style"
                dense
                borderless
                v-model="insuranceDetails.policyNumber"
                label="Policy Number"
              />
            </q-card>
            <div class="row q-mt-lg justify-center">
              <div style="width: 90%">
                <q-btn class="back-button-style" type="reset" label="Back" />
                <q-btn class="next-button-style" type="submit" label="Next" />
              </div>
            </div>
          </q-form>
          <q-form
            @submit="onNextButtonClick(3)"
            @reset="onBackButtonClick(3)"
            :hidden="step != 3"
            ref="source"
          >
            <q-card class="q-pa-md form-card">
              <span class="stepper-heading">Choose Lead Source</span>
              <div>
                <q-select
                  dense
                  borderless
                  v-model="sourceDetails.type"
                  :options="leadSource"
                  option-label="name"
                  option-value="value"
                  use-input
                  input-debounce="0"
                  behavior="menu"
                  options-dense
                  emit-value
                  map-options
                  @input="onChangingSourceType()"
                  @filter="searchBySource"
                  class="input-style q-select-style input-extra-padding"
                />
                <q-input
                  borderless
                  class="input-style"
                  dense
                  v-if="
                    sourceDetails.type != constants.industries.VENDOR &&
                      sourceDetails.type != '' &&
                      sourceDetails.type != 'google' &&
                      sourceDetails.type != 'client' &&
                      sourceDetails.type != 'none'
                  "
                  type="text"
                  placeholder="Enter Source details"
                  v-model="sourceDetails.details"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'Please select source detail'
                  ]"
                />
                <div
                  v-else-if="sourceDetails.type == constants.industries.VENDOR"
                >
                  <div
                    class="q-mt-md"
                    @click="vendorsListDialog = true"
                    v-if="!sourceDetails.email"
                  >
                    <q-btn
                      rounded
                      class="text-center full-width"
                      label="Click for choosing a vendor"
                    ></q-btn>
                  </div>
                  <q-card
                    bordered
                    v-if="sourceDetails.email"
                    @click="vendorsListDialog = true"
                    class="q-my-md q-pa-md"
                  >
                    <div class="text-bold">{{ sourceDetails.companyName }}</div>
                    <div>{{ sourceDetails.details }}</div>

                    <div
                      v-if="
                        sourceDetails.mailingAddress &&
                          sourceDetails.mailingAddress.address1
                      "
                    >
                      <div>
                        {{
                          sourceDetails.mailingAddress
                            ? sourceDetails.mailingAddress.houseNumber
                            : '-'
                        }}
                        ,
                        {{
                          sourceDetails.mailingAddress.address1
                            ? sourceDetails.mailingAddress.address1
                            : '-'
                        }}
                      </div>
                      <div
                        v-if="
                          sourceDetails.mailingAddress &&
                            sourceDetails.mailingAddress.address2
                        "
                      >
                        {{ sourceDetails.mailingAddress.address2 }}
                      </div>
                      <div class="row">
                        {{
                          sourceDetails.mailingAddress.addressLocality
                            ? sourceDetails.mailingAddress.addressLocality
                            : '-'
                        }}
                        ,
                        {{
                          sourceDetails.mailingAddress.addressRegion
                            ? toGetStateShortName(
                                sourceDetails.mailingAddress.addressRegion
                              )
                            : '-'
                        }}
                        {{
                          sourceDetails.mailingAddress.postalCode
                            ? sourceDetails.mailingAddress.postalCode
                            : '-'
                        }}
                      </div>
                    </div>
                    <div>
                      Phone:
                      <span
                        class="clickLink"
                        @click="onPhoneNumberClick(sourceDetails.phone, $event)"
                        >{{ showPhoneNumber(sourceDetails.phone) }}</span
                      >
                    </div>
                    <div>
                      Email:
                      <span
                        class="clickLink"
                        @click="onEmailClick(sourceDetails.email, $event)"
                        >{{ sourceDetails.email }}</span
                      >
                    </div>
                  </q-card>
                </div>
                <div v-else-if="sourceDetails.type == 'client'">
                  <q-select
                    borderless
                    dense
                    class="input-style full-width input-extra-padding"
                    v-model="sourceDetails.details"
                    use-input
                    input-debounce="0"
                    option-label="name"
                    label="Search"
                    :options="clientOptions"
                    @filter="searchFilterBy"
                    option-value="name"
                    behavior="menu"
                    options-dense
                    emit-value
                    map-options
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'Please select the client'
                    ]"
                  >
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-black"
                          >No results</q-item-section
                        >
                      </q-item>
                    </template>
                  </q-select>
                </div>
              </div>
            </q-card>
            <div class="row q-mt-lg justify-center">
              <div style="width: 90%">
                <q-btn class="back-button-style" type="reset" label="Back" />
                <q-btn class="next-button-style" type="submit" label="Next" />
              </div>
            </div>
          </q-form>
          <q-form
            @submit="onNextButtonClick(4)"
            @reset="onBackButtonClick(4)"
            :hidden="step != 4"
            ref="note"
          >
            <q-card class="q-pa-md form-card">
              <span class="stepper-heading">Notes</span>
              <q-input
                class="input-style"
                borderless
                dense
                label="Notes"
                v-model="notes"
                type="textarea"
              />
            </q-card>
            <div class="row q-mt-lg justify-center">
              <div style="width: 90%">
                <q-btn class="back-button-style" type="reset" label="Back" />
                <q-btn class="next-button-style" type="submit" label="Next" />
              </div>
            </div>
          </q-form>
          <q-form
            @submit="onSubmit"
            @reset="onBackButtonClick(5)"
            :hidden="step != 5"
            ref="schedule"
          >
            <q-card class="q-pa-md form-card">
              <div class="stepper-heading">Scheduling</div>

              <q-toggle
                v-model="schedulingDetails.isAutomaticScheduling"
                label="Is scheduling needed?"
                left-label
              />
              <q-select
                dense
                borderless
                v-if="schedulingDetails.isAutomaticScheduling"
                :class="{ required: schedulingDetails.isAutomaticScheduling }"
                v-model="schedulingDetails.inspectionTypeId"
                :options="inspectionTypes"
                label="Type of Inspection"
                class="input-style"
                option-label="value"
                option-value="id"
                options-dense
                emit-value
                behavior="menu"
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
                borderless
                v-if="
                  schedulingDetails.isAutomaticScheduling &&
                    showSubInspectionType
                "
                class="input-style required input-extra-padding"
                v-model="schedulingDetails.subInspection"
                :options="subInspectionTypes"
                option-label="value"
                option-value="machineValue"
                options-dense
                emit-value
                label="Sub Type of Inspection"
                @input="
                  onSubInspectionTypesSelect(schedulingDetails.subInspection)
                "
                map-options
                :rules="[
                  val =>
                    (val && val.length > 0) ||
                    'Please Choose the inspection type'
                ]"
              />
              <q-input
                class="input-style"
                v-if="schedulingDetails.isAutomaticScheduling"
                dense
                borderless
                style="height: 58px"
                type="number"
                mask="#.#"
                step="0.5"
                v-model="schedulingDetails.inspectionDuration"
                label="Duration of Inspection (in hours)"
              />
            </q-card>
            <div class="row q-mt-lg justify-center">
              <div style="width: 90%">
                <q-btn class="back-button-style" type="reset" label="Back" />
                <q-btn class="next-button-style" type="submit" label="Next" />
              </div>
            </div>
          </q-form>
        </div>
      </div>
    </div>

    <!-- vendor list dialogbox -->
    <q-dialog
      v-model="vendorsListDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          :dialogName="constants.industries.VENDOR"
          @closeDialog="vendorsListDialog = false"
        />
        <VendorsList
          :selectVendor="true"
          :showVendorDetails="false"
          @addVendor="
            vendorsListDialog = false;
            addVendorDialog = true;
          "
          :showFilter="true"
          :selectedVendorName="sourceDetails.details"
          @afterSelecting="onSelectingVendorList"
        />
      </q-card>
    </q-dialog>
    <!-- carrier list dialogbox  -->
    <q-dialog
      v-model="carriersListDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          :dialogName="constants.industries.CARRIER"
          @closeDialog="carriersListDialog = false"
        />
        <CarriersList
          :selectCarrier="true"
          :showCarrierDetails="false"
          :claimCarrier="false"
          :selectedCarrierName="insuranceDetails.carrierName"
          @addCarrier="
            carriersListDialog = false;
            addCarrierDialog = true;
          "
          @afterSelecting="onSelectingCarrierList"
        />
      </q-card>
    </q-dialog>
    <!-- add vendor dialog -->
    <q-dialog
      v-model="addVendorDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <AddVendor
          :componentName="'Add Vendor'"
          @onCloseAddVendor="onCloseAddVendorDialogBox"
          @closeDialog="addVendorDialog = false"
        />
      </q-card>
    </q-dialog>
    <!-- add carrier dialog -->
    <q-dialog
      v-model="addCarrierDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <AddCarrier
          @onCloseAddCarrier="onCloseAddCarrierDialogBox"
          @closeDialog="addCarrierDialog = false"
        />
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { validateEmail, validateDate, successMessage } from '@utils/validation';
import { toGetStateShortName } from '@utils/common';
import {
  onPhoneNumberClick,
  onEmailClick,
  sendPhoneNumber,
  showPhoneNumber
} from '@utils/clickable';

import { dateToSend } from '@utils/date';
import { constants } from '@utils/constant';
import { date } from 'quasar';
import VendorsList from 'components/VendorsList';
import CarriersList from 'components/CarriersList';
import AddVendor from 'components/AddVendor';
import AddCarrier from 'components/AddCarrier';
import CustomBar from 'components/CustomBar';
import AutoCompleteAddress from 'components/AutoCompleteAddress';
import { dateToShow } from '@utils/date';
import { Platform } from 'quasar';
export default {
  components: {
    VendorsList,
    AddVendor,
    CarriersList,
    AddCarrier,
    AutoCompleteAddress,
    CustomBar
  },
  props: {
    isEdit: {
      type: Boolean
    },
    addLead: {
      type: Boolean
    }
  },
  data() {
    return {
      lossCauseOptions: [],
      leadSource: [],
      valueName: '',
      step: 0,
      stepClickValidTill: 0,
      clientOptions: [],
      stepArr: [
        { name: 'primary contact', ref: 'primary' },
        { name: 'loss details', ref: 'loss' },
        { name: 'insurance', ref: 'insurance' },
        { name: 'lead source', ref: 'source' },
        { name: 'notes', ref: 'notes' },
        { name: 'scheduling', ref: 'schedule' }
      ],
      constants: constants,
      subInspectionTypes: [],
      addVendorDialog: false,
      showSubInspectionType: false,
      vendorsListDialog: false,
      carriersListDialog: false,
      addCarrierDialog: false,
      showVendorDialogFilters: false,
      vendorDialogName: '',
      vendorDialogFilterByIndustry: '',
      primaryDetails: {
        isOrganization: false,
        organizationName: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',

        selectedContactType: 'Main',
        honorific: {
          id: '',
          value: 'Mr.',
          machineValue: 'mr_'
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
        address1: '',
        address2: '',
        postOfficeBoxNumber: '',
        dropBox: {
          info: '',
          isPresent: false
        }
      },
      insuranceDetails: {
        policyNumber: '',
        carrierName: '',
        carrierId: '',
        address: {},
        email: ''
      },
      sourceDetails: {
        id: '',
        type: '',
        details: '',
        mailingAddress: {},
        phone: {},
        email: '',
        companyName: ''
      },
      schedulingDetails: {
        isAutomaticScheduling: false,
        inspectionTypeId: '',
        subInspectionType: '',
        subInspectionMachineValue: '',
        inspectionDuration: '',
        subInspectionTypeValue: '',
        inspectionTypeMachineValue: '',
        inspectionTypeValue: ''
      },
      notes: '',
      vendorSelected: '',
      industryTypes: ['Association']
    };
  },

  methods: {
    ...mapActions([
      'getArchivedLeadsList',
      'getVendorDetails',
      'getVendors',
      'getClients',
      'addLeads',
      'addVendor',
      'getAllConfigurationTableData',
      'getClients',
      'getVendors',
      'editLeadDetails',
      'getActiveLeadsList'
    ]),

    ...mapMutations([
      'setSelectedClient',
      'isLastRouteEdit',
      'setConvertedLead'
    ]),

    successMessage,
    toGetStateShortName,
    onPhoneNumberClick,
    onEmailClick,
    dateToShow,
    sendPhoneNumber,
    showPhoneNumber,
    setTypes(types, data) {
      const obj = types.find(item => {
        return item.name === data.value;
      });

      data.machineValue = obj.machineValue;
      data.id = obj.id;
    },
    searchByCause(val, update) {
      this.lossDetails.causeOfLoss.id = null;
      if (val === ' ') {
        update(() => {
          this.lossCauseOptions = this.lossCauses;
        });
        return;
      }

      update(() => {
        const search = val.toLowerCase();
        this.lossCauseOptions = this.lossCauses.filter(
          v => v.name.toLowerCase().indexOf(search) > -1
        );
      });
    },

    setTitleName() {
      const title = this.titles.find(obj => {
        return obj.value === this.primaryDetails.honorific.value;
      });
      this.primaryDetails.honorific.machineValue = title.machineValue;

      this.primaryDetails.honorific.id = title.id;
    },
    searchBySource(val, update) {
      this.sourceDetails.type = null;
      if (val === ' ') {
        update(() => {
          this.leadSource = this.leadSources;
        });
        return;
      }

      update(() => {
        const search = val.toLowerCase();
        this.leadSource = this.leadSources.filter(
          v => v.name.toLowerCase().indexOf(search) > -1
        );
      });
    },

    onInspectionTypesSelect() {
      const selectedInspectionType = this.inspectionTypes.find(
        type => type.id === this.schedulingDetails.inspectionTypeId
      );
      if (
        selectedInspectionType &&
        selectedInspectionType.subtypes &&
        selectedInspectionType.subtypes.length > 1
      ) {
        this.subInspectionTypes = selectedInspectionType.subtypes;
        this.schedulingDetails.subInspectionType = '';
        this.schedulingDetails.inspectionDuration = '';
        this.schedulingDetails.subInspectionTypeValue = '';
        this.showSubInspectionType = true;
        this.schedulingDetails.inspectionTypeValue =
          selectedInspectionType && selectedInspectionType.value
            ? selectedInspectionType.value
            : '';
        this.schedulingDetails.inspectionTypeMachineValue =
          selectedInspectionType && selectedInspectionType.machineValue
            ? selectedInspectionType.machineValue
            : '';
      } else {
        this.schedulingDetails.inspectionTypeValue =
          selectedInspectionType && selectedInspectionType.value
            ? selectedInspectionType.value
            : '';
        this.schedulingDetails.inspectionTypeMachineValue =
          selectedInspectionType && selectedInspectionType.machineValue
            ? selectedInspectionType.machineValue
            : '';
        this.showSubInspectionType = false;

        this.schedulingDetails.inspectionDuration =
          selectedInspectionType && selectedInspectionType.subtypes[0].duration
            ? selectedInspectionType.subtypes[0].duration
            : '';
      }
    },

    onSubInspectionTypesSelect(subVal) {
      const index = this.subInspectionTypes.findIndex(
        val => val.machineValue === subVal
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

    async onSubmit() {
      const payload = {
        id: this.selectedLead.id,
        data: {
          isOrganization: this.primaryDetails.isOrganization,
          organizationName: this.primaryDetails.organizationName,
          primaryContact: {
            honorific: {
              id: this.primaryDetails.honorific.id,
              value: this.primaryDetails.honorific.value,
              machineValue: this.primaryDetails.honorific.machineValue
            },
            fname: this.primaryDetails.firstName,
            lname: this.primaryDetails.lastName,
            email: this.primaryDetails.email,
            phoneNumber: [
              {
                type: this.primaryDetails.selectedContactType,
                number: sendPhoneNumber(this.primaryDetails.phoneNumber)
              }
            ]
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
            parentID: this.schedulingDetails.inspectionTypeId,
            pValue: this.schedulingDetails.inspectionTypeValue,
            pMachineValue: this.schedulingDetails.inspectionTypeMachineValue,
            id: this.schedulingDetails.subInspectionType.machineValue,
            duration: parseFloat(this.schedulingDetails.inspectionDuration),
            value: this.schedulingDetails.subInspectionTypeValue,
            machineValue: this.schedulingDetails.subInspectionMachineValue
          },
          leadSource: {
            id: this.sourceDetails.id,
            type: this.sourceDetails.type,
            detail: this.sourceDetails.details
          },
          carrier: {
            id: this.insuranceDetails.carrierId,
            value: this.insuranceDetails.carrierName,
            email: this.insuranceDetails.email,
            phoneNumber: [
              {
                type: '',
                number: this.insuranceDetails.phone
              }
            ],
            address: this.insuranceDetails.address
          }
        }
      };

      if (this.primaryDetails.isOrganization == false) {
        delete payload.organizationName;
      }
      if (!this.insuranceDetails.address) {
        delete payload.data.carrier.address;
      }
      if (!this.insuranceDetails.carrierName) {
        delete payload.data.carrier;
      }
      if (!this.schedulingDetails.isAutomaticScheduling) {
        delete payload.data.inspectionInfo;
      }
      if (this.isEdit) {
        await this.editLeadDetails(payload);
        this.$router.push('/lead-details/' + this.selectedLead.id);
        const payloadData = {
          new: '',
          status: ''
        };
        this.getActiveLeadsList(payloadData);
        this.isLastRouteEdit(true);
      } else {
        // this condition is used to redirect the page to Active Lead on successful creation of New Lead
        this.addLeads(payload).then(() => {
          this.$store.commit('setShowConvertButton', true);
          const payload = {
            new: '',
            status: ''
          };
          this.setConvertedLead('Active');
          this.getActiveLeadsList(payload);
          this.getArchivedLeadsList();
          this.$router.push('/leads');
        });
      }
    },

    validateEmail,
    validateDate,

    onChangingSourceType() {
      this.sourceDetails.id = '';
      this.sourceDetails.details = '';
      this.sourceDetails.mailingAddress = '';
      this.sourceDetails.email = '';
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
      if (this.sourceDetails.type == 'vendor' && !this.sourceDetails.email) {
        this.$q.notify({
          type: 'negative',
          message: `Please Select Vendor`,
          position: 'top'
        });
      } else {
        this.step++;
        switch (this.stepArr[this.step].ref) {
          case 'loss':
            this.getAllConfigurationTableData({ name: 'loss_causes' });
            break;
          case 'schedule':
            this.getAllConfigurationTableData({ name: 'inspections' });
            break;
          case 'source':
            this.getAllConfigurationTableData({ name: 'industries' });
            this.getVendors(this.params);
        }
        if (this.stepClickValidTill < this.step) {
          this.stepClickValidTill = this.step;
        }
        document.getElementById('step').scrollLeft += 50;
      }
    },

    onBackButtonClick() {
      this.step--;
      document.getElementById('step').scrollLeft -= 50;
    },

    searchFilterBy(val, update) {
      this.sourceDetails.details = null;
      if (val === ' ') {
        update(() => {
          this.clientOptions = this.clients;
        });
        return;
      }

      update(() => {
        const search = val.toLowerCase();
        this.clientOptions = this.clients.filter(
          v => v.name.toLowerCase().indexOf(search) > -1
        );
      });
    },

    onSelectingCarrierList(carrier) {
      this.insuranceDetails.carrierId = carrier.id;
      this.insuranceDetails.carrierName = carrier.name;
      this.insuranceDetails.address = carrier.address;
      this.insuranceDetails.email = carrier.email;
      this.insuranceDetails.phone = carrier.phoneNumber
        ? carrier.phoneNumber[0].number
        : '';
      this.carriersListDialog = false;
    },

    onCloseAddCarrierDialogBox(carrier) {
      this.insuranceDetails.carrierId = carrier.id;
      this.insuranceDetails.carrierName = carrier.name;
      this.insuranceDetails.address = carrier.address;
      this.insuranceDetails.email = carrier.email;
      this.insuranceDetails.phone = carrier.phoneNumber
        ? carrier.phoneNumber[0].number
        : '';
      this.carriersListDialog = false;
      this.addCarrierDialog = false;
    },

    onSelectingVendorList(vendor) {
      this.sourceDetails.id = vendor.id;
      this.sourceDetails.details = vendor.name;
      this.sourceDetails.companyName = vendor.companyName;
      this.sourceDetails.mailingAddress = vendor.mailingAddress;
      this.sourceDetails.email = vendor.email;
      this.sourceDetails.phone = vendor.phoneNumber
        ? vendor.phoneNumber.number
        : '';
      this.vendorsListDialog = false;
    },

    onCloseAddVendorDialogBox(vendor) {
      this.sourceDetails.id = vendor.id;
      this.sourceDetails.companyName = vendor.companyName;
      this.sourceDetails.details =
        vendor.contact.fname + ' ' + vendor.contact.lname;
      this.sourceDetails.mailingAddress = vendor.mailingAddress;
      this.sourceDetails.email = vendor.email;
      this.sourceDetails.phone = vendor.phoneNumber
        ? vendor.phoneNumber.number
        : '';
      this.vendorsListDialog = false;
      this.addVendorDialog = false;
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
      'lossCauses',
      'selectedVendor',
      'selectedLead'
    ])
  },

  async created() {
    await this.getAllConfigurationTableData({ name: 'phone_types' });
    await this.getAllConfigurationTableData({ name: 'honorifics' });

    if (this.isEdit) {
      if (
        this.selectedLead.leadSource &&
        this.selectedLead.leadSource.type == 'vendor'
      ) {
        await this.getVendorDetails(this.selectedLead.leadSource.id);
      }
      this.primaryDetails.honorific = this.selectedLead.primaryContact.honorific;
      this.primaryDetails.firstName = this.selectedLead.primaryContact.fname;
      this.primaryDetails.lastName = this.selectedLead.primaryContact.lname;
      this.primaryDetails.selectedContactType = this.selectedLead.primaryContact.phoneNumber[0].type;
      this.primaryDetails.phoneNumber = this.selectedLead.primaryContact.phoneNumber[0].number;
      this.primaryDetails.email = this.selectedLead.primaryContact.email;
      this.lossAddress = this.selectedLead.lossLocation;
      this.primaryDetails.isOrganization = this.selectedLead.isOrganization
        ? this.selectedLead.isOrganization
        : '';
      if (!this.selectedLead.isOrganization) {
        this.primaryDetails.isOrganization = false;
      }
      this.primaryDetails.organizationName = this.selectedLead.isOrganization
        ? this.selectedLead.organizationName
        : '';
      this.lossDetails.lossDesc = this.selectedLead.lossDesc;
      this.lossDetails.dateOfLoss = dateToShow(this.selectedLead.dateofLoss);
      this.lossDetails.causeOfLoss.id = this.selectedLead.lossCause
        ? this.selectedLead.lossCause.id
        : '';
      this.lossDetails.causeOfLoss.value = this.selectedLead.lossCause
        ? this.selectedLead.lossCause.value
        : '';
      this.lossDetails.causeOfLoss.machineValue = this.selectedLead.lossCause
        ? this.selectedLead.lossCause.machineValue
        : '';
      this.insuranceDetails.policyNumber = this.selectedLead.policyNumber;
      this.schedulingDetails.isAutomaticScheduling = this.selectedLead.isAutomaticScheduling;
      this.notes = this.selectedLead.notes;
      // here we are assigning variable based on the Lead source type ,because different source type contains different types of data.
      //this condition is for lead type like vendor.
      if (this.selectedLead.leadSource.type == 'vendor') {
        this.sourceDetails.id = this.selectedVendor.id;
        this.sourceDetails.type = this.selectedLead.leadSource.type;
        this.sourceDetails.details = this.selectedVendor.name;
        this.sourceDetails.mailingAddress = this.selectedVendor.mailingAddress;
        this.sourceDetails.email = this.selectedVendor.email;
        this.sourceDetails.phone = this.selectedVendor.phoneNumber;
        this.sourceDetails.companyName = this.selectedVendor.companyName;
      }
      //this condition is for lead source type like client,affiliate,referral,advertisement,other.
      else if (
        this.selectedLead.leadSource.type == 'client' ||
        this.selectedLead.leadSource.type == 'affiliate' ||
        this.selectedLead.leadSource.type == 'referral' ||
        this.selectedLead.leadSource.type == 'advertisement' ||
        this.selectedLead.leadSource.type == 'other'
      ) {
        this.sourceDetails.type = this.selectedLead.leadSource.type;
        this.sourceDetails.details = this.selectedLead.leadSource.detail;
      }
      //this condition is for lead source type like google and None.
      else {
        this.sourceDetails.type = this.selectedLead.leadSource.type;
      }
      this.insuranceDetails.carrierName = this.selectedLead.carrier
        ? this.selectedLead.carrier.value
        : '';
      this.insuranceDetails.address = this.selectedLead.carrier
        ? this.selectedLead.carrier.address
        : '';
      this.insuranceDetails.email = this.selectedLead.carrier
        ? this.selectedLead.carrier.email
        : '';
      this.insuranceDetails.phone = this.selectedLead.carrier
        ? this.selectedLead.carrier.phoneNumber[0].number
        : '';
      this.insuranceDetails.carrierId = this.selectedLead.carrier
        ? this.selectedLead.carrier.id
        : '';

      this.schedulingDetails.inspectionTypeValue = this.selectedLead
        .inspectionInfo
        ? this.selectedLead.inspectionInfo.pValue
        : '';
      this.schedulingDetails.inspectionTypeId = this.selectedLead.inspectionInfo
        ? this.selectedLead.inspectionInfo.parentID
        : '';
      this.schedulingDetails.inspectionTypeMachineValue = this.selectedLead
        .inspectionInfo
        ? this.selectedLead.inspectionInfo.pMachineValue
        : '';

      this.schedulingDetails.inspectionDuration = this.selectedLead
        .inspectionInfo
        ? this.selectedLead.inspectionInfo.duration
        : '';

      this.onInspectionTypesSelect();
      if (
        this.selectedLead.inspectionInfo &&
        this.selectedLead.inspectionInfo.id
      ) {
        this.showSubInspectionType = true;
        this.schedulingDetails.subInspectionType = this.selectedLead.inspectionInfo.id;
        this.schedulingDetails.subInspectionTypeValue = this.selectedLead.inspectionInfo.value;
        this.schedulingDetails.subInspectionMachineValue = this.selectedLead.inspectionInfo.machineValue;
        this.schedulingDetails.inspectionDuration = this.selectedLead.inspectionInfo.duration;
      }
    }

    //Current Date
    this.lossDetails.dateOfLoss = date.formatDate(Date.now(), 'MM/DD/YYYY');

    // TODO : Have to change primary details object, so that selected client can be assigned as it is.
    const payload = {
      searchString: this.searchText ? this.searchText : '',
      status: ''
    };
    this.getClients(payload).then(() => {
      if (this.$route.params.id) {
        let selectedClient = this.clients.find(
          client => client.id === this.$route.params.id
        );
        if (selectedClient) {
          this.primaryDetails.honorific.id =
            selectedClient.insuredInfo.primary.honorific.id;
          this.primaryDetails.honorific.value =
            selectedClient.insuredInfo.primary.honorific.value;
          this.primaryDetails.honorific.machineValue =
            selectedClient.insuredInfo.primary.honorific.machineValue;

          this.primaryDetails.firstName =
            selectedClient.insuredInfo.primary.fname;
          this.primaryDetails.lastName =
            selectedClient.insuredInfo.primary.lname;
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
      }
    });
    this.clientOptions = this.clients;
  }
};
</script>
<style lang="scss">
// .input-style {
//   border: 1px solid #00000029;
//   padding: 0px;
//   box-shadow: 1px 2px 2px 1px #e0e0e0;
//   border-radius: 15px 15px 15px 15px;
//   margin-top: 5px;

//   .q-field__inner {
//     text-align: left;
//     padding-left: 12px;
//   }
// }

.q-select-style {
  height: 58px;
}
.button-style {
  height: 40px;
}
</style>
