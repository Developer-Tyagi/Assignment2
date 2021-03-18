<template>
  <div class="full-height bg-grey-4" style="width: 20%">
    <div>
      <q-list separator>
        <q-item
          clickable
          v-ripple
          v-for="data in list"
          :key="data.name"
          @click="onListClick(data)"
          class="q-px-none"
        >
          <q-item-section style="color: #666666">
            <p class="title">{{ data.name }}</p>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SubSideBar',
  props: {
    list: {
      type: Array,
      required: true
    }
  },

  methods: {
    onListClick(data) {
      this.$emit('onListClick', data);
    }
  }
};
</script>
