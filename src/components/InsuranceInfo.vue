<template>
  <div class="bg-white full-width">
    <!-- Insurance Info -->
    <div>
      <q-card class="q-pa-sm">
        <span class="text-bold   q-mb-sm q-mt-sm">Carrier Info</span>

        <div
          v-if="!insuranceDetails.carrierName && !policyInfo"
          class="select-text custom-select q-mt-sm "
          size="md"
          :disabled="isOfflineClientEdit"
          @click="carriersListDialog = true"
        >
          Click for choosing a carrier
        </div>

        <div>
          <q-card
            bordered
            v-if="insuranceDetails.carrierName && !policyInfo"
            @click="carriersListDialog = true"
            class="q-my-md q-pa-md"
          >
            <div class="text-bold">
              {{ insuranceDetails.carrierName }}
            </div>
            <div
              v-if="
                insuranceDetails.address &&
                  insuranceDetails.address.streetAddress
              "
            >
              <div>
                {{
                  insuranceDetails.address
                    ? insuranceDetails.address.houseNumber
                    : '-'
                }}
                ,
                {{
                  insuranceDetails.address.streetAddress
                    ? insuranceDetails.address.streetAddress
                    : '-'
                }}
              </div>
              <div>
                {{
                  insuranceDetails.address.addressLocality
                    ? insuranceDetails.address.addressLocality
                    : '-'
                }}
                ,
                {{
                  insuranceDetails.address.addressRegion
                    ? insuranceDetails.address.addressRegion
                    : '-'
                }}
              </div>
              <div class="row">
                {{
                  insuranceDetails.address.addressCountry
                    ? insuranceDetails.address.addressCountry
                    : '-'
                }}
                -
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
                @click="onPhoneNumberClick(insuranceDetails.phone, $event)"
              >
                {{
                  insuranceDetails.phone
                    ? showPhoneNumber(insuranceDetails.phone)
                    : '-'
                }}</span
              >
            </div>
            <div>
              Email:<span
                class="clickLink"
                @click="onEmailClick(insuranceDetails.email, $event)"
              >
                {{ insuranceDetails.email }}</span
              >
            </div>
          </q-card>
        </div>
        <q-input
          v-model="insuranceDetails.policyNumber"
          label="Policy Number"
          dense
          class="required"
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'Please fill the policy number'
          ]"
          :disable="isOfflineClientEdit"
        />
        <div class="row" v-if="!policyInfo">
          <p class="q-my-auto form-heading">Has claim been filed?</p>
          <q-toggle
            class="q-ml-auto"
            v-model="insuranceDetails.hasClaimBeenFilledToggle"
            :disable="isOfflineClientEdit"
          />
        </div>
        <q-input
          v-if="insuranceDetails.hasClaimBeenFilledToggle && !policyInfo"
          v-model="insuranceDetails.insuranceClaimNumber"
          label="Insurance Claim Number"
          dense
          class="input-extra-padding"
          lazy-rules
          :rules="[
            val =>
              (val && val.length > 0) ||
              'Please fill the insurance claim number'
          ]"
          :disable="isOfflineClientEdit"
        />
        <div class="row">
          <p class="q-my-auto form-heading">
            Is this is a Forced-Placed policy?
          </p>

          <q-toggle
            class="q-ml-auto"
            v-model="insuranceDetails.isThisIsForcedPlacedPolicyToggle"
            :disable="isOfflineClientEdit"
          />
        </div>
      </q-card>
      <q-card class="q-pa-sm q-mt-sm">
        <span class="form-heading">Policy Effective date</span>

        <div class="full-width">
          <q-input
            dense
            v-model="insuranceDetails.policyEffectiveDate"
            mask="##/##/####"
            label="MM/DD/YYYY"
            lazy-rules
            class="required"
            :rules="[
              val =>
                (val && val.length > 0 && validateDate(val)) || 'Invalid date!'
            ]"
            :disable="isOfflineClientEdit"
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
                    @input="onChaningPolicyEffectiveDate()"
                    mask="MM/DD/YYYY"
                    :disable="isOfflineClientEdit"
                  ></q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <span class="form-heading">Policy Expiry date </span>
        <div class="full-width">
          <q-input
            dense
            v-model="insuranceDetails.policyExpireDate"
            mask="##/##/####"
            label="MM/DD/YYYY"
            lazy-rules
            class="required"
            :rules="[
              val =>
                (val && val.length > 0 && validateDate(val)) || 'Invalid date!'
            ]"
            :disable="isOfflineClientEdit"
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
                    :disable="isOfflineClientEdit"
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
          v-model="insuranceDetails.policyCategory.value"
          option-value="name"
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
          :disable="isOfflineClientEdit"
        />
        <q-select
          class="required"
          dense
          behavior="menu"
          v-model="insuranceDetails.policy.value"
          option-value="name"
          use-input
          input-debounce="0"
          option-label="name"
          map-options
          emit-value
          options-dense
          :options="policyOptions"
          @input="setTypes(policyTypes, insuranceDetails.policy)"
          @filter="searchFilterBy"
          label="Policy Type"
          :rules="[
            val => (val && val.length > 0) || 'Please select the policy type'
          ]"
          :disable="isOfflineClientEdit"
        />
      </q-card>
      <q-card class="q-pa-sm q-mt-sm">
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
            :disable="isOfflineClientEdit"
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
            :disable="isOfflineClientEdit"
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
            :disable="isOfflineClientEdit"
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
            :disable="isOfflineClientEdit"
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
            :disable="isOfflineClientEdit"
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
            :disable="isOfflineClientEdit"
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
            :disable="isOfflineClientEdit"
          />
        </div>
        <div v-if="showAppraisal">
          <div class="row" style="align-items: center">
            <span class="form-heading" style="width: 50%"
              >Has Appraisal Cause</span
            >
            <q-toggle
              class="q-ml-auto"
              v-model="insuranceDetails.hasAppraisalClause"
              :disable="isOfflineClientEdit"
            />
          </div>
          <div class="row" style="align-items: center">
            <span class="form-heading" style="width: 50%"
              >Total Amount of policy</span
            >
            <q-input
              mask="#.#"
              type="number"
              v-model.number="insuranceDetails.totalAmount"
              placeholder="Total Amount"
              prefix="$"
              style="margin-left: auto; width: 50%"
              dense
              class="input-extra-padding"
              :disable="isOfflineClientEdit"
            />
          </div>
          <div class="row" style="align-items: center">
            <span class="form-heading" style="width: 50%"
              >Ordinance or Law</span
            >
            <q-input
              mask="#.#"
              type="number"
              v-model.number="insuranceDetails.ordinance"
              placeholder="Ordinance or Law"
              prefix="$"
              style="margin-left: auto; width: 50%"
              dense
              class="input-extra-padding"
              :disable="isOfflineClientEdit"
            />
          </div>
          <div class="row" style="align-items: center">
            <span class="form-heading" style="width: 50%">Debris Removal</span>
            <q-input
              mask="#.#"
              type="number"
              v-model.number="insuranceDetails.debrisRemoval"
              placeholder="Debris Removal"
              prefix="$"
              style="margin-left: auto; width: 50%"
              dense
              class="input-extra-padding"
              :disable="isOfflineClientEdit"
            />
          </div>
          <div class="row" style="align-items: center">
            <span class="form-heading" style="width: 50%">Mold/Fungi</span>
            <q-input
              mask="#.#"
              type="number"
              v-model.number="insuranceDetails.mold"
              placeholder="Mold/Fungi"
              prefix="$"
              style="margin-left: auto; width: 50%"
              dense
              class="input-extra-padding"
              :disable="isOfflineClientEdit"
            />
          </div>

          <div class="row" style="align-items: center">
            <span class="form-heading" style="width: 50%"
              >Business Interruption</span
            >
            <q-input
              mask="#.#"
              type="number"
              v-model.number="insuranceDetails.businessInt"
              placeholder="Business Interruption"
              prefix="$"
              style="margin-left: auto; width: 50%"
              dense
              class="input-extra-padding"
              :disable="isOfflineClientEdit"
            />
          </div>
        </div>
      </q-card>
      <q-card class="q-pa-sm q-mt-sm">
        <span class="form-heading">Reason for Limits/Denial</span>
        <div class="floating-label">
          <textarea
            v-if="!isOfflineClientEdit"
            rows="5"
            class="full-width"
            v-model="insuranceDetails.reasonsOfLD"
            style="resize: none"
          ></textarea>
          <textarea
            v-if="isOfflineClientEdit"
            disabled
            rows="5"
            class="full-width"
            v-model="insuranceDetails.reasonsOfLD"
            style="resize: none"
          ></textarea>
        </div>
      </q-card>
    </div>

    <!-- Carrier List Dialog -->
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
  </div>
