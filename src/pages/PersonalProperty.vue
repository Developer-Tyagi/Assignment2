<template>
  <q-page>
    <div class="listing-height">
      <ClaimDetail />
      <q-card
        class="q-ma-sm q-pa-sm"
        v-for="(damage, index) in damageInfo.damageItemInfo.personal"
      >
        <div class="row justify-between">
          <div>
            <q-badge class="q-pa-sm" color="grey-6">
              {{ damage.isRepaired == true ? 'Repair' : 'Replace' }}
            </q-badge>
          </div>
          <div class="text-bold  text-capitalize q-pt-xs">
            {{ damage.name }}
          </div>
          <div class="q-pt-xs q-mr-sm ">
            <q-icon name="create" color="primary" />
          </div>
        </div>

        <div
          class="q-ml-sm text-capitalize q-pt-xs text-caption q-mr-xl q-my-xs q-px-xs q-ma-xs"
        >
          <p>{{ damage.desc }}</p>
        </div>
        <div class="q-my-sm">
          <div class="row justify-between  q-my-sm">
            <div class="heading-light ">
              Quantity
            </div>
            <div class="q-mr-sm">
              {{ damage.quantity }}
            </div>
          </div>
          <div class="row justify-between  q-my-sm">
            <div class="heading-light ">
              Serial Number
            </div>
            <div class="q-mr-sm">
              {{ damage.serialNumber }}
            </div>
          </div>
          <div class="row   justify-between q-my-sm">
            <div class="heading-light  ">Purchase Date</div>
            <div class="q-mr-sm">
              {{ damage.purchaseDate | moment('DD/MM/YYYY') }}
            </div>
          </div>
        </div>
        <q-separator />
        <div class="q-my-sm row justify-between">
          <div class="heading-light ">Purchase Price</div>
          <div class="heading-light ">$</div>
          <div class="">
            {{ damage.purchasePrice }}
          </div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CustomBar from 'components/CustomBar';
import ClaimDetail from 'components/ClaimDetail';
import moment from 'moment';
import { date } from 'quasar';
import { dateToShow } from '@utils/date';

export default {
  name: 'PersonalProperty',
  components: { CustomBar, ClaimDetail },
  data() {
    return {};
  },

  computed: {
    ...mapGetters([
      'getSelectedClaim',
      'setClientProperty',
      'selectedClaimId',
      'lossCauses',
      'damageInfo'
    ]),
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY');
      }
    }
  },

  created() {
    this.getDamageInfo(this.selectedClaimId);
    if (!this.selectedClaimId) {
      this.$router.push('/clients');
    }

    this.getSingleClaimDetails(this.selectedClaimId);
  },
  methods: {
    ...mapActions(['getSingleClaimDetails', 'editClaimInfo', 'getDamageInfo'])
  }
};
</script>
