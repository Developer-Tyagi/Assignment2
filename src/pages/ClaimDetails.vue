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
        { name: 'Claim Summary' },
        { name: 'Loss Info' },
        { name: 'Action Items' },
        { name: 'Demands And Offers' },
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
    ...mapGetters(['selectedClaimId'])
  },

  created() {
    this.getSingleClaimDetails(this.selectedClaimId);
  },
  methods: {
    ...mapActions(['getSingleClaimDetails']),
    onClickClaimItems(value) {
      switch (value) {
        case 'Claim Summary':
          this.$router.push('/claim-summary');
          break;
        case 'Loss Info':
          this.$router.push('/loss-info');
          break;
        case 'Demands And Offers':
          break;
        case 'Activity Log & Message Archive':
          break;
        case 'Company Personnel':
          break;
        case 'Insurer & Policy':
          break;
        case 'Mortgages and Liens':
          break;
        case 'Files':
          break;
        case 'Notes':
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
