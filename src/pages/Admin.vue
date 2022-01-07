<template>
  <q-page>
    <div class="row q-px-xl">
      <div class="col">
        <div class="row" flat bordered>
          <!-- Main Template -->
          <q-tab-panels
            class="
              q-ml-xl
              full-height
              mobile-container-page-without-search
              full-width
            "
            v-model="webSubOptionMenuTab.key"
          >
            <q-tab-panel name="accountSummary">
              <AccountSummary> </AccountSummary>
            </q-tab-panel>
            <q-tab-panel name="groupPermission" class="q-pa-lg">
              <GroupPermission />
            </q-tab-panel>
            <q-tab-panel name="actionItems">
              <Automation />
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import AccountSummary from 'pages/admin/AccountSummary.vue';
import GroupPermission from 'pages/admin/GroupPermission.vue';
import Automation from 'pages/admin/Automation.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Admin',
  components: { AccountSummary, GroupPermission, Automation },

  computed: {
    ...mapGetters(['webSubOptionMenuTab'])
  }
};
</script>
