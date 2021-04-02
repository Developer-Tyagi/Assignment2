<template>
  <div class="bg-white full-width">
    <!-- Add vendor Dialog -->
    <q-dialog
      v-model="contractInfo.addVendorDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <AddVendor
          @onCloseAddVendor="onCloseAddVendorDialogBox"
          @closeDialog="closeAddVendorDialog"
          :componentName="contractInfo.vendorDialogName"
        />
      </q-card>
    </q-dialog>
    <!-- Vendor list Dialog -->
    <q-dialog
      v-model="contractInfo.vendorsListDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="contractInfo.vendorsListDialog = false"
          :dialogName="contractInfo.vendorDialogName"
        />
        <VendorsList
          :carrierName="contractInfo.carrierName"
          :selective="true"
          @selectedVendor="onClosingVendorSelectDialog"
          ref="list"
          :showFilter="contractInfo.showVendorDialogFilters"
          :filterName="contractInfo.vendorDialogFilterByIndustry"
          :valueName="contractInfo.valueName"
          @addVendor="
            (contractInfo.addVendorDialog = true),
              (contractInfo.vendorsListDialog = false)
          "
        />
      </q-card>
    </q-dialog>
    <!-- Contract Info -->
    <span class="form-heading">Contract Date</span>
    <div class="full-width">
      <q-input
        class="required"
        v-model="contractInfo.contractDate"
        mask="##/##/####"
        label="MM/DD/YYYY"
        lazy-rules
        :rules="[
          val => (validateDate(val) && val && val.length > 0) || 'Invalid date!'
        ]"
      >
        <template v-slot:append>
          <q-icon name="event" size="sm" color="primary" class="cursor-pointer">
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="contractInfo.contractDate"
                @input="() => $refs.qDateProxy.hide()"
                mask="MM/DD/YYYY"
              ></q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>

    <br />
    <span class="form-heading">Date of First Contract</span>
    <div class="full-width">
      <q-input
        v-model="contractInfo.firstContractDate"
        mask="##/##/####"
        label="MM/DD/YYYY"
        lazy-rules
        :rules="[val => validateDate(val) || 'Invalid date!']"
      >
        <template v-slot:append>
          <q-icon name="event" size="sm" color="primary" class="cursor-pointer">
            <q-popup-proxy
              ref="qDateProxy4"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="contractInfo.firstContractDate"
                @input="() => $refs.qDateProxy4.hide()"
                mask="MM/DD/YYYY"
              ></q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <span class="form-heading">Time Of First Contract</span>
    <div class="full-width">
      <q-input
        v-model="contractInfo.time"
        now
        mask="time"
        format24h
        lazy-rules
        :rules="[val => validateTime(val) || 'Invalid time!']"
      >
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy
              transition-show="scale"
              transition-hide="scale"
              ref="qTimeProxy"
            >
              <q-time v-model="contractInfo.time" @input="closeTimeDialog">
                <div class="row items-center justify-end">
                  <q-btn
                    v-close-popup
                    label="Close"
                    color="primary"
                    flat
                  ></q-btn>
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="row">
      <q-btn-toggle
        v-model="contractInfo.buttonGroup"
        push
        glossy
        toggle-color="primary"
        :options="[
          { label: ' $', value: 'dollar' },
          { label: ' %', value: 'percentage' },
          { value: 'update', icon: 'update' }
        ]"
      ></q-btn-toggle>
    </div>

    <div class="row" style="align-items: center">
      <q-input
        class="q-ml-auto full-width"
        mask="#.#"
        type="number"
        v-model.number="contractInfo.claimFeeRate"
        label="Claim Fee Rate"
        :suffix="
          contractInfo.buttonGroup == 'dollar'
            ? '$ flat'
            : '' || contractInfo.buttonGroup == 'percentage'
            ? '%'
            : '' || contractInfo.buttonGroup == 'update'
            ? '/hr'
            : ''
        "
        style="width: 50%"
      />
    </div>
    <br />
    <span class="form-heading"> Source Of Claim </span>
    <div>
      <q-select
        v-model="contractInfo.sourceDetails.type"
        :options="leadSources"
        option-label="name"
        option-value="value"
        options-dense
        emit-value
        map-options
        options-dense
        @input="onChangingSourceType()"
      />
      <q-input
        v-if="
          contractInfo.sourceDetails.type != constants.industries.VENDOR &&
            contractInfo.sourceDetails.type != '' &&
            contractInfo.sourceDetails.type != 'google'
        "
        type="text"
        class="required"
        placeholder="Enter Source details"
        v-model="contractInfo.sourceDetails.details"
        lazy-rules
        :rules="[val => (val && val.length > 0) || '']"
      />
      <div
        v-else-if="
          contractInfo.sourceDetails.type == constants.industries.VENDOR
        "
        class="custom-select"
        @click="onAddVendorDialogClick(constants.industries.VENDOR)"
      >
        <div class="select-text">
          {{
            contractInfo.sourceDetails.id
              ? contractInfo.sourceDetails.details
              : 'Select Lead Source'
          }}
        </div>
      </div>
    </div>
    <br />
    <span class="form-heading">Accept or Cancel Claim ?</span>
    <p>
      If this claim will not be accepted, you can mark the claim as being
      "Cancelled",which will close the claim upon creation. This allows you to
      record the client and property information in Claim Guru for historical
      purposes.
    </p>
    <div class="row">
      <p class="q-mx-none q-my-auto form-heading">Cancelled?</p>
      <q-toggle class="q-ml-auto" v-model="contractInfo.cancelledToggle" />
    </div>
    <div class="full-width">
      <q-select
        v-model="contractInfo.reasonForCancellation"
        :options="reasonForCancellation"
        label="Reason For Cancellation"
        options-dense
      ></q-select>
    </div>
    <br />
    <span class="form-heading">Reason For Cancellation</span>
    <div class="floating-label">
      <textarea
        rows="5"
        required
        class="full-width"
        v-model="contractInfo.reasonForCancellationText"
        style="resize: none"
      ></textarea>
    </div>
  </div>
