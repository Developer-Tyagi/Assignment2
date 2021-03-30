<template>
  <q-page>
    <!-- Note Dialog -->
    <q-dialog
      v-model="addNoteDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          :dialogName="'Add New Note'"
          @closeDialog="addNoteDialog = false"
        />
        <q-card-section>
          <div class="mobile-container-page-without-search form-height">
            <q-input
              dense
              class="full-width"
              label="Take notes here"
              v-model="note"
            />
          </div>
          <q-btn
            @click="onSave"
            label="Save"
            color="primary"
            class="button-width-90"
            size="'xl'"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
    <div>
      <div class="actions-div">
        <q-separator vertical></q-separator>
        <q-btn @click="addNote" flat class="q-ml-auto"
          ><img src="~assets/add.svg"
        /></q-btn>
      </div>
      <div class="mobile-container-page">
        <div v-if="editSelectedClient.attributes.notes">
          <div
            class="clients-list q-ma-sm"
            v-if="editSelectedClient.attributes.notes.length"
          >
            <div
              class="clients-list"
              v-for="(note, index) in editSelectedClient.attributes.notes"
            >
              <q-item-section>
                <div class="client-list-item">
                  <div class="row">
                    {{
                      editSelectedClient.attributes.notes[index].addedAt
                        | moment('DD/MM/YYYY/, HH:mm')
                    }}
                    <br />
                    {{ editSelectedClient.attributes.notes[index].desc }}<br />

                    <div class="row"></div>
                  </div>
                </div>
              </q-item-section>
            </div>
          </div>
        </div>
        <div v-else class="full-height full-width column">
          <div class="column absolute-center">
            <div style="color: #666666,align-items: center">
              You haven't added a Note yet.
            </div>

            <img
              class="q-mx-lg q-pt-sm"
              src="~assets/add.svg"
              alt="add_icon"
              width="130px"
              height="100px"
              @click="addNote"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import CustomBar from 'components/CustomBar';
import moment from 'moment';

export default {
  name: 'Clients',
  components: { CustomBar },
  data() {
    return {
      addNoteDialog: false,
      note: ''
    };
  },

  computed: {
    ...mapGetters([
      'clients',
      'selectedClientId',
      'editSelectedClient',
      'notes'
    ])
  },
  formatDate(value) {
    if (value) {
      return moment(String(value)).format('MM/DD/YYYY', 'HH:MM');
    }
  },
  created() {
    this.getSingleClientDetails(this.selectedClientId);
  },
  methods: {
    ...mapActions(['getSingleClientDetails', 'addNotes']),
    ...mapMutations(['setSelectedClientId']),

    addNote() {
      this.addNoteDialog = true;
    },
    async onSave() {
      const payload = {
        id: this.selectedClientId,
        notesData: {
          note: this.note
        }
      };
      await this.addNotes(payload);
      this.addNoteDialog = false;
      this.successMessage();
      this.note = '';

      this.getSingleClientDetails(this.selectedClientId);
    },
    successMessage() {
      this.$q.notify({
        type: 'positive',
        message: `Notes Added Successfully!`,
        position: 'center'
      });
    }
  }
};
</script>
<style lang="scss">
.clients-list {
  background-color: #f4f4f4;
  border-bottom: 6px solid white;

  .client-list-item {
    padding: 20px;
    background-color: #f4f4f4;
    text-transform: capitalize;
    p {
      margin: 0 0 6px;
    }
  }
}
.form-height {
  height: calc(100vh - 145px);
  overflow: auto;
  margin: 10px;
}
</style>
