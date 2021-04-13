<template>
  <q-page>
    <div class="mobile-container-page-without-search">
      <div class="column full-height">
        <div>
          <div class=" q-mx-lg q-mt-md">
            <div class="row">
              <span class="text-primary">
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
              <div class="text-grey-8 col-3 ">
                Name of the property:
              </div>
              <div class="col  q-ml-md">
                {{
                  getSelectedClaim.lossInfo
                    ? getSelectedClaim.lossInfo.lossAddressName
                    : '-'
                }}
              </div>
            </div>
            <div class="row q-mt-sm " v-if="getSelectedClaim.lossInfo">
              <span class="text-grey-8 col-3 "> Loss Address:</span>
              <span class="col-7 q-ml-md">
                {{
                  getSelectedClaim.lossInfo.address.streetAddress
                    ? getSelectedClaim.lossInfo.address.streetAddress
                    : '-'
                }}
                {{
                  getSelectedClaim.lossInfo.address.addressLocality
                    ? getSelectedClaim.lossInfo.address.addressLocality
                    : '-'
                }},
                {{
                  getSelectedClaim.lossInfo.address.addressRegion
                    ? getSelectedClaim.lossInfo.address.addressRegion
                    : '-'
                }}
                <div>
                  {{
                    getSelectedClaim.lossInfo.address.addressCountry
                      ? getSelectedClaim.lossInfo.address.addressCountry
                      : '-'
                  }},
                  {{
                    getSelectedClaim.lossInfo.address.postalCode
                      ? getSelectedClaim.lossInfo.address.postalCode
                      : '-'
                  }}
                </div></span
              >
            </div>
            <div class="row  q-mt-sm">
              <span class="text-grey-8 col-3"> Claim Email </span>
              <span
                class="q-ml-md col clickLink"
                @click="onEmailClick(getSelectedClaim.email, $event)"
              >
                {{
                  getSelectedClaim.email ? getSelectedClaim.email : '-'
                }}</span
              >
            </div>

            <div class="row q-mt-sm ">
              <span class="text-grey-8 col-3 "> Current Phase </span>
              <span class="q-ml-md col-8">
                {{
                  getSelectedClaim.status.value
                    ? getSelectedClaim.status.value
                    : '-'
                }}</span
              >
              <q-icon name="edit" size="xs" color="primary" class="col" />
            </div>
            <div class="row  q-mt-sm" v-if="getSelectedClaim.lossInfo">
              <span class="text-grey-8 col-3"> Loss Date </span>
              <span class="q-ml-md col">
                {{
                  getSelectedClaim.lossInfo.date | moment('MM/DD/YYYY')
                }}</span
              >
            </div>
            <div class="row q-mt-sm" v-if="getSelectedClaim.lossInfo">
              <span class="text-grey-8 col-3"> Loss Cause </span>
              <span class="q-ml-md col">
                {{
                  getSelectedClaim.lossInfo.cause
                    ? getSelectedClaim.lossInfo.cause.value
                    : '-'
                }}</span
              >
            </div>
          </div>
          <q-item-section class="q-mt-md">
            <div
              v-for="item in ClaimDetails"
              :key="item.name"
              @click="onClickClaimItems(item.name)"
              class=" row q-ma-sm"
            >
              <q-card class="q-ma-xs q-pa-md full-width">
                {{ item.name }}
              </q-card>
            </div>
          </q-item-section>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';

export default {
  components: {},
  data() {
    return {
      rating: 1,
      ClaimDetails: [
        { name: 'Claim Summary' },
        { name: 'Loss Info' },
        { name: 'Tasks' },
        { name: 'Settlements' },
        { name: 'Activity Log & Message Archive' },
        { name: 'Company Personnel' },
        { name: 'Insurer & Policy' },
        { name: 'Mortgages and Liens' },
        { name: 'Files' },
        { name: 'Notes' },
        { name: 'MatterPort' },
        { name: 'Time Tracking' },
        { name: 'Claim Ledger' }
      ]
    };
  },

  computed: {
    ...mapGetters(['selectedClaimId', 'getSelectedClaim'])
  },

  created() {
    this.getSingleClaimDetails(this.selectedClaimId);
  },
  methods: {
    ...mapActions(['getSingleClaimDetails']),
    onEmailClick(email, e) {
      e.stopPropagation();
      if (email) {
        window.open('mailto:' + email);
      }
    },
    onClickClaimItems(value) {
      switch (value) {
        case 'Claim Summary':
          this.$router.push('/claim-overview');
          break;
        case 'Loss Info':
          this.$router.push('/loss-info');
          break;
        case 'Settlements':
          this.$router.push('/settlements');
          break;
        case 'Tasks':
          this.$router.push(`/claim-tasks/${this.selectedClaimId}`);
          break;
        case 'Demands And Offers':
          break;
        case 'Activity Log & Message Archive':
          this.$router.push('/activity-log');
          break;
        case 'Company Personnel':
          this.$router.push('/company-personnel');
          break;
        case 'Insurer & Policy':
          this.$router.push('/insurance-policy');
          break;
        case 'Mortgages and Liens':
          this.$router.push('/mortgage-liens');
          break;
        case 'Files':
          this.$router.push({
            path: `/claim-files/${this.selectedClaimId}`
          });
          break;
        case 'Notes':
          this.$router.push('/claim-notes');
          break;
        case 'MatterPort':
          break;
        case 'Time Tracking':
          break;
        case 'Claim Ledger':
      }
    }
  }
};
</script>
