<template>
  <div class="bg-white full-width">
    <!-- vendor list dialogbox -->
    <q-dialog
      v-model="vendorsListDialog"
      persistent
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
          :filterName="industryName"
          @addVendor="
            vendorsListDialog = false;
            addVendorDialog = true;
          "
          :showFilter="true"
          :selectedVendorName="selectedVendorName"
          @afterSelecting="onSelectingVendorList"
        />
      </q-card>
    </q-dialog>
    <!-- add vendor dialog -->
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
          @closeDialog="addVendorDialog = false"
          :industryValue="industryValue"
        />
      </q-card>
    </q-dialog>
    <!-- Expert Vendor Info -->

    <q-card class="q-pa-sm">
      <div class="row" v-if="!claimExpertVendor">
        <p class="form-heading q-mx-none q-my-auto">
          Has the insured hired any vendors?
        </p>
        <q-toggle
          class="q-ml-auto"
          v-model="expertVendorInfo.anyOtherExpertHiredToggle"
        />
      </div>
      <!-- Assigning Multiple Expert Vendors -->

      <div
        v-for="(item, index) in expertVendorInfo.isAlreadyHiredVendor"
        v-if="expertVendorInfo.anyOtherExpertHiredToggle"
      >
        <q-select
          v-if="!claimExpertVendor"
          class="full-width"
          v-model="item.industry"
          use-input
          input-debounce="0"
          option-label="name"
          label="Industry"
          :options="vendorIndustries"
          option-value="machineValue"
          behavior="menu"
          @input="setVendorType(index)"
          emit-value
          map-options
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'Please fill the Vendor Industry'
          ]"
        >
        </q-select>

        <div>
          <div
            class="custom-select"
            @click="
              openVendorSelect(
                item,
                index,
                expertVendorInfo.isAlreadyHiredVendor
              )
            "
            v-if="!item.vendor.value"
          >
            <div class="select-text">Click for choosing a vendor</div>
          </div>
          <q-card
            bordered
            v-if="item.vendor.value"
            @click="
              openVendorSelect(
                item,
                index,
                expertVendorInfo.isAlreadyHiredVendor
              )
            "
            class="q-my-md q-pa-md"
          >
            <div class="text-bold">
              {{ item.vendor.value }}
            </div>
            <div
              v-if="item.vendor.address && item.vendor.address.streetAddress"
            >
              <div>
                {{
                  item.vendor.address ? item.vendor.address.houseNumber : '-'
                }}
                ,
                {{
                  item.vendor.address.streetAddress
                    ? item.vendor.address.streetAddress
                    : '-'
                }}
              </div>
              <div>
                {{
                  item.vendor.address.addressLocality
                    ? item.vendor.address.addressLocality
                    : '-'
                }}
                ,
                {{
                  item.vendor.address.addressRegion
                    ? item.vendor.address.addressRegion
                    : '-'
                }}
              </div>
              <div class="row">
                {{
                  item.vendor.address.addressCountry
                    ? item.vendor.address.addressCountry
                    : '-'
                }}
                -
                {{
                  item.vendor.address.postalCode
                    ? item.vendor.address.postalCode
                    : '-'
                }}
              </div>
            </div>
            <div>
              Phone:
              <span
                class="clickLink"
                @click="onPhoneNumberClick(item.vendor.phone, $event)"
              >
                {{ item.vendor.phone }}</span
              >
            </div>
            <div>
              Email:<span
                class="clickLink"
                @click="onEmailClick(item.vendor.email, $event)"
              >
                {{ item.vendor.email }}</span
              >
            </div>
          </q-card>
        </div>
      </div>
      <div class=" row justify-between" v-if="!claimExpertVendor">
        <div>
          <q-btn
            v-if="expertVendorInfo.anyOtherExpertHiredToggle"
            size="sm"
            label="Add More"
            color="primary"
            @click="addAnotherVendor(expertVendorInfo.isAlreadyHiredVendor)"
          />
        </div>
        <div>
          <q-btn
            v-if="expertVendorInfo.isAlreadyHiredVendor.length > 1"
            size="sm"
            label="remove"
            color="primary"
            @click="removeAnotherVendor(expertVendorInfo.isAlreadyHiredVendor)"
          />
        </div>
      </div>
    </q-card>

    <q-card class="q-pa-sm q-mt-sm" v-if="!claimExpertVendor">
      <div class="row">
        <span class="form-heading"
          >Does Claim Guru need to assign any vendors?</span
        >
        <q-toggle
          class="q-ml-auto"
          v-model="expertVendorInfo.vendorExpertHiredToggle"
          @input="onExpertVendorToggleOff"
        />
      </div>
      <div
        v-for="(item, index) in expertVendorInfo.isHiredByClaimguru"
        v-if="expertVendorInfo.vendorExpertHiredToggle"
      >
        <q-select
          class="full-width"
          v-model="item.industry"
          use-input
          input-debounce="0"
          option-label="name"
          label="Industry"
          :options="vendorIndustries"
          option-value="machineValue"
          behavior="menu"
          emit-value
          map-options
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'Please fill the Vendor Industry'
          ]"
        >
        </q-select>
        <div>
          <div
            class="custom-select"
            @click="
              openVendorSelect(item, index, expertVendorInfo.isHiredByClaimguru)
            "
            v-if="!item.vendor.value"
          >
            <div class="select-text">Click for choosing a vendor</div>
          </div>
          <q-card
            bordered
            v-if="item.vendor.value"
            @click="
              openVendorSelect(item, index, expertVendorInfo.isHiredByClaimguru)
            "
            class="q-my-md q-pa-md"
          >
            <div class="text-bold">{{ item.vendor.value }}kk</div>
            <div
              v-if="item.vendor.address && item.vendor.address.streetAddress"
            >
              <div>
                {{
                  item.vendor.address ? item.vendor.address.houseNumber : '-'
                }}
                ,
                {{
                  item.vendor.address.streetAddress
                    ? item.vendor.address.streetAddress
                    : '-'
                }}
              </div>
              <div>
                {{
                  item.vendor.address.addressLocality
                    ? item.vendor.address.addressLocality
                    : '-'
                }}
                ,
                {{
                  item.vendor.address.addressRegion
                    ? item.vendor.address.addressRegion
                    : '-'
                }}
              </div>
              <div class="row">
                {{
                  item.vendor.address.addressCountry
                    ? item.vendor.address.addressCountry
                    : '-'
                }}
                -
                {{
                  item.vendor.address.postalCode
                    ? item.vendor.address.postalCode
                    : '-'
                }}
              </div>
            </div>
            <div>
              Phone:
              <span
                class="clickLink"
                @click="onPhoneNumberClick(item.vendor.phone, $event)"
              >
                {{ item.vendor.phone }}</span
              >
            </div>
            <div>
              Email:<span
                class="clickLink"
                @click="onEmailClick(item.vendor.email, $event)"
              >
                {{ item.vendor.email }}</span
              >
            </div>
          </q-card>
        </div>
      </div>
      <q-btn
        v-if="expertVendorInfo.vendorExpertHiredToggle"
        class="q-ma-none q-mb-sm"
        size="sm"
        label="Add More"
        color="primary"
        @click="addAnotherVendor(expertVendorInfo.isHiredByClaimguru)"
      />
    </q-card>

    <q-card class="q-pa-sm q-mt-sm" v-if="!claimExpertVendor">
      <div>
        <span class="form-heading">Notes</span>
        <textarea
          rows="5"
          class="full-width"
          v-model="expertVendorInfo.notes"
          style="resize: none"
        />
      </div>

      <div>
        <span class="form-heading">Internal Notes</span>
        <textarea
          rows="5"
          class="full-width"
          v-model="expertVendorInfo.internalNotes"
          style="resize: none"
        />
      </div>
    </q-card>
  </div>
