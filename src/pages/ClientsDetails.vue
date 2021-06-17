<template>
  <div>
    <div class="mobile-container-page ">
      <div class="q-pa-xs column ">
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
        <q-list bordered class="q-mt-xs">
          <q-expansion-item
            group="clientGroup"
            label="Client Info"
            header-class="text-primary"
          >
            <q-card-section><ClientInfo /> </q-card-section>
          </q-expansion-item>

          <q-separator></q-separator>
          <q-expansion-item
            group="clientGroup"
            label="Property and Claim"
            header-class="text-primary"
          >
            <q-card-section><PropertyInfo /> </q-card-section>
          </q-expansion-item>
          <!-- <q-expansion-item
            group="clientGroup"
            label="Policy Info"
            header-class="text-primary"
          >
            <q-card>
              <q-card-section>
                <div class="q-mt-md row">
                  <div class="heading-light q-mt-none col-xs-4 lightHeading">
                    Policy Number
                  </div>
                  <div class="column q-ml-md">
                    {{
                      selectedLead.policyNumber
                        ? selectedLead.policyNumber
                        : '-'
                    }}
                  </div>
                </div>
                <div class="q-mt-md row">
                  <div class="heading-light q-mt-none col-xs-4 lightHeading">
                    Carrier Details
                  </div>
                  <div class="column q-ml-md" v-if="selectedLead.carrier">
                    {{
                      selectedLead.carrier.value
                        ? selectedLead.carrier.value
                        : '-'
                    }}
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item> -->

          <q-separator></q-separator>
          <q-expansion-item
            group="clientGroup"
            label="File"
            header-class="text-primary"
          >
            <q-card-section>
              <FileManager
                :directoryId="editSelectedClient.attributes.directoryID"
              />
            </q-card-section>
          </q-expansion-item>

          <!-- <q-expansion-item
            group="clientGroup"
            label="Notes"
            header-class="text-primary"
          >
            <q-card>
              <q-card-section>
                <div class="q-mt-md row">
                  <div class="heading-light q-mt-none col-xs-4 lightHeading">
                    Notes
                  </div>
                  <div class="column q-ml-md" v-if="selectedLead.notes">
                    {{ selectedLead.notes }}
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item> -->

          <q-separator></q-separator>
          <q-expansion-item
            group="clientGroup"
            label="Notes "
            header-class="text-primary"
          >
            <q-card-section>
              <NotesDetails />
            </q-card-section>
          </q-expansion-item>
        </q-list>
        <!-- <div
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
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import CustomBar from 'components/CustomBar';
import ClientInfo from 'src/pages/ClientInfo';
import PropertyInfo from 'src/pages/PropertyInfo';
import NotesDetails from 'src/pages/Notes';
import FileManager from 'components/FileManager';

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

  components: {
    CustomBar,
    ClientInfo,
    PropertyInfo,
    FileManager,
    NotesDetails
  },
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
