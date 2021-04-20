<template>
  <div class="bg-white full-width">
    <!-- Insurance Info -->

    <div>
      <div
        class="custom-select"
        v-model="insuranceDetails.carrierName"
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
        label=" Policy Number"
        dense
        class="input-extra-padding"
      />
      <q-input
        v-model="insuranceDetails.insuranceClaimNumber"
        label="Insurance Claim Number"
        dense
        class="input-extra-padding"
      />
      <br />
      <div class="row">
        <p class="q-my-auto form-heading">Has claim been filed?</p>
        <q-toggle
          class="q-ml-auto"
          v-model="insuranceDetails.hasClaimBeenFilledToggle"
        />
      </div>
      <div class="row">
        <p class="q-my-auto form-heading">Is this is a Forced-Placed policy?</p>

        <q-toggle
          class="q-ml-auto"
          v-model="insuranceDetails.isThisIsForcedPlacedPolicyToggle"
        />
      </div>
      <br />
      <span class="form-heading">Policy Effective date</span>

      <div class="full-width">
        <q-input
          dense
          v-model="insuranceDetails.policyEffectiveDate"
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
                  v-model="insuranceDetails.policyEffectiveDate"
                  @input="() => $refs.qDateProxy.hide()"
                  mask="MM/DD/YYYY"
                ></q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <br />

      <span class="form-heading">Policy Expiry date </span>

      <div class="full-width">
        <q-input
          dense
          v-model="insuranceDetails.policyExpireDate"
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
                ref="qDateProxy1"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="insuranceDetails.policyExpireDate"
                  @input="() => $refs.qDateProxy1.hide()"
                  mask="MM/DD/YYYY"
                ></q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <q-select
        class="required"
        dense
        behavior="menu"
        v-model="insuranceDetails.policyCategory.id"
        option-value="id"
        option-label="name"
        map-options
        options-dense
        emit-value
        :options="policyCategories"
        @input="
          setTypes(
            policyCategories,
            insuranceDetails.policyCategory,
            'policyCategory'
          )
        "
        label="Policy Category"
        :rules="[
          val => (val && val.length > 0) || 'Please select policy category'
        ]"
      />
      <q-select
        class="required"
        dense
        behavior="menu"
        v-model="insuranceDetails.policy.id"
        option-value="id"
        option-label="name"
        map-options
        emit-value
        options-dense
        :options="policyTypes"
        @input="setTypes(policyTypes, insuranceDetails.policy)"
        label="Policy Type"
        :rules="[
          val => (val && val.length > 0) || 'Please select the policy type'
        ]"
      />
      <br />
      <div class="row" style="align-items: center">
        <span class="form-heading">Dwelling Limit (A)</span>
        <q-input
          dense
          mask="#.#"
          type="number"
          v-model.number="insuranceDetails.dwellingLimitA"
          placeholder="Dwelling Limit (A)"
          style="margin-left: auto; width: 50%"
          prefix="$"
          class="input-extra-padding"
        />
      </div>
      <div class="row" style="align-items: center">
        <span class="form-heading">Other Structure (B)</span>
        <q-input
          mask="#.#"
          type="number"
          v-model.number="insuranceDetails.otherStructureB"
          placeholder="Other Structure (B)"
          prefix="$"
          style="margin-left: auto; width: 50%"
          dense
          class="input-extra-padding"
        />
      </div>
      <div class="row" style="align-items: center">
        <span class="form-heading">Contents Limit (C)</span>
        <q-input
          mask="#.#"
          type="number"
          v-model.number="insuranceDetails.contentsLimit"
          placeholder="Contents Limit (C)"
          prefix="$"
          style="margin-left: auto; width: 50%"
          dense
          class="input-extra-padding"
        />
      </div>
      <div class="row" style="align-items: center">
        <span class="form-heading">Loss of Use Limit (D)</span>
        <q-input
          mask="#.#"
          type="number"
          v-model.number="insuranceDetails.lossOfUSD"
          placeholder="Loss of Use Limit (D)"
          prefix="$"
          style="margin-left: auto; width: 50%"
          dense
          class="input-extra-padding"
        />
      </div>
      <div class="row" style="align-items: center">
        <span class="form-heading">Depreciation</span>
        <q-input
          mask="#.#"
          type="number"
          v-model.number="insuranceDetails.deprecation"
          placeholder="Depreciation"
          prefix="$"
          style="margin-left: auto; width: 50%"
          dense
          class="input-extra-padding"
        />
      </div>
      <div class="row" style="align-items: center">
        <span class="form-heading">Deductible</span>
        <q-input
          mask="#.#"
          type="number"
          v-model.number="insuranceDetails.deductible"
          placeholder="Deductible"
          prefix="$"
          style="margin-left: auto; width: 50%"
          dense
          class="input-extra-padding"
        />
      </div>

      <div class="row" style="align-items: center">
        <span class="form-heading" style="width: 50%"
          >Prior payment by insured</span
        >
        <q-input
          mask="#.#"
          type="number"
          v-model.number="insuranceDetails.priorPayment"
          placeholder="Prior payment by insured"
          prefix="$"
          style="margin-left: auto; width: 50%"
          dense
          class="input-extra-padding"
        />
      </div>
      <br />
      <span class="form-heading">Reason for Limits/Denial</span>
      <div class="floating-label">
        <textarea
          rows="5"
          class="full-width"
          v-model="insuranceDetails.reasonsOfLD"
          style="resize: none"
        ></textarea>
      </div>

      <br />
    </div>
    <!-- Vendor List Dialog -->

    <q-dialog
      v-model="vendorsListDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="vendorsListDialog = false"
          :dialogName="vendorDialogName"
        />
        <VendorsList
          :carrierName="insuranceDetails.carrierName"
          :selective="true"
          @selectedVendor="onClosingVendorSelectDialog"
          ref="list"
          :showFilter="showVendorDialogFilters"
          :filterName="vendorDialogFilterByIndustry"
          :valueName="valueName"
          @addVendor="(addVendorDialog = true), (vendorsListDialog = false)"
        />
      </q-card>
    </q-dialog>

    <!-- Add Vendor Dialog -->

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
  </div>
