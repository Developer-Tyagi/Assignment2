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
          <p class="stepper-heading">
            If client already exists, select from list below
          </p>
          <q-select
            class="full-width"
            v-model="clientSelected"
            use-input
            input-debounce="0"
            option-label="name"
            label="Select existing client"
            :options="options"
            @filter="searchFilterBy"
            option-value="id"
            behavior="menu"
            emit-value
            map-options
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-black">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
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
      options: '',
      isNewLead: true
    };
  },

  components: {
    CustomHeader
  },

  created() {
    this.options = this.clients;
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

    searchFilterBy(val, update) {
      this.clientSelected = null;
      if (val === ' ') {
        update(() => {
          this.options = this.clients;
        });
        return;
      }

      update(() => {
        const search = val.toLowerCase();
        this.options = this.clients.filter(
          v => v.name.toLowerCase().indexOf(search) > -1
        );
      });
    },
    onBackButtonClick() {
      this.setSelectedClient('');
      this.$router.push('/leads');
    }
  }
};
</script>
<style lang="scss">
.stepper-heading {
  color: #333333;
  font-weight: bold;
  font-size: 14px;
}
</style>
