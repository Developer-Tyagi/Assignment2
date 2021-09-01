<template>
  <q-layout view="lhr lpR lfr">
    <CustomHeader @backButton="onBackButtonClick" />
    <q-page-container>
      <router-view />
      <div id="navbar">
        <q-page-sticky
          position="bottom-right"
          :offset="[30, 18]"
          v-if="
            $route.name != 'add new leads' &&
              $route.name != 'Add Claim' &&
              $route.name != 'create client' &&
              $route.name != 'edit  lead' &&
              $route.name != 'vendors' &&
              $route.name != 'configuration  ' &&
              $route.name != 'manage users' &&
              $route.name != 'admin' &&
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
              $route.name != 'dashboard'
          "
        >
          <div class="dot" v-if="checkUserRoleType() == false">
            <q-icon
              class="q-pa-md"
              name="add"
              size="sm"
              color="white"
              @click="onClickAddUpIcon"
            />
          </div>
        </q-page-sticky>
      </div>
      <q-dialog
        v-model="openDialog"
        :maximized="true"
        transition-show="slide-up"
        transition-hide="slide-down"
        :position="'bottom'"
      >
        <q-card class="bg-grey-4 text-red" style="width: 550px; height: 315px">
          <q-card-section>
            <div class="q-mx-md">
              <div class="q-pa-sm" @click="$router.push('/add-lead')">
                <div
                  class="row bg-white"
                  style="border-radius: 10px; height: 40px"
                >
                  <q-icon size="sm" class="q-ml-md q-my-sm">
                    <img src="~assets/add_LEADS.svg" />
                  </q-icon>
                  <p class="text-weight-bolder text-subtitle1 q-my-sm q-pl-lg">
                    Add Leads
                  </p>
                  <q-space />
                  <q-icon class="q-my-sm q-mr-md" size="sm" name="more_vert" />
                </div>
              </div>
              <div class="q-pa-sm" @click="$router.push('/add-client')">
                <div
                  class="row bg-white"
                  style="border-radius: 10px; height: 40px"
                >
                  <q-icon size="sm" class="q-ml-md q-my-sm">
                    <img src="~assets/add_CLIENTS.svg" />
                  </q-icon>
                  <p class="text-weight-bolder text-subtitle1 q-my-sm q-pl-lg">
                    Add Clients
                  </p>
                  <q-space />
                  <q-icon class="q-my-sm q-mr-md" size="sm" name="more_vert" />
                </div>
              </div>
              <div class="q-pa-sm" @click="$router.push('/mortgages/' + true)">
                <div
                  class="row bg-white"
                  style="border-radius: 10px; height: 40px"
                >
                  <q-icon size="sm" class="q-ml-md q-my-sm">
                    <img src="~assets/add_mortgage.svg" />
                  </q-icon>
                  <p class="text-weight-bolder text-subtitle1 q-my-sm q-pl-lg">
                    Add Mortgages
                  </p>
                  <q-space />
                  <q-icon class="q-my-sm q-mr-md" size="sm" name="more_vert" />
                </div>
              </div>
              <div class="q-pa-sm" @click="$router.push('/carriers/' + true)">
                <div
                  class="row bg-white"
                  style="border-radius: 10px; height: 40px"
                >
                  <q-icon size="sm" class="q-ml-md q-my-sm">
                    <img src="~assets/add_carriers.svg" />
                  </q-icon>
                  <p class="text-weight-bolder text-subtitle1 q-my-sm q-pl-lg">
                    Add Carriers
                  </p>
                  <q-space />
                  <q-icon class="q-my-sm q-mr-md" size="sm" name="more_vert" />
                </div>
              </div>
              <div class="q-pa-sm" @click="$router.push('/add-client')">
                <div
                  class="row bg-white"
                  style="border-radius: 10px; height: 40px"
                >
                  <q-icon size="sm" class="q-ml-md q-my-sm">
                    <img src="~assets/add_claims.svg" />
                  </q-icon>
                  <p class="text-weight-bolder text-subtitle1 q-my-sm q-pl-lg">
                    Add Claims
                  </p>
                  <q-space />
                  <q-icon class="q-my-sm q-mr-md" size="sm" name="more_vert" />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>
<script>
import CustomHeader from 'components/CustomHeader';
import { getCurrentUser } from '@utils/auth';
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: 'MainLayout',
  components: { CustomHeader },
  data() {
    return { openDialog: false };
  },
  computed: {
    ...mapGetters(['isEdit'])
  },
  methods: {
    ...mapMutations(['isLastRouteEdit']),

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
      if (
        route == 'leads-dashboard' ||
        route == 'clients' ||
        route == 'vendors' ||
        route == 'admin' ||
        route == 'settings' ||
        route == 'claims' ||
        route == 'mortgage'
      ) {
        this.$router.push('/dashboard');
      } else if (route == 'leads') {
        this.$router.push('/leads-dashboard');
      } else if (route == 'add-lead') {
        this.$router.push('/leads');
      } else if (
        (route == 'claim-summary' && this.userRole == 'estimator') ||
        this.userRole == 'vendor'
      ) {
        this.$router.push('/claims');
      } else if (route == 'claims') {
        this.$store.commit('setClaims');
      } else {
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
.dot {
  height: 55px;
  width: 55px;
  background-color: $primary;
  border-radius: 50%;
  display: inline-block;
}
.card {
  max-width: 100%;
  height: 40px;
  border-radius: 5px;
}
</style>
