<template>
  <div
    :class="{
      'mobile-container-page-without-search': !$q.platform.is.iphone
    }"
  >
    <MortgagesList
      @addCarrier="openAddMortgageDialog"
      :mortgageDetails="true"
    />
    <q-dialog
      v-model="addMortgageDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <AddMortgage
          @closeDialog="closeAddCarrierDialog"
          :componentName="constants.industries.MORTGAGE"
        />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import MortgagesList from 'components/MortgagesList';
import AddMortgage from 'components/AddMortgage';
import { constants } from '@utils/constant';

export default {
  name: 'Mortgage',
  components: { MortgagesList, AddMortgage },
  data() {
    return {
      addMortgageDialog: false,
      constants: constants
    };
  },

  methods: {
    closeAddCarrierDialog(e) {
      this.addMortgageDialog = false;
    },
    openAddMortgageDialog(e) {
      this.addMortgageDialog = e;
    }
  }
};
</script>
