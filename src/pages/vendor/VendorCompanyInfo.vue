<template>
  <q-page>
    <div class="listing-height q-pa-md mobile-container-page">
      <span class="text-bold text-h6 q-ml-md">
        {{ selectedVendor.name ? selectedVendor.name : '-' }}
      </span>
      <q-card class="q-ma-sm q-pa-sm">
        <div class="q-my-auto row q-mt-xs ">
          <q-icon
            size="xs"
            name="create "
            color="primary"
            class="q-ml-auto "
            @click="onEdit"
          ></q-icon>

          <q-icon
            class="q-my-auto"
            name="delete"
            size="xs"
            color="primary"
            @click="onDelete"
          />
        </div>
        <div class="row q-mt-sm">
          <span class="heading-light col-3">Address Details</span>
          <span class="col-7 q-ml-md" v-if="selectedVendor.address">
            <div class="row">
              {{
                selectedVendor.address.houseNumber
                  ? selectedVendor.address.houseNumber
                  : '-'
              }}
              ,
              {{
                selectedVendor.address.streetAddress
                  ? selectedVendor.address.streetAddress
                  : '-'
              }}
            </div>
            <div>
              {{
                selectedVendor.address.addressLocality
                  ? selectedVendor.address.addressLocality
                  : '-'
              }}
              ,
              {{
                selectedVendor.address.addressRegion
                  ? selectedVendor.address.addressRegion
                  : '-'
              }}
            </div>
            <div class="row">
              {{
                selectedVendor.address.addressCountry
                  ? selectedVendor.address.addressCountry
                  : '-'
              }},
              {{
                selectedVendor.address.postalCode
                  ? selectedVendor.address.postalCode
                  : '-'
              }}
              <q-icon
                name="place"
                color="primary"
                @click="sendMap(selectedVendor.address)"
                class="edit-icon"
              ></q-icon></div
          ></span>
        </div>
        <div class="row  q-mt-sm" v-if="selectedVendor.email">
          <span class="heading-light col-3"> Email </span>
          <span
            class="q-ml-md col clickLink"
            @click="onEmailClick(selectedVendor.email, $event)"
          >
            {{ selectedVendor.email ? selectedVendor.email : '-' }}</span
          >
        </div>
        <div class="row q-mt-sm " v-for="phone in selectedVendor.phoneNumber">
          <span class="heading-light col-3"> Phone Number </span>
          <span class="col q-ml-md" v-if="phone.type">
            {{ phone.type }} :
            <span
              class="clickLink "
              @click="onPhoneNumberClick(phone.number, $event)"
              >{{ phone.number }}</span
            ></span
          >
        </div>
        <div class="row  q-mt-sm" v-if="selectedVendor.info">
          <span class="heading-light col-3"> Website: </span>
          <span class="q-ml-md col ">
            {{
              selectedVendor.info.website ? selectedVendor.info.website : '-'
            }}</span
          >
        </div>
        <div class="row  q-mt-sm" v-if="selectedVendor.info">
          <span class="heading-light col-3"> Notes: </span>
          <span class="q-ml-md col ">
            {{
              selectedVendor.info.notes ? selectedVendor.info.notes : '-'
            }}</span
          >
        </div>
      </q-card>
    </div>
    <q-dialog
      v-model="addMortgageDialog"
      persistent
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
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { onEmailClick, onPhoneNumberClick, sendMap } from '@utils/clickable';
import AddVendor from 'components/AddVendor';
import { constants } from '@utils/constant';
export default {
  components: { AddVendor },
  data() {
    return { addMortgageDialog: false, constants: constants };
  },
  computed: {
    ...mapGetters(['selectedVendor'])
  },
  mounted() {
    this.getVendorDetails(this.$route.params.id);
  },
  methods: {
    ...mapActions(['getVendorDetails', 'deleteVendorInfo']),
    onEmailClick,
    onPhoneNumberClick,
    sendMap,
    async onDelete() {
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
