<template>
  <q-layout :view="!isMobile ? 'lhr lpR lfr' : 'lHh Lpr lFf'">
    <!--this is used because the theming of web and mob is different-->
    <CustomHeader @backButton="onBackButtonClick" />

    <q-page-container
      :style="
        `${$route.name === 'dashboard' ? 'background-color: #8f8f8f;' : ''}`
      "
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
              $route.name != 'setup' &&
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
    </q-page-container>
    <q-footer class="row" v-if="!isMobile() && $route.name == 'setup'">
      <div
        class="col-3 text-black text-subtitle1 q-pb-sm q-pl-xl"
        style="background-color: #f9e7d8"
      >
        © ClaimGuru 2022
      </div>
      <div class="col bg-white"></div>
    </q-footer>
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
    ...mapGetters(['isEdit', 'routeFromLeadDashboad'])
  },
  methods: {
    ...mapActions(['getActiveLeadsList', 'getArchivedLeadsList']),
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

.card {
  max-width: 100%;
  height: 40px;
  border-radius: 5px;
}
</style>
