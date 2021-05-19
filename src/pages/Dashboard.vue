<template>
  <q-page class="q-px-md q-py-md mobile-container-page listing-height">
    <q-card>
      <q-card-section class="row">
        <div class="col-3">
          <div class="my-card">
            <p class="card-text">
              {{ claimStatic.open ? claimStatic.open : '-' }}
            </p>
          </div>

          <p class="text"><small>Open Claims</small></p>
        </div>
        <div class="col-3">
          <div class="my-card">
            <p class="card-text">
              {{ claimStatic.recentUpdated ? claimStatic.recentUpdated : '-' }}
            </p>
          </div>
          <p class="text"><small>Claims with recent activity</small></p>
        </div>
        <div class="col-3">
          <div class="my-card">
            <p class="card-text">
              {{ clientStatic.active ? clientStatic.active : '-' }}
            </p>
          </div>
          <p class="text"><small>Clients</small></p>
        </div>
        <div class="col-3">
          <div class="my-card">
            <p class="card-text">
              {{ clientStatic.openClaims ? clientStatic.openClaims : '-' }}
            </p>
          </div>
          <p class="text"><small>Clients with Open Claims</small></p>
        </div>
      </q-card-section>
    </q-card>
    <div class="q-mt-sm">
      <div class="q-pa-sm">
        <span>New Claims/Clients & Leads</span>
        <span class="float-right">Last 7 days</span>
      </div>
      <q-card class="q-mt-sm">
        <q-card-section class="row q-py-sm q-px-none">
          <div class="col-6 q-pa-md border-right">
            <span><small>New Claims</small></span>
            <span class="text-bold float-right">
              {{ claimStatic.new ? claimStatic.new : '-' }}</span
            >
          </div>
          <div class="col-6 q-pa-md">
            <span><small>New Leads</small></span>
            <span class="text-bold float-right">
              {{ leadStatic.new ? leadStatic.new : '-' }}</span
            >
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="q-mt-sm">
      <div class="q-pa-sm">
        <span>Claims Watch List</span>
        <span class="float-right">See all</span>
      </div>
      <div v-if="claims.data">
        <q-card class="q-mt-sm" v-for="claim in claims.data">
          <q-card-section>
            <div class="row">
              <span class="heading-light"
                >{{
                  claim.attributes.client.fname
                    ? claim.attributes.client.fname
                    : '-'
                }}
                {{
                  claim.attributes.client.lname
                    ? claim.attributes.client.lname
                    : '-'
                }}</span
              >
            </div>
            <div class="row">
              <span>
                <span class="heading-light">File No - </span>

                {{
                  claim.attributes.fileNumber
                    ? claim.attributes.fileNumber
                    : '-'
                }}
              </span>
            </div>
            <div class="row">
              <span class="heading-light">Carrier - </span>

              <div class="q-ml-xs">
                {{
                  claim.attributes.carrier
                    ? claim.attributes.carrier.value
                      ? claim.attributes.carrier.value
                      : ''
                    : '-'
                }}
              </div>
            </div>
            <div class="row justify-between q-pt-xs">
              <div v-if="claim.attributes.status" class="row">
                <q-badge
                  class="q-px-md q-py-sm"
                  :style="
                    claim.attributes.status.isCancelled == false
                      ? 'background-color:#ECA74C;'
                      : 'background-color:#EF9A9A;'
                  "
                >
                  {{
                    claim.attributes.status
                      ? claim.attributes.status.isCancelled == false
                        ? 'OPEN'
                        : 'CANCELLED'
                      : ''
                  }}</q-badge
                >
              </div>

              <div class="q-ml-auto">
                {{
                  claim.attributes.lossInfo.cause
                    ? claim.attributes.lossInfo.cause
                      ? claim.attributes.lossInfo.cause.value
                      : ''
                    : '-'
                }}
              </div>
            </div>
            <div class="row">
              <div class="q-ml-auto">
                {{ claim.attributes.created | moment('DD/MM/YYYY') }}
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div v-else class="full-height full-width column">
        <div class="absolute-center ">
          <div style="color: #666666,align-items: center" class="text-center">
            No claim has been marked as favourite.
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      params: {
        favourite: ''
      }
    };
  },
  created() {
    this.getClaimStatistics();
    this.getLeadStatistics();
    this.getClientStatistics();
    this.params.favourite = true;
    this.getClaims(this.params);
  },
  methods: {
    ...mapActions([
      'getClaimStatistics',
      'getLeadStatistics',
      'getClientStatistics',
      'getClaims'
    ])
  },
  computed: {
    ...mapGetters(['claimStatic', 'leadStatic', 'clientStatic', 'claims'])
  }
};
</script>
<style>
.my-card {
  display: flex;
  background-color: #1b2854;
  height: 3rem;
  width: 3rem;
  margin: auto;
  border-radius: 3px;
}
.card-text {
  color: #ffffff;
  font-size: 1rem;
  font-weight: bold;
  margin: auto;
}

.text {
  text-align: center;
  margin: 5px auto 0 auto;
  line-height: 10px;
  max-width: 80%;
}
</style>
