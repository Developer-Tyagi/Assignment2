<template>
  <div>
    <!--  Edit Note Dialog -->
    <q-dialog
      v-model="editNoteDialogBox"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          :dialogName="'Edit Note'"
          @closeDialog="
            (editNoteDialogBox = false), $emit('claimNoteDailog', false)
          "
        />
        <q-card-section>
          <div class="mobile-container-page-without-search form-height">
            <div class="q-py-xs">Notes</div>
            <textarea class="full-width" v-model="editNote" />
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
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          :dialogName="'Add New Note'"
          @closeDialog="
            (addNoteDialog = false), $emit('claimNoteDailog', false)
          "
        />
        <q-card-section>
          <div class="mobile-container-page">
            <div class="q-py-xs">Notes</div>
            <textarea
              rows="4"
              placeholder="Take Notes here..."
              style="width: 100%; border-radius: 8px"
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
    <!-- Alert delete Box -->
    <q-dialog v-model="alert">
      <q-card>
        <DeleteAlert />

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            v-close-popup
            @click="alert = false"
          ></q-btn>
          <q-btn
            flat
            label="Delete"
            color="primary"
            v-close-popup
            @click="onclickDelete(indexValue)"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div>
      <div v-if="claimNotes.attributes.notes">
        <q-card class="q-pa-md" v-if="claimNotes.attributes.notes.length">
          <div v-for="(note, index) in claimNotes.attributes.notes">
            <q-item-section>
              <div>
                <div class="row">
                  <div class="heading-light col-10">
                    {{
                      dateWithTime(claimNotes.attributes.notes[index].created)
                    }}
                  </div>

                  <q-icon
                    name="create"
                    color="primary"
                    size="xs"
                    class="q-my-auto col"
                    @click="onEditButtonClick(index)"
                  />
                  <q-icon
                    name="delete"
                    size="xs"
                    color="primary"
                    class="q-ml-auto"
                    @click="deleteThisNote(index)"
                  />
                </div>
                {{ claimNotes.attributes.notes[index].desc }}
              </div>
            </q-item-section>
          </div>
        </q-card>
      </div>
      <div v-else class="full-width text-center">
        <div class="q-mt-xs">
          <div style="color: #666666">
            You haven't added a Note yet.
          </div>
          <div class="text-center">
            <img
              src="~assets/add.svg"
              width="30px"
              height="30px"
              @click="addNote"
            />
          </div>
          <!-- <div class=" q-mb-xl">
            <img
              class="q-mx-xs q-pt-xs"
              src="~assets/add.svg"
              width="30px"
              height="30px"
              @click="addNote"
            />
          </div> -->
        </div>
      </div>
      <div class="row" v-if="claimNotes.attributes.notes">
        <q-btn
          @click="addNote"
          color="primary"
          label="Add Note"
          class="q-ml-auto q-mt-sm "
        ></q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CustomBar from 'components/CustomBar';
import moment from 'moment';
import { dateWithTime } from '@utils/date';
import { successMessage } from '@utils/validation';
import { constants } from '@utils/constant';
import ClaimDetail from 'components/ClaimDetail';
import DeleteAlert from 'components/DeleteAlert';
export default {
  name: 'ClaimNotes',
  components: { CustomBar, ClaimDetail, DeleteAlert },
  data() {
    return {
      indexValue: null,
      alert: false,
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
    ...mapActions([
      'getClaimNotes',
      'addClaimNotes',
      'editClaimNotes',
      'deleteClaimNotes'
    ]),
    dateWithTime,
    deleteThisNote(index) {
      this.alert = true;
      this.indexValue = index;
    },

    onEditButtonClick(index) {
      this.noteId = this.claimNotes.attributes.notes[index].id;
      this.editNoteDialogBox = true;
      this.$emit('claimNoteDailog', true);
      this.editNote = this.claimNotes.attributes.notes[index].desc;
    },
    async onclickDelete(index) {
      const payload = {
        id: this.selectedClaimId,
        noteId: this.claimNotes.attributes.notes[index].id
      };
      await this.deleteClaimNotes(payload);

      await this.getClaimNotes(this.selectedClaimId);
    },
    addNote() {
      this.addNoteDialog = true;
      this.$emit('claimNoteDailog', true);
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

      this.getClaimNotes(this.selectedClaimId);
      this.editNote = '';
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
