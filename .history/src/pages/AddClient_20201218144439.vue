<template>
  <q-page style="padding-top: 0; height: 100vh">
    <q-header bordered class="bg-white">
      <q-toolbar class="row bg-white">
        <q-btn @click="$router.push('/clients')" flat dense>
          <img
            src="~assets/left-arrow.svg"
            alt="back-arrow"
            style="margin: auto 0"
          />
        </q-btn>
        <div class="text-uppercase text-bold text-black q-mx-auto">
          {{ $route.name }}
        </div>
      </q-toolbar>
    </q-header>
  </q-page>
</template>

<script>
export default {};
</script>
<style lang="sass"></style>
