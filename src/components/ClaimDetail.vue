<template>
  <div class=" q-mx-lg q-mt-md">
    <div class="row">
      <span class="text-primary" v-if="getSelectedClaim.client">
        {{ getSelectedClaim.client.fname }}
        {{ getSelectedClaim.client.lname }}</span
      >
      <q-rating
        v-model="rating"
        class="q-ml-auto"
        size="1em"
        :max="1"
        color="primary"
      ></q-rating>
    </div>
    <div class="row">
      <div class="heading-light col-3 ">
        Name of the property
      </div>
      <div class="col  q-ml-md">
        <span v-if="getSelectedClaim.lossInfo">
          {{
            getSelectedClaim.lossInfo.lossAddressName
              ? getSelectedClaim.lossInfo.lossAddressName
              : '-'
          }}
        </span>
      </div>
    </div>
    <div class="row q-mt-sm">
      <span class="heading-light col-3"> Loss Address:</span>
      <span class="col-7 q-ml-md" v-if="getSelectedClaim.lossInfo">
        {{
          getSelectedClaim.lossInfo.address
            ? getSelectedClaim.lossInfo.address.streetAddress
              ? getSelectedClaim.lossInfo.address.streetAddress
              : ''
            : '-'
        }}
        {{
          getSelectedClaim.lossInfo.address
            ? getSelectedClaim.lossInfo.address.addressLocality
              ? getSelectedClaim.lossInfo.address.addressLocality
              : ''
            : '-'
        }}

        {{
          getSelectedClaim.lossInfo.address
            ? getSelectedClaim.lossInfo.address.addressRegion
              ? getSelectedClaim.lossInfo.address.addressRegion
              : ''
            : '-'
        }}

        <div>
          {{
            getSelectedClaim.lossInfo.address
              ? getSelectedClaim.lossInfo.address.addressCountry
                ? getSelectedClaim.lossInfo.address.addressCountry
                : ''
              : '-'
          }}
          {{
            getSelectedClaim.lossInfo.address
              ? getSelectedClaim.lossInfo.address.postalCode
                ? getSelectedClaim.lossInfo.address.postalCode
                : ''
              : '-'
          }}
        </div></span
      >
    </div>
    <div class="row  q-mt-sm">
      <span class="heading-light col-3"> Claim Email </span>
      <span
        class="q-ml-md col clickLink"
        @click="onEmailClick(getSelectedClaim.claimEmail, $event)"
      >
        {{
          getSelectedClaim.claimEmail ? getSelectedClaim.claimEmail : '-'
        }}</span
      >
    </div>
    <div class="row q-mt-sm ">
      <span class="heading-light col-3 "> Claim Number </span>
      <span class="q-ml-md col-8" v-if="getSelectedClaim.number">
        {{ getSelectedClaim.number ? getSelectedClaim.number : '-' }}</span
      >
    </div>
    <div class="row q-mt-sm ">
      <span class="heading-light col-3 "> Current Phase </span>
      <span class="q-ml-md col-8">
        {{
          getSelectedClaim.status.value ? getSelectedClaim.status.value : '-'
        }}</span
      >
    </div>
    <div class="row  q-mt-sm">
      <span class="heading-light col-3"> Loss Date </span>
      <span class="q-ml-md col" v-if="getSelectedClaim.lossInfo">
        {{ getSelectedClaim.lossInfo.date | moment('MM/DD/YYYY') }}</span
      >
    </div>
    <div class="row q-mt-sm">
      <span class="heading-light col-3"> Loss Cause </span>
      <span class="q-ml-md col" v-if="getSelectedClaim.lossInfo">
        {{
          getSelectedClaim.lossInfo.cause
            ? getSelectedClaim.lossInfo.cause.value
            : '-'
        }}</span
      >
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import CustomBar from 'components/CustomBar';
import moment from 'moment';

export default {
  name: 'Claims',
  components: { CustomBar },
  data() {
    return { rating: 1 };
  },

  computed: {
    ...mapGetters(['getSelectedClaim', 'setClientProperty', 'selectedClaimId']),
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY');
      }
    }
  },

  created() {
    if (!this.selectedClaimId) {
      this.$router.push('/clients');
    }
    this.getSingleClaimDetails(this.selectedClaimId);
  },
  methods: {
    ...mapActions(['getSingleClaimDetails'])
  }
};
</script>
