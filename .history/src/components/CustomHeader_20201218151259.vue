<template>
  <q-header bordered class="bg-white">
    <q-toolbar class="row bg-white">
      <q-btn @click="" flat>
        <img src="~assets/left-arrow.svg" alt="back-arrow" />
      </q-btn>
      <div class="text-uppercase text-bold text-black q-mx-auto">
        {{ $route.name }}
      </div>
      <q-btn @click="addClient" flat>
        <img src="~assets/add.svg" />
      </q-btn>
    </q-toolbar>
  </q-header>
</template>
<script>
export default {};
</script>
<style lang="scss"></style>
