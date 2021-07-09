<template>
  <div>
    <div class="mobile-container-page-without-search">
      <div class="form-heading  q-ma-md">
        {{ selectedCarrier.name ? selectedCarrier.name : '-' }}
      </div>

      <q-list bordered class="q-mt-xs">
        <q-expansion-item
          group="carrierGroup"
          label="Carrier Info"
          header-class="text-primary"
          @show="carrierInfo = true"
        >
          <q-card>
            <q-card-section v-if="carrierInfo">
              <CarrierCompanyInfo />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator></q-separator>

        <q-expansion-item
          group="carrierGroup"
          label="Carrier Personnel"
          header-class="text-primary"
          @show="carrierPersonnel = true"
        >
          <q-card>
            <q-card-section v-if="carrierPersonnel"
              ><CarrierPersonnel />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator></q-separator>
      </q-list>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { onEmailClick, onPhoneNumberClick } from '@utils/clickable';
import CarrierCompanyInfo from 'src/pages/carrier/CarrierCompanyInfo';
import CarrierPersonnel from 'src/pages/carrier/CarrierPersonnel';
export default {
  components: { CarrierCompanyInfo, CarrierPersonnel },
  data() {
    return { carrierPersonnel: false, carrierInfo: false };
  },
  computed: {
    ...mapGetters(['selectedCarrier'])
  },

  methods: {
    ...mapActions(['getCarrierDetails']),
    onEmailClick,
    onPhoneNumberClick
  },
  mounted() {
    this.getCarrierDetails(this.$route.params.id);
  }
};
</script>
