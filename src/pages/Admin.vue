<template>
  <q-page>
    <div class="row height-without-header">
      <SubSideBar
        class="col-2"
        :list="adminSettings"
        @onListClick="setSelectedTab"
        :selectedItem="tab"
      />
      <div></div>
    </div>
  </q-page>
</template>
<script>
import SubSideBar from 'components/SubSideBar';
export default {
  name: 'Admin',
  components: { SubSideBar },
  data() {
    return {
      tab: '',
      adminSettings: [{ name: 'Account Summary', key: 'accountSummary' }]
    };
  },

  method: {
    setSelectedTab() {
      console.log('hi');
    }
  },

  created() {
    this.tab = 'accountSummary';
  }
};
</script>
