<template>
  <div>
    <div class="q-ml-md text-h6 q-ma-md">
      {{ selectedMortgage.name ? selectedMortgage.name : '-' }}
    </div>

    <div class="mobile-container-page">
      <q-list bordered>
        <q-expansion-item
          group="mortgageGroup"
          label="Mortgage Info"
          header-class="text-primary"
          @show="mortgageInfo = true"
        >
          <q-card-section v-if="mortgageInfo">
            <MortgageCompanyInfo />
          </q-card-section>
        </q-expansion-item>
        <q-expansion-item
          group="mortgageGroup"
          label="Mortgage Personnel"
          header-class="text-primary"
          @show="mortgagePersonnel = true"
        >
          <q-card-section v-if="mortgagePersonnel">
            <MortgagePersonnel />
          </q-card-section>
        </q-expansion-item>
      </q-list>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { onEmailClick, onPhoneNumberClick } from '@utils/clickable';
import MortgageCompanyInfo from 'src/pages/mortgage/MortgageCompanyInfo';
import MortgagePersonnel from 'src/pages/mortgage/MortgagePersonnel';
export default {
  components: { MortgageCompanyInfo, MortgagePersonnel },
  data() {
    return {
      mortgageInfo: false,
      mortgagePersonnel: false
    };
  },
  computed: {
    ...mapGetters(['selectedMortgage'])
  },

  methods: {
    ...mapActions(['getMortgageDetails']),
    onEmailClick,
    onPhoneNumberClick
  },
  mounted() {
    this.getMortgageDetails(this.$route.params.id);
  }
};
</script>
