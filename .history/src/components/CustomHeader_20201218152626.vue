<template>
  <q-header bordered class="bg-white">
    <q-toolbar class="row bg-white">
      <q-btn @click="onBackClick" flat>
        <img src="~assets/left-arrow.svg" alt="back-arrow" />
      </q-btn>
      <div class="text-uppercase text-bold text-black q-mx-auto">
        {{ $route.name }}
      </div>
      <q-btn @click="onAddClick" flat>
        <img src="~assets/add.svg" />
      </q-btn>
    </q-toolbar>
  </q-header>
</template>
<script>
export default {
  name: "CustomHeader",

  methods: {
    onBackClick() {
      this.$emit("backButton");
    },

    onAddClick() {
      this.$emit("addButton");
    }
  }
};
</script>
<style lang="scss">
.q-toolbar {
  padding: 0;
}
</style>
