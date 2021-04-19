<template>
  <q-page>
    <div class="listing-height q-pa-md mobile-container-page">
      <span class="text-bold text-h6 q-ml-md">
        {{ selectedCarrier.name ? selectedCarrier.name : '-' }}
      </span>
      <q-card class="q-ma-sm q-pa-sm ">
        <div class="row q-mt-sm">
          <span class="heading-light col-3">Address Details</span>
          <span class="col-7 q-ml-md" v-if="selectedCarrier.address">
            {{
              selectedCarrier.address.houseNumber
                ? selectedCarrier.address.houseNumber
                : '-'
            }}
            ,
            {{
              selectedCarrier.address.streetAddress
                ? selectedCarrier.address.streetAddress
                : '-'
            }}
            <div>
              {{
                selectedCarrier.address.addressLocality
                  ? selectedCarrier.address.addressLocality
                  : '-'
              }}
              ,
              {{
                selectedCarrier.address.addressRegion
                  ? selectedCarrier.address.addressRegion
                  : '-'
              }}
            </div>
            <div>
              {{
                selectedCarrier.address.addressCountry
                  ? selectedCarrier.address.addressCountry
                  : '-'
              }},
              {{
                selectedCarrier.address.postalCode
                  ? selectedCarrier.address.postalCode
                  : '-'
              }}
              <q-icon
                name="place"
                color="primary"
                @click="sendMap(selectedCarrier.address)"
                class="edit-icon"
              ></q-icon></div
          ></span>
        </div>
        <div class="row  q-mt-sm" v-if="selectedCarrier.email">
          <span class="heading-light col-3"> Email </span>
          <span
            class="q-ml-md col clickLink"
            @click="onEmailClick(selectedCarrier.email, $event)"
          >
            {{ selectedCarrier.email ? selectedCarrier.email : '-' }}</span
          >
        </div>
        <div class="row q-mt-sm " v-for="phone in selectedCarrier.phoneNumber">
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
        <div class="row  q-mt-sm" v-if="selectedCarrier.info">
          <span class="heading-light col-3"> Website: </span>
          <span class="q-ml-md col ">
            {{
              selectedCarrier.info.website ? selectedCarrier.info.website : '-'
            }}</span
          >
        </div>
        <div class="row  q-mt-sm" v-if="selectedCarrier.info">
          <span class="heading-light col-3"> Notes: </span>
          <span class="q-ml-md col ">
            {{
              selectedCarrier.info.notes ? selectedCarrier.info.notes : '-'
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
    ...mapGetters(['selectedCarrier'])
  },
  mounted() {
    this.getCarrierDetails(this.$route.params.id);
  },
  methods: {
    ...mapActions(['getCarrierDetails']),
    onEmailClick,
    onPhoneNumberClick,
    sendMap
  }
};
</script>
