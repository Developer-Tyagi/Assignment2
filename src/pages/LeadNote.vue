<template>
  <q-page>
    <div class="mobile-container-page-without-search">
      <LeadDetail />
      <!-- This is for showing the Loss Info details   -->
      <q-card class="q-ma-md q-ma-sm">
        <div class="client-list q-pa-sm">
          <div class="row">
            <q-icon
              name="create"
              color="primary"
              class="edit-icon icon-top"
            ></q-icon>
          </div>

          <div class="q-mt-md row">
            <div class="heading-light q-mt-none col-xs-4 lightHeading">
              Notes
            </div>
            <div class="column q-ml-md" v-if="selectedLead.notes">
              {{ selectedLead.notes }}
            </div>
          </div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import CustomBar from 'components/CustomBar';
import LeadDetail from 'components/LeadDetail';

export default {
  components: { CustomBar, LeadDetail },
  computed: {
    ...mapGetters(['selectedLead'])
  },
  mounted() {
    this.getLeadDetails(this.$route.params.id);
  },

  methods: {
    ...mapActions(['getLeadDetails'])
  }
};
</script>