</template>
<script>
import { constants } from '@utils/constant';
import CustomBar from 'components/CustomBar';
import VendorsList from 'components/VendorsList';
import { validateDate } from '@utils/validation';
import { mapGetters, mapActions } from 'vuex';
import { successMessage } from '@utils/validation';
import AddVendor from 'components/AddVendor';
export default {
  name: 'AddClaim',
  components: {
    CustomBar,
    VendorsList,
    AddVendor
  },
  props: {
    insuranceDetails: {
      type: Object
    },
    lossInfo: {
      type: Object
    }
  },

  data() {
    return {
      vendorDialogFilterByIndustry: '',
      showVendorDialogFilters: false,
      valueName: '',
      addVendorDialog: false,
      vendorsListDialog: false,
      vendorDialogName: '',
      constants: constants
    };
  },
  created() {
    this.getVendors(this.$route.params.id);
  },
  computed: {
    ...mapGetters(['policyTypes', 'policyCategories'])
  },
  methods: {
    ...mapActions(['getVendors']),
    successMessage,
    closeAddVendorDialog(e) {
      this.addVendorDialog = false;

      if (e) {
        this.vendorsListDialog = false;
      } else {
        this.vendorsListDialog = true;
      }
    },

    //Add Vendor close list

    async onCloseAddVendorDialogBox(result, selected) {
      if (result) {
        await this.getVendors();
        this.successMessage(constants.successMessages.CARRIER);
        this.onClosingVendorSelectDialog(selected, this.valueName);
      }
    },
    async onAddVendorDialogClick(name) {
      this.valueName = name;
      this.vendorDialogName = constants.industries.CARRIER;

      this.showVendorDialogFilters = false;
      this.vendorDialogFilterByIndustry = constants.industries.CARRIER;
      this.vendorDialogName = name;
      this.vendorsListDialog = true;
    },
    async onClosingVendorSelectDialog(vendor) {
      this.insuranceDetails.carrierId = vendor.id;
      this.insuranceDetails.carrierName = vendor.name;

      this.vendorsListDialog = false;
    },
    validateDate,
    setTypes(types, data) {
      const obj = types.find(item => {
        return item.id === data.id;
      });

      data.machineValue = obj.machineValue;
      data.value = obj.name;
    }
  }
};
</script>
