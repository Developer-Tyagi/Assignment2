<template>
  <div>
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
          <div>
            <div class="q-py-xs">Notes<small style="color: red">*</small></div>
            <q-input
              type="textarea"
              borderless
              class="input-style"
              v-model="note"
              rows="4"
              placeholder="Take Notes here..."
              style="width: 100%"
            />
          </div>
          <div class="row q-mt-xl justify-center">
            <q-btn
              @click="onSave"
              label="Save"
              class="single-next-button-style"
            />
          </div>
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
            <q-input
              type="textarea"
              class="input-style"
              borderless
              v-model="editNote"
              rows="4"
              placeholder="Take Notes here..."
              style="width: 100%"
            />
          </div>
          <div class="row justify-center">
            <q-btn
              @click="onEditSave"
              label="Save"
              class="single-next-button-style"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <div>
      <div>
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
                        @click="onDeleteClick(index)"
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
        <div v-else class="full-width text-center">
          <div class="q-mt-xs">
            <div style="color: #666666">You haven't added a Note yet.</div>
            <div class="text-center">
              <img
                src="~assets/add.svg"
                width="30px"
                height="30px"
                @click="addNote"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <q-btn
            v-if="editSelectedClient.attributes.notes"
            @click="addNote"
            color="primary"
            label="Add Note"
            class="q-ml-auto"
          ></q-btn>
        </div>
      </div>
    </div>

    <q-dialog v-model="deleteAlertDialog">
      <q-card>
        <DeleteAlert
          @close="deleteAlertDialog = false"
          @onDelete="deleteNote"
        />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import CustomBar from 'components/CustomBar';
import DeleteAlert from 'components/DeleteAlert';
import moment from 'moment';
import { dateWithTime } from '@utils/date';
import { constants } from '@utils/constant';

export default {
  name: 'NotesDetails',
  components: { CustomBar, DeleteAlert },
  data() {
    return {
      valueIndex: '',
      deleteAlertDialog: false,
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
    onDeleteClick(index) {
      this.deleteAlertDialog = true;
      this.valueIndex = index;
    },
    onEdit(index) {
      this.editNoteDialog = true;
      this.editNote = this.editSelectedClient.attributes.notes[index].desc
        ? this.editSelectedClient.attributes.notes[index].desc
        : '';
      this.noteId = this.editSelectedClient.attributes.notes[index].id
        ? this.editSelectedClient.attributes.notes[index].id
        : '';
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
    async deleteNote() {
      const payload = {
        clientId: this.selectedClientId,
        noteId: this.editSelectedClient.attributes.notes[this.valueIndex].id
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
      this.note = '';

      this.getSingleClientDetails(this.selectedClientId);
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
