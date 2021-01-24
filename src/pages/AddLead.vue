<template>
  <q-page>
    <CustomHeader @backButton="$router.push('/leads')" :showAddButton="false" />
    <div style="padding-top: 51px">
      <div class="q-pa-lg column" style="height: calc(100vh - 51px)">
        <div class="row">
          <p class="q-mx-none q-my-auto">Is this a new lead</p>
          <q-toggle
            v-model="isNewLead"
            left-label
            color="orange"
            class="q-ml-auto"
          />
        </div>
        <div v-if="!isNewLead">
          <q-separator></q-separator>
          <br />
          <p style="color: #666666; opacity: 50%; font-size: 12px">
            If client already exists, select from list below
          </p>
          <q-select
            v-model="selectedClient"
            :options="clients"
            clearable
            option-label="name"
            option-value="id"
            emit-value
            label="Select existing client"
            map-options
          />
        </div>
        <q-btn
          label="Continue"
          color="primary"
          class="full-width q-mt-auto text-capitalize"
          @click="onContinue"
          icon-right="arrow_right_alt"
          size="'xl'"
        ></q-btn>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      selectedClient: '',
      isNewLead: true
    };
  },

  components: {
    CustomHeader
  },

  created() {
    this.getClients();
  },

  computed: {
    ...mapGetters(['clients'])
  },

  methods: {
    ...mapActions(['getClients']),

    onContinue() {
      if (this.selectedClient) {
        this.$router.push({ path: `/add-lead-details/${this.selectedClient}` });
      } else {
        this.$router.push({ path: `/add-lead-details` });
      }
    }
  }
};
</script>
<style></style>
