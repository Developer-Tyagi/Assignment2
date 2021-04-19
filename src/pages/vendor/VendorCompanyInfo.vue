<template>
  <q-page>
    <div class="listing-height q-pa-md mobile-container-page">
      <span class="text-bold text-h6 q-ml-md">
        {{ selectedVendor.name ? selectedVendor.name : '-' }}
      </span>
      <q-card class="q-ma-sm q-pa-sm ">
        <div class="row q-mt-sm">
          <span class="heading-light col-3">Address Details</span>
          <span class="col-7 q-ml-md" v-if="selectedVendor.address">
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
          <span class="col" v-if="phone.type">
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
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { onEmailClick, onPhoneNumberClick, sendMap } from '@utils/clickable';
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['selectedVendor'])
  },
  mounted() {
    this.getVendorDetails(this.$route.params.id);
  },
  methods: {
    ...mapActions(['getVendorDetails']),
    onEmailClick,
    onPhoneNumberClick,
    sendMap
  }
};
</script>
