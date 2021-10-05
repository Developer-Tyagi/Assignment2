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
        <AddOptions />
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>
<script>
import CustomHeader from 'components/CustomHeader';
import { getCurrentUser } from '@utils/auth';
import { mapGetters, mapMutations } from 'vuex';
import AddOptions from 'components/AddOptions';
export default {
  name: 'MainLayout',
  components: { CustomHeader, AddOptions },
  data() {
    return { openDialog: false };
  },
  computed: {
    ...mapGetters(['isEdit'])
  },
  methods: {
    ...mapMutations(['isLastRouteEdit', 'setCameraIcon']), //'setCameraIcon' is a function which check weather we need to show the camera Icon on Vendor Document Page  or Not , It return True when we redirect from the
    //the camera option  in dashboard page and it is false when we redirect from scan and upload option

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
        route == 'clients' ||
        route == 'vendors' ||
        route == 'admin' ||
        route == 'settings' ||
        route == 'claims' ||
        route == 'mortgage'
      ) {
        this.$router.push('/dashboard');
      } else if (route == 'leads') {
        this.$router.go(-1);
      } else if (route == 'add-lead') {
        this.$router.go(-1);
      } else if (
        (route == 'claim-summary' && this.userRole == 'estimator') ||
        this.userRole == 'vendor'
      ) {
        this.$router.push('/claims');
      } else if (route == 'claims') {
        this.$store.commit('setClaims');
      } else if (route == 'vendor-document') {
        this.setCameraIcon(''); //here we pass blank value means to hide camera option in vendorDocument page.
        this.$router.push('/dashboard');
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