</template>
<script>
import { constants } from '@utils/constant';
import CustomBar from 'components/CustomBar';
import CarriersList from 'components/CarriersList';
import { validateDate } from '@utils/validation';
import { mapGetters, mapActions } from 'vuex';
import { successMessage } from '@utils/validation';
import AddCarrier from 'components/AddCarrier';
import { date } from 'quasar';
import {
  onPhoneNumberClick,
  onEmailClick,
  showPhoneNumber
} from '@utils/clickable';

export default {
  name: 'AddClaim',
  components: {
    CustomBar,
    CarriersList,
    AddCarrier
  },
  props: {
    insuranceDetails: {
      type: Object
    },
    showAppraisal: {
      type: Boolean
    },
    policyInfo: {
      type: Boolean
    },
    lossInfo: {
      type: Object
    }
  },

  data() {
    return {
      policyOptions: [],
      vendorDialogFilterByIndustry: '',
      showVendorDialogFilters: false,
      valueName: '',
      addCarrierDialog: false,
      carriersListDialog: false,
      constants: constants
    };
  },

  computed: {
    ...mapGetters(['policyTypes', 'policyCategories', 'isOfflineClientEdit'])
  },
  methods: {
    ...mapActions(['getVendors']),
    successMessage,
    onPhoneNumberClick,
    onEmailClick,
    showPhoneNumber,

    //Add Vendor close list

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
    searchFilterBy(val, update) {
      this.insuranceDetails.policy.id = null;
      if (val === ' ') {
        update(() => {
          this.policyOptions = this.policyTypes;
        });
        return;
      }

      update(() => {
        const search = val.toLowerCase();
        this.policyOptions = this.policyTypes.filter(
          v => v.name.toLowerCase().indexOf(search) > -1
        );
      });
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

    validateDate,

    setTypes(types, data) {
      const obj = types.find(item => {
        return item.name === data.value;
      });

      data.machineValue = obj.machineValue;
      data.id = obj.id;
    },
    async onChaningPolicyEffectiveDate(newValue) {
      this.$nextTick(function() {
        this.insuranceDetails.policyExpireDate = date.formatDate(
          date.addToDate(this.insuranceDetails.policyEffectiveDate, {
            year: 1
          }),
          'MM/DD/YYYY'
        );
        this.$refs.qDateProxy.hide();
      });
    }
  }
};
</script>
