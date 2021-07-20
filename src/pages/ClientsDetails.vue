<template>
  <div>
    <div class="mobile-container-page">
      <div class="q-pa-xs column">
        <div class="q-ml-md q-mt-md form-heading">
          {{
            editSelectedClient.attributes
              ? editSelectedClient.attributes.insuredInfo.primary.fname
                ? editSelectedClient.attributes.insuredInfo.primary.fname
                : '-'
              : '-'
          }}
          {{
            editSelectedClient.attributes
              ? editSelectedClient.attributes.insuredInfo.primary.lname
                ? editSelectedClient.attributes.insuredInfo.primary.lname
                : '-'
              : '-'
          }}
        </div>
        <div class="row q-ml-md q-my-md heading-light">
          <div>
            {{
              editSelectedClient.attributes
                ? editSelectedClient.attributes.meta
                  ? editSelectedClient.attributes.meta.totalClaims
                  : 0
                : '-'
            }}
            - Total Claims
          </div>
          <div class="q-ml-xl">
            {{
              editSelectedClient.attributes
                ? editSelectedClient.attributes.meta
                  ? editSelectedClient.attributes.meta.openClaims
                  : 0
                : '-'
            }}
            - Open Claim
          </div>
        </div>
        <q-list bordered class="q-mt-xs">
          <q-expansion-item
            group="clientGroup"
            label="Client Info"
            header-class="text-primary"
            @show="clientInfo = true"
          >
            <q-card-section v-if="clientInfo"><ClientInfo /> </q-card-section>
          </q-expansion-item>

          <q-separator></q-separator>
          <q-expansion-item
            group="clientGroup"
            label="Property and Claim"
            header-class="text-primary"
            @show="propertyAndClaim = true"
          >
            <q-card-section v-if="propertyAndClaim"
              ><PropertyInfo />
            </q-card-section>
          </q-expansion-item>

          <q-separator></q-separator>
          <q-expansion-item
            group="clientGroup"
            label="File"
            header-class="text-primary"
            @show="file = true"
          >
            <q-card-section v-if="file">
              <ClientDocument />
            </q-card-section>
          </q-expansion-item>

          <q-separator></q-separator>
          <q-expansion-item
            group="clientGroup"
            label="Notes "
            header-class="text-primary"
            @show="notes = true"
          >
            <q-card-section v-if="notes">
              <NotesDetails />
            </q-card-section>
          </q-expansion-item>
        </q-list>
      </div>
    </div>
  </div>
</template>
<script>
import CustomBar from 'components/CustomBar';
import ClientInfo from 'src/pages/ClientInfo';
import PropertyInfo from 'src/pages/PropertyInfo';
import NotesDetails from 'src/pages/Notes';
import ClientDocument from 'src/pages/ClientDocuments';
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  data() {
    return {
      clientInfo: false,
      propertyAndClaim: false,
      file: false,
      notes: false
    };
  },

  components: {
    CustomBar,
    ClientInfo,
    PropertyInfo,
    ClientDocument,
    NotesDetails
  },
  computed: {
    ...mapGetters(['editSelectedClient', 'selectedClientId'])
  },
  methods: {
    ...mapActions(['getSingleClientDetails']),
    ...mapMutations(['setSelectedClientId'])
  },

  created() {
    this.setSelectedClientId(this.$route.params.id);
    this.getSingleClientDetails(this.$route.params.id);
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
