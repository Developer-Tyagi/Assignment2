<template>
  <q-page>
    <div
      :class="{
        'mobile-container-page-without-search': !$q.platform.is.iphone,
        'mobile-container-page': $q.platform.is.iphone
      }"
    >
      <div class="q-pa-xs column full-height">
        <div class="q-ml-md q-mt-md text-h6">
          {{
            editSelectedClient.attributes.insuredInfo.primary.fname
              ? editSelectedClient.attributes.insuredInfo.primary.fname
              : '-'
          }}
          {{
            editSelectedClient.attributes.insuredInfo.primary.lname
              ? editSelectedClient.attributes.insuredInfo.primary.lname
              : '-'
          }}
        </div>
        <div class="row q-ml-md q-my-md heading-light">
          <div>
            {{
              editSelectedClient.attributes.meta
                ? editSelectedClient.attributes.meta.totalClaims
                : 0
            }}
            - Total Claims
          </div>
          <div class="q-ml-xl">
            {{
              editSelectedClient.attributes.meta
                ? editSelectedClient.attributes.meta.openClaims
                : 0
            }}
            - Open Claim
          </div>
        </div>
        <div
          class=""
          v-for="dialogBox in dialogBoxes"
          :key="dialogBox.name"
          @click="clientDetailsDailogBoxOpen(dialogBox.name)"
        >
          <div class="full-width">
            <q-card class="q-ma-sm q-pa-md"> {{ dialogBox.name }} </q-card>

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
      } else if (value == 'Documents') {
        this.$router.push(
          `/client-documents/${this.editSelectedClient.attributes.directoryID}`
        );
      }
      if (value == 'Properties and Claims') {
        this.$router.push('/property-details');
      }
      if (value == 'Notes') {
        this.$router.push('/note-details');
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
