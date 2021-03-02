<template>
  <q-page class="window-height bg-background full-width">
    <br />
    <!-- This Style is needed for inner div-->
    <div class="q-pa-xs" style="height: 60%; width: 95%">
      <div class="full-width">
        <div class="my-font text-bold row q-my-lg q-mx-xl">
          Setup Company Account
        </div>
      </div>
      <!-- Height given for there Inner 2 div -->
      <div class="row full-width" style="height: 107%" flat bordered>
        <!-- This is the Main Div -->

        <!-- Main Template -->
        <template class="">
          <q-tab-panels
            class="q-ml-xl bg-grey-3"
            style="height: 500px; width: 1550px"
            v-model="tab"
            animated
            vertical
            swipeable
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <!-- Inspection Type -->
            <q-tab-panel name="inspectionType">
              <div class="row justify-between">
                <div class="text-bold col-4">Inspection Type</div>
                <div
                  class="col-2 text-primary"
                  @click="InspectionDialogBox = true"
                >
                  Add Inspection Type
                </div>
              </div>
              <div class="q-mt-lg"><q-separator /></div>
              <!-- This is div for Data of Inspection Type -->
              <div class="q-pa-lg" v-if="!inspectionTypes">
                You Have Not Added Any Inspection Type Yet
              </div>
              <div v-else class="row">
                <div class="row full-width">
                  <div class="col-4 q-ml-xl text-bold">Inspection Type</div>
                  <div class="col-3 q-ml-lg text-bold">Duration</div>
                  <div class="col-3 q-ml-lg text-center text-bold">
                    Edit/Delete
                  </div>
                </div>
                <br />

                <div
                  class="row full-width"
                  v-for="(ins, index) in inspectionTypes"
                  v-if="index >= 0"
                >
                  <div class="col-8 q-ml-xl q-my-md bg-grey-2">
                    <div class="col-5 q-pl-md">
                      {{ inspectionTypes[index].value }}
                    </div>

                    <div
                      class="row q-ml-lg q-mb-md col-5"
                      v-for="(ins, index1) in inspectionTypes[index].subtypes"
                      v-if="index >= 0"
                    >
                      <div class="q-pl-lg col-6">
                        {{ inspectionTypes[index].subtypes[index1].value }}
                      </div>
                      <div class="q-pl-lg">
                        {{ inspectionTypes[index].subtypes[index1].duration }}
                      </div>
                    </div>
                  </div>
                  <div class="col-2 bg-grey-2 q-pl-xl q-my-md q-pt-md">
                    <q-icon size="sm" color="primary" name="create" />
                    <q-icon
                      class="q-ml-xs"
                      size="sm"
                      color="primary"
                      name="delete"
                    />
                  </div>
                </div>
              </div>
            </q-tab-panel>
            <!-- Industry Type -->
            <q-tab-panel name="industryType">
              <div class="row justify-between">
                <!-- empty pannel -->
                <div class="text-bold col-4">IndustryType</div>
                <div
                  class="col-2 text-primary"
                  @click="onclickSecondaryDialogBox('Industry Type')"
                >
                  Add IndustryType
                </div>
              </div>
              <div class="q-mt-lg"><q-separator /></div>
              <!-- This is div for Data of Industry Type -->
              <div class="q-pa-lg" v-if="!vendorIndustries">
                You Have Not Added Any IndustryType yet
              </div>
              <div v-else class="bg-grey-1 q-pl-xl q-my-md ">
                <div
                  class="q-py-xs row justify-between full-width"
                  v-for="(contactInfo, index) in vendorIndustries"
                  v-if="index >= 0"
                >
                  <div class="q-px-xl q-py-xs">
                    {{ vendorIndustries[index].name }}
                  </div>

                  <div class="col-2 item-center">
                    <div>
                      <q-icon size="sm" color="primary" name="create" />
                      <q-icon
                        class="q-ml-xs"
                        size="sm"
                        color="primary"
                        name="delete"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>
            <!-- Honorific -->
            <q-tab-panel name="honorific">
              <div class="row justify-between">
                <!-- empty pannel -->
                <div class="text-bold col-4">Honorific</div>
                <div
                  class="col-2 text-primary"
                  @click="onclickSecondaryDialogBox('Honorofic')"
                >
                  Add Honorific
                </div>
              </div>
              <div class="q-mt-lg"><q-separator /></div>
              <!-- This is div for Data of Industry Type -->
              <div class="q-pa-lg" v-if="!titles">
                You Have Not Added Any Honorific yet
              </div>
              <div v-else class="bg-grey-1">
                <div
                  class="row justify-between full-width"
                  v-for="(contactInfo, index) in titles"
                  v-if="index >= 0"
                >
                  <div class="q-px-xl">
                    {{ titles[index].value }}
                  </div>

                  <div class="col-2 item-center">
                    <div>
                      <q-icon size="sm" color="primary" name="create" />
                      <q-icon
                        class="q-ml-xs"
                        size="sm"
                        color="primary"
                        name="delete"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>

            <!-- Phone Type -->
            <q-tab-panel name="phoneType">
              <div class="row justify-between">
                <!-- empty pannel -->
                <div class="text-bold col-4">Phone Type</div>
                <div
                  class="col-2 text-primary"
                  @click="onclickSecondaryDialogBox('Phone Type')"
                >
                  Add Phone Type
                </div>
              </div>
              <div class="q-mt-lg"><q-separator /></div>
              <!-- This is div for Data of Industry Type -->
              <div class="q-pa-lg" v-if="!contactTypes">
                You Have Not Added Any Phone Type Yet
              </div>
              <div v-else class="bg-grey-1">
                <div
                  class="row justify-between full-width"
                  v-for="(contactInfo, index) in contactTypes"
                  v-if="index >= 0"
                >
                  <div class="q-px-xl">
                    {{ contactTypes[index].name }}
                  </div>

                  <div class="col-2 item-center">
                    <div>
                      <q-icon size="sm" color="primary" name="create" />
                      <q-icon
                        class="q-ml-xs"
                        size="sm"
                        color="primary"
                        name="delete"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>
            <!-- Client Type -->
            <q-tab-panel name="clientType">
              <div class="row justify-between">
                <div class="text-bold col-4">Client Type</div>
                <div
                  class="col-2 text-primary"
                  @click="onclickSecondaryDialogBox('Client Type')"
                >
                  Add Client Type
                </div>
              </div>
              <div class="q-mt-lg"><q-separator /></div>
              <!-- This is div for Data of Industry Type -->
              <div class="q-pa-lg" v-if="!clientTypes">
                You Have Not Added Any Client Type Yet
              </div>
              <div v-else class="bg-grey-1">
                <div
                  class="row justify-between full-width"
                  v-for="(contactInfo, index) in clientTypes"
                  v-if="index >= 0"
                >
                  <div class="q-px-xl">
                    {{ clientTypes[index].name }}
                  </div>

                  <div class="col-2 item-center">
                    <div>
                      <q-icon size="sm" color="primary" name="create" />
                      <q-icon
                        class="q-ml-xs"
                        size="sm"
                        color="primary"
                        name="delete"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>
            <!-- Policy Category -->
            <q-tab-panel name="policyCategories">
              <div class="row justify-between">
                <div class="text-bold col-4">Policy Categories</div>
                <div
                  class="col-2 text-primary"
                  @click="onclickSecondaryDialogBox('Policy Categories')"
                >
                  Add Policy Categories
                </div>
              </div>
              <div class="q-mt-lg"><q-separator /></div>
              <!-- This is div for Data of Industry Type -->
              <div class="q-pa-lg" v-if="!policyCategories">
                You Have Not Added Any Policy Categories Yet
              </div>
              <div v-else class="bg-grey-1">
                <div
                  class="row justify-between full-width"
                  v-for="(contactInfo, index) in policyCategories"
                  v-if="index >= 0"
                >
                  <div class="q-px-xl">
                    {{ policyCategories[index].name }}
                  </div>

                  <div class="col-2 item-center">
                    <div>
                      <q-icon size="sm" color="primary" name="create" />
                      <q-icon
                        class="q-ml-xs"
                        size="sm"
                        color="primary"
                        name="delete"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>

            <!-- Policy Type -->
            <q-tab-panel name="policyType">
              <div class="row justify-between">
                <div class="text-bold col-4">Policy Type</div>
                <div
                  class="col-2 text-primary"
                  @click="onclickSecondaryDialogBox('Policy Type')"
                >
                  Add Policy Type
                </div>
              </div>
              <div class="q-mt-lg"><q-separator /></div>
              <!-- This is div for Data of Industry Type -->
              <div class="q-pa-lg" v-if="!policyTypes">
                You Have Not Added Any Policy Type Yet
              </div>
              <div v-else class="bg-grey-1">
                <div
                  class="row justify-between full-width"
                  v-for="(contactInfo, index) in policyTypes"
                  v-if="index >= 0"
                >
                  <div class="q-px-xl">
                    {{ policyTypes[index].name }}
                  </div>

                  <div class="col-2 item-center">
                    <div>
                      <q-icon size="sm" color="primary" name="create" />
                      <q-icon
                        class="q-ml-xs"
                        size="sm"
                        color="primary"
                        name="delete"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>

            <!-- property Type -->
            <q-tab-panel name="propertyType">
              <div class="row justify-between">
                <div class="text-bold col-4">Property Type</div>
                <div
                  class="col-2 text-primary"
                  @click="onclickSecondaryDialogBox('Property Type')"
                >
                  Add Property Type
                </div>
              </div>
              <div class="q-mt-lg"><q-separator /></div>
              <!-- This is div for Data of Industry Type -->
              <div class="q-pa-lg" v-if="!propertyTypes">
                You Have Not Added Any Property Type Yet
              </div>
              <div v-else class="bg-grey-1">
                <div
                  class="row justify-between full-width"
                  v-for="(contactInfo, index) in propertyTypes"
                  v-if="index >= 0"
                >
                  <div class="q-px-xl">
                    {{ propertyTypes[index].name }}
                  </div>

                  <div class="col-2 item-center">
                    <div>
                      <q-icon size="sm" color="primary" name="create" />
                      <q-icon
                        class="q-ml-xs"
                        size="sm"
                        color="primary"
                        name="delete"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>

            <!-- Claim Reason -->
            <q-tab-panel name="claimReason">
              <div class="row justify-between">
                <div class="text-bold col-4">Claim Reason</div>
                <div
                  class="col-2 text-primary"
                  @click="onclickSecondaryDialogBox('Claim Reason')"
                >
                  Add Claim Reason
                </div>
              </div>
              <div class="q-mt-lg"><q-separator /></div>
              <!-- This is div for Data of Industry Type -->
              <div class="q-pa-lg" v-if="!claimReasons">
                You Have Not Added Any Claim Reason Yet
              </div>
              <div v-else class="bg-grey-1">
                <div
                  class="row justify-between full-width"
                  v-for="(contactInfo, index) in claimReasons"
                  v-if="index >= 0"
                >
                  <div class="q-px-xl">
                    {{ claimReasons[index].name }}
                  </div>

                  <div class="col-2 item-center">
                    <div>
                      <q-icon size="sm" color="primary" name="create" />
                      <q-icon
                        class="q-ml-xs"
                        size="sm"
                        color="primary"
                        name="delete"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>

            <!-- Loss Cause -->
            <q-tab-panel name="lossCause">
              <div class="row justify-between">
                <div class="text-bold col-4">Loss Cause</div>
                <div
                  class="col-2 text-primary"
                  @click="onclickSecondaryDialogBox('Loss Cause')"
                >
                  Add Loss Cause
                </div>
              </div>
              <div class="q-mt-lg"><q-separator /></div>
              <!-- This is div for Data of Industry Type -->
              <div class="q-pa-lg" v-if="!lossCauses">
                You Have Not Added Any Loss Cause Yet
              </div>
              <div v-else class="bg-grey-1">
                <div
                  class="row justify-between full-width"
                  v-for="(contactInfo, index) in lossCauses"
                  v-if="index >= 0"
                >
                  <div class="q-px-xl">
                    {{ lossCauses[index].name }}
                  </div>

                  <div class="col-2 item-center">
                    <div>
                      <q-icon size="sm" color="primary" name="create" />
                      <q-icon
                        class="q-ml-xs"
                        size="sm"
                        color="primary"
                        name="delete"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>

            <!-- Claim Severity -->
            <q-tab-panel name="claimSeverity">
              <div class="row justify-between">
                <div class="text-bold col-4">Claim Severity</div>
                <div
                  class="col-2 text-primary"
                  @click="onclickSecondaryDialogBox('Claim Severity')"
                >
                  Add Claim Severity
                </div>
              </div>
              <div class="q-mt-lg"><q-separator /></div>
              <!-- This is div for Data of Industry Type -->
              <div class="q-pa-lg" v-if="!claimSeverity">
                You Have Not Added Any Claim Severity Yet
              </div>
              <div v-else class="bg-grey-1">
                <div
                  class="row justify-between full-width"
                  v-for="(contactInfo, index) in claimSeverity"
                  v-if="index >= 0"
                >
                  <div class="q-px-xl">
                    {{ claimSeverity[index].name }}
                  </div>

                  <div class="col-2 item-center">
                    <div>
                      <q-icon size="sm" color="primary" name="create" />
                      <q-icon
                        class="q-ml-xs"
                        size="sm"
                        color="primary"
                        name="delete"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
          <!-- This is Submit Button -->
          <div class="bg-blue">
            <q-separator />
          </div>
          <div class="q-mt-lg row justify-center  full-width">
            <q-btn
              color="primary"
              label="Next"
              class="q-mx-lg"
              @click="onClickNext"
            />
            <q-btn
              color="primary"
              label="Go To Dashboard"
              class="q-mx-lg"
              @click="SendToDashboard"
            />
          </div>
          <div class="q-mt-md">
            <q-separator />
          </div>
        </template>

        <!-- This is First Dialog -->
        <q-dialog v-model="InspectionDialogBox" persistent>
          <q-card style="width: 700px;height:600px; max-width: 1000vw;">
            <q-bar class=" row justify-between" style="height:50px">
              <div class="col-46 q-px-xl text-bold ">
                Add Inspection Type
              </div>
              <q-btn dense flat icon="close" v-close-popup>
                <q-tooltip>Close</q-tooltip>
              </q-btn>
            </q-bar>

            <q-card-section>
              <div
                v-for="(contactInfo, index) in inspection.subtypes"
                v-if="index >= 0"
              >
                <div
                  class="column bg-grey-3 q-pa-xl"
                  style="margin-left: 100px; margin-right: 100px"
                >
                  <div class="q-pa-lg">
                    <q-input
                      v-model="inspection.value"
                      label="Type Of Inspection"
                      lazy-rules
                      v-if="index == 0"
                    />

                    <q-input
                      v-model="inspection.subtypes[index].value"
                      label="Sub Type Of Inspection"
                      lazy-rules
                    />
                    Default Duration (hr))
                    <q-slider
                      class="q-mt-lg"
                      name="speed"
                      v-model="inspection.subtypes[index].duration"
                      label-always
                      :min="0"
                      :max="5"
                      :step="0.5"
                    />
                  </div>
                </div>
                <br />
              </div>

              <div class="row justify-between text-primary q-mx-xl">
                <div class="q-ml-xl" @click="addAnotherSubType">
                  + Another Sub Type Of Inspection
                </div>
                <div
                  class="q-mr-xl"
                  v-if="inspection.subtypes[1]"
                  @click="onClickRemoveSubType"
                >
                  Remove
                </div>
              </div>
              <div class="row justify-center q-pa-lg">
                <div>
                  <q-btn
                    color="primary"
                    label="Clear"
                    class="q-mx-lg"
                    @click="onClickClearInspectionType"
                  />
                </div>
                <div>
                  <q-btn
                    color="primary"
                    label="Save"
                    class="q-mx-lg"
                    @click="onSaveInspectionType"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
        <!-- This is Secondary Dialog Box -->
        <q-dialog v-model="industryTypeDialogBox" persistent>
          <q-card style="width: 700px; height: 400px; max-width: 1000vw">
            <q-bar class="row justify-between" style="height: 50px">
              <div class="col-7 q-px-xl text-bold">
                Add {{ industryTypeDialogBoxName }}
              </div>
              <q-btn dense flat icon="close" v-close-popup>
                <q-tooltip>Close</q-tooltip>
              </q-btn>
            </q-bar>

            <q-card-section>
              <div
                class="q-pa-xl"
                style="margin-left: 50px; margin-right: 50px"
              >
                <div class="column q-pa-lg">
                  <div class="q-px-xl q-py-xs">
                    {{ industryTypeDialogBoxName }}
                  </div>
                  <q-form ref="SecondaryForm">
                    <div class="q-pl-xs">
                      <q-input
                        v-model="industryType.value"
                        class="q-mx-xl"
                        style="width: 300px"
                        outlined
                        :rules="[
                          val =>
                            (val && val.length > 0) ||
                            'Please Fill ' + industryTypeDialogBoxName
                        ]"
                      />
                    </div>
                  </q-form>
                </div>
                <div class="row justify-center q-pa-lg">
                  <div>
                    <q-btn
                      color="primary"
                      label="Clear"
                      class="q-mx-lg"
                      @click="onClickClearSecondaryDilogBoxData"
                    />
                  </div>
                  <div>
                    <q-btn
                      color="primary"
                      label="Save"
                      class="q-mx-lg"
                      @click="
                        onSubmitSecondaryDilogBox(industryTypeDialogBoxName)
                      "
                    />
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>

        <div class="row full-width q-pa-xl">
          <div class="col-3"></div>
          <div class="col-7 justify-center q-ml-xl"></div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
