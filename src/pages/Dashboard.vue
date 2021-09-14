<template>
  <!-- mobile-container-page listing-height -->
  <q-page style="background-color:#8F8F8F">
    <!-- height:calc(100vh-230px) -->

    <!-- <div style="box-shadow: 0px 30px 70px 10px  #000000;"></div> -->
    <q-card style="border-radius: 0 0 60px 60px; height:calc(100vh - 210px); ">
      <div class="row justify-between q-py-sm ">
        <div class="box left q-ml-xl">
          <img
            class="q-ml-lg q-mt-sm"
            src="~assets/LEADS.svg"
            style="width:70%"
            @click="$router.push('/leads-dashboard')"
          />
          <div class="box all">
            <p class="text-style">
              LEADS
            </p>
          </div>
        </div>
        <div class="box left q-mr-xl">
          <img
            class="q-ml-lg q-mt-sm  text-white"
            src="~assets/CLIENTS_menu.svg"
            style="width:70%"
            @click="$router.push('/clients')"
          />
          <div class="box all">
            <p class="text-style">
              CLIENTS
            </p>
          </div>
        </div>
        <!-- <img
          class="menu-left-icons q-mt-sm"
          src="~assets/Leads.png"
          style="width:30%"
          @click="$router.push('/leads-dashboard')"
        /> -->
        <!-- <img
          class="menu-right-icons q-mt-sm "
          src="~assets/Clients.png"
          style="width:30%;"
          @click="$router.push('/clients')"
        /> -->
      </div>
      <div class="row justify-between q-py-sm">
        <div class="box left q-ml-xl">
          <img
            class="q-ml-lg q-mt-sm"
            src="~assets/VENDOR.svg"
            style="width:70%"
            @click="$router.push('/vendors')"
          />
          <div class="box all">
            <p class="text-style">
              VENDORS
            </p>
          </div>
        </div>
        <div class="box left q-mr-xl">
          <img
            class="q-ml-lg q-mt-sm"
            src="~assets/CLAIMS.svg"
            style="width:70%"
            @click="$router.push('/claims')"
          />
          <div class="box all">
            <p class="text-style">
              CLAIMS
            </p>
          </div>
        </div>
        <!-- <img
          class="menu-left-icons q-mt-sm"
          src="~assets/Vendor.png"
          style="width:30%;"
          @click="$router.push('/vendors')"
        />
        <img
          class="menu-right-icons q-mt-sm "
          src="~assets/Claims.png"
          style="width:30%;"
          @click="$router.push('/claims')"
        /> -->
      </div>
      <div class="row justify-between q-py-sm">
        <div class="box left q-ml-xl">
          <img
            class="q-ml-lg q-mt-sm"
            src="~assets/DashboardLead.svg"
            style="width:70%"
            @click="selectClaimDialog = true"
          />
          <div class="box all">
            <p
              style="text-align: center;
  font-size: 15px;
  margin-top: 5px;
  font-weight: bold;"
            >
              SCAN
            </p>
            <p
              style="  text-align: center;
  font-size: 18px;
 
  font-weight: bold;"
            >
              UPLOAD
            </p>
          </div>
        </div>
        <div class="box left q-mr-xl">
          <img
            class="q-ml-lg q-mt-sm"
            src="~assets/DashboardLead.svg"
            style="width:70%"
            @click="selectClaimDialog = true"
          />
          <div class="box all">
            <p class="text-style">
              CAMERA
            </p>
          </div>
        </div>
        <!-- <img
          class="menu-left-icons q-mt-sm"
          src="~assets/Vendor.png"
          style="width:30%;"
          @click="$router.push('/vendors')"
        />
        <img
          class="menu-right-icons q-mt-sm "
          src="~assets/Claims.png"
          style="width:30%;"
          @click="$router.push('/claims')"
        /> -->
      </div>
      <!-- <div class="row justify-between q-py-sm q-mb-sm">
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
      </div> -->
      <div
        style="box-shadow: 5px  5px 40px 15px  #000000; opacity:50%"
        class="q-mt-lg"
      ></div>
    </q-card>
    <div class=" q-ma-xs  row justify-between" style="calc(100vh - 90%)">
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
  </q-page>
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
    console.log(this.$q.screen.height, 'ss');
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
<style lang="scss">
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
  margin-right: 70px;
}
.menu-left-icons {
  margin-left: 70px;
}
.box {
  height: 100px;
  width: 150px;
  overflow: hidden;
  border: 1px solid #ccc;
  border-radius: 20px 20px 30px 30px;
}

.left {
  height: 160px;
  width: 150px;
  box-shadow: 5px 0 5px -5px #333;
  background-color: $primary;
}

.all {
  box-shadow: 0 0 100px #ef5926;
  margin-top: -15px;
  background-color: #000000;
  border-radius: 500px;
  display: inline-block;
  border-radius: 150px 150px 0 0;
  color: white;

  text-decoration-color: red;
}
.text-style {
  text-align: center;
  font-size: 18px;
  margin-top: 15px;
  font-weight: bold;
  // overflow-wrap: break-word;
}
</style>
