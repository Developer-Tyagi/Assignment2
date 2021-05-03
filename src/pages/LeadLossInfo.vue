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
        </div>
      </q-card>
    </div>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import CustomBar from 'components/CustomBar';
import LeadDetail from 'components/LeadDetail';
import { onEmailClick, onPhoneNumberClick, sendMap } from '@utils/clickable';

export default {
  components: { CustomBar, LeadDetail },
  computed: {
    ...mapGetters(['selectedLead'])
  },
  mounted() {
    this.getLeadDetails(this.$route.params.id);
  },

  methods: {
    ...mapActions(['getLeadDetails']),
    sendMap,
    onPhoneNumberClick,
    onEmailClick
  }
};
</script>
