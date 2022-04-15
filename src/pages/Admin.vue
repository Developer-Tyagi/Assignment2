<template>
  <q-page>
    <div class="flex-row">
      <div class="full-width">
        <div class="row" flat bordered>
          <!-- Main Template -->
          <q-tab-panels
            class="q-ml-xl full-height mobile-container-page-without-search full-width"
            v-model="webSubOptionMenuTab.key"
          >
            <q-tab-panel
              :class="isMobileResolution ? 'q-px-15' : 'q-px-32'"
              name="accountSummary"
            >
              <AccountSummary> </AccountSummary>
            </q-tab-panel>
            <q-tab-panel name="groupPermission" class="q-pa-lg">
              <GroupPermission />
            </q-tab-panel>
            <q-tab-panel name="actionItems">
              <Automation />
            </q-tab-panel>
            <q-tab-panel name="manage-users">
              <ManageUsers />
            </q-tab-panel>
            <q-tab-panel name="reports">
              <Reports />
            </q-tab-panel>
            <q-tab-panel name="global-data-management">
              <Configurations />
            </q-tab-panel>
            <q-tab-panel name="billing">
              <Billing />
            </q-tab-panel>
          </q-tab-panels>
          <Footer class="q-mt-lg" />
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import AccountSummary from 'pages/admin/AccountSummary.vue';
import GroupPermission from 'pages/admin/GroupPermission.vue';
import Automation from 'pages/admin/Automation.vue';
import ManageUsers from 'pages/ManageUsersNew.vue';
import Configurations from 'pages/Configuration.vue';
import Billing from 'pages/Billing.vue';
import Reports from 'pages/Reports.vue';
import Footer from 'components/Footer';

import { mapGetters } from 'vuex';

export default {
  name: 'Admin',
  components: {
    AccountSummary,
    GroupPermission,
    Automation,
    ManageUsers,
    Configurations,
    Reports,
    Billing,
    Footer
  },

  computed: {
    ...mapGetters(['webSubOptionMenuTab', 'isMobileResolution'])
  }
};
</script>
