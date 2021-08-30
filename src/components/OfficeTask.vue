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
            <q-input
              borderless
              class="input-style required input-field"
              label="Task Name"
              v-model="newTask.name"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please enter the task name'
              ]"
            />
            <q-input
              borderless
              class="input-style required input-field"
              v-model="newTask.dueDate"
              mask="##/##/####"
              label="MM/DD/YYYY"
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
                      v-model="newTask.dueDate"
                      @input="() => $refs.qDateProxy.hide()"
                      :options="taskDateValidation"
                      mask="MM/DD/YYYY"
                    ></q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-select
              v-model="newTask.assignedTo[0].type"
              dense
              borderless
              class="input-style required input-field input-extra-padding"
              options-dense
              behavior="menu"
              option-label="value"
              :options="assignTo"
              @input="callAssignApi(newTask.assignedTo[0].type)"
              option-value="machineValue"
              map-options
              emit-value
              label="Assign To"
              :rules="[
                val => (val && val.length > 0) || 'Please select any category'
              ]"
            />
            <div>
              <q-select
                v-if="newTask.assignedTo[0].type"
                v-model="newTask.assignedTo[0].name"
                dense
                options-dense
                behavior="menu"
                borderless
                class="input-style required input-field input-extra-padding"
                option-label="name"
                :options="assignToSubOption"
                option-value="machineValue"
                @input="setAssignTo(newTask.assignedTo[0].name)"
                map-options
                label="Listing"
                emit-value
                :rules="[
                  val => (val && val.length > 0) || 'Please select any user '
                ]"
              />
            </div>

            <div class="row">
              <p class="q-my-auto text-bold">Priority</p>
              <p class="q-my-auto q-ml-auto q-mr-md">
                {{ newTask.priority ? 'High' : 'Low' }}
              </p>

              <q-toggle v-model="newTask.priority" />
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
import { validateDate } from '@utils/validation';
import { date } from 'quasar';
import { dateToSend } from '@utils/date';

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

    /*********It will show all the dates from tommorow !**********/
    taskDateValidation(dateopn) {
      return dateopn > date.formatDate(Date.now(), 'YYYY/MM/DD');
    },

    /*****It will call the Api according to the imput in the first drop down ******/

    /**As user dont have machine value  but roles have ,so in case of User API we are putting value in machine
     *  value and machine value in machineValue  in case of Roles API
     * because we are using same drop down for roles and users ******/
    async callAssignApi(val) {
      this.assignToSubOption = [];
      this.newTask.assignedTo[0].name = '';
      this.assignee = val;
      /**If we select User then...we will put all the user in assignToSubOption this array **/
      if (val == 'user') {
        await this.getAllUsers();
        this.allUsers.forEach(user => {
          this.assignToSubOption.push({
            machineValue: user.name,
            name: user.name,
            id: user.id
          });
        });
      } else {
        /**If we select Roles then...we will put all the Roles in assignToSubOption this array **/
        await this.getRoles();
        this.roleTypes.forEach(user => {
          this.assignToSubOption.push({
            machineValue: user.machineValue,
            name: user.name,
            id: user.id
          });
        });
      }
    },
    /**It will find the object from array whose value is selcted and assign ID to its object !*****/
    setAssignTo(val) {
      if (this.assignee == 'user') {
        const obj = this.allUsers.find(item => {
          return item.name === val;
        });

        this.newTask.assignedTo[0].id = obj.id;
      } else {
        const obj = this.roleTypes.find(item => {
          return item.machineValue === val;
        });
        this.newTask.assignedTo[0].id = obj.id;
      }
    },

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
