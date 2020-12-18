<template>
  <q-page style="padding-top: 0; height: 100vh">
    <CustomHeader
      @backButton="$router.push('/dashboard')"
    />
      </q-toolbar>
    </q-header>
  </q-page>
</template>

<script>
import CustomHeader from "components/CustomHeader";
export default {
  name: "AddClient"
};
</script>
<style lang="sass"></style>
