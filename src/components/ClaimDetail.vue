<template>
  <div class="q-mt-md" style="width:380px">
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
        class="q-ml-auto q-ml-xl"
        size="1em"
        :name="getSelectedClaim.isFavourite ? 'star' : 'star_border'"
        @click="onClickFavourite"
        color="primary"
      >
        <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">
          Mark claim as favourite
        </q-tooltip>
      </q-icon>
    </div>
    <div class="row">
      <div class="heading-light col-4 q-mt-none">Name of the property</div>
      <div class="column q-ml-lg">
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
      <div class="heading-light col-4 q-mt-none">Loss Address:</div>
      <div class="col  q-ml-lg">
        <span v-if="getSelectedClaim.lossInfo">
          {{
            getSelectedClaim.lossInfo.property
              ? getSelectedClaim.lossInfo.property
                ? getSelectedClaim.lossInfo.property.address1
                : ''
              : '-'
          }}
          {{
            getSelectedClaim.lossInfo.property
              ? getSelectedClaim.lossInfo.property
                ? getSelectedClaim.lossInfo.property.address2
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
                  ? toGetStateShortName(
                      getSelectedClaim.lossInfo.property.addressRegion
                    )
                  : ''
                : '-'
            }}
          </div></span
        >
      </div>
    </div>
    <div class="row q-mt-sm" v-if="userRole != 'vendor'">
      <div class="heading-light col-4 q-mt-none">Claim Email</div>
      <div
        class="col  q-ml-lg clickLink"
        @click="onEmailClick(getSelectedClaim.claimEmail, $event)"
      >
        {{ getSelectedClaim.claimEmail ? getSelectedClaim.claimEmail : '-' }}
      </div>
    </div>
    <div class="row q-mt-sm">
      <div class="heading-light col-4 q-mt-none">Claim Number</div>
      <div class="col  q-ml-lg ">
        {{ getSelectedClaim.number ? getSelectedClaim.number : '- - -' }}
      </div>
    </div>
    <div class="row q-mt-sm" v-if="userRole != 'vendor'">
      <div class="heading-light col-4 q-mt-none">Current Phase</div>
      <div class="col  q-ml-lg">
        {{
          getSelectedClaim.currentPhase
            ? getSelectedClaim.currentPhase.value
            : '-'
        }}
      </div>
    </div>
    <div class="row q-mt-sm">
      <div class="heading-light col-4 q-mt-none">Loss Date</div>
      <div class="col  q-ml-lg" v-if="getSelectedClaim.lossInfo">
        {{ dateToShow(getSelectedClaim.lossInfo.date) }}
      </div>
    </div>
    <div class="row q-mt-sm">
      <div class="heading-light col-4 q-mt-none">Loss Cause</div>
      <div class="col q-ml-lg" v-if="getSelectedClaim.lossInfo">
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
        }}
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import CustomBar from 'components/CustomBar';
import moment from 'moment';
import { dateToShow } from '@utils/date';
import { toGetStateShortName } from '@utils/common';
import { getCurrentUser } from '@utils/auth';
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
      'markClaimUnFavourite',
      'markClaimFavourite'
    ]),
    toGetStateShortName,
    dateToShow,
    async onClickFavourite() {
      if (this.getSelectedClaim.isFavourite == false) {
        await this.markClaimUnFavourite(this.selectedClaimId);
      } else {
        await this.markClaimFavourite(this.selectedClaimId);
      }
    }
  }
};
</script>
