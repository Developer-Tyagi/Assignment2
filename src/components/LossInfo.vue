<template>
  <div class="bg-white full-width">
    <!-- Damaged Items Dialog Box -->
    <q-dialog
      v-model="lossInfo.damagedItemsDailog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="lossInfo.damagedItemsDailog = false"
          :dialogName="'Add Items'"
        />
        <div class="mobile-container-page-without-search">
          <div class="form-height">
            <div class="q-page bg-white">
              <div class="full-width">
                <q-input dense v-model="lossInfo.OSDamageName" label="Name" />
                <q-input
                  dense
                  v-model="lossInfo.OSDamageDescription"
                  label="Description"
                  autogrow
                />
                <q-input
                  dense
                  mask="#.#"
                  type="number"
                  v-model.number="lossInfo.OSDamagedItemCost"
                  label="Item Cost"
                >
                  <template v-slot:prepend>
                    <q-icon name="$" color="primary" class="q-mb-sm"></q-icon>
                  </template>
                </q-input>
              </div>
              <br />
            </div>
          </div>
          <q-btn
            label="Save"
            color="primary"
            class="full-width q-mt-auto text-capitalize"
            size="'xl'"
            @click="addDamagedItems"
          ></q-btn>
        </div>
      </q-card>
    </q-dialog>
    <!-- PP Damaged Items Dialog Box -->
    <q-dialog
      v-model="lossInfo.PPdamagedItemsDailog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="lossInfo.PPdamagedItemsDailog = false"
          :dialogName="'Add Items'"
        />
        <div class="mobile-container-page-without-search">
          <div class="form-height">
            <div class="full-width">
              <q-input
                dense
                v-model.number="lossInfo.quantity"
                label="Quantity"
                type="number"
              />
              <q-input
                dense
                v-model="lossInfo.PPDamageName"
                label="Name of item"
              />
              <q-input
                dense
                v-model="lossInfo.serialNumber"
                label="Serial Number"
              />

              <q-input
                dense
                v-model="lossInfo.PPDamageDescription"
                label="Description of Damages"
                autogrow
              />
              <q-input
                dense
                v-model="lossInfo.PPDamageItemDescription"
                label="Description of Item"
                autogrow
              />
              <q-input
                dense
                type="number"
                v-model.number="lossInfo.PPDamagedItemCost"
                label="Item Cost"
              >
                <template v-slot:prepend>
                  <q-icon
                    name="$"
                    color="primary"
                    class="q-mb-sm"
                  ></q-icon> </template
              ></q-input>
              <q-input
                dense
                type="number"
                v-model.number="lossInfo.purchasePrice"
                label="Purchase Price"
              >
                <template v-slot:prepend>
                  <q-icon name="$" color="primary"></q-icon> </template
              ></q-input>
              <div class="text-bold q-mt-md">Purchase date</div>
              <div class="full-width">
                <q-input
                  v-model="lossInfo.purchaseDate"
                  mask="##/##/####"
                  label="MM/DD/YYYY"
                  lazy-rules
                  :rules="[
                    val =>
                      (validateDate(val) && val && val.length > 0) ||
                      'Invalid date!'
                  ]"
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
                          v-model="lossInfo.purchaseDate"
                          @input="() => $refs.qDateProxy.hide()"
                          mask="MM/DD/YYYY"
                        ></q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <q-radio
                v-model="lossInfo.repairReplaceRadio"
                val="Repair"
                label="Repair"
              ></q-radio>
              <q-radio
                class="q-ml-none"
                v-model="lossInfo.repairReplaceRadio"
                val="Replace"
                label="Replace"
              ></q-radio>
            </div>
            <br />
          </div>
          <q-btn
            label="Save"
            color="primary"
            class="full-width q-mt-auto text-capitalize"
            @click="addPPDamagedItems"
            size="'xl'"
          ></q-btn>
        </div>
      </q-card>
    </q-dialog>

    <!-- Loss Info -->
    <q-card class="q-pa-sm">
      <q-select
        dense
        behavior="menu"
        class="required"
        v-model="lossInfo.reasonClaim.id"
        option-value="id"
        option-label="name"
        map-options
        options-dense
        emit-value
        :options="claimReasons"
        @input="setTypes(claimReasons, lossInfo.reasonClaim)"
        label="Reason for Claim"
        :rules="[
          val => (val && val.length > 0) || 'Please select the reason for claim'
        ]"
      />
    </q-card>
    <q-card class="q-pa-sm q-mt-sm">
      <span class="form-heading">Date of Loss</span>

      <div class="full-width">
        <q-input
          dense
          v-model="lossInfo.dateOfLoss"
          mask="##/##/####"
          label="MM/DD/YYYY"
          lazy-rules
          :rules="[
            val =>
              dateLiesBetween(val) || 'Date is before policy effective date!'
          ]"
        >
          <template v-slot:append>
            <q-icon
              name="event"
              size="sm"
              color="primary"
              class="cursor-pointer"
            >
              <q-popup-proxy
                ref="qDateProxy2"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="lossInfo.dateOfLoss"
                  @input="() => $refs.qDateProxy2.hide()"
                  mask="MM/DD/YYYY"
                  :options="lossDateOption"
                ></q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <q-select
        class="input-extra-padding"
        dense
        behavior="menu"
        v-model="lossInfo.causeOfLoss.id"
        option-value="id"
        option-label="name"
        map-options
        options-dense
        emit-value
        :options="lossCauses"
        @input="setTypes(lossCauses, lossInfo.causeOfLoss)"
        label="Cause of Loss"
      />

      <q-input
        v-if="lossInfo.causeOfLoss.id"
        class="required"
        label="Cause of loss description"
        v-model="lossInfo.causeOfLoss.desc"
        lazy-rules
        :rules="[
          val =>
            (val && val.length > 0) ||
            'Please fill the cause of loss description'
        ]"
      >
      </q-input>

      <span class="form-heading">Deadline Date</span>

      <div class="full-width">
        <q-input
          dense
          v-model="lossInfo.deadlineDate"
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
                ref="qDateProxy3"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="lossInfo.deadlineDate"
                  @input="() => $refs.qDateProxy3.hide()"
                  mask="MM/DD/YYYY"
                ></q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <br />
      <span class="form-heading">Recov. Deprec. Deadline</span>

      <div class="full-width">
        <q-input
          dense
          v-model="lossInfo.recovDeadline"
          mask="##/##/####"
          label="MM/DD/YYYY"
          lazy-rules
          :rules="[
            val => (val.length > 0 && validateDate(val)) || 'Invalid date!'
          ]"
        >
          <template v-slot:append>
            <q-icon
              name="event"
              size="sm"
              color="primary"
              class="cursor-pointer"
            >
              <q-popup-proxy
                ref="qDateProxy4"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="lossInfo.recovDeadline"
                  @input="() => $refs.qDateProxy4.hide()"
                  mask="MM/DD/YYYY"
                ></q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </q-card>
    <q-card class="q-pa-sm q-mt-sm">
      <div class="row">
        <p class="q-my-auto form-heading">Is the Home Habitable?</p>
        <q-toggle class="q-ml-auto" v-model="lossInfo.isTheHomeHabitable" />
      </div>
      <div class="row">
        <p class="q-mx-none q-my-auto form-heading">FEMA Claim</p>
        <q-toggle class="q-ml-auto" v-model="lossInfo.femaClaimToggle" />
      </div>
      <div class="row">
        <p class="q-my-auto form-heading">State of Emergency</p>
        <q-toggle
          class="q-ml-auto"
          v-model="lossInfo.isStateOfEmergencyToggle"
        />
      </div>
      <div v-if="lossInfo.isStateOfEmergencyToggle">
        <q-input dense v-model="lossInfo.nameOfEmergency" label="Related to" />
      </div>
      <q-select
        class="required"
        dense
        behavior="menu"
        v-model="lossInfo.severityOfClaimType.id"
        option-value="id"
        option-label="name"
        map-options
        emit-value
        options-dense
        :options="claimSeverity"
        @input="setTypes(claimSeverity, lossInfo.severityOfClaimType)"
        label="Severity of Claim"
        :rules="[
          val =>
            (val && val.length > 0) || 'Please select the severity of claim'
        ]"
      />
    </q-card>
    <q-card class="q-pa-sm q-mt-sm">
      <span class="form-heading">Loss Description to Dwelling</span>
      <textarea
        rows="5"
        required
        class="full-width"
        v-model="lossInfo.descriptionDwelling"
        style="resize: none"
      />
    </q-card>
    <q-card class="q-pa-sm q-mt-sm">
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
              <q-card flat bordered>
                <div class="text-right">
                  <q-icon
                    v-if="lossInfo.osDamagedItems.length >= 1"
                    size="xs"
                    class="q-ma-xs"
                    dense
                    color="primary"
                    name="close"
                    @click="deleteDamagedItem(index)"
                  />
                </div>
                <div>
                  <div class="row">
                    <div class="text-bold q-ml-sm text-capitalize q-pt-xs">
                      {{ item.name }}
                    </div>
                    <div class="q-ml-auto q-pt-xs" style="margin-right: 30px">
                      {{ '$' + item.cost }}
                    </div>
                  </div>
                  <div
                    class="q-ml-sm text-capitalize q-pt-xs text-caption q-mr-xl q-my-xs q-px-xs q-ma-xs"
                  >
                    <p>{{ item.desc }}</p>
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
          @click="lossInfo.damagedItemsDailog = true"
        >
        </q-btn>
      </div>
      <div class="row">
        <p class="q-mt-md form-heading">
          Is there damage to personal property?
        </p>
        <q-toggle
          class="q-ml-auto"
          v-model="lossInfo.isThereDamageToPersonalPropertyToggle"
          @input="onPersonalPropertyToggleButtonOff"
        />
      </div>
      <div class="row" v-if="lossInfo.isThereDamageToPersonalPropertyToggle">
        <p class="q-mx-none q-my-auto form-heading">
          Is the PA filling out the PPIF at this inspection?
        </p>
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
              <q-card flat bordered>
                <div class="text-right">
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
                <div class="row">
                  <div class="text-bold q-ml-sm text-capitalize q-pt-xs">
                    {{ item.name }}
                  </div>
                  <div class="q-ml-auto q-pt-xs" style="margin-right: 30px">
                    {{ '$' + item.cost }}
                  </div>
                </div>
                <div
                  class="q-ml-sm text-capitalize q-pt-xs text-caption q-mr-xl q-my-xs q-px-xs q-ma-xs"
                >
                  <p>{{ item.desc }}</p>
                  <p>{{ item.itemDesc }}</p>
                </div>
                <div class="q-ma-sm q-ml-xs">
                  {{ item.serialNumber }}
                </div>
                <div class="q-ma-sm q-ml-xs">
                  {{ item.purchaseDate }}
                </div>
                <div class="q-ma-sm q-ml-xs">
                  {{ '$' + item.purchasePrice }}
                </div>
                <div class="q-ma-sm q-ml-xs">
                  {{ item.quantity }}
                </div>
                <div class="q-ma-sm">
                  {{ item.radio }}
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
            @click="lossInfo.PPdamagedItemsDailog = true"
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
        <p class="q-mx-none q-my-auto form-heading">
          Is the adjuster going to fill out the PPIF at a later date?
        </p>
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
        <p class="q-mx-none q-my-auto form-heading">
          Is the client going to prepare the PPIFs?
        </p>
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
            lossInfo.isThereDamageToPersonalPropertyToggle
        "
      >
        <p class="q-mx-none q-my-auto form-heading">
          Do you want to send the insured a PPIF?
        </p>
        <q-toggle
          v-if="lossInfo.isThereDamageToPersonalPropertyToggle"
          class="q-ml-auto"
          v-model="lossInfo.doYouWantToSendInsuredPPIF"
        />
      </div>
      <div class="row">
        <p class="q-mx-none q-my-auto form-heading">
          Was a PPIF provided to the insured?
        </p>
        <q-toggle
          class="q-ml-auto"
          v-model="lossInfo.wasAppifProvidedToTheInsuredToggle"
        />
      </div>
      <div class="row">
        <p class="q-mx-none q-my-auto form-heading">
          Does Claim Guru PPIF need to be provided?
        </p>
        <q-toggle
          class="q-ml-auto"
          v-model="lossInfo.doesTheOfficeNeedToProvidePpifToTheInsuredToggle"
        />
      </div>

      <!-- Mortgage Details -->
      <div v-if="isMailingAddressEnable">
        <div class="row">
          <p class="q-my-auto form-heading">Is there a mortgage on the home?</p>
          <q-toggle
            class="q-ml-auto"
            v-model="mortgageInfo.isMortgageHomeToggle"
            @input="onToggleButtonClick"
          />
        </div>

        <div
          v-if="mortgageInfo.isMortgageHomeToggle"
          @click="mortgageInfo.mortgageInfoDialog = true"
        >
          <div class="row">
            <div class="q-px-xs row">
              <div v-if="!mortgageInfo.mortgageDetails[0]['id']">
                Select Mortgage
              </div>
              <div
                v-else
                class="select-text"
                v-for="(mortgageDetail, index) in mortgageInfo.mortgageDetails"
              >
                <span>
                  {{ mortgageDetail.value }}
                </span>
                <span v-if="mortgageInfo.mortgageDetails.length - 1 > index">
                  ,
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Mortgage Dialog -->
        <q-dialog
          v-model="mortgageInfo.mortgageInfoDialog"
          persistent
          :maximized="true"
          transition-show="slide-up"
          transition-hide="slide-down"
        >
          <q-card>
            <CustomBar
              @closeDialog="mortgageInfo.mortgageInfoDialog = false"
              :dialogName="'Mortagage Info'"
            />
            <div class="mobile-container-page q-pa-sm form-height">
              <q-form ref="estimatingInfoForm">
                <Mortgage
                  :mortgageInfo="mortgageInfo"
                  :isThereSecondMortgageToggle="true"
                />
              </q-form>
            </div>
            <q-btn
              label="Save"
              color="primary"
              class="button-width-90"
              @click="mortgageInfo.mortgageInfoDialog = false"
              size="'xl'"
            />
          </q-card>
        </q-dialog>
      </div>
    </q-card>
  </div>
