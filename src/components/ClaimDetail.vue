<template>
  <div class="q-mx-lg q-mt-md">
    <q-badge
      color="red"
      v-if="
        !getSelectedClaim.meta ||
          (getSelectedClaim.meta &&
            getSelectedClaim.meta.isEstimateDone != true)
      "
    >
      Claim has been submitted for uploading estimation documents
      <q-icon name="warning" color="white" class="q-ml-xs"></q-icon>
    </q-badge>

    <div class="row">
      <span class="text-primary" v-if="getSelectedClaim.client">
        {{ getSelectedClaim.client.fname }}
        {{ getSelectedClaim.client.lname }}</span
      >

      <q-icon
        class="q-ml-auto"
        size="1em"
        :name="getSelectedClaim.isFavourite ? 'star' : 'star_border'"
        @click="onClickFavorite"
        color="primary"
      >
        <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">
          Mark claim as favourite
        </q-tooltip>
      </q-icon>
    </div>
    <div class="row">
      <div class="heading-light col-3">Name of the property</div>
      <div class="col q-ml-md">
        <span v-if="getSelectedClaim.lossInfo">
          <span
            v-if="
              getSelectedClaim.lossInfo.property &&
                getSelectedClaim.lossInfo.property.name
            "
          >
            {{
              getSelectedClaim.lossInfo
                ? getSelectedClaim.lossInfo.property
                  ? getSelectedClaim.lossInfo.property.name
                  : ''
                : '-'
            }}
          </span>
        </span>
      </div>
    </div>
    <div class="row q-mt-sm">
      <span class="heading-light col-3"> Loss Address:</span>
      <span class="col-7 q-ml-md" v-if="getSelectedClaim.lossInfo">
        {{
          getSelectedClaim.lossInfo.property
            ? getSelectedClaim.lossInfo.property
              ? getSelectedClaim.lossInfo.property.streetAddress
              : ''
            : '-'
        }}
        {{
          getSelectedClaim.lossInfo.property
            ? getSelectedClaim.lossInfo.property
              ? getSelectedClaim.lossInfo.property.addressLocality
              : ''
            : '-'
        }}

        {{
          getSelectedClaim.lossInfo.property
            ? getSelectedClaim.lossInfo.property
              ? getSelectedClaim.lossInfo.property.postalCode
              : ''
            : '-'
        }}

        <div>
          {{
            getSelectedClaim.lossInfo.property
              ? getSelectedClaim.lossInfo.property
                ? getSelectedClaim.lossInfo.property.addressRegion
                : ''
              : '-'
          }}
          {{
            getSelectedClaim.lossInfo.property
              ? getSelectedClaim.lossInfo.property
                ? getSelectedClaim.lossInfo.property.addressCountry
                : ''
              : '-'
          }}
        </div></span
      >
    </div>
    <div
      class="row q-mt-sm"
      v-if="userRole != 'estimator' && userRole != 'vendor'"
    >
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
    <div class="row q-mt-sm">
      <span class="heading-light col-3"> Claim Number </span>
      <span class="q-ml-md col-8">
        {{ getSelectedClaim.number ? getSelectedClaim.number : '- - -' }}</span
      >
    </div>
    <div
      class="row q-mt-sm"
      v-if="userRole != 'estimator' && userRole != 'vendor'"
    >
      <span class="heading-light col-3"> Current Phase </span>
      <span class="q-ml-md col-8">
        {{
          getSelectedClaim.currentPhase
            ? getSelectedClaim.currentPhase.value
            : '-'
        }}</span
      >
    </div>
    <div class="row q-mt-sm">
      <span class="heading-light col-3"> Loss Date </span>
      <span class="q-ml-md col" v-if="getSelectedClaim.lossInfo">
        {{ dateToShow(getSelectedClaim.lossInfo.date) }}</span
      >
    </div>
    <div class="row q-mt-sm">
      <span class="heading-light col-3"> Loss Cause </span>
      <span class="q-ml-md col" v-if="getSelectedClaim.lossInfo">
        {{
          getSelectedClaim.lossInfo.cause
            ? getSelectedClaim.lossInfo.cause.value
            : '-'
        }}
        -
        {{
          getSelectedClaim.lossInfo.cause
            ? getSelectedClaim.lossInfo.cause.desc
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
import { dateToShow } from '@utils/date';
export default {
  name: 'Claims',
  components: { CustomBar },
  data() {
    return {
      userRole: ''
    };
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
    this.userRole = getCurrentUser().attributes.roles[0].machineValue;
    this.getSingleClaimDetails(this.selectedClaimId);
  },
  methods: {
    ...mapActions([
      'getSingleClaimDetails',
      'markClaimUnFavorite',
      'markClaimFavorite'
    ]),
    dateToShow,
    async onClickFavorite() {
      if (this.getSelectedClaim.isFavourite == false) {
        await this.markClaimUnFavorite(this.selectedClaimId);
      } else {
        await this.markClaimFavorite(this.selectedClaimId);
      }
    }
  }
};
</script>
