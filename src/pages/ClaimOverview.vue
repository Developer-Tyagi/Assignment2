<template>
  <q-page>
    <div class="mobile-container-page ">
      <div class="clients-list q-ma-sm ">
        <div class="client-list-item">
          <div class="row">
            <div class="form-heading q-pa-sm">Client Name</div>
            <q-icon name="edit" class="edit-icon" color="primary" />
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
          <br />
          <div class="form-heading">Claim TimeLines</div>
          <br />
          <div
            class="clients-list q-ma-sm"
            v-if="getSelectedClaim.attributes.phases.length"
          >
            <div v-for="(phase, index) in getSelectedClaim.attributes.phases">
              <div class="row">
                <div class="col-7 ">
                  <q-avatar
                    color="primary"
                    size="50px"
                    font-size="15px"
                    text-color="white"
                  >
                    {{
                      getSelectedClaim.attributes.phases[index].created
                        ? getSelectedClaim.attributes.phases[index].created
                        : '-' | moment('D MMM')
                    }}
                  </q-avatar>
                </div>
                <div class="text-bold q-ml-md col-2 q-mt-sm">
                  {{
                    getSelectedClaim.attributes.phases[index].value
                      ? getSelectedClaim.attributes.phases[index].value
                      : '-'
                  }}
                </div>

                <!-- <div class=" q-ml-md col ">
                  Phase Changed to Settled
                </div> -->
              </div>
            </div>
          </div>
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
<style lang="scss">
.form-heading {
  color: #333333;
  font-weight: bold;
  font-size: 14px;
  margin-top: 20px;
}
.client-list-item {
  padding: 20px;
  background-color: #f4f4f4;
  text-transform: capitalize;
  p {
    margin: 0 0 6px;
  }
}
.edit-icon {
  position: absolute;
  right: 20px;
  font-size: 20px;
}
</style>
