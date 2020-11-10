<template>
  <div>
    <div class="q-pa-md">
      <q-list separator>
        <q-item clickable v-ripple>
          <q-item-section>My Schedule</q-item-section>
        </q-item>

        <q-item clickable v-ripple :to="'/settings/inspection'">
          <q-item-section> Type of Inspection </q-item-section>
        </q-item>

        <q-item clickable v-ripple :to="'/settings/preferred'">
          <q-item-section> Prefered Max Distance of Travel </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section> Documents </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {};
</script>