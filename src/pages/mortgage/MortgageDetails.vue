<template>
  <q-page>
    <div class="mobile-container-page-without-search">
      <div class="listing-height q-pa-md mobile-container-page">
        <div class="q-ml-md text-h6">
          {{ selectedMortgage.name ? selectedMortgage.name : '-' }}
        </div>

        <div
          class=""
          v-for="dialogBox in dialogBoxes"
          :key="dialogBox.name"
          @click="vendorDetailsDailogBoxOpen(dialogBox.name)"
        >
          <div class="full-width">
            <q-card class="q-ma-sm q-pa-md"> {{ dialogBox.name }} </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { onEmailClick, onPhoneNumberClick } from '@utils/clickable';

export default {
  data() {
    return {
      dialogBoxes: [{ name: 'Mortgage Info' }, { name: 'Personnel' }]
    };
  },
  computed: {
    ...mapGetters(['selectedMortgage'])
  },

  methods: {
    ...mapActions(['getMortgageDetails']),
    onEmailClick,
    onPhoneNumberClick,
    vendorDetailsDailogBoxOpen(value) {
      switch (value) {
        case 'Mortgage Info':
          this.$router.push('/mortgage-company-info/' + this.$route.params.id);
          break;
        case 'Personnel':
          this.$router.push('/mortgage-personnel/' + this.$route.params.id);
      }
    }
  },
  mounted() {
    this.getMortgageDetails(this.$route.params.id);
  }
};
</script>
