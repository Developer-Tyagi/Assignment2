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
    <q-card class="q-pa-sm">
      <span class="form-heading">Contract Date</span>
      <div class="full-width">
        <q-input
          class="required"
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
      <span class="form-heading">Date of First Contact</span>
      <div class="full-width">
        <q-input
          v-model="contractInfo.firstContractDate"
          mask="##/##/####"
          label="MM/DD/YYYY"
          lazy-rules
          :rules="[val => validateDate(val) || 'Invalid date!']"
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
      <span class="form-heading">Time Of First Contact</span>
      <div class="full-width">
        <q-input
          v-model="contractInfo.time"
          now
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Invalid time!']"
          :with-seconds="false"
          :disable="isOfflineClientEdit"
        >
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy
                transition-show="scale"
                transition-hide="scale"
                ref="qTimeProxy"
              >
                <q-time
                  mask="hh:mm A"
                  v-model="contractInfo.time"
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
          :disable="isOfflineClientEdit"
        ></q-btn-toggle>
      </div>

      <div class="row" style="align-items: center">
        <q-input
          class="q-ml-auto full-width required"
          mask="#.#"
          type="number"
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
    </q-card>

    <q-card class="q-pa-sm q-mt-sm">
      <span class="form-heading">
        Source Of Claim <span style="color: red">*</span>
      </span>
      <div>
        <q-select
          class="required"
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
          options-dense
          @input="onChangingSourceType()"
          @filter="searchBySource"
          :rules="[
            val => (val && val.length > 0) || 'Please select the Source type'
          ]"
          :disable="isOfflineClientEdit"
        />
        <q-input
          class="required"
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
            <div class="select-text">
              Click for choosing a vendor
              <span style="color: red">*</span>
            </div>
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
                  contractInfo.sourceDetails.mailingAddress.streetAddress
              "
            >
              <div>
                {{
                  contractInfo.sourceDetails.mailingAddress
                    ? contractInfo.sourceDetails.mailingAddress.houseNumber
                    : '-'
                }}
                ,
                {{
                  contractInfo.sourceDetails.mailingAddress.streetAddress
                    ? contractInfo.sourceDetails.mailingAddress.streetAddress
                    : '-'
                }}
              </div>
              <div>
                {{
                  contractInfo.sourceDetails.mailingAddress.addressLocality
                    ? contractInfo.sourceDetails.mailingAddress.addressLocality
                    : '-'
                }}
                ,
                {{
                  contractInfo.sourceDetails.mailingAddress.addressRegion
                    ? contractInfo.sourceDetails.mailingAddress.addressRegion
                    : '-'
                }}
              </div>
              <div class="row">
                {{
                  contractInfo.sourceDetails.mailingAddress.addressCountry
                    ? contractInfo.sourceDetails.mailingAddress.addressCountry
                    : '-'
                }}
                -
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
            class="full-width input-extra-padding"
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
    </q-card>

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
          v-model="contractInfo.reasonForCancellation"
          :options="reasonForCancellation"
          label="Reason For Cancellation"
          options-dense
          :disable="isOfflineClientEdit"
        ></q-select>
      </div>

      <span class="form-heading">Reason For Cancellation</span>
      <div class="floating-label">
        <textarea
          v-if="!isOfflineClientEdit"
          rows="5"
          class="full-width"
          v-model="contractInfo.reasonForCancellationText"
          style="resize: none"
        />
        <textarea
          v-if="isOfflineClientEdit"
          rows="5"
          disabled
          class="full-width"
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
