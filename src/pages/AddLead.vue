<template>
  <q-page>
    <div class="mobile-container-page-without-search">
      <div class="q-pa-lg column full-height">
        <div class="row">
          <p class="q-mx-none q-my-auto">Is this a new lead</p>
          <q-toggle
            v-model="isNewLead"
            left-label
            color="orange"
            class="q-ml-auto"
            @input="onNewLeadButtonToggle"
          />
        </div>
        <div v-if="!isNewLead">
          <q-separator></q-separator>
          <br />
          <p class="stepper-heading">
            If client already exists, select from list below
          </p>

          <div class="q-mt-lg text-bold">Select existing client</div>
          <q-form ref="addLead">
            <q-select
              dense
              class="full-width input-extra-padding"
              v-model="clientSelected"
              use-input
              input-debounce="0"
              option-label="name"
              label="Search"
              :options="options"
              @filter="searchFilterBy"
              option-value="id"
              behavior="menu"
              options-dense
              emit-value
              map-options
              :rules="[
                val => (val && val.length > 0) || 'Please select the client'
              ]"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-black">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </q-form>
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
export default {
  data() {
    return {
      clientSelected: '',
      options: '',
      isNewLead: true
    };
  },

  created() {
    const payload = {
      searchString: this.searchText ? this.searchText : '',
      status: ''
    };

    this.getClients(payload);
    this.options = this.clients;
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

    async onContinue() {
      let validate = false;
      if (!this.isNewLead) {
        validate = await this.$refs.addLead.validate();
      }
      if (validate || this.isNewLead) {
        if (this.clientSelected) {
          this.setSelectedClient(this.clientSelected);
          this.$router.push({
            path: `/add-lead-details/${this.clientSelected}`
          });
        } else {
          this.$router.push({ path: `/add-lead-details` });
        }
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
    },

    onNewLeadButtonToggle() {
      if (this.isNewLead) {
        this.clientSelected = '';
        this.setSelectedClient('');
      } else {
        this.setSelectedClient(this.clientSelected);
      }
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
