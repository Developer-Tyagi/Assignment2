<template>
  <q-page>
    <div class="mobile-container-page-without-search">
      <div class="column full-height">
        <div>
          <ClaimDetail />
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
import ClaimDetail from 'components/ClaimDetail';
import { onEmailClick } from '@utils/clickable';

export default {
  components: { ClaimDetail },
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
        { name: 'Carrier & Policy' },
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
    onEmailClick,
    onClickClaimItems(value) {
      switch (value) {
        case 'Claim Summary':
          this.$router.push('/claim-summary');
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
        case 'Carrier & Policy':
          this.$router.push(`/insurance-policy/${this.selectedClaimId}`);
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
