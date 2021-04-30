<template>
  <div class="bg-white full-width">
    <q-card class="q-pa-sm office-task-card">
      <div class="row">
        <p class="q-my-auto text-bold">Office Action Required</p>
        <q-toggle
          class="q-ml-auto"
          v-model="officeTask.officeActionRequired"
          @input="onOfficeTaskToggleButton()"
        />
      </div>
      <div v-if="showOfficeActions" class="office-task-list">
        <div class="column" v-for="action in allAction">
          <div class="row q-pa-sm">
            <div class="flex">
              <q-checkbox
                v-model="action.selected"
                color="$primary"
                class="q-my-auto q-mr-md"
              />
            </div>
            <div class="column">
              <span class="text-bold text-capitalize">{{ action.name }}</span>
              <span>{{ action.createdDesc }}</span>
              <span>{{ action.dueDesc }}</span>
            </div>
          </div>
        </div>
      </div>
    </q-card>
    <q-btn
      class="q-ml-auto flex q-mt-md"
      color="primary"
      @click="addNewTaskDialog = true"
      >add custom task</q-btn
    >
    <q-dialog
      v-model="addNewTaskDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          :dialogName="'Add New Task'"
          @closeDialog="addNewTaskDialog = false"
        />
        <div class="mobile-container-page q-pa-sm form-height">
          <q-form ref="addTask">
            <q-input
              label="Task Name"
              v-model="taskName"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please enter the task name'
              ]"
            />
            <q-input
              v-model="dueDate"
              mask="##/##/####"
              label="Task Date"
              lazy-rules
              :rules="[
                val =>
                  (validateDate(val) && val && val.length > 0) ||
                  'Invalid date!'
              ]"
            >
              <template v-slot:append>
                <q-icon
                  name="event"
                  size="sm"
                  color="primary"
                  class="cursor-pointer"
                >
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="dueDate"
                      @input="() => $refs.qDateProxy.hide()"
                      mask="MM/DD/YYYY"
                    ></q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input label="Assign" v-model="assign" />
            <div class="row">
              <p class="q-my-auto text-bold">Priority</p>
              <p class="q-my-auto q-ml-auto q-mr-md">
                {{ priority ? 'High' : 'Low' }}
              </p>

              <q-toggle v-model="priority" />
            </div>
          </q-form>
        </div>
        <q-btn
          label="Save"
          color="primary"
          class="button-width-90"
          size="'xl'"
          @click="addTask()"
        />
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import CustomBar from 'components/CustomBar';
export default {
  name: 'OfficeTask',
  props: {
    officeTask: {
      type: Object
    }
  },

  components: {
    CustomBar
  },
  data() {
    return {
      showOfficeActions: false,
      addNewTaskDialog: false,
      priority: false,
      dueDate: '',
      taskName: '',
      assign: ''
    };
  },
  computed: {
    ...mapGetters(['allAction'])
  },

  created() {
    this.getAllWorkFlow('claim_new_claim');
  },
  // 'getOfficeActionTasks','officeActionTasks'
  methods: {
    ...mapActions(['getAllWorkFlow']),

    onOfficeTaskToggleButton() {
      this.showOfficeActions = this.officeTask.officeActionRequired;
    },

    addTask() {
      this.$refs.addTask.validate();
    }
  }
};
</script>
<style>
.office-task-card {
  max-height: calc(100vh - 250px);
}
.office-task-list {
  height: calc(100vh - 365px);
  overflow-y: auto;
}
</style>