</template>
<script>
import CustomBar from 'components/CustomBar';

import AddVendor from 'components/AddVendor';

import { validateDate, validateTime } from '@utils/validation';
import { mapGetters, mapActions } from 'vuex';
import { constants } from '@utils/constant';
import VendorsList from 'components/VendorsList';

export default {
  name: 'ContractInfo',
  components: {
    CustomBar,
    AddVendor,
    VendorsList
  },
  props: {
    contractInfo: {
      type: Object
    }
  },

  data() {
    return {
      constants: constants,
      // valueName: '',
      reasonForCancellation: [
        'Client Cancelled',
        'Insufficient Coverage',
        'Loss to small',
        'No coverage',
        'Other'
      ]
    };
  },
  created() {
    this.getVendors(this.$route.params.id);
  },

  computed: {
    ...mapGetters(['leadSources', 'vendors'])
  },
  methods: {
    ...mapActions(['getVendors']),
    //This function is for closing the time popup
    closeTimeDialog() {
      this.$refs.qTimeProxy.hide();
    },

    async onCloseAddVendorDialogBox(result, selected) {
      if (result === true) {
        await this.getVendors();
        this.onClosingVendorSelectDialog(selected, this.contractInfo.valueName);
      }
    },
    onChangingSourceType() {
      this.contractInfo.sourceDetails.id = '';
      this.contractInfo.sourceDetails.details = '';
      this.contractInfo.sourceDetails.machineValue = '';
    },
    async onAddVendorDialogClick(name) {
      this.contractInfo.valueName = name;
      this.contractInfo.vendorDialogName = constants.industries.VENDOR;
      this.contractInfo.showVendorDialogFilters = true;
      this.contractInfo.vendorDialogFilterByIndustry = '';
      this.contractInfo.vendorDialogName = name;
      this.contractInfo.vendorsListDialog = true;
    },
    async onClosingVendorSelectDialog(vendor) {
      this.contractInfo.sourceDetails.id = vendor.id;
      this.contractInfo.sourceDetails.details = vendor.name;

      this.contractInfo.vendorsListDialog = false;
    },

    closeAddVendorDialog(e) {
      this.contractInfo.addVendorDialog = false;
      if (e) {
        // this.$refs.list.getVendors(params);
        this.contractInfo.vendorsListDialog = false;
      } else {
        this.contractInfo.vendorsListDialog = true;
      }
    },

    validateDate,
    validateTime,
    async onAddVendorDialogClick(name) {
      this.contractInfo.valueName = name;
      this.contractInfo.vendorDialogName = constants.industries.VENDOR;
      this.contractInfo.showVendorDialogFilters = true;
      this.contractInfo.vendorDialogFilterByIndustry = '';
      this.contractInfo.vendorDialogName = name;
      this.contractInfo.vendorsListDialog = true;
    }
  }
};
</script>
