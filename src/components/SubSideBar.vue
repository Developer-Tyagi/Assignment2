<template>
  <div class="full-height bg-grey-4">
    <div>
      <q-list separator>
        <q-item
          clickable
          v-ripple
          v-for="data in list"
          :key="data.name"
          @click="onListClick(data)"
          class="q-px-none"
          :active="data.key === selectedItem"
          active-class=""
        >
          <q-item-section>
            <div class="title" style="text-align: center">
              {{ data.name }}
            </div>
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
    },
    selectedItem: {
      type: String,
      required: true
    }
  },

  methods: {
    onListClick(data) {
      console.log(this.selectedItem);
      this.$emit('onListClick', data);
    }
  }
};
</script>
<style lang="scss">
.active-list {
  background: grey;
  color: $grey-10;
}
</style>