// import { mapActions } from 'vuex';
import { mapGetters, mapActions } from 'vuex';
import { validateEmail } from '@utils/validation';

export default {
  name: 'SetConfiguration',

  data() {
    return {
      InspectionDialogBox: false,
      industryTypeDialogBox: false,
      industryTypeDialogBoxName: '',
      len: 1,

      isShowRemoveButton: false,
      tab: '',

      inspection: {
        value: '',

        subtypes: [
          { value: ' ', duration: 0.5, unit: 'hour', machineValue: '' }
        ]
      },
      industryType: {
        value: '',
        machineValue: ''
      }
    };
  },

  watch: {
    $route(to, from) {
      this.tab = this.$route.query.data;
    }
  },
  created() {
    this.tab = this.$route.query.data;
  },
  computed: {
    ...mapGetters([
      'contactTypes',
      'titles',
      'inspectionTypes',
      'vendorIndustries',
      'clientTypes',
      'policyTypes',
      'policyCategories',
      'propertyTypes',
      'claimReasons',
      'lossCauses',
      'claimSeverity'
    ])
  },

  mounted() {
    this.getTitles();
    this.getContactTypes();
    this.getVendorIndustries();
    this.getInspectionTypes();
    this.getClientTypes();
    this.getPolicyTypes();
    this.getPolicyCategory();
    this.getPropertyTypes();
    this.getLossCauses();
    this.getSeverityClaim();
    this.getClaimReasons();
  },

  methods: {
    ...mapActions([
      'addUser',
      'addInspectionType',
      'addHonorifics',
      'addIndustry',
      'addPhone',
      'addClientType',
      'addPolicy',
      'addPolicyCategories',
      'addProperty',
      'addClaimReason',
      'addLoss',
      'addClaimSeverity',
      'addOnboardingStep',
      'getTitles',
      'getClientTypes',
      'getContactTypes',
      'getInspectionTypes',
      'getVendorIndustries',
      'getPolicyTypes',
      'getPolicyCategory',
      'getPropertyTypes',
      'getSeverityClaim',
      'getClaimReasons',
      'getLossCauses'
    ]),
    validateEmail,
    //  Secondary Dilog Box Submit
    async onSubmitSecondaryDilogBox(typeName) {
      var vald = await this.$refs.SecondaryForm.validate();
      if (vald) {
        switch (typeName) {
          case 'Honorofic':
            var response = await this.addHonorifics(this.industryType);
            break;

          case 'Industry Type':
            var response = await this.addIndustry(this.industryType);
            break;
          case 'Phone Type':
            var response = await this.addPhone(this.industryType);
            break;
          case 'Client Type':
            var response = await this.addClientType(this.industryType);
            break;
          case 'Policy Type':
            var response = await this.addPolicy(this.industryType);
            break;
          case 'Policy Categories':
            var response = await this.addPolicyCategories(this.industryType);
            break;
          case 'Property Type':
            var response = await this.addProperty(this.industryType);
            break;
          case 'Claim Reason':
            var response = await this.addClaimReason(this.industryType);
            break;
          case 'Loss Cause':
            var response = await this.addLoss(this.industryType);
            break;
          case 'Claim Severity':
            var response = await this.addClaimSeverity(this.industryType);
            break;
        }
        if (response) {
          //   const data = {
          //     payload: { step: this.tab },
          //     id: getCurrentUser().id
          //   };
          //   await this.addOnboardingStep(data);
          this.getTitles();
          this.getVendorIndustries();
          this.getContactTypes();
          this.getClientTypes();
          this.getPolicyTypes();
          this.getPolicyCategory();
          this.getPropertyTypes();
          this.getLossCauses();
          this.getSeverityClaim();
          this.getClaimReasons();
          this.industryTypeDialogBox = false;
          this.industryType.value = '';
          vald = '';
        }
      }
    },
    // This is Secondary Dialog Box
    onclickSecondaryDialogBox(value) {
      this.industryTypeDialogBoxName = value;
      this.industryTypeDialogBox = true;
    },

    // For adding SubType of Inspection Type
    addAnotherSubType() {
      this.inspection.subtypes.push({ type: ' ', duration: 0.5 });
    },
    // For Removing SubType
    onClickRemoveSubType() {
      this.inspection.subtypes.pop();
    },
    // For Clearing  the Form In Inspection Type
    onClickClearInspectionType() {
      this.inspection = {
        type: '',
        subtypes: [{ type: ' ', duration: 0.5 }]
      };
    },
    //For clearing the Secondary Dilog box Data when clicked to clearing
    onClickClearSecondaryDilogBoxData() {
      this.industryType.value = '';
    },
    // onSaveInspectionType
    async onSaveInspectionType() {
      const response = await this.addInspectionType(this.inspection);
      if (response) {
        this.getInspectionTypes();
        this.InspectionDialogBox = false;
        this.inspection = {
          value: '',

          subtypes: [
            { value: ' ', duration: 0.5, unit: 'hour', machineValue: '' }
          ]
        };
      } else {
        this.$q.notify({
          message: ' Server Response Failed',
          position: 'top',
          type: 'negative'
        });
      }
    },
    SendToDashboard() {
      this.$router.push('/dashboard');
    },
    onClickNext() {
      if (this.tab == 'inspectionType') {
        this.tab = 'industryType';
      } else if (this.tab == 'industryType') {
        this.tab = 'honorific';
      } else if (this.tab == 'honorific') {
        this.tab = 'phoneType';
      } else if (this.tab == 'phoneType') {
        this.tab = 'clientType';
      } else if (this.tab == 'clientType') {
        this.tab = 'policyCategories';
      } else if (this.tab == 'policyCategories') {
        this.tab = 'policyType';
      } else if (this.tab == 'policyType') {
        this.tab = 'propertyType';
      } else if (this.tab == 'propertyType') {
        this.tab = 'claimReason';
      } else if (this.tab == 'claimReason') {
        this.tab = 'lossCause';
      } else if (this.tab == 'lossCause') {
        this.tab = 'claimSeverity';
      }
    }

    // End of Functions
  }
};
</script>
<style lang="scss">
::-webkit-scrollbar {
  display: none;
}
</style>
