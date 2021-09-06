<template>
  <div>
    <div v-if="tasks.tasks">
      <div class="column" v-for="(task, index) in tasks.tasks">
        <div class="row q-pa-sm">
          <div class="flex" v-if="isShow">
            <q-checkbox
              v-model="taskShow[index].value"
              color="$primary"
              class="q-my-auto q-mr-md"
              @input="setTaskAsCompleted(task)"
            />
          </div>
          <div class="column">
            <span class="form-heading  text-capitalize" v-if="task.name">{{
              task.name
            }}</span>
            <span v-if="task.addedDesc">{{ task.addedDesc }}</span>
            <span v-if="task.dueDesc">{{ task.dueDesc }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="full-height text-center">
      <div class="q-mt-xs">
        <div style="color: #666666">
          You haven't added a Task yet.
        </div>
        <img
          class="text-center"
          src="~assets/add.svg"
          width="30px"
          height="30px"
          @click="(addNewTaskDialog = true), $emit('taskDialog', true)"
        />
      </div>
    </div>
    <div class="row">
      <div class="q-ml-auto">
        <q-btn
          v-if="tasks.tasks"
          @click="(addNewTaskDialog = true), $emit('taskDialog', true)"
          label="add custom task"
          color="primary"
        ></q-btn>
      </div>
    </div>
    <!-- class=" q-my-md q-mx-auto" -->
    <!-- style="width: 90%" -->
    <q-dialog
      v-model="addNewTaskDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          :dialogName="'Add New Task'"
          @closeDialog="(addNewTaskDialog = false), $emit('taskDialog', false)"
        />
        <div class="mobile-container-page form-height q-pa-md">
          <q-form ref="addTask">
            <q-input
              class="required"
              label="Task Name"
              v-model="newTask.name"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please enter the task name'
              ]"
            />
            <span class="text-bold">Task Date</span>
            <q-input
              class="required"
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
                      mask="MM/DD/YYYY"
                    ></q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input label="Assign" v-model="newTask.assign" />
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
          class="single-next-button-style"
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
import ClaimDetail from 'components/ClaimDetail';
import { validateDate } from '@utils/validation';
import { dateToSend } from '@utils/date';
export default {
  name: 'ClaimTask',

  components: {
    CustomBar,
    ClaimDetail
  },
  data() {
    return {
      isShow: false,
      taskShow: [],
      showOfficeActions: false,
      addNewTaskDialog: false,
      newTask: {
        dueDate: '',
        name: '',
        isEnabled: true,
        assignedTo: [],
        priority: false
      }
    };
  },
  computed: {
    ...mapGetters(['tasks', 'selectedClaimId'])
  },
  async created() {
    await this.getOfficeTasks(this.selectedClaimId);

    await this.tasks.tasks.forEach(val => {
      this.taskShow.push({
        value: val.isCompleted
      });
    });
    this.isShow = true;
  },

  methods: {
    ...mapActions([
      'getOfficeTasks',
      'addOfficeTask',
      'taskComplete',
      'taskUncomplete'
    ]),

    async setTaskAsCompleted(value) {
      if (value.isCompleted) {
        const payload = {
          claimID: this.selectedClaimId,
          taskId: value.id
        };
        await this.taskUncomplete(payload);
      } else {
        const payload = {
          claimID: this.selectedClaimId,
          taskId: value.id,
          data: {
            machineValue: value.machineValue
          }
        };
        await this.taskComplete(payload);
      }

      this.getOfficeTasks(this.selectedClaimId);
    },

    async addTask() {
      const success = await this.$refs.addTask.validate();
      if (success) {
        const payload = {
          id: this.$route.params.id,
          data: {
            name: this.newTask.name,
            isEnabled: false,
            priority: this.newTask.priority ? 'high' : 'low',
            assignedTo: [],
            actions: {
              onComplete: [],
              onOverdue: []
            },
            dueDate: dateToSend(this.newTask.dueDate),
            isCompleted: false,
            completedOn: null,
            note: this.newTask.assign
          }
        };
        await this.addOfficeTask(payload);
        this.addNewTaskDialog = false;
        this.getOfficeTasks(this.$route.params.id);
        this.newTask.name = '';
        this.newTask.priority = false;
        this.newTask.dueDate = '';
        this.newTask.assign = '';
      }
    },

    validateDate
  }
};
</script>
