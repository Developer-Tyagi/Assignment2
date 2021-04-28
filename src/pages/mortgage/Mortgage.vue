<template>
  <div
    :class="{
      'mobile-container-page-without-search': !$q.platform.is.iphone
    }"
  >
    <MortgagesList
      @addMortagage="addMortgageDialog = true"
      :showMortgageDetails="true"
      :selectMortgage="false"
    />
    <q-dialog
      v-model="addMortgageDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <AddMortgage @closeDialog="addMortgageDialog = false" :isEdit="false" />
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
    closeAddMortgageDialog(e) {
      this.addMortgageDialog = false;
    },

    openAddMortgageDialog(e) {
      this.addMortgageDialog = e;
    }
  }
};
</script>
