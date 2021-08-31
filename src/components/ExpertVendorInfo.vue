<template>
  <div class="bg-white full-width">
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
          :disable="isOfflineClientEdit"
        />
      </div>
      <!-- Assigning Multiple Expert Vendors -->

      <div
        v-for="(item, index) in expertVendorInfo.isAlreadyHiredVendor"
        v-if="expertVendorInfo.anyOtherExpertHiredToggle"
      >
        <q-select
          borderless
          class="required input-style input-field full-width"
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
          <q-input
            borderless
            class="required input-style input-field"
            v-model="item.vendor.value"
            style="color: transparent"
            maxlength="0"
            placeholder="Click add for choosing a vendor"
            v-if="!item.vendor.email"
            lazy-rules
            :rules="[
              val =>
                (val && val.length > 0) || 'Please fill the Vendor Industry'
            ]"
          >
            <q-icon
              class="q-mt-md"
              name="person_add"
              size="sm"
              @click="
                openVendorSelect(
                  item,
                  index,
                  expertVendorInfo.isAlreadyHiredVendor
                )
              "
            />
            <!-- <div
              class="custom-select full-width bg-red"
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
            </div> -->
          </q-input>
          <q-card
            bordered
            v-if="item.vendor.email"
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
              v-if="
                item.vendor.mailingAddress &&
                  item.vendor.mailingAddress.streetAddress
              "
            >
              <div>
                {{
                  item.vendor.mailingAddress
                    ? item.vendor.mailingAddress.houseNumber
                    : '-'
                }}
                ,
                {{
                  item.vendor.mailingAddress.streetAddress
                    ? item.vendor.mailingAddress.streetAddress
                    : '-'
                }}
              </div>
              <div>
                {{
                  item.vendor.mailingAddress.addressLocality
                    ? item.vendor.mailingAddress.addressLocality
                    : '-'
                }}
                ,
                {{
                  item.vendor.mailingAddress.addressRegion
                    ? item.vendor.mailingAddress.addressRegion
                    : '-'
                }}
              </div>
              <div class="row">
                {{
                  item.vendor.mailingAddress.addressCountry
                    ? item.vendor.mailingAddress.addressCountry
                    : '-'
                }}
                -
                {{
                  item.vendor.mailingAddress.postalCode
                    ? item.vendor.mailingAddress.postalCode
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
      <div class="row justify-between" v-if="!claimExpertVendor">
        <div class="q-mt-md">
          <q-btn
            v-if="expertVendorInfo.anyOtherExpertHiredToggle"
            size="sm"
            label="Add More"
            color="primary"
            @click="addAnotherVendor(expertVendorInfo.isAlreadyHiredVendor)"
          />
        </div>
        <div class="q-mt-md">
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
        <div class="form-heading q-mt-sm">
          Does Claim Guru need to assign any vendors?
        </div>
        <div>
          <q-toggle
            class="q-ml-auto"
            v-model="expertVendorInfo.vendorExpertHiredToggle"
            @input="onExpertVendorToggleOff"
            :disable="isOfflineClientEdit"
          />
        </div>
      </div>
      <div
        v-for="(item, index) in expertVendorInfo.isHiredByClaimguru"
        v-if="expertVendorInfo.vendorExpertHiredToggle"
      >
        <q-select
          borderless
          class="required input-style input-field full-width"
          v-model="item.industry"
          use-input
          input-debounce="0"
          option-label="name"
          label="Industry"
          :options="vendorIndustries"
          option-value="machineValue"
          behavior="menu"
          @input="setVendorTypeForAssignVendor(index)"
          emit-value
          map-options
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'Please fill the Vendor Industry'
          ]"
        >
        </q-select>
        <div>
          <q-btn
            outline
            rounded
            class="custom-select q-mt-md full-width"
            @click="
              openVendorSelect(item, index, expertVendorInfo.isHiredByClaimguru)
            "
            v-if="!item.vendor.email"
          >
            Click for choosing a vendor
          </q-btn>

          <q-card
            bordered
            v-if="item.vendor.email"
            @click="
              openVendorSelect(item, index, expertVendorInfo.isHiredByClaimguru)
            "
            class="q-my-md q-pa-md"
          >
            <div class="text-bold">{{ item.vendor.value }}</div>
            <div
              v-if="
                item.vendor.mailingAddress &&
                  item.vendor.mailingAddress.streetAddress
              "
            >
              <div>
                {{
                  item.vendor.mailingAddress
                    ? item.vendor.mailingAddress.houseNumber
                    : '-'
                }}
                ,
                {{
                  item.vendor.mailingAddress.streetAddress
                    ? item.vendor.mailingAddress.streetAddress
                    : '-'
                }}
              </div>
              <div>
                {{
                  item.vendor.mailingAddress.addressLocality
                    ? item.vendor.mailingAddress.addressLocality
                    : '-'
                }}
                ,
                {{
                  item.vendor.mailingAddress.addressRegion
                    ? item.vendor.mailingAddress.addressRegion
                    : '-'
                }}
              </div>
              <div class="row">
                {{
                  item.vendor.mailingAddress.addressCountry
                    ? item.vendor.mailingAddress.addressCountry
                    : '-'
                }}
                -
                {{
                  item.vendor.mailingAddress.postalCode
                    ? item.vendor.mailingAddress.postalCode
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
      <div class="row justify-between">
        <div>
          <q-btn
            v-if="expertVendorInfo.vendorExpertHiredToggle"
            class="q-ma-none q-mb-sm"
            size="sm"
            label="Add More"
            color="primary"
            @click="addAnotherVendor(expertVendorInfo.isHiredByClaimguru)"
          />
        </div>
        <div>
          <q-btn
            v-if="expertVendorInfo.isHiredByClaimguru.length > 1"
            size="sm"
            label="remove"
            color="primary"
            @click="removeAnotherVendor(expertVendorInfo.isHiredByClaimguru)"
          />
        </div>
      </div>
    </q-card>

    <q-card class="q-pa-sm q-mt-sm" v-if="!claimExpertVendor">
      <div>
        <span class="form-heading">Notes</span>
        <q-input
          v-if="!isOfflineClientEdit"
          rows="5"
          type="textarea"
          borderless
          class="required  input-style "
          v-model="expertVendorInfo.notes"
          style="resize: none"
        />
        <q-input
          rows="5"
          disabled
          borderless
          type="textarea"
          class="required  input-style"
          v-model="expertVendorInfo.notes"
          style="resize: none"
          v-if="isOfflineClientEdit"
        />
      </div>

      <div>
        <div class="q-mt-md">
          <span class="form-heading">Internal Notes</span>
        </div>
        <q-input
          borderless
          type="textarea"
          class="required  input-style"
          v-if="!isOfflineClientEdit"
          rows="5"
          v-model="expertVendorInfo.internalNotes"
          style="resize: none"
        />
        <q-input
          type="textarea"
          v-if="isOfflineClientEdit"
          disabled
          rows="5"
          borderless
          class="required  input-style"
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
    claimExpertVendor: {
      type: Boolean
    },
    item: {
      type: Object
    },
    expertVendorInfo: {
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
      this.expertVendorInfo.anyOtherExpertHiredToggle = true;
    }
  },

  computed: {
    ...mapGetters([
      'policyTypes',
      'policyCategories',
      'vendorIndustries',
      'vendors',
      'isOfflineClientEdit'
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
      this.selectedArray[this.selectedIndex].vendor.mailingAddress =
        vendor.mailingAddress;
      this.selectedArray[this.selectedIndex].vendor.value = vendor.name;
      this.selectedArray[this.selectedIndex].vendor.phone = vendor.phoneNumber
        ? vendor.phoneNumber.number
        : '';
      this.vendorsListDialog = false;
      this.$emit('vendorId', vendor);
    },
    setVendorType(index) {
      const val = this.expertVendorInfo.isAlreadyHiredVendor[index].industry;

      const result = this.vendorIndustries.find(obj => {
        return obj.machineValue == val;
      });
      this.industryValue = result;
    },

    setVendorTypeForAssignVendor(index) {
      const val = this.expertVendorInfo.isHiredByClaimguru[index].industry;

      const result = this.vendorIndustries.find(obj => {
        return obj.machineValue == val;
      });
      this.industryValue = result;
    },

    onCloseAddVendorDialogBox(vendor) {
      this.selectedArray[this.selectedIndex].vendor.id = vendor.id;
      this.selectedArray[this.selectedIndex].vendor.email = vendor.email;
      this.selectedArray[this.selectedIndex].vendor.mailingAddress =
        vendor.mailingAddress;
      this.selectedArray[this.selectedIndex].vendor.value = vendor.name;
      this.selectedArray[this.selectedIndex].vendor.phone = vendor.phoneNumber
        ? vendor.phoneNumber.number
        : '';

      this.$emit('vendorId', vendor);
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
<style lang="scss" scoped>
.input-field {
  height: 55px;
}
</style>
