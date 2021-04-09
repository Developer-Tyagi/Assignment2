<template>
  <q-page>
    <div class="mobile-container-page-without-search">
      <div class="column full-height">
        <div>
          <q-item-section>
            <div
              v-for="item in ClaimDetails"
              :key="item.name"
              @click="onClickClaimItems(item.name)"
              class="form-list row"
            >
              {{ item.name }}
            </div>
          </q-item-section>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {},
  data() {
    return {
      ClaimDetails: [
        { name: 'Claim Overview' },
        { name: 'Loss Info' },
        { name: 'Action Items' },
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
    onClickClaimItems(value) {
      switch (value) {
        case 'Claim Overview':
          this.$router.push('/claim-overview');
          break;
        case 'Loss Info':
          this.$router.push('/loss-info');
          break;
        case 'Settlements':
          this.$router.push('/settlements');
          break;
        case 'Action Items':
          this.$router.push(`/claim-action-items/${this.selectedClaimId}`);
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
<style lang="scss">
.form-list {
  color: #333333;
  font-weight: bold;
  font-size: 16px;
  border-bottom: 1px solid #d3d3d3;
  padding: 10px;
  margin: 5px 0;
}
</style>
