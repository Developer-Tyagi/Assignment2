<template>
  <div>
    <!-- Mortgage Dialog -->
    <div
      class="custom-select"
      v-model="mortgageInfo.mortgageDetails[0].id"
      @click="onAddVendorDialogClick(constants.industries.MORTGAGE)"
    >
      <div class="select-text">
        {{
          mortgageInfo.mortgageDetails[0].value
            ? mortgageInfo.mortgageDetails[0].value
            : 'Enter Mortgage Company'
        }}
      </div>
    </div>

    <q-input
      dense
      v-model="mortgageInfo.mortgageDetails[0].loanNumber"
      label="Loan Number"
    />
    <q-input
      dense
      v-model="mortgageInfo.mortgageDetails[0].accountNumber"
      label="Account Number"
    />
    <div class="form-heading">Notes</div>
    <textarea
      rows="5"
      required
      class="full-width"
      v-model="mortgageInfo.mortgageDetails[0].notes"
      style="resize: none"
    />
    <div class="row" v-if="isThereSecondMortgageToggle">
      <span class="form-heading">
        Is there a 2nd mortgage on the home?
      </span>

      <q-toggle
        class="q-ml-auto"
        v-model="mortgageInfo.isSecondMortgageHome"
        @input="onSecondMortgageToggle"
      />
    </div>
    <div v-if="mortgageInfo.isSecondMortgageHome">
      <div
        class="custom-select"
        v-model="mortgageInfo.mortgageDetails[1].id"
        @click="onAddVendorDialogClick(constants.industries.SECONDARYMORTGAGE)"
      >
        <div class="select-text">
          {{
            mortgageInfo.mortgageDetails[1].value
              ? mortgageInfo.mortgageDetails[1].value
              : 'Enter Mortgage Company'
          }}
        </div>
      </div>
      <q-input
        dense
        v-model="mortgageInfo.mortgageDetails[1].loanNumber"
        label="Loan Number"
      />
      <q-input
        dense
        v-model="mortgageInfo.mortgageDetails[1].accountNumber"
        label="Account Number"
      />
      <div class="form-heading">Notes</div>
      <textarea
        rows="5"
        class="full-width"
        v-model="mortgageInfo.mortgageDetails[1].notes"
        style="resize: none"
      />
    </div>
    <!-- Vendor list Dialog -->
    <q-dialog
      v-model="mortgageInfo.vendorsListDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="mortgageInfo.vendorsListDialog = false"
          :dialogName="mortgageInfo.vendorDialogName"
        />
        <VendorsList
          :carrierName="mortgageInfo.carrierName"
          :selective="true"
          @selectedVendor="onClosingVendorSelectDialog"
          ref="list"
          :showFilter="mortgageInfo.showVendorDialogFilters"
          :filterName="mortgageInfo.vendorDialogFilterByIndustry"
          :valueName="mortgageInfo.valueName"
          @addVendor="mortgageInfo.addVendorDialog = true"
        />
      </q-card>
    </q-dialog>
    <!-- Add vendor Dialog -->

    <q-dialog
      v-model="mortgageInfo.addVendorDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <AddVendor
          @onCloseAddVendor="onCloseAddVendorDialogBox"
          @closeDialog="mortgageInfo.addVendorDialog = false"
          :componentName="mortgageInfo.vendorDialogName"
        />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import CustomBar from 'components/CustomBar';

import AddVendor from 'components/AddVendor';
import { successMessage } from '@utils/validation';
import { mapGetters, mapActions } from 'vuex';
import { constants } from '@utils/constant';
import VendorsList from 'components/VendorsList';

export default {
  name: 'Mortgage',
  components: {
    CustomBar,
    AddVendor,
    VendorsList
  },
  props: {
    mortgageInfo: {
      type: Object
    },
    isThereSecondMortgageToggle: {
      type: Boolean,
      required: false
    }
  },

  data() {
    return {
      constants: constants
    };
  },
  computed: { ...mapGetters(['vendors']) },
  methods: {
    ...mapActions(['getVendors']),
    successMessage,
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
    //Add Vendor Close List

    async onCloseAddVendorDialogBox(result, selected) {
      if (result) {
        await this.getVendors();
        this.successMessage(constants.successMessages.MORTGAGE);
        this.onClosingVendorSelectDialog(selected, this.mortgageInfo.valueName);
      }
    },
    async onClosingVendorSelectDialog(vendor, dialogName) {
      if (dialogName == constants.industries.MORTGAGE) {
        this.mortgageInfo.mortgageDetails[0].id = vendor.id;
        this.mortgageInfo.mortgageDetails[0].value = vendor.name;
      } else {
        this.mortgageInfo.mortgageDetails[1].id = vendor.id;

        this.mortgageInfo.mortgageDetails[1].value = vendor.name;
      }
      this.mortgageInfo.vendorsListDialog = false;
    },
    async onAddVendorDialogClick(name) {
      this.mortgageInfo.valueName = name;

      if (name == constants.industries.MORTGAGE) {
        this.mortgageInfo.vendorDialogName = constants.industries.MORTGAGE;
        this.mortgageInfo.showVendorDialogFilters = false;
        this.mortgageInfo.vendorDialogFilterByIndustry =
          constants.industries.MORTGAGE;
        const params = {
          industry: this.mortgageInfo.vendorDialogFilterByIndustry,
          name: ''
        };
        await this.getVendors(params);
      } else {
        this.mortgageInfo.vendorDialogName = constants.industries.MORTGAGE;

        this.mortgageInfo.showVendorDialogFilters = false;
        this.mortgageInfo.vendorDialogFilterByIndustry =
          constants.industries.MORTGAGE;
      }

      this.mortgageInfo.vendorDialogName = name;

      this.mortgageInfo.vendorsListDialog = true;
    },
    onSecondMortgageToggle() {
      if (this.mortgageInfo.isSecondMortgageHome) {
        this.mortgageInfo.mortgageDetails.push({
          id: '',
          value: '',
          loanNumber: '',
          accountNumber: '',
          isPrimary: false,
          notes: ''
        });
      } else {
        this.mortgageInfo.mortgageDetails.pop();
      }
    }
  }
};
</script>
