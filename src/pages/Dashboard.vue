<template>
  <q-page>
    <h5>
      <q-icon name="menu" @click="openMenu"></q-icon>Dashboard
    </h5>
    <h6>Dashboard is under construction</h6>
  </q-page>
</template>
<script>
export default {
  methods: {
    openMenu() {
      this.$router.push("/index");
    }
  }
};
</script>
<style>
</style>
