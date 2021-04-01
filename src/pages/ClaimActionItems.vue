<template>
  <q-page>
    <div>
      <div class="actions-div justify-between q-px-md">
        <q-btn color="primary">Add default items</q-btn>
        <q-btn color="primary">Edit default items</q-btn>
      </div>
      <div class="mobile-container-page">
        <div class="clients-list q-ma-sm" v-if="claimTasks.length">
          <div
            class="clients-list row"
            v-for="(task, index) in claimTasks"
            :key="task.id"
          >
            <q-checkbox
              v-model="task.isCompleted"
              @input="changeTaskMark(task.id, $event)"
            />
            <div class="client-list-item">
              <div class="row form-heading">{{ index }}. {{ task.name }}</div>
              <div>{{ task.addedDesc }}</div>
              <div v-if="task.isCompleted">
                {{ task.completedDesc }}
              </div>
            </div>
          </div>
        </div>
        <div v-else class="full-height full-width column">
          <div class="column absolute-center">
            <div style="color: #666666,align-items: center">
              You haven't added a task yet.
            </div>
            <img
              class="q-mx-lg q-pt-sm"
              src="~assets/add.svg"
              alt="add_icon"
              width="130px"
              height="100px"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'ClaimActionItems',

  computed: {
    ...mapGetters(['claimTasks'])
  },
  methods: {
    ...mapActions(['getClaimTasks', 'changeSelectedTaskMark']),
    ...mapMutations(['setNotification']),
    async changeTaskMark(taskId, event) {
      const payload = {
        claimId: this.$route.params.claimId,
        taskId: taskId,
        type: ''
      };
      if (event) {
        payload.type = 'complete';
      } else {
        payload.type = 'uncomplete';
      }
      await this.changeSelectedTaskMark(payload).then(result => {
        if (result) {
          this.setNotification({
            type: 'positive',
            message: ' Task updated successfully!'
          });
        }
      });

      await this.getClaimTasks(this.$route.params.claimId);
    }
  },

  created() {
    this.getClaimTasks(this.$route.params.claimId);
  }
};
</script>
<style lang="scss">
.form-heading {
  color: #333333;
  font-weight: bold;
  font-size: 14px;
}
.clients-list {
  background-color: #f4f4f4;
  border-bottom: 6px solid white;

  .client-list-item {
    padding: 20px;
    background-color: #f4f4f4;
    text-transform: capitalize;
  }
}
</style>
