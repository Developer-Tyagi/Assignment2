<template>
  <q-layout
    v-if="$route.name != 'admin'"
    :view="!isMobile ? 'lhr lpR lfr' : 'lHh Lpr lFf'"
  >
    <!--this is used because the theming of web and mob is different-->
    <CustomHeader @backButton="onBackButtonClick" />

    <q-page-container
      style="margin: 0 0"
      :style="`${
        $route.name === 'dashboard' ? 'background-color: #8f8f8f;' : ''
      }`"
    >
      <router-view />
      <div id="navbar">
        <q-page-sticky
          position="bottom-right"
          :offset="[30, 18]"
          v-if="
            $route.name != 'add new leads' &&
            $route.name != 'create client' &&
            $route.name != 'edit  lead' &&
            $route.name != 'vendors' &&
            $route.name != 'configuration' &&
            $route.name != 'manage users' &&
            $route.name != 'admin' &&
            $route.name != 'onBoarding' &&
            $route.name != 'reports' &&
            $route.name != 'signup' &&
            $route.name != 'set-password' &&
            $route.name != 'payment' &&
            $route.name != 'loss info' &&
            $route.name != 'Documents' &&
            $route.name != 'properties and claims ' &&
            $route.name != 'notes' &&
            $route.name != 'Company Personnel' &&
            $route.name != 'add new lead' &&
            $route.name != 'lead details' &&
            $route.name != 'Leads' &&
            $route.name != 'claim details' &&
            $route.name != 'dashboard' &&
            $route.name != 'Add Claim' &&
            $route.name != 'offline-claim'
          "
        >
          <q-btn
            unelevated
            round
            color="primary"
            icon="add"
            size="1.2em"
            v-if="checkUserRoleType() == false"
            @click="onClickAddUpIcon"
          />
        </q-page-sticky>
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
      <div class="row" v-if="$route.name == 'onBoarding'">
        <div
          class="col-md-4 sm-hide xs-hide text-footer q-py-38 mt-125"
          style="background-color: #f9e7d8; margin-left: 0px !important"
        >
          <span class="px-32" style="color: #0c0c0c"> © ClaimGuru</span>
          <span class="q-px-sm" style="color: #0c0c0c">{{ CurrentYear }}</span>
        </div>
        <div class="col-md-8 col-lg-9 col-xl-8 bg-white"></div>
      </div>
    </q-page-container>
  </q-layout>
  <q-layout v-else :view="$q.screen.lt.sm ? 'hHh LpR lFf' : 'lHh LpR lFf'">
    <!--this is used because the theming of web and mob is different-->
    <CustomHeader @backButton="onBackButtonClick" />

    <q-page-container
      :style="`${
        $route.name === 'dashboard' ? 'background-color: #8f8f8f;' : ''
      }`"
    >
      <router-view />
      <div id="navbar">
        <q-page-sticky
          position="bottom-right"
          :offset="[30, 18]"
          v-if="
            $route.name != 'add new leads' &&
            $route.name != 'create client' &&
            $route.name != 'edit  lead' &&
            $route.name != 'vendors' &&
            $route.name != 'configuration' &&
            $route.name != 'manage users' &&
            $route.name != 'admin' &&
            $route.name != 'onBoarding' &&
            $route.name != 'reports' &&
            $route.name != 'signup' &&
            $route.name != 'set-password' &&
            $route.name != 'payment' &&
            $route.name != 'loss info' &&
            $route.name != 'Documents' &&
            $route.name != 'properties and claims ' &&
            $route.name != 'notes' &&
            $route.name != 'Company Personnel' &&
            $route.name != 'add new lead' &&
            $route.name != 'lead details' &&
            $route.name != 'Leads' &&
            $route.name != 'claim details' &&
            $route.name != 'dashboard' &&
            $route.name != 'Add Claim' &&
            $route.name != 'offline-claim'
          "
        >
          <q-btn
            unelevated
            round
            color="primary"
            icon="add"
            size="1.2em"
            v-if="checkUserRoleType() == false"
            @click="onClickAddUpIcon"
          />
        </q-page-sticky>
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
      <q-footer class="row" v-show="$route.name == 'onBoarding'">
        <div
          class="col-md-4 col-lg-3 col-xl-4 text-footer px-32 q-pb-sm q-pl-xl"
          style="background-color: #f9e7d8"
        >
          © ClaimGuru<span class="q-px-md">{{ CurrentYear }}</span>
        </div>
        <div class="col-md-8 col-lg-9 col-xl-8 bg-white"></div>
      </q-footer>
    </q-page-container>
  </q-layout>
</template>
<script>
import CustomHeader from 'components/CustomHeader';
import { getCurrentUser } from '@utils/auth';
import { isMobile } from '@utils/common';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import AddOptions from 'components/AddOptions';
export default {
  name: 'MainLayout',
  components: { CustomHeader, AddOptions },
  data() {
    return { openDialog: false };
  },
  computed: {
    ...mapGetters(['isEdit', 'routeFromLeadDashboad']),
    CurrentYear() {
      const d = new Date();
      let year = d.getFullYear();
      return year;
    }
  },
  async mounted() {
    let data = await this.getUserInfo();
    if (
      data.attributes.onboard.isCompleted == false &&
      this.$route.name != 'onBoarding'
    ) {
      this.$router.push('/onBoarding');
    }
  },
  methods: {
    ...mapActions([
      'getActiveLeadsList',
      'getArchivedLeadsList',
      'getUserInfo'
    ]),
    ...mapMutations([
      'isLastRouteEdit',
      'setCameraIcon',
      'leadDashboardRoute',
      'setConvertedLead'
    ]), //'setCameraIcon' is a function which check weather we need to show the camera Icon on Vendor Document Page  or Not , It return True when we redirect from the
    //the camera option  in dashboard page and it is false when we redirect from scan and upload option
    isMobile,
    checkUserRoleType() {
      if (
        getCurrentUser().attributes.roles[0].machineValue == 'estimator' ||
        getCurrentUser().attributes.roles[0].machineValue == 'vendor'
      ) {
        return true;
      } else {
        return false;
      }
    },
    onBackButtonClick() {
      this.userRole = getCurrentUser().attributes.roles[0].machineValue;
      const route = this.$router.currentRoute.fullPath.split('/')[1];
      switch (route) {
        case 'clients':
        case 'vendors':
        case 'admin':
        case 'settings':
        case 'claims':
        case 'mortgages':
        case 'add-client':
        case 'leads-dashboard':
        case 'carriers':
          this.$router.push('/dashboard');
          break;
        case 'leads':
          if (this.routeFromLeadDashboad == 'true') {
            this.$router.push('/leads-dashboard');
            this.leadDashboardRoute('false');
            break;
          } else {
            this.$router.push('/dashboard');
            break;
          }
          break;
        case 'add-lead':
          this.$router.go(-1);
          break;
        case 'lead-details':
          this.$router.push('/leads');
          break;
        case 'mortgage-details':
          this.$router.push('/mortgages');
          break;
        case 'carrier-details':
          this.$router.push('/carriers');
          break;
        case 'view-client':
          this.$router.push('/clients');
          break;
        case ('claim-summary' && this.userRole == 'estimator') ||
          this.userRole == 'vendor':
          this.$router.push('/claims');
          break;
        case 'claims':
          this.$store.commit('setClaims');
          break;
        case 'vendor-document':
          this.setCameraIcon('false'); // the camera icon become Disappeared when we press back button
          this.$router.push('/dashboard');
          break;
        default:
          if (this.isEdit) {
            this.isLastRouteEdit(false);
            this.$router.go(-3);
          } else {
            this.$router.go(-1);
          }
      }
    },
    onClickAddUpIcon() {
      this.openDialog = true;
    }
  }
};
</script>
<style lang="scss">
.icon-width {
  width: 100px;
}
.q-page-container {
  margin: 0 auto !important;
  max-width: 120rem;
}
.q-page-bottom {
  margin: 0 auto !important;
  max-width: 120rem !important;
}
.card {
  max-width: 100%;
  height: 40px;
  border-radius: 5px;
}
::v-deep .q-layout__section--marginal {
  background-color: white;
  border-top: none;
}
.text-footer {
  font-weight: 400;
  color: #667085;
  font-size: 14px;
  // padding-bottom: 28px;
}
.px-32 {
  margin-left: 32px !important;
}
.q-py-38 {
  padding-top: 38px;
  padding-bottom: 38px;
}
.mb-38 {
  margin-bottom: 38px;
}
.ml-1 {
  margin-left: 2px;
}

@media only screen and (width: 1024px) {
  .mt-125 {
    // margin-top: 125px;
  }
}
</style>
