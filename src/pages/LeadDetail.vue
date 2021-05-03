<template>
  <q-page>
    <div class="mobile-container-page-without-search">
      <div>
        <LeadDetail />
      </div>
      <q-list bordered class="q-mt-xs">
        <q-expansion-item
          group="leadGroup"
          label="Loss Info"
          default-opened
          header-class="text-primary"
        >
          <q-card>
            <q-card-section>
              <div class="q-mt-md row">
                <div class="heading-light q-mt-none col-4 lightHeading">
                  Loss Address
                </div>
                <div class="col-6  q-ml-md ">
                  <div>
                    {{
                      selectedLead.lossLocation.streetAddress
                        ? selectedLead.lossLocation.streetAddress
                        : '-'
                    }}
                  </div>
                  <div>
                    {{
                      selectedLead.lossLocation.addressRegion
                        ? selectedLead.lossLocation.addressRegion
                        : '-'
                    }}
                    {{ selectedLead.lossLocation.addressRegion }}-{{
                      selectedLead.lossLocation.postalCode
                    }}
                  </div>
                  <div>
                    {{ selectedLead.lossLocation.addressCountry }}
                    <q-icon
                      name="place"
                      color="primary"
                      @click="sendMap(selectedLead.lossLocation)"
                      class="edit-icon"
                    ></q-icon>
                  </div>
                </div>
              </div>
              <div class="q-mt-md row">
                <div class="heading-light q-mt-none col-xs-4 lightHeading">
                  Date of Loss
                </div>
                <div class="column q-ml-md">
                  {{ selectedLead.dateofLoss | moment('DD/MM/YYYY') }}
                </div>
              </div>
              <div class="q-mt-md row">
                <div class="heading-light q-mt-none col-xs-4 lightHeading">
                  Loss Description
                </div>
                <div class="column q-ml-md">
                  {{ selectedLead.lossDesc ? selectedLead.lossDesc : '-' }}
                </div>
              </div>
              <div class="q-mt-md row">
                <div class="heading-light q-mt-none col-xs-4 lightHeading">
                  Loss Cause
                </div>
                <div class="column q-ml-md" v-if="selectedLead.lossCause">
                  {{
                    selectedLead.lossCause.value
                      ? selectedLead.lossCause.value
                      : '-'
                  }}
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator></q-separator>

        <q-expansion-item
          group="leadGroup"
          label="Policy Info"
          header-class="text-primary"
        >
          <q-card>
            <q-card-section>
              <div class="q-mt-md row">
                <div class="heading-light q-mt-none col-xs-4 lightHeading">
                  Policy Number
                </div>
                <div class="column q-ml-md">
                  {{
                    selectedLead.policyNumber ? selectedLead.policyNumber : '-'
                  }}
                </div>
              </div>
              <div class="q-mt-md row">
                <div class="heading-light q-mt-none col-xs-4 lightHeading">
                  Carrier Details
                </div>
                <div class="column q-ml-md" v-if="selectedLead.carrier">
                  {{
                    selectedLead.carrier.value
                      ? selectedLead.carrier.value
                      : '-'
                  }}
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator></q-separator>

        <q-expansion-item
          group="leadGroup"
          label="Notes"
          header-class="text-primary"
        >
          <q-card>
            <q-card-section>
              <div class="q-mt-md row">
                <div class="heading-light q-mt-none col-xs-4 lightHeading">
                  Notes
                </div>
                <div class="column q-ml-md" v-if="selectedLead.notes">
                  {{ selectedLead.notes }}
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator></q-separator>
      </q-list>

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
    return {};
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

    onConvertLeadToClientButtonClick(selectedLead) {
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
