<template>
  <!-- mobile-container-page listing-height -->
  <div
    class=" mobile-container-page dashboard-height"
    style="background-color:#8F8F8F;"
  >
    <q-card style="border-radius: 0 0 60px 60px;">
      <div class="row justify-between q-py-sm">
        <img
          class="menu-left-icons"
          src="~assets/Leads.png"
          style="width:30%;"
          @click="$router.push('/leads-dashboard')"
        />
        <img
          class="menu-right-icons "
          src="~assets/Clients.png"
          style="width:30%;"
          @click="$router.push('/clients')"
        />
      </div>
      <div class="row justify-between q-py-sm">
        <img
          class="menu-left-icons"
          src="~assets/Vendor.png"
          style="width:30%;"
          @click="$router.push('/vendors')"
        />
        <img
          class="menu-right-icons "
          src="~assets/Claims.png"
          style="width:30%;"
          @click="$router.push('/claims')"
        />
      </div>
      <div class="row justify-between q-py-sm">
        <img
          class="menu-left-icons"
          src="~assets/UploadScan.png"
          style="width:30%;"
          @click="selectClaimDialog = true"
        />
        <img
          class="menu-right-icons "
          src="~assets/CameraLogo.png"
          style="width:30%;"
        />
      </div>
    </q-card>
    <div class=" q-ma-sm q-mb-sm row justify-between">
      <div class="column">
        <img
          src="~assets/Profile.svg"
          style="width:100%;"
          @click="$router.push('/edit-profile')"
        />
        <div class="text-center text-white">
          PROFILE
        </div>
      </div>
      <div class="column">
        <img src="~assets/SETTINGS.svg" style="width:100%;" />
        <div class="text-center text-white">SETTINGS</div>
      </div>
      <div class="column">
        <img
          class="q-mx-md"
          src="~assets/STATS.svg"
          style="width:68%;"
          @click="$router.push('/claimstats')"
        />
        <p class=" text-center text-white">CLAIMS STATS</p>
      </div>
      <div class="" @click="onClickAddUpIcon()">
        <img src="~assets/ADD.svg" style="width:100%;" />
        <div class="text-center text-white">ADD</div>
      </div>
    </div>
    <q-dialog
      v-model="openDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
      :position="'bottom'"
    >
      <AddOptions />
    </q-dialog>
    <!-- Select Claim Dialog -->
    <q-dialog
      v-model="selectClaimDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          :dialogName="'Select Claim'"
          @closeDialog="selectClaimDialog = false"
        />
        <div class="clients-list  listing-height q-mt-md" v-if="claims.length">
          <div>
            <div
              class="clients-list "
              v-for="(claim, index) in claims"
              :key="claim.id"
            >
              <div class="client-list-item">
                <div class="row  form-heading q-pb-md  ">
                  <div class="col-10" @click="onClickingOnClaim(claim)">
                    {{ claim.client.fname }}
                    {{ claim.client.lname }}
                  </div>
                </div>
                <div @click="onClickingOnClaim(claim)">
                  <div class="row">
                    <div class="col-3">Carrier</div>
                    <div>
                      {{
                        claim.carrier
                          ? claim.carrier.value
                            ? claim.carrier.value
                            : ''
                          : '-'
                      }}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-3">Claim No.</div>
                    <div>
                      {{ claim.number ? claim.number : '-' }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="full-height full-width column">
          <div class="column absolute-center">
            <div style="color: #666666,align-items: center">
              You haven't added a Claim yet.
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { dateToShow } from '@utils/date';
import { getCurrentUser } from 'src/utils/auth';
import AddOptions from 'components/AddOptions';
import CustomBar from 'components/CustomBar';
export default {
  components: { CustomBar, AddOptions },
  data() {
    return {
      selectClaimDialog: false,
      isClickable: false,
      openDialog: false,
      params: {
        favourite: ''
      }
    };
  },
  created() {
    this.getClaims();
  },
  methods: {
    ...mapActions(['getClients', 'getActiveLeadsList', 'getClaims']),
    ...mapMutations(['setSelectedClaimId']),
    onClickAddUpIcon() {
      this.openDialog = true;
    },
    dateToShow,
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
    },
    onClickingOnClaim(claim) {
      this.setSelectedClaimId(claim.id);
      this.$router.push('/vendor-document');
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
  /* background-color: #1B2854; */
  background-color: #ffffff;
  height: 3rem;
  width: 4rem;
  margin: auto;
  /* border-radius: 10px; */
  border-radius: 20px 20px 20px 20px;
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
  color: white;
  font-weight: bold;
}
.menu-card {
  background: red;
  margin: 10px;
  margin-left: 20px;
  margin-right: 20px;
  width: 36%;
  height: 21vh;
  border-radius: 20px 20px 60px 60px;
  overflow: hidden;
}
.menu-card-inside {
  border-radius: 100% 100% 55% 55% !important;
  height: 10vh;
  margin-left: 10px;
  margin-right: 10px;
  background-color: black;
  position: relative;
}
.menu-right-icons {
  margin-right: 60px;
}
.menu-left-icons {
  margin-left: 60px;
}
</style>
