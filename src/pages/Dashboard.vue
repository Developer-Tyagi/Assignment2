<template>
  <!-- mobile-container-page listing-height -->

  <q-page style="background-color:#8F8F8F;">
    <q-card style="border-radius: 0 0 60px 60px;height:(74vh); ">
      <div style="height:calc(100vh - 205px)">
        <div class="row justify-between q-py-sm">
          <div class="box left menu-left-icons">
            <img
              class="q-ml-lg q-mt-sm q-mb-sm image-style"
              src="~assets/LEADS.svg"
              style="width:70%;"
              @click="$router.push('/leads-dashboard')"
            />
            <div class="box all">
              <p class="text-style">
                LEADS
              </p>
            </div>
          </div>
          <div class="box left menu-right-icons">
            <img
              class="q-ml-lg q-mt-sm  q-mb-sm image-style"
              src="~assets/LEADS.svg"
              style="width:70%;"
              @click="$router.push('/clients')"
            />
            <div class="box all">
              <p class="text-style">
                CLIENTS
              </p>
            </div>
          </div>
        </div>
        <div class="row justify-between q-py-sm">
          <div class="box left menu-left-icons ">
            <img
              class="q-ml-lg q-mt-sm  q-mb-sm image-style"
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
          <div class="box left  menu-right-icons">
            <img
              class="q-ml-lg q-mt-sm  q-mb-sm image-style"
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
        </div>
        <div class="row justify-between q-py-sm">
          <div class="box left menu-left-icons ">
            <img
              class="q-ml-lg q-mt-sm  q-mb-sm image-style"
              src="~assets/DashboardLead.svg"
              style="width:70%"
              @click="selectClaimDialog = true"
            />
            <div class="box all">
              <div
                style="text-align: center;
  font-size: 15px;
  margin-top: 5px;
  font-weight: bold;"
              >
                SCAN
              </div>
              <p
                style="  text-align: center;
  font-size: 15px;
  font-weight: bold;"
              >
                UPLOAD
              </p>
            </div>
          </div>
          <div class="box left menu-right-icons">
            <img
              class="q-ml-lg q-mt-sm  q-mb-sm image-style"
              src="~assets/DashboardLead.svg"
              style="width:70%"
              @click="selectClaimDialog = true"
            />
            <div class="box all menu-right-icons">
              <p class="text-style">
                CAMERA
              </p>
            </div>
          </div>
        </div>
        <div
          style="box-shadow: 0px 0px 40px 10px  #000000;overflow: visible;width:240px"
          class="q-mx-auto q-mt-xl row justify-center"
        ></div>
      </div>
    </q-card>
    <div class="row justify-between">
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
  margin-right: 10%;
}
.menu-left-icons {
  margin-left: 10%;
}
.box {
  height: calc(20vh);
  width: 150px;
  overflow: hidden;
  border: 1px solid #ccc;
  border-radius: 20px 20px 30px 30px;
}

.left {
  height: calc(20vh);
  width: 150px;
  box-shadow: 5px 0 5px -5px #333;
  background-color: $primary;
}

.all {
  box-shadow: 0 0 100px #e71e1e;
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
}

.image-style {
  height: 13vh;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
