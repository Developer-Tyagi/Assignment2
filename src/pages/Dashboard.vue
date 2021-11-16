<template>
  <!-- mobile-container-page listing-height -->

  <div style="background-color: #8f8f8f">
    <div
      class="
        column
        bg-white
        dashboard-shadow
        q-px-sm q-pt-sm
        justify-between
        cardHeight
        q-pb-lg
      "
      style="border-radius: 0 0 40px 40px; margin-top: -30px;"
    >
      <div class="row col-4 justify-around">
        <div
          class="column col iconBackground items-center"
          @click="onClickNewLead"
          style=""
        >
          <q-icon class="col self-center gridIcon">
            <q-img src="~assets/LEADS.svg" />
          </q-icon>

          <div
            class="
              column
              justify-end
              text-white text-center text-weight-medium text-subtitle1
              IconText
            "
          >
            LEADS
          </div>
        </div>

        <div
          class="column col iconBackground items-center"
          @click="$router.push('/clients')"
        >
          <q-icon class="col self-center gridIcon">
            <q-img src="~assets/Clients_dashboard.svg" />
          </q-icon>

          <div
            class="
              column
              justify-end
              text-white text-center text-weight-medium text-subtitle1
              IconText
            "
          >
            CLIENTS
          </div>
        </div>
      </div>
      <div class="row col-4 justify-around">
        <div
          class="column col iconBackground items-center"
          @click="$router.push('/vendors')"
        >
          <q-icon class="col self-center gridIcon">
            <q-img src="~assets/VENDOR.svg" />
          </q-icon>

          <div
            class="
              column
              justify-end
              text-white text-center text-weight-medium text-subtitle1
              IconText
            "
          >
            VENDORS
          </div>
        </div>

        <div
          class="column col iconBackground items-center"
          @click="$router.push('/claims')"
        >
          <q-icon class="col self-center gridIcon">
            <q-img src="~assets/CLAIMS.svg" />
          </q-icon>

          <div
            class="
              column
              justify-end
              text-white text-center text-weight-medium text-subtitle1
              IconText
            "
          >
            CLAIMS
          </div>
        </div>
      </div>
      <div class="row col-4 justify-around">
        <div
          class="column col iconBackground items-center"
          @click="selectClaimDialog = true"
        >
          <q-icon class="col self-center gridIcon">
            <q-img src="~assets/scan_dashboard.svg" />
          </q-icon>

          <div
            class="
              column
              justify-end
              text-white text-center text-weight-medium text-subtitle1
              scanIconText
            "
          >
            <div class="col scanText">SCAN</div>

            <div class="col text-weight-bolder">UPLOAD</div>
          </div>
        </div>

        <div
          class="column col iconBackground items-center"
          @click="toCameraDialogBox()"
        >
          <q-icon class="col self-center mobileIcon">
            <q-img src="~assets/camera_dashboard.svg" />
          </q-icon>

          <div
            class="
              column
              justify-end
              text-white text-center text-weight-medium text-subtitle1
              IconText
            "
          >
            CAMERA
          </div>
        </div>
      </div>
    </div>
    <!-- footer -->
    <!-- <div class="row justify-center footer-shadow"></div> -->
    <div class="text-center">
      <img
        src="~assets/header_shadow.png"
        class="relative-position"
        style="width: 90%; height: 50px; margin-top: -22px"
      />
    </div>
    <div
      class="row justify-between q-px-md q-pt-xs"
      style="background-color: #8f8f8f; margin-top: -30px;"
    >
      <div class="col-3 column">
        <img
          class="col"
          src="~assets/Profile.svg"
          height=" 50px"
          @click="$router.push('/edit-profile')"
        />
        <div class="col text-center text-white text-caption">PROFILE</div>
      </div>
      <div @click="$router.push('/reports')" class="col-3 column ">
        <img class="col" src="~assets/report_dashboard_icon.svg" />

        <div class="col text-center text-white text-caption">REPORTS</div>
      </div>
      <div class="col-3 column">
        <img
          class="col "
          src="~assets/STATS.svg"
          @click="$router.push('/claimstats')"
        />
        <div class="col text-center  text-white text-caption">CLAIMS STATS</div>
      </div>
      <div class="col-3 column">
        <img
          class="col"
          src="~assets/dashboardAdd.svg"
          @click="onClickAddUpIcon()"
        />
        <div class="col text-center text-white text-caption">ADD</div>
      </div>
    </div>

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
        <div
          class="mobile-container-page-without-search q-pt-sm q-mt-xs"
          v-if="claims.length"
        >
          <div>
            <div class="clients-list" v-for="claim in claims" :key="claim.id">
              <div class="client-list-item">
                <div class="row form-heading q-pb-md">
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
    <!-- dialog box for add button-->
    <q-dialog
      v-model="openDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
      :position="'bottom'"
    >
      <AddOptions />
    </q-dialog>
    <q-dialog v-model="cameraDialogBox">
      <q-card class="no-margin col-12" style="width: 100%">
        <q-card-section>
          <div class="row justify-center">
            <div
              class="q-mr-lg column items-center"
              @click="toRedirectTOPhotoIdApp()"
            >
              <!-- PhotoId App Icon used here-->
              <q-icon size="xl">
                <q-img src="../assets/photoIdApp.png" color="primary" />
              </q-icon>
              <div class="text-black">Photo ID App</div>
            </div>
            <div
              @click="toOpenCameraClaimListing"
              class="q-ml-lg column items-center"
            >
              <q-icon name="photo_camera" size="xl"></q-icon>
              <div class="text-balck">Camera</div>
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none"> </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { dateToShow } from '@utils/date';
import CustomBar from 'components/CustomBar';
import 'firebase/auth';
import AddOptions from 'components/AddOptions';
import { Device } from '@capacitor/core';
import { getCurrentUser } from '@utils/auth';
export default {
  components: { CustomBar, AddOptions },
  data() {
    return {
      selectClaimDialog: false,
      isClickable: false,
      openDialog: false,
      cameraDialogBox: false,
      params: {
        favourite: '',
        hideLoader: false
      },
      searchText: '',
      estimatorParams: {
        role: 'estimator',
        hideLoader: false
      }
    };
  },
  created() {
    // if user login first time  we are calling all the APIs so that we can save data in Local Database which we are needed while creating client,lead and claim

    this.getClientTypes('hideLoader');
    this.getContactTypes('hideLoader');
    this.getTitles('hideLoader');
    this.getLossCauses('hideLoader');
    this.getInspectionTypes('hideLoader');
    this.getVendorIndustries('hideLoader');
    //estimator  have no permission to these APIs
    const userRole = getCurrentUser().attributes.roles[0].machineValue;
    console.log(userRole, 'userRole');
    if (userRole != 'estimator') {
      this.getVendors('hideLoader');
      this.getMortgages('hideLoader');
      let params = {
        limit: 0,
        offset: 0
      };
      this.getCarriers(params);
    }

    this.getPropertyTypes('hideLoader');
    this.getPolicyTypes('hideLoader');
    this.getPolicyCategory('hideLoader');
    this.getClaimReasons('hideLoader');
    this.getSeverityClaim('hideLoader');
    this.getClaimRoles('hideLoader');
    this.getAllUsers('hideLoader');
    this.getPaidUsers('hideLoader');

    this.getOfficeTaskActions('hideLoader');
    this.getRoles('hideLoader');
    this.getEstimators(this.estimatorParams);

    //this API is for offline clients
    const payload = {
      status: '',
      name: ''
    };
    this.getClients(payload);
    this.getClaims();
    this.getTemplates();
    this.getAllTemplate();
  },
  methods: {
    ...mapActions([
      'getRoles',
      'getOfficeTaskActions',
      'getEstimators',
      'getMortgages',
      'getPropertyTypes',
      'getClientTypes',
      'getPaidUsers',
      'getClaimRoles',
      'getAllUsers',
      'getClaimReasons',
      'getSeverityClaim',
      'getPolicyTypes',
      'getPolicyCategory',
      'getInspectionTypes',
      'getVendorIndustries',
      'getVendors',
      'getContactTypes',
      'getTitles',
      'getLossCauses',
      'getClients',
      'getActiveLeadsList',
      'getClaims',
      'getArchivedLeadsList',
      'getTemplates',
      'getAllTemplate',
      'getCarriers'
    ]),
    // this function is use for the opening and closing of dialog box that show photoId App and Camera option feature.
    toCameraDialogBox() {
      this.cameraDialogBox = !this.cameraDialogBox;
    },
    toOpenCameraClaimListing() {
      this.selectClaimDialog = true;
      this.setCameraIcon('true');
    },
    onClickAddUpIcon() {
      this.openDialog = true;
    },
    ...mapMutations([
      'setSelectedClaimId',
      'setConvertedLead',
      'setCameraIcon'
    ]),
    //this function is used to redirect to the photoID App .
    async toRedirectTOPhotoIdApp() {
      const info = await Device.getInfo();

      const devicePlatform = info.operatingSystem;

      // routing to different locations based on the devices
      if (devicePlatform == 'android') {
        window.location =
          'https://play.google.com/store/apps/details?id=com.uscope.photoid&hl=en_IN&gl=US';
      } else if (devicePlatform == 'web') {
        window.location = 'https://photoidapp.net/';
      } else {
        window.location =
          'https://apps.apple.com/us/app/photo-id/id1277608552?ls=1';
      }
    },

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
.footer-shadow {
  border: 0.1em solid #000000;
  width: 60%;
  margin-left: 20%;
  box-shadow: 0 -4px 6px 0.02em #000000, 0 -5px 7px 0.02em #000000;
}
.text {
  text-align: center;
  margin: 5px auto 0 auto;
  line-height: 10px;
  max-width: 90%;
  color: white;
  font-weight: bold;
}

.box {
  height: calc(20vh);
  width: 150px;
  overflow: hidden;
  border: 1px solid #ccc;
  border-radius: 20px 20px 30px 30px;
}

.left {
  height: calc(22vh);
  width: 160px;
  box-shadow: 5px 0 5px -5px #333;
  background-color: $primary;
}

.all {
  background-color: black;
  clip-path: ellipse(40% 100% at 50% 100%);
}
.text-style {
  text-align: center;
  font-size: 18px;
  margin-top: 25px;
  font-weight: bold;
}

.iconBackground {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url('~assets/dashboard_tile.png');
}
.cardHeight {
  height: 69vh;
}
.gridRow {
  margin-bottom: 20px;
}
.gridIcon {
  font-size: 5rem;
}
.mobileIcon {
  font-size: 3rem;
}
.IconText {
  margin-bottom: 20px;
}
.scanIconText {
  margin-bottom: 10px;
}
.scanText {
  margin-bottom: -10px;
}

@media only screen and (min-height: 700px) {
  .cardHeight {
    height: 74.2vh;
  }
  .gridRow {
    margin-bottom: 24px;
  }
  .gridIcon {
    font-size: 5rem;
  }
  .mobileIcon {
    font-size: 4rem;
  }
  .scanIconText {
    margin-bottom: 15px;
  }
}
@media only screen and (min-height: 800px) {
  .cardHeight {
    height: 75vh;
  }
  .gridRow {
    margin-bottom: 45px;
  }
  .gridIcon {
    font-size: 6rem;
  }
  .mobileIcon {
    font-size: 5rem;
  }
  .IconText {
    margin-bottom: 30px;
  }
  .scanIconText {
    margin-bottom: 25px;
  }
}
@media only screen and (min-height: 1000px) {
  .cardHeight {
    height: 80vh;
  }
  .gridRow {
    margin-bottom: 65px;
  }
  .gridIcon {
    font-size: 8rem;
    margin-bottom: 10px;
  }
  .mobileIcon {
    font-size: 6rem;
    margin-bottom: 20px;
  }

  .gridRowContainer {
    height: 180px !important;
  }
  .IconText {
    margin-bottom: 40px;
    font-size: 25px;
  }
  .scanIconText {
    margin-bottom: 35px;
    font-size: 25px;
  }
  .scanText {
    margin-bottom: 0;
  }
}
@media only screen and (min-height: 1300px) {
  .cardHeight {
    height: 85vh;
  }
  .gridRow {
    margin-bottom: 65px;
  }
  .gridIcon {
    font-size: 12rem;
    margin-bottom: 20px;
  }
  .mobileIcon {
    font-size: 8rem;
    margin-bottom: 20px;
  }

  .gridRowContainer {
    height: 180px !important;
  }
  .IconText {
    margin-bottom: 60px;
    font-size: 35px;
  }
  .scanIconText {
    margin-bottom: 50px;
    font-size: 35px;
  }
  .scanText {
    margin-bottom: 10px;
  }
}
</style>