</template>
<script>
import AddressService from '@utils/country';
import { date } from 'quasar';
import { constants } from '@utils/constant';
import CustomBar from 'components/CustomBar';
import VendorsList from 'components/VendorsList';
import { validateDate } from '@utils/validation';
import { mapGetters, mapActions } from 'vuex';
import AddVendor from 'components/AddVendor';
import AutoCompleteAddress from 'components/AutoCompleteAddress';
import Mortgage from 'components/Mortgage';

export default {
  name: 'LossInfo',
  components: {
    CustomBar,
    VendorsList,
    AddVendor,
    AutoCompleteAddress,
    Mortgage
  },

  props: {
    lossInfo: {
      type: Object
    },
    mortgageInfo: {
      type: Object
    },
    isMailingAddressEnable: {
      type: Boolean,
      required: false
    },
    lossAddressToggleShow: {
      type: Boolean,
      required: false
    },
    isAddressRequired: {
      type: Boolean,
      required: false
    },
    lossAddressSameAsClient: {
      type: Boolean,
      required: false
    },
    policyDate: {
      type: Object
    }
  },

  data() {
    return {
      mortgageInfo: {
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
      constants: constants,
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

      lossAddressNameOptions: ['Others']
    };
  },
  created() {
    this.lossInfo.purchaseDate = date.formatDate(Date.now(), 'MM/DD/YYYY');
    this.$emit('isMortgageDetails', false);

    this.getVendors(this.$route.params.id);
  },
  computed: {
    ...mapGetters([
      'policyTypes',
      'policyCategories',
      'propertyTypes',
      'claimReasons',
      'lossCauses',
      'claimSeverity',
      'vendors'
    ])
  },
  methods: {
    ...mapActions([
      'getVendors',
      'getClaimReasons',
      'getSeverityClaim',
      'getRoles'
    ]),

    lossDateOption(dateopn) {
      return dateopn <= date.formatDate(Date.now(), 'YYYY/MM/DD');
    },

    dateLiesBetween(val) {
      if (
        Date.parse(val) <= Date.parse(this.policyDate.policyExpireDate) &&
        Date.parse(val) >= Date.parse(this.policyDate.policyEffectiveDate)
      ) {
        return true;
      } else {
        return false;
      }
    },

    onDamageOsToggleButtonOff() {
      if (!this.lossInfo.isDamageOSToggle) {
        this.lossInfo.osDamagedItems.length = 0;
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
    closeAddVendorDialog(e) {
      this.mortgageInfo.addVendorDialog = false;
      // this.getVendors();
      if (e) {
        this.mortgageInfo.vendorsListDialog = false;
      } else {
        this.mortgageInfo.vendorsListDialog = true;
      }
    },

    onToggleButtonClick() {
      if (this.mortgageInfo.mortgageDetails.length > 1) {
        this.mortgageInfo.mortgageDetails.pop();
      }
      if (!this.mortgageInfo.isMortgageHomeToggle) {
        this.mortgageInfo.isSecondMortgageHome = false;
        this.mortgageInfo.mortgageDetails = [
          {
            id: '',
            value: '',
            loanNumber: '',
            accountNumber: '',
            isPrimary: true,
            notes: ''
          }
        ];
      }
    },
    validateDate,
    setTypes(types, data) {
      const obj = types.find(item => {
        return item.id === data.id;
      });

      data.machineValue = obj.machineValue;
      data.value = obj.name;
    },
    deleteDamagedItem(index) {
      this.$delete(this.lossInfo.osDamagedItems, index);
    },
    deletePPDamagedItem(index) {
      this.$delete(this.lossInfo.ppDamagedItems, index);
    },
    onSecondMortgageToggle() {
      if (this.lossInfo.isSecondMortgageHome) {
        this.lossInfo.mortgageDetails.push({
          id: '',
          value: '',
          loanNumber: '',
          accountNumber: '',
          isPrimary: false,
          notes: ''
        });
      } else {
        this.lossInfo.mortgageDetails.pop();
      }
    },
    onMortgageToggleButtonClick() {
      if (this.lossInfo.mortgageDetails.length > 1) {
        this.lossInfo.mortgageDetails.pop();
      }
      if (!this.mortgageInfo.isMortgageHomeToggle) {
        this.lossInfo.isSecondMortgageHome = false;
        this.lossInfo.mortgageDetails = [
          {
            id: '',
            value: '',
            loanNumber: '',
            accountNumber: '',
            isPrimary: true,
            notes: ''
          }
        ];
      }
    },
    addPPDamagedItems() {
      this.lossInfo.PPdamagedItemsDailog = false;
      this.lossInfo.ppDamagedItems.push({
        name: this.lossInfo.PPDamageName,
        desc: this.lossInfo.PPDamageDescription,
        cost: this.lossInfo.PPDamagedItemCost,
        serialNumber: this.lossInfo.serialNumber,
        radio: this.lossInfo.repairReplaceRadio,
        itemDesc: this.lossInfo.PPDamageItemDescription,
        purchaseDate: this.lossInfo.purchaseDate,
        purchasePrice: this.lossInfo.purchasePrice,
        quantity: this.lossInfo.quantity
      });
      this.lossInfo.PPDamageName = '';
      this.lossInfo.PPDamageDescription = '';
      this.lossInfo.serialNumber = '';
      this.lossInfo.PPDamagedItemCost = '';
      this.lossInfo.repairReplaceRadio = false;
      this.lossInfo.PPDamageItemDescription = '';

      this.lossInfo.purchasePrice = '';
      this.lossInfo.quantity = '';
    },
    addDamagedItems() {
      this.lossInfo.osDamagedItems.push({
        name: this.lossInfo.OSDamageName,
        desc: this.lossInfo.OSDamageDescription,
        cost: this.lossInfo.OSDamagedItemCost
      });

      this.lossInfo.damagedItemsDailog = false;
      this.lossInfo.OSDamageName = '';
      this.lossInfo.OSDamageDescription = '';
      this.lossInfo.OSDamagedItemCost = '';
    },
    lossAddressSameToggleClick() {
      if (this.lossInfo.isLossAddressSameAsClientToggle) {
        this.$emit('lossAddressSame', true);
      } else {
        this.lossInfo.lossAddressDetails = {
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
    }
  }
};
</script>
<style lang="scss" scoped>
.form-height {
  height: calc(100vh - 120px);
  overflow: auto;
  margin: 10px;
}
</style>
