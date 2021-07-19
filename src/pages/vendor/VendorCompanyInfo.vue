<template>
  <div>
    <span class="form-heading text-h6 ">
      {{ selectedVendor.name ? selectedVendor.name : '-' }}
    </span>

    <div class="q-my-auto row">
      <q-icon
        size="xs"
        name="create "
        color="primary"
        class="q-ml-auto"
        @click="onEdit"
      ></q-icon>

      <q-icon
        class="q-my-auto"
        name="delete"
        size="xs"
        color="primary"
        @click="onClickDelete"
      />
    </div>
    <div class="row">
      <span class="heading-light col-4">Address Details</span>
      <span class="col-7 q-ml-md" v-if="selectedVendor.mailingAddress">
        <div class="row">
          {{
            selectedVendor.mailingAddress.houseNumber
              ? selectedVendor.mailingAddress.houseNumber
              : '-'
          }}
          ,
          {{
            selectedVendor.mailingAddress.streetAddress
              ? selectedVendor.mailingAddress.streetAddress
              : '-'
          }}
        </div>
        <div>
          {{
            selectedVendor.mailingAddress.addressLocality
              ? selectedVendor.mailingAddress.addressLocality
              : '-'
          }}
          ,
          {{
            selectedVendor.mailingAddress.addressRegion
              ? selectedVendor.mailingAddress.addressRegion
              : '-'
          }}
        </div>
        <div class="row">
          {{
            selectedVendor.mailingAddress.addressCountry
              ? selectedVendor.mailingAddress.addressCountry
              : '-'
          }},
          {{
            selectedVendor.mailingAddress.postalCode
              ? selectedVendor.mailingAddress.postalCode
              : '-'
          }}
          <q-icon
            name="place"
            color="primary"
            @click="sendMap(selectedVendor.mailingAddress)"
            class="edit-icon"
          ></q-icon></div
      ></span>
      <span class="col-7 q-ml-md" v-else>-</span>
    </div>

    <div class="q-mt-sm row" v-if="selectedVendor.email">
      <div class="heading-light q-mt-none col-xs-4 ">
        Email
      </div>
      <div
        class="column q-ml-md clickLink"
        @click="onEmailClick(selectedVendor.email, $event)"
      >
        {{ selectedVendor.email ? selectedVendor.email : '-' }}
      </div>
    </div>
    <div class="q-mt-sm row" v-if="selectedVendor.phoneNumber">
      <div class="heading-light q-mt-none col-xs-4 ">
        Phone Number
      </div>
      <div
        v-if="selectedVendor.phoneNumber.type"
        class="column q-ml-md "
        @click="onEmailClick(selectedVendor.email, $event)"
      >
        {{ selectedVendor.phoneNumber.type }} :
      </div>
      <span
        class="clickLink"
        @click="onPhoneNumberClick(selectedVendor.phoneNumber.number, $event)"
        >{{ selectedVendor.phoneNumber.number }}</span
      >
    </div>

    <div class="row q-mt-sm" v-if="selectedVendor.info">
      <span class="heading-light col-3"> Website: </span>
      <span class="q-ml-md col">
        {{
          selectedVendor.info.website ? selectedVendor.info.website : '-'
        }}</span
      >
    </div>
    <div class="row q-mt-sm" v-if="selectedVendor.info">
      <span class="heading-light col-3"> Notes: </span>
      <span class="q-ml-md col">
        {{ selectedVendor.info.notes ? selectedVendor.info.notes : '-' }}</span
      >
    </div>

    <q-dialog
      v-model="addMortgageDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <AddVendor
          @closeDialog="closeAddVendorDialog"
          :componentName="constants.industries.VENDOR"
          :isEdit="true"
        />
      </q-card>
    </q-dialog>

    <q-dialog v-model="deleteAlertDialog">
      <q-card>
        <DeleteAlert
          @close="deleteAlertDialog = false"
          @onDelete="onVendorDelete"
        />
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { onEmailClick, onPhoneNumberClick, sendMap } from '@utils/clickable';
import AddVendor from 'components/AddVendor';
import { constants } from '@utils/constant';
import DeleteAlert from 'components/DeleteAlert';
export default {
  name: 'VendorCompanyInfo',
  components: { AddVendor, DeleteAlert },
  data() {
    return {
      deleteAlertDialog: false,
      addMortgageDialog: false,
      constants: constants
    };
  },
  computed: {
    ...mapGetters(['selectedVendor'])
  },

  methods: {
    ...mapActions(['deleteVendorInfo']),
    onEmailClick,
    onPhoneNumberClick,
    sendMap,
    onClickDelete() {
      this.deleteAlertDialog = true;
    },
    async onVendorDelete() {
      const vendor = {
        id: this.$route.params.id
      };
      await this.deleteVendorInfo(vendor);
      this.$router.push('/vendors');
    },
    onEdit() {
      this.addMortgageDialog = true;
    },
    closeAddVendorDialog() {
      this.addMortgageDialog = false;
    }
  }
};
</script>
