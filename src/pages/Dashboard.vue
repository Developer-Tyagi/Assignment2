<template>
  <!-- mobile-container-page listing-height -->
  <q-page
    class="mobile-container-page listing-height "
    style="background-color:#8F8F8F;"
  >
    <q-card style="border-radius: 0 0 60px 60px;">
      <div class="row justify-between q-py-md">
        <img
          class="q-ml-xl "
          src="~assets/Leads.png"
          style="width:30%;"
          @click="$router.push('/add-lead')"
        />

        <img
          class="q-mr-xl"
          src="~assets/Clients.png"
          style="width:30%;"
          @click="$router.push('/add-client')"
        />
      </div>
      <div class="row justify-between q-py-md">
        <img
          class="q-ml-xl  "
          src="~assets/Vendor.png"
          style="width:30%;"
          @click="$router.push('/vendors')"
        />
        <img
          class="q-mr-xl  "
          src="~assets/Claims.png"
          style="width:30%;"
          @click="$router.push('/claims')"
        />
      </div>
      <div class="row justify-between q-py-xl">
        <img
          class="q-ml-xl  "
          src="~assets/UploadScan.png"
          style="width:30%;"
          @click="$router.push('/vendor-document')"
        />

        <img
          class="q-mr-xl  "
          src="~assets/CameraLogo.png"
          style="width:30%;"
        />
      </div>
    </q-card>
    <div class=" q-ma-md q-mt-lg row justify-between ">
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
      <div class="">
        <img src="~assets/ADD.svg" style="width:100%;" />
        <div class="text-center text-white">ADD</div>
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
        favourite: ''
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
    this.getClaims(this.params);
  },
  methods: {
    ...mapActions([
      'getClaimStatistics',
      'getLeadStatistics',
      'getClientStatistics',
      'getClaims',
      'getClients',
      'getActiveLeadsList'
    ]),
    ...mapMutations(['setSelectedClaimId']),
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
  /* background-color: #1b2854; */
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
  /* background-color: red; */
  /* height: 18vh;
  border-radius: 60px 60px 0px 60px; */
  /* padding: 7%; */
  border-radius: 100% 100% 55% 55% !important;
  height: 10vh;
  margin-left: 10px;
  margin-right: 10px;
  /* width: 20vh; */
  background-color: black;
  position: relative;
}
</style>
