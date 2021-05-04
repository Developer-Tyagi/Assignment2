<template>
  <div class="bg-white full-width">
    <q-card class="q-pa-md">
      <div>
        <div class="column" v-for="task in tasks.tasks">
          <div class="row q-pa-sm">
            <div class="flex">
              <q-checkbox
                v-model="task.isEnabled"
                color="$primary"
                class="q-my-auto q-mr-md"
              />
            </div>
            <div class="column">
              <span class="text-bold text-capitalize" v-if="task.name">{{
                task.name
              }}</span>
              <span v-if="task.addedDesc">{{ task.addedDesc }}</span>
              <span v-if="task.dueDesc">{{ task.dueDesc }}</span>
            </div>
          </div>
        </div>
      </div>
    </q-card>

    <q-btn
      label="add custom task"
      class="fixed-bottom q-my-md q-mx-auto"
      color="primary"
      @click="addNewTaskDialog = true"
      size="md"
      style="width: 90%"
    />

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
              class="required"
              label="Task Name"
              v-model="newTask.name"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please enter the task name'
              ]"
            />
            <q-input
              class="required"
              v-model="newTask.dueDate"
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
import { dateToSend } from '@utils/date';
export default {
  name: 'OfficeTask',

  components: {
    CustomBar
  },
  data() {
    return {
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
    ...mapGetters(['tasks'])
  },
  created() {
    this.getOfficeTasks(this.$route.params.id);
  },

  methods: {
    ...mapActions(['getOfficeTasks', 'addOfficeTask']),

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
<style></style>
