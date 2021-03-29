<template>
  <div class="bg-white full-width">
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
          :carrierName="expertVendorInfo.carrierName"
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

    <!-- Expert Vendor Info -->
    <div class="row">
      <span class="form-heading">Do any vendors need to be assigned?</span>
      <q-toggle
        class="q-ml-auto"
        v-model="expertVendorInfo.vendorExpertHiredToggle"
        @input="onExpertVendorToggleOff"
      />
    </div>
    <!-- Assigning Multiple Expert Vendors -->
    <div
      v-for="(item, index) in expertVendorInfo.industry"
      v-if="expertVendorInfo.industry.length >= 0"
    >
      <q-select
        v-if="expertVendorInfo.vendorExpertHiredToggle"
        class="full-width"
        v-model="expertVendorInfo.industry[index].value"
        use-input
        input-debounce="0"
        option-label="name"
        label="Industry"
        :options="expertVendorInfo.vendorIndustriesOptions"
        option-value="name"
        @filter="searchFilterBy"
        @input="setVendorIndustryName(index)"
        behavior="menu"
        emit-value
        map-options
        lazy-rules
        :rules="[
          val => (val && val.length > 0) || 'Please fill the Vendor Industry'
        ]"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-black"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>
      <!-- This will Show the input when industry Type is Others -->
      <q-input
        v-model="industryType.value"
        v-if="expertVendorInfo.industry[index].value == 'Others'"
        label="Enter New Industry Type"
        dense
        class="input-extra-padding"
      />
      <q-btn
        class="q-mt-md"
        v-if="expertVendorInfo.industry[index].value == 'Others'"
        label="Add"
        outline
        @click="addAnotherIndustry"
      />

      <div
        v-if="expertVendorInfo.vendorExpertHiredToggle"
        class="custom-select"
        v-model="expertVendorInfo.vendors[index].value"
        @click="
          onAddVendorDialogClick(constants.industries.EXPERTVENDOR, index)
        "
      >
        <div class="select-text">
          {{
            expertVendorInfo.id
              ? expertVendorInfo.vendors[index].value
              : 'Select Vendor'
          }}
        </div>
      </div>
    </div>
    <q-btn
      v-if="expertVendorInfo.vendorExpertHiredToggle"
      class="q-ma-none q-mb-sm"
      size="sm"
      label="Add More"
      color="primary"
      @click="addAnotherVendor()"
    />
    <div class="row">
      <p class="form-heading q-mx-none q-my-auto">Is Insured hired?</p>
      <q-toggle
        class="q-ml-auto"
        v-model="expertVendorInfo.anyOtherExpertHiredToggle"
      />
    </div>
    <span class="form-heading">Notes</span>

    <div>
      <textarea
        rows="5"
        required
        class="full-width"
        v-model="expertVendorInfo.notes"
        style="resize: none"
      />
    </div>

    <div>
      <span class="form-heading">Internal Notes</span>
      <textarea
        rows="5"
        required
        class="full-width"
        v-model="expertVendorInfo.internalNotes"
        style="resize: none"
      />
    </div>
  </div>
</template>
<script>
import { constants } from '@utils/constant';
import CustomBar from 'components/CustomBar';
import VendorsList from 'components/VendorsList';
import { mapGetters, mapActions } from 'vuex';
import AddVendor from 'components/AddVendor';
export default {
  name: 'ExpertVendorInfo',
  components: {
    CustomBar,
    VendorsList,
    AddVendor
  },
  props: {
    expertVendorInfo: {
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
    ...mapGetters([
      'policyTypes',
      'policyCategories',
      'vendorIndustries',
      'vendors'
    ])
  },
  methods: {
    ...mapActions(['getVendors']),

    addAnotherVendor() {
      this.expertVendorInfo.industry.push({
        id: this.expertVendorInfo.industry.id,
        value: this.expertVendorInfo.industry.value
      });
      let len = this.expertVendorInfo.vendors.length;
      this.expertVendorInfo.vendors.push({
        id: this.expertVendorInfo.vendors[len - 1].id,
        value: this.expertVendorInfo.vendors[len - 1].value
      });
      this.expertVendorInfo.vendors[len].value = 'Select Vendor';
    },
    //This function is user for searching Industries and  add others option at the last
    searchFilterBy(val, update) {
      let len = this.vendorIndustries.length;

      if (this.vendorIndustries[len - 1].name != 'Others') {
        this.vendorIndustries.push({
          id: '',
          machineValue: 'others',
          name: 'Others'
        });
      }

      this.expertVendorInfo.industry.value = null;
      if (val === ' ') {
        update(() => {
          this.expertVendorInfo.vendorIndustriesOptions = this.vendorIndustries;
        });
        return;
      }

      update(() => {
        const search = val.toLowerCase();
        this.expertVendorInfo.vendorIndustriesOptions = this.vendorIndustries.filter(
          v => v.name.toLowerCase().indexOf(search) > -1
        );
      });
    },

    setVendorIndustryName(index) {
      const selectedName = this.expertVendorInfo.industry[index].value;
      const result = this.vendorIndustries.find(obj => {
        return obj.name === selectedName;
      });

      this.expertVendorInfo.industry[index].value = result.name;
      this.industryTypeValue = result.name;

      this.expertVendorInfo.industry[index].id = result.id;
      this.expertVendorInfo.industry[index].machineValue = result.machineValue;

      if (this.expertVendorInfo.industry[index].value != 'Others') {
        this.expertVendorButton = true;
      } else {
        this.expertVendorButton = false;
      }
    },
    async onAddVendorDialogClick(name, index) {
      this.valueName = name;
      this.vendorDialogName = constants.industries.EXPERTVENDOR;
      this.showVendorDialogFilters = false;
      this.vendorDialogFilterByIndustry = constants.industries.VENDOR;
      this.vendorDialogFilterByIndustry = this.expertVendorInfo.industry[
        index
      ].machineValue;

      this.vendorDialogName = name;

      this.vendorsListDialog = true;
    },

    //Add Vendor close list

    async onCloseAddVendorDialogBox(result, selected) {
      if (result === true) {
        await this.getVendors();
        this.onClosingVendorSelectDialog(selected, this.valueName);
      }
    },
    async onClosingVendorSelectDialog(vendor, dialogName) {
      const params = {
        industry: vendor.industry.machineValue,
        name: ''
      };
      await this.getVendors(params);
      let vendorsValue = this.vendors.find(o => o.name === vendor.name);
      this.expertVendorInfo.id = vendorsValue.id;

      let len = this.expertVendorInfo.vendors.length;

      this.expertVendorInfo.vendors[len - 1].id = vendorsValue.id;

      this.expertVendorInfo.vendors[len - 1].value = vendor.name;

      this.vendorsListDialog = false;
    },
    closeAddVendorDialog(e) {
      this.addVendorDialog = false;
      this.getVendors();
      if (e) {
        this.vendorsListDialog = false;
      } else {
        this.vendorsListDialog = true;
      }
    },

    // in Expert Vendor info when the Toggle Button is off data will be cleared.
    onExpertVendorToggleOff() {
      if (!this.expertVendorInfo.vendorExpertHiredToggle) {
        this.expertVendorInfo.industry = [
          {
            id: '',
            value: '',
            machineValue: ''
          }
        ];
        this.expertVendorInfo.vendors = [
          {
            id: '',
            value: 'Select Vendor'
          }
        ];
        this.expertVendorInfo.expertVendorButton = true;
      } else {
        this.expertVendorInfo.expertVendorButton = false;
      }
    }
  }
};
</script>
