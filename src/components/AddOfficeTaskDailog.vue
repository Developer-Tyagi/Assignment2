<template>
  <div>
    <q-input
      borderless
      class="input-style required input-field"
      label="Task Name"
      v-model="newTask.name"
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Please enter the task name']"
    />
    <q-input
      borderless
      class="input-style required input-field"
      v-model="newTask.dueDate"
      mask="##/##/####"
      label="MM/DD/YYYY"
      lazy-rules
      :rules="[
        val => (validateDate(val) && val && val.length > 0) || 'Invalid date!'
      ]"
    >
      <template v-slot:append>
        <q-icon name="event" size="sm" color="primary" class="cursor-pointer">
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
      :rules="[val => (val && val.length > 0) || 'Please select any category']"
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
        :rules="[val => (val && val.length > 0) || 'Please select any user ']"
      />
    </div>

    <div class="row">
      <p class="q-my-auto text-bold">Priority</p>
      <p class="q-my-auto q-ml-auto q-mr-md">
        {{ newTask.priority ? 'High' : 'Low' }}
      </p>

      <q-toggle v-model="newTask.priority" />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import CustomBar from 'components/CustomBar';
import { validateDate } from '@utils/validation';
import { date } from 'quasar';
import { dateToSend } from '@utils/date';

export default {
  name: 'AddOfficeTaskDailog',
  props: {
    newTask: {
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
      addNewTaskDialog: false
    };
  },
  computed: {
    ...mapGetters([, 'allUsers', 'roleTypes', 'isOfflineClientEdit'])
  },
  async created() {
    await this.getRoles();

    await this.getAllUsers();
  },

  methods: {
    ...mapActions(['getAllUsers', 'getRoles']),

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
