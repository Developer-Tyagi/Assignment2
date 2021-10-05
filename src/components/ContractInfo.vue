<template>
  <div class="bg-white full-width">
    <!-- vendor list dialogbox -->
    <q-dialog
      v-model="contractInfo.vendorsListDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          :dialogName="constants.industries.VENDOR"
          @closeDialog="contractInfo.vendorsListDialog = false"
        />
        <VendorsList
          :selectVendor="true"
          :showVendorDetails="false"
          @addVendor="
            contractInfo.vendorsListDialog = false;
            contractInfo.addVendorDialog = true;
          "
          :showFilter="true"
          :selectedVendorName="contractInfo.sourceDetails.details"
          @afterSelecting="onSelectingVendorList"
        />
      </q-card>
    </q-dialog>
    <!-- add vendor dialog -->
    <q-dialog
      v-model="contractInfo.addVendorDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <AddVendor
          @onCloseAddVendor="onCloseAddVendorDialogBox"
          @closeDialog="contractInfo.addVendorDialog = false"
        />
      </q-card>
    </q-dialog>
    <!-- Contract Info -->
    <div class="q-pa-sm">
      <span class="form-heading">Contract Date</span>
      <div class="full-width">
        <q-input
          borderless
          class="required input-style input-field"
          v-model="contractInfo.contractDate"
          mask="##/##/####"
          label="MM/DD/YYYY"
          lazy-rules
          :rules="[
            val =>
              (validateDate(val) && val && val.length > 0) || 'Invalid date!'
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
                  v-model="contractInfo.contractDate"
                  @input="() => $refs.qDateProxy.hide()"
                  mask="MM/DD/YYYY"
                ></q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="q-mt-md">
        <span class="form-heading q-ml-xs">Date and Time of First Contact</span>
      </div>
      <q-input
        borderless
        class="required input-style input-field"
        v-model="contractInfo.firstContractDate"
        dense
      >
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
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

        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy
              transition-show="scale"
              transition-hide="scale"
              ref="qTimeProxy"
            >
              <q-time
                v-model="contractInfo.firstContractDate"
                mask="YYYY-MM-DD HH:mm A"
                @input="closeTimeDialog"
              >
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
      <br />
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
          :disable="isOfflineClientEdit"
        ></q-btn-toggle>
      </div>

      <div class="row q-mt-md" style="align-items: center">
        <q-input
          mask="#.#"
          type="number"
          borderless
          class="required input-style input-field q-ml-auto full-width "
          v-model.number="contractInfo.claimFeeRate"
          label="Claim Fee Rate"
          style="width: 50%"
          :rules="[val => val || 'Please fill the Fee rate ']"
          :disable="isOfflineClientEdit"
        >
          <template v-slot:prepend v-if="contractInfo.buttonGroup == 'dollar'">
            <q-icon name="$" color="primary"></q-icon>
          </template>

          <template
            v-slot:append
            v-else-if="contractInfo.buttonGroup == 'percentage'"
          >
            <q-icon name="%" color="primary"></q-icon>
          </template>
          <template v-slot:append v-else>
            <span class="form-heading">/hour</span>
          </template></q-input
        >
      </div>
    </div>

    <div class="q-pa-sm q-mt-sm">
      <span class="form-heading">
        Source Of Claim <span style="color: red">*</span>
      </span>
      <div>
        <q-select
          borderless
          class="required input-style input-field "
          v-model="contractInfo.sourceDetails.type"
          :options="sourceOfClaim"
          option-label="name"
          use-input
          input-debounce="0"
          option-value="value"
          options-dense
          emit-value
          map-options
          behavior="menu"
          @input="onChangingSourceType()"
          @filter="searchBySource"
          :rules="[
            val => (val && val.length > 0) || 'Please select the Source type'
          ]"
          :disable="isOfflineClientEdit"
        />
        <q-input
          borderless
          class="required input-style input-field  "
          v-if="
            contractInfo.sourceDetails.type != constants.industries.VENDOR &&
              contractInfo.sourceDetails.type != '' &&
              contractInfo.sourceDetails.type != 'google' &&
              contractInfo.sourceDetails.type != 'client' &&
              contractInfo.sourceDetails.type != 'none'
          "
          type="text"
          placeholder="Enter Source details"
          v-model="contractInfo.sourceDetails.details"
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'Please select the Source Detail'
          ]"
        />
        <div
          v-else-if="
            contractInfo.sourceDetails.type == constants.industries.VENDOR
          "
        >
          <div
            class="custom-select"
            @click="contractInfo.vendorsListDialog = true"
            v-if="!contractInfo.sourceDetails.id"
          >
            <q-btn outline class="full-width">
              Click for choosing a vendor
              <span style="color: red">*</span>
            </q-btn>
          </div>
          <q-card
            bordered
            v-if="contractInfo.sourceDetails.id"
            @click="contractInfo.vendorsListDialog = true"
            class="q-my-md q-pa-md"
          >
            <div class="text-bold">
              {{ contractInfo.sourceDetails.companyName }}
            </div>
            <div v-if="contractInfo.sourceDetails.details">
              {{
                contractInfo.sourceDetails.details
                  ? contractInfo.sourceDetails.details
                  : '-'
              }}
            </div>

            <div
              v-if="
                contractInfo.sourceDetails.mailingAddress &&
                  contractInfo.sourceDetails.mailingAddress.address1
              "
            >
              <div>
                {{
                  contractInfo.sourceDetails.mailingAddress
                    ? contractInfo.sourceDetails.mailingAddress.houseNumber
                    : '-'
                }}

                {{
                  contractInfo.sourceDetails.mailingAddress.address1
                    ? contractInfo.sourceDetails.mailingAddress.address1
                    : '-'
                }}
              </div>
              <div
                v-if="
                  contractInfo.sourceDetails.mailingAddress &&
                    contractInfo.sourceDetails.mailingAddress.address2
                "
              >
                {{ contractInfo.sourceDetails.mailingAddress.address2 }}
              </div>
              <div class="row">
                {{
                  contractInfo.sourceDetails.mailingAddress.addressLocality
                    ? contractInfo.sourceDetails.mailingAddress.addressLocality
                    : '-'
                }}
                ,
                {{
                  contractInfo.sourceDetails.mailingAddress.addressRegion
                    ? toGetStateShortName(
                        contractInfo.sourceDetails.mailingAddress.addressRegion
                      )
                    : '-'
                }}
                {{
                  contractInfo.sourceDetails.mailingAddress.postalCode
                    ? contractInfo.sourceDetails.mailingAddress.postalCode
                    : '-'
                }}
              </div>
            </div>
            <div>
              Phone:
              <span
                class="clickLink"
                @click="
                  onPhoneNumberClick(
                    contractInfo.sourceDetails.phone.number,
                    $event
                  )
                "
              >
                {{ contractInfo.sourceDetails.phone.number }}</span
              >
            </div>
            <div>
              Email:<span
                class="clickLink"
                @click="onEmailClick(contractInfo.sourceDetails.email, $event)"
              >
                {{ contractInfo.sourceDetails.email }}</span
              >
            </div>
          </q-card>
        </div>
        <div v-if="contractInfo.sourceDetails.type == 'client'">
          <q-select
            dense
            borderless
            class="required input-style input-field  full-width input-extra-padding"
            v-model="contractInfo.sourceDetails.details"
            use-input
            input-debounce="0"
            option-label="name"
            label="Search"
            :options="clientOptions"
            @filter="searchFilterBy"
            option-value="id"
            behavior="menu"
            options-dense
            emit-value
            map-options
            :rules="[
              val => (val && val.length > 0) || 'Please select the client'
            ]"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-black"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
      </div>
    </div>

    <q-card class="q-pa-sm q-mt-sm">
      <span class="form-heading">Accept or Cancel Claim ?</span>
      <p>
        If this claim will not be accepted, you can mark the claim as being
        "Cancelled",which will close the claim upon creation. This allows you to
        record the client and property information in Claim Guru for historical
        purposes.
      </p>
      <div class="row">
        <p class="q-mx-none q-my-auto form-heading">Cancelled?</p>
        <q-toggle
          class="q-ml-auto"
          v-model="contractInfo.cancelledToggle"
          :disable="isOfflineClientEdit"
        />
      </div>
      <div class="full-width">
        <q-select
          borderless
          class="input-style input-field  "
          v-model="contractInfo.reasonForCancellation"
          :options="reasonForCancellation"
          label="Reason For Cancellation"
          options-dense
          :disable="isOfflineClientEdit"
        ></q-select>
      </div>
      <div class="q-mt-md">
        <span class="form-heading">Reason For Cancellation</span>
      </div>
      <div class="floating-label">
        <q-input
          type="textarea"
          v-if="!isOfflineClientEdit"
          rows="5"
          borderless
          class="required input-style  full-width"
          v-model="contractInfo.reasonForCancellationText"
          style="resize: none"
        />
        <q-input
          type="textarea"
          v-if="isOfflineClientEdit"
          rows="5"
          disabled
          borderless
          class="required input-style full-width"
          v-model="contractInfo.reasonForCancellationText"
          style="resize: none"
        />
      </div>
    </q-card>
  </div>
