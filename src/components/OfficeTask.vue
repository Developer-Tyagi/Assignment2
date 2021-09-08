<template>
  <div class="bg-white full-width">
    <q-card class="q-pa-sm office-task-card">
      <div class="row">
        <p class="q-my-auto text-bold">Office Action Required</p>
        <q-toggle
          class="q-ml-auto"
          v-model="officeTask.officeActionRequired"
          :disable="isOfflineClientEdit"
          @input="onOfficeTaskToggleButton()"
        />
      </div>

      <div v-if="officeTask.officeActionRequired" class="office-task-list">
        <div class="column" v-for="(action, index) in officeTaskActions">
          <div class="row q-pa-sm">
            <div class="flex">
              <q-checkbox
                v-model="action.isEnabled"
                color="$primary"
                class="q-my-auto q-mr-md"
                @input="changeEnableField(action, index)"
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
      v-if="officeTask.officeActionRequired"
      class="q-ml-auto flex q-mt-md"
      color="primary"
      @click="addNewTaskDialog = true"
      >add custom task</q-btn
    >
    <q-dialog
      v-model="addNewTaskDialog"
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
            <AddOfficeTaskDailog :newTask="newTask" />
          </q-form>
        </div>
        <div class="row justify-center">
          <q-btn
            label="Save"
            style="width:90%"
            color="primary"
            class="single-next-button-style"
            size="'xl'"
            @click="addTask()"
          />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import CustomBar from 'components/CustomBar';
import { validateDate } from '@utils/validation';
import { date } from 'quasar';
import { dateToSend } from '@utils/date';
import AddOfficeTaskDailog from 'components/AddOfficeTaskDailog';
export default {
  name: 'OfficeTask',
  props: {
    officeTask: {
      type: Object
    }
  },

  components: {
    CustomBar,
    AddOfficeTaskDailog
  },
  data() {
    return {
      assignTo: [
        { value: 'User', machineValue: 'user' },
        { value: 'Role', machineValue: 'role' }
      ],
      assignee: '',
      assignToSubOption: [],
      showOfficeActions: false,
      addNewTaskDialog: false,
      newTask: {
        dueDate: '',
        name: '',
        isEnabled: true,
        assignedTo: [
          {
            type: '',
            name: '',
            id: ''
          }
        ],
        priority: false
      }
    };
  },
  computed: {
    ...mapGetters([
      'officeTaskActions',
      'allUsers',
      'roleTypes',
      'isOfflineClientEdit'
    ])
  },
  async created() {
    await this.getOfficeTaskActions();
    await this.getRoles();
    this.officeTaskActions.forEach(element => {
      delete element.id;
      delete element.created;
      delete element.updated;
    });
    await this.getAllUsers();
  },

  methods: {
    ...mapActions(['getOfficeTaskActions', 'getAllUsers', 'getRoles']),

    onOfficeTaskToggleButton() {
      this.showOfficeActions = this.officeTask.officeActionRequired;
      if (this.showOfficeActions) {
        this.officeTask.actions = this.officeTaskActions;
      } else {
        this.officeTask.actions = [];
      }
    },

    changeEnableField(action, index) {
      this.officeTask.actions[index] = action;
    },

    async addTask() {
      const success = await this.$refs.addTask.validate();
      if (success) {
        this.newTask.priority = this.newTask.priority ? 'high' : 'low';
        this.newTask.dueDate = dateToSend(this.newTask.dueDate);
        this.officeTaskActions.push(this.newTask);
        this.newTask = {
          dueDate: '',
          name: '',
          isEnabled: true,
          assignedTo: [
            {
              type: '',
              name: '',
              id: ''
            }
          ],
          priority: false
        };
        this.officeTask.actions = this.officeTaskActions;
        this.addNewTaskDialog = false;
      }
    },

    validateDate
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
.input-field {
  height: 55px;
}
</style>