</template>
<script>
import { constants } from '@utils/constant';
import CustomBar from 'components/CustomBar';
import VendorsList from 'components/VendorsList';
import { mapGetters, mapActions } from 'vuex';
import AddVendor from 'components/AddVendor';
import { onPhoneNumberClick, onEmailClick } from '@utils/clickable';

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
    },
    claimExpertVendor: {
      type: Boolean
    },
    item: {
      type: Object
    }
  },
  data() {
    return {
      industryValue: '',
      constants: constants,
      industryName: '',
      selectedVendorName: '',
      selectedIndex: '',
      selectedArray: '',
      addVendorDialog: false,
      vendorsListDialog: false
    };
  },
  created() {
    // This is for Claim Exp Vendor
    if (this.claimExpertVendor) {
      this.expertVendorInfo.isAlreadyHiredVendor[0].industry = 'vendor';
      this.expertVendorInfo.anyOtherExpertHiredToggle = true;
    }
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
    ...mapActions(['getVendors', 'addIndustry', 'getVendorIndustries']),

    onPhoneNumberClick,
    onEmailClick,
    //This function is user for searching Industries and  add others option at the last

    async onAddVendorDialogClick(name, index) {
      this.$q.notify({
        type: 'negative',
        message: `Add Industry Type First!`,
        position: 'top'
      });
      this.$q.notify({
        message: 'Sorry ! Cannot add Others or Blank  ',
        position: 'top',
        type: 'negative'
      });
    },

    // in Expert Vendor info when the Toggle Button is off data will be cleared.
    onExpertVendorToggleOff() {},

    onSelectingVendorList(vendor) {
      this.selectedArray[this.selectedIndex].vendor.id = vendor.id;
      this.selectedArray[this.selectedIndex].vendor.email = vendor.email;
      this.selectedArray[this.selectedIndex].vendor.address = vendor.address;
      this.selectedArray[this.selectedIndex].vendor.value = vendor.name;
      this.selectedArray[this.selectedIndex].vendor.phone = vendor.phoneNumber
        ? vendor.phoneNumber[0].number
        : '';
      this.vendorsListDialog = false;
      this.$emit('vendorId', vendor.id);
    },
    setVendorType(index) {
      const val = this.expertVendorInfo.isAlreadyHiredVendor[index].industry;

      const result = this.vendorIndustries.find(obj => {
        return obj.machineValue == val;
      });
      this.industryValue = result;
    },

    onCloseAddVendorDialogBox(vendor) {
      this.selectedArray[this.selectedIndex].vendor.id = vendor.id;
      this.selectedArray[this.selectedIndex].vendor.email = vendor.email;
      this.selectedArray[this.selectedIndex].vendor.address = vendor.address;
      this.selectedArray[this.selectedIndex].vendor.value = vendor.name;
      this.selectedArray[this.selectedIndex].vendor.phone = vendor.phoneNumber
        ? vendor.phoneNumber[0].number
        : '';
      this.$emit('vendorId', vendor.id);
      this.vendorsListDialog = false;
      this.addVendorDialog = false;
    },

    addAnotherVendor(array) {
      const len = array.length;
      if (array[len - 1].industry && array[len - 1].vendor.id) {
        array.push({ industry: '', vendor: {} });
      }
    },
    removeAnotherVendor(array) {
      array.pop();
    },

    openVendorSelect(item, index, array) {
      this.industryName = item.industry;
      this.selectedIndex = index;
      this.selectedArray = array;
      this.vendorsListDialog = true;
    }
  }
};
</script>
