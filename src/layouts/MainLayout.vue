<template>
  <q-layout view="lhr lpR lfr">
    <CustomHeader @backButton="onBackButtonClick" />
    <q-page-container>
      <router-view />
      <q-page-sticky
        position="bottom-right"
        :offset="[30, 18]"
        v-if="
          $route.name != 'add new leads' &&
            $route.name != 'Add Claim' &&
            $route.name != 'create client' &&
            $route.name != 'edit  lead' &&
            $route.name != 'vendors'
        "
      >
        <div class="dot ">
          <q-icon
            class="q-pa-md"
            name="add"
            size="sm"
            color="white"
            @click="onClickAddUpIcon"
          />
        </div>
      </q-page-sticky>
      <q-dialog
        v-model="openDialog"
        :maximized="true"
        transition-show="slide-up"
        transition-hide="slide-down"
        :position="'bottom'"
      >
        <q-card style="width: 550px; height: 200px">
          <q-card-section class=" text-center  ">
            <div class="text-bold">
              <!-- Add Directly -->

              <q-icon
                name="expand_more"
                size="lg"
                @click="openDialog = false"
              />
            </div>
            <div class="row justify-between q-mt-md">
              <q-card
                class="bg-grey-3 q-pa-sm"
                @click="$router.push('/add-client')"
                >Add Client</q-card
              >
              <q-card
                class="bg-grey-3 q-pa-sm"
                @click="$router.push('/add-client')"
                >Add Claim</q-card
              >
              <q-card class="bg-grey-3 q-pa-sm" @click="$router.push('/leads')"
                >Add Lead</q-card
              >
            </div>
            <div class="row justify-between q-mt-lg">
              <q-card
                class="bg-grey-3 q-pa-sm"
                @click="$router.push('/mortgages')"
                >Add mortgage</q-card
              >
              <q-card
                class="bg-grey-3 q-pa-sm"
                @click="$router.push('/carriers')"
                >Add Carrier</q-card
              >
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
export default {
  name: 'MainLayout',
  components: { CustomHeader },
  data() {
    return { openDialog: false };
  },
  methods: {
    onBackButtonClick() {
      this.userRole = getCurrentUser().attributes.roles[0].machineValue;
      const route = this.$router.currentRoute.fullPath.substring(1);
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
      } else if (route == 'claim-summary' && this.userRole == 'estimator') {
        this.$router.push('/claims');
      } else {
        this.$router.go(-1);
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
</style>
