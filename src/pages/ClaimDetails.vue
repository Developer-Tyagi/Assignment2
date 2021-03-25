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
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  //   name: 'Claims',
  components: {},
  data() {
    return {
      ClaimDetails: [
        { name: 'Claim Summary' },
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
    ...mapGetters([])
  },

  created() {},
  methods: {
    ...mapActions(['', '']),
    ...mapMutations(['']),
    onClickClaimItems(value) {
      switch (value) {
        case 'Claim Summary':
          console.log('in Claim Summary');
          this.$router.push('/claim-summary');
          break;
        case 'Action Items':
          this.mailingAddressDialog = true;
          break;
        case 'Demands And Offers':
          this.insuranceInfoDialog = true;
          break;
        case 'Activity Log & Message Archive':
          this.lossInfoDialog = true;
          break;
        case 'Company Personnel':
          this.expertVendorInfoDialog = true;
          break;
        case 'Insurer & Policy':
          this.estimatingInfoDialog = true;
          break;
        case 'Mortgages and Liens':
          this.officeTaskDialog = true;
          break;
        case 'Files':
          this.publicAdjustorInfoDialog = true;
          break;
        case 'Notes':
          this.documentsDialog = true;
          break;
        case 'MatterPort':
          this.contractInfoDialog = true;
          break;
        case 'Time Tracking':
          this.contractInfoDialog = true;
          break;
        case 'Claim Ledger':
          this.contractInfoDialog = true;
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
