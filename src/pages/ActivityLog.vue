<template>
  <q-page>
    <div>
      <div class="actions-div">
        <q-btn @click="editLog = true" flat class="q-ml-auto"
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
                @click="onClickEdit(log.attributes)"
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
      v-model="editLog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar @closeDialog="editLog = false" :dialogName="'Add New Log'" />

        <div class="mobile-container-page-without-search q-ma-sm">
          <q-form ref="activityLogForm" class="form-height">
            <q-input
              v-model="title"
              class="full-width"
              label="Title"
              :rules="[
                val => (val && val.length > 0) || 'Please fill the title    '
              ]"
            />
            <q-input
              v-model="details"
              class="full-width"
              label="Details"
              :rules="[
                val => (val && val.length > 0) || 'Please fill the details'
              ]"
            />
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
  </q-page>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import CustomBar from 'components/CustomBar';
import moment from 'moment';

export default {
  name: 'ActivityLog',

  data() {
    return {
      title: '',
      details: '',
      editLog: false
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
    ...mapActions(['getSingleClaimDetails', 'getLog', 'addLog']),
    ...mapMutations(['setSelectedClaimId', 'setLog']),
    // Edit Function
    onClickEdit(val) {
      this.title = val.title;
      this.details = val.user.name;
      this.editLog = true;
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
            details: this.details
          }
        };
        await this.addLog(payload);
        this.successMessage();
        this.getLog(this.selectedClaimId);

        this.editLog = false;
      }
    },
    successMessage() {
      this.$q.notify({
        type: 'positive',
        message: `Log Updated Successfully!`,
        position: 'top'
      });
    }
  }
};
</script>

<style lang="scss">
.form-heading {
  color: #333333;
  font-weight: bold;
  font-size: 14px;
  margin-top: 10px;
}

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
