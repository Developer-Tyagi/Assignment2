<template>
    <q-page style="padding-top: 0; height: 100vh">
    <q-header bordered class="bg-white">
      <q-toolbar class="row bg-white">
        <img
          src="~assets/left-arrow.svg"
          alt="back-arrow"
          @click="$router.push('/clients')"
          style="margin: auto 0"
        />
        <div class="text-uppercase text-bold text-black q-mx-auto">
          {{ $route.name }}
        </div>
        <img
          src="~assets/add.svg"
          alt=""
          @click="addClient"
          style="margin: auto 0"
        />        
      </q-toolbar>
    </q-header>
    </q-page> 
</template>

<script>
export default {
    
}
</script>
<style lang="sass">

</style>