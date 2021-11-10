<template>
  <q-page class="q-px-md q-py-md mobile-container-page listing-height">
    <q-card style="border-radius: 20px 20px 20px 20px;">
      <q-card-section class="row bg-primary ">
        <div class="col-3 q-px-sm" @click="onOpenClaimsClick">
          <div class="my-card q-py-xs">
            <p class="text-primary card-text">
              {{ claimStatic.open ? claimStatic.open : '0' }}
            </p>
          </div>

          <p class="text">
            <small>Open Claims</small>
          </p>
        </div>

        <div class="col-3 q-px-sm" @click="onClickClaimRecentActivity">
          <div class="my-card q-py-xs">
            <p class="card-text text-primary">
              {{ claimStatic.recentUpdated ? claimStatic.recentUpdated : '0' }}
            </p>
          </div>
          <p class="text"><small>Claims with recent activity</small></p>
        </div>
        <div v-if="isClickable" class="q-px-sm col-3" @click="onClientsClick">
          <div class="my-card q-py-xs">
            <p class="card-text text-primary">
              {{ clientStatic.active ? clientStatic.active : '0' }}
            </p>
          </div>
          <p class="text"><small>Clients</small></p>
        </div>

        <div v-else class="col-3 q-px-sm">
          <div class="my-card q-py-xs">
            <p class="card-text text-primary">
              {{ clientStatic.active ? clientStatic.active : '0' }}
            </p>
          </div>
          <p class="text"><small>Clients</small></p>
        </div>
        <div v-if="isClickable" class="col-3 q-px-sm" @click="onOpenClientsClick">
          <div class="my-card q-py-xs">
            <p class="card-text text-primary">
              {{
                clientStatic && clientStatic.openClaims
                  ? clientStatic.openClaims
                  : '0'
              }}
            </p>
          </div>
          <p class="text"><small>Clients with Open Claims</small></p>
        </div>
        <div v-else class="col-3 q-px-sm">
          <div class="my-card q-py-xs">
            <p class="card-text text-primary">
              {{
                clientStatic && clientStatic.openClaims
                  ? clientStatic.openClaims
                  : '0'
              }}
            </p>
          </div>
          <p class="text"><small>Clients with Open Claims</small></p>
        </div>
      </q-card-section>
    </q-card>
    <div class="q-mt-sm">
      <div class="q-px-sm q-pt-sm">
        <span class='text-caption'>New Claims/Clients & Leads</span>
        <span class="float-right text-caption">Last 7 days</span>
      </div>
      <div class="row justify-between">
        <q-card class="col bg-primary rounded q-mr-sm">
          <div class="q-pa-sm row cursor-pointer" @click="onClickNewClaims">
            <span class="text-white text-bold text-subtitle1 col-8 q-pl-xs"
              ><small>New Claims</small></span
            >
            <span class="text-center text-primary col-4 text-bold rounded bg-white q-pa-xs">
              {{ claimStatic.new ? claimStatic.new : '0' }}</span
            >
          </div>
        </q-card>
        <q-card class="col bg-primary rounded ">
          <div class="cursor-pointer q-pa-sm row" @click="onClickNewLead">
            <span class="text-white text-bold text-subtitle1 col-8 q-pl-xs"
              ><small>New Leads</small></span
            >
            <span class="col-4 text-bold text-primary q-pa-xs q-pl-sm text-center rounded bg-white">
              {{ leadStatic.new ? leadStatic.new : '0' }}</span
            >
          </div>
        </q-card>
      </div>
    </div>
    <div class=" q-mt-sm">
      <div class="q-px-sm q-pt-sm ">
        <span class='text-caption'>Claims Watch List</span>
        <span class="text-caption float-right">See all</span>
      </div>
      <div class="claim-list-scrollable q-mx-xs q-mb-xs" v-if="claims.length > 0">
        <q-card
          class="q-mt-xs cursor-pointer"
          v-for="claim in claims"
          @click="openClaimDetail(claim)"
        >
          <q-card-section>
            <div class="row ">
              <span class="heading-light"
                >{{ claim.client.fname ? claim.client.fname : '-' }}
                {{ claim.client.lname ? claim.client.lname : '-' }}</span
              >
            </div>
            <div class="row">
              <span>
                <span class="heading-light">File No - </span>

                {{ claim.fileNumber ? claim.fileNumber : '-' }}
              </span>
            </div>
            <div class="row">
              <span class="heading-light">Carrier - </span>

              <div class="q-ml-xs">
                {{
                  claim.carrier
                    ? claim.carrier.value
                      ? claim.carrier.value
                      : ''
                    : '-'
                }}
              </div>
            </div>
            <div class="row justify-between q-pt-xs">
              <div v-if="claim.status" class="row">
                <q-badge
                  class="q-px-md q-py-sm"
                  :style="
                    claim.status.isCancelled == false
                      ? 'background-color:#ECA74C;'
                      : 'background-color:#EF9A9A;'
                  "
                >
                  {{
                    claim.status.isCancelled == false ? 'OPEN' : 'CANCELLED'
                  }}</q-badge
                >
              </div>

              <div class="q-ml-auto">
                {{
                  claim.lossInfo.cause
                    ? claim.lossInfo.cause
                      ? claim.lossInfo.cause.value
                      : ''
                    : '-'
                }}
              </div>
            </div>
            <div class="row">
              <div class="q-ml-auto">
                {{ dateToShow(claim.created) }}
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
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { dateToShow } from '@utils/date';
import { getCurrentUser } from 'src/utils/auth';