</template>
<script>
import CustomBar from 'components/CustomBar';

import AddVendor from 'components/AddVendor';
import { successMessage } from '@utils/validation';
import { validateDate, validateTime } from '@utils/validation';
import { mapGetters, mapActions } from 'vuex';
import { toGetStateShortName } from '@utils/common';
import { constants } from '@utils/constant';
import VendorsList from 'components/VendorsList';
import { onPhoneNumberClick, onEmailClick } from '@utils/clickable';

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
      clientOptions: [],
      sourceOfClaim: [],
      constants: constants,
      reasonForCancellation: [
        'Client Cancelled',
        'Insufficient Coverage',
        'Loss to small',
        'No coverage',
        'Other'
      ]
    };
  },

  computed: {
    ...mapGetters(['leadSources', 'vendors', 'clients', 'isOfflineClientEdit'])
  },
  methods: {
    ...mapActions(['getVendors', 'getClients']),
    //This function is for closing the time popup
    closeTimeDialog() {
      this.$refs.qTimeProxy.hide();
    },
    toGetStateShortName,
    successMessage,
    onPhoneNumberClick,
    onEmailClick,
    searchFilterBy(val, update) {
      this.contractInfo.sourceDetails.details = null;
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
    onChangingSourceType() {
      this.contractInfo.sourceDetails.id = '';
      this.contractInfo.sourceDetails.details = '';
      this.contractInfo.sourceDetails.machineValue = '';
      this.contractInfo.sourceDetails.mailingAddress = '';
      this.contractInfo.sourceDetails.email = '';
      this.contractInfo.sourceDetails.phone = '';
    },

    onSelectingVendorList(vendor) {
      this.contractInfo.sourceDetails.id = vendor.id;
      this.contractInfo.sourceDetails.details = vendor.name;
      this.contractInfo.sourceDetails.companyName = vendor.companyName;
      this.contractInfo.sourceDetails.mailingAddress = vendor.mailingAddress;
      this.contractInfo.sourceDetails.email = vendor.email;
      this.contractInfo.sourceDetails.phone = vendor.phoneNumber
        ? vendor.phoneNumber.number
        : '';
      this.contractInfo.vendorsListDialog = false;
    },
    searchBySource(val, update) {
      this.contractInfo.sourceDetails.type = null;
      if (val === ' ') {
        update(() => {
          this.sourceOfClaim = this.leadSources;
        });
        return;
      }

      update(() => {
        const search = val.toLowerCase();
        this.sourceOfClaim = this.leadSources.filter(
          v => v.name.toLowerCase().indexOf(search) > -1
        );
      });
    },

    onCloseAddVendorDialogBox(vendor) {
      this.contractInfo.sourceDetails.id = vendor.id;
      this.contractInfo.sourceDetails.details =
        vendor.contact.fname + ' ' + vendor.contact.lname;
      this.contractInfo.sourceDetails.companyName = vendor.companyName;
      this.contractInfo.sourceDetails.mailingAddress = vendor.mailingAddress;
      this.contractInfo.sourceDetails.email = vendor.email;
      this.contractInfo.sourceDetails.phone = vendor.phoneNumber
        ? vendor.phoneNumber.number
        : '';
      this.contractInfo.vendorsListDialog = false;
      this.contractInfo.addVendorDialog = false;
    },

    validateDate,
    validateTime
  }
};
</script>
<style lang="scss" scoped>
.input-field {
  height: 55px;
}
</style>
