<template>
  <q-page>
    <div
      :class="{
        'mobile-container-page-without-search': !$q.platform.is.iphone,
        'mobile-container-page': $q.platform.is.iphone
      }"
    >
      <div class="q-pa-lg column full-height">
        <div
          v-for="dialogBox in dialogBoxes"
          :key="dialogBox.name"
          @click="clientDetailsDailogBoxOpen(dialogBox.name)"
        >
          <div class="form-list row">
            {{ dialogBox.name }}
            <div class="q-mr-lg q-ml-auto" v-if="dialogBox.validForm == true">
              <q-icon size="xs" color="primary" name="done" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import CustomBar from 'components/CustomBar';
export default {
  data() {
    return {
      dialogBoxes: [
        { name: 'Client Info' },
        { name: 'Properties and Claims' },
        { name: 'Documents' },
        { name: 'Notes' }
      ]
    };
  },

  components: { CustomBar },
  computed: {
    ...mapGetters(['editSelectedClient', 'selectedClientId'])
  },
  methods: {
    ...mapActions(['getSingleClientDetails']),

    clientDetailsDailogBoxOpen(value) {
      if (value == 'Client Info') {
        this.$router.push('/client-details');
      }
      if (value == 'Properties and Claims') {
        this.$router.push('/property-details');
      }
    }
  },

  created() {
    this.getSingleClientDetails(this.selectedClientId);
  }
};
</script>
<style>
.form-list {
  color: #333333;
  font-weight: bold;
  font-size: 16px;
  padding: 5px;
  border-bottom: 1px solid #d3d3d3;
  margin-top: 30px;
}
</style>
