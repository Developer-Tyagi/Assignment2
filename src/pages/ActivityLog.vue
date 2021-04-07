<template>
  <q-page>
    <div>
      <div class="actions-div">
        <q-btn @click="addLogDialog = true" flat class="q-ml-auto"
          ><img src="~assets/add.svg"
        /></q-btn>
      </div>
      <div class="mobile-container-page">
        <div class="" v-if="log.length">
          <!-- This is for showing the Property details  -->
          <div class="bg-grey-3 q-pa-md q-ma-sm" v-for="(log, index) in log">
            <div class="row">
              <span class="col-11">
                {{ log.attributes.created | moment('DD/MM/YYYY/, HH:mm') }}
              </span>
              <q-icon
                size="xs"
                name="create"
                color="primary"
                class="col q-pt-xs"
                @click="onClickEdit()"
              ></q-icon>
            </div>
            <div>{{ log.attributes.title }}</div>
            <div>Entered by {{ log.attributes.user.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- This Dialog Box is for adding a new log  -->
    <q-dialog
      v-model="addLogDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="onClosingaddLogDialog"
          :dialogName="'Add New Log'"
        />

        <div class="mobile-container-page-without-search q-ma-sm">
          <q-form ref="activityLogForm" class="form-height">
            <q-input
              v-model="title"
              class="full-width required"
              label="Title"
              :rules="[
                val => (val && val.length > 0) || 'Please fill the title    '
              ]"
            />
            <q-input
              v-model="details"
              class="full-width "
              label="Details"
            /><br />
            <span class="form-heading">Notes</span>
            <div class="floating-label">
              <textarea
                rows="5"
                required
                class="full-width"
                v-model="notes"
                style="resize: none"
              ></textarea>
            </div>
          </q-form>
          <q-btn
            label="Save"
            color="primary"
            class="button-width-90"
            @click="onSaveButtonClick"
            size="'xl'"
          />
        </div>
      </q-card>
    </q-dialog>
    <!-- This Dialog Box is for editing a new log -->
    <q-dialog
      v-model="editLogDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="editLogDialog = false"
          :dialogName="'Edit Log'"
        />

        <div class="mobile-container-page-without-search q-ma-sm">
          <q-form ref="activityEditLogForm" class="form-height">
            <q-input
              v-model="edit.title"
              class="full-width required"
              label="Title"
              :disable="isFieldDisable"
              :rules="[
                val => (val && val.length > 0) || 'Please fill the title    '
              ]"
            />
            <q-input
              v-model="edit.details"
              class="full-width "
              label="Details"
              :disable="isFieldDisable"
            /><br />
            <span class="form-heading">Notes</span>
            <div class="floating-label">
              <textarea
                rows="5"
                required
                class="full-width"
                v-model="edit.notes"
                style="resize: none"
              ></textarea>
            </div>
          </q-form>
          <q-btn
            label="Save"
            color="primary"
            class="button-width-90"
            @click="onEditSaveButtonClick"
            size="'xl'"
          />
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import CustomBar from 'components/CustomBar';
import moment from 'moment';
import { successMessage } from '@utils/validation';

export default {
  name: 'ActivityLog',

  data() {
    return {
      isFieldDisable: true,
      title: '',
      details: '',
      addLogDialog: false,
      editLogDialog: false,
      edit: {
        title: '',
        details: '',
        notes: ''
      },

      logId: '',
      notes: ''
    };
  },
  components: { CustomBar },
  async created() {
    if (this.selectedClaimId) {
      await this.getLog(this.selectedClaimId);
    } else {
      this.$router.push('/clients');
    }
  },
  computed: {
    ...mapGetters(['selectedClaimId', 'log']),

    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY');
      }
    }
  },
  methods: {
    ...mapActions(['getSingleClaimDetails', 'getLog', 'addLog', 'editLog']),
    ...mapMutations(['setSelectedClaimId', 'setLog']),
    // Edit Function
    onClickEdit() {
      let index = this.log.length;
      this.edit.title = this.log[index - 1].attributes.title;
      this.edit.title = this.log[index - 1].attributes.title;
      this.edit.details = this.log[index - 1].attributes.detail;

      this.edit.notes = this.log[index - 1].attributes.note;
      this.editLogDialog = true;
      this.logId = this.log[index - 1].id;

      if (this.log[index - 1].attributes.isSystemGen == true) {
        this.isFieldDisable = true;
      } else {
        this.isFieldDisable = false;
      }
    },
    //  Save Function
    async onSaveButtonClick() {
      let success = true;
      success = await this.$refs.activityLogForm.validate();
      if (success) {
        const payload = {
          id: this.selectedClaimId,
          data: {
            title: this.title,
            detail: this.details,
            note: this.notes
          }
        };
        await this.addLog(payload);
        this.successMessage('Logs Added Successfully');
        this.getLog(this.selectedClaimId);

        this.onClosingaddLogDialog();
      }
    },
    //Function when we update the details
    async onEditSaveButtonClick() {
      let success = true;
      success = await this.$refs.activityEditLogForm.validate();
      if (success) {
        const payload = {
          id: this.selectedClaimId,
          logUserId: this.logId,
          data: {
            title: this.edit.title,
            detail: this.edit.details,
            note: this.edit.notes
          }
        };

        await this.editLog(payload);
        this.editLogDialog = false;
        await this.getLog(this.selectedClaimId);
      }
    },
    successMessage,

    onClosingaddLogDialog() {
      this.addLogDialog = false;
      this.title = '';
      this.details = '';
      this.notes = '';
    }
  }
};
</script>

<style lang="scss">
.form-height {
  height: calc(100vh - 145px);
  overflow: auto;
  margin: 10px;
}
.actions-div {
  display: flex;
  border-bottom: 1px solid #0000001f;
  align-items: center;
}
</style>
