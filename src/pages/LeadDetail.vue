<template>
  <q-page>
    <div class="mobile-container-page-without-search">
      <LeadDetail />
      <div
        v-for="dialogBox in dialogBoxes"
        :key="dialogBox.name"
        @click="leadDetailsDailogBoxOpen(dialogBox.name)"
      >
        <div class="full-width">
          <q-card class="q-ma-sm q-pa-md">
            {{ dialogBox.name }}
          </q-card>
        </div>
      </div>
      <q-btn
        label="Convert Lead to Client"
        class="fixed-bottom q-my-md q-mx-auto"
        color="primary"
        @click="onConvertLeadToClientButtonClick(selectedLead)"
        size="md"
        style="width: 90%"
      />
    </div>
  </q-page>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import CustomBar from 'components/CustomBar';
import LeadDetail from 'components/LeadDetail';
import { onEmailClick, onPhoneNumberClick } from '@utils/clickable';
export default {
  data() {
    return {
      dialogBoxes: [
        { name: 'Loss Info' },
        { name: 'Policy Info' },
        { name: 'Notes' }
      ]
    };
  },

  components: { CustomBar, LeadDetail },
  created() {
    this.getLeadDetails(this.$route.params.id);
  },
  computed: {
    ...mapGetters(['selectedLead'])
  },
  methods: {
    ...mapActions(['getLeadDetails']),
    ...mapMutations(['setSelectedLead']),
    onEmailClick,
    onPhoneNumberClick,
    leadDetailsDailogBoxOpen(value) {
      if (value == 'Loss Info') {
        this.$router.push('/lead-loss-info/' + this.$route.params.id);
      }
      if (value == 'Policy Info') {
        this.$router.push('/loss-policy-info/' + this.$route.params.id);
      }
      if (value == 'Notes') {
        this.$router.push('/lead-note/' + this.$route.params.id);
      }
    },
    onConvertLeadToClientButtonClick(selectedLead) {
      console.log(this.selectedLead, 'selectedLead');
      let payload = {
        attributes: selectedLead
      };
      this.setSelectedLead(payload);

      this.$router.push('/add-client');
    }
  }
};
</script>
<style>
.form-list {
  color: #333333;
  font-weight: bold;
  font-size: 16px;
  padding: 5px;
  border-bottom: 1px solid #d3d3d3;
  margin-top: 30px;
}
</style>
