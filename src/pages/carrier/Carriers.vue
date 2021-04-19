<template>
  <div
    :class="{
      'mobile-container-page-without-search': !$q.platform.is.iphone
    }"
  >
    <CarriersList @addCarrier="openAddCarrierDialog" :carrierDetails="true" />
    <q-dialog
      v-model="addCarrierDialog"
      persistent
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
  }
};
</script>
