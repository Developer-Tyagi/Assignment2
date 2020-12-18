<template>
  <q-page style="padding-top: 0; height: 100vh">
    <CustomHeader
      @backButton="$router.push('/dashboard')"
      @addButton="addClient"
    />
      </q-toolbar>
    </q-header>
  </q-page>
</template>

<script>
export default {
  name: "AddClient"
};
</script>
<style lang="sass"></style>
