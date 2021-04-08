<template>
  <q-page>
    <div class="listing-height">
      <div class="clients-list q-ma-sm ">
        <div class="client-list-item">
          <div class="row">
            <div class="form-heading q-pa-sm">Client Name</div>
            <q-icon name="edit" class="edit-icon" size="sm" color="primary" />
          </div>
          <span class="q-pa-sm">
            {{
              getSelectedClaim.attributes.client.fname
                ? getSelectedClaim.attributes.client.fname
                : '-'
            }}
            {{
              getSelectedClaim.attributes.client.lname
                ? getSelectedClaim.attributes.client.lname
                : '-'
            }}</span
          >

          <div class="form-heading q-pa-sm">File Number</div>

          <span class="q-pa-sm">{{
            getSelectedClaim.attributes.fileNumber
              ? getSelectedClaim.attributes.fileNumber
              : '-'
          }}</span>
          <div class="form-heading q-pa-sm">Claim Number</div>
          <span class="q-pa-sm">
            {{
              getSelectedClaim.attributes.number
                ? getSelectedClaim.attributes.number
                : '-'
            }}</span
          >
          <div class="form-heading q-pa-sm">Current Phase:</div>
          <span class="q-pa-sm">
            {{
              getSelectedClaim.attributes.currentPhase
                ? getSelectedClaim.attributes.currentPhase
                : '-'
            }}</span
          >
          <div class="form-heading q-pa-sm">Status:</div>
          <span class="q-pa-sm">
            {{
              getSelectedClaim.attributes.status.value
                ? getSelectedClaim.attributes.status.value
                : '-'
            }}</span
          >
          <div class="form-heading q-pa-sm">Since Open</div>
          <span class="q-pa-sm">
            {{
              getSelectedClaim.attributes.sinceOpen
                ? getSelectedClaim.attributes.sinceOpen
                : '-'
            }}</span
          >
          <div class="form-heading q-pa-sm">Since Loss</div>
          <span class="q-pa-sm">
            {{
              getSelectedClaim.attributes.sinceLoss
                ? getSelectedClaim.attributes.sinceLoss
                : '-'
            }}</span
          >
        </div>
      </div>
      <div class="form-heading q-ml-md">Claim Timeline</div>
      <div
        class="clients-list q-ma-sm"
        v-if="getSelectedClaim.attributes.phases.length"
      >
        <div v-for="(phase, index) in getSelectedClaim.attributes.phases">
          <div class="row">
            <div class="col-2 q-ml-md">
              <q-avatar
                class="q-ma-sm"
                color="primary"
                size="50px"
                font-size="15px"
                text-color="white"
              >
                <span>
                  {{
                    getSelectedClaim.attributes.phases[index].created
                      ? getSelectedClaim.attributes.phases[index].created
                      : '-' | moment('D MMM')
                  }}</span
                >
              </q-avatar>
            </div>

            <div class="row  q-ml-lg q-mt-sm">
              <div>
                {{
                  getSelectedClaim.attributes.phases[index].value
                    ? getSelectedClaim.attributes.phases[index].value
                    : '-'
                }}<q-icon
                  name="create"
                  color="primary"
                  class="edit"
                  style=" margin-left: 200px;"
                  size="sm"
                ></q-icon
                ><br />
                <div style="font-size:13px">
                  Phase changed to
                  {{
                    getSelectedClaim.attributes.phases[index].value
                      ? getSelectedClaim.attributes.phases[index].value
                      : '-'
                  }}
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CustomBar from 'components/CustomBar';
import moment from 'moment';

export default {
  name: 'Claims',
  components: { CustomBar },
  data() {
    return {};
  },

  computed: {
    ...mapGetters(['getSelectedClaim', 'setClientProperty', 'selectedClaimId']),
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY');
      }
    }
  },

  created() {
    if (!this.selectedClaimId) {
      this.$router.push('/clients');
    }
    this.getSingleClaimDetails(this.selectedClaimId);
  },
  methods: {
    ...mapActions(['getSingleClaimDetails'])
  }
};
</script>
