<template>
  <q-page>
    <q-header bordered class="bg-white">
      <q-toolbar class="row bg-white">
        <img
          src="~assets/left-arrow.svg"
          alt="back-arrow"
          @click="$router.push('/leads')"
          style="margin: auto 0"
        />
        <div class="text-uppercase text-bold text-black q-mx-auto">
          {{ $route.name }}
        </div>
      </q-toolbar>
    </q-header>
    <div style="padding-top: 51px">
      <div class="q-pa-lg column" style="height: calc(100vh - 51px)">
        <div class="row">
          <p class="q-mx-none q-my-auto">Is this a new lead</p>
          <q-toggle
            v-model="isNewLead"
            left-label
            color="orange"
            class="q-ml-auto "
          />
        </div>
        <div v-if="!isNewLead">
          <q-separator></q-separator>
          <br />
          <p style="color:#666666;opacity:50%;font-size:12px">
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
