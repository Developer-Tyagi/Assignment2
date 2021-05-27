<template>
  <q-page>
    <!-- Note Dialog -->
    <q-dialog
      v-model="addNoteDialog"
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
            <div class="q-py-xs">Notes</div>
            <textarea
              v-model="note"
              rows="4"
              placeholder="Take Notes here..."
              style="width: 100%"
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
    <!-- Edit Note Dialog  -->
    <q-dialog
      v-model="editNoteDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          :dialogName="'Edit Note'"
          @closeDialog="editNoteDialog = false"
        />
        <q-card-section>
          <div class="mobile-container-page-without-search form-height">
            <div class="q-py-xs">Notes</div>
            <textarea
              v-model="editNote"
              rows="4"
              placeholder="Take Notes here..."
              style="width: 100%"
            />
          </div>
          <q-btn
            @click="onEditSave"
            label="Save"
            color="primary"
            class="button-width-90"
            size="'xl'"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
    <div>
      <q-icon @click="addNote" v-if="!addNoteDialog" class="icon-top" flat>
        <img src="~assets/addNote.svg" />
      </q-icon>

      <div class="listing-height">
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
        <div v-if="editSelectedClient.attributes.notes">
          <div
            class="clients-list"
            v-if="editSelectedClient.attributes.notes.length"
          >
            <div
              class="clients-list"
              v-for="(note, index) in editSelectedClient.attributes.notes"
            >
              <q-item-section>
                <div class="client-list-item">
                  <div>
                    <div class="row">
                      <div class="heading-light col-10">
                        {{
                          dateWithTime(
                            editSelectedClient.attributes.notes[index].addedAt
                          )
                        }}
                      </div>

                      <q-icon
                        name="create"
                        color="primary"
                        size="xs"
                        class="q-my-auto col"
                        @click="onEdit(index)"
                      />
                      <q-icon
                        name="delete"
                        size="xs"
                        color="primary"
                        @click="
                          deleteNote(
                            editSelectedClient.attributes.notes[index].id
                          )
                        "
                        class="q-ml-auto"
                      />
                    </div>
                    <div>
                      {{ editSelectedClient.attributes.notes[index].desc }}
                    </div>
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
import { dateWithTime } from '@utils/date';
import { successMessage } from '@utils/validation';
import { constants } from '@utils/constant';

export default {
  name: 'Clients',
  components: { CustomBar },
  data() {
    return {
      addNoteDialog: false,
      note: '',
      editNoteDialog: false,
      editNote: '',
      noteId: ''
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
    ...mapActions([
      'getSingleClientDetails',
      'addNotes',
      'deletedClientNote',
      'editClientNotes'
    ]),
    dateWithTime,
    ...mapMutations(['setSelectedClientId']),

    addNote() {
      this.addNoteDialog = true;
    },
    onEdit(index) {
      this.editNoteDialog = true;
      this.editNote = this.editSelectedClient.attributes.notes[index].desc;
      this.noteId = this.editSelectedClient.attributes.notes[index].id;
    },
    async onEditSave() {
      const payload = {
        clientId: this.selectedClientId,
        noteId: this.noteId,
        data: {
          note: {
            desc: this.editNote
          }
        }
      };
      await this.editClientNotes(payload);
      this.editNoteDialog = false;

      this.editNote = '';

      this.getSingleClientDetails(this.selectedClientId);
    },
    async deleteNote(id) {
      const payload = {
        clientId: this.selectedClientId,
        noteId: id
      };
      await this.deletedClientNote(payload);
      this.getSingleClientDetails(this.selectedClientId);
    },
    async onSave() {
      const payload = {
        id: this.selectedClientId,
        notesData: {
          note: {
            desc: this.note
          }
        }
      };
      await this.addNotes(payload);
      this.addNoteDialog = false;
      this.successMessage(constants.successMessages.NOTES_ADDED);
      this.note = '';

      this.getSingleClientDetails(this.selectedClientId);
    },
    successMessage
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
