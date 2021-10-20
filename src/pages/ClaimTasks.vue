<template>
  <div>
    <div v-if="tasks.tasks">
      <div class="column" v-for="(task, index) in tasks.tasks">
        <div class="row q-pa-sm">
          <div v-if="isShow">
            <q-checkbox
              v-model="task.isCompleted"
              color="$primary"
              class="q-my-auto q-mr-md"
              @input="setTaskAsCompleted(task)"
            />
          </div>
          <div>
            <span class="form-heading  text-capitalize" v-if="task.name">{{
              task.name
            }}</span>
            <div v-if="task.addedDesc">{{ task.addedDesc }}</div>
            <div v-if="task.dueDesc">{{ task.dueDesc }}</div>

            <div v-if="task.isCompleted" style="width:150px">
              {{ task.completedDesc }}
            </div>
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
            <AddOfficeTaskDailog :newTask="newTask" />
          </q-form>
        </div>
        <div class="row justify-center">
          <q-btn
            label="Save"
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
import ClaimDetail from 'components/ClaimDetail';
import { validateDate } from '@utils/validation';
import { dateToSend } from '@utils/date';
import AddOfficeTaskDailog from 'components/AddOfficeTaskDailog';
export default {
  name: 'ClaimTask',

  components: {
    CustomBar,
    ClaimDetail,
    AddOfficeTaskDailog
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
    ...mapGetters(['tasks', 'selectedClaimId'])
  },
  async created() {
    await this.getOfficeTasks(this.selectedClaimId);

    if (this.tasks.tasks) {
      await this.tasks.tasks.forEach(val => {
        this.taskShow.push({
          value: val.isCompleted
        });
      });
    }

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
          taskId: value.id,
          data: {
            machineValue: value.machineValue
          }
        };
        await this.taskComplete(payload);
      } else {
        const payload = {
          claimID: this.selectedClaimId,
          taskId: value.id
        };
        await this.taskUncomplete(payload);
      }

      await this.getOfficeTasks(this.selectedClaimId);
    },

    async addTask() {
      const success = await this.$refs.addTask.validate();
      if (success) {
        const payload = {
          id: this.selectedClaimId,
          data: {
            name: this.newTask.name,
            isEnabled: true,
            priority: this.newTask.priority ? 'high' : 'low',
            assignedTo: this.newTask.assignedTo,
            actions: {
              onComplete: [],
              onOverdue: []
            },
            dueDate: dateToSend(this.newTask.dueDate),
            completedOn: null,
            note: this.newTask.assign
          }
        };

        await this.addOfficeTask(payload);
        this.addNewTaskDialog = false;
        this.getOfficeTasks(this.selectedClaimId);
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
      }
    },

    validateDate
  }
};
</script>
