<template>
  <q-page>
    <!--  Edit Note Dialog -->
    <q-dialog
      v-model="editNoteDialogBox"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          :dialogName="'Add New Note'"
          @closeDialog="editNoteDialogBox = false"
        />
        <q-card-section>
          <div class="mobile-container-page-without-search form-height">
            <q-input
              class="full-width"
              label="Take notes here"
              v-model="editNote"
            />
          </div>
          <q-btn
            @click="onEditSaveButtonClick"
            label="Save"
            color="primary"
            class="button-width-90"
            size="'xl'"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Add  Note Dialog -->
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
        <q-separator vertical inset></q-separator>
        <q-btn @click="addNote" flat class="q-ml-auto"
          ><img src="~assets/add.svg"
        /></q-btn>
      </div>

      <div class="mobile-container-page">
        <div v-if="claimNotes.attributes.notes">
          <div
            class="clients-list q-ma-sm "
            v-if="claimNotes.attributes.notes.length"
          >
            <div
              class="clients-list"
              v-for="(note, index) in claimNotes.attributes.notes"
            >
              <q-item-section>
                <div class="client-list-item">
                  <div class="row">
                    {{
                      claimNotes.attributes.notes[index].created
                        | moment('DD/MM/YYY/, HH:mm')
                    }}

                    <br />
                    {{ claimNotes.attributes.notes[index].desc }}

                    <div class="row">
                      <q-icon
                        name="create"
                        color="primary"
                        class="edit-icon"
                        @click="onEditButtonClick"
                      ></q-icon>
                    </div>
                  </div>
                </div>
              </q-item-section>
            </div>
          </div>
        </div>
        <div v-else class="full-height full-width column ">
          <div class=" column absolute-center">
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
import { mapGetters, mapActions } from 'vuex';
import CustomBar from 'components/CustomBar';
import moment from 'moment';
import { successMessage } from '@utils/validation';
import { constants } from '@utils/constant';

export default {
  name: 'Clients',
  components: { CustomBar },
  data() {
    return {
      addNoteDialog: false,
      editNoteDialogBox: false,
      note: '',
      editNote: '',
      noteId: ''
    };
  },

  computed: {
    ...mapGetters(['selectedClaimId', 'claimNotes'])
  },
  formatDate(value) {
    if (value) {
      return moment(String(value)).format('MM/DD/YYYY', 'HH:MM');
    }
  },
  created() {
    this.getClaimNotes(this.selectedClaimId);
    if (!this.selectedClaimId) {
      this.$router.push('/clients');
    }
  },
  methods: {
    ...mapActions(['getClaimNotes', 'addClaimNotes', 'editClaimNotes']),
    onEditButtonClick() {
      this.editNoteDialogBox = true;
      let index = this.claimNotes.attributes.notes.length;
      this.editNote = this.claimNotes.attributes.notes[index - 1].desc;
      this.noteId = this.claimNotes.attributes.notes[index - 1].id;
    },
    addNote() {
      this.addNoteDialog = true;
    },
    async onEditSaveButtonClick() {
      const payload = {
        id: this.selectedClaimId,
        noteId: this.noteId,
        notesData: {
          notes: {
            title: this.editNote,
            desc: this.editNote
          }
        }
      };
      await this.editClaimNotes(payload);
      this.editNoteDialogBox = false;
      this.successMessage(constants.successMessages.NOTES_UPDATED);
      this.editNote = '';

      this.getClaimNotes(this.selectedClaimId);
    },
    async onSave() {
      const payload = {
        id: this.selectedClaimId,
        notesData: {
          notes: {
            title: this.note,
            desc: this.note
          }
        }
      };
      await this.addClaimNotes(payload);
      this.addNoteDialog = false;
      this.successMessage(constants.successMessages.NOTES_ADDED);
      this.note = '';

      this.getClaimNotes(this.selectedClaimId);
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
.edit-icon {
  position: absolute;
  right: 20px;
  font-size: 20px;
}
</style>
