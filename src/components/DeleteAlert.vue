<template>
  <div>
    <q-card-section>
      <div class="text-h6">Alert</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      Are you sure ! You want to delete this
    </q-card-section>
    <q-card-actions align="right">
      <q-btn
        flat
        label="Cancel"
        color="primary"
        v-close-popup
        @click="onClose"
      ></q-btn>
      <q-btn
        flat
        label="Delete"
        color="primary"
        v-close-popup
        @click="onDelete"
      ></q-btn>
    </q-card-actions>
  </div>
</template>

<script>
export default {
  name: 'DeleteAlert',

  data() {
    return {};
  },

  methods: {
    onClose() {
      this.$emit('onClose');
    },
    onDelete() {
      this.$emit('onDelete');
    }
  }
};
</script>
