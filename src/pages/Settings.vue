<template>
  <q-page>
    <q-header bordered class="bg-white">
      <q-toolbar class="row bg-white">
        <img
          src="~assets/left-arrow.svg"
          alt="back-arrow"
          @click="$router.push('/dashboard')"
        />
        <div class="text-uppercase text-bold text-black q-mx-auto">
          {{ $route.name }}
        </div>
      </q-toolbar>
    </q-header>
    <div style="padding-top: 51px" class="full-height">
      <div class="q-pa-md">
        <q-list separator>
          <q-item clickable>
            <q-item-section>My Schedule</q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="'/inspection-types'">
            <q-item-section> Type of Inspection </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section> Prefered Max Distance of Travel </q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section> Documents </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Settings'
};
</script>
