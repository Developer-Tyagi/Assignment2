<template>
  <q-page>
    <div
      :class="{
        'icon-top': !$q.platform.is.iphone,
        'icon-top-ios': $q.platform.is.iphone
      }"
    >
      <q-btn @click="addLogDialog = true" flat
        ><img src="~assets/add.svg"
      /></q-btn>
    </div>
    <div class="mobile-container-page">
      <ClaimDetail />
      <div>
        <div v-if="log">
          <!-- This is for showing the Property details  -->
          <q-card
            class="q-pa-md q-ma-sm"
            v-for="(logItem, index) in log"
            :key="logItem.name"
          >
            <div class="row q-my-sm">
              <div class="col-10 heading-light">
                {{ logItem.created | moment('DD/MM/YYYY, hh:mm A') }}
              </div>
              <q-icon
                size="xs"
                name="create"
                color="primary"
                class="col q-pt-xs"
                @click="onClickEdit(index)"
              ></q-icon>
              <q-icon class="q-ml-sm" name="delete" size="sm" color="primary" />
            </div>
            <div>{{ logItem.title }}</div>

            <p class="heading-light q-my-sm text-caption">
              {{ logItem.detail ? logItem.detail : '-' }}
            </p>
            <p class="heading-light q-my-sm text-caption">
              {{ logItem.note ? logItem.note : '-' }}
            </p>
            <div class="heading-light q-my-sm">
              Entered by {{ logItem.user.name }}
            </div>
          </q-card>
        </div>
        <div v-else class="q-ma-xl heading-light text-italic">
          There is No activity Log present at this Moment
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
              class="full-width"
              label="Details"
            /><br />
            <span class="form-heading">Notes</span>
            <div class="floating-label">
              <textarea
                rows="5"
                class="full-width"
                v-model="notes"
                style="resize: none"
              />
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
            <div v-if="isFieldDisable == false">
              <q-input
                v-model="edit.title"
                class="full-width required"
                label="Title"
                :disable="isFieldDisable"
                :rules="[
                  val => (val && val.length > 0) || 'Please fill the title    '
                ]"
              />
            </div>
            <div v-else>
              <div class="heading-light">
                {{ date | moment('MMM DD, YYYY, hh:mm A') }}
              </div>
              <div class="q-mt-sm">{{ edit.title }}</div>
              <div class="heading-light q-mt-sm">Entered By {{ name }}</div>
            </div>
            <q-input
              v-if="isFieldDisable == false"
              v-model="edit.details"
              class="full-width"
              label="Details"
              :disable="isFieldDisable"
            /><br />
            <span class="heading-light q-pt-sm"> Additional Notes</span>
            <div class="floating-label">
              <textarea
                rows="5"
                class="full-width"
                v-model="edit.notes"
                style="resize: none"
              />
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
import { constants } from '@utils/constant';
import ClaimDetail from 'components/ClaimDetail';
export default {
  name: 'ActivityLog',
  components: { CustomBar, ClaimDetail },
  data() {
    return {
      name: '',
      date: '',
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
    onClickEdit(index) {
      this.date = this.log[index].created;
      this.name = this.log[index].user.name;
      this.edit.title = this.log[index].title;
      this.edit.title = this.log[index].title;
      this.edit.details = this.log[index].detail;

      this.edit.notes = this.log[index].note;
      this.editLogDialog = true;
      this.logId = this.log[index].id;

      if (this.log[index].isSystemGen == true) {
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
        this.successMessage(constants.successMessages.LOGS);
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
