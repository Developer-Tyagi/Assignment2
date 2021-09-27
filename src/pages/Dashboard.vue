<template>
  <!-- mobile-container-page listing-height -->

  <div class="" style="background-color: #8f8f8f">
    <div
      class="bg-white q-px-sm cardHeight"
      style="
        border-radius: 0 0 90px 90px;
        box-shadow: 0px 0px 10px 10px #000000;
      "
    >
      <div class="gridRow row justify-between q-px-lg">
        <div
          class="
            col-5
            gridRowContainer
            column
            bg-primary
            q-pt-sm
            justify-between
          "
          style="
            border-top-left-radius: 16px;
            border-top-right-radius: 16px;
            border-bottom-left-radius: 25px;
            border-bottom-right-radius: 25px;
            box-shadow: 0px 3px 5px rgba(0, 0, 0, 1);
          "
        >
          <div class="col-6 self-center q-mb-md">
            <q-icon class="gridIcon">
              <q-img src="~assets/LEADS.svg" @click="$router.push('/leads')" />
            </q-icon>
          </div>

          <div
            class="
              col-4
              column
              justify-end
              text-white text-center text-weight-medium text-subtitle1
              all
            "
          >
            LEADS
          </div>
        </div>
        <div
          class="
            col-5
            gridRowContainer
            column
            bg-primary
            q-pt-sm
            justify-between
          "
          style="
            border-top-left-radius: 16px;
            border-top-right-radius: 16px;
            border-bottom-left-radius: 25px;
            border-bottom-right-radius: 25px;
            box-shadow: 0px 3px 5px rgba(0, 0, 0, 1);
          "
        >
          <div class="col-6 self-center q-mb-md">
            <q-icon class="gridIcon">
              <q-img
                src="~assets/Clients_dashboard.svg"
                @click="$router.push('/clients')"
              />
            </q-icon>
          </div>

          <div
            class="
              col-4
              column
              justify-end
              text-white text-center text-weight-medium text-subtitle1
              all
            "
          >
            CLIENTS
          </div>
        </div>
      </div>
      <div class="gridRow row justify-between q-px-lg">
        <div
          class="
            col-5
            gridRowContainer
            column
            bg-primary
            q-pt-sm
            justify-between
          "
          style="
            border-top-left-radius: 16px;
            border-top-right-radius: 16px;
            border-bottom-left-radius: 25px;
            border-bottom-right-radius: 25px;
            box-shadow: 0px 3px 5px rgba(0, 0, 0, 1);
          "
        >
          <div class="col-6 self-center q-mb-md">
            <q-icon class="gridIcon">
              <q-img
                src="~assets/VENDOR.svg"
                @click="$router.push('/vendors')"
              />
            </q-icon>
          </div>
          <div
            class="
              col-4
              column
              justify-end
              text-white text-center text-weight-medium text-subtitle1
              all
            "
          >
            VENDORS
          </div>
        </div>
        <div
          class="
            col-5
            gridRowContainer
            column
            bg-primary
            q-pt-sm
            justify-between
          "
          style="
            border-top-left-radius: 16px;
            border-top-right-radius: 16px;
            border-bottom-left-radius: 25px;
            border-bottom-right-radius: 25px;
            box-shadow: 0px 3px 5px rgba(0, 0, 0, 1);
          "
        >
          <div class="col-6 self-center q-mb-md">
            <q-icon class="gridIcon">
              <q-img
                src="~assets/CLAIMS.svg"
                @click="$router.push('/claims')"
              />
            </q-icon>
          </div>
          <div
            class="
              col-4
              column
              justify-end
              text-white text-center text-weight-medium text-subtitle1
              all
            "
          >
            CLAIMS
          </div>
        </div>
      </div>
      <div class="gridRow row justify-between q-px-lg">
        <div
          class="
            col-5
            gridRowContainer
            column
            bg-primary
            q-pt-sm
            justify-between
          "
          style="
            border-top-left-radius: 16px;
            border-top-right-radius: 16px;
            border-bottom-left-radius: 25px;
            border-bottom-right-radius: 25px;
            box-shadow: 0px 3px 5px rgba(0, 0, 0, 1);
          "
        >
          <div class="col-6 self-center q-mb-md">
            <q-icon class="gridIcon">
              <q-img
                src="~assets/scan_dashboard.svg"
                @click="selectClaimDialog = true"
              />
            </q-icon>
          </div>
          <div
            class="
              col-4
              column
              justify-end
              text-white text-center text-weight-medium text-caption
              all
            "
          >
            <div class="col">SCAN</div>

            <div class="col text-weight-bolder">UPLOAD</div>
          </div>
        </div>
        <div
          class="
            col-5
            gridRowContainer
            column
            bg-primary
            q-pt-sm
            justify-between
          "
          style="
            border-top-left-radius: 16px;
            border-top-right-radius: 16px;
            border-bottom-left-radius: 25px;
            border-bottom-right-radius: 25px;
            box-shadow: 0px 3px 5px rgba(0, 0, 0, 1);
          "
        >
          <div class="col-5 self-center q-mb-md q-pa-sm">
            <q-icon class="gridIcon">
              <q-img
                src="~assets/camera_dashboard.svg"
                @click="$router.push('/clients')"
              />
            </q-icon>
          </div>
          <div
            class="
              col-4
              column
              justify-end
              text-white text-center text-weight-medium text-subtitle1
              all
            "
          >
            CAMERA
          </div>
        </div>
      </div>
    </div>
    <!-- footer -->
    <div
      class="row justify-between q-py-sm q-px-md"
      style="background-color: #8f8f8f"
    >
      <div col-3 class="column">
        <img
          src="~assets/Profile.svg"
          style="width: 100%"
          @click="$router.push('/edit-profile')"
        />
        <div class="text-center text-white">PROFILE</div>
      </div>
      <div class="column">
        <img src="~assets/SETTINGS.svg" style="width: 100%" />
        <div class="text-center text-white">SETTINGS</div>
      </div>
      <div class="column">
        <img
          class="q-mx-md"
          src="~assets/STATS.svg"
          style="width: 68%"
          @click="$router.push('/claimstats')"
        />
        <div class="text-center text-white">CLAIMS STATS</div>
      </div>
      <div class="column">
        <img
          src="~assets/dashboardAdd.svg"
          style="width: 100%"
          @click="onClickAddUpIcon()"
        />
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
        <div class="clients-list listing-height q-mt-md" v-if="claims.length">
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
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { dateToShow } from '@utils/date';
import AddOptions from 'components/AddOptions';
import CustomBar from 'components/CustomBar';
import { getAuth, generateEmailVerificationLink } from 'firebase/auth';
import 'firebase/auth';
import firebase from 'firebase/app';
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
    this.getTemplates();
    this.getAllTemplate();
  },
  methods: {
    ...mapActions([
      'getClients',
      'getActiveLeadsList',
      'getClaims',
      'getTemplates',
      'getAllTemplate'
    ]),
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
  max-width: 90%;
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
  margin-right: 8%;
}
.menu-left-icons {
  margin-left: 8%;
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

.image-style {
  height: 13vh;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5px;
  margin-bottom: 10px;
}
.scan-text-style {
  text-align: center;
  font-size: 14px;
  margin-top: 15px;
  font-weight: bold;
  margin-left: 10px;
}
.imageStyle {
  height: 85%;
}
.cardHeight {
  height: 69vh;
  padding-top: 14px;
}
.gridRow {
  margin-bottom: 20px;
}
.gridIcon {
  font-size: 4rem;
}
@media only screen and (min-height: 700px) {
  .cardHeight {
    height: 72vh;
    padding-top: 24px;
  }
  .gridRow {
    margin-bottom: 24px;
  }
  .gridIcon {
    font-size: 5rem;
  }
}
@media only screen and (min-height: 800px) {
  .cardHeight {
    height: 75vh;
    padding-top: 45px;
  }
  .gridRow {
    margin-bottom: 45px;
  }
  .gridIcon {
    font-size: 5rem;
  }
}
@media only screen and (min-height: 1000px) {
  .cardHeight {
    height: 80vh;
    padding-top: 65px;
  }
  .gridRow {
    margin-bottom: 65px;
  }
  .gridIcon {
    font-size: 7rem;
  }
  .gridRowContainer {
    height: 180px !important;
  }
}
</style>
