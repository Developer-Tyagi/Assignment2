<template>
  <div class=" q-mx-lg q-mt-md">
    <div class="q-ml-none text-primary">
      {{ selectedLead['primaryContact']['fname'] }}
      {{ selectedLead.primaryContact.lname }}
    </div>

    <div class="row  q-mt-sm">
      <span class="heading-light col-3"> Email </span>
      <span
        class="q-ml-md col clickLink"
        @click="onEmailClick(selectedLead.primaryContact.email, $event)"
      >
        {{
          selectedLead.primaryContact.email
            ? selectedLead.primaryContact.email
            : '-'
        }}</span
      >
    </div>
    <div class="row  q-mt-sm">
      <span class="heading-light col-3"> Phone Number </span>
      <span
        class="q-ml-md col clickLink"
        @click="
          onPhoneNumberClick(
            selectedLead.primaryContact.phoneNumber[0].number,
            $event
          )
        "
      >
        {{
          selectedLead.primaryContact.phoneNumber[0].number
            ? selectedLead.primaryContact.phoneNumber[0].number
            : '-'
        }}</span
      >
    </div>

    <div class="row  q-mt-sm" v-if="selectedLead.leadSource">
      <span class="heading-light col-3"> Lead Source </span>
      <span class="q-ml-md col">
        {{
          selectedLead.leadSource.detail ? selectedLead.leadSource.detail : '-'
        }}</span
      >
    </div>
    <div class="row  q-mt-sm" v-if="selectedLead.organizationName">
      <span class="heading-light col-3"> Organization Name </span>
      <span class="q-ml-md col"> {{ selectedLead.organizationName }}</span>
    </div>
    <div class="row  q-mt-sm" v-if="selectedLead.organizationName">
      <span class="heading-light col-3"> Inspection Type </span>
      <span class="q-ml-md col">
        {{
          selectedLead.inspectionInfo.value
            ? selectedLead.inspectionInfo.value
            : '-'
        }}</span
      >
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import CustomBar from 'components/CustomBar';
import { onEmailClick, onPhoneNumberClick } from '@utils/clickable';

export default {
  components: { CustomBar },
  created() {
    this.getLeadDetails(this.$route.params.id);
  },
  computed: {
    ...mapGetters(['selectedLead'])
  },
  methods: {
    ...mapActions(['getLeadDetails']),
    onEmailClick,
    onPhoneNumberClick
  }
};
</script>