export default {
  data() {
    return {
      isClickable: false,
      params: {
        favourite: '',
        favouriteID: ''
      }
    };
  },
  created() {
    this.getClaimStatistics();
    var index = getCurrentUser().attributes.roles.findIndex(
      std => std.machineValue === 'vendor' || std.machineValue === 'estimator'
    );
    if (index < 0) {
      this.isClickable = true;
      this.getLeadStatistics();
      this.getClientStatistics();
    }
    this.params.favourite = true;
    this.params.favouriteID = getCurrentUser().id;
    this.getClaims(this.params);
  },
  methods: {
    ...mapActions([
      'getClaimStatistics',
      'getLeadStatistics',
      'getClientStatistics',
      'getClaims',
      'getClients',
      'getActiveLeadsList',
      'getArchivedLeadsList'
    ]),
    ...mapMutations(['setSelectedClaimId', 'setConvertedLead']),
    dateToShow,
    onClickNewLead() {
      this.$store.commit('setShowConvertButton', true);
      this.$router.push('/leads');
      const payload = {
        new: '',
        status: ''
      };
      this.setConvertedLead('Active');
      this.getActiveLeadsList(payload);
      this.getArchivedLeadsList();
    },
    openClaimDetail(value) {
      this.setSelectedClaimId(value.id);
      this.$router.push('/claim-details');
    },
    onOpenClaimsClick() {
      this.$router.push('/claims');

      const params = {
        status: 'open'
      };
      this.getClaims(params);
    },
    onClientsClick() {
      this.$router.push('/clients');
      this.getClients();
    },
    onClickNewClaims() {
      this.$router.push('/claims');
      const params = {
        new: true
      };
      this.getClaims(params);
    },
    onClickNewLeads() {
      this.$router.push('/leads');
      const params = {
        new: true
      };

      this.getActiveLeadsList(params);
    },
    onClickClaimRecentActivity() {
      this.$router.push('/claims');
      const params = {
        recent_activity: true
      };
      this.getClaims(params);
    },
    onOpenClientsClick() {
      this.$router.push('/clients');
      const params = {
        status: 'open'
      };
      this.getClients(params);
    }
  },
  computed: {
    ...mapGetters(['claimStatic', 'leadStatic', 'clientStatic', 'claims'])
  }
};
</script>
<style>
.my-card {
  display: flex;
  background-color: #ffffff;
  border-radius: 13px 13px 13px 13px;
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
  color: white;
  font-weight: bold;
}
.claim-list-scrollable {
  height: calc(100vh - 350px);
  overflow-x: hidden;
  overflow-y: auto;
  text-align: justify;
}
</style>
