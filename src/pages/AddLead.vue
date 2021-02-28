<template>
  <q-page>
    <CustomHeader @backButton="onBackButtonClick" :showAddButton="false" />
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
            v-model="clientSelected"
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
import { mapActions, mapGetters, mapMutations } from 'vuex';
import CustomHeader from 'components/CustomHeader';
export default {
  data() {
    return {
      clientSelected: '',
      isNewLead: true
    };
  },

  components: {
    CustomHeader
  },

  created() {
    this.getClients();
    if (this.selectedClient) {
      this.isNewLead = false;
      this.clientSelected = this.selectedClient;
    }
  },

  computed: {
    ...mapGetters(['clients', 'selectedClient'])
  },

  methods: {
    ...mapActions(['getClients']),
    ...mapMutations(['setSelectedClient']),

    onContinue() {
      if (this.clientSelected) {
        this.setSelectedClient(this.clientSelected);
        this.$router.push({ path: `/add-lead-details/${this.clientSelected}` });
      } else {
        this.$router.push({ path: `/add-lead-details` });
      }
    },

    onBackButtonClick() {
      this.setSelectedClient('');
      this.$router.push('/leads');
    }
  }
};
</script>
<style></style>
