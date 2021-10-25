<template>
  <div>
    <CarriersList @addCarrier="openAddCarrierDialog" :carrierDetails="true" />
    <q-dialog
      v-model="addCarrierDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <AddCarrier
          @closeDialog="closeAddCarrierDialog"
          :componentName="constants.industries.CARRIER"
        />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import CarriersList from 'components/CarriersList';
import AddCarrier from 'components/AddCarrier';
import { constants } from '@utils/constant';

export default {
  name: 'Carriers',
  components: { CarriersList, AddCarrier },
  data() {
    return {
      addCarrierDialog: false,
      constants: constants
    };
  },

  methods: {
    closeAddCarrierDialog(e) {
      this.addCarrierDialog = false;
    },
    openAddCarrierDialog(e) {
      this.addCarrierDialog = e;
    }
  },

  created() {
    if (this.$route.params.add) {
      this.addCarrierDialog = true;
    }
  }
};
</script>
